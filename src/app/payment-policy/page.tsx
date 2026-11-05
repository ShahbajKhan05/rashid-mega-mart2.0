import type { Metadata } from "next";
import PolicyPage from "@/app/components/PolicyPage";

const titles: Record<string,string> = {
  "privacy-policy":"Privacy Policy", "terms-and-conditions":"Terms & Conditions", "shipping-policy":"Shipping & Delivery",
  "cancellation-refund":"Cancellation & Refund", "return-replacement":"Returns & Replacement", "payment-policy":"Payment Policy",
  contact:"Contact Us", about:"About Rashid Mega Mart", faqs:"Frequently Asked Questions",
  "grievance-redressal":"Grievance Redressal", "food-safety":"Food Safety & FSSAI Information"
};
export const metadata: Metadata = { title: titles["payment-policy"], robots: { index: true, follow: true } };
export default function Page() { return <PolicyPage slug="payment-policy" />; }
