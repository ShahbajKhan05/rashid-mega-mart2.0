import type { Metadata } from "next";
import KitsPage from "../components/KitsPage";

export const metadata: Metadata = {
  title: "Grocery Kits",
  description: "Explore grocery kit options from Rashid Mega Mart.",
};

export default function Page() {
  return <KitsPage />;
}
