import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Rashid Mega Mart | Best Grocery Store in Ghoghar, Rewa",
  description: "Shop groceries, household items, and daily essentials online at Rashid Mega Mart, Ghoghar, Rewa. Order atta, rice, dal, oil, snacks with fast home delivery.",
  alternates: { canonical: "https://rashid-mega-mart.vercel.app" },
  openGraph: { title: "Rashid Mega Mart | Your Daily Needs, Our Priority", description: "Order groceries, household items and value kits online. Fast delivery in Rewa.", url: "https://rashid-mega-mart.vercel.app", siteName: "Rashid Mega Mart", images: [{ url: "/Logo.png", width: 1200, height: 630, alt: "Rashid Mega Mart" }], locale: "en_IN", type: "website" },
};

export default function Home() { return <HomeClient />; }
