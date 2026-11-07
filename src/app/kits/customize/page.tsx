import type { Metadata } from "next";
import KitCustomizer from "../../components/KitCustomizer";

export const metadata: Metadata = {
  title: "Build Your Own Grocery Kit",
  description: "Create a custom grocery kit at Rashid Mega Mart. Choose products, adjust quantities and see your estimated total.",
};

export default function CustomizeKitPage() {
  return <KitCustomizer />;
}
