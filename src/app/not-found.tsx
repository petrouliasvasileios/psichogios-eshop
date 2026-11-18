import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-5 sm:px-8 py-24 text-center">
      <h1 className="text-5xl">404</h1>
      <p className="mt-3 text-ink-soft">Η σελίδα που ζητήσατε δεν βρέθηκε.</p>
      <Link href="/" className="btn-primary mt-6">Αρχική σελίδα</Link>
    </div>
  );
}
