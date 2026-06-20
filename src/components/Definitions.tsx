/**
 * Inline definition chips and the per-stage notation panel.
 *
 * NotationChip (@n{key}) and TermChip (@t{slug|label}) render an inline trigger
 * with a dotted underline; clicking expands a small popover card with the
 * name/meaning/example — so every symbol is defined right where it is used,
 * without cluttering the prose. NotationPanel auto-extracts every @n/@t token a
 * lesson uses into one collapsed rollup ("view or hide").
 *
 * Chips render their own math via MathText (math-only, no nested chips) to keep
 * the module graph simple.
 */
import { useEffect, useRef, useState } from "react";
import { NOTATION } from "../content/notation";
import { GLOSSARY_INDEX } from "../content/glossary";
import { MathText, Tex } from "./Math";
import { Rollup } from "./Rollup";
import type { Lesson } from "../types";

/** Shared popover behavior: a button toggles an absolutely-positioned card that
 *  closes on outside-click or Escape. */
function Popover({
  trigger,
  children,
}: {
  trigger: React.ReactNode;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <span className="def-chip" ref={ref}>
      <button
        type="button"
        className="def-chip-trigger"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {trigger}
      </button>
      {open && <span className="def-chip-pop">{children}</span>}
    </span>
  );
}

function Card({ name, meaning, example }: { name: string; meaning: string; example: string }) {
  return (
    <>
      <span className="def-card-name">{name}</span>
      <span className="def-card-meaning">
        <MathText text={meaning} />
      </span>
      <span className="def-card-example">
        e.g. <MathText text={example} />
      </span>
    </>
  );
}

/** @n{key} — an inline symbol that expands to its definition. */
export function NotationChip({ keyName }: { keyName: string }) {
  const e = NOTATION[keyName];
  if (!e) return <span className="def-missing">@n&#123;{keyName}&#125;?</span>; // fail loud
  return (
    <Popover trigger={<Tex>{e.glyph}</Tex>}>
      <Card name={e.name} meaning={e.meaning} example={e.example} />
    </Popover>
  );
}

/** @t{slug|label} — an inline glossary term; shows `label` (or the term) and
 *  expands to its definition + example. */
export function TermChip({ slug, label }: { slug: string; label?: string }) {
  const e = GLOSSARY_INDEX[slug.toLowerCase()];
  if (!e) return <span className="def-missing">@t&#123;{slug}&#125;?</span>; // fail loud
  return (
    <Popover trigger={<span className="def-term">{label ?? e.term}</span>}>
      <Card name={e.term} meaning={e.definition} example={e.example ?? ""} />
    </Popover>
  );
}

// --- per-stage notation panel ------------------------------------------------

const TOKEN_RE = /@n\{([^}]+)\}|@t\{([^}|]+)(?:\|[^}]+)?\}/g;

/** Walk a lesson's text fields and collect the @n/@t keys it references, in
 *  first-seen order. */
function collectTokens(lesson: Lesson): { notation: string[]; terms: string[] } {
  const strings: string[] = [
    lesson.summary,
    lesson.masteryCheckpoint,
    ...lesson.objectives,
    ...lesson.definitions.flatMap((d) => [d.short, d.expanded ?? "", d.example ?? ""]),
    ...lesson.sections.map((s) => s.body),
    ...lesson.confusions.flatMap((c) => [c.misconception, c.correction]),
  ];
  const notation: string[] = [];
  const terms: string[] = [];
  for (const s of strings) {
    for (const m of s.matchAll(TOKEN_RE)) {
      if (m[1] && !notation.includes(m[1])) notation.push(m[1]);
      if (m[2] && !terms.includes(m[2])) terms.push(m[2]);
    }
  }
  return { notation, terms };
}

export function NotationPanel({ lesson }: { lesson: Lesson }) {
  const { notation, terms } = collectTokens(lesson);
  if (notation.length === 0 && terms.length === 0) return null;

  return (
    <Rollup
      className="notation-panel"
      summary={
        <span>
          Symbols &amp; terms used in this stage{" "}
          <span className="np-count">({notation.length + terms.length})</span> — click to expand
        </span>
      }
    >
      <dl className="np-list">
        {notation.map((k) => {
          const e = NOTATION[k];
          if (!e) return null;
          return (
            <div className="np-row" key={`n-${k}`}>
              <dt>
                <Tex>{e.glyph}</Tex>
              </dt>
              <dd>
                <strong>{e.name}</strong> — <MathText text={e.meaning} />
                <div className="np-example">
                  e.g. <MathText text={e.example} />
                </div>
              </dd>
            </div>
          );
        })}
        {terms.map((slug) => {
          const e = GLOSSARY_INDEX[slug.toLowerCase()];
          if (!e) return null;
          return (
            <div className="np-row" key={`t-${slug}`}>
              <dt className="np-term">{e.term}</dt>
              <dd>
                <MathText text={e.definition} />
                {e.example && (
                  <div className="np-example">
                    e.g. <MathText text={e.example} />
                  </div>
                )}
              </dd>
            </div>
          );
        })}
      </dl>
    </Rollup>
  );
}
