import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./components/LanguageProvider";
import AppChrome from "./components/AppChrome";
import { CartProvider } from "./components/CartProvider";
import { WishlistProvider } from "./components/WishlistProvider";

const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-plus-jakarta", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://rashid-mega-mart.vercel.app"),
  title: { default: "Rashid Mega Mart | Best Grocery Store in Ghoghar, Rewa", template: "%s | Rashid Mega Mart" },
  description: "Rashid Mega Mart is your trusted neighbourhood grocery store in Ghoghar, Rewa, Madhya Pradesh. Order atta, rice, dal, oil, snacks, and daily essentials online with fast delivery.",
  keywords: ["Rashid Mega Mart", "Grocery store Rewa", "Kirana store Ghoghar", "Online grocery Rewa", "Daily essentials home delivery"],
  openGraph: { title: "Rashid Mega Mart | Your Daily Needs, Our Priority", description: "Order groceries, household items, and value kits online. Fast delivery in Rewa.", siteName: "Rashid Mega Mart", locale: "en_IN", type: "website", images: [{ url: "/og-banner.jpg", width: 1200, height: 630, alt: "Rashid Mega Mart Banner" }] },
  robots: { index: true, follow: true }, icons: { icon: "/favicon.ico", shortcut: "/favicon.ico", apple: "/Logo.png" },
};

const storeJsonLd = { "@context": "https://schema.org", "@type": "GroceryStore", name: "Rashid Mega Mart", image: "https://rashid-mega-mart.vercel.app/Logo.png", url: "https://rashid-mega-mart.vercel.app", telephone: "+918962531603", priceRange: "₹₹", address: { "@type": "PostalAddress", streetAddress: "Ghoghar", addressLocality: "Rewa", addressRegion: "Madhya Pradesh", postalCode: "486001", addressCountry: "IN" } };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-scroll-behavior="smooth"><body className={`${plusJakarta.variable} antialiased bg-[#FFFCF0]`}><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(storeJsonLd) }} /><LanguageProvider><CartProvider><WishlistProvider><AppChrome>{children}</AppChrome></WishlistProvider></CartProvider></LanguageProvider></body></html>;
}
