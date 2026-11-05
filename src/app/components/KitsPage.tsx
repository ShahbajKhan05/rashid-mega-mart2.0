"use client";

import Link from "next/link";
import { ArrowRight, BadgePercent, Check, ShieldCheck, ShoppingBasket, Sparkles, Truck } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import { useCart } from "./CartProvider";

const kits = [
  {
    id: "smart-bachat",
    badge: "SMART BACHAT KIT",
    title: "Daily Essentials",
    titleHi: "डेली एसेंशियल्स",
    price: 499,
    description: "Everyday kitchen basics for a value-first monthly start.",
    descriptionHi: "रोज़मर्रा की रसोई के ज़रूरी सामान, बजट में।",
    items: ["Atta / आटा", "Rice / चावल", "Dal / दाल", "Cooking oil / तेल", "Salt & spices / नमक-मसाले"],
    featured: true,
  },
  {
    id: "family-saver",
    badge: "FAMILY SAVER KIT",
    title: "Family Saver",
    titleHi: "फैमिली सेवर",
    price: 999,
    description: "A little more coverage for a busy family kitchen.",
    descriptionHi: "परिवार की रसोई के लिए और भी ज़रूरी सामान।",
    items: ["Atta & rice / आटा-चावल", "2 types of dal / 2 तरह की दाल", "Cooking oil / तेल", "Sugar & tea / चीनी-चाय", "Spices & basics / मसाले"],
    featured: false,
  },
  {
    id: "monthly-complete",
    badge: "MONTHLY COMPLETE",
    title: "Monthly Complete",
    titleHi: "मंथली कम्प्लीट",
    price: 1499,
    description: "A fuller monthly grocery selection for the home.",
    descriptionHi: "घर के महीने भर के लिए बड़ा किराना कॉम्बो।",
    items: ["Atta, rice & pulses / आटा-चावल-दाल", "Oil & ghee / तेल-घी", "Tea, sugar & salt / चाय-चीनी-नमक", "Spices & snacks / मसाले-स्नैक्स", "Daily kitchen essentials / रोज़मर्रा की चीज़ें"],
    featured: false,
  },
];

const benefits = [
  { title: "Free Delivery", subtitle: "No delivery charges", icon: Truck },
  { title: "100% Quality", subtitle: "Best brands guaranteed", icon: ShieldCheck },
  { title: "Best Prices", subtitle: "Lower than market rates", icon: BadgePercent },
];

