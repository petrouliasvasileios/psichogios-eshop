import type { MetadataRoute } from "next";
import { ALLOW_INDEXING, SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Σε preview απαγορεύουμε τα πάντα, ώστε να μη μπει το demo στη Google.
  if (!ALLOW_INDEXING) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
