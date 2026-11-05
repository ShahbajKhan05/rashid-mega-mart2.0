"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, FileText, ShieldCheck } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const policyLinks = [
  { href: "/privacy-policy", en: "Privacy Policy", hi: "गोपनीयता नीति" },
  { href: "/terms-and-conditions", en: "Terms & Conditions", hi: "नियम और शर्तें" },
  { href: "/shipping-policy", en: "Shipping & Delivery", hi: "शिपिंग और डिलीवरी" },
  { href: "/cancellation-refund", en: "Cancellation & Refund", hi: "रद्द और रिफंड" },
  { href: "/return-replacement", en: "Returns & Replacement", hi: "रिटर्न और रिप्लेसमेंट" },
  { href: "/payment-policy", en: "Payment Policy", hi: "भुगतान नीति" },
  { href: "/grievance-redressal", en: "Grievance Redressal", hi: "शिकायत निवारण" },
  { href: "/food-safety", en: "Food Safety & FSSAI", hi: "खाद्य सुरक्षा और FSSAI" },
];

export default function SiteFooter() {
  const { language, t } = useLanguage();
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = footerRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(".footer-reveal", { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: root, start: "top 88%", once: true } });
      gsap.to(".footer-heart", { scale: 1.22, duration: 0.55, repeat: -1, yoyo: true, ease: "power2.inOut", transformOrigin: "center" });
    }, root);
    return () => ctx.revert();
  }, []);
  const isHindi = language === "hi";

  return (
    <footer ref={footerRef} className="relative overflow-hidden border-t border-[#eadfce] bg-[linear-gradient(135deg,#fffdf7_0%,#f8f1e7_52%,#fffaf2_100%)] pb-[calc(68px+max(env(safe-area-inset-bottom),7px)+12px)] pt-10 text-[#382b2b] sm:pt-12 xl:pb-7">
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#b88a42]/[0.08] blur-3xl" />
      <div className="relative mx-auto grid max-w-[1320px] grid-cols-2 gap-x-7 gap-y-9 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-[1.25fr_.75fr_1fr_1.15fr] lg:gap-10 lg:px-10">
        <div className="footer-reveal col-span-2 max-w-sm lg:col-span-1">
          <Link href="/" aria-label="Rashid Mega Mart home" className="inline-flex items-center gap-3">
            <span className="grid h-14 w-14 place-items-center rounded-2xl border border-white/80 bg-white/75 shadow-[0_8px_24px_rgba(80,35,25,.08)] backdrop-blur-xl">
              <Image src="/Logo.png" alt="Rashid Mega Mart" width={46} height={46} className="h-11 w-11 object-contain" />
            </span>
            <span className="leading-tight">
              <span className="block text-lg font-extrabold tracking-[-.045em] text-[#5a1023]">Rashid</span>
              <span className="block text-[10px] font-extrabold tracking-[.25em] text-[#a77b3e]">MEGA MART</span>
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-[13px] leading-6 text-[#76665c]">
            {isHindi ? "रोज़मर्रा के किराना और घरेलू सामान की खरीदारी।" : "Everyday grocery and household essentials, made easier to explore."}
          </p>
          <Link href="/contact" className="mt-4 inline-flex h-10 items-center gap-2 rounded-full bg-[#800020] px-4 text-xs font-bold text-white shadow-[0_7px_18px_rgba(128,0,32,.16)] transition hover:-translate-y-0.5 hover:bg-[#650019]">
            {isHindi ? "संपर्क जानकारी" : "Contact information"} <ArrowUpRight size={14} />
          </Link>
        </div>

        <div>
          <h2 className="text-[11px] font-extrabold uppercase tracking-[.18em] text-[#a77b3e]">{t("quickLinks")}</h2>
          <ul className="mt-4 space-y-3 text-[13px] font-medium text-[#65574f]">
            <li><Link className="transition hover:text-[#800020]" href="/">{isHindi ? "होम" : "Home"}</Link></li>
            <li><Link className="transition hover:text-[#800020]" href="/products">{isHindi ? "सभी उत्पाद" : "Shop products"}</Link></li>
            <li><Link className="transition hover:text-[#800020]" href="/order-tracking">{isHindi ? "ऑर्डर ट्रैक करें" : "Track order"}</Link></li>
            <li><Link className="transition hover:text-[#800020]" href="/my-orders">{isHindi ? "मेरे ऑर्डर" : "My orders"}</Link></li>
            <li><Link className="transition hover:text-[#800020]" href="/about">{isHindi ? "हमारे बारे में" : "About us"}</Link></li>
            <li><Link className="transition hover:text-[#800020]" href="/faqs">{isHindi ? "अक्सर पूछे जाने वाले सवाल" : "FAQs"}</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[.18em] text-[#a77b3e]"><ShieldCheck size={14}/>{isHindi ? "नीतियाँ" : "POLICIES"}</h2>
          <ul className="mt-4 space-y-3 text-[12px] font-medium text-[#65574f]">
            {policyLinks.map((item) => <li key={item.href}><Link className="transition hover:text-[#800020]" href={item.href}>{isHindi ? item.hi : item.en}</Link></li>)}
          </ul>
        </div>

        <div>
          <h2 className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[.18em] text-[#a77b3e]"><FileText size={14}/>{isHindi ? "सहायता और जानकारी" : "HELP & INFORMATION"}</h2>
          <ul className="mt-4 space-y-3 text-[13px] font-medium text-[#65574f]">
            <li><Link className="transition hover:text-[#800020]" href="/contact">{isHindi ? "संपर्क करें" : "Contact us"}</Link></li>
            <li><Link className="transition hover:text-[#800020]" href="/grievance-redressal">{isHindi ? "शिकायत निवारण" : "Grievance redressal"}</Link></li>
            <li><Link className="transition hover:text-[#800020]" href="/food-safety">{isHindi ? "खाद्य सुरक्षा और FSSAI" : "Food Safety & FSSAI"}</Link></li>
          </ul>
          <p className="mt-5 text-[11px] leading-5 text-[#938477]">{isHindi ? "व्यवसाय और संपर्क विवरण सत्यापन के बाद प्रकाशित किए जाएँगे।" : "Business and contact details will be published after verification."}</p>
        </div>
      </div>

      <div className="relative mx-auto mt-9 flex max-w-[1320px] flex-col gap-2 border-t border-[#e7dccd] px-5 pt-5 text-[10px] font-medium text-[#96877b] sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
        <p>© {new Date().getFullYear()} Rashid Mega Mart. {t("allRightsReserved")}</p>
        <p>{isHindi ? "आपकी रोज़मर्रा की खरीदारी" : "Everyday shopping, made simpler"} <span className="px-1 text-[#b88a42]">✦</span> <span className="font-semibold text-[#800020]">Created with <span className="footer-heart inline-block text-[#b32645]">♥</span> by Noor Technologies</span></p>
      </div>
    </footer>
  );
}
