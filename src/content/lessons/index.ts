/**
 * The ordered lesson list. The rest of the app is data-driven off this array.
 * `UPCOMING` shows the not-yet-authored topics greyed in the sidebar so the
 * learner sees where the ladder is heading.
 */
import type { Lesson } from "../../types";
import { catOrientation } from "./cat-orientation";
import { catCategory } from "./cat-category";
import { catComposition } from "./cat-composition";
import { catExamples } from "./cat-examples";
import { catFunctor } from "./cat-functor";
import { catNatural } from "./cat-natural";
import { catProduct } from "./cat-product";

export const LESSONS: Lesson[] = [
  catOrientation,
  catCategory,
  catComposition,
  catExamples,
  catFunctor,
  catNatural,
  catProduct,
];

/** Not-yet-authored topics, shown greyed in the sidebar. */
export const UPCOMING: { stage: number; title: string }[] = [
  { stage: 7, title: "Limits & Colimits" },
  { stage: 8, title: "Adjunctions (F ⊣ G)" },
  { stage: 9, title: "Monads" },
  { stage: 10, title: "The Yoneda Lemma" },
];

export function lessonById(id: string): Lesson | undefined {
  return LESSONS.find((l) => l.id === id);
}
