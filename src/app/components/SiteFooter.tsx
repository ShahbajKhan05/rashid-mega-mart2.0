"use client";

import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Youtube, MessageCircle, MapPin, Phone, Mail, ArrowUpRight, ChevronRight, ShieldCheck, ShoppingBasket } from "lucide-react";
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
        y: 0, opacity: 1, duration: .55, stagger: .07, ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 97%", once: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const quickLinks = [
    { href: "/", en: "Home", hi: "होम" },
    { href: "/products", en: "Our Products", hi: "हमारे प्रोडक्ट्स" },
    { href: "/kits", en: "Grocery Kits", hi: "किराना किट" },
    { href: "/about", en: "About Us", hi: "हमारे बारे में" },
    { href: "/contact", en: "Reach Us", hi: "संपर्क करें" },
  ];
  const legalLinks = [
    { href: "/privacy-policy", en: "Privacy Policy", hi: "गोपनीयता नीति" },
    { href: "/terms-and-conditions", en: "Terms & Conditions", hi: "नियम और शर्तें" },
  ];
  const linkClass = "group flex items-center gap-2.5 rounded-lg px-2 py-1 text-[13px] leading-5 text-[#30241F] transition-all duration-200 hover:translate-x-1 hover:bg-white/70 hover:text-[#A30E0B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A30E0B]";
  const iconClass = "grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#A91410] text-white shadow-sm";

  return (
    <footer ref={footerRef} className="relative isolate overflow-hidden bg-[#54110F] px-3 py-5 text-white sm:px-6 sm:py-8">
      <div className="relative mx-auto max-w-[1700px]">
        <div className="relative overflow-hidden rounded-[22px] border border-[#E7BC69] bg-[#F8F0DF] shadow-[0_24px_65px_rgba(0,0,0,.32)] ring-1 ring-white/40 sm:rounded-[30px]">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-[.23]" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1800&q=80)" }} />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#FFF9EC]/95 via-[#FFF8EA]/90 to-[#FFF9ED]/80" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[.12]" style={{ backgroundImage: "radial-gradient(ellipse at 10% 20%,#B8893D 0 1px,transparent 2px),radial-gradient(ellipse at 70% 80%,#A81712 0 1px,transparent 2px)", backgroundSize: "32px 32px,46px 46px" }} />
          <div aria-hidden="true" className="pointer-events-none absolute -left-8 -top-20 h-44 w-[42%] -rotate-[10deg] bg-[#F8AD35] sm:-top-24 sm:h-52" />

          <div className="relative grid gap-7 px-5 pb-7 pt-7 sm:px-8 sm:pb-9 sm:pt-8 lg:grid-cols-[.96fr_1.12fr_.68fr] lg:gap-0 lg:px-9 lg:pb-[92px] lg:pt-8 xl:px-11">
            <section className="rm-footer-reveal flex min-w-0 flex-col items-center text-center sm:items-start sm:text-left lg:pr-8">
              <Link href="/" aria-label="Rashid Mega Mart home" className="mb-3 inline-flex items-center rounded-2xl border border-white/80 bg-white/75 px-4 py-2 shadow-[0_8px_24px_rgba(91,36,15,.10)] backdrop-blur-sm">
                <Image src="/Logo.png" alt="Rashid Mega Mart" width={230} height={105} className="h-[70px] w-[190px] object-contain object-left sm:h-[82px] sm:w-[220px]" />
              </Link>
              <h2 className="mt-1 text-[clamp(2.65rem,4.7vw,4.35rem)] font-black leading-[.88] tracking-[-.06em] text-[#A70F0B]">
                <span className="block text-[.58em] text-[#30251F]">{isHindi ? "जुड़े रहें" : "Stay"}</span>
                {isHindi ? "हमसे" : "Connected"}
              </h2>
              <div className="mt-3 h-[5px] w-44 rounded-full bg-gradient-to-r from-transparent via-[#E6AE42] to-transparent" />
              <ul className="mt-5 grid gap-2 text-left">
                <li className="flex items-center gap-3 text-[13px] text-[#2D2521] sm:text-[15px]"><span className={iconClass}><Mail size={16}/></span><Link href="/contact" className="font-medium hover:text-[#A70F0B]">{isHindi ? "ईमेल – संपर्क सहायता" : "Email – Contact & Support"}</Link></li>
                <li className="flex items-center gap-3 text-[13px] text-[#2D2521] sm:text-[15px]"><span className={iconClass}><Phone size={16}/></span><a href="tel:+918962531603" className="font-medium hover:text-[#A70F0B]">Call – 89625 31603</a></li>
                <li className="flex items-center gap-3 text-[13px] text-[#2D2521] sm:text-[15px]"><span className={iconClass}><MessageCircle size={16}/></span><a href="https://wa.me/918962531603" target="_blank" rel="noreferrer" className="font-medium hover:text-[#A70F0B]">WhatsApp – 89625 31603</a></li>
              </ul>
              <div className="mt-5 flex flex-wrap justify-center gap-2.5 sm:justify-start">
                <a href="https://www.youtube.com/" target="_blank" rel="noreferrer" aria-label="YouTube" className="grid h-10 w-10 place-items-center rounded-full border-2 border-white bg-[#A81712] text-white shadow-md transition hover:-translate-y-1 hover:bg-[#D69A28]"><Youtube size={19}/></a>
                <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-full border-2 border-white bg-[#A81712] text-white shadow-md transition hover:-translate-y-1 hover:bg-[#D69A28]"><Instagram size={19}/></a>
                <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook" className="grid h-10 w-10 place-items-center rounded-full border-2 border-white bg-[#A81712] text-white shadow-md transition hover:-translate-y-1 hover:bg-[#D69A28]"><Facebook size={19}/></a>
                <a href="https://wa.me/918962531603" target="_blank" rel="noreferrer" aria-label="WhatsApp" className="grid h-10 w-10 place-items-center rounded-full border-2 border-white bg-[#16A34A] text-white shadow-md transition hover:-translate-y-1 hover:bg-[#138B3D]"><MessageCircle size={19}/></a>
              </div>
            </section>

            <section className="rm-footer-reveal min-w-0 border-y border-[#C99A4A]/60 py-6 lg:border-x lg:border-y-0 lg:px-7 lg:py-0 xl:px-9">
              <div className="overflow-hidden rounded-[17px] border-[3px] border-white/90 bg-white shadow-[0_14px_34px_rgba(80,44,20,.24)] ring-1 ring-[#D8AD5B]">
                <a href="https://www.google.com/maps/search/?api=1&query=Ghoghar%2C+Rewa%2C+Madhya+Pradesh" target="_blank" rel="noreferrer" className="relative block">
                  <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-[12px] font-semibold text-[#1769D2] shadow-md">Open in Maps <ArrowUpRight size={14}/></span>
                  <iframe title="Rashid Mega Mart location map" src="https://maps.google.com/maps?q=Ghoghar%2C%20Rewa%2C%20Madhya%20Pradesh&t=&z=14&ie=UTF8&iwloc=&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-[190px] w-full sm:h-[225px] lg:h-[250px]" />
                </a>
              </div>
              <div className="mt-4 flex items-start justify-center gap-3 rounded-2xl border border-[#D8B56F]/60 bg-white/55 px-4 py-3 text-center shadow-[0_6px_20px_rgba(92,48,19,.06)] backdrop-blur-sm sm:justify-start sm:text-left">
                <MapPin size={27} className="mt-1 shrink-0 fill-[#A81712] text-[#A81712]"/>
                <div>
                  <h3 className="text-[21px] font-extrabold leading-tight text-[#A81712] sm:text-[24px]">{isHindi ? "हमारा स्टोर" : "Head Office"}</h3>
                  <p className="mt-2 text-[13px] leading-6 text-[#30251F] sm:text-[15px]">Rashid Mega Mart<br/>Ghoghar, Rewa, Madhya Pradesh 486001</p>
                  <a href="https://www.google.com/maps/search/?api=1&query=Ghoghar%2C+Rewa%2C+Madhya+Pradesh" target="_blank" rel="noreferrer" className="mt-1 inline-flex items-center gap-1 text-[12px] font-bold text-[#A81712] hover:underline">{isHindi ? "रास्ता देखें" : "Get directions"} <ArrowUpRight size={14}/></a>
                </div>
              </div>
            </section>

            <section className="rm-footer-reveal grid grid-cols-2 gap-5 border-t border-[#C99A4A]/50 pt-5 sm:gap-8 lg:block lg:border-0 lg:pl-7 lg:pt-0 xl:pl-9">
              <div>
                <h3 className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#A80705] to-[#790A08] px-4 py-2 text-[12px] font-extrabold uppercase tracking-[.12em] text-white shadow-[0_5px_13px_rgba(116,10,8,.2)]"><ShoppingBasket size={17}/> Website</h3>
                <ul className="mt-3 space-y-1.5 pl-1">
                  {quickLinks.map((item) => <li key={item.href}><Link href={item.href} className={linkClass}><ChevronRight size={15} className="shrink-0 text-[#A81712] transition-transform group-hover:translate-x-1"/>{isHindi ? item.hi : item.en}</Link></li>)}
                </ul>
              </div>
              <div className="lg:mt-6">
                <h3 className="flex items-center gap-2 text-[13px] font-extrabold uppercase tracking-[.13em] text-[#A81712]"><ShieldCheck size={17}/> Legal</h3>
                <ul className="mt-3 space-y-1.5">
                  {legalLinks.map((item) => <li key={item.href}><Link href={item.href} className={linkClass}><ChevronRight size={15} className="shrink-0 text-[#A81712] transition-transform group-hover:translate-x-1"/>{isHindi ? item.hi : item.en}</Link></li>)}
                </ul>
              </div>
            </section>
          </div>

          <div className="relative z-10 flex flex-col items-center justify-between gap-2 border-t-[4px] border-[#F4C45D] bg-gradient-to-r from-[#A80705] via-[#790A08] to-[#A80705] px-5 py-4 text-center text-white shadow-[0_-5px_20px_rgba(80,0,0,.12)] sm:flex-row sm:px-8 sm:text-left lg:absolute lg:bottom-0 lg:left-0 lg:right-0">
            <p className="text-[11px] sm:text-[13px]">© {new Date().getFullYear()} <span className="font-extrabold text-[#FFE09A]">Rashid Mega Mart</span> | {isHindi ? "सर्वाधिकार सुरक्षित" : "All rights reserved"} | {isHindi ? "आपका भरोसेमंद किराना स्टोर" : "Powered by Rashid Mega Mart"}</p>
            <p className="font-serif text-[19px] italic text-[#FFE09A] sm:text-[22px]">Good Food. Good Mood.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
