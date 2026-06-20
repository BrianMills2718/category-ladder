/**
 * Achievement capstones. Each achievement node is earned by passing one of these
 * — a deterministic component (graded by the Quiz engine) plus, for most, an
 * open-ended explanation graded by the LLM judge (self-assess if no backend).
 * Fatal misconceptions fail the task regardless of other credit and route to
 * remediation nodes.
 */
import type { AssessmentTask, Misconception, Rubric } from "../types";

const M: Record<string, Misconception> = {
  elements: { id: "elements", description: "Reasons about the insides/elements of objects instead of the arrows between them.", remediationNodeIds: ["c-orientation", "c-category"], fatal: true },
  composeAny: { id: "compose-any", description: "Thinks any two morphisms compose (ignores that target/source must match).", remediationNodeIds: ["c-category"], fatal: true },
  morphismFunction: { id: "morphism-function", description: "Insists morphisms must be functions (misses preorders/monoids).", remediationNodeIds: ["c-examples"], fatal: true },
  functorObjectsOnly: { id: "functor-objects-only", description: "Treats a functor as acting only on objects, not on morphisms.", remediationNodeIds: ["c-functor"], fatal: true },
  natSingle: { id: "nat-single", description: "Treats a natural transformation as one function and/or ignores naturality.", remediationNodeIds: ["c-natural"], fatal: true },
  productPairs: { id: "product-pairs", description: "Defines the product as 'the set of pairs' rather than by its universal property.", remediationNodeIds: ["c-product"], fatal: true },
  isoEqual: { id: "iso-equal", description: "Treats isomorphic as literally equal.", remediationNodeIds: ["c-orientation", "c-product"], fatal: true },
};

export const RUBRICS: Record<string, Rubric> = {
  "rub-generic": {
    id: "rub-generic",
    criteria: [
      { id: "correct", description: "Conceptually correct and applied to the concrete example, not memorized vocabulary.", maxScore: 70 },
      { id: "arrows", description: "Argues with arrows/composition, not the insides of objects.", maxScore: 30 },
    ],
  },
  "rub-naturality": {
    id: "rub-naturality",
    criteria: [
      { id: "family", description: "Describes a natural transformation as a family of components, one per object.", maxScore: 35 },
      { id: "square", description: "States the naturality square correctly and what it guarantees.", maxScore: 40 },
      { id: "example", description: "Connects to a concrete example (e.g. a polymorphic function).", maxScore: 25 },
    ],
  },
  "rub-universal": {
    id: "rub-universal",
    criteria: [
      { id: "projections", description: "Gives the projections and the unique-factoring condition.", maxScore: 45 },
      { id: "uptoiso", description: "Says the universal property determines the object up to isomorphism.", maxScore: 30 },
      { id: "noelements", description: "Avoids defining it as 'the set of pairs'.", maxScore: 25 },
    ],
  },
};

const T = (t: AssessmentTask): AssessmentTask => t;

export const ASSESSMENTS: AssessmentTask[] = [
  T({
    id: "cap-category",
    nodeId: "a-spot-category",
    kind: "hybrid",
    title: "Recognize a category",
    prompt: "Decide which of these form a category, then justify with the data and laws.",
    deterministic: [
      {
        id: "cat-q1", type: "multi-select",
        prompt: "Which of these are categories?",
        options: [
          "Sets and functions ($\\mathbf{Set}$)",
          "A preorder: objects = elements, one arrow $x\\to y$ iff $x\\le y$",
          "A monoid as a one-object category (arrows = elements)",
          "Objects = sets, 'morphisms' = arbitrary relations with no composition rule",
        ],
        correct: [0, 1, 2],
        explanation:
          "The first three have associative composition + identities. The fourth gives no lawful composition, so it isn't (yet) a category.",
      },
    ],
    openEnded: { prompt: "Pick the preorder example and explain why it satisfies the category laws — using arrows (composition = transitivity, identity = reflexivity), not the elements' internals.", rubricId: "rub-generic" },
    requiredConcepts: ["category", "composition", "identity"],
    fatalMisconceptions: [M.composeAny, M.morphismFunction],
    passThreshold: 0.8,
  }),
  T({
    id: "cap-functor",
    nodeId: "a-functor",
    kind: "hybrid",
    title: "Spot a functor",
    prompt: "Check functoriality.",
    deterministic: [
      {
        id: "fun-q1", type: "multi-select",
        prompt: "Which conditions must a functor $F$ satisfy?",
        options: [
          "sends objects to objects",
          "sends each $f\\colon A\\to B$ to $F(f)\\colon FA\\to FB$",
          "$F(\\mathrm{id}_A)=\\mathrm{id}_{FA}$",
          "$F(g\\circ f)=F(g)\\circ F(f)$",
        ],
        correct: [0, 1, 2, 3],
        explanation:
          "A functor acts on both objects and morphisms and preserves identities and composition.",
      },
    ],
    openEnded: { prompt: "Explain why `List` (with `fmap = map`) is a functor: what it does to a function `f :: A -> B`, and why the two functor laws hold.", rubricId: "rub-generic" },
    requiredConcepts: ["functor", "functor laws"],
    fatalMisconceptions: [M.functorObjectsOnly],
    passThreshold: 0.8,
  }),
  T({
    id: "cap-naturality",
    nodeId: "a-naturality",
    kind: "llm-judged",
    title: "Read a naturality square",
    prompt: "Explain a natural transformation and its naturality square.",
    openEnded: { prompt: "Explain what a natural transformation $\\alpha\\colon F\\Rightarrow G$ is (a family of components), state the naturality square for $f\\colon A\\to B$, and say what it guarantees — then connect it to a polymorphic function like `reverse`.", rubricId: "rub-naturality" },
    requiredConcepts: ["natural transformation", "naturality square", "functor"],
    fatalMisconceptions: [M.natSingle],
    passThreshold: 0.8,
  }),
  T({
    id: "cap-universal",
    nodeId: "a-universal",
    kind: "hybrid",
    title: "Define by universal property",
    prompt: "State the product by its universal property and match it to code.",
    deterministic: [
      {
        id: "uni-q1", type: "matching",
        prompt: "Match each categorical piece to its code counterpart.",
        left: [
          { id: "pi", label: "projection $\\pi_1$" },
          { id: "fac", label: "unique factoring $\\langle x_1,x_2\\rangle$" },
          { id: "obj", label: "the product object $A\\times B$" },
        ],
        right: [
          { id: "r1", label: "fst" },
          { id: "r2", label: "the pairing function" },
          { id: "r3", label: "the tuple type (a, b)" },
        ],
        pairs: { pi: "r1", fac: "r2", obj: "r3" },
        explanation: "Projection = fst; unique factoring = the pairing function; product object = the tuple type.",
      },
    ],
    openEnded: { prompt: "State the universal property of $A\\times B$ (projections + unique factoring), and explain why this defines it only up to isomorphism — without ever saying 'the set of pairs'.", rubricId: "rub-universal" },
    requiredConcepts: ["product", "universal property", "isomorphism"],
    fatalMisconceptions: [M.productPairs, M.isoEqual],
    passThreshold: 0.8,
  }),
];

export const ASSESSMENT_BY_ID: Record<string, AssessmentTask> = Object.fromEntries(
  ASSESSMENTS.map((a) => [a.id, a]),
);
