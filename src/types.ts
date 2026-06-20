/**
 * Core content contract for the concept-ladder site.
 *
 * WHY this shape: the whole pedagogical point is that the site separates five
 * relations that learners conflate — well-formedness, provability, truth-in-a-
 * structure, coding, and metatheory. That separation has to be *typed*, not
 * decorative, so node/edge/viz/quiz are all discriminated unions whose tags
 * carry the distinction. Content is plain data so a lesson can be authored or
 * corrected without touching a component.
 */

/** Conceptual buckets for coloring diagram nodes/edges (style + legend, not
 *  color alone). In category theory the diagrams ARE the content — objects,
 *  arrows, functors, naturality — so the "layer" tags what kind of thing a
 *  node/edge is. */
export type Layer = "object" | "morphism" | "functor" | "natural" | "construction";

/** Node kinds in the typed graph (commutative diagrams). A superset; a given
 *  diagram uses only what it needs. */
export type NodeType =
  | "Object"
  | "Category"
  | "Morphism"
  | "Functor"
  | "NaturalTransformation"
  | "Type"
  | "Construction"
  | "Diagram";

/** Edge kinds. The legend explains each; the renderer gives each a distinct
 *  line style so a plain `morphism` is never mistaken for a `functor_action`
 *  or a `naturality` edge. */
export type EdgeType =
  | "morphism"
  | "identity"
  | "composite"
  | "functor_action"
  | "naturality"
  | "maps_to"
  | "universal"
  | "equals"
  | "relates";

export interface GraphNode {
  id: string;
  /** Display label. May contain KaTeX delimited by $...$. */
  label: string;
  type: NodeType;
  layer: Layer;
  /** Optional longer text shown on hover / in the textual summary. */
  note?: string;
  /** Optional fixed position for hand-laid diagrams (layer map, loops). */
  position?: { x: number; y: number };
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  /** Short edge label; the *type* carries the meaning, the label is a hint. */
  label?: string;
  type: EdgeType;
  layer: Layer;
}

/** A visualization is a discriminated union: not everything is a node-link
 *  graph. Parse trees, comparison tables, and the coding encoder are their own
 *  kinds so we never force a tree or a table into React Flow. */
export type VisualizationSpec =
  | TypedGraphViz
  | ParseTreeViz
  | ComparisonTableViz;

export interface VizBase {
  id: string;
  title: string;
  /** Required: a plain-text description that doubles as the accessibility
   *  fallback for screen readers and for when a graph can't render. */
  textualSummary: string;
}

export interface TypedGraphViz extends VizBase {
  kind: "typed-graph";
  nodes: GraphNode[];
  edges: GraphEdge[];
  /** Layers actually present, controls which legend rows show. */
  layers: Layer[];
}

/** Recursive parse-tree node. Rendered as nested SVG/HTML, not React Flow. */
export interface ParseNode {
  id: string;
  /** KaTeX-able label (the expression at this node). */
  label: string;
  /** Grammatical category of this node. */
  category: "sentence" | "formula" | "term" | "symbol" | "quantifier";
  children?: ParseNode[];
}

export interface ParseTreeViz extends VizBase {
  kind: "parse-tree";
  root: ParseNode;
  /** Optional malformed string to show *failing* to parse, side by side. */
  malformedExample?: { input: string; reason: string };
}

export interface ComparisonRow {
  /** Row label, e.g. the sentence under test. KaTeX-able. */
  label: string;
  cells: Record<string, ComparisonCell>;
}
export interface ComparisonCell {
  value: "yes" | "no" | "n/a";
  /** Tooltip / sub-label explaining the verdict. */
  note?: string;
}
export interface ComparisonTableViz extends VizBase {
  kind: "comparison-table";
  /** Column keys in order, e.g. ["Well-formed?", "Provable in PA?", "True in ℕ?"]. */
  columns: string[];
  rows: ComparisonRow[];
}

// ---------------------------------------------------------------------------
// Quiz
// ---------------------------------------------------------------------------

export type QuizQuestion =
  | MultipleChoiceQ
  | MultiSelectQ
  | TrueFalseQ
  | ClassificationQ
  | FillInQ
  | MatchingQ;

interface QuizBase {
  id: string;
  prompt: string; // KaTeX-able
  /** Why the correct answer is correct — always shown after answering. */
  explanation: string;
}

export interface MultipleChoiceQ extends QuizBase {
  type: "multiple-choice";
  options: string[];
  /** Index into options. */
  correct: number;
  /** Optional per-wrong-option explanations, keyed by option index as string. */
  wrongExplanations?: Record<string, string>;
}

export interface MultiSelectQ extends QuizBase {
  type: "multi-select";
  options: string[];
  /** Indices that should be selected. */
  correct: number[];
}

export interface TrueFalseQ extends QuizBase {
  type: "true-false";
  correct: boolean;
}

/** Sort each item into exactly one bucket. Used for the well-formedness
 *  classifier and the four-level-map classification. */
export interface ClassificationQ extends QuizBase {
  type: "classification";
  buckets: string[];
  items: { id: string; label: string; correctBucket: string }[];
}

/** Fill in a missing step (e.g. a derivation line). The learner's text is
 *  normalized (whitespace collapsed, a few notational variants folded) and
 *  matched against `accepted`. Used for the 2+2=4 derivation. */
