import type { Metadata } from "next";
import IntroLoader from "@/components/IntroLoader";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Rashid Mega Mart",
    template: "%s | Rashid Mega Mart",
  },
  description:
    "Welcome to Rashid Mega Mart — discover a better and easier way to shop.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <IntroLoader />
        {children}
      </body>
    </html>
  );
}
