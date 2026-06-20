# The Category Ladder

A learner-facing **skill tree** for the foundations of **category theory** —
math-first, with a code example for every idea. The thesis: *think in arrows, not
elements.* An object is an opaque black box; all the content lives in the
morphisms between objects and how they compose.

The homepage is a typed **prerequisite DAG**: concept nodes (the lessons) plus
**achievement** nodes earned by performance assessment, not by viewing content.
Pick a goal (dropdown or free text) and the tree highlights its prerequisite
sub-DAG and your recommended next node.

**MVP curriculum (7 nodes):** Think in Arrows (orientation) → What Is a Category →
Composition & the Laws → Categories Are Everywhere → Functors → Natural
Transformations → Products & Universal Properties. Coming next: limits,
adjunctions, monads, Yoneda.

Built by reusing the [Concept Ladder](https://github.com/BrianMills2718/godel-concept-ladder)
framework (content-driven React/TS + KaTeX + React Flow), swapping in CT content.

## Stack
- Vite + React + TypeScript, KaTeX for math, React Flow for the typed diagrams
- Content is plain data (`src/content/`); markdown supports fenced code blocks
- No backend required — deterministic quizzes + self-assess. (Open-ended
  achievement grading can use the optional LLM-judge backend from the sibling
  repo; without it, it degrades to self-assess.)

## Develop
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # static bundle (relative paths → deploys anywhere)
npm run validate   # structural + reference-closure check of all content
npm run check      # typecheck + validate + build
```

## Architecture
- `src/types.ts` — content contract (Lesson, typed graph nodes/edges, quiz/assessment unions)
- `src/content/lessons/` — one file per topic; register in `lessons/index.ts`
- `src/content/{notation,glossary,graph,assessments,goalMap}.ts`
- `src/components/` — skill tree, node detail, quiz engine, KaTeX+markdown renderer, diagram viz
- `scripts/validate-content.mjs` — DAG/quiz/reference-closure invariants

## Content invariants (enforced)
- **No forward references**: every `@t{term}` a node uses must be introduced at
  that node or a prerequisite (closure checker). Symbols (`@n{}`) are
  self-contained chips.
- **Think in arrows**: arguments are made with morphisms/composition, not the
  insides of objects; "the same" means *isomorphic*, not equal.
- Every concept shows a **math face** (sets/diagrams) and a **code face** (types/functions).
