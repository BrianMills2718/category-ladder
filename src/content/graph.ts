/**
 * The category-theory skill DAG. Concept nodes carry lesson content; achievement
 * nodes are capstone assessments. Edges are `prerequisite_for` (must be passed
 * before the target unlocks). The orientation node is tethered by soft,
 * non-gating `orients` edges. The linear ladder is one topological ordering.
 */
import type { SkillGraph, SkillNode, SkillEdge } from "../types";

const concept = (
  id: string,
  branch: SkillNode["branch"],
  lessonId: string,
  title: string,
  shortDescription: string,
  position: { x: number; y: number },
): SkillNode => ({ id, kind: "concept", branch, lessonId, title, shortDescription, position });

const achievement = (
  id: string,
  branch: SkillNode["branch"],
  title: string,
  shortDescription: string,
  assessmentIds: string[],
  position: { x: number; y: number },
): SkillNode => ({ id, kind: "achievement", branch, title, shortDescription, assessmentIds, position });

const NODES: SkillNode[] = [
  // concept nodes
  concept("c-orientation", "foundations", "cat-orientation", "Start Here: Think in Arrows", "A 2-min overview you can skip and return to.", { x: 260, y: -150 }),
  concept("c-category", "categories", "cat-category", "What Is a Category", "Objects, arrows, composition, identity.", { x: 60, y: 120 }),
  concept("c-composition", "composition", "cat-composition", "Composition & the Laws", "Associativity + identity; commuting diagrams.", { x: 320, y: 120 }),
  concept("c-examples", "examples", "cat-examples", "Categories Are Everywhere", "Set, types, orderings, monoids.", { x: 560, y: -20 }),
  concept("c-functor", "functors", "cat-functor", "Functors", "Structure-preserving maps; fmap.", { x: 560, y: 240 }),
  concept("c-natural", "naturality", "cat-natural", "Natural Transformations", "Maps between functors; naturality.", { x: 830, y: 150 }),
  concept("c-product", "universal", "cat-product", "Products & Universal Properties", "Define objects by arrows, up to iso.", { x: 830, y: 360 }),

  // achievement nodes
  achievement("a-spot-category", "categories", "Recognize a Category", "Decide if something is a category.", ["cap-category"], { x: 200, y: 300 }),
  achievement("a-functor", "functors", "Spot a Functor", "Check the functor laws.", ["cap-functor"], { x: 560, y: 470 }),
  achievement("a-naturality", "naturality", "Read a Naturality Square", "Explain what commutes & why.", ["cap-naturality"], { x: 1090, y: 150 }),
  achievement("a-universal", "universal", "Define by Universal Property", "State the product's universal property.", ["cap-universal"], { x: 1090, y: 360 }),
];

/** prerequisite_for edges: source must be passed before target unlocks. */
const PREREQS: [string, string][] = [
  ["c-category", "c-composition"],
  ["c-composition", "c-examples"],
  ["c-composition", "c-functor"],
  ["c-functor", "c-natural"],
  ["c-functor", "c-product"],

  // concept → achievement
  ["c-category", "a-spot-category"],
  ["c-composition", "a-spot-category"],
  ["c-functor", "a-functor"],
  ["c-natural", "a-naturality"],
  ["c-product", "a-universal"],
];

/** Soft, non-gating links: the orientation map points to the starting atom. */
const ORIENTS: [string, string][] = [["c-orientation", "c-category"]];

const EDGES: SkillEdge[] = [
  ...PREREQS.map(([source, target], i) => ({ id: `e${i}`, source, target, kind: "prerequisite_for" as const })),
  ...ORIENTS.map(([source, target], i) => ({ id: `o${i}`, source, target, kind: "orients" as const })),
];

export const SKILL_GRAPH: SkillGraph = { nodes: NODES, edges: EDGES };

/** The final goal — the default selected achievement. */
export const ROOT_GOAL_ID = "a-universal";

export function nodeById(id: string): SkillNode | undefined {
  return SKILL_GRAPH.nodes.find((n) => n.id === id);
}

export function nodeForLesson(lessonId: string): SkillNode | undefined {
  return SKILL_GRAPH.nodes.find((n) => n.lessonId === lessonId);
}

export function achievements(): SkillNode[] {
  return SKILL_GRAPH.nodes.filter((n) => n.kind === "achievement");
}

export function prereqsOf(id: string): string[] {
  return SKILL_GRAPH.edges
    .filter((e) => e.kind === "prerequisite_for" && e.target === id)
    .map((e) => e.source);
}

export function ancestorsOf(id: string): Set<string> {
  const seen = new Set<string>();
  const stack = [...prereqsOf(id)];
  while (stack.length) {
    const n = stack.pop()!;
    if (seen.has(n)) continue;
    seen.add(n);
    stack.push(...prereqsOf(n));
  }
  return seen;
}
