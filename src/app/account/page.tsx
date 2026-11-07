"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight, ClipboardList, Heart, MapPin, PackageCheck,
  ShieldCheck, Sparkles, Ticket, UserRound, ShoppingBag
} from "lucide-react";
import { useLanguage } from "../components/LanguageProvider";
import { useWishlist } from "../components/WishlistProvider";

const quickLinks = [
  {
    href: "/my-orders",
    title: "My Orders",
    hindi: "मेरे ऑर्डर",
    description: "See your order history",
    descriptionHi: "अपने ऑर्डर देखें",
    Icon: ClipboardList,
    tone: "burgundy",
  },
  {
    href: "/order-tracking",
    title: "Track an Order",
    hindi: "ऑर्डर ट्रैक करें",
    description: "Check delivery progress with your order ID",
    descriptionHi: "ऑर्डर आईडी से डिलीवरी की स्थिति देखें",
    Icon: PackageCheck,
    tone: "green",
  },
  {
    href: "/wishlist",
    title: "My Wishlist",
    hindi: "मेरी विशलिस्ट",
    description: "Your saved products and kits",
    descriptionHi: "आपके पसंदीदा प्रोडक्ट और किट्स",
    Icon: Heart,
    tone: "rose",
  },
  {
    href: "/rewards",
    title: "Rewards & Offers",
    hindi: "रिवॉर्ड्स और ऑफर",
    description: "Explore points, coupons and savings",
    descriptionHi: "पॉइंट्स, कूपन और बचत देखें",
    Icon: Ticket,
    tone: "gold",
  },
] as const;

