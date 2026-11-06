"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Facebook, Instagram, Youtube, MessageCircle, MapPin, Phone, Mail,
  ArrowUpRight, ChevronRight, ShoppingBasket,
} from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const STORE_MAP = "https://www.google.com/maps/search/?api=1&query=Ghoghar%2C+Rewa%2C+Madhya+Pradesh";
const STORE_EMBED = "https://maps.google.com/maps?q=Ghoghar%2C%20Rewa%2C%20Madhya%20Pradesh&t=&z=14&ie=UTF8&iwloc=&output=embed";
const PHONE = "89625 31603";
const PHONE_LINK = "+918962531603";

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
        y: 0, opacity: 1, duration: 0.55, stagger: 0.07, ease: "power2.out",
        scrollTrigger: { trigger: root, start: "top 96%", once: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const explore = [
    { href: "/", en: "Home", hi: "होम" },
    { href: "/products", en: "Our Products", hi: "हमारे प्रोडक्ट्स" },
    { href: "/kits", en: "Grocery Kits", hi: "किराना किट" },
    { href: "/about", en: "About Us", hi: "हमारे बारे में" },
  ];
  const help = [
    { href: "/contact", en: "Contact Us", hi: "संपर्क करें" },
    { href: "/privacy-policy", en: "Privacy Policy", hi: "गोपनीयता नीति" },
    { href: "/terms-and-conditions", en: "Terms & Conditions", hi: "नियम और शर्तें" },
  ];
  const linkClass = "group inline-flex min-h-8 items-center gap-2 text-[13px] leading-5 text-[#54221F] transition-colors hover:text-[#941F2B] focus-visible:outline-none focus-visible:underline";
  const headingClass = "mb-3 text-[11px] font-extrabold uppercase tracking-[.17em] text-[#8C2028]";

  return (
    <footer ref={footerRef} className="relative isolate overflow-hidden border-t border-[#D9B77D]/60 bg-[#FBF5E9] text-[#3D2924]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center opacity-[.13]"
        style={{ backgroundImage: "url(https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=2000&q=85)" }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-[#FFF9EF]/95 via-[#FFF8EC]/90 to-[#FFF7E9]/90" />

      <div
        aria-hidden="true"
        className="relative h-[112px] overflow-hidden border-b border-[#D8B36B]/55 sm:h-[142px] lg:h-[170px]"
        style={{ backgroundImage: "linear-gradient(90deg,rgba(255,248,235,.18),rgba(255,248,235,.32)),url(https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=2000&q=85)", backgroundPosition: "center 48%", backgroundSize: "cover" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFF8EA]/30 via-[#FFF8EA]/5 to-[#FFF8EA]/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FBF5E9]/35 to-transparent" />
      </div>

      <div className="mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-10">
        <div className="grid gap-8 py-8 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-[1.2fr_1.08fr_.78fr_.9fr_1.08fr] lg:gap-0 lg:py-9">
          <section className="rm-footer-reveal flex min-w-0 flex-col items-center text-center sm:items-start sm:text-left lg:pr-7">
            <Link href="/" aria-label="Rashid Mega Mart home" className="inline-flex">
              <Image src="/Logo.png" alt="Rashid Mega Mart" width={230} height={105} className="h-[66px] w-[190px] object-contain object-center sm:object-left" />
            </Link>
            <p className="mt-2 max-w-[290px] text-[13px] font-semibold leading-5 text-[#8C2028]">{isHindi ? "हर घर की जरूरत, एक ही जगह" : "Har Ghar Ki Zaroorat, Ek Hi Jagah"}</p>
            <p className="mt-2 max-w-[290px] text-[12px] leading-[1.65] text-[#69534B]">
              {isHindi ? "रोज़मर्रा की ज़रूरतों के लिए भरोसेमंद खरीदारी।" : "Everyday essentials, quality products and a better shopping experience — all in one place."}
            </p>
            <div className="mt-4 flex items-center gap-2.5">
              <a href="https://wa.me/918962531603" target="_blank" rel="noreferrer" aria-label="WhatsApp" className="grid h-9 w-9 place-items-center rounded-full bg-[#168B55] text-white transition-transform hover:-translate-y-1"><MessageCircle size={17} /></a>
              <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram" className="grid h-9 w-9 place-items-center rounded-full bg-[#B52D58] text-white transition-transform hover:-translate-y-1"><Instagram size={17} /></a>
              <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook" className="grid h-9 w-9 place-items-center rounded-full bg-[#2866B2] text-white transition-transform hover:-translate-y-1"><Facebook size={17} /></a>
              <a href="https://www.youtube.com/" target="_blank" rel="noreferrer" aria-label="YouTube" className="grid h-9 w-9 place-items-center rounded-full bg-[#D52D2D] text-white transition-transform hover:-translate-y-1"><Youtube size={17} /></a>
            </div>
          </section>

          <section className="rm-footer-reveal flex min-w-0 flex-col items-center text-center sm:items-start sm:text-left lg:border-l lg:border-[#D8B36B]/70 lg:px-7">
            <h2 className={headingClass}>{isHindi ? "संपर्क करें" : "CONTACT US"}</h2>
            <a href={`tel:${PHONE_LINK}`} className={linkClass}><Phone size={16} className="shrink-0 text-[#941F2B]" />{PHONE}</a>
            <Link href="/contact" className={linkClass}><Mail size={16} className="shrink-0 text-[#941F2B]" />{isHindi ? "संपर्क और सहायता" : "Contact & Support"}</Link>
            <div className="mt-3 flex max-w-[260px] items-start gap-2 text-left text-[12px] leading-[1.6] text-[#69534B]">
              <MapPin size={16} className="mt-0.5 shrink-0 text-[#941F2B]" />
              <span><strong className="block font-bold text-[#3D2924]">{isHindi ? "मुख्य कार्यालय" : "Head Office"}</strong>Rashid Mega Mart, Ghoghar, Rewa, Madhya Pradesh 486001</span>
            </div>
            <a href="https://wa.me/918962531603" target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#8C2028] px-4 py-2 text-[11px] font-bold text-white shadow-sm transition-colors hover:bg-[#6E171E]">
              <MessageCircle size={14} />{isHindi ? "व्हाट्सऐप पर बात करें" : "Chat on WhatsApp"}<ArrowUpRight size={13} />
            </a>
          </section>

          <nav aria-label="Explore" className="rm-footer-reveal flex min-w-0 flex-col items-center text-center sm:items-start sm:text-left lg:border-l lg:border-[#D8B36B]/70 lg:px-6">
            <h2 className={headingClass}><span className="inline-flex items-center gap-2"><ShoppingBasket size={14} />{isHindi ? "एक्सप्लोर" : "EXPLORE"}</span></h2>
            <ul className="space-y-0.5">
              {explore.map((item) => <li key={item.href}><Link href={item.href} className={linkClass}><ChevronRight size={13} className="shrink-0 text-[#A76B37] transition-transform group-hover:translate-x-1" />{isHindi ? item.hi : item.en}</Link></li>)}
            </ul>
          </nav>

          <nav aria-label="Help and policies" className="rm-footer-reveal flex min-w-0 flex-col items-center text-center sm:items-start sm:text-left lg:border-l lg:border-[#D8B36B]/70 lg:px-6">
            <h2 className={headingClass}>{isHindi ? "मदद और जानकारी" : "HELP & INFO"}</h2>
            <ul className="space-y-0.5">
              {help.map((item) => <li key={item.href}><Link href={item.href} className={linkClass}><ChevronRight size={13} className="shrink-0 text-[#A76B37] transition-transform group-hover:translate-x-1" />{isHindi ? item.hi : item.en}</Link></li>)}
            </ul>
          </nav>

          <section className="rm-footer-reveal flex min-w-0 flex-col items-center text-center sm:col-span-2 sm:items-start sm:text-left lg:col-span-1 lg:border-l lg:border-[#D8B36B]/70 lg:pl-6">
            <h2 className={headingClass}>{isHindi ? "हमारा स्टोर" : "FIND OUR STORE"}</h2>
            <a href={STORE_MAP} target="_blank" rel="noreferrer" aria-label="Open Rashid Mega Mart location in Google Maps" className="block w-full max-w-[340px] overflow-hidden rounded-[14px] border border-[#D9C59F] bg-white shadow-[0_5px_18px_rgba(86,54,28,.08)]">
              <iframe title="Rashid Mega Mart location map" src={STORE_EMBED} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="pointer-events-none h-[125px] w-full sm:h-[138px]" />
            </a>
            <a href={STORE_MAP} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-[#8C2028] transition-colors hover:text-[#54221F]">{isHindi ? "मैप पर देखें" : "VIEW ON MAP"}<ArrowUpRight size={13} /></a>
          </section>
        </div>

        <div className="rm-footer-reveal flex flex-col items-center justify-between gap-2 border-t border-[#D8B36B]/70 py-4 text-center sm:flex-row sm:text-left">
          <p className="text-[10px] leading-5 text-[#78645A] sm:text-[11px]">© {new Date().getFullYear()} <span className="font-bold text-[#54221F]">Rashid Mega Mart</span>. {isHindi ? "सर्वाधिकार सुरक्षित।" : "All Rights Reserved."}</p>
          <p className="text-[10px] font-semibold tracking-wide text-[#8C2028] sm:text-[11px]">{isHindi ? "आपका भरोसेमंद किराना स्टोर" : "Shop Smart. Shop Local."}</p>
        </div>
      </div>
    </footer>
  );
}
