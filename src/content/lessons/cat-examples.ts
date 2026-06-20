/**
 * Examples — Set, Hask, a preorder, a monoid. The point: morphisms are not
 * always functions; "category" is a very general shape.
 */
import type { Lesson } from "../../types";

export const catExamples: Lesson = {
  id: "cat-examples",
  stage: 3,
  title: "Categories Are Everywhere",
  summary:
    "Four very different categories — sets, types, an ordering, and a monoid — to break the habit of thinking 'morphism = function'. An arrow is whatever the category says it is.",
  prerequisites: ["cat-composition"],
  objectives: [
    "Give examples where morphisms are not functions.",
    "See an ordering as a category (one arrow = '≤').",
    "See a monoid as a one-object category (arrows = elements).",
  ],
  definitions: [
    { term: "preorder", short: "A set with a reflexive, transitive $\\le$ — exactly a category with at most one arrow between any two objects." },
    { term: "monoid", short: "A set with an associative operation and a unit — exactly a category with one object.", example: "Strings under concatenation, with the empty string as unit." },
  ],
  sections: [
    {
      heading: "Sets and types (familiar)",
      body: `- **$\\mathbf{Set}$**: objects are sets, @t{morphism}s are functions. The home category of classical math.
- **Hask**: objects are types, morphisms are functions. The home category of typed programming.

Both have function composition and identity functions — they're categories for the reasons in the last two lessons.`,
    },
    {
      heading: "An ordering is a category",
      body: `Take any @t{preorder} — a set with $\\le$ that's reflexive ($x\\le x$) and transitive ($x\\le y\\le z\\Rightarrow x\\le z$). Make it a @t{category}:

- **objects** = the elements;
- **one arrow $x\\to y$** exactly when $x\\le y$ (and none otherwise).

Then @t{composition} is transitivity, and the @t{identity} on $x$ is reflexivity $x\\le x$. Here a "morphism" is just the *fact* that $x\\le y$ — definitely not a function.`,
    },
    {
      heading: "A monoid is a one-object category",
      body: `Flip it around: take a @t{monoid} — one associative operation with a unit. Make a category with a **single object** $\\star$, and let the **arrows $\\star\\to\\star$ be the monoid's elements**, with composition = the monoid operation and identity = the unit.

\`\`\`haskell
-- the monoid of strings = a one-object category
-- arrows star -> star  are strings
compose :: String -> String -> String
compose = (++)        -- composition = concatenation
identity :: String
identity = ""         -- the identity arrow
\`\`\`

So "a category with one object" and "a monoid" are the same thing. Same axioms, different picture.`,
    },
  ],
  visualizations: [
    {
      id: "ex-poset",
      kind: "typed-graph",
      title: "An ordering $0\\le 1\\le 2$ as a category",
      textualSummary:
        "Objects 0,1,2 with one arrow 0→1 (because 0≤1), one arrow 1→2 (1≤2), and the composite 0→2 (0≤2, by transitivity). Each object also has its identity (reflexivity). Morphisms here are order-facts, not functions.",
      layers: ["object", "morphism"],
      nodes: [
        { id: "0", type: "Object", layer: "object", label: "$0$", position: { x: 40, y: 60 } },
        { id: "1", type: "Object", layer: "object", label: "$1$", position: { x: 240, y: 60 } },
        { id: "2", type: "Object", layer: "object", label: "$2$", position: { x: 440, y: 60 } },
      ],
      edges: [
        { id: "a", source: "0", target: "1", type: "morphism", label: "$\\le$", layer: "morphism" },
        { id: "b", source: "1", target: "2", type: "morphism", label: "$\\le$", layer: "morphism" },
        { id: "c", source: "0", target: "2", type: "composite", label: "$\\le$ (transitivity)", layer: "morphism" },
      ],
    },
  ],
  confusions: [
    {
      misconception: "Morphisms are always functions between sets.",
      correction:
        "No — in a preorder a morphism is the fact $x\\le y$; in a monoid it's an element. 'Morphism' means whatever arrows the category declares, as long as they compose and have identities.",
    },
    {
      misconception: "A category needs many objects.",
      correction:
        "One object is fine — that's exactly a monoid. Even zero or one arrow between objects is fine (a preorder).",
    },
  ],
  quiz: [
    {
      id: "ex-q1",
      type: "multiple-choice",
      prompt: "In the category of a preorder, what is a morphism $x\\to y$?",
      options: [
        "a function from $x$ to $y$",
        "the fact that $x\\le y$ (it exists iff $x\\le y$, and is unique)",
        "an element of $x$",
        "an isomorphism",
      ],
      correct: 1,
      explanation:
        "One arrow exists exactly when $x\\le y$. Composition is transitivity; identities are reflexivity.",
    },
    {
      id: "ex-q2",
      type: "true-false",
      prompt: "True or false: a monoid is the same thing as a category with exactly one object.",
      correct: true,
      explanation:
        "Yes. Arrows of the single object = monoid elements; composition = the operation; identity = the unit.",
    },
    {
      id: "ex-q3",
      type: "classification",
      prompt: "What are the morphisms in each category?",
      buckets: ["Functions", "Order-facts (≤)", "Monoid elements"],
      items: [
        { id: "a", label: "$\\mathbf{Set}$", correctBucket: "Functions" },
        { id: "b", label: "a preorder", correctBucket: "Order-facts (≤)" },
        { id: "c", label: "a one-object category", correctBucket: "Monoid elements" },
      ],
      explanation:
        "Set → functions; preorder → the relation $\\le$; one-object category → the monoid's elements.",
    },
  ],
  masteryCheckpoint:
    "You can give a category whose morphisms are not functions (a preorder or a monoid) and explain why it still satisfies the category laws.",
};
