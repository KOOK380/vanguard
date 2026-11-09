import "server-only";
import { cell, field, page, records, section } from "./source";
import type { TeamMember } from "./types";

const team = section(page("about"), "Our team");

/**
 * Names and titles from the current site. They have no independent record and may be out of date
 * (open fact 8). No photos until real ones are supplied.
 */
export const teamSection = {
  heading: team.heading,
  intro: field(team, "Intro"),
  members: records(team, "Name").map((r): TeamMember => ({ name: cell(r["Name"] ?? ""), title: r["Title"] ?? "", bio: r["Bio"] ?? "" })),
};
