import { Question, Grade } from "@/types";

export function scoreQuestion(
  question: Question,
  selectedOptionIds: string[]
): number {
  const correctOptions = question.options.filter((o) => o.isCorrect);
  const numCorrect = correctOptions.length;
  if (numCorrect === 0) return 0;

  const pointsPerOption = question.maxPoints / numCorrect;

  let score = 0;
  for (const option of question.options) {
    const selected = selectedOptionIds.includes(option.id);
    if (selected && option.isCorrect) score += pointsPerOption;
    if (selected && !option.isCorrect) score -= pointsPerOption;
  }

  return Math.max(0, Math.round(score * 100) / 100);
}

export function scorePercent(question: Question, selectedOptionIds: string[]): number {
  const raw = scoreQuestion(question, selectedOptionIds);
  return (raw / question.maxPoints) * 100;
}

export function getBucket(percent: number): 0 | 1 | 2 {
  if (percent >= 80) return 2;
  if (percent >= 50) return 1;
  return 0;
}

export function calculateGrade(totalScore: number, maxScore: number): Grade {
  const pct = (totalScore / maxScore) * 100;
  if (pct >= 89) return "A";
  if (pct >= 77) return "B";
  if (pct >= 63) return "C";
  if (pct >= 49) return "D";
  if (pct >= 35) return "E";
  return "F";
}

export function getWeakTopics(
  results: { topic: string; percent: number }[]
): string[] {
  const byTopic = new Map<string, number[]>();
  for (const r of results) {
    const arr = byTopic.get(r.topic) ?? [];
    arr.push(r.percent);
    byTopic.set(r.topic, arr);
  }

  const weak: string[] = [];
  for (const [topic, scores] of byTopic) {
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    if (avg < 70) weak.push(topic);
  }
  return weak;
}
