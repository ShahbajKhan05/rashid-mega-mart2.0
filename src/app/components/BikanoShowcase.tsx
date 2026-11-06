"use client";

import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

const picks = [
  { name: "Bikaneri Bhujia", hindi: "बीकानेरी भुजिया", note: "A Bikaner classic", tone: "from-[#f6c65c] to-[#d88a27]", mark: "भुजिया" },
  { name: "Aloo Bhujia", hindi: "आलू भुजिया", note: "Crispy. Spicy. Loved.", tone: "from-[#f2a34a] to-[#c95c25]", mark: "आलू" },
  { name: "Navratan Mixture", hindi: "नवरत्न मिक्सचर", note: "A little bit of everything", tone: "from-[#e7b65e] to-[#a65a31]", mark: "मिक्स" },
  { name: "Khatta Meetha", hindi: "खट्टा मीठा", note: "Sweet meets tangy", tone: "from-[#e9c86b] to-[#bd7a32]", mark: "स्वाद" },
];

export default function BikanoShowcase() {
  const { language } = useLanguage();
  const isHindi = language === "hi";

  return (
    <section id="bikano" aria-labelledby="bikano-title" className="relative isolate overflow-hidden bg-[#65152a] px-3 py-8 text-[#fff8e9] sm:px-6 sm:py-12">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_12%_15%,rgba(244,190,89,.2),transparent_35%),radial-gradient(ellipse_at_88%_85%,rgba(221,139,54,.18),transparent_38%)]" />
      <div className="mx-auto max-w-[1240px]">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-[680px]">
            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-[#f0c779]/35 bg-[#f0c779]/10 px-2.5 py-1 text-[8px] font-black uppercase tracking-[.2em] text-[#f5ce82] sm:text-[9px]">
              <Sparkles size={11} /> {isHindi ? "बिकानेर का मशहूर स्वाद" : "A taste of Bikaner"}
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[.24em] text-[#e8c58d]/75">RASHID MEGA MART PRESENTS</p>
            <h2 id="bikano-title" className="mt-1 text-[clamp(2.5rem,8vw,5.5rem)] font-black leading-[.88] tracking-[-.075em] text-[#fff4dc]">BIKANO<span className="text-[#efbd62]">.</span></h2>
            <p className="mt-3 max-w-[540px] text-[12px] leading-relaxed text-[#f8e9d1]/80 sm:text-sm">
              {isHindi ? "बीकानेर के चटपटे स्वाद के साथ हर स्नैक टाइम को बनाएं खास।" : "Bring a little Bikaner magic to every snack break with the much-loved Bikano range."}
            </p>
          </div>
          <a href="https://bikano.com/" target="_blank" rel="noreferrer" className="inline-flex h-9 items-center gap-2 rounded-full border border-[#f0c779]/45 px-4 text-[10px] font-extrabold text-[#f8d99c] transition hover:bg-[#f0c779] hover:text-[#541124]">
            {isHindi ? "ब्रांड एक्सप्लोर करें" : "Explore the brand"} <ArrowUpRight size={13} />
          </a>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-2.5 sm:mt-8 sm:grid-cols-4 sm:gap-3">
          {picks.map((item, index) => (
            <article key={item.name} className="group relative min-h-[156px] overflow-hidden rounded-[15px] border border-white/10 bg-[#fff9ed] p-3 text-[#39231e] shadow-[0_10px_30px_rgba(20,4,8,.16)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_34px_rgba(20,4,8,.25)] sm:min-h-[190px] sm:rounded-[18px] sm:p-4">
              <div aria-hidden="true" className={`absolute -right-7 -top-8 h-28 w-28 rounded-full bg-gradient-to-br ${item.tone} opacity-90 blur-[1px] transition duration-500 group-hover:scale-125 sm:h-36 sm:w-36`} />
              <div className="relative flex h-full flex-col justify-between">
                <span className="text-[8px] font-black uppercase tracking-[.17em] text-[#9c7651]">BIKANO • {String(index + 1).padStart(2, "0")}</span>
                <div>
                  <span className="mb-2 inline-flex rounded-full border border-[#8a552d]/15 bg-white/70 px-2 py-1 text-[9px] font-black text-[#7a3b24]">{item.mark}</span>
                  <h3 className="max-w-[150px] text-[14px] font-black leading-tight tracking-[-.04em] sm:text-[17px]">{isHindi ? item.hindi : item.name}</h3>
                  <p className="mt-1 text-[9px] font-medium text-[#806e5d] sm:text-[10px]">{isHindi ? "हर बाइट में चटपटा स्वाद" : item.note}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-4 flex flex-col justify-between gap-3 rounded-[13px] border border-[#f0c779]/20 bg-[#fff7e9]/[.07] px-3 py-3 sm:mt-5 sm:flex-row sm:items-center sm:px-4">
          <div>
            <p className="text-[11px] font-extrabold text-[#fff0d2] sm:text-xs">{isHindi ? "Bikano की पसंदीदा रेंज देखें" : "Your Bikano favourites, all in one place"}</p>
            <p className="mt-0.5 text-[9px] text-[#f4dfc2]/65 sm:text-[10px]">{isHindi ? "उपलब्धता और वैरायटी के लिए हमसे पूछें।" : "Ask us about available varieties and pack sizes."}</p>
          </div>
          <Link href="/products?category=snacks" className="inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-full bg-[#efbd62] px-4 text-[10px] font-black text-[#4e1b1e] transition hover:bg-[#ffcf7b]">
            {isHindi ? "स्नैक्स देखें" : "Shop snacks"} <ArrowUpRight size={13} />
          </Link>
        </div>
        <p className="mt-3 text-[8px] leading-relaxed text-[#f4dfc2]/45">Bikano is a brand of Bikanervala. Product range and availability may vary by store.</p>
      </div>
    </section>
  );
}
