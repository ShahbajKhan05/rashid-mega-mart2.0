"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, ArrowUpRight } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

const phone = "8962531603";

export default function SiteFooter() {
  const { language, t } = useLanguage();
  const isHindi = language === "hi";

  return (
    <footer className="relative overflow-hidden border-t border-[#eadfce] bg-[linear-gradient(135deg,#fffdf7_0%,#f8f1e7_52%,#fffaf2_100%)] pb-[112px] pt-10 text-[#382b2b] sm:pt-12 xl:pb-7">
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#b88a42]/[0.08] blur-3xl" />
      <div className="relative mx-auto grid max-w-[1320px] grid-cols-2 gap-x-7 gap-y-9 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-[1.4fr_.8fr_.9fr_1fr] lg:gap-12 lg:px-10">
        <div className="col-span-2 max-w-sm lg:col-span-1">
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
            {isHindi ? "घोघर, रीवा में आपकी रोज़मर्रा की ज़रूरतों का भरोसेमंद पड़ोसी स्टोर।" : "Your neighbourhood store in Ghoghar, Rewa for the things your home needs every day."}
          </p>
          <a href="https://wa.me/918962531603" target="_blank" rel="noreferrer" className="mt-4 inline-flex h-10 items-center gap-2 rounded-full bg-[#800020] px-4 text-xs font-bold text-white shadow-[0_7px_18px_rgba(128,0,32,.16)] transition hover:-translate-y-0.5 hover:bg-[#650019]">
            {isHindi ? "WhatsApp पर बात करें" : "Chat on WhatsApp"} <ArrowUpRight size={14} />
          </a>
        </div>

        <div>
          <h2 className="text-[11px] font-extrabold uppercase tracking-[.18em] text-[#a77b3e]">{t("quickLinks")}</h2>
          <ul className="mt-4 space-y-3 text-[13px] font-medium text-[#65574f]">
            <li><Link className="transition hover:text-[#800020]" href="/">{isHindi ? "होम" : "Home"}</Link></li>
            <li><Link className="transition hover:text-[#800020]" href="/products">{isHindi ? "सभी उत्पाद" : "Shop products"}</Link></li>
            <li><Link className="transition hover:text-[#800020]" href="/order-tracking">{isHindi ? "ऑर्डर ट्रैक करें" : "Track order"}</Link></li>
            <li><Link className="transition hover:text-[#800020]" href="/my-orders">{isHindi ? "मेरे ऑर्डर" : "My orders"}</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="text-[11px] font-extrabold uppercase tracking-[.18em] text-[#a77b3e]">{t("contactUs")}</h2>
          <ul className="mt-4 space-y-4 text-[13px] text-[#65574f]">
            <li className="flex items-start gap-2.5"><MapPin size={16} className="mt-0.5 shrink-0 text-[#a77b3e]" /><span>Ghoghar, Rewa, Madhya Pradesh 486001</span></li>
            <li><a href={`tel:+91${phone}`} className="inline-flex items-center gap-2.5 font-semibold transition hover:text-[#800020]"><Phone size={15} className="text-[#a77b3e]" /> +91 {phone}</a></li>
          </ul>
        </div>

        <div>
          <h2 className="text-[11px] font-extrabold uppercase tracking-[.18em] text-[#a77b3e]">{t("followUs")}</h2>
          <p className="mt-4 text-[13px] leading-6 text-[#76665c]">{isHindi ? "ऑर्डर, उपलब्धता और मदद के लिए हमसे जुड़ें।" : "Connect with us for orders, product availability and support."}</p>
          <a href="https://wa.me/918962531603" target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#800020] underline decoration-[#cbb99e] underline-offset-4 hover:text-[#a77b3e]">
            {isHindi ? "WhatsApp सहायता" : "WhatsApp support"} <ArrowUpRight size={13} />
          </a>
        </div>
      </div>

      <div className="relative mx-auto mt-9 flex max-w-[1320px] flex-col gap-2 border-t border-[#e7dccd] px-5 pt-5 text-[10px] font-medium text-[#96877b] sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
        <p>© {new Date().getFullYear()} Rashid Mega Mart. {t("allRightsReserved")}</p>
        <p>{t("neighbourhoodStore")} <span className="px-1 text-[#b88a42]">✦</span> Rewa, Madhya Pradesh</p>
      </div>
    </footer>
  );
}
