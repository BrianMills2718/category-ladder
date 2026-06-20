/**
 * Products & Universal Properties — defining an object by its arrow-relationship
 * to all others, unique up to isomorphism. Defines isomorphism, universal
 * property, product. Math (projections + unique factoring) + code (tuples).
 */
import type { Lesson } from "../../types";

export const catProduct: Lesson = {
  id: "cat-product",
  stage: 6,
  title: "Products & Universal Properties",
  summary:
    "The payoff of thinking in arrows: define an object not by what it contains but by a universal property — a best, unique-factoring relationship to everything else. The product A×B is the first example.",
  prerequisites: ["cat-functor"],
  objectives: [
    "Define an isomorphism and 'unique up to isomorphism'.",
    "State the universal property of the product.",
    "See the product type / tuple as exactly this universal property in code.",
  ],
  definitions: [
    { term: "isomorphism", short: "An arrow $f$ with an inverse: $g\\circ f=\\mathrm{id}$ and $f\\circ g=\\mathrm{id}$. Then the objects are @n{iso}.", example: "$A\\times B\\cong B\\times A$." },
    { term: "universal property", short: "A definition by arrows: an object is fixed (up to @n{iso}) by a best/unique-factoring relationship to all others." },
    { term: "product", short: "An object @n{product} with projections, universal among objects mapping to both $A$ and $B$." },
  ],
  sections: [
    {
      heading: "First, 'the same': isomorphism",
      body: `An @t{isomorphism} is an arrow $f\\colon A\\to B$ with an inverse $g\\colon B\\to A$ satisfying $g\\circ f=\\mathrm{id}_A$ and $f\\circ g=\\mathrm{id}_B$. When one exists we write $A\\cong B$ and call them **isomorphic**.

Because we never look inside objects, isomorphic objects are *interchangeable*. So categorical definitions only ever pin things down **up to isomorphism** — and that turns out to be exactly enough.`,
    },
    {
      heading: "The universal property of the product",
      body: `What is "$A$ and $B$ together"? Don't say "the set of pairs". Say it with arrows. The @t{product} @n{product} is an object $A\\times B$ equipped with two **projection** arrows
$$\\pi_1\\colon A\\times B\\to A,\\qquad \\pi_2\\colon A\\times B\\to B,$$
with this @t{universal property}: for **any** object $X$ with arrows $x_1\\colon X\\to A$ and $x_2\\colon X\\to B$, there is a **unique** arrow $\\langle x_1,x_2\\rangle\\colon X\\to A\\times B$ making both triangles commute ($\\pi_1\\circ\\langle x_1,x_2\\rangle=x_1$, and similarly for $\\pi_2$).

"Unique factoring through projections" *is* the definition. Any two objects satisfying it are isomorphic — so the product is well-defined up to @t{isomorphism}, without ever mentioning pairs.`,
    },
    {
      heading: "In code: tuples are products",
      body: `The product type is precisely this universal property:

\`\`\`haskell
fst :: (a, b) -> a            -- projection π1
snd :: (a, b) -> b            -- projection π2

-- the unique factoring map  <x1, x2> : X -> (a, b)
pair :: (x -> a) -> (x -> b) -> (x -> (a, b))
pair x1 x2 = \\x -> (x1 x, x2 x)

-- the laws (commuting triangles):
fst . pair x1 x2  ==  x1
snd . pair x1 x2  ==  x2
\`\`\`

Reverse every arrow and you get the **coproduct** (a sum type / \`Either\`): same shape, dual direction. That "reverse the arrows" move is why category theory keeps giving you two theorems for the price of one.`,
    },
  ],
  visualizations: [
    {
      id: "product-up",
      kind: "typed-graph",
      title: "The universal property of $A\\times B$",
      textualSummary:
        "A×B sits at the top with projections π1 to A and π2 to B. Any object X with arrows x1:X→A and x2:X→B factors through A×B by a unique arrow ⟨x1,x2⟩:X→A×B making both triangles commute. That unique-factoring property defines the product up to isomorphism.",
      layers: ["object", "morphism", "construction"],
      nodes: [
        { id: "AxB", type: "Construction", layer: "construction", label: "$A\\times B$", position: { x: 230, y: 30 } },
        { id: "A", type: "Object", layer: "object", label: "$A$", position: { x: 60, y: 200 } },
        { id: "B", type: "Object", layer: "object", label: "$B$", position: { x: 400, y: 200 } },
        { id: "X", type: "Object", layer: "object", label: "$X$", position: { x: 230, y: 320 } },
      ],
      edges: [
        { id: "p1", source: "AxB", target: "A", type: "morphism", label: "$\\pi_1$", layer: "morphism" },
        { id: "p2", source: "AxB", target: "B", type: "morphism", label: "$\\pi_2$", layer: "morphism" },
        { id: "x1", source: "X", target: "A", type: "morphism", label: "$x_1$", layer: "morphism" },
        { id: "x2", source: "X", target: "B", type: "morphism", label: "$x_2$", layer: "morphism" },
        { id: "u", source: "X", target: "AxB", type: "universal", label: "$\\exists!\\,\\langle x_1,x_2\\rangle$", layer: "construction" },
      ],
    },
  ],
  confusions: [
    {
      misconception: "The product $A\\times B$ is by definition the set of pairs.",
      correction:
        "That's one *model*. The categorical definition is the universal property (projections + unique factoring). Pairs satisfy it — and so does anything isomorphic to them.",
    },
    {
      misconception: "A universal property defines a unique object on the nose.",
      correction:
        "It defines it **up to isomorphism**. Any two products of $A$ and $B$ are isomorphic, which is all 'the same' means here.",
    },
  ],
  quiz: [
    {
      id: "p-q1",
      type: "multiple-choice",
      prompt: "The universal property of $A\\times B$ says: for any $X$ with $x_1\\colon X\\to A$, $x_2\\colon X\\to B$, there is…",
      options: [
        "no arrow $X\\to A\\times B$",
        "a unique arrow $X\\to A\\times B$ commuting with both projections",
        "many arrows $X\\to A\\times B$",
        "an arrow $A\\times B\\to X$",
      ],
      correct: 1,
      explanation:
        "Exactly one factoring arrow $\\langle x_1,x_2\\rangle$, making $\\pi_1,\\pi_2$ recover $x_1,x_2$.",
    },
    {
      id: "p-q2",
      type: "true-false",
      prompt: "True or false: a universal property pins an object down only up to isomorphism.",
      correct: true,
      explanation:
        "Yes — any two objects with the same universal property are isomorphic, and that's the right notion of uniqueness in CT.",
    },
    {
      id: "p-q3",
      type: "matching",
      prompt: "Match the categorical piece to its code counterpart for products.",
      left: [
        { id: "pi1", label: "$\\pi_1$" },
        { id: "fac", label: "$\\langle x_1,x_2\\rangle$" },
        { id: "obj", label: "$A\\times B$" },
      ],
      right: [
        { id: "r1", label: "fst" },
        { id: "r2", label: "\\x -> (x1 x, x2 x)" },
        { id: "r3", label: "(a, b)" },
      ],
      pairs: { pi1: "r1", fac: "r2", obj: "r3" },
      explanation:
        "Projection = fst; the unique factoring = the pairing function; the product object = the tuple type.",
    },
  ],
  masteryCheckpoint:
    "You can state the universal property of the product (projections + unique factoring), say it defines $A\\times B$ up to isomorphism, and match it to tuples/fst/snd in code.",
};
