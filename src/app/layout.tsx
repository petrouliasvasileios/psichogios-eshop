import type { Metadata } from "next";
import { Inter, Roboto_Slab } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import OrganizationSchema from "@/components/OrganizationSchema";
import { DeliveryCheckerProvider } from "@/components/DeliveryChecker";
import { CartProvider } from "@/lib/cart";
import { SITE } from "@/lib/data";
import { ALLOW_INDEXING, SITE_URL } from "@/lib/site";

const inter = Inter({ subsets: ["latin", "greek"], variable: "--font-inter", display: "swap" });
const slab = Roboto_Slab({ subsets: ["latin", "greek"], variable: "--font-slab", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE.name} | Φρέσκο κρέας & delicatessen από το 1952`,
    template: `%s | ${SITE.name}`,
  },
  description:
    "Φρέσκο κρέας, πουλερικά, αμνοερίφια και κρεατοσκευάσματα από τη Λυκόβρυση Αττικής. Οικογενειακή επιχείρηση από το 1952, με delivery στην Αθήνα.",
  openGraph: { type: "website", locale: "el_GR", siteName: SITE.name },
  // Σε preview κρατάμε το site εκτός Google (βλ. src/lib/site.ts)
  robots: ALLOW_INDEXING
    ? { index: true, follow: true }
    : { index: false, follow: false, nocache: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="el" className={`${inter.variable} ${slab.variable}`}>
      <body className="flex min-h-screen flex-col">
        <OrganizationSchema />
        <CartProvider>
          <DeliveryCheckerProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <CartDrawer />
          </DeliveryCheckerProvider>
        </CartProvider>
      </body>
    </html>
  );
}
