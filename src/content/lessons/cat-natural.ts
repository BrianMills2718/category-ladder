/**
 * Natural Transformations — maps between functors; the naturality square.
 * Math (components α_A) + code (polymorphic functions like reverse, safeHead).
 */
import type { Lesson } from "../../types";

export const catNatural: Lesson = {
  id: "cat-natural",
  stage: 5,
  title: "Natural Transformations",
  summary:
    "If functors are maps between categories, natural transformations are maps between functors — a coherent family of arrows, one per object. In code they're exactly the 'parametrically polymorphic' functions.",
  prerequisites: ["cat-functor"],
  objectives: [
    "Define a natural transformation as a family of component arrows.",
    "State the naturality square and what it guarantees.",
    "Recognize polymorphic functions (reverse, safeHead) as natural transformations.",
  ],
  definitions: [
    { term: "natural transformation", short: "A map @n{nat} between functors $F,G$: a component $\\alpha_A\\colon FA\\to GA$ for each object, with all naturality squares commuting." },
    { term: "naturality square", short: "For $f\\colon A\\to B$: $G(f)\\circ\\alpha_A=\\alpha_B\\circ F(f)$." },
  ],
  sections: [
    {
      heading: "A map between functors",
      body: `Fix two @t{functor}s $F,G\\colon\\mathcal{C}\\to\\mathcal{D}$. A @t{natural transformation} @n{nat} gives, for **each object** $A$, a single arrow

$$\\alpha_A\\colon FA\\to GA$$

called its **component** at $A$. So it's a whole *family* of arrows, indexed by objects — one coherent way to turn $F$-things into $G$-things everywhere at once.`,
    },
    {
      heading: "The coherence: naturality",
      body: `The family can't be arbitrary. For every morphism $f\\colon A\\to B$, the @t{naturality square} must commute:

$$G(f)\\circ\\alpha_A = \\alpha_B\\circ F(f).$$

In words: **"transform, then map" = "map, then transform".** It doesn't matter whether you apply $\\alpha$ before or after moving along $f$. That single equation is what makes the family *natural* (uniform) rather than a pile of unrelated choices.`,
    },
    {
      heading: "In code: polymorphic functions",
      body: `A function that works "the same way for every type" is a natural transformation between the functors involved:

\`\`\`haskell
reverse  :: List a -> List a     -- a natural transformation List => List
safeHead :: List a -> Maybe a    -- a natural transformation List => Maybe
\`\`\`

Naturality here is the statement that these commute with \`fmap\`:

\`\`\`haskell
reverse . fmap f      ==  fmap f . reverse
fmap f . safeHead     ==  safeHead . fmap f
\`\`\`

By "parametricity", any function with such a polymorphic type is automatically natural — you get the naturality square for free. (This is the precise version of "polymorphic functions can't inspect the elements, only rearrange them".)`,
    },
  ],
  visualizations: [
    {
      id: "naturality",
      kind: "typed-graph",
      title: "The naturality square",
      textualSummary:
        "A square: top-left FA, top-right FB, bottom-left GA, bottom-right GB. Across the top is F(f): FA→FB; across the bottom G(f): GA→GB; down the left α_A: FA→GA; down the right α_B: FB→GB. The square commutes: G(f)∘α_A = α_B∘F(f).",
      layers: ["object", "morphism", "natural"],
      nodes: [
        { id: "FA", type: "Object", layer: "object", label: "$FA$", position: { x: 40, y: 30 } },
        { id: "FB", type: "Object", layer: "object", label: "$FB$", position: { x: 320, y: 30 } },
        { id: "GA", type: "Object", layer: "object", label: "$GA$", position: { x: 40, y: 220 } },
        { id: "GB", type: "Object", layer: "object", label: "$GB$", position: { x: 320, y: 220 } },
      ],
      edges: [
        { id: "Ff", source: "FA", target: "FB", type: "functor_action", label: "$F(f)$", layer: "functor" },
        { id: "Gf", source: "GA", target: "GB", type: "functor_action", label: "$G(f)$", layer: "functor" },
        { id: "aA", source: "FA", target: "GA", type: "naturality", label: "$\\alpha_A$", layer: "natural" },
        { id: "aB", source: "FB", target: "GB", type: "naturality", label: "$\\alpha_B$", layer: "natural" },
      ],
    },
  ],
  confusions: [
    {
      misconception: "A natural transformation is a single function.",
      correction:
        "It's a whole *family* — one component $\\alpha_A$ per object — tied together by the naturality squares. A polymorphic function packages that family as one piece of code.",
    },
    {
      misconception: "Any family of arrows $FA\\to GA$ is natural.",
      correction:
        "Only if every naturality square commutes ($G(f)\\circ\\alpha_A=\\alpha_B\\circ F(f)$). That coherence condition is the whole point.",
    },
  ],
  quiz: [
    {
      id: "n-q1",
      type: "multiple-choice",
      prompt: "A natural transformation $\\alpha\\colon F\\Rightarrow G$ consists of…",
      options: [
        "a single arrow $F\\to G$",
        "a component arrow $\\alpha_A\\colon FA\\to GA$ for each object $A$, with naturality squares commuting",
        "a new functor",
        "an isomorphism of categories",
      ],
      correct: 1,
      explanation:
        "One component per object, coherently tied together by naturality.",
    },
    {
      id: "n-q2",
      type: "fill-in",
      prompt: "Complete the naturality square for $f\\colon A\\to B$: $G(f)\\circ\\alpha_A = \\;?$",
      accepted: ["α_B∘F(f)", "alpha_B . F(f)", "α_B ∘ F(f)", "a_B∘F(f)", "α_B F(f)", "alpha_B∘F(f)"],
      placeholder: "the other path",
      explanation:
        "$G(f)\\circ\\alpha_A=\\alpha_B\\circ F(f)$ — transform-then-map equals map-then-transform.",
    },
    {
      id: "n-q3",
      type: "true-false",
      prompt: "True or false: `reverse :: List a -> List a` is a natural transformation `List ⇒ List`, and naturality is the law `reverse . fmap f = fmap f . reverse`.",
      correct: true,
      explanation:
        "Yes — it's one component per type, and it commutes with `fmap f`, which is exactly the naturality square.",
    },
  ],
  masteryCheckpoint:
    "You can describe a natural transformation as a family of components $\\alpha_A\\colon FA\\to GA$ plus the naturality square, and recognize a polymorphic function as one.",
};
