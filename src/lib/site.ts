/**
 * Διεύθυνση του site και έλεγχος ευρετηρίασης.
 *
 * Σε preview (Vercel, localhost) το site ΔΕΝ πρέπει να μπει στη Google: θα δημιουργούσε
 * διπλότυπο περιεχόμενο με το psichogiosmeat.gr και θα έβλαπτε την κατάταξη.
 *
 * Γι' αυτό η ευρετηρίαση είναι **κλειστή από προεπιλογή** και ανοίγει μόνο όταν οριστεί
 * ρητά η μεταβλητή NEXT_PUBLIC_ALLOW_INDEXING=true — δηλαδή μόνο στο go-live.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://www.psichogiosmeat.gr";

export const ALLOW_INDEXING = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";
