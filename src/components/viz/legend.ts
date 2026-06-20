/**
 * Single source of truth for what each layer and edge type *means* and how it
 * is styled, so every typed diagram can render a legend. In category theory the
 * diagram IS the argument, so the legend matters: a plain morphism must never be
 * mistaken for "F applied" or a naturality edge.
 *
 * Accessibility: each layer carries BOTH a color and a distinct line style, so
 * the distinctions never rely on color alone.
 */
import type { EdgeType, Layer } from "../../types";

export const LAYER_META: Record<
  Layer,
  { label: string; color: string; blurb: string }
> = {
  object: {
    label: "Object",
    color: "#2563eb",
    blurb: "An object of a category — often a set or a type. Treated as opaque.",
  },
  morphism: {
    label: "Morphism",
    color: "#7c3aed",
    blurb: "An arrow between objects — a structure-respecting map.",
  },
  functor: {
    label: "Functor",
    color: "#059669",
    blurb: "A map between categories preserving identities and composition.",
  },
  natural: {
    label: "Natural transf.",
    color: "#d97706",
    blurb: "A map between functors — one component arrow per object.",
  },
  construction: {
    label: "Construction",
    color: "#dc2626",
    blurb: "A universal construction (product, limit, adjoint, …).",
  },
};

/** Edge dash patterns give a non-color cue per relation family. */
export const EDGE_META: Record<EdgeType, { label: string; dash?: string }> = {
  morphism: { label: "morphism" },
  identity: { label: "identity", dash: "2 3" },
  composite: { label: "∘ composite", dash: "6 4" },
  functor_action: { label: "F applied", dash: "1 4" },
  naturality: { label: "naturality", dash: "8 3 2 3" },
  maps_to: { label: "↦", dash: "6 4" },
  universal: { label: "universal", dash: "1 4" },
  equals: { label: "=", dash: "2 2" },
  relates: { label: "relates" },
};
