"use client";

import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Youtube, MessageCircle, MapPin, Phone, Mail, ShieldCheck, ChevronRight } from "lucide-react";
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
      gsap.fromTo(".rm-footer-reveal", { y: 16, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.65, stagger: 0.09, ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 90%", once: true },
      });
      gsap.to(".rm-footer-heart", { scale: 1.2, duration: 0.55, repeat: -1, yoyo: true, ease: "power2.inOut", transformOrigin: "center" });
    }, root);
    return () => ctx.revert();
  }, []);

  const quickLinks = [
    { href: "/", en: "Home", hi: "होम" },
    { href: "/kits", en: "Grocery Kits", hi: "किराना किट" },
    { href: "/about", en: "About Us", hi: "हमारे बारे में" },
    { href: "/contact", en: "Contact", hi: "संपर्क करें" },
    { href: "/privacy-policy", en: "Privacy Policy", hi: "गोपनीयता नीति" },
    { href: "/terms-and-conditions", en: "Terms", hi: "नियम और शर्तें" },
  ];

  return (
    <footer ref={footerRef} className="relative overflow-hidden border-t border-[#EAB308]/35 bg-[#FFF9D8] pb-[calc(76px+env(safe-area-inset-bottom))] pt-9 text-[#30251F] [font-family:Inter,sans-serif] sm:pt-11 xl:pb-7">
      <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[#EAB308]/10 blur-3xl" />
      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-14">
        <div className="rm-footer-reveal flex flex-col justify-between gap-5 border-b border-[#92400E]/15 pb-6 sm:flex-row sm:items-center sm:gap-8">
          <div>
            <h2 className="text-[25px] font-bold leading-tight tracking-[-.045em] text-[#800020] sm:text-[30px]">Rashid Mega Mart</h2>
            <p className="mt-1.5 text-sm leading-6 text-[#76665C] sm:text-base">
              {isHindi ? "आपके परिवार की रोज़मर्रा की ज़रूरतों का भरोसेमंद ठिकाना।" : "Everyday groceries for your family's daily needs."}
            </p>
          </div>
          <div className="inline-flex w-fit items-center gap-3 rounded-xl border border-[#92400E]/15 bg-white/55 px-4 py-3 shadow-sm">
            <ShieldCheck className="shrink-0 text-[#138047]" size={25} />
            <span>
              <span className="block text-[10px] font-bold uppercase tracking-[.12em] text-[#6A7282]">{isHindi ? "प्रमाणित स्टोर" : "Certified Store"}</span>
              <span className="mt-0.5 block text-sm font-bold text-[#30251F]">{isHindi ? "खाद्य सुरक्षा जानकारी" : "Food safety information"}</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-9 py-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-5 lg:gap-7 lg:py-10">
          <section className="rm-footer-reveal min-w-0">
            <h3 className="text-[17px] font-bold uppercase tracking-[.035em] text-[#800020]">{isHindi ? "संपर्क करें" : "Contact Us"}</h3>
            <ul className="mt-5 space-y-3">
              <li className="flex min-w-0 items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-[#800020] shadow-[0_2px_7px_rgba(48,37,31,.10)]"><MapPin size={20}/></span>
                <span className="truncate text-sm text-[#55483C] sm:text-base">Ghoghar, Rewa, Madhya Pradesh</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-[#800020] shadow-[0_2px_7px_rgba(48,37,31,.10)]"><Phone size={20}/></span>
                <a href="tel:+918962531603" className="text-sm font-semibold text-[#364153] transition hover:text-[#800020] sm:text-base">+91 89625 31603</a>
              </li>
              <li className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-[#800020] shadow-[0_2px_7px_rgba(48,37,31,.10)]"><Mail size={20}/></span>
                <Link href="/contact" className="text-sm text-[#55483C] transition hover:text-[#800020] sm:text-base">{isHindi ? "ईमेल और सहायता" : "Email & Support"}</Link>
              </li>
            </ul>
          </section>

          <section className="rm-footer-reveal">
            <h3 className="text-[17px] font-bold uppercase tracking-[.035em] text-[#800020]">{isHindi ? "त्वरित लिंक" : "Quick Links"}</h3>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="group inline-flex items-center gap-3 text-sm text-[#55483C] transition hover:text-[#800020] sm:text-base">
                    <ChevronRight size={17} className="shrink-0 text-[#EAB308] transition-transform group-hover:translate-x-1"/>
                    {isHindi ? item.hi : item.en}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="rm-footer-reveal">
            <h3 className="text-[17px] font-bold uppercase tracking-[.035em] text-[#800020]">{isHindi ? "ज़रूरी नीतियाँ" : "Important Policies"}</h3>
            <ul className="mt-5 space-y-3">
              {[
                { href: "/privacy-policy", en: "Privacy Policy", hi: "गोपनीयता नीति" },
                { href: "/terms-and-conditions", en: "Terms & Conditions", hi: "नियम और शर्तें" },
                { href: "/shipping-policy", en: "Shipping & Delivery", hi: "शिपिंग और डिलीवरी" },
                { href: "/cancellation-refund", en: "Cancellation & Refund", hi: "रद्द और रिफंड" },
                { href: "/return-replacement", en: "Returns & Replacement", hi: "रिटर्न और रिप्लेसमेंट" },
                { href: "/payment-policy", en: "Payment Policy", hi: "भुगतान नीति" },
                { href: "/grievance-redressal", en: "Grievance Redressal", hi: "शिकायत निवारण" },
                { href: "/food-safety", en: "Food Safety & FSSAI", hi: "खाद्य सुरक्षा और FSSAI" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="group inline-flex items-center gap-3 text-sm text-[#55483C] transition hover:text-[#800020]">
                    <ChevronRight size={17} className="shrink-0 text-[#EAB308] transition-transform group-hover:translate-x-1"/>
                    {isHindi ? item.hi : item.en}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="rm-footer-reveal">
            <h3 className="text-[17px] font-bold uppercase tracking-[.035em] text-[#800020]">{isHindi ? "हमें फ़ॉलो करें" : "Follow Us"}</h3>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook" className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-[#1877F2] shadow-[0_2px_8px_rgba(48,37,31,.10)] transition hover:-translate-y-1"><Facebook size={23} fill="currentColor"/></a>
              <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram" className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-[#E4405F] shadow-[0_2px_8px_rgba(48,37,31,.10)] transition hover:-translate-y-1"><Instagram size={23}/></a>
              <a href="https://www.youtube.com/" target="_blank" rel="noreferrer" aria-label="YouTube" className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-[#FF0000] shadow-[0_2px_8px_rgba(48,37,31,.10)] transition hover:-translate-y-1"><Youtube size={23} fill="currentColor"/></a>
              <a href="https://wa.me/918962531603" target="_blank" rel="noreferrer" aria-label="WhatsApp" className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-[#25D366] shadow-[0_2px_8px_rgba(48,37,31,.10)] transition hover:-translate-y-1"><MessageCircle size={23}/></a>
            </div>
          </section>

          <section className="rm-footer-reveal flex flex-col items-center justify-center text-center lg:items-center">
            <Link href="/" aria-label="Rashid Mega Mart home" className="group inline-flex flex-col items-center">
              <span className="grid h-36 w-36 place-items-center rounded-full transition-transform duration-500 group-hover:scale-105">
                <Image src="/Logo.png" alt="Rashid Mega Mart" width={150} height={150} className="h-full w-full object-contain"/>
              </span>
              <span className="mt-3 text-base font-extrabold uppercase tracking-[.025em] text-[#800020]">{isHindi ? "आपकी पड़ोस की दुकान" : "Your Neighbourhood Store"}</span>
              <span className="mt-3 h-[3px] w-14 rounded-full bg-[#EAB308]"/>
            </Link>
          </section>
        </div>

        <div className="rm-footer-reveal flex flex-col gap-2 border-t border-[#92400E]/15 pt-5 text-xs text-[#6A7282] sm:flex-row sm:items-center sm:justify-between sm:text-sm">
          <p>© {new Date().getFullYear()} <span className="font-bold text-[#800020]">Rashid Mega Mart.</span> {isHindi ? "सर्वाधिकार सुरक्षित।" : "All Rights Reserved."}</p>
          <p>{isHindi ? "आपकी रोज़मर्रा की खरीदारी" : "Crafted for your everyday needs"} <span className="px-1 text-[#EAB308]">✦</span> <span className="font-semibold text-[#800020]">Noor Technologies</span></p>
        </div>
      </div>
    </footer>
  );
}
