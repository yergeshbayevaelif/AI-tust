import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

// Shared server-side Gemini client
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Verification Endpoint
app.post('/api/verify', async (req: Request, res: Response) => {
  try {
    const { text, modelSource } = req.body;
    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      res.status(400).json({ error: 'Text is required for verification.' });
      return;
    }

    if (!ai) {
      // Return flag indicating server fallback mode so client can apply high-fidelity curated analysis
      res.json({
        success: false,
        fallback: true,
        message: 'GEMINI_API_KEY not configured on server; using local verification engine.'
      });
      return;
    }

    const systemPrompt = `You are AI Trust, an expert forensic fact-checking engine for AI-generated text.
Your task is to:
1. Break down the provided AI answer into distinct factual claims (usually 3 to 6 key claims).
2. For each claim, evaluate whether it is:
   - "verified" (confirmed by reliable sources)
   - "needs_review" (conflicting, insufficient evidence, or unconfirmable)
   - "refuted" (contradicted by reliable factual evidence)
3. For each claim, provide:
   - The exact claim text
   - Status (verified, needs_review, refuted)
   - Brief summary reason in Russian
   - Evidence items with sourceName, sourceType (e.g. Рецензируемый журнал, Архив, Документация, Официальный отчет), snippet, url or DOI identifier, reliability ('high'|'moderate'|'low'), and supports (boolean).
   - Hallucination detection: identify if there are fabricated studies, fake quotes, wrong dates, invented statistics, or fake sources. If an unconfirmable source is detected, flag it with the note: "Источник не удалось подтвердить — информация требует дополнительной проверки."
   - Detailed rationale: foundSourcesCount, supportingSources, contradictingSources, reliabilityAssessment, logicalChain (step-by-step reasoning in Russian), conclusion.

Respond ONLY with valid JSON conforming to the requested schema.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `Verify this AI answer:\n\n"""\n${text}\n"""\nSource AI model: ${modelSource || 'Unknown AI'}`,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summaryHeadline: { type: Type.STRING },
            summaryEvaluation: { type: Type.STRING },
            claims: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  statement: { type: Type.STRING },
                  status: { type: Type.STRING, description: "'verified' | 'needs_review' | 'refuted'" },
                  summaryReason: { type: Type.STRING },
                  evidenceList: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        sourceName: { type: Type.STRING },
                        sourceType: { type: Type.STRING },
                        snippet: { type: Type.STRING },
                        url: { type: Type.STRING },
                        reliability: { type: Type.STRING },
                        supports: { type: Type.BOOLEAN }
                      },
                      required: ['sourceName', 'sourceType', 'snippet', 'reliability', 'supports']
                    }
                  },
                  hallucinationMarker: {
                    type: Type.OBJECT,
                    properties: {
                      detected: { type: Type.BOOLEAN },
                      type: { type: Type.STRING },
                      label: { type: Type.STRING },
                      details: { type: Type.STRING }
                    },
                    required: ['detected']
                  },
                  detailedExplanation: {
                    type: Type.OBJECT,
                    properties: {
                      foundSourcesCount: { type: Type.INTEGER },
                      supportingSources: { type: Type.ARRAY, items: { type: Type.STRING } },
                      contradictingSources: { type: Type.ARRAY, items: { type: Type.STRING } },
                      reliabilityAssessment: { type: Type.STRING },
                      logicalChain: { type: Type.ARRAY, items: { type: Type.STRING } },
                      conclusion: { type: Type.STRING },
                      verificationNote: { type: Type.STRING }
                    },
                    required: ['foundSourcesCount', 'supportingSources', 'contradictingSources', 'reliabilityAssessment', 'logicalChain', 'conclusion']
                  }
                },
                required: ['statement', 'status', 'summaryReason', 'evidenceList', 'detailedExplanation']
              }
            }
          },
          required: ['summaryHeadline', 'summaryEvaluation', 'claims']
        }
      }
    });

    const parsed = JSON.parse(response.text?.trim() || '{}');
    res.json({
      success: true,
      data: parsed
    });
  } catch (error: any) {
    console.error('Gemini verification error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Verification failed',
      fallback: true
    });
  }
});

// Comparison Endpoint
app.post('/api/compare', async (req: Request, res: Response) => {
  try {
    const { topic, chatGptText, geminiText, claudeText } = req.body;
    if (!ai) {
      res.json({ success: false, fallback: true });
      return;
    }

    const prompt = `Compare these 3 AI answers to the question: "${topic || 'General Topic'}"
ChatGPT:
"""${chatGptText || 'N/A'}"""

Gemini:
"""${geminiText || 'N/A'}"""

Claude:
"""${claudeText || 'N/A'}"""

Remember: DO NOT assume majority agreement equals ground truth. Fact-check the claims.
Provide a structured comparison breakdown in Russian.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are an AI fact verification analyst. Compare AI outputs, pinpoint agreements, factual divergences, and hallucinations without majority bias.",
        responseMimeType: 'application/json',
      }
    });

    const result = JSON.parse(response.text?.trim() || '{}');
    res.json({ success: true, data: result });
  } catch (err: any) {
    console.error('Comparison error:', err);
    res.status(500).json({ success: false, fallback: true, error: err.message });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AI Trust server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