export default function KitsPage() {
  const { language } = useLanguage();
  const { addCustomRequest } = useCart();
  const isHindi = language === "hi";

  const requestKit = (kit: typeof kits[number]) => {
    addCustomRequest({
      name: `Rashid Mega Mart · ${kit.title} Kit (₹${kit.price})`,
      quantity: 1,
      note: `Kit request: ${kit.items.join(", ")}. Advertised starting price ₹${kit.price}; confirm final contents, availability and price with customer before accepting.`,
    });
    window.location.assign("/cart");
  };

  return (
    <section id="ration-kits" className="bg-[#FFFCF0] px-3 py-8 text-[#30251f] sm:px-6 sm:py-12">
      <div className="mx-auto max-w-[1540px]">
        <section className="overflow-hidden rounded-[28px] bg-[#fffefd] px-5 py-8 shadow-[0_22px_70px_rgba(71,49,27,.055)] sm:rounded-[38px] sm:px-10 sm:py-10 lg:px-[3.25rem] lg:py-[3.75rem]">
          <div className="grid items-center gap-8 lg:grid-cols-[1.02fr_.98fr] lg:gap-10">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-3 rounded-full border border-[#efd48d] bg-[#fff8dc] px-4 py-2 text-[11px] font-black tracking-[.16em] text-[#a87925] shadow-[0_3px_7px_rgba(102,76,26,.12)] sm:px-6 sm:py-3 sm:text-[15px]">
                <Sparkles size={19} className="shrink-0 text-[#d5a33e]" />
                SMART BACHAT KIT
              </div>
              <h1 className="mt-7 max-w-[780px] text-[clamp(2.45rem,5.4vw,4.55rem)] font-black leading-[1.08] tracking-[-.065em] text-[#30251f]">
                {isHindi ? <>पूरे महीने का राशन,<br/><span className="text-[#8b002b]">सिर्फ़ ₹499 से शुरू।</span></> : <>Full month ration,<br/><span className="text-[#8b002b]">starting at just ₹499.</span></>}
              </h1>
              <p className="mt-5 max-w-[690px] text-base leading-[1.65] text-[#76665b] sm:text-xl sm:leading-[1.7]">
                {isHindi ? "राशिद मेगा मार्ट से ताज़ा किराना और बजट-फ्रेंडली बचत किट ऑर्डर करें।" : "Order fresh groceries and budget-friendly kits from Rashid Mega Mart."}
              </p>
              <Link href="#available-kits" className="mt-8 inline-flex h-14 items-center gap-4 rounded-[18px] bg-[#8b002b] px-7 text-base font-extrabold text-white shadow-[0_12px_24px_rgba(139,0,43,.15)] transition duration-300 hover:-translate-y-1 hover:bg-[#710022] active:translate-y-0 sm:mt-10 sm:h-[88px] sm:rounded-[22px] sm:px-11 sm:text-[21px]">
                <ShoppingBasket size={27}/>
                {isHindi ? "किट देखें" : "Order Kits"}
                <ArrowRight size={24}/>
              </Link>
            </div>

            <div className="grid gap-5 border-t border-[#eee4dc] pt-7 sm:grid-cols-3 lg:grid-cols-1 lg:gap-7 lg:border-l lg:border-t-0 lg:py-6 lg:pl-11 lg:pt-6">
              {benefits.map(({title,subtitle,icon:Icon}) => (
                <div key={title} className="flex items-center gap-4 sm:items-start lg:gap-5">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-[19px] bg-[#e8f1e9] text-[#078447] sm:h-[74px] sm:w-[74px] sm:rounded-[22px]"><Icon size={29} strokeWidth={2.2}/></span>
                  <span className="min-w-0 pt-0.5"><strong className="block text-[15px] font-extrabold tracking-[-.025em] sm:text-[18px] lg:text-[21px]">{isHindi ? (title === "Free Delivery" ? "मुफ़्त डिलीवरी" : title === "100% Quality" ? "100% क्वालिटी" : "सबसे अच्छी कीमत") : title}</strong><span className="mt-0.5 block text-xs text-[#827368] sm:text-sm lg:text-base">{isHindi ? (title === "Free Delivery" ? "कोई डिलीवरी चार्ज नहीं" : title === "100% Quality" ? "बेहतरीन ब्रांड की गारंटी" : "बाज़ार से बेहतर दाम") : subtitle}</span></span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="available-kits" className="scroll-mt-28 pt-12 sm:pt-16">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3 sm:mb-8">
            <div><p className="text-[10px] font-black tracking-[.2em] text-[#aa7c32]">RASHID VALUE KITS</p><h2 className="mt-1 text-3xl font-black tracking-[-.06em] text-[#800020] sm:text-4xl">{isHindi ? "अपनी बचत किट चुनें" : "Choose your savings kit"}</h2><p className="mt-2 text-sm text-[#76665b]">{isHindi ? "हर किट में रोज़मर्रा की ज़रूरतों का आसान कॉम्बो।" : "Thoughtful grocery combos for everyday needs."}</p></div>
            <Link href="/products" className="inline-flex items-center gap-1 text-xs font-extrabold text-[#800020] hover:gap-2">{isHindi ? "सभी सामान" : "Shop all groceries"} <ArrowRight size={14}/></Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {kits.map((kit) => (
              <article key={kit.id} className={`group relative flex h-full flex-col overflow-hidden rounded-[24px] border bg-[#fffefd] p-5 shadow-[0_12px_34px_rgba(71,49,27,.045)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(71,49,27,.09)] sm:rounded-[28px] sm:p-7 ${kit.featured ? "border-[#dfc17f]" : "border-[#eee4d8]"}`}>
                <div className="flex items-center justify-between gap-2"><span className="inline-flex items-center gap-2 rounded-full border border-[#efd48d] bg-[#fff8dc] px-3 py-1.5 text-[9px] font-black tracking-[.13em] text-[#a87925]"><Sparkles size={13}/>{kit.badge}</span>{kit.featured && <span className="rounded-full bg-[#8b002b] px-2.5 py-1 text-[9px] font-black text-white">POPULAR</span>}</div>
                <h3 className="mt-5 text-[25px] font-black tracking-[-.055em] text-[#30251f]">{isHindi ? kit.titleHi : kit.title}</h3>
                <p className="mt-1 min-h-10 text-xs leading-5 text-[#827368]">{isHindi ? kit.descriptionHi : kit.description}</p>
                <div className="mt-5 rounded-[18px] bg-[#faf7ef] p-4">
                  <p className="mb-3 text-[9px] font-black tracking-[.16em] text-[#a87925]">{isHindi ? "किट में शामिल" : "WHAT'S INCLUDED"}</p>
                  <ul className="space-y-2.5">{kit.items.map((item) => <li key={item} className="flex items-start gap-2 text-xs font-semibold text-[#51443b]"><Check size={15} className="mt-0.5 shrink-0 text-[#13834a]"/>{item}</li>)}</ul>
                </div>
                <div className="mt-6 flex items-end justify-between gap-3 border-t border-[#eee4dc] pt-5"><div><p className="text-[10px] font-semibold text-[#8b7b70]">{isHindi ? "शुरुआती कीमत" : "Starting at"}</p><p className="mt-0.5 text-3xl font-black tracking-[-.06em] text-[#8b002b]">₹{kit.price.toLocaleString("en-IN")}</p></div><button type="button" onClick={() => requestKit(kit)} className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#8b002b] px-4 text-xs font-extrabold text-white transition hover:bg-[#710022] active:scale-[.98]">{isHindi ? "किट चुनें" : "Choose kit"} <ArrowRight size={15}/></button></div>
                <p className="mt-3 text-[10px] leading-4 text-[#95877c]">{isHindi ? "अंतिम सामान, उपलब्धता और कीमत स्टोर कन्फर्म करेगा।" : "Final contents, availability and price are confirmed by the store."}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
