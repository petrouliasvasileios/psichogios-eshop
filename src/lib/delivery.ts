/**
 * Ζώνες παράδοσης για τον έλεγχο «Πού παραδίδουμε».
 *
 * ⚠ ΠΡΟΣΟΧΗ: τα εύρη Τ.Κ. είναι ΠΡΟΤΑΣΗ και θέλουν επιβεβαίωση.
 * Στο WooCommerce υπάρχει σήμερα μία μόνο ζώνη («Ελλάδα»), χωρίς Τ.Κ.
 * Αλλάξτε ελεύθερα τα ranges / labels εδώ — δεν χρειάζεται τίποτε άλλο.
 */

import { SITE } from "./data";

export type Zone = {
  id: string;
  title: string;
  /** Πότε φτάνει η παραγγελία. */
  when: string;
  /** Περιοχές, για εμφάνιση στη λίστα. */
  areas: string;
  /** Εύρη Τ.Κ. (5ψήφια, χωρίς κενό), inclusive. */
  ranges: [number, number][];
  /** Κόστος μεταφορικών. null = δωρεάν πάντα. */
  fee: number | null;
  tone: "best" | "ok" | "info";
};

export const ZONES: Zone[] = [
  {
    id: "north",
    title: "Βόρεια προάστια",
    when: "Αυθημερόν παράδοση",
    areas: "Λυκόβρυση, Πεύκη, Ηράκλειο, Μεταμόρφωση, Ν. Ιωνία, Κηφισιά, Μαρούσι, Χαλάνδρι, Αγ. Παρασκευή",
    ranges: [[14000, 15999]],
    fee: SITE.shippingFee,
    tone: "best",
  },
  {
    id: "attica",
    title: "Υπόλοιπη Αττική",
    when: "Παράδοση την επόμενη εργάσιμη",
    areas: "Αθήνα, Πειραιάς, νότια, δυτικά και ανατολικά προάστια",
    ranges: [[10000, 13999], [16000, 19999]],
    fee: SITE.shippingFee,
    tone: "ok",
  },
];

export type Result =
  | { status: "invalid" }
  | { status: "covered"; zone: Zone }
  | { status: "on-request" };

/** Ελέγχει έναν Τ.Κ. (δέχεται «141 23» ή «14123»). */
export function checkPostcode(input: string): Result {
  const digits = input.replace(/\D/g, "");
  if (digits.length !== 5) return { status: "invalid" };
  const n = Number(digits);
  const zone = ZONES.find((z) => z.ranges.some(([a, b]) => n >= a && n <= b));
  return zone ? { status: "covered", zone } : { status: "on-request" };
}
