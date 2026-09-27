export type ClaimStatus = 'verified' | 'needs_review' | 'refuted' | 'opinion';

export type ReliabilityRating = 'high' | 'moderate' | 'low' | 'unverified';

export type HallucinationType =
  | 'fabricated_study'
  | 'fake_quote'
  | 'wrong_date'
  | 'invented_numbers'
  | 'fake_source'
  | 'unsubstantiated';

export interface Evidence {
  id: string;
  sourceName: string;
  sourceType: string;
  snippet: string;
  url?: string;
  reliability: ReliabilityRating;
  supports: boolean;
  accessedDate?: string;
}

export interface DetailedExplanation {
  foundSourcesCount: number;
  supportingSources: string[];
  contradictingSources: string[];
  reliabilityAssessment: string;
  logicalChain: string[];
  conclusion: string;
  verificationNote?: string;
}

export interface Claim {
  id: string;
  order: number;
  statement: string;
  status: ClaimStatus;
  summaryReason: string;
  evidenceList: Evidence[];
  hallucinationMarker?: {
    detected: boolean;
    type: HallucinationType;
    label: string;
    details: string;
  };
  detailedExplanation: DetailedExplanation;
}

export interface ReportStats {
  totalClaims: number;
  verified: number;
  needsReview: number;
  refuted: number;
  opinion?: number;
  hallucinationsCount: number;
}

export interface TrustReport {
  id: string;
  timestamp: number;
  modelSource: string;
  topic?: string;
  originalText: string;
  stats: ReportStats;
  summaryHeadline: string;
  summaryEvaluation: string;
  claims: Claim[];
}

export interface ComparisonClaimItem {
  id: string;
  statement: string;
  verdict: 'verified' | 'refuted' | 'disputed';
  majorityAgreement: boolean;
  isMajorityTrue: boolean;
  majorityBiasWarning?: string;
  explanation: string;
  evidence: string;
  models: {
    chatGpt: { asserts: boolean; citationText?: string };
    gemini: { asserts: boolean; citationText?: string };
    claude: { asserts: boolean; citationText?: string };
  };
}

export interface ComparisonScenario {
  id: string;
  topic: string;
  question: string;
  chatGptText: string;
  geminiText: string;
  claudeText: string;
  summary: string;
  comparisonClaims: ComparisonClaimItem[];
  majorityInsight: string;
}
