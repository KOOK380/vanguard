import "server-only";
import { list, page, section } from "./source";
import type { Stat } from "./types";

/**
 * Sourced figures for StatNumber. No number can be sourced (decisions 69 and 122), so there are
 * none, and none may be added without a source in research.md.
 */
export const stats: Stat[] = [];

/** Non-numeric proof points that stand in for statistics (Home, proof points). */
export const proofPoints: string[] = list(section(page("home"), "Section: proof points")).map((i) => i.raw);
