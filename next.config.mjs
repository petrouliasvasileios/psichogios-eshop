import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * Υπάρχει ένα package-lock.json και στον φάκελο χρήστη (~/package-lock.json),
   * οπότε το Next μάντευε λάθος ρίζα του project. Το καρφώνουμε εδώ.
   */
  outputFileTracingRoot: __dirname,

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.psichogiosmeat.gr" },
      { protocol: "https", hostname: "shop.psichogiosmeat.gr" },
    ],
  },

  /** Στο demo (NEXT_PUBLIC_DEMO=1) αποτρέπουμε την ευρετηρίαση από μηχανές αναζήτησης. */
  async headers() {
    if (process.env.NEXT_PUBLIC_DEMO !== "1") return [];
    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