export default function AccountPage() {
  const { language } = useLanguage();
  const { wishlistCount } = useWishlist();
  const hi = language === "hi";

  return (
    <main className="min-h-[calc(100svh-76px)] overflow-hidden bg-[#fff8f3] px-3 pb-28 pt-5 text-[#382a2b] sm:px-5 sm:pt-8">
      <div className="mx-auto w-full max-w-2xl">
        <div className="mb-4 flex items-center justify-between">
          <Link href="/" className="text-[11px] font-extrabold text-[#800020] transition hover:opacity-70">
            {hi ? "← स्टोर पर वापस" : "← Back to store"}
          </Link>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e9ddca] bg-white/80 px-3 py-1.5 text-[9px] font-black uppercase tracking-[.13em] text-[#8a704d]">
            <ShieldCheck size={12} /> {hi ? "गेस्ट मोड" : "Guest mode"}
          </span>
        </div>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="relative isolate overflow-hidden rounded-[25px] border border-[#eadbce] bg-[linear-gradient(120deg,#fff_0%,#fff9f0_62%,#f8eee8_100%)] p-5 shadow-[0_12px_35px_rgba(75,38,42,.07)] sm:p-7"
        >
          <div aria-hidden="true" className="pointer-events-none absolute -right-12 -top-16 -z-10 h-48 w-48 rounded-full border-[26px] border-[#800020]/[.035]" />
          <div className="flex items-start gap-3.5">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#800020] text-white shadow-[0_8px_18px_rgba(128,0,32,.2)]">
              <UserRound size={23} strokeWidth={1.8} />
            </div>
            <div className="min-w-0 flex-1 pt-0.5">
              <p className="text-[9px] font-black uppercase tracking-[.2em] text-[#a77b3e]">RASHID MEGA MART</p>
              <h1 className="mt-1 text-[25px] font-black leading-[1.05] tracking-[-.055em] text-[#74152d] sm:text-[31px]">
                {hi ? "आपका अकाउंट" : "My Account"}
              </h1>
              <p className="mt-1.5 text-[11px] leading-5 text-[#786b66] sm:text-xs">
                {hi ? "आपकी शॉपिंग की सभी ज़रूरी चीज़ें, एक ही जगह।" : "Everything you need for a smoother shopping experience."}
              </p>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between gap-3 rounded-xl border border-[#e9dfd4] bg-white/75 px-3.5 py-3">
            <div className="flex min-w-0 items-center gap-2.5">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#f6eee5] text-[#987343]"><Sparkles size={15} /></span>
              <div className="min-w-0">
                <p className="text-[11px] font-extrabold text-[#4a3639]">{hi ? "आप गेस्ट के रूप में ब्राउज़ कर रहे हैं" : "You're browsing as a guest"}</p>
                <p className="mt-0.5 text-[9px] leading-4 text-[#8a7c75]">{hi ? "लॉगिन या OTP की ज़रूरत नहीं है।" : "No login, password or OTP required."}</p>
              </div>
            </div>
            <span className="shrink-0 rounded-full bg-[#eaf5ed] px-2.5 py-1 text-[8px] font-black uppercase tracking-[.1em] text-[#237247]">{hi ? "सक्रिय" : "Active"}</span>
          </div>
        </motion.section>

        <section className="mt-5">
          <div className="mb-3 flex items-end justify-between gap-3 px-0.5">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[.18em] text-[#a77b3e]">{hi ? "आपकी शॉपिंग" : "YOUR SHOPPING"}</p>
              <h2 className="mt-1 text-[17px] font-black tracking-[-.035em] text-[#4b3039]">{hi ? "क्विक एक्सेस" : "Quick access"}</h2>
            </div>
            <span className="text-[9px] font-bold text-[#94847b]">{hi ? "4 सेवाएँ" : "4 shortcuts"}</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
            {quickLinks.map(({ href, title, hindi, description, descriptionHi, Icon, tone }, index) => {
              const colors = {
                burgundy: "bg-[#f8e9ed] text-[#800020]",
                green: "bg-[#eaf4ed] text-[#26734a]",
                rose: "bg-[#f8e9ed] text-[#a33c58]",
                gold: "bg-[#f8f0df] text-[#9a7135]",
              }[tone];
              return (
                <motion.div key={href} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 * index, duration: 0.35 }}>
                  <Link href={href} className="group relative flex min-h-[142px] flex-col overflow-hidden rounded-[18px] border border-[#eadfd5] bg-white p-3.5 shadow-[0_5px_18px_rgba(70,42,38,.045)] transition duration-200 hover:-translate-y-0.5 hover:border-[#d8c2b8] hover:shadow-[0_10px_24px_rgba(70,42,38,.09)] active:scale-[.985] sm:min-h-[150px] sm:p-4">
                    <div className="flex items-start justify-between gap-2">
                      <span className={`grid h-9 w-9 place-items-center rounded-xl ${colors}`}><Icon size={18} strokeWidth={2} /></span>
                      <ArrowRight size={15} className="mt-1 text-[#b2a39b] transition duration-200 group-hover:translate-x-1 group-hover:text-[#800020]" />
                    </div>
                    <div className="mt-auto pt-4">
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-[12px] font-black leading-tight text-[#493239] sm:text-[13px]">{hi ? hindi : title}</h3>
                        {href === "/wishlist" && wishlistCount > 0 && <span className="rounded-full bg-[#800020] px-1.5 py-0.5 text-[8px] font-black text-white">{wishlistCount}</span>}
                      </div>
                      <p className="mt-1 text-[9px] leading-4 text-[#8a7d76] sm:text-[10px]">{hi ? descriptionHi : description}</p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section className="mt-4 flex items-center gap-3 rounded-[16px] border border-[#e9dfd4] bg-white/80 p-3.5">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#f5efe7] text-[#927247]"><MapPin size={17} /></span>
          <div className="min-w-0 flex-1">
            <h2 className="text-[11px] font-extrabold text-[#4b3839]">{hi ? "डिलीवरी लोकेशन" : "Delivery location"}</h2>
            <p className="mt-0.5 text-[9px] leading-4 text-[#8a7c75]">{hi ? "अपना इलाका चुनने के लिए ऊपर लोकेशन बटन इस्तेमाल करें।" : "Use the location selector in the header to choose your area."}</p>
          </div>
          <ShoppingBag size={16} className="shrink-0 text-[#a77b3e]" />
        </section>

        <footer className="mt-4 rounded-[17px] bg-[#5a1023] px-4 py-4 text-white">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <h2 className="text-[12px] font-black">{hi ? "हम आपकी मदद के लिए हैं" : "We're here to help"}</h2>
              <p className="mt-1 text-[9px] leading-4 text-white/70">{hi ? "ऑर्डर या डिलीवरी में मदद चाहिए?" : "Need help with an order or delivery?"}</p>
            </div>
            <a href="https://wa.me/918962531603" target="_blank" rel="noreferrer" className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg bg-white px-3 text-[10px] font-black text-[#5a1023] transition hover:bg-[#fff1d8]">
              WhatsApp <ArrowRight size={13} />
            </a>
          </div>
          <p className="mt-3 border-t border-white/10 pt-2.5 text-[8px] font-bold tracking-[.12em] text-white/50">RASHID MEGA MART · REWA</p>
        </footer>
      </div>
    </main>
  );
}
