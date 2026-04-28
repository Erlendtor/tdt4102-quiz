export type Option = {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
};

export type Question = {
  id: string;
  topic: string;
  stem: string;
  code?: string;
  maxPoints: 5 | 10;
  options: Option[];
  variantGroupId: string;
  source: string;
  hint?: string;
  codeAnnotated?: string;
};

export type Bucket = 0 | 1 | 2;

export type QuestionProgress = {
  questionId: string;
  bucket: Bucket;
  timesInBucket2: number;
  lastScore: number;
  attempts: number;
};

export type ExamAnswer = {
  questionId: string;
  selectedOptionIds: string[];
};

export type ExamResult = {
  questionId: string;
  selectedOptionIds: string[];
  score: number;
  maxScore: number;
  percentCorrect: number;
};

export type Grade = "A" | "B" | "C" | "D" | "E" | "F";
