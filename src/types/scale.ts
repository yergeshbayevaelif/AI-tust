export interface SealModelScore {
  id: string;
  name: string;
  creator: string;
  overallElo: number;
  codingScore: number;
  mathScore: number;
  reasoningScore: number;
  safetyScore: number;
  license: string;
  contextWindow: string;
}

export interface RlhfPromptCase {
  id: string;
  category: string;
  title: string;
  prompt: string;
  modelA: {
    name: string;
    response: string;
    reasoning: string;
  };
  modelB: {
    name: string;
    response: string;
    reasoning: string;
  };
  idealEvaluation: {
    recommendedWinner: 'modelA' | 'modelB';
    rubricFocus: string;
    expertCritique: string;
  };
}

export interface CaseStudy {
  id: string;
  client: string;
  tagline: string;
  industry: string;
  metric: string;
  metricLabel: string;
  description: string;
  deliverables: string[];
}
