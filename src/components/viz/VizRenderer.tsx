/**
 * Dispatches a VisualizationSpec to its renderer. The textual summary is always
 * available as a <details> fallback so a screen-reader user (or anyone) can read
 * what the graph says without parsing the visuals.
 */
import type { VisualizationSpec } from "../../types";
import { TypedGraph } from "./TypedGraph";
import { ParseTree } from "./ParseTree";
import { ComparisonTable } from "./ComparisonTable";

export function VizRenderer({ viz }: { viz: VisualizationSpec }) {
  return (
    <figure className="viz">
      <figcaption className="viz-title">{viz.title}</figcaption>
      {viz.kind === "typed-graph" && <TypedGraph viz={viz} />}
      {viz.kind === "parse-tree" && <ParseTree viz={viz} />}
      {viz.kind === "comparison-table" && <ComparisonTable viz={viz} />}
      <details className="viz-summary">
        <summary>Text description of this visualization</summary>
        <p>{viz.textualSummary}</p>
      </details>
    </figure>
  );
}