export interface FillInQ extends QuizBase {
  type: "fill-in";
  /** Context shown above the blank, KaTeX-able (e.g. the derivation so far). */
  before?: string;
  /** Context shown below the blank. */
  after?: string;
  /** Accepted answers (post-normalization, case-insensitive). */
  accepted: string[];
  /** Shown as the input's placeholder/hint. */
  placeholder?: string;
}

/** Match each left item (notation) to its right meaning. Used for the symbol
 *  glossary checks (e.g. ⊢, ⊨, ⌜P⌝, Con(T)). */
export interface MatchingQ extends QuizBase {
  type: "matching";
  /** Left column, e.g. notation. */
  left: { id: string; label: string }[];
  /** Right column, e.g. meanings. Shown shuffled in the UI via select boxes. */
  right: { id: string; label: string }[];
  /** Correct pairing: left id → right id. */
  pairs: Record<string, string>;
}

// ---------------------------------------------------------------------------
// Lesson
// ---------------------------------------------------------------------------

export interface Definition {
  term: string;
  short: string;
  expanded?: string;
  example?: string; // KaTeX-able
}

/** A prose block. `body` is markdown-lite: paragraphs split on blank lines,
 *  inline KaTeX via $...$, block KaTeX via $$...$$. */
export interface Section {
  heading?: string;
  body: string;
}

export interface Confusion {
  /** The wrong belief, stated plainly. */
  misconception: string;
  /** The correction. */
  correction: string;
}

export interface Lesson {
  id: string;
  stage: number;
  title: string;
  /** One-line "what this stage is about" for the sidebar/header. */
  summary: string;
  prerequisites: string[]; // lesson ids
  objectives: string[];
  definitions: Definition[];
  sections: Section[];
  visualizations: VisualizationSpec[];
  confusions: Confusion[];
  quiz: QuizQuestion[];
  /** The "you may proceed when you can…" statement. */
  masteryCheckpoint: string;
}

export interface GlossaryEntry {
  term: string;
  definition: string;
  example?: string;
  related: string[];
}

// ---------------------------------------------------------------------------
// Skill DAG (ADR-0001) — the prerequisite graph that is the primary navigation.
// A "lesson" is content attached to a concept node; the linear ladder is one
// topological ordering of this graph.
// ---------------------------------------------------------------------------

export type NodeKind = "concept" | "skill" | "achievement";

/** v1 authors only these three. meta_level_of / encodes_as / contrasts_with are
 *  reserved in the type but deliberately not authored yet (ADR-0001). */
export type EdgeKind =
  | "prerequisite_for"
  | "orients" // soft, non-gating link (the orientation map → the starting atoms)
  | "assesses"
  | "remediates"
  | "meta_level_of"
  | "encodes_as"
  | "contrasts_with";

export type Branch =
  | "foundations"
  | "categories"
  | "composition"
  | "examples"
  | "functors"
  | "naturality"
  | "universal"
  | "monads";

export interface SkillNode {
  id: string;
  kind: NodeKind;
  title: string;
  shortDescription: string;
  branch: Branch;
  /** concept/skill nodes: the stage id whose content this node renders. */
  lessonId?: string;
  /** achievement nodes: the capstone task id(s) that earn this node. */
  assessmentIds?: string[];
  /** hand-laid position for the homepage DAG layout. */
  position?: { x: number; y: number };
}

export interface SkillEdge {
  id: string;
  source: string;
  target: string;
  kind: EdgeKind;
  label?: string;
}

export interface SkillGraph {
  nodes: SkillNode[];
  edges: SkillEdge[];
}

/** Runtime state of a node for the learner, derived from progress + edges. */
export type NodeState = "locked" | "available" | "passed" | "current";

// ---------------------------------------------------------------------------
// Assessment (achievement = demonstrated capability)
// ---------------------------------------------------------------------------

export type AssessmentKind = "deterministic" | "llm-judged" | "hybrid";

export interface Misconception {
  id: string;
  description: string;
  /** nodes to revisit when this misconception is detected. */
  remediationNodeIds: string[];
  /** a fatal misconception fails the task regardless of other credit. */
  fatal?: boolean;
}

export interface RubricCriterion {
  id: string;
  description: string;
  maxScore: number;
}

export interface Rubric {
  id: string;
  criteria: RubricCriterion[];
}

export interface AssessmentTask {
  id: string;
  /** the achievement node this capstone earns. */
  nodeId: string;
  kind: AssessmentKind;
  title: string;
  /** capstone prompt (KaTeX/markdown + @n/@t chips). */
  prompt: string;
  /** deterministic component, graded by the existing Quiz engine. */
  deterministic?: QuizQuestion[];
  /** open-ended component: the learner writes an explanation graded by the LLM
   *  judge (Phase C). Stored locally until then. */
  openEnded?: {
    /** prompt for the written part. */
    prompt: string;
    rubricId: string;
  };
  requiredConcepts: string[];
  fatalMisconceptions: Misconception[];
  /** default 0.8. */
  passThreshold: number;
}

/** Structured result returned by the LLM judge backend (Phase C). */
export interface JudgeResult {
  score: number; // 0..100
  passed: boolean;
  confidence: "low" | "medium" | "high";
  criterionScores: {
    criterionId: string;
    score: number;
    maxScore: number;
    comment: string;
  }[];
  detectedMisconceptions: string[];
  missingConcepts: string[];
  feedbackForLearner: string;
  suggestedRemediationNodeIds: string[];
  followUpQuestion?: string | null;
}
