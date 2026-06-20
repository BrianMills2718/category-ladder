/**
 * Notation registry — every symbol the lessons use, each with a name, a plain
 * meaning, and a concrete example. Drives inline definition chips (@n{key}) and
 * the per-stage notation rollup, so no symbol is ever used undefined.
 *
 * `glyph` is the KaTeX shown on the inline chip; `meaning`/`example` may contain
 * inline `$...$` math.
 */
export interface NotationEntry {
  glyph: string;
  name: string;
  meaning: string;
  example: string;
}

export const NOTATION: Record<string, NotationEntry> = {
  obj: {
    glyph: "A",
    name: "an object",
    meaning: "An object of a category. It's opaque — you never look inside it; you only interact with it through arrows.",
    example: "A set, a type, or a point of an ordering.",
  },
  cat: {
    glyph: "\\mathcal{C}",
    name: "a category",
    meaning: "Objects plus morphisms (arrows) between them, with an associative composition and an identity arrow on every object.",
    example: "$\\mathbf{Set}$: objects are sets, arrows are functions.",
  },
  arrow: {
    glyph: "f\\colon A\\to B",
    name: "morphism (arrow)",
    meaning: "A morphism $f$ from object $A$ to object $B$ — a structure-respecting map, but treated abstractly (you compose arrows; you don't peek inside objects).",
    example: "A function, a $\\le$ step in an ordering, or a program of type $A\\to B$.",
  },
  compose: {
    glyph: "\\circ",
    name: "composition",
    meaning: "$g\\circ f$ means 'do $f$, then $g$'. Defined exactly when $f\\colon A\\to B$ and $g\\colon B\\to C$, and gives an arrow $A\\to C$.",
    example: "$f\\colon A\\to B,\\ g\\colon B\\to C \\;\\Rightarrow\\; g\\circ f\\colon A\\to C$.",
  },
  id: {
    glyph: "\\mathrm{id}_A",
    name: "identity morphism",
    meaning: "Every object $A$ has an arrow that does nothing, $\\mathrm{id}_A\\colon A\\to A$. It's the unit for composition.",
    example: "$f\\circ\\mathrm{id}_A = f = \\mathrm{id}_B\\circ f$.",
  },
  hom: {
    glyph: "\\mathrm{Hom}(A,B)",
    name: "hom-set",
    meaning: "The collection of all morphisms from $A$ to $B$.",
    example: "In $\\mathbf{Set}$, $\\mathrm{Hom}(A,B)$ is all functions $A\\to B$.",
  },
  F: {
    glyph: "F",
    name: "a functor",
    meaning: "A map $F\\colon\\mathcal{C}\\to\\mathcal{D}$ sending objects to objects and arrows to arrows, preserving identities and composition.",
    example: "$\\mathrm{List}$ sends a type $A$ to $\\mathrm{List}\\,A$, and a function $f$ to $\\mathrm{map}\\,f$.",
  },
  nat: {
    glyph: "\\alpha\\colon F\\Rightarrow G",
    name: "natural transformation",
    meaning: "A map between two functors: for each object $A$ an arrow $\\alpha_A\\colon FA\\to GA$, compatible with every morphism (the 'naturality square' commutes).",
    example: "$\\mathrm{reverse}\\colon \\mathrm{List}\\Rightarrow\\mathrm{List}$.",
  },
  iso: {
    glyph: "\\cong",
    name: "isomorphic",
    meaning: "$A\\cong B$: there are arrows both ways whose composites are the identities. In category theory, 'the same' almost always means isomorphic, not literally equal.",
    example: "$A\\times B \\cong B\\times A$.",
  },
  product: {
    glyph: "A\\times B",
    name: "product",
    meaning: "An object $A\\times B$ with two projection arrows, universal: any object mapping to both $A$ and $B$ factors through it uniquely.",
    example: "In $\\mathbf{Set}$, the cartesian product; in types, a pair/tuple $(a,b)$.",
  },
};
