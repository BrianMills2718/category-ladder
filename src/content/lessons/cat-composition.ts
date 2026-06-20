/**
 * Composition & the Laws — associativity + identity laws. Defines associativity.
 */
import type { Lesson } from "../../types";

export const catComposition: Lesson = {
  id: "cat-composition",
  stage: 2,
  title: "Composition & the Laws",
  summary:
    "Two laws turn 'objects and arrows' into a category: composition is associative, and the identity arrows do nothing. They're what make diagrams behave.",
  prerequisites: ["cat-category"],
  objectives: [
    "State the associativity law for composition.",
    "State the identity (unit) laws.",
    "Explain why these laws let us draw unambiguous diagrams.",
  ],
  definitions: [
    { term: "associativity", short: "Re-grouping compositions doesn't matter: $h\\circ(g\\circ f)=(h\\circ g)\\circ f$.", example: "So $h\\circ g\\circ f$ is unambiguous." },
  ],
  sections: [
    {
      heading: "Law 1 — associativity",
      body: `Given $f\\colon A\\to B$, $g\\colon B\\to C$, $h\\colon C\\to D$, the two ways to fold up the chain agree:

$$h\\circ(g\\circ f) = (h\\circ g)\\circ f.$$

This is @t{associativity}. It means a chain of arrows like $h\\circ g\\circ f$ has **one** meaning — you don't need parentheses. Note: this is about *grouping*, not order; the order of the arrows is fixed by which way they point.`,
    },
    {
      heading: "Law 2 — identities are units",
      body: `For every $f\\colon A\\to B$, composing with the relevant @n{id} changes nothing:

$$f\\circ\\mathrm{id}_A = f = \\mathrm{id}_B\\circ f.$$

So @t{identity} arrows behave like "do nothing" — the unit for @t{composition}, exactly like $1$ for multiplication or the empty step in a journey.`,
    },
    {
      heading: "Why the laws matter: diagrams commute",
      body: `Together the laws mean a **diagram** of objects and arrows is unambiguous: any two arrow-paths with the same start and end that the laws force to be equal give the *same* morphism. We say the diagram **commutes**. Commuting diagrams are how category theory states and proves things — "this path equals that path."

In code these are the laws you (usually silently) rely on:

\`\`\`haskell
(h . g) . f  ==  h . (g . f)     -- associativity
f . id       ==  f               -- identity laws
id . f       ==  f
\`\`\``,
    },
  ],
  visualizations: [
    {
      id: "assoc-square",
      kind: "typed-graph",
      title: "Associativity: one chain, one meaning",
      textualSummary:
        "Objects A,B,C,D in a row with f:A→B, g:B→C, h:C→D. Whether you first form g∘f or h∘g, composing the rest gives the same arrow A→D. So h∘g∘f is unambiguous.",
      layers: ["object", "morphism"],
      nodes: [
        { id: "A", type: "Object", layer: "object", label: "$A$", position: { x: 20, y: 60 } },
        { id: "B", type: "Object", layer: "object", label: "$B$", position: { x: 180, y: 60 } },
        { id: "C", type: "Object", layer: "object", label: "$C$", position: { x: 340, y: 60 } },
        { id: "D", type: "Object", layer: "object", label: "$D$", position: { x: 500, y: 60 } },
      ],
      edges: [
        { id: "f", source: "A", target: "B", type: "morphism", label: "$f$", layer: "morphism" },
        { id: "g", source: "B", target: "C", type: "morphism", label: "$g$", layer: "morphism" },
        { id: "h", source: "C", target: "D", type: "morphism", label: "$h$", layer: "morphism" },
        { id: "hgf", source: "A", target: "D", type: "composite", label: "$h\\circ g\\circ f$", layer: "morphism" },
      ],
    },
  ],
  confusions: [
    {
      misconception: "Associativity means the order of arrows doesn't matter.",
      correction:
        "It's about *grouping*, not order. $h\\circ g\\circ f$ still runs $f$ first; associativity only says where you put parentheses is irrelevant.",
    },
    {
      misconception: "Identities are optional bookkeeping.",
      correction:
        "They're required data and they're load-bearing — without the identity laws, many universal constructions and functor laws wouldn't even type-check.",
    },
  ],
  quiz: [
    {
      id: "comp-q1",
      type: "true-false",
      prompt: "True or false: associativity lets us write $h\\circ g\\circ f$ without parentheses.",
      correct: true,
      explanation:
        "Yes — $h\\circ(g\\circ f)=(h\\circ g)\\circ f$, so the chain has a single unambiguous meaning.",
    },
    {
      id: "comp-q2",
      type: "fill-in",
      prompt: "Complete the identity law: $f\\circ\\mathrm{id}_A = \\;?\\;$ (for $f\\colon A\\to B$).",
      accepted: ["f"],
      placeholder: "the morphism",
      explanation:
        "Composing with the identity on the source changes nothing: $f\\circ\\mathrm{id}_A=f$.",
    },
    {
      id: "comp-q3",
      type: "multiple-choice",
      prompt: "A diagram 'commutes' when…",
      options: [
        "all its arrows are isomorphisms.",
        "any two directed paths with the same start and end give equal composites.",
        "it has no identity arrows.",
        "it can be drawn without crossings.",
      ],
      correct: 1,
      explanation:
        "Commuting = all same-endpoint paths are equal as morphisms. That's how CT states equalities.",
    },
  ],
  masteryCheckpoint:
    "You can state both laws (associativity and identity) and explain that they're what make a commuting diagram unambiguous.",
};
