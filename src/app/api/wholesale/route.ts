import { NextResponse } from "next/server";

/**
 * Αιτήματα χονδρικής (B2B).
 *
 * ⚠ ΠΡΙΝ ΤΟ GO-LIVE: εδώ πρέπει να μπει πραγματική αποστολή. Τρεις επιλογές:
 *   1) email (Resend / SMTP) στο b2b@psichogiosmeat.gr,
 *   2) δημιουργία πελάτη στο WooCommerce με ρόλο «σε αναμονή έγκρισης» (B2BKing),
 *   3) απευθείας προώθηση στη φόρμα εγγραφής του B2BKing.
 * Τώρα το αίτημα καταγράφεται στο log του server, ώστε η φόρμα να είναι δοκιμάσιμη.
 */
export async function POST(request: Request) {
  const data = await request.json().catch(() => null);

  if (!data?.company || !data?.email || !data?.phone || !data?.vat) {
    return NextResponse.json({ ok: false, error: "missing-fields" }, { status: 400 });
  }

  console.log("[ΑΙΤΗΣΗ ΧΟΝΔΡΙΚΗΣ]", JSON.stringify(data, null, 2));

  return NextResponse.json({ ok: true });
}
