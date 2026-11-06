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
  const linkClass = "group flex items-center gap-2.5 text-[13px] leading-6 text-[#30241F] transition-colors hover:text-[#A30E0B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A30E0B] rounded-sm";
  const iconClass = "grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#A91410] text-white shadow-sm";

  return (
    <footer ref={footerRef} className="relative isolate overflow-hidden bg-[#54110F] px-3 py-5 text-white sm:px-6 sm:py-8">
      <div className="relative mx-auto max-w-[1700px]">
        <div className="relative overflow-hidden rounded-[22px] border border-[#D6A04A] bg-[#F8F0DF] shadow-[0_18px_55px_rgba(0,0,0,.28)] sm:rounded-[28px]">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-cover bg-[center_48%] opacity-100" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=2200&q=88)" }} />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#FFF9EC]/75 via-[#FFF8EA]/48 to-[#FFF9ED]/32" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#FFF5E4]/52 via-transparent to-[#FFF9EC]/18" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[.055]" style={{ backgroundImage: "radial-gradient(ellipse at 10% 20%,#B8893D 0 1px,transparent 2px),radial-gradient(ellipse at 70% 80%,#A81712 0 1px,transparent 2px)", backgroundSize: "32px 32px,46px 46px" }} />
          <div aria-hidden="true" className="pointer-events-none absolute -left-8 -top-20 h-44 w-[42%] -rotate-[10deg] bg-[#F8AD35] sm:-top-24 sm:h-52" />

          <div className="relative grid gap-7 px-5 pb-8 pt-7 sm:px-8 sm:pb-10 sm:pt-9 lg:grid-cols-[1fr_1.05fr_.66fr] lg:gap-0 lg:px-9 lg:pb-20 lg:pt-9 xl:px-10">
            <section className="rm-footer-reveal flex min-w-0 flex-col items-center text-center sm:items-start sm:text-left lg:pr-8">
              <Link href="/" aria-label="Rashid Mega Mart home" className="mb-4 inline-flex items-center">
                <Image src="/Logo.png" alt="Rashid Mega Mart" width={230} height={105} className="h-[78px] w-[205px] object-contain object-left sm:h-[90px] sm:w-[235px]" />
              </Link>
              <h2 className="mt-1 text-[clamp(2.8rem,5vw,4.8rem)] font-black leading-[.9] tracking-[-.055em] text-[#A70F0B]">
                <span className="block text-[.58em] text-[#30251F]">{isHindi ? "जुड़े रहें" : "Stay"}</span>
                {isHindi ? "हमसे" : "Connected"}
              </h2>
              <div className="mt-3 h-[5px] w-44 rounded-full bg-gradient-to-r from-transparent via-[#E6AE42] to-transparent" />
              <ul className="mt-5 grid gap-2.5 text-left">
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
              <div className="overflow-hidden rounded-[12px] border border-[#E4C98E] bg-white shadow-[0_9px_28px_rgba(80,44,20,.18)]">
                <a href="https://www.google.com/maps/search/?api=1&query=Ghoghar%2C+Rewa%2C+Madhya+Pradesh" target="_blank" rel="noreferrer" className="relative block">
                  <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-[12px] font-semibold text-[#1769D2] shadow-md">Open in Maps <ArrowUpRight size={14}/></span>
                  <iframe title="Rashid Mega Mart location map" src="https://maps.google.com/maps?q=Ghoghar%2C%20Rewa%2C%20Madhya%20Pradesh&t=&z=14&ie=UTF8&iwloc=&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-[190px] w-full sm:h-[230px] lg:h-[245px]" />
                </a>
              </div>
              <div className="mt-5 flex items-start justify-center gap-3 text-center sm:justify-start sm:text-left">
                <MapPin size={27} className="mt-1 shrink-0 fill-[#A81712] text-[#A81712]"/>
                <div>
                  <h3 className="text-[21px] font-extrabold leading-tight text-[#A81712] sm:text-[24px]">{isHindi ? "हमारा स्टोर" : "Head Office"}</h3>
                  <p className="mt-2 text-[13px] leading-6 text-[#30251F] sm:text-[15px]">Rashid Mega Mart<br/>Ghoghar, Rewa, Madhya Pradesh 486001</p>
                  <a href="https://www.google.com/maps/search/?api=1&query=Ghoghar%2C+Rewa%2C+Madhya+Pradesh" target="_blank" rel="noreferrer" className="mt-1 inline-flex items-center gap-1 text-[12px] font-bold text-[#A81712] hover:underline">{isHindi ? "रास्ता देखें" : "Get directions"} <ArrowUpRight size={14}/></a>
                </div>
              </div>
            </section>

            <section className="rm-footer-reveal grid grid-cols-2 gap-5 sm:gap-8 lg:block lg:pl-8 xl:pl-10">
              <div>
                <h3 className="flex items-center gap-2 text-[13px] font-extrabold uppercase tracking-[.13em] text-[#A81712]"><ShoppingBasket size={17}/> Website</h3>
                <ul className="mt-3 space-y-1.5">
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

          <div className="relative z-10 flex flex-col items-center justify-between gap-2 border-t-[4px] border-[#E5AE3F] bg-gradient-to-r from-[#A80705] via-[#790A08] to-[#A80705] px-5 py-4 text-center text-white shadow-[0_-5px_20px_rgba(80,0,0,.12)] sm:flex-row sm:px-8 sm:text-left lg:absolute lg:bottom-0 lg:left-0 lg:right-0">
            <p className="text-[11px] sm:text-[13px]">© {new Date().getFullYear()} <span className="font-extrabold text-[#FFE09A]">Rashid Mega Mart</span> | {isHindi ? "सर्वाधिकार सुरक्षित" : "All rights reserved"} | {isHindi ? "आपका भरोसेमंद किराना स्टोर" : "Powered by Rashid Mega Mart"}</p>
            <p className="font-serif text-[19px] italic text-[#FFE09A] sm:text-[22px]">Good Food. Good Mood.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
