/**
 * Personalized goals (MVP): map a free-text goal to an existing achievement node
 * via a static keyword ruleset. Selecting it highlights that achievement's
 * prerequisite sub-DAG.
 */
import { nodeById } from "./graph";

interface Rule {
  match: RegExp;
  goal: string;
}

// More specific intents first.
const RULES: Rule[] = [
  { match: /universal|product|tuple|coproduct|limit|defin.*by arrows/i, goal: "a-universal" },
  { match: /natural|naturality|polymorphi/i, goal: "a-naturality" },
  { match: /functor|fmap|\bmap\b|structure.?preserv/i, goal: "a-functor" },
  { match: /categor|object|morphism|arrow|compos|monoid|preorder/i, goal: "a-spot-category" },
];

export interface ResolvedGoal {
  goal: string;
  title: string;
}

export function resolveGoal(text: string): ResolvedGoal | null {
  const t = text.trim();
  if (!t) return null;
  for (const r of RULES) {
    if (r.match.test(t)) {
      const node = nodeById(r.goal);
      if (node) return { goal: r.goal, title: node.title };
    }
  }
  return null;
}
