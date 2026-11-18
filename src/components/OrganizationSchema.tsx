import { SITE } from "@/lib/data";

/** LocalBusiness structured data — βοηθά τη Google στις τοπικές αναζητήσεις και στους χάρτες. */
export default function OrganizationSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Butcher"],
    "@id": `${SITE.website}/#organization`,
    name: SITE.name,
    legalName: SITE.legalName,
    description: `${SITE.activity}. Οικογενειακή επιχείρηση από το ${SITE.founded} στη Λυκόβρυση Αττικής.`,
    url: SITE.website,
    logo: SITE.logo,
    image: SITE.logo,
    foundingDate: String(SITE.founded),
    vatID: SITE.vat,
    taxID: SITE.vat,
    identifier: { "@type": "PropertyValue", propertyID: "GEMI", value: SITE.gemh },
    founder: { "@type": "Person", name: "Δημήτρης Ψυχογυιός" },
    email: SITE.email,
    telephone: `+30${SITE.phones[0].replace(/\s/g, "")}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.street,
      addressLocality: SITE.city,
      postalCode: SITE.postalCode.replace(/\s/g, ""),
      addressRegion: SITE.region,
      addressCountry: "GR",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "06:00",
        closes: "13:00",
      },
    ],
    sameAs: [SITE.social.facebook, SITE.social.linkedin],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: `+30${SITE.phones[0].replace(/\s/g, "")}`,
        contactType: "customer service",
        availableLanguage: ["el"],
      },
      {
        "@type": "ContactPoint",
        telephone: `+30${SITE.mobile.replace(/\s/g, "")}`,
        contactType: "sales",
        email: SITE.b2bEmail,
        availableLanguage: ["el"],
      },
    ],
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
