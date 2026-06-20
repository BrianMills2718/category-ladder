/**
 * Functors — structure-preserving maps between categories. Defines functor +
 * the functor laws. Math (F: C→D) + code (List/Maybe, fmap).
 */
import type { Lesson } from "../../types";

export const catFunctor: Lesson = {
  id: "cat-functor",
  stage: 4,
  title: "Functors",
  summary:
    "A functor is a map between categories that sends objects to objects and arrows to arrows while preserving identities and composition. In code, it's exactly what fmap does.",
  prerequisites: ["cat-composition"],
  objectives: [
    "State what a functor does to objects and to morphisms.",
    "State the two functor laws (preserve identities and composition).",
    "Recognize List/Maybe/Optional as functors via fmap/map.",
  ],
  definitions: [
    { term: "functor", short: "A map @n{F} between categories preserving identities and composition.", example: "$\\mathrm{List}$, $\\mathrm{Maybe}$." },
    { term: "functor laws", short: "$F(\\mathrm{id}_A)=\\mathrm{id}_{FA}$ and $F(g\\circ f)=F(g)\\circ F(f)$." },
  ],
  sections: [
    {
      heading: "What a functor is",
      body: `A @t{functor} @n{F} from a @t{category} $\\mathcal{C}$ to a category $\\mathcal{D}$ does two things at once:

- **on objects**: each object $A$ of $\\mathcal{C}$ goes to an object $FA$ of $\\mathcal{D}$;
- **on morphisms**: each arrow $f\\colon A\\to B$ goes to an arrow $F(f)\\colon FA\\to FB$.

So a functor is a map that respects the *shape* — it carries the dots-and-arrows picture of $\\mathcal{C}$ into $\\mathcal{D}$.`,
    },
    {
      heading: "The two laws",
      body: `To genuinely preserve structure (not just relabel), a functor must obey the @t{functor laws}:

$$F(\\mathrm{id}_A) = \\mathrm{id}_{FA} \\qquad F(g\\circ f) = F(g)\\circ F(f).$$

"Map the identity to the identity" and "mapping a composite is composing the maps". These two equations are what make $F$ a functor rather than an arbitrary assignment.`,
    },
    {
      heading: "Functors in code: fmap",
      body: `A type constructor like \`List\` or \`Maybe\` is a functor: it sends a type \`A\` to \`List A\`, and a function \`f :: A -> B\` to \`map f :: List A -> List B\`.

\`\`\`haskell
-- List as a functor
fmap :: (a -> b) -> (List a -> List b)
fmap = map

-- the functor laws, as code you can test:
fmap id        == id                 -- preserves identity
fmap (g . f)   == fmap g . fmap f    -- preserves composition
\`\`\`

\`Maybe\`/\`Optional\` is a functor the same way (\`fmap f Nothing = Nothing\`, \`fmap f (Just a) = Just (f a)\`). Whenever you "map a function over a container", you're using functoriality — and the laws are why nesting maps behaves.`,
    },
  ],
  visualizations: [
    {
      id: "functor-action",
      kind: "typed-graph",
      title: "A functor sends a square to a square",
      textualSummary:
        "On the left, objects A,B with an arrow f:A→B in category C. A functor F maps them on the right to FA, FB with F(f): FA→FB in category D. F preserves the arrow's shape; the dashed edges show F's action (object↦object, arrow↦arrow).",
      layers: ["object", "morphism", "functor"],
      nodes: [
        { id: "A", type: "Object", layer: "object", label: "$A$", position: { x: 40, y: 30 } },
        { id: "B", type: "Object", layer: "object", label: "$B$", position: { x: 40, y: 200 } },
        { id: "FA", type: "Object", layer: "object", label: "$FA$", position: { x: 360, y: 30 } },
        { id: "FB", type: "Object", layer: "object", label: "$FB$", position: { x: 360, y: 200 } },
      ],
      edges: [
        { id: "f", source: "A", target: "B", type: "morphism", label: "$f$", layer: "morphism" },
        { id: "Ff", source: "FA", target: "FB", type: "morphism", label: "$F(f)$", layer: "morphism" },
        { id: "mapA", source: "A", target: "FA", type: "functor_action", label: "$F$", layer: "functor" },
        { id: "mapB", source: "B", target: "FB", type: "functor_action", label: "$F$", layer: "functor" },
      ],
    },
  ],
  confusions: [
    {
      misconception: "A functor only maps objects (like a function on data).",
      correction:
        "It maps objects AND morphisms. The action on arrows — $f\\mapsto F(f)$ — is the important half; that's what `fmap` does to the *function* you pass it.",
    },
    {
      misconception: "Any assignment of objects-to-objects is a functor.",
      correction:
        "Only if it also acts on arrows and obeys the two laws ($F\\,\\mathrm{id}=\\mathrm{id}$, $F(g\\circ f)=Fg\\circ Ff$). Otherwise it doesn't preserve the structure.",
    },
  ],
  quiz: [
    {
      id: "f-q1",
      type: "multiple-choice",
      prompt: "What does a functor $F$ do to a morphism $f\\colon A\\to B$?",
      options: [
        "nothing — functors only act on objects",
        "gives a morphism $F(f)\\colon FA\\to FB$",
        "gives an object $F(f)$",
        "reverses it to $FB\\to FA$",
      ],
      correct: 1,
      explanation:
        "A functor sends each arrow $f\\colon A\\to B$ to an arrow $F(f)\\colon FA\\to FB$ (covariantly).",
    },
    {
      id: "f-q2",
      type: "multi-select",
      prompt: "Which are the functor laws?",
      options: [
        "$F(\\mathrm{id}_A)=\\mathrm{id}_{FA}$",
        "$F(g\\circ f)=F(g)\\circ F(f)$",
        "$F(A\\times B)=FA\\times FB$",
        "$F(f)=f$",
      ],
      correct: [0, 1],
      explanation:
        "Preserve identities and preserve composition. The others aren't required of a general functor.",
    },
    {
      id: "f-q3",
      type: "true-false",
      prompt: "True or false: `fmap` for `List` witnesses that `List` is a functor — it maps a function `A -> B` to a function `List A -> List B`.",
      correct: true,
      explanation:
        "Exactly. `fmap`/`map` is the action on morphisms, and the functor laws (`fmap id = id`, `fmap (g.f) = fmap g . fmap f`) hold.",
    },
  ],
  masteryCheckpoint:
    "You can say a functor acts on both objects and morphisms and obeys $F\\,\\mathrm{id}=\\mathrm{id}$ and $F(g\\circ f)=Fg\\circ Ff$ — and point to `fmap` as the action on arrows.",
};
