/**
 * Orientation — Start Here: Think in Arrows. Optional, non-gating overview that
 * previews the central move (objects are opaque; arrows + composition are
 * everything; "same" means isomorphic). Exempt from the closure check.
 */
import type { Lesson } from "../../types";

export const catOrientation: Lesson = {
  id: "cat-orientation",
  stage: 0,
  title: "Start Here: Think in Arrows",
  summary:
    "A short, skippable overview. Category theory can feel abstract, but it rests on one move: stop looking inside things and watch the arrows between them. An object is a black box; all the information lives in the maps in and out of it, and in how those maps compose.",
  prerequisites: [],
  objectives: [
    "Hold onto one idea: pay attention to arrows, not the insides of objects.",
    "Know that “the same” in CT usually means isomorphic, not equal.",
    "Know you can skip this and come back — it blocks nothing.",
  ],
  definitions: [
    { term: "object", short: "A 'thing' in a category, treated as an opaque black box — known only by its arrows.", example: "A set, a type." },
    { term: "morphism", short: "An arrow @n{arrow} between objects. The real content of a category.", example: "A function $A\\to B$." },
  ],
  sections: [
    {
      heading: "The one move",
      body: `Most of math describes things by what they're *made of*: a set has elements, a group has a multiplication table. Category theory makes a different bet: **describe a thing by how it relates to everything else.**

You have @n{obj}**objects** (draw them as dots) and @n{arrow}**morphisms** (arrows between dots). You are *not allowed* to open an object up. All you can do is follow arrows and **compose** them. Surprisingly, that's enough to define products, functions, even logic — by their *arrow patterns* alone.`,
    },
    {
      heading: "Sameness is isomorphism",
      body: `Because objects are opaque, you almost never say two of them are *equal*. Instead you say they are **isomorphic** (@n{iso}): there are arrows both ways that undo each other. Isomorphic objects are interchangeable for every categorical purpose — "the same up to relabeling".

This is the source of a lot of CT's power *and* of beginner confusion: $A\\times B$ and $B\\times A$ are not literally the same set of pairs, but they are isomorphic, and CT treats that as good enough.`,
    },
    {
      heading: "The code lens",
      body: `If you program, you already use this: **objects are types, arrows are functions, and composition is function composition.**

\`\`\`haskell
-- objects: types A, B, C    arrows: functions
f :: A -> B
g :: B -> C
g . f :: A -> C          -- composition: do f, then g
id :: A -> A             -- the identity arrow
\`\`\`

Every idea on this site has a math face (sets, diagrams) and a programming face (types, functions). We'll show both.`,
    },
    {
      heading: "What to do",
      body: `You don't need to master this page — it's a map, not a lesson. **Start with “What Is a Category”** (the highlighted node). Come back here whenever the abstraction feels untethered: *it's just dots and arrows that compose.*`,
    },
  ],
  visualizations: [
    {
      id: "orient-compose",
      kind: "typed-graph",
      title: "Three objects, two arrows, one composite",
      textualSummary:
        "Objects A, B, C are dots. An arrow f goes A→B and g goes B→C. Their composite g∘f goes A→C directly. Category theory studies exactly this: objects and the arrows between them, and how arrows compose.",
      layers: ["object", "morphism"],
      nodes: [
        { id: "A", type: "Object", layer: "object", label: "$A$", position: { x: 40, y: 60 } },
        { id: "B", type: "Object", layer: "object", label: "$B$", position: { x: 260, y: 60 } },
        { id: "C", type: "Object", layer: "object", label: "$C$", position: { x: 480, y: 60 } },
      ],
      edges: [
        { id: "f", source: "A", target: "B", type: "morphism", label: "$f$", layer: "morphism" },
        { id: "g", source: "B", target: "C", type: "morphism", label: "$g$", layer: "morphism" },
        { id: "gf", source: "A", target: "C", type: "composite", label: "$g\\circ f$", layer: "morphism" },
      ],
    },
  ],
  confusions: [
    {
      misconception: "An object is a set, so I should reason about its elements.",
      correction:
        "In category theory an object is opaque. You reason with the arrows in and out of it. (Even in $\\mathbf{Set}$, the categorical viewpoint avoids peeking at elements where it can.)",
    },
    {
      misconception: "“The same” means equal.",
      correction:
        "It usually means **isomorphic** (@n{iso}): arrows both ways that cancel. $A\\times B$ and $B\\times A$ are isomorphic, not equal, and that's the right notion of sameness here.",
    },
  ],
  quiz: [
    {
      id: "o-q1",
      type: "multiple-choice",
      prompt: "In category theory, how do you study an object?",
      options: [
        "By listing its elements.",
        "By the morphisms (arrows) into and out of it, and how they compose.",
        "By its size.",
        "By opening it up to see its parts.",
      ],
      correct: 1,
      explanation:
        "Objects are opaque; the content is in the arrows and their composition. That's the whole shift.",
    },
    {
      id: "o-q2",
      type: "true-false",
      prompt: "True or false: in category theory, “$A$ and $B$ are the same” usually means they are isomorphic, not literally equal.",
      correct: true,
      explanation:
        "Right. Isomorphism — arrows both ways that cancel — is the working notion of sameness.",
    },
    {
      id: "o-q3",
      type: "multiple-choice",
      prompt: "Which everyday programming idea is the closest match to 'morphisms compose'?",
      options: [
        "adding numbers",
        "function composition: `g . f`",
        "declaring a variable",
        "printing to the screen",
      ],
      correct: 1,
      explanation:
        "Objects are like types and morphisms like functions; composing arrows is exactly `g . f`.",
    },
  ],
  masteryCheckpoint:
    "You can say the core move in plain words: don't look inside objects; study the arrows between them and how they compose — and 'the same' means isomorphic.",
};
