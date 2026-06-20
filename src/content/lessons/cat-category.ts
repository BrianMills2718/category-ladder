/**
 * What Is a Category — the data: objects, morphisms with source/target,
 * composition, identities. The canonical introducer of these terms.
 */
import type { Lesson } from "../../types";

export const catCategory: Lesson = {
  id: "cat-category",
  stage: 1,
  title: "What Is a Category",
  summary:
    "A category is four pieces of data: objects, arrows between them, a way to compose arrows, and an identity arrow on each object — subject to two simple laws.",
  prerequisites: [],
  objectives: [
    "List the data of a category: objects, morphisms, composition, identities.",
    "State the source/target rule that says when two arrows compose.",
    "Recognize the same structure in sets-and-functions and in types-and-programs.",
  ],
  definitions: [
    { term: "category", short: "Objects + morphisms with associative composition and an identity on each object." },
    { term: "object", short: "A 'thing' of the category, treated as opaque — known only through its arrows.", example: "A set, a type." },
    { term: "morphism", short: "An arrow @n{arrow} with a source object and a target object.", example: "A function $A\\to B$." },
    { term: "composition", short: "Combining @n{arrow} head-to-tail: @n{compose}.", example: "$g\\circ f\\colon A\\to C$." },
    { term: "identity", short: "The do-nothing arrow @n{id} on each object.", example: "$\\mathrm{id}_A\\colon A\\to A$." },
    { term: "hom-set", short: "@n{hom} — all morphisms from $A$ to $B$." },
  ],
  sections: [
    {
      heading: "The four pieces",
      body: `A @t{category} @n{cat} is made of:

1. **Objects** — @n{obj}, drawn as dots. Opaque.
2. **Morphisms** — arrows @n{arrow}, each with a definite **source** object and **target** object.
3. **Composition** — given $f\\colon A\\to B$ and $g\\colon B\\to C$ (target of $f$ = source of $g$), there's a composite @n{compose} written $g\\circ f\\colon A\\to C$.
4. **Identities** — every object $A$ has an arrow @n{id} that does nothing.

That's the whole definition of the *data*. The next lesson covers the two **laws** these must satisfy.`,
    },
    {
      heading: "When do arrows compose?",
      body: `Only when they line up: the **target of the first is the source of the second**. You can do $g\\circ f$ when $f\\colon A\\to B$ and $g\\colon B\\to C$. You *cannot* compose two arrows that don't meet. (This is exactly why types must match to compose functions.)`,
    },
    {
      heading: "The same shape in code",
      body: `Take **types as objects** and **functions as morphisms**. Composition is ordinary function composition; the identity is the identity function:

\`\`\`haskell
f :: A -> B           -- a morphism A -> B
g :: B -> C           -- a morphism B -> C
g . f :: A -> C       -- composite (types must line up!)
id :: A -> A          -- identity morphism on A
\`\`\`

This category (types + functions) is often called **Hask**. In math, the analogous category is **Set** (sets + functions). Same four pieces.`,
    },
  ],
  visualizations: [
    {
      id: "cat-data",
      kind: "typed-graph",
      title: "A small category",
      textualSummary:
        "Objects A, B, C with an identity loop on each. An arrow f: A→B and g: B→C compose to g∘f: A→C. A category is exactly this kind of diagram, closed under composition and containing every identity.",
      layers: ["object", "morphism"],
      nodes: [
        { id: "A", type: "Object", layer: "object", label: "$A$", position: { x: 40, y: 80 } },
        { id: "B", type: "Object", layer: "object", label: "$B$", position: { x: 260, y: 80 } },
        { id: "C", type: "Object", layer: "object", label: "$C$", position: { x: 480, y: 80 } },
      ],
      edges: [
        { id: "idA", source: "A", target: "A", type: "identity", label: "$\\mathrm{id}_A$", layer: "morphism" },
        { id: "f", source: "A", target: "B", type: "morphism", label: "$f$", layer: "morphism" },
        { id: "g", source: "B", target: "C", type: "morphism", label: "$g$", layer: "morphism" },
        { id: "gf", source: "A", target: "C", type: "composite", label: "$g\\circ f$", layer: "morphism" },
      ],
    },
  ],
  confusions: [
    {
      misconception: "Any two morphisms can be composed.",
      correction:
        "Only when they line up — target of the first equals source of the second. $g\\circ f$ needs $f\\colon A\\to B$ and $g\\colon B\\to C$.",
    },
    {
      misconception: "Morphisms are always functions.",
      correction:
        "Functions are one example. A morphism is any arrow obeying the rules — a $\\le$ step, a program, a path. The category fixes what counts as an arrow.",
    },
  ],
  quiz: [
    {
      id: "c-q1",
      type: "multiple-choice",
      prompt: "Given $f\\colon A\\to B$ and $g\\colon B\\to C$, which composite is defined?",
      options: ["$f\\circ g$", "$g\\circ f\\colon A\\to C$", "neither", "both, and they're equal"],
      correct: 1,
      wrongExplanations: {
        "0": "$f\\circ g$ would need the target of $g$ ($C$) to be the source of $f$ ($A$) — they don't line up.",
      },
      explanation:
        "Composition needs the arrows to meet: target of $f$ is $B$, source of $g$ is $B$, so $g\\circ f\\colon A\\to C$.",
    },
    {
      id: "c-q2",
      type: "multi-select",
      prompt: "Which are part of the *data* of a category?",
      options: ["objects", "morphisms with source & target", "a composition operation", "an identity on each object"],
      correct: [0, 1, 2, 3],
      explanation:
        "All four. The laws they must obey (associativity, identity) come next.",
    },
    {
      id: "c-q3",
      type: "matching",
      prompt: "Match each category to its objects and morphisms.",
      left: [
        { id: "set", label: "$\\mathbf{Set}$" },
        { id: "hask", label: "Hask (types)" },
      ],
      right: [
        { id: "r1", label: "sets / functions" },
        { id: "r2", label: "types / functions" },
      ],
      pairs: { set: "r1", hask: "r2" },
      explanation:
        "Set = sets + functions; Hask = types + functions. Same four-piece structure, different objects.",
    },
  ],
  masteryCheckpoint:
    "You can list the four pieces of a category and say exactly when two morphisms compose (the target/source must match).",
};
