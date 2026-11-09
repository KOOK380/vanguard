import clsx, { type ClassValue } from "clsx";

/** Joins class names. Later classes do not override earlier ones, so avoid passing conflicting utilities. */
export function cn(...values: ClassValue[]): string {
  return clsx(values);
}
