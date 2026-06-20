# category-ladder — project instructions

A skill-tree site teaching the foundations of **category theory**, math-first
with code examples. Built by reusing the godel-concept-ladder framework.

## Core mission
**Think in arrows, not elements.** Objects are opaque; the content is in the
morphisms and their composition. "The same" means **isomorphic**, not equal.
Universal properties define objects by their relationships, up to isomorphism.
Every concept gets a **math face** (sets/diagrams) *and* a **code face**
(types/functions, fenced ```haskell``` blocks).

## Non-negotiables
- **Math correctness is the product.** Be precise: composition needs matching
  source/target; functor laws ($F\,\mathrm{id}=\mathrm{id}$, $F(g\circ f)=Fg\circ Ff$);
  naturality square ($G(f)\circ\alpha_A=\alpha_B\circ F(f)$); universal properties
  pin objects down only up to isomorphism. A subtle content error is a critical bug.
- **No forward references (prerequisite closure).** Every `@t{term}` must resolve
  to a glossary entry AND be introduced (in a lesson's `definitions`) at that node
  or a transitive prerequisite. Enforced by `scripts/validate-content.mjs`. The
  orientation node (`cat-orientation`) is the only exempt previewer. `@n{}`
  notation chips are self-contained.
- **Every symbol defined at use** via `@n{key}` (notation.ts) / `@t{slug}` (glossary).
- **Verify by running it.** `npm run check` (tsc + validator + build). The headless
  visual pass (`npm run screenshots`, puppeteer, `--disable-dev-shm-usage` for WSL)
  is mandatory before declaring UI done.

## Framework notes (inherited)
- The typed-graph viz renders **commutative diagrams**: node `layer` ∈
  {object, morphism, functor, natural, construction}; edge kinds include
  `morphism`, `composite`, `functor_action`, `naturality`, `universal`.
- Skill DAG in `graph.ts`; achievements are capstones in `assessments.ts`.
- Hard-won lessons from the sibling repo still apply: useSyncExternalStore
  getSnapshot must return stable refs; don't share a global regex across recursive
  calls (infinite loop). See git history there.
