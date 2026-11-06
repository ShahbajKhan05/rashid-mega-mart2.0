"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BadgeCheck, Headphones, MessageCircle, PackageCheck, Phone, ShieldCheck, ShoppingBag } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WHATSAPP = "919131383323";
const waLink = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hi Rashid Mega Mart, I need help with an order.")}`;

export default function RmmContactExperience() {
  const { language } = useLanguage();
  const hi = language === "hi";
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = root.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo("[data-contact-hero]", { y: 24, autoAlpha: 0 }, {
        y: 0, autoAlpha: 1, duration: .75, stagger: .1, ease: "power3.out",
      });
      gsap.fromTo("[data-contact-card]", { y: 24, autoAlpha: 0, scale: .97 }, {
        y: 0, autoAlpha: 1, scale: 1, duration: .65, stagger: .12, ease: "power3.out",
        scrollTrigger: { trigger: "[data-contact-grid]", start: "top 82%", once: true },
      });
      gsap.fromTo("[data-contact-step]", { x: -14, autoAlpha: 0 }, {
        x: 0, autoAlpha: 1, duration: .5, stagger: .1, ease: "power2.out",
        scrollTrigger: { trigger: "[data-contact-steps]", start: "top 86%", once: true },
      });
      gsap.to("[data-contact-orb]", { y: -18, x: 10, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut" });
    }, element);
    return () => ctx.revert();
  }, []);

  const t = hi ? {
    eyebrow: "RASHID MEGA MART · CUSTOMER CARE",
    title: "हम आपकी मदद के लिए यहीं हैं।",
    subtitle: "ऑर्डर करना हो, किसी सामान की जानकारी चाहिए या मदद चाहिए—हमसे सीधे बात करें।",
    whatsapp: "WhatsApp पर बात करें",
    call: "अभी कॉल करें",
    direct: "सीधा संपर्क",
    response: "ऑर्डर और सामान की जानकारी के लिए",
    responseSub: "WhatsApp पर अपना सवाल भेजें। हमारी टीम उपलब्धता और आगे की जानकारी बताएगी।",
    available: "WhatsApp चैट शुरू करें",
    phoneLabel: "फोन नंबर",
    stepsTitle: "हमसे संपर्क करना इतना आसान है",
    stepsSub: "बस ये 3 छोटे स्टेप्स फॉलो करें।",
    step1: "हमें अपना सवाल भेजें",
    step1d: "ऑर्डर, सामान या डिलीवरी के बारे में बताएं।",
    step2: "ज़रूरी जानकारी साझा करें",
    step2d: "सामान का नाम और मात्रा बताएं।",
    step3: "स्टोर से पुष्टि लें",
    step3d: "उपलब्धता, अंतिम कीमत और डिलीवरी की पुष्टि करें।",
    note: "आपकी सुरक्षा ज़रूरी है",
    noteBody: "कभी भी OTP, UPI PIN, कार्ड CVV या पासवर्ड साझा न करें।",
    faq: "ऑर्डर भेजने के बाद क्या वह पक्का हो जाता है?",
    faqBody: "नहीं। WhatsApp पर भेजा गया संदेश ऑर्डर अनुरोध है। स्टोर से उपलब्धता, कुल कीमत और डिलीवरी की पुष्टि मिलने के बाद ही ऑर्डर पक्का समझें।",
    home: "खरीदारी जारी रखें",
  } : {
    eyebrow: "RASHID MEGA MART · CUSTOMER CARE",
    title: "We're right here when you need us.",
    subtitle: "Need help placing an order, checking an item or figuring out delivery? Talk to our store team directly.",
    whatsapp: "Chat on WhatsApp",
    call: "Call the store",
    direct: "GET IN TOUCH",
    response: "A real conversation. A clearer answer.",
    responseSub: "Send us your question on WhatsApp. Our team can help you check product availability and the next steps.",
    available: "Start a WhatsApp chat",
    phoneLabel: "CALL US DIRECTLY",
    stepsTitle: "Getting help is as easy as 1–2–3",
    stepsSub: "A simple way to get your grocery questions answered.",
    step1: "Send us your question",
    step1d: "Tell us what you need or which order you’re asking about.",
    step2: "Share the useful details",
    step2d: "Mention product names and quantities, if relevant.",
    step3: "Confirm with the store",
    step3d: "We’ll discuss availability, final price and delivery details.",
    note: "A quick safety reminder",
    noteBody: "Never share your OTP, UPI PIN, card CVV or account password.",
    faq: "Is my order confirmed when I send a WhatsApp message?",
    faqBody: "Not yet. Your message is an order request. Wait for the store to confirm item availability, the final total and delivery details.",
    home: "Continue shopping",
  };

  return (
    <main ref={root} className="relative min-h-screen overflow-hidden bg-[#fff7f4] pb-24 pt-[104px] text-[#382b2b] xl:pb-12">
      <div data-contact-orb className="pointer-events-none absolute -right-24 top-36 h-72 w-72 rounded-full bg-[#d9b777]/20 blur-[90px]" />
      <div className="pointer-events-none absolute -left-28 top-[520px] h-64 w-64 rounded-full bg-[#800020]/[.045] blur-[85px]" />
      <div className="relative mx-auto max-w-[1160px] px-4 sm:px-7">
        <div className="mb-5 flex items-center gap-2 text-[11px] font-bold text-[#947f73]">
          <Link href="/" className="transition hover:text-[#800020]">{hi ? "होम" : "Home"}</Link>
          <span>/</span><span className="text-[#800020]">{hi ? "संपर्क करें" : "Contact"}</span>
        </div>

        <section className="relative overflow-hidden rounded-[30px] border border-white/90 bg-[linear-gradient(125deg,rgba(255,255,255,.88),rgba(250,239,225,.78))] px-5 py-8 shadow-[0_20px_60px_rgba(87,48,32,.07)] backdrop-blur-xl sm:px-10 sm:py-12 lg:px-14">
          <div className="pointer-events-none absolute -right-10 -top-16 h-64 w-64 rounded-full border border-[#c39a56]/20" />
          <div className="pointer-events-none absolute right-8 top-8 h-40 w-40 rounded-full border border-[#c39a56]/15" />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1.15fr_.85fr]">
            <div className="max-w-[680px]">
              <p data-contact-hero className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[.24em] text-[#a77b3e]"><span className="h-px w-7 bg-[#c39a56]" />{t.eyebrow}</p>
              <h1 data-contact-hero className="mt-4 text-[clamp(2.25rem,6vw,4.7rem)] font-black leading-[1.02] tracking-[-.065em] text-[#800020]">{t.title}</h1>
              <p data-contact-hero className="mt-4 max-w-[570px] text-[13px] leading-7 text-[#78685e] sm:text-base sm:leading-8">{t.subtitle}</p>
              <div data-contact-hero className="mt-6 flex flex-col gap-3 min-[420px]:flex-row">
                <a href={waLink} target="_blank" rel="noreferrer" className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#800020] px-6 text-[12px] font-extrabold text-white shadow-[0_10px_24px_rgba(128,0,32,.18)] transition duration-300 hover:-translate-y-1 hover:bg-[#650019] hover:shadow-[0_15px_30px_rgba(128,0,32,.22)]">
                  <MessageCircle size={16}/>{t.whatsapp}<ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"/>
                </a>
                <a href={`tel:+${WHATSAPP}`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#e6d7c8] bg-white/75 px-6 text-[12px] font-extrabold text-[#6b3342] transition duration-300 hover:-translate-y-1 hover:border-[#c39a56] hover:bg-white">
                  <Phone size={15}/>{t.call}
                </a>
              </div>
            </div>
            <div data-contact-hero className="relative mx-auto w-full max-w-[360px]">
              <div className="absolute inset-5 rounded-[34px] bg-[#800020]/[.055] blur-2xl"/>
              <div className="relative overflow-hidden rounded-[28px] border border-white bg-white/75 p-5 shadow-[0_18px_45px_rgba(70,40,35,.09)] backdrop-blur-xl sm:p-6">
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-[#eadcc8] bg-[#fff9ee] px-3 py-1.5 text-[8px] font-black tracking-[.18em] text-[#9a7139]">{t.direct}</span>
                  <span className="flex items-center gap-1.5 text-[9px] font-bold text-[#6e8b70]"><span className="h-1.5 w-1.5 rounded-full bg-[#4e9b68]"/> {hi ? "सीधा संपर्क" : "DIRECT SUPPORT"}</span>
                </div>
                <div className="mt-6 grid h-16 w-16 place-items-center rounded-[22px] bg-[#800020] text-white shadow-[0_12px_24px_rgba(128,0,32,.2)]"><Headphones size={30}/></div>
                <h2 className="mt-5 text-xl font-black tracking-[-.04em] text-[#4b3038]">{t.response}</h2>
                <p className="mt-2 text-xs leading-6 text-[#817269]">{t.responseSub}</p>
                <a href={waLink} target="_blank" rel="noreferrer" className="mt-5 flex min-h-11 items-center justify-between rounded-xl border border-[#e7d9c9] bg-[#fffaf1] px-4 text-[11px] font-extrabold text-[#70283d] transition hover:border-[#c39a56] hover:bg-white">
                  {t.available}<ArrowRight size={15}/>
                </a>
                <div className="mt-4 flex items-center justify-between border-t border-[#eee5dc] pt-4">
                  <div><p className="text-[8px] font-black tracking-[.15em] text-[#a08b7c]">{t.phoneLabel}</p><p className="mt-1 text-sm font-black tracking-wide text-[#4c3039]">+91 91313 83323</p></div>
                  <a href={`tel:+${WHATSAPP}`} aria-label={t.call} className="grid h-10 w-10 place-items-center rounded-full bg-white text-[#800020] shadow-sm ring-1 ring-[#eadcc8] transition hover:scale-105"><Phone size={17}/></a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section data-contact-grid className="mt-7 grid gap-3 sm:grid-cols-2">
          <a data-contact-card href={waLink} target="_blank" rel="noreferrer" className="group flex items-center gap-4 rounded-2xl border border-white/90 bg-white/70 p-4 shadow-[0_8px_25px_rgba(87,48,32,.045)] backdrop-blur-lg transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_16px_32px_rgba(87,48,32,.08)] sm:p-5">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#e8f4e9] text-[#24844c]"><MessageCircle size={23}/></span>
            <span className="min-w-0 flex-1"><strong className="block text-sm font-black text-[#4c3039]">{t.whatsapp}</strong><span className="mt-1 block text-[11px] text-[#89796e]">+91 91313 83323</span></span><ArrowUpRight size={17} className="text-[#a77b3e] transition group-hover:-translate-y-1 group-hover:translate-x-1"/>
          </a>
          <a data-contact-card href={`tel:+${WHATSAPP}`} className="group flex items-center gap-4 rounded-2xl border border-white/90 bg-white/70 p-4 shadow-[0_8px_25px_rgba(87,48,32,.045)] backdrop-blur-lg transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_16px_32px_rgba(87,48,32,.08)] sm:p-5">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#f8edf0] text-[#800020]"><Phone size={22}/></span>
            <span className="min-w-0 flex-1"><strong className="block text-sm font-black text-[#4c3039]">{t.call}</strong><span className="mt-1 block text-[11px] text-[#89796e]">+91 91313 83323</span></span><ArrowUpRight size={17} className="text-[#a77b3e] transition group-hover:-translate-y-1 group-hover:translate-x-1"/>
          </a>
        </section>

        <section data-contact-steps className="mt-12 sm:mt-16">
          <div className="mb-5 text-center"><p className="text-[9px] font-black uppercase tracking-[.22em] text-[#a77b3e]">{hi ? "आसान और सीधा" : "SIMPLE & STRAIGHTFORWARD"}</p><h2 className="mt-2 text-[clamp(1.5rem,3.5vw,2.4rem)] font-black tracking-[-.055em] text-[#800020]">{t.stepsTitle}</h2><p className="mt-2 text-xs text-[#89796e] sm:text-sm">{t.stepsSub}</p></div>
          <div className="grid gap-3 md:grid-cols-3">
            {[
              {n:"01",icon:MessageCircle,title:t.step1,body:t.step1d},
              {n:"02",icon:ShoppingBag,title:t.step2,body:t.step2d},
              {n:"03",icon:BadgeCheck,title:t.step3,body:t.step3d},
            ].map((step)=><article data-contact-step key={step.n} className="relative overflow-hidden rounded-2xl border border-white/90 bg-white/65 p-5 shadow-[0_8px_24px_rgba(87,48,32,.04)] backdrop-blur-lg sm:p-6"><span className="absolute right-4 top-2 text-4xl font-black tracking-[-.08em] text-[#800020]/[.055]">{step.n}</span><span className="grid h-11 w-11 place-items-center rounded-xl bg-[#fff2e4] text-[#800020]"><step.icon size={20}/></span><h3 className="mt-4 text-sm font-black text-[#4c3039]">{step.title}</h3><p className="mt-2 text-[11px] leading-6 text-[#83736a]">{step.body}</p></article>)}
          </div>
        </section>

        <section className="mt-8 grid gap-3 lg:grid-cols-[.9fr_1.1fr]">
          <div className="flex gap-3 rounded-2xl border border-[#eadcc8] bg-[#fff9ee]/85 p-5"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-[#a77b3e]"><ShieldCheck size={20}/></span><div><h3 className="text-xs font-black text-[#5a3540]">{t.note}</h3><p className="mt-1 text-[11px] leading-6 text-[#827267]">{t.noteBody}</p></div></div>
          <div className="rounded-2xl border border-white/90 bg-white/65 p-5 shadow-[0_8px_24px_rgba(87,48,32,.04)]"><div className="flex items-start gap-3"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#f8edf0] text-[#800020]"><PackageCheck size={18}/></span><div><h3 className="text-xs font-black text-[#5a3540]">{t.faq}</h3><p className="mt-1 text-[11px] leading-6 text-[#827267]">{t.faqBody}</p></div></div></div>
        </section>

        <div className="mt-9 flex flex-col items-center justify-between gap-3 rounded-2xl border border-[#eadcc8] bg-white/55 p-5 text-center sm:flex-row sm:text-left"><p className="text-xs font-bold text-[#6f5a55]">{hi ? "अब अपनी पसंद का सामान देखें।" : "Ready to find your everyday essentials?"}</p><Link href="/" className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[#800020] px-5 text-[11px] font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[#650019]">{t.home}<ArrowRight size={14}/></Link></div>
      </div>
    </main>
  );
}
