"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, ClipboardList, PackageCheck, Truck, House, ShoppingBag } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { number: "01", title: "ORDER PLACED", hindi: "ऑर्डर मिल गया", detail: "Choose your everyday favourites", detailHi: "अपनी पसंद का सामान चुनें", icon: ClipboardList, tone: "bg-[#fff0d7]" },
  { number: "02", title: "PACKED AT STORE", hindi: "स्टोर पर पैकिंग", detail: "We carefully pack your picks", detailHi: "हम आपका सामान ध्यान से पैक करते हैं", icon: PackageCheck, tone: "bg-[#f8e8e8]" },
  { number: "03", title: "ON THE WAY", hindi: "डिलीवरी रास्ते में", detail: "Your order heads your way", detailHi: "आपका ऑर्डर आपके घर की ओर निकलता है", icon: Truck, tone: "bg-[#eee8f5]" },
  { number: "04", title: "DELIVERED HOME", hindi: "घर पर डिलीवरी", detail: "Unpack your favourites at home", detailHi: "घर पर अपना पसंदीदा सामान पाएँ", icon: House, tone: "bg-[#e6f2e8]" },
];

export default function NetworkSection({ language = "en" }: { language?: "en" | "hi" }) {
  const sectionRef = useRef<HTMLElement>(null);
  const isHindi = language === "hi";

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const intro = gsap.utils.toArray<HTMLElement>("[data-journey-intro]");
      gsap.fromTo(intro, { autoAlpha: 0, y: 18 }, {
        autoAlpha: 1, y: 0, duration: 0.75, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 82%", once: true },
      });
      const cards = gsap.utils.toArray<HTMLElement>("[data-journey-step]");
      gsap.fromTo(cards, { autoAlpha: 0, y: 30, scale: 0.95, rotateX: 5 }, {
        autoAlpha: 1, y: 0, scale: 1, rotateX: 0, duration: 0.78, stagger: 0.16,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 78%", once: true },
      });
      gsap.to("[data-journey-dot] svg", {
        y: -3, duration: 1.35, repeat: -1, yoyo: true, stagger: 0.18,
        ease: "sine.inOut", delay: 1.1,
      });
      gsap.fromTo("[data-journey-line]", { scaleX: 0 }, {
        scaleX: 1, duration: 1.5, ease: "power2.inOut",
        scrollTrigger: { trigger: section, start: "top 72%", once: true },
      });
      gsap.fromTo("[data-journey-mobile-line]", { scaleY: 0 }, {
        scaleY: 1, duration: 1.5, ease: "power2.inOut",
        scrollTrigger: { trigger: section, start: "top 72%", once: true },
      });
      gsap.fromTo("[data-journey-dot]", { scale: 0.6, autoAlpha: 0.5 }, {
        scale: 1, autoAlpha: 1, duration: 0.55, stagger: 0.22, delay: 0.25,
        ease: "back.out(1.8)",
        scrollTrigger: { trigger: section, start: "top 72%", once: true },
      });
      gsap.to("[data-journey-traveller]", {
        x: 12, duration: 0.8, repeat: -1, yoyo: true, ease: "sine.inOut",
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} aria-labelledby="journey-title" className="overflow-hidden bg-[#fff7f4] px-3 py-7 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-[1120px]">
        <div data-journey-intro className="mb-7 text-center sm:mb-10">
          <p className="text-[9px] font-black uppercase tracking-[.22em] text-[#b77a37]">{isHindi ? "हर ऑर्डर में थोड़ी extra care" : "A LITTLE CARE IN EVERY STEP"}</p>
          <h2 id="journey-title" className="mt-1 text-[clamp(1.35rem,4.5vw,2.5rem)] font-black leading-tight tracking-[-.055em] text-[#800020]">
            {isHindi ? "स्टोर से आपके दरवाज़े तक" : "From our shelves to your doorstep"}
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-[11px] leading-relaxed text-[#827267] sm:text-sm">
            {isHindi ? "आपकी पसंद की चीज़ें चुनने से लेकर घर पहुँचाने तक, हर कदम पर हम ध्यान रखते हैं।" : "From picking your favourites to bringing them home, we make every step feel simple."}
          </p>
        </div>

        <div className="relative hidden grid-cols-4 gap-4 md:grid">
          <div aria-hidden="true" className="absolute left-[12.5%] right-[12.5%] top-[39px] h-[3px] rounded-full bg-[#ead9c9]" />
          <div data-journey-line aria-hidden="true" className="absolute left-[12.5%] right-[12.5%] top-[39px] h-[3px] origin-left rounded-full bg-gradient-to-r from-[#d7a64d] via-[#9a3650] to-[#26824e]" />
          {steps.map(({ number, title, detail, icon: Icon, tone }, index) => (
            <article data-journey-step key={number} className="relative z-10 flex flex-col items-center text-center">
              <span data-journey-dot className={"grid h-[78px] w-[78px] place-items-center rounded-[25px] border-[5px] border-[#fff7f4] " + tone + " text-[#800020] shadow-[0_8px_24px_rgba(83,45,36,.10)]"}>
                <Icon size={29} strokeWidth={1.9} />
              </span>
              <span className="mt-3 text-[9px] font-black tracking-[.18em] text-[#b18a55]">STEP {number}</span>
              <h3 className="mt-1 text-[12px] font-black tracking-[.025em] text-[#49342e]">{isHindi ? steps[index].hindi : title}</h3>
              <p className="mt-1 max-w-[190px] text-[10px] leading-relaxed text-[#827267]">{isHindi ? steps[index].detailHi : detail}</p>
            </article>
          ))}
          <span data-journey-traveller aria-hidden="true" className="absolute right-[11%] top-[29px] z-20 grid h-6 w-6 place-items-center rounded-full bg-[#800020] text-white shadow-lg"><Truck size={13}/></span>
        </div>

        <div className="relative ml-3 flex flex-col gap-4 md:hidden">
          <div aria-hidden="true" className="absolute bottom-8 left-[23px] top-8 w-[3px] rounded-full bg-[#ead9c9]" />
          <div data-journey-mobile-line aria-hidden="true" className="absolute left-[23px] top-8 h-[calc(100%-64px)] w-[3px] origin-top rounded-full bg-gradient-to-b from-[#d7a64d] via-[#9a3650] to-[#26824e]" />
          {steps.map(({ number, title, detail, icon: Icon, tone }, index) => (
            <article data-journey-step key={number} className="relative z-10 flex min-h-[76px] items-center gap-3">
              <span data-journey-dot className={"grid h-[48px] w-[48px] shrink-0 place-items-center rounded-[16px] border-[3px] border-[#fff7f4] " + tone + " text-[#800020] shadow-[0_5px_15px_rgba(83,45,36,.10)]"}>
                <Icon size={20} strokeWidth={2} />
              </span>
              <div className="min-w-0 flex-1 rounded-2xl border border-white/90 bg-white/85 px-3 py-2.5 shadow-[0_4px_16px_rgba(83,45,36,.045)]">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[8px] font-black tracking-[.16em] text-[#b18a55]">STEP {number}</span>
                  <Check size={12} className="text-[#26824e]" />
                </div>
                <h3 className="mt-0.5 text-[11px] font-black text-[#49342e]">{isHindi ? steps[index].hindi : title}</h3>
                <p className="mt-0.5 text-[9px] leading-snug text-[#827267]">{isHindi ? steps[index].detailHi : detail}</p>
              </div>
            </article>
          ))}
        </div>

        <div data-journey-intro className="mt-6 flex items-center justify-center gap-2 rounded-2xl border border-[#efdfd1] bg-white/75 px-3 py-3 text-center sm:mt-8">
          <ShoppingBag size={16} className="shrink-0 text-[#800020]" />
          <p className="text-[10px] font-bold text-[#6e5549] sm:text-xs">{isHindi ? "बस अपनी पसंद चुनें — बाकी सफर हम आसान बनाएँगे।" : "You pick what you love. We make getting it home easy."}</p>
        </div>
      </div>
    </section>
  );
}
