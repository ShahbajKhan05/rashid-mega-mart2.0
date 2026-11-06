"use client";

import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Youtube, MessageCircle, MapPin, Phone, Mail, ShieldCheck, ArrowUpRight, ChevronRight } from "lucide-react";
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
        y: 0, opacity: 1, duration: 0.55, stagger: 0.07, ease: "power3.out",
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

  const linkClass = "group inline-flex items-center gap-2.5 text-[14px] leading-6 text-[#55483C] transition-colors duration-200 hover:text-[#800020] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EAB308] focus-visible:ring-offset-2 rounded-sm";
  const headingClass = "text-center text-[13px] font-extrabold uppercase tracking-[.12em] text-[#800020] sm:text-left";

  return (
    <footer ref={footerRef} className="relative isolate overflow-hidden border-t border-[#D4A84F]/55 bg-[#FFF9D8] pb-[calc(78px+env(safe-area-inset-bottom))] pt-8 text-[#30251F] [font-family:Inter,sans-serif] sm:pt-10 xl:pb-6">
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-36 -z-10 h-[420px] w-[420px] rounded-full bg-[#EAB308]/10 blur-3xl"/>
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -left-32 -z-10 h-[360px] w-[360px] rounded-full bg-[#800020]/[0.035] blur-3xl"/>
      <div className="mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-12">
        <div className="rm-footer-reveal flex flex-col gap-6 border-b border-[#92400E]/15 pb-7 md:flex-row md:items-center md:justify-between md:gap-10">
          <div className="flex min-w-0 items-center gap-4 sm:gap-5">
            <Link href="/" aria-label="Rashid Mega Mart home" className="group grid h-[76px] w-[76px] shrink-0 place-items-center rounded-2xl border border-[#D4A84F]/30 bg-white/65 p-2 shadow-[0_5px_18px_rgba(48,37,31,.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_9px_24px_rgba(48,37,31,.10)] sm:h-[88px] sm:w-[88px]">
              <Image src="/Logo.png" alt="Rashid Mega Mart" width={100} height={100} className="h-full w-full object-contain"/>
            </Link>
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#A47A2C]">{isHindi ? "आपकी भरोसेमंद किराना दुकान" : "Your neighbourhood grocery store"}</p>
              <h2 className="mt-1 text-[25px] font-extrabold leading-[1.08] tracking-[-.045em] text-[#800020] sm:text-[32px]">Rashid Mega Mart</h2>
              <p className="mt-2 max-w-xl text-[13px] leading-5 text-[#76665C] sm:text-[14px]">{isHindi ? "आपके परिवार की रोज़मर्रा की ज़रूरतें, अब आसानी से।" : "Everyday groceries for your family's daily needs."}</p>
            </div>
          </div>
          <Link href="/food-safety" className="group inline-flex w-full items-center gap-3 rounded-2xl border border-[#138047]/20 bg-white/65 px-4 py-3.5 shadow-[0_4px_14px_rgba(48,37,31,.045)] transition duration-300 hover:-translate-y-0.5 hover:border-[#138047]/40 hover:bg-white md:w-auto md:min-w-[260px]">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#138047]/10 text-[#138047]"><ShieldCheck size={22}/></span>
            <span className="min-w-0 flex-1">
              <span className="block text-[10px] font-bold uppercase tracking-[.14em] text-[#138047]">{isHindi ? "जानकारी और नीतियाँ" : "Store information"}</span>
              <span className="mt-1 block text-[13px] font-semibold text-[#30251F]">{isHindi ? "खाद्य सुरक्षा और जानकारी" : "Food safety & store policies"}</span>
            </span>
            <ArrowUpRight size={17} className="text-[#A47A2C] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"/>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-9 py-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-[1.15fr_.8fr_1.2fr_1fr] lg:gap-x-10 lg:py-9">
          <section className="rm-footer-reveal min-w-0">
            <h3 className={headingClass}>{isHindi ? "संपर्क करें" : "Contact & Support"}</h3>
            <ul className="mt-5 space-y-4">
              <li className="flex items-start gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-[#800020] shadow-sm ring-1 ring-[#92400E]/[0.07]"><MapPin size={18}/></span>
                <span className="pt-1 text-[13px] leading-5 text-[#55483C] sm:text-[14px]">Ghoghar, Rewa,<br/>Madhya Pradesh</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-[#800020] shadow-sm ring-1 ring-[#92400E]/[0.07]"><Phone size={18}/></span>
                <a href="tel:+918962531603" className="text-[13px] font-semibold text-[#364153] transition hover:text-[#800020] sm:text-[14px]">+91 89625 31603</a>
              </li>
              <li className="flex items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-[#800020] shadow-sm ring-1 ring-[#92400E]/[0.07]"><Mail size={18}/></span>
                <Link href="/contact" className="text-[13px] text-[#55483C] transition hover:text-[#800020] sm:text-[14px]">{isHindi ? "ईमेल और सहायता" : "Email & Support"}</Link>
              </li>
            </ul>
            <a href="https://wa.me/918962531603" target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#138047] px-4 py-2.5 text-[12px] font-bold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-[#0f6d3c]">
              <MessageCircle size={16}/> {isHindi ? "WhatsApp पर बात करें" : "Chat on WhatsApp"} <ArrowUpRight size={14}/>
            </a>
          </section>

          <section className="rm-footer-reveal">
            <h3 className={headingClass}>{isHindi ? "खरीदारी" : "Explore"}</h3>
            <ul className="mt-5 space-y-2.5">
              {quickLinks.map((item) => <li key={item.href}><Link href={item.href} className={linkClass}><ChevronRight size={15} className="shrink-0 text-[#D4A84F] transition-transform group-hover:translate-x-1"/>{isHindi ? item.hi : item.en}</Link></li>)}
            </ul>
          </section>

          <section className="rm-footer-reveal min-w-0">
            <h3 className={headingClass}>{isHindi ? "नीतियाँ और सहायता" : "Policies & Help"}</h3>
            <ul className="mt-5 grid grid-cols-1 gap-y-2.5 sm:grid-cols-2 sm:gap-x-4 lg:grid-cols-1 2xl:grid-cols-2">
              {policyLinks.map((item) => <li key={item.href}><Link href={item.href} className={linkClass}><ChevronRight size={15} className="shrink-0 text-[#D4A84F] transition-transform group-hover:translate-x-1"/><span>{isHindi ? item.hi : item.en}</span></Link></li>)}
            </ul>
          </section>

          <section className="rm-footer-reveal">
            <h3 className={headingClass}>{isHindi ? "हमसे जुड़ें" : "Stay Connected"}</h3>
            <p className="mt-5 max-w-[260px] text-[13px] leading-6 text-[#76665C]">{isHindi ? "ऑफर, अपडेट और स्टोर की नई जानकारी के लिए हमारे सोशल चैनल देखें।" : "Follow our social channels for store updates, offers and the latest news."}</p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook" className="grid h-11 w-11 place-items-center rounded-xl border border-[#1877F2]/10 bg-white text-[#1877F2] shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"><Facebook size={20} fill="currentColor"/></a>
              <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram" className="grid h-11 w-11 place-items-center rounded-xl border border-[#E4405F]/10 bg-white text-[#E4405F] shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"><Instagram size={20}/></a>
              <a href="https://www.youtube.com/" target="_blank" rel="noreferrer" aria-label="YouTube" className="grid h-11 w-11 place-items-center rounded-xl border border-[#FF0000]/10 bg-white text-[#FF0000] shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"><Youtube size={20} fill="currentColor"/></a>
              <a href="https://wa.me/918962531603" target="_blank" rel="noreferrer" aria-label="WhatsApp" className="grid h-11 w-11 place-items-center rounded-xl border border-[#25D366]/10 bg-white text-[#25D366] shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"><MessageCircle size={20}/></a>
            </div>
            <div className="mt-6 rounded-xl border border-[#D4A84F]/25 bg-white/45 p-3.5">
              <p className="text-[11px] font-bold uppercase tracking-[.1em] text-[#800020]">{isHindi ? "हमारा वादा" : "Our promise"}</p>
              <p className="mt-1.5 text-[12px] leading-5 text-[#55483C]">{isHindi ? "आपकी रोज़मर्रा की खरीदारी को आसान बनाना।" : "Making everyday shopping simpler for your family."}</p>
            </div>
          </section>
        </div>

        <div className="rm-footer-reveal flex flex-col gap-3 border-t border-[#92400E]/15 pt-5 text-[11px] text-[#76665C] sm:flex-row sm:items-center sm:justify-between sm:text-[12px]">
          <p>© {new Date().getFullYear()} <span className="font-bold text-[#800020]">Rashid Mega Mart.</span> {isHindi ? "सर्वाधिकार सुरक्षित।" : "All rights reserved."}</p>
          <p className="flex flex-wrap items-center gap-1.5">{isHindi ? "आपकी रोज़मर्रा की खरीदारी" : "Crafted for your everyday needs"} <span className="text-[#EAB308]">✦</span> <span className="font-bold text-[#800020]">Noor Technologies</span></p>
        </div>
      </div>
    </footer>
  );
}
