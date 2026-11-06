"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Apple, Building2, House, Package, ShoppingBasket, Store, Truck } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const suppliers = [
  { label: "LOCAL FARMERS", icon: Apple, tone: "bg-[#f8e8d8]" },
  { label: "BRAND PARTNERS", icon: Package, tone: "bg-[#f4e5e9]" },
  { label: "WHOLESALE HUBS", icon: Truck, tone: "bg-[#eee8f5]" },
];

const customers = [
  { label: "FAMILIES", icon: House, tone: "bg-[#f8e8d8]" },
  { label: "LOCAL SHOPS", icon: Store, tone: "bg-[#f4e5e9]" },
  { label: "BUSINESSES", icon: Building2, tone: "bg-[#eee8f5]" },
];

export default function NetworkSection({ language = "en" }: { language?: "en" | "hi" }) {
  const sectionRef = useRef<HTMLElement>(null);
  const isHindi = language === "hi";

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const paths = gsap.utils.toArray<SVGPathElement>("[data-network-path]");
      paths.forEach((path, index) => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1.35,
          delay: index * 0.12,
          ease: "power2.inOut",
          scrollTrigger: { trigger: section, start: "top 78%", once: true },
        });
      });
      gsap.fromTo("[data-network-node]", { autoAlpha: 0, scale: 0.82, y: 10 }, {
        autoAlpha: 1, scale: 1, y: 0, duration: 0.55, stagger: 0.09,
        ease: "back.out(1.5)",
        scrollTrigger: { trigger: section, start: "top 76%", once: true },
      });
      gsap.fromTo("[data-network-center]", { autoAlpha: 0, scale: 0.88, y: 12 }, {
        autoAlpha: 1, scale: 1, y: 0, duration: 0.75, delay: 0.25,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 76%", once: true },
      });
      const mobileNodes = gsap.utils.toArray<HTMLElement>("[data-network-mobile-node]");
      mobileNodes.forEach((node, index) => {
        gsap.fromTo(node, { autoAlpha: 0, y: 18, scale: 0.92 }, {
          autoAlpha: 1, y: 0, scale: 1, duration: 0.62, delay: index * 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: { trigger: section, start: "top 78%", once: true },
        });
      });
      gsap.to("[data-network-pulse]", {
        scale: 1.16, opacity: 0.55, duration: 1.15, repeat: -1, yoyo: true,
        ease: "sine.inOut", transformOrigin: "center center",
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} aria-labelledby="network-title" className="overflow-hidden bg-[#fff7f4] px-3 py-5 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-4 text-center sm:mb-9">
          <p className="text-[9px] font-black uppercase tracking-[.22em] text-[#b77a37]">FROM EVERYDAY SOURCES TO EVERYDAY HOMES</p>
          <h2 id="network-title" className="mt-1 text-[clamp(1.2rem,4.5vw,2.45rem)] font-black leading-tight tracking-[-.055em] text-[#800020]">
            {isHindi ? "एक मज़बूत लोकल नेटवर्क" : "Building a stronger local network"}
          </h2>
          <p className="mt-1 text-[10px] text-[#827267] sm:text-xs">
            {isHindi ? "स्थानीय सप्लायर्स से आपके घर और कारोबार तक" : "Connecting trusted suppliers with homes and businesses"}
          </p>
        </div>

        <div className="relative hidden min-h-[270px] items-center justify-between gap-5 md:flex">
          <svg aria-hidden="true" viewBox="0 0 1000 300" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
            <g fill="none" strokeLinecap="round" strokeWidth="3">
              <path data-network-path d="M145 55 C270 55 300 150 420 150" stroke="#e8b7ad" strokeDasharray="8 10"/>
              <path data-network-path d="M145 150 C260 150 310 150 420 150" stroke="#d9a46a" strokeDasharray="8 10"/>
              <path data-network-path d="M145 245 C270 245 300 150 420 150" stroke="#cbb9d9" strokeDasharray="8 10"/>
              <path data-network-path d="M580 150 C700 150 730 55 855 55" stroke="#e8b7ad" strokeDasharray="8 10"/>
              <path data-network-path d="M580 150 C690 150 745 150 855 150" stroke="#d9a46a" strokeDasharray="8 10"/>
              <path data-network-path d="M580 150 C700 150 730 245 855 245" stroke="#cbb9d9" strokeDasharray="8 10"/>
            </g>
          </svg>
          <div className="z-10 flex w-[25%] flex-col gap-4">
            {suppliers.map(({ label, icon: Icon, tone }) => (
              <div data-network-node key={label} className="flex items-center gap-3 rounded-full border border-white/90 bg-white/85 p-2.5 shadow-[0_5px_20px_rgba(89,53,42,.06)]">
                <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-full ${tone} text-[#800020]`}><Icon size={20}/></span>
                <span className="text-[10px] font-black tracking-[.08em] text-[#49342e]">{label}</span>
              </div>
            ))}
          </div>
          <div data-network-center className="z-10 flex w-[34%] flex-col items-center rounded-[26px] border border-[#f0d8d2] bg-white/95 px-8 py-7 shadow-[0_12px_38px_rgba(128,0,32,.09)]">
            <Image src="/Logo.png" alt="Rashid Mega Mart" width={220} height={86} className="h-[62px] w-auto max-w-full object-contain"/>
            <span className="mt-2 text-[9px] font-extrabold uppercase tracking-[.2em] text-[#a47a2c]">YOUR EVERYDAY STORE</span>
          </div>
          <div className="z-10 flex w-[25%] flex-col gap-4">
            {customers.map(({ label, icon: Icon, tone }) => (
              <div data-network-node key={label} className="flex items-center gap-3 rounded-full border border-white/90 bg-white/85 p-2.5 shadow-[0_5px_20px_rgba(89,53,42,.06)]">
                <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-full ${tone} text-[#800020]`}><Icon size={20}/></span>
                <span className="text-[10px] font-black tracking-[.08em] text-[#49342e]">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative grid grid-cols-[1fr_28px_1fr] items-center gap-1.5 md:hidden">
          <div className="flex flex-col gap-2.5">
            {suppliers.map(({ label, icon: Icon, tone }) => (
              <div data-network-node data-network-mobile-node key={label} className="flex min-h-[48px] items-center gap-2 rounded-xl border border-white bg-white/90 p-2 shadow-sm">
                <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg ${tone} text-[#800020]`}><Icon size={15}/></span>
                <span className="text-[8px] font-black leading-tight tracking-[.02em] text-[#49342e]">{label}</span>
              </div>
            ))}
          </div>
          <div className="relative flex h-full min-h-[190px] items-center justify-center">
            <svg aria-hidden="true" viewBox="0 0 28 190" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
              <path data-network-path d="M0 28 C18 28 10 95 28 95 M0 95 H28 M0 162 C18 162 10 95 28 95" fill="none" stroke="#d9a46a" strokeWidth="1.7" strokeDasharray="4 4"/>
            </svg>
            <span data-network-pulse className="z-10 grid h-8 w-8 place-items-center rounded-full bg-[#800020] text-white shadow-[0_0_0_5px_rgba(128,0,32,.08),0_5px_16px_rgba(128,0,32,.2)]"><ShoppingBasket size={15}/></span>
          </div>
          <div className="flex flex-col gap-2.5">
            {customers.map(({ label, icon: Icon, tone }) => (
              <div data-network-node key={label} className="flex min-h-[58px] items-center gap-2 rounded-xl border border-white bg-white/90 p-2 shadow-sm">
                <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${tone} text-[#800020]`}><Icon size={15}/></span>
                <span className="text-[8px] font-black leading-tight tracking-[.02em] text-[#49342e]">{label}</span>
              </div>
            ))}
          </div>
          <div data-network-center data-network-mobile-node className="col-span-3 mt-2 flex items-center justify-center rounded-xl border border-[#f0d8d2] bg-white px-4 py-3 shadow-[0_8px_24px_rgba(128,0,32,.08)]">
            <Image src="/Logo.png" alt="Rashid Mega Mart" width={180} height={70} className="h-10 w-auto max-w-full object-contain"/>
            <span className="ml-3 text-[8px] font-extrabold uppercase tracking-[.13em] text-[#a47a2c]">YOUR EVERYDAY STORE</span>
          </div>
        </div>
      </div>
    </section>
  );
}
