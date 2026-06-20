/**
 * Glossary. One concise definition per category-theory term, with an example and
 * related terms. The closure checker requires that any `@t{term}` used in a
 * lesson is introduced (defined) at that node or an upstream prerequisite.
 */
import type { GlossaryEntry } from "../types";

export const GLOSSARY: GlossaryEntry[] = [
  {
    term: "category",
    definition: "A collection of objects and morphisms (arrows) between them, with an associative composition and an identity arrow on every object.",
    example: "$\\mathbf{Set}$: objects are sets, morphisms are functions.",
    related: ["object", "morphism", "composition", "identity"],
  },
  {
    term: "object",
    definition: "A 'point' of a category. It is opaque — you interact with it only through the arrows in and out of it, never by looking inside.",
    example: "In $\\mathbf{Set}$ an object is a set; in types it's a type.",
    related: ["category", "morphism"],
  },
  {
    term: "morphism",
    definition: "An arrow $f\\colon A\\to B$ between objects — a structure-respecting map, handled abstractly via composition.",
    example: "A function, a $\\le$ relation step, a program $A\\to B$.",
    related: ["category", "composition", "hom-set"],
  },
  {
    term: "composition",
    definition: "Combining arrows head-to-tail: from $f\\colon A\\to B$ and $g\\colon B\\to C$ you get $g\\circ f\\colon A\\to C$. It must be associative.",
    example: "$h\\circ(g\\circ f) = (h\\circ g)\\circ f$.",
    related: ["morphism", "identity", "associativity"],
  },
  {
    term: "identity",
    definition: "The do-nothing arrow $\\mathrm{id}_A\\colon A\\to A$ on each object; the unit for composition.",
    example: "$f\\circ\\mathrm{id}_A = f = \\mathrm{id}_B\\circ f$.",
    related: ["composition", "morphism"],
  },
  {
    term: "associativity",
    definition: "The law that the order of *grouping* compositions doesn't matter (the order of arrows still does).",
    example: "$h\\circ(g\\circ f) = (h\\circ g)\\circ f$.",
    related: ["composition"],
  },
  {
    term: "hom-set",
    definition: "$\\mathrm{Hom}(A,B)$ — the collection of all morphisms from $A$ to $B$.",
    example: "In $\\mathbf{Set}$, all functions $A\\to B$.",
    related: ["morphism", "category"],
  },
  {
    term: "isomorphism",
    definition: "An arrow $f\\colon A\\to B$ with an inverse $g\\colon B\\to A$ such that $g\\circ f=\\mathrm{id}_A$ and $f\\circ g=\\mathrm{id}_B$. Then $A\\cong B$ — 'the same' for categorical purposes.",
    example: "Re-pairing $A\\times B \\cong B\\times A$.",
    related: ["morphism", "identity", "universal property"],
  },
  {
    term: "functor",
    definition: "A structure-preserving map $F\\colon\\mathcal{C}\\to\\mathcal{D}$ between categories: it sends objects to objects and arrows to arrows, preserving identities and composition.",
    example: "$\\mathrm{List}$: a type $A\\mapsto\\mathrm{List}\\,A$, a function $f\\mapsto\\mathrm{map}\\,f$.",
    related: ["category", "morphism", "natural transformation"],
  },
  {
    term: "natural transformation",
    definition: "A map between two functors $F,G\\colon\\mathcal{C}\\to\\mathcal{D}$: a component arrow $\\alpha_A\\colon FA\\to GA$ for each object $A$, such that every naturality square commutes.",
    example: "$\\mathrm{reverse}\\colon\\mathrm{List}\\Rightarrow\\mathrm{List}$.",
    related: ["functor", "naturality square"],
  },
  {
    term: "naturality square",
    definition: "For $\\alpha\\colon F\\Rightarrow G$ and any $f\\colon A\\to B$, the requirement $G(f)\\circ\\alpha_A=\\alpha_B\\circ F(f)$ — 'transform then map' equals 'map then transform'.",
    example: "Why $\\mathrm{reverse}$ commutes with $\\mathrm{map}\\,f$.",
    related: ["natural transformation"],
  },
  {
    term: "universal property",
    definition: "A definition-by-arrows: an object is characterized (uniquely up to isomorphism) by a best/unique-factoring relationship to all other objects, not by what it's made of.",
    example: "The product $A\\times B$ is defined by its projections + unique factoring.",
    related: ["product", "isomorphism"],
  },
  {
    term: "product",
    definition: "An object $A\\times B$ with projections $\\pi_1,\\pi_2$ such that any object mapping to both $A$ and $B$ factors through it uniquely. A universal construction.",
    example: "Cartesian product of sets; a tuple type.",
    related: ["universal property", "isomorphism"],
  },
  {
    term: "preorder",
    definition: "A set with a reflexive, transitive relation $\\le$ — equivalently, a category with at most one morphism between any two objects.",
    example: "$0\\le 1\\le 2$ as a category: one arrow per $\\le$.",
    related: ["category", "morphism"],
  },
  {
    term: "monoid",
    definition: "A set with an associative binary operation and a unit element — equivalently, a category with exactly one object (arrows = elements).",
    example: "Strings under concatenation, unit = the empty string.",
    related: ["category", "composition", "identity"],
  },
  {
    term: "functor laws",
    definition: "The two equations a functor must satisfy: $F(\\mathrm{id}_A)=\\mathrm{id}_{FA}$ (preserve identities) and $F(g\\circ f)=F(g)\\circ F(f)$ (preserve composition).",
    example: "`fmap id = id` and `fmap (g.f) = fmap g . fmap f`.",
    related: ["functor", "composition", "identity"],
  },
  {
    term: "opposite category",
    definition: "$\\mathcal{C}^{op}$ — the same objects with every arrow reversed. Lets each concept have a 'co-' dual (e.g. product vs coproduct).",
    example: "Reversing all arrows turns products into coproducts.",
    related: ["category", "morphism"],
  },
];

export const GLOSSARY_INDEX: Record<string, GlossaryEntry> = Object.fromEntries(
  GLOSSARY.map((e) => [e.term.toLowerCase(), e]),
);
