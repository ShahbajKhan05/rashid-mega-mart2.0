"use client";

import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, ArrowUpRight, ChevronRight, Headset } from "lucide-react";
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
      gsap.fromTo(".rm-footer-reveal", { y: 14, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.55,
        stagger: 0.07,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 96%", once: true },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const quickLinks = [
    { href: "/", en: "Home", hi: "होम" },
    { href: "/kits", en: "Grocery Kits", hi: "किराना किट" },
    { href: "/about", en: "About Us", hi: "हमारे बारे में" },
    { href: "/contact", en: "Contact Us", hi: "संपर्क करें" },
  ];

  const policyLinks = [
    { href: "/privacy-policy", en: "Privacy Policy", hi: "गोपनीयता नीति" },
    { href: "/terms-and-conditions", en: "Terms & Conditions", hi: "नियम और शर्तें" },
    { href: "/shipping-policy", en: "Shipping & Delivery", hi: "शिपिंग और डिलीवरी" },
    { href: "/cancellation-refund", en: "Cancellation & Refund", hi: "रद्द और रिफंड" },
    { href: "/return-replacement", en: "Returns & Replacement", hi: "रिटर्न और रिप्लेसमेंट" },
    { href: "/payment-policy", en: "Payment Policy", hi: "भुगतान नीति" },
    { href: "/grievance-redressal", en: "Grievance Redressal", hi: "शिकायत निवारण" },
    { href: "/food-safety", en: "Food Safety", hi: "खाद्य सुरक्षा" },
  ];

  const linkClass = "group inline-flex min-w-0 items-start gap-2.5 rounded-sm text-left text-[13px] leading-6 text-[#55483C] transition-colors duration-200 hover:text-[#800020] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A84F] focus-visible:ring-offset-2 sm:text-[14px]";
  const headingClass = "text-[12px] font-extrabold uppercase tracking-[.12em] text-[#800020] sm:text-[13px]";

  return (
    <footer
      ref={footerRef}
      className="relative isolate overflow-hidden border-t border-[#D4A84F]/55 bg-[#FFF9D8] pb-[calc(80px+env(safe-area-inset-bottom))] pt-7 text-[#30251F] [font-family:var(--font-apple)] sm:pt-9 xl:pb-6"
    >
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-36 -z-10 h-[420px] w-[420px] rounded-full bg-[#EAB308]/10 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -left-32 -z-10 h-[360px] w-[360px] rounded-full bg-[#800020]/[0.035] blur-3xl" />

      <div className="mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-12">
        <div className="rm-footer-reveal flex flex-col items-center gap-5 border-b border-[#92400E]/15 pb-6 text-center sm:pb-7">
          <div className="flex min-w-0 flex-col items-center gap-3">
            <Link
              href="/"
              aria-label="Rashid Mega Mart home"
              className="group grid h-[72px] w-[72px] shrink-0 place-items-center rounded-2xl border border-[#D4A84F]/30 bg-white/65 p-2 shadow-[0_5px_18px_rgba(48,37,31,.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_9px_24px_rgba(48,37,31,.10)] sm:h-[84px] sm:w-[84px]"
            >
              <Image src="/Logo.png" alt="Rashid Mega Mart" width={100} height={100} sizes="84px" className="h-full w-full object-contain" />
            </Link>
            <div className="min-w-0 text-center">
              <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#A47A2C]">
                {isHindi ? "आपकी भरोसेमंद किराना दुकान" : "Your neighbourhood grocery store"}
              </p>
              <h2 className="mt-1 text-[24px] font-extrabold leading-[1.08] tracking-[-.045em] text-[#800020] sm:text-[30px]">
                Rashid Mega Mart
              </h2>
              <p className="mx-auto mt-2 max-w-xl text-[13px] leading-5 text-[#76665C] sm:text-[14px]">
                {isHindi ? "आपके परिवार की रोज़मर्रा की ज़रूरतें, अब आसानी से।" : "Everyday groceries for your family's daily needs."}
              </p>
            </div>
          </div>

          <Link
            href="/food-safety"
            className="group inline-flex w-full max-w-[340px] items-center justify-center gap-3 rounded-2xl border border-[#138047]/20 bg-white/65 px-4 py-3 shadow-[0_4px_14px_rgba(48,37,31,.045)] transition duration-300 hover:-translate-y-0.5 hover:border-[#138047]/40 hover:bg-white"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#138047]/10 text-[#138047]">
              <ShieldCheck size={22} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[10px] font-bold uppercase tracking-[.14em] text-[#138047]">
                {isHindi ? "जानकारी और नीतियाँ" : "Store information"}
              </span>
              <span className="mt-1 block text-[13px] font-semibold text-[#30251F]">
                {isHindi ? "खाद्य सुरक्षा और जानकारी" : "Food safety & store policies"}
              </span>
            </span>
            <ArrowUpRight size={17} className="shrink-0 text-[#A47A2C] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 justify-items-center gap-x-8 gap-y-7 py-7 sm:grid-cols-2 sm:gap-y-8 sm:py-8 xl:grid-cols-[.9fr_.8fr_1.3fr] xl:items-start xl:gap-x-12 xl:py-9">
          <section className="rm-footer-reveal flex w-full max-w-[560px] min-w-0 flex-col items-center text-center xl:max-w-none xl:items-start xl:text-left">
            <h3 className={headingClass}>{isHindi ? "संपर्क और सहायता" : "Contact & Support"}</h3>
            <p className="mt-3 max-w-[340px] text-[13px] leading-6 text-[#76665C] xl:max-w-[300px]">
              {isHindi
                ? "ऑर्डर, सामान की उपलब्धता या सहायता की जानकारी के लिए संपर्क पेज देखें।"
                : "For order questions, product availability or support information, visit our Contact page."}
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex min-h-11 w-full max-w-[280px] items-center justify-center gap-2 rounded-xl bg-[#800020] px-4 py-2.5 text-[12px] font-bold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-[#650019] xl:w-auto"
            >
              <Headset size={16} />
              {isHindi ? "संपर्क पेज देखें" : "Visit contact page"}
              <ArrowUpRight size={14} />
            </Link>
          </section>

          <section className="rm-footer-reveal flex w-full max-w-[560px] min-w-0 flex-col items-center text-center xl:max-w-none xl:items-start xl:text-left">
            <h3 className={headingClass}>{isHindi ? "खरीदारी" : "Explore"}</h3>
            <ul className="mt-3 flex w-full flex-col items-center gap-1.5 xl:items-start">
              {quickLinks.map((item) => (
                <li key={item.href} className="w-full">
                  <Link href={item.href} className={linkClass}>
                    <ChevronRight size={15} className="mt-[5px] shrink-0 text-[#D4A84F] transition-transform group-hover:translate-x-1" />
                    <span className="min-w-0 break-words">{isHindi ? item.hi : item.en}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="rm-footer-reveal col-span-1 flex w-full max-w-[800px] min-w-0 flex-col items-center text-center sm:col-span-2 xl:col-span-1 xl:max-w-none xl:items-start xl:text-left">
            <h3 className={headingClass}>{isHindi ? "नीतियाँ और सहायता" : "Policies & Help"}</h3>
            <ul className="mt-3 grid w-full grid-cols-1 justify-items-center gap-x-5 gap-y-1.5 sm:grid-cols-2 sm:justify-items-start xl:gap-x-3">
              {policyLinks.map((item) => (
                <li key={item.href} className="w-full min-w-0">
                  <Link href={item.href} className={linkClass}>
                    <ChevronRight size={15} className="mt-[5px] shrink-0 text-[#D4A84F] transition-transform group-hover:translate-x-1" />
                    <span className="min-w-0 break-words">{isHindi ? item.hi : item.en}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="rm-footer-reveal flex flex-col items-center gap-2 border-t border-[#92400E]/15 pt-5 text-center text-[11px] text-[#76665C] sm:text-[12px]">
          <p>
            © {new Date().getFullYear()} <span className="font-bold text-[#800020]">Rashid Mega Mart.</span> {isHindi ? "सर्वाधिकार सुरक्षित।" : "All rights reserved."}
          </p>
          <p className="flex flex-wrap items-center justify-center gap-1.5">
            {isHindi ? "आपकी रोज़मर्रा की खरीदारी" : "Crafted for your everyday needs"}
            <span className="text-[#EAB308]">✦</span>
            <span className="font-bold text-[#800020]">Noor Technologies</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
