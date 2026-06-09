import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Format a 0-10 scale score for display. Returns null if no score. */
export function formatScore(score: number | null): string | null {
  if (score == null) return null;
  return score % 1 === 0 ? `${score}` : score.toFixed(1);
}