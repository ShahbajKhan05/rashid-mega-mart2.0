"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Headset, ShieldCheck } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SiteFooter() {
  const { language } = useLanguage();
  const footerRef = useRef<HTMLElement>(null);
  const isHindi = language === "hi";

  useEffect(() => {
    const root = footerRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo("[data-footer-reveal]", { y: 22, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 94%", once: true },
      });
      gsap.fromTo("[data-footer-wordmark]", { yPercent: 35, opacity: 0, scale: 0.94, filter: "blur(12px)" }, {
        yPercent: 0, opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.3, ease: "power4.out",
        scrollTrigger: { trigger: root, start: "top 90%", once: true },
      });
      gsap.fromTo("[data-footer-wordmark] span", { yPercent: 110, rotateX: -65 }, {
        yPercent: 0, rotateX: 0, duration: 1.1, stagger: 0.08, ease: "power4.out",
        scrollTrigger: { trigger: root, start: "top 88%", once: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const explore = [
    { href: "/", en: "Home", hi: "होम" },
    { href: "/products", en: "Shop all products", hi: "सभी सामान" },
    { href: "/kits", en: "Grocery kits", hi: "किराना किट" },
    { href: "/rewards", en: "Rashid Rewards", hi: "राशिद रिवॉर्ड्स" },
    { href: "/about", en: "Our store", hi: "हमारी दुकान" },
    { href: "/contact", en: "Contact us", hi: "संपर्क करें" },
  ];
  const policies = [
    { href: "/shipping-policy", en: "Shipping & Delivery", hi: "शिपिंग और डिलीवरी" },
    { href: "/payment-policy", en: "Payment Policy", hi: "भुगतान नीति" },
    { href: "/return-replacement", en: "Returns & Replacement", hi: "रिटर्न और रिप्लेसमेंट" },
    { href: "/cancellation-refund", en: "Cancellation & Refund", hi: "रद्द और रिफंड" },
    { href: "/privacy-policy", en: "Privacy Policy", hi: "गोपनीयता नीति" },
    { href: "/terms-and-conditions", en: "Terms & Conditions", hi: "नियम और शर्तें" },
    { href: "/grievance-redressal", en: "Grievance Redressal", hi: "शिकायत निवारण" },
    { href: "/food-safety", en: "Food Safety", hi: "खाद्य सुरक्षा" },
  ];
  const linkClass = "group inline-flex min-w-0 items-center justify-center gap-1.5 text-[12px] leading-5 text-[#725d62]/85 transition-colors hover:text-[#800020] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2d49a] sm:justify-start sm:text-[13px]";
  const headingClass = "text-[10px] font-extrabold uppercase tracking-[.22em] text-[#987343] sm:text-[11px]";

  return (
    <footer ref={footerRef} className="relative isolate overflow-hidden bg-[radial-gradient(ellipse_at_12%_0%,rgba(231,210,173,.22),transparent_38%),linear-gradient(180deg,#f7f5ef_0%,#f1eee7_100%)] pb-[calc(76px+env(safe-area-inset-bottom))] pt-8 text-[#4c3039] sm:pb-8 sm:pt-12">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_18%_18%,rgba(255,255,255,.9),transparent_35%),radial-gradient(ellipse_at_88%_75%,rgba(211,184,143,.2),transparent_38%)]" />
      <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[28px] border border-white/80 bg-[linear-gradient(135deg,rgba(255,255,255,.76),rgba(255,255,255,.42)_52%,rgba(250,246,237,.68))] px-5 py-7 shadow-[0_18px_55px_rgba(75,54,45,.09),inset_0_1px_0_rgba(255,255,255,.95)] backdrop-blur-[28px] backdrop-saturate-150 [-webkit-backdrop-filter:blur(28px)_saturate(160%)] sm:rounded-[34px] sm:px-8 sm:py-10 lg:px-12">
        <div className="grid gap-9 border-b border-[#8f7478]/15 pb-8 text-center sm:grid-cols-[1.15fr_.85fr] sm:items-start sm:gap-10 sm:pb-10 sm:text-left">
          <div data-footer-reveal className="flex flex-col items-center sm:items-start">
            <Link href="/" aria-label="Rashid Mega Mart home" className="mb-4 grid h-[76px] w-[76px] place-items-center rounded-2xl border border-white/90 bg-white/65 p-2 shadow-[0_8px_24px_rgba(75,54,45,.09)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 sm:h-[84px] sm:w-[84px]">
              <Image src="/Logo.png" alt="Rashid Mega Mart" width={100} height={100} sizes="84px" className="h-full w-full object-contain" />
            </Link>
            <p className="text-[9px] font-bold uppercase tracking-[.24em] text-[#987343]">{isHindi ? "आपकी रोज़मर्रा की खरीदारी" : "YOUR EVERYDAY GROCERY STORE"}</p>
            <h2 className="mt-2 max-w-[560px] text-[clamp(1.8rem,6vw,3.35rem)] font-semibold leading-[1.02] tracking-[-.055em] text-[#4c3039]">
              {isHindi ? "हर दिन की ज़रूरतें, भरोसे के साथ।" : "Everyday essentials. One trusted store."}
            </h2>
            <p className="mt-3 max-w-[420px] text-[12px] leading-6 text-[#76676a] sm:text-[13px]">
              {isHindi ? "किराना, घरेलू सामान और तैयार किट — आपकी सुविधा के लिए एक ही जगह।" : "Groceries, household essentials and ready-to-shop kits — thoughtfully brought together in one place."}
            </p>
            <Link href="/contact" className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#f2d49a] px-5 text-[12px] font-extrabold text-[#74132f] transition duration-300 hover:-translate-y-0.5 hover:bg-white">
              <Headset size={15} /> {isHindi ? "हमसे संपर्क करें" : "Get in touch"} <ArrowUpRight size={15} />
            </Link>
          </div>

          <div data-footer-reveal className="grid grid-cols-2 gap-x-4 gap-y-7 text-center sm:pt-2 sm:text-left">
            <div className="flex flex-col items-center sm:items-start">
              <h3 className={headingClass}>{isHindi ? "खरीदारी" : "Explore"}</h3>
              <ul className="mt-3 flex flex-col items-center gap-2 sm:items-start">
                {explore.map(item => <li key={item.href}><Link href={item.href} className={linkClass}><span>{isHindi ? item.hi : item.en}</span><ArrowUpRight size={12} className="opacity-50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link></li>)}
              </ul>
            </div>
            <div className="flex flex-col items-center sm:items-start">
              <h3 className={headingClass}>{isHindi ? "जानकारी" : "Information"}</h3>
              <ul className="mt-3 flex flex-col items-center gap-2 sm:items-start">
                {policies.map(item => <li key={item.href}><Link href={item.href} className={linkClass}><span>{isHindi ? item.hi : item.en}</span><ArrowUpRight size={12} className="opacity-50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link></li>)}
              </ul>
            </div>
          </div>
        </div>

        <div data-footer-reveal className="grid gap-5 border-b border-[#8f7478]/15 py-6 text-center sm:grid-cols-[1fr_auto] sm:items-center sm:text-left">
          <div className="flex flex-col items-center gap-2 sm:items-start">
            <span className={headingClass}>{isHindi ? "स्टोर और ग्राहक जानकारी" : "STORE & CUSTOMER INFORMATION"}</span>
            <p className="max-w-2xl text-[11px] leading-5 text-[#76676a] sm:text-xs">
              {isHindi ? "खाद्य सुरक्षा, व्यवसाय पंजीकरण और ग्राहक सहायता की सत्यापित जानकारी उपलब्ध होने पर यहाँ प्रकाशित की जाएगी।" : "Verified food-safety, business registration and customer-support details will be published here once confirmed by the store."}
            </p>
          </div>
          <Link href="/food-safety" className="inline-flex min-h-10 items-center justify-center gap-2 text-[11px] font-bold text-[#805d35] transition hover:text-[#800020]">
            <ShieldCheck size={15} /> {isHindi ? "खाद्य सुरक्षा जानकारी" : "Food safety information"} <ArrowUpRight size={13} />
          </Link>
        </div>

        <div data-footer-reveal className="flex flex-col items-center gap-2 py-5 text-center text-[10px] text-[#8a7779] sm:flex-row sm:justify-between sm:text-[11px]">
          <p>© {new Date().getFullYear()} <span className="font-bold text-[#4c3039]">Rashid Mega Mart.</span> {isHindi ? "सर्वाधिकार सुरक्षित।" : "All rights reserved."}</p>
          <p>{isHindi ? "आपकी रोज़मर्रा की खरीदारी" : "Made for everyday shopping"} <span className="mx-1 text-[#987343]">✦</span> <span className="font-semibold text-[#725d62]">Noor Technologies</span></p>
        </div>

        <div aria-hidden="true" className="relative overflow-hidden border-t border-[#8f7478]/15 pt-5 sm:pt-7">
          <div className="absolute left-0 top-3 h-px w-full bg-gradient-to-r from-transparent via-[#b99560]/55 to-transparent" />
          <div data-footer-wordmark className="flex select-none justify-center overflow-hidden whitespace-nowrap text-[18.5vw] font-black leading-[.82] tracking-[-.105em] text-[#800020]/10 [perspective:900px] sm:text-[17vw] xl:text-[220px]">
            {"RASHID".split("").map((letter, index) => <span key={index} className="inline-block origin-bottom">{letter}</span>)}
          </div>
          <div className="mt-4 flex items-center justify-center gap-3 text-[8px] font-bold tracking-[.28em] text-[#806d70] sm:text-[9px]">
            <span className="h-px w-7 bg-[#b99560]/55" /> MEGA MART <span className="text-[#f2d49a]">✦</span> EVERYDAY MADE SIMPLE <span className="h-px w-7 bg-[#f2d49a]/70" />
          </div>
        </div>
      </div>
    </footer>
  );
}
