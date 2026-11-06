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

export default function SiteFooter() {
  const { language } = useLanguage();
  const footerRef = useRef<HTMLElement>(null);
  const isHindi = language === "hi";

  useEffect(() => {
    const root = footerRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(".rm-footer-reveal", { y: 18, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.65, stagger: 0.09, ease: "power3.out",
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
  const itemClass = "group inline-flex items-center gap-2 py-1.5 text-[13px] leading-5 text-[#F6EBDD]/75 transition-colors duration-200 hover:text-[#F5C96D] focus-visible:outline-none focus-visible:text-[#F5C96D]";
  const socialClass = "grid h-9 w-9 place-items-center rounded-full border border-[#D8B36B]/45 bg-white/[0.06] text-[#F8EEDC] transition-all duration-200 hover:-translate-y-1 hover:border-[#F5C96D] hover:bg-[#F5C96D] hover:text-[#58110F]";

  return (
    <footer ref={footerRef} className="relative isolate overflow-hidden bg-[#4D0D0C] text-[#FFF8EC]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-[.16]" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1800&q=80)" }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#4D0D0C]/95 via-[#641512]/95 to-[#320807]/95" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-28 -top-40 h-[420px] w-[420px] rounded-full border border-[#D8B36B]/10" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-28 h-[300px] w-[300px] rounded-full border border-[#D8B36B]/10" />

      <div className="relative mx-auto max-w-[1440px] px-5 pb-6 pt-9 sm:px-8 sm:pt-12 lg:px-12 lg:pt-14">
        <div className="rm-footer-reveal flex flex-col items-center justify-between gap-5 border-b border-[#D8B36B]/35 pb-7 text-center sm:flex-row sm:text-left">
          <Link href="/" aria-label="Rashid Mega Mart home" className="inline-flex items-center">
            <Image src="/Logo.png" alt="Rashid Mega Mart" width={230} height={105} className="h-[68px] w-[190px] object-contain sm:h-[78px] sm:w-[215px]" />
          </Link>
          <div className="max-w-[440px]">
            <p className="text-[10px] font-bold uppercase tracking-[.28em] text-[#E9BD69]">{isHindi ? "हर दिन, हर जरूरत" : "YOUR EVERYDAY GROCERY PARTNER"}</p>
            <p className="mt-2 font-serif text-[clamp(1.35rem,2.4vw,2rem)] leading-tight tracking-[-.025em] text-[#FFF4E2]">{isHindi ? "अच्छा खाना। अच्छा मूड।" : "Good Food. Good Mood."}</p>
          </div>
        </div>

        <div className="grid gap-8 py-8 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-9 lg:grid-cols-[1.25fr_.72fr_.9fr_1.15fr] lg:gap-12 lg:py-10">
          <section className="rm-footer-reveal flex min-w-0 flex-col items-center text-center sm:items-start sm:text-left">
            <h2 className="text-[11px] font-extrabold uppercase tracking-[.2em] text-[#E9BD69]">{isHindi ? "हमसे जुड़े रहें" : "LET'S STAY CONNECTED"}</h2>
            <p className="mt-3 max-w-[290px] text-[13px] leading-6 text-[#F6EBDD]/70">{isHindi ? "ऑर्डर, जानकारी या सहायता के लिए हमारी टीम से संपर्क करें।" : "For orders, product details or support, our team is just a message away."}</p>
            <div className="mt-4 grid gap-3 text-left">
              <Link href="/contact" className="flex items-center gap-3 text-[13px] text-[#FFF4E2] transition-colors hover:text-[#F5C96D]"><span className="grid h-8 w-8 place-items-center rounded-full bg-[#E9BD69]/15 text-[#E9BD69]"><Mail size={15}/></span>{isHindi ? "संपर्क और सहायता" : "Contact & Support"}</Link>
              <a href="tel:+918962531603" className="flex items-center gap-3 text-[13px] text-[#FFF4E2] transition-colors hover:text-[#F5C96D]"><span className="grid h-8 w-8 place-items-center rounded-full bg-[#E9BD69]/15 text-[#E9BD69]"><Phone size={15}/></span>89625 31603</a>
              <a href="https://wa.me/918962531603" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-[13px] text-[#FFF4E2] transition-colors hover:text-[#F5C96D]"><span className="grid h-8 w-8 place-items-center rounded-full bg-[#E9BD69]/15 text-[#E9BD69]"><MessageCircle size={15}/></span>{isHindi ? "व्हाट्सऐप पर चैट करें" : "Chat on WhatsApp"}</a>
            </div>
            <div className="mt-5 flex gap-2.5">
              <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram" className={socialClass}><Instagram size={17}/></a>
              <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook" className={socialClass}><Facebook size={17}/></a>
              <a href="https://www.youtube.com/" target="_blank" rel="noreferrer" aria-label="YouTube" className={socialClass}><Youtube size={17}/></a>
              <a href="https://wa.me/918962531603" target="_blank" rel="noreferrer" aria-label="WhatsApp" className={socialClass}><MessageCircle size={17}/></a>
            </div>
          </section>

          <nav aria-label="Explore" className="rm-footer-reveal flex min-w-0 flex-col items-center text-center sm:items-start sm:text-left">
            <h2 className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[.2em] text-[#E9BD69]"><ShoppingBasket size={15}/>{isHindi ? "एक्सप्लोर करें" : "EXPLORE"}</h2>
            <ul className="mt-3">
              {explore.map((item) => <li key={item.href}><Link href={item.href} className={itemClass}><ChevronRight size={13} className="text-[#D8B36B] transition-transform group-hover:translate-x-1"/>{isHindi ? item.hi : item.en}</Link></li>)}
            </ul>
          </nav>

          <nav aria-label="Help and policies" className="rm-footer-reveal flex min-w-0 flex-col items-center text-center sm:items-start sm:text-left">
            <h2 className="text-[11px] font-extrabold uppercase tracking-[.2em] text-[#E9BD69]">{isHindi ? "मदद और जानकारी" : "HELP & INFORMATION"}</h2>
            <ul className="mt-3">
              {help.map((item) => <li key={item.href}><Link href={item.href} className={itemClass}><ChevronRight size={13} className="text-[#D8B36B] transition-transform group-hover:translate-x-1"/>{isHindi ? item.hi : item.en}</Link></li>)}
            </ul>
          </nav>

          <section className="rm-footer-reveal flex min-w-0 flex-col items-center text-center sm:items-start sm:text-left">
            <h2 className="text-[11px] font-extrabold uppercase tracking-[.2em] text-[#E9BD69]">{isHindi ? "हमारा स्टोर" : "FIND OUR STORE"}</h2>
            <a href="https://www.google.com/maps/search/?api=1&query=Ghoghar%2C+Rewa%2C+Madhya+Pradesh" target="_blank" rel="noreferrer" className="group mt-3 block w-full max-w-[340px] overflow-hidden rounded-xl border border-[#D8B36B]/35 bg-[#2F0807]">
              <iframe title="Rashid Mega Mart location map" src="https://maps.google.com/maps?q=Ghoghar%2C%20Rewa%2C%20Madhya%20Pradesh&t=&z=14&ie=UTF8&iwloc=&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="pointer-events-none h-[125px] w-full opacity-90 transition-opacity group-hover:opacity-100 sm:h-[140px]"/>
            </a>
            <p className="mt-3 flex items-start justify-center gap-2 text-[12px] leading-5 text-[#F6EBDD]/75 sm:justify-start"><MapPin size={15} className="mt-0.5 shrink-0 text-[#E9BD69]"/>Rashid Mega Mart, Ghoghar, Rewa, Madhya Pradesh 486001</p>
            <a href="https://www.google.com/maps/search/?api=1&query=Ghoghar%2C+Rewa%2C+Madhya+Pradesh" target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-[#E9BD69] transition-colors hover:text-white">{isHindi ? "रास्ता देखें" : "GET DIRECTIONS"} <ArrowUpRight size={13}/></a>
          </section>
        </div>

        <div className="rm-footer-reveal flex flex-col items-center justify-between gap-3 border-t border-[#D8B36B]/30 pt-5 text-center sm:flex-row sm:text-left">
          <p className="text-[10px] leading-5 text-[#F6EBDD]/55 sm:text-[11px]">© {new Date().getFullYear()} <span className="font-semibold text-[#F5D99F]">Rashid Mega Mart</span>. {isHindi ? "सर्वाधिकार सुरक्षित।" : "All rights reserved."}</p>
          <p className="text-[11px] font-medium tracking-wide text-[#E9BD69]">{isHindi ? "आपका भरोसेमंद किराना स्टोर" : "Your everyday essentials, made easier."}</p>
        </div>
      </div>
    </footer>
  );
}
