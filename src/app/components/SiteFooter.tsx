"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Facebook, Instagram, Youtube, MessageCircle, MapPin, Phone, Mail,
  ArrowUpRight, ChevronRight, ShieldCheck, ShoppingBasket,
} from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const foodPattern = '<svg xmlns="http://www.w3.org/2000/svg" width="260" height="220" viewBox="0 0 260 220"><g fill="none" stroke="#F8D98B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity=".34"><path d="M25 24c8-9 24-8 30 2 7 12-3 25-17 25S14 37 25 24Zm-4 5 34 13M95 18c18-7 35 5 31 21-3 13-17 19-30 12-12-7-13-25-1-33Zm2 7 27 20M180 25c8-12 26-12 34 0l-4 24h-27l-3-24Zm-2-5 18-10 20 10M30 126c0-13 10-23 23-23s23 10 23 23-10 23-23 23-23-10-23-23Zm11-15 24 30M135 105c14-9 32 1 31 17-1 13-14 22-27 16-14-6-16-25-4-33Zm-7 4 34 24M210 139c-3-17 9-30 24-27 14 3 19 20 10 31-8 10-24 9-34-4ZM22 190l20-22 20 22-20 17-20-17Zm115-4c8-13 29-13 37 0l-18 23-19-23Zm76-7 22-14 19 14-19 18-22-18Z"/></g><g fill="#F8D98B" opacity=".25" font-family="Arial" font-size="10"><text x="10" y="82">FRESH</text><text x="100" y="88">GROCERY</text><text x="188" y="86">DAILY</text><text x="83" y="205">GOOD FOOD</text></g></svg>';

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
        y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 96%", once: true },
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
    { href: "/shipping-policy", en: "Shipping & Delivery", hi: "शिपिंग और डिलीवरी" },
    { href: "/cancellation-refund", en: "Cancellation & Refund", hi: "रद्द और रिफंड" },
    { href: "/return-replacement", en: "Returns & Replacement", hi: "रिटर्न और रिप्लेसमेंट" },
  ];
  const headingClass = "text-center text-[13px] font-extrabold uppercase tracking-[.13em] text-[#FFE0A0] sm:text-left";
  const linkClass = "group inline-flex items-center gap-2 text-[13px] leading-6 text-[#FFF1E7]/85 transition-colors hover:text-[#FFD477] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD477] rounded-sm";

  return (
    <footer ref={footerRef} className="relative isolate overflow-hidden bg-[#4E100F] px-3 pb-[calc(76px+env(safe-area-inset-bottom))] pt-7 text-white sm:px-6 sm:pt-10 xl:pb-7">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(ellipse at 10% 10%,rgba(226,164,63,.16),transparent 38%),radial-gradient(ellipse at 90% 90%,rgba(255,220,160,.12),transparent 35%)" }} />
      <div className="relative mx-auto max-w-[1600px]">
        <div className="relative overflow-hidden rounded-[22px] border border-[#D59B43]/70 bg-[#70241F] shadow-[0_22px_70px_rgba(0,0,0,.24)] sm:rounded-[28px]">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[.19]" style={{ backgroundImage: "url(data:image/svg+xml," + encodeURIComponent(foodPattern) + ")", backgroundRepeat: "repeat", backgroundSize: "260px 220px" }} />
          <div aria-hidden="true" className="pointer-events-none absolute -left-16 -top-24 h-48 w-[48%] -rotate-[10deg] bg-[#F9B23F] sm:-left-10 sm:-top-28 sm:h-56" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#7B2B24]/25 via-transparent to-[#3D0D0D]/25" />

          <div className="relative grid gap-8 px-5 pb-7 pt-8 sm:gap-9 sm:px-8 sm:pb-9 sm:pt-10 lg:grid-cols-[1.08fr_1.12fr_.72fr] lg:gap-8 lg:px-9 lg:py-9 xl:px-10">
            <section className="rm-footer-reveal flex min-w-0 flex-col items-center text-center sm:items-start sm:text-left">
              <Link href="/" aria-label="Rashid Mega Mart home" className="mb-5 inline-flex items-center justify-center rounded-xl bg-white/95 p-2 shadow-[0_5px_24px_rgba(0,0,0,.12)] transition-transform duration-300 hover:-translate-y-1">
                <Image src="/Logo.png" alt="Rashid Mega Mart" width={190} height={86} className="h-[66px] w-[174px] object-contain sm:h-[76px] sm:w-[190px]" priority={false} />
              </Link>
              <p className="text-[11px] font-bold uppercase tracking-[.22em] text-[#FFD477]">{isHindi ? "हमेशा ताज़ा, हमेशा भरोसेमंद" : "Your everyday grocery destination"}</p>
              <h2 className="mt-2 text-[clamp(2.25rem,5vw,4.1rem)] font-black leading-[.96] tracking-[-.055em] text-[#FFCA67] [text-shadow:0_3px_0_rgba(80,15,10,.5)]">
                {isHindi ? <>हर दिन<br/>आसान</> : <>Stay<br/>Connected</>}
              </h2>
              <ul className="mt-6 grid gap-3 text-left">
                <li className="flex items-center gap-3 text-[13px] text-[#FFF2E9] sm:text-[14px]"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#F8D8CE] text-[#761B18]"><Mail size={16}/></span><Link href="/contact" className="hover:text-[#FFD477]">{isHindi ? "ईमेल और सहायता" : "Email – Contact & Support"}</Link></li>
                <li className="flex items-center gap-3 text-[13px] text-[#FFF2E9] sm:text-[14px]"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#F8D8CE] text-[#761B18]"><Phone size={16}/></span><a href="tel:+918962531603" className="hover:text-[#FFD477]">Call – 89625 31603</a></li>
                <li className="flex items-center gap-3 text-[13px] text-[#FFF2E9] sm:text-[14px]"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#F8D8CE] text-[#761B18]"><MessageCircle size={16}/></span><a href="https://wa.me/918962531603" target="_blank" rel="noreferrer" className="hover:text-[#FFD477]">WhatsApp – 89625 31603</a></li>
              </ul>
              <div className="mt-5 flex flex-wrap justify-center gap-2.5 sm:justify-start">
                <a href="https://www.youtube.com/" target="_blank" rel="noreferrer" aria-label="YouTube" className="grid h-10 w-10 place-items-center rounded-full border border-[#F6D6C7] bg-white text-[#A81712] shadow-sm transition hover:-translate-y-1 hover:bg-[#FFD477]"><Youtube size={19}/></a>
                <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-full border border-[#F6D6C7] bg-white text-[#A81712] shadow-sm transition hover:-translate-y-1 hover:bg-[#FFD477]"><Instagram size={19}/></a>
                <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook" className="grid h-10 w-10 place-items-center rounded-full border border-[#F6D6C7] bg-white text-[#A81712] shadow-sm transition hover:-translate-y-1 hover:bg-[#FFD477]"><Facebook size={19}/></a>
                <a href="https://wa.me/918962531603" target="_blank" rel="noreferrer" aria-label="WhatsApp" className="grid h-10 w-10 place-items-center rounded-full border border-[#F6D6C7] bg-white text-[#16A34A] shadow-sm transition hover:-translate-y-1 hover:bg-[#FFD477]"><MessageCircle size={19}/></a>
              </div>
            </section>

            <section className="rm-footer-reveal min-w-0 lg:border-x lg:border-[#F5C66D]/40 lg:px-7">
              <div className="overflow-hidden rounded-xl border border-[#F5DDAA]/80 bg-[#F8F5EE] shadow-[0_12px_30px_rgba(0,0,0,.2)]">
                <a href="https://www.google.com/maps/search/?api=1&query=Ghoghar%2C+Rewa%2C+Madhya+Pradesh" target="_blank" rel="noreferrer" className="group relative block">
                  <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-[12px] font-semibold text-[#1769D2] shadow-md">Open in Maps <ArrowUpRight size={14}/></span>
                  <iframe title="Rashid Mega Mart location map" src="https://maps.google.com/maps?q=Ghoghar%2C%20Rewa%2C%20Madhya%20Pradesh&t=&z=14&ie=UTF8&iwloc=&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-[190px] w-full sm:h-[220px] lg:h-[245px]" />
                </a>
              </div>
              <div className="mt-5 flex items-start justify-center gap-3 text-center sm:justify-start sm:text-left">
                <MapPin size={25} className="mt-1 shrink-0 text-[#FFD477]"/>
                <div>
                  <h3 className="text-[20px] font-extrabold leading-tight text-white sm:text-[23px]">{isHindi ? "हमारा स्टोर" : "Visit Our Store"}</h3>
                  <p className="mt-2 text-[13px] leading-6 text-[#FFF0E6]/90 sm:text-[14px]">Rashid Mega Mart<br/>Ghoghar, Rewa, Madhya Pradesh 486001</p>
                  <a href="https://www.google.com/maps/search/?api=1&query=Ghoghar%2C+Rewa%2C+Madhya+Pradesh" target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1 text-[12px] font-bold text-[#FFD477] hover:text-white">{isHindi ? "रास्ता देखें" : "Get directions"} <ArrowUpRight size={14}/></a>
                </div>
              </div>
            </section>

            <section className="rm-footer-reveal grid grid-cols-2 gap-5 border-t border-[#F5C66D]/30 pt-6 sm:gap-8 lg:block lg:border-0 lg:pt-0">
              <div>
                <h3 className={headingClass}><span className="inline-flex items-center gap-2"><ShoppingBasket size={16}/> Website</span></h3>
                <ul className="mt-4 space-y-2.5">
                  {quickLinks.map((item) => <li key={item.href}><Link href={item.href} className={linkClass}><ChevronRight size={14} className="shrink-0 text-[#FFD477] transition-transform group-hover:translate-x-1"/>{isHindi ? item.hi : item.en}</Link></li>)}
                </ul>
              </div>
              <div className="lg:mt-7">
                <h3 className={headingClass}><span className="inline-flex items-center gap-2"><ShieldCheck size={16}/> Legal</span></h3>
                <ul className="mt-4 space-y-2.5">
                  {legalLinks.map((item) => <li key={item.href}><Link href={item.href} className={linkClass}><ChevronRight size={14} className="shrink-0 text-[#FFD477] transition-transform group-hover:translate-x-1"/>{isHindi ? item.hi : item.en}</Link></li>)}
                </ul>
              </div>
            </section>
          </div>
        </div>

        <div className="rm-footer-reveal mt-4 flex flex-col items-center justify-between gap-2 px-2 pb-1 text-center sm:flex-row sm:text-left">
          <p className="text-[11px] text-[#FFE9D9]/90 sm:text-[13px]">© {new Date().getFullYear()} <span className="font-bold text-[#FFD477]">Rashid Mega Mart</span> | {isHindi ? "सर्वाधिकार सुरक्षित" : "All rights reserved"} | {isHindi ? "सभी अधिकार सुरक्षित" : "Powered by Rashid Mega Mart"}</p>
          <p className="font-serif text-[19px] italic text-[#FFD477]">Good Food. Good Mood.</p>
        </div>
      </div>
    </footer>
  );
}
