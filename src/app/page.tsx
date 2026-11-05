"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, ChevronRight, ShieldCheck, ShoppingBag, Truck } from "lucide-react";
import { useLanguage } from "./components/LanguageProvider";
import { categoryOptions, products } from "./components/data";

const categoryArt: Record<string, string> = {
  staples: "🌾",
  oil: "🫒",
  basics: "🧂",
  dairy: "🥛",
  bakery: "🥐",
};

export default function Home() {
  const { language } = useLanguage();
  const isHindi = language === "hi";
  const featured = products.slice(0, 8);
  const heroProduct = products[0];
  const sideProducts = products.slice(1, 4);

  const copy = isHindi
    ? {
        eyebrow: "आपकी रोज़मर्रा की खरीदारी",
        titleA: "घर की हर",
        titleB: "ज़रूरत।",
        intro: "रोज़ के काम की चीज़ें, भरोसेमंद पसंद और आसान खरीदारी — सब एक ही जगह।",
        shop: "खरीदारी शुरू करें",
        track: "ऑर्डर ट्रैक करें",
        categories: "आज क्या चाहिए?",
        categoryEyebrow: "अपनी पसंद चुनें",
        picks: "रोज़ के पसंदीदा",
        picksEyebrow: "आपके लिए चुने गए",
        storyEyebrow: "अच्छी खरीदारी, आसान ज़िंदगी",
        storyTitle: "छोटी-छोटी ज़रूरतों के लिए, एक भरोसेमंद जगह।",
        storyText: "अपनी लिस्ट बनाइए, पसंदीदा सामान चुनिए और ऑर्डर रिक्वेस्ट भेजिए। हमारी टीम उपलब्धता और डिलीवरी की जानकारी कन्फर्म करेगी।",
        storyCta: "सभी सामान देखें",
      }
    : {
        eyebrow: "YOUR EVERYDAY SHOPPING, MADE SIMPLE",
        titleA: "Good things",
        titleB: "for every day.",
        intro: "Everyday essentials, familiar favourites and thoughtful picks — all in one easy place.",
        shop: "Explore the store",
        track: "Track your order",
        categories: "Find what you need.",
        categoryEyebrow: "A GOOD PLACE TO START",
        picks: "Everyday favourites",
        picksEyebrow: "A FEW GOOD PICKS",
        storyEyebrow: "A LITTLE MORE CONVENIENCE",
        storyTitle: "The things your home needs, all in one place.",
        storyText: "Build your list, choose your favourites and send an order request. Our team will confirm availability and delivery details with you.",
        storyCta: "Explore all products",
      };

  return (
    <main className="overflow-hidden bg-[#FFFCF0] pb-24 text-[#30251F]">
      <section className="mx-auto max-w-[1440px] px-4 pb-9 pt-4 sm:px-7 sm:pb-14 sm:pt-7 lg:px-10">
        <div className="relative grid min-h-[500px] overflow-hidden rounded-[26px] border border-[#e9ddcb] bg-[#f4eadb] shadow-[0_22px_65px_rgba(65,35,20,.08)] sm:rounded-[34px] lg:min-h-[570px] lg:grid-cols-[1.02fr_.98fr]">
          <div className="pointer-events-none absolute -left-24 -top-28 h-80 w-80 rounded-full bg-white/70 blur-3xl" />
          <div className="relative z-10 flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-14 lg:px-16 xl:px-20">
            <div className="flex w-fit items-center gap-2 border-b border-[#c9aa7c] pb-2 text-[9px] font-extrabold tracking-[.23em] text-[#956d32] sm:text-[10px]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#800020]" /> {copy.eyebrow}
            </div>
            <h1 className="mt-7 max-w-[650px] text-[clamp(3.35rem,7vw,6.9rem)] font-semibold leading-[.88] tracking-[-.085em] text-[#68152b]">
              {copy.titleA}<br /><span className="font-medium italic text-[#a77b3e]">{copy.titleB}</span>
            </h1>
            <p className="mt-6 max-w-[410px] text-[14px] leading-7 text-[#716257] sm:text-[15px] sm:leading-8">{copy.intro}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/products" className="group inline-flex h-12 items-center gap-3 rounded-full bg-[#800020] px-6 text-[13px] font-bold text-white shadow-[0_10px_24px_rgba(128,0,32,.18)] transition duration-300 hover:-translate-y-1 hover:bg-[#650019]">
                {copy.shop}<ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link href="/order-tracking" className="inline-flex h-12 items-center gap-2 rounded-full border border-[#d6c5ad] bg-white/55 px-5 text-[13px] font-semibold text-[#5b4c42] transition hover:border-[#a77b3e] hover:bg-white">
                {copy.track}<ArrowRight size={15} />
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-[#dfd1bd] pt-5 text-[10px] font-bold tracking-wide text-[#77685d] sm:mt-12">
              <span className="inline-flex items-center gap-2"><ShieldCheck size={15} className="text-[#a77b3e]" /> {isHindi ? "आसान ऑर्डर" : "Easy ordering"}</span>
              <span className="inline-flex items-center gap-2"><Truck size={15} className="text-[#a77b3e]" /> {isHindi ? "डिलीवरी की पुष्टि" : "Delivery confirmed with you"}</span>
            </div>
          </div>

          <div className="relative min-h-[340px] overflow-hidden bg-[#e7d8c1] sm:min-h-[440px] lg:min-h-full">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_38%,rgba(255,255,255,.72),transparent_43%),linear-gradient(145deg,#f1e5d2,#d6bd99)]" />
            <div className="absolute -right-20 -top-24 h-[420px] w-[420px] rounded-full border border-white/60 sm:h-[560px] sm:w-[560px]" />
            <div className="absolute -right-8 -top-12 h-[330px] w-[330px] rounded-full border border-white/60 sm:h-[450px] sm:w-[450px]" />
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#a77b3e]/20 to-transparent" />
            <div className="absolute left-[8%] top-[10%] z-10 w-[34%] rounded-2xl border border-white/70 bg-white/80 p-2 shadow-[0_18px_45px_rgba(69,43,24,.12)] backdrop-blur-xl sm:left-[10%] sm:top-[12%] sm:p-3">
              <div className="aspect-square overflow-hidden rounded-xl bg-[#f8f4ed]">
                <img src={sideProducts[0]?.image} alt={sideProducts[0]?.name || "Grocery essentials"} className="h-full w-full object-cover" />
              </div>
              <p className="mt-2 truncate text-[9px] font-bold text-[#5b4c42] sm:text-[10px]">{sideProducts[0]?.name}</p>
            </div>
            <div className="absolute right-[7%] top-[16%] z-10 w-[31%] rotate-[5deg] rounded-2xl border border-white/70 bg-white/80 p-2 shadow-[0_18px_45px_rgba(69,43,24,.12)] backdrop-blur-xl sm:right-[10%] sm:top-[18%] sm:p-3">
              <div className="aspect-square overflow-hidden rounded-xl bg-[#f8f4ed]">
                <img src={sideProducts[1]?.image} alt={sideProducts[1]?.name || "Daily essentials"} className="h-full w-full object-cover" />
              </div>
              <p className="mt-2 truncate text-[9px] font-bold text-[#5b4c42] sm:text-[10px]">{sideProducts[1]?.name}</p>
            </div>
            <div className="absolute left-1/2 top-1/2 z-20 flex w-[54%] -translate-x-1/2 -translate-y-[34%] rotate-[-3deg] flex-col rounded-[22px] border-[5px] border-white/80 bg-white p-3 shadow-[0_28px_65px_rgba(70,42,25,.2)] sm:w-[48%] sm:rounded-[28px] sm:p-4">
              <div className="aspect-[.92/1] overflow-hidden rounded-[16px] bg-[#f7f2e9] sm:rounded-[20px]">
                <img src={heroProduct.image} alt={heroProduct.name} className="h-full w-full object-cover" />
              </div>
              <div className="flex items-end justify-between gap-2 px-1 pb-1 pt-3">
                <div className="min-w-0"><p className="text-[8px] font-extrabold uppercase tracking-[.17em] text-[#a77b3e] sm:text-[9px]">{heroProduct.brand}</p><p className="mt-1 truncate text-[11px] font-bold text-[#45352e] sm:text-xs">{heroProduct.name}</p></div>
                <span className="shrink-0 text-xs font-extrabold text-[#800020]">₹{heroProduct.price}</span>
              </div>
            </div>
            <div className="absolute bottom-[8%] left-[7%] z-20 rounded-full border border-white/70 bg-[#800020] px-4 py-2.5 text-[9px] font-extrabold tracking-[.12em] text-white shadow-lg sm:bottom-[10%] sm:left-[10%] sm:px-5 sm:py-3">
              RASHID MEGA MART
            </div>
            <div className="absolute bottom-[9%] right-[7%] z-20 rounded-full border border-white/70 bg-white/80 px-3 py-2 text-[9px] font-bold text-[#80613b] shadow-lg backdrop-blur-xl sm:bottom-[11%] sm:right-[9%] sm:px-4">
              {isHindi ? "घर के लिए, हर दिन" : "FOR HOME. EVERY DAY."}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 pb-10 pt-8 sm:px-7 sm:pb-14 sm:pt-12 lg:px-10">
        <div className="flex items-end justify-between gap-4 border-b border-[#e7dccd] pb-4">
          <div><p className="text-[9px] font-extrabold tracking-[.24em] text-[#a77b3e]">{copy.categoryEyebrow}</p><h2 className="mt-2 text-[clamp(1.65rem,3vw,2.5rem)] font-semibold tracking-[-.06em] text-[#68152b]">{copy.categories}</h2></div>
          <Link href="/products" className="mb-1 inline-flex shrink-0 items-center gap-1 text-xs font-bold text-[#800020] hover:underline">{isHindi ? "सभी देखें" : "View all"} <ChevronRight size={15} /></Link>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-5">
          {categoryOptions.filter((category) => category.id !== "all").map((category) => (
            <Link key={category.id} href={"/products?category=" + category.id} className="group relative flex min-h-[118px] items-end overflow-hidden border border-[#eadfce] bg-gradient-to-br from-white to-[#f2e8d8] p-4 transition duration-300 hover:-translate-y-1 hover:border-[#cdb48e] hover:shadow-[0_15px_30px_rgba(78,42,25,.09)] sm:min-h-[142px] sm:rounded-[18px] sm:p-5">
              <span className="absolute right-3 top-2 text-[42px] opacity-90 transition duration-500 group-hover:rotate-[-8deg] group-hover:scale-110 sm:right-5 sm:top-3 sm:text-[52px]">{categoryArt[category.id] || "🛒"}</span>
              <span className="relative z-10"><span className="block text-[11px] font-bold text-[#5b332e] sm:text-[13px]">{isHindi ? category.hi : category.en}</span><span className="mt-1 inline-flex items-center gap-1 text-[9px] font-bold text-[#a77b3e]">{isHindi ? "देखें" : "Explore"} <ArrowUpRight size={11} /></span></span>
              <span className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-white/70 blur-xl transition group-hover:scale-150" />
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 pb-12 pt-5 sm:px-7 sm:pb-16 lg:px-10">
        <div className="flex items-end justify-between gap-4 border-b border-[#e7dccd] pb-4">
          <div><p className="text-[9px] font-extrabold tracking-[.24em] text-[#a77b3e]">{copy.picksEyebrow}</p><h2 className="mt-2 text-[clamp(1.65rem,3vw,2.5rem)] font-semibold tracking-[-.06em] text-[#68152b]">{copy.picks}</h2></div>
          <Link href="/products" className="mb-1 inline-flex shrink-0 items-center gap-1 text-xs font-bold text-[#800020] hover:underline">{isHindi ? "सभी उत्पाद" : "All products"} <ChevronRight size={15} /></Link>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 sm:gap-x-5 sm:gap-y-8 lg:grid-cols-4 lg:gap-x-6">
          {featured.map((product) => {
            const name = isHindi ? product.nameHi : product.name;
            const discount = product.originalPrice > product.price ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
            return <Link key={product.id} href={"/products/" + (product.slug || product.id)} className="group min-w-0">
              <div className="relative aspect-[1/1.02] overflow-hidden border border-[#eee5d9] bg-white p-3 transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_18px_35px_rgba(78,42,25,.1)] sm:rounded-[20px] sm:p-5">
                {discount > 0 && <span className="absolute left-2.5 top-2.5 z-10 bg-[#800020] px-2 py-1 text-[8px] font-extrabold tracking-wide text-white sm:left-3 sm:top-3 sm:text-[9px]">{discount}% OFF</span>}
                <img src={product.image} alt={name} loading="lazy" className="h-full w-full object-contain mix-blend-multiply transition duration-500 group-hover:scale-105" />
                <span className="absolute bottom-3 right-3 grid h-8 w-8 translate-y-2 place-items-center rounded-full bg-[#800020] text-white opacity-0 shadow-lg transition duration-300 group-hover:translate-y-0 group-hover:opacity-100"><ArrowUpRight size={15} /></span>
              </div>
              <div className="px-0.5 pt-3">
                <p className="text-[8px] font-extrabold uppercase tracking-[.16em] text-[#a77b3e]">{product.brand || "Rashid Mega Mart"}{product.unit ? " · " + product.unit : ""}</p>
                <h3 className="mt-1 line-clamp-2 min-h-9 text-[11px] font-semibold leading-[1.55] text-[#40342e] sm:text-[13px]">{name}</h3>
                <div className="mt-2 flex flex-wrap items-baseline gap-2"><span className="text-[13px] font-extrabold text-[#800020]">₹{product.price.toLocaleString("en-IN")}</span>{discount > 0 && <span className="text-[10px] text-[#9b8d81] line-through">₹{product.originalPrice.toLocaleString("en-IN")}</span>}</div>
              </div>
            </Link>;
          })}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 pb-14 pt-4 sm:px-7 sm:pb-20 lg:px-10">
        <div className="relative grid overflow-hidden bg-[#68152b] text-[#fff9e9] sm:grid-cols-[1.1fr_.9fr]">
          <div className="relative z-10 px-6 py-9 sm:px-10 sm:py-12 lg:px-16 lg:py-16">
            <p className="text-[9px] font-extrabold tracking-[.25em] text-[#e6c88f]">{copy.storyEyebrow}</p>
            <h2 className="mt-4 max-w-[620px] text-[clamp(2rem,4.3vw,4rem)] font-semibold leading-[.98] tracking-[-.07em]">{copy.storyTitle}</h2>
            <p className="mt-5 max-w-[490px] text-[13px] leading-7 text-white/70">{copy.storyText}</p>
            <Link href="/products" className="mt-7 inline-flex h-11 items-center gap-3 rounded-full bg-[#fff9e9] px-5 text-[12px] font-extrabold text-[#68152b] transition hover:-translate-y-0.5 hover:bg-white">{copy.storyCta}<ArrowUpRight size={15} /></Link>
          </div>
          <div className="relative min-h-[230px] overflow-hidden sm:min-h-full">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_45%,rgba(212,168,79,.4),transparent_58%),linear-gradient(135deg,#7d2338,#3c0c1c)]" />
            <div className="absolute -right-16 top-1/2 h-[330px] w-[330px] -translate-y-1/2 rounded-full border border-[#e6c88f]/30 sm:right-[-30px] sm:h-[440px] sm:w-[440px]" />
            <div className="absolute right-[12%] top-1/2 grid h-[190px] w-[190px] -translate-y-1/2 place-items-center rounded-full border border-[#e6c88f]/35 bg-white/[.06] text-center shadow-[0_20px_65px_rgba(0,0,0,.18)] backdrop-blur-sm sm:right-[18%] sm:h-[250px] sm:w-[250px]">
              <div><ShoppingBag size={48} strokeWidth={1} className="mx-auto text-[#e6c88f] sm:h-16 sm:w-16" /><p className="mt-4 text-[9px] font-extrabold tracking-[.25em] text-[#fff3d7]">RASHID MEGA MART</p><p className="mt-1 text-[8px] tracking-[.18em] text-[#e6c88f]">EVERYDAY, MADE SIMPLE</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[980px] px-4 pb-16 pt-2 sm:px-7 sm:pb-24 lg:px-10">
        <div className="mb-6 text-center">
          <p className="text-[9px] font-extrabold tracking-[.25em] text-[#a77b3e]">{isHindi ? "आपके सवाल" : "NEED A HAND?"}</p>
          <h2 className="mt-2 text-[clamp(1.7rem,3vw,2.5rem)] font-semibold tracking-[-.06em] text-[#68152b]">{isHindi ? "अक्सर पूछे जाने वाले सवाल" : "Frequently asked questions"}</h2>
          <p className="mt-2 text-[13px] text-[#817267]">{isHindi ? "खरीदारी से जुड़ी ज़रूरी जानकारी एक जगह।" : "Quick answers to help you shop with confidence."}</p>
        </div>
        <div className="divide-y divide-[#eadfce] border-y border-[#eadfce] bg-white/45 px-3 sm:px-6">
          {(isHindi ? [
            ["ऑर्डर कैसे करें?", "उत्पाद चुनें, कार्ट में जोड़ें और चेकआउट में अपनी जानकारी भरकर ऑर्डर रिक्वेस्ट भेजें। हमारी टीम आगे की पुष्टि करेगी।"],
            ["क्या ऑर्डर भेजते ही कन्फर्म हो जाता है?", "नहीं। आपकी रिक्वेस्ट मिलने के बाद सामान की उपलब्धता, कुल कीमत और डिलीवरी की जानकारी की पुष्टि की जाएगी।"],
            ["पेमेंट कैसे करना होगा?", "पेमेंट का तरीका ऑर्डर कन्फर्म करते समय बताया जाएगा। अभी वेबसाइट पर ऑनलाइन पेमेंट गेटवे उपलब्ध नहीं है।"],
            ["मैं अपना ऑर्डर कैसे ट्रैक करूँ?", "ऑर्डर की जानकारी मिलने के बाद वेबसाइट के 'Track Order' पेज पर जाकर उपलब्ध ट्रैकिंग विवरण देख सकते हैं।"],
            ["डिलीवरी और रिटर्न की जानकारी कहाँ मिलेगी?", "डिलीवरी का समय, शुल्क और लागू रिटर्न/एक्सचेंज शर्तें ऑर्डर कन्फर्म करने से पहले हमारी टीम से पूछ लें।"]
          ] : [
            ["How do I place an order?", "Choose a product, add it to your cart and submit your details at checkout. Our team will contact you to confirm the request."],
            ["Is my order confirmed as soon as I submit it?", "Not yet. Our team will confirm product availability, the final amount and delivery details after receiving your request."],
            ["How can I pay?", "The available payment method will be shared while confirming your order. Online payment is not currently available on the website."],
            ["How can I track my order?", "Once you receive your order details, visit the Track Order page to check the tracking information available for your order."],
            ["Where can I check delivery and return details?", "Please confirm delivery time, charges and applicable return or exchange terms with our team before your order is finalised."]
          ]).map(([question, answer]) => (
            <details key={question} className="group py-4 sm:py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-[13px] font-semibold text-[#493a32] marker:hidden [&::-webkit-details-marker]:hidden">
                {question}
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#f7efe2] text-[#800020] transition-transform duration-200 group-open:rotate-45"><span className="text-lg leading-none">+</span></span>
              </summary>
              <p className="max-w-[760px] pt-3 pr-8 text-[12px] leading-6 text-[#817267]">{answer}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
