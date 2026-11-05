"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { Search, ChevronDown, MessageCircle, ThumbsUp, ThumbsDown, Sparkles, ShoppingBag, Truck, CreditCard, Gift, RotateCcw, CircleHelp } from "lucide-react";

type Language = "en" | "hi";
type FAQ = { category: string; question: string; answer: string; questionHi: string; answerHi: string };

const entries: FAQ[] = [
  { category: "Orders", question: "How do I place an order?", answer: "Explore the products, add your favourites to the cart and submit your order request at checkout. Our store team will contact you to confirm availability and delivery details.", questionHi: "ऑर्डर कैसे करें?", answerHi: "प्रोडक्ट देखें, पसंदीदा सामान कार्ट में जोड़ें और चेकआउट पर ऑर्डर रिक्वेस्ट भेजें। हमारी टीम उपलब्धता और डिलीवरी की जानकारी कन्फर्म करने के लिए आपसे संपर्क करेगी।" },
  { category: "Orders", question: "Is my order confirmed immediately?", answer: "Your checkout creates an order request. The store confirms product availability, the final amount and delivery details before accepting it.", questionHi: "क्या ऑर्डर तुरंत कन्फर्म हो जाता है?", answerHi: "चेकआउट के बाद आपकी ऑर्डर रिक्वेस्ट मिलती है। ऑर्डर स्वीकार करने से पहले दुकान सामान की उपलब्धता, फाइनल कीमत और डिलीवरी की जानकारी कन्फर्म करती है।" },
  { category: "Orders", question: "Can I change or cancel my order?", answer: "Please contact the store as soon as possible with your order details. Changes depend on whether the order has already been prepared or dispatched.", questionHi: "क्या ऑर्डर बदल या कैंसल कर सकते हैं?", answerHi: "अपने ऑर्डर की जानकारी के साथ जल्द से जल्द दुकान से संपर्क करें। बदलाव इस बात पर निर्भर करेगा कि ऑर्डर तैयार या डिस्पैच हुआ है या नहीं।" },
  { category: "Delivery", question: "How can I track my order?", answer: "Open the Track Order page and enter the tracking details shared by the store. If you have not received tracking information, contact the store.", questionHi: "ऑर्डर ट्रैक कैसे करें?", answerHi: "Track Order पेज खोलें और दुकान से मिली ट्रैकिंग जानकारी भरें। अगर जानकारी नहीं मिली है, तो दुकान से संपर्क करें।" },
  { category: "Delivery", question: "When will my order arrive?", answer: "Delivery availability and estimated timing are confirmed by the store after checking your location and items. The team will share the details with you.", questionHi: "मेरा ऑर्डर कब आएगा?", answerHi: "आपकी लोकेशन और सामान चेक करने के बाद दुकान डिलीवरी की उपलब्धता और अनुमानित समय बताएगी।" },
  { category: "Payments", question: "Which payment methods are available?", answer: "Available payment options are shared by the store while confirming your order. Please follow the payment instructions provided by the store team.", questionHi: "पेमेंट के कौन-कौन से तरीके हैं?", answerHi: "ऑर्डर कन्फर्म करते समय दुकान आपको उपलब्ध पेमेंट विकल्प बताएगी। दुकान की टीम द्वारा दिए गए निर्देशों का पालन करें।" },
  { category: "Payments", question: "Is the amount final at checkout?", answer: "The store confirms the final payable amount after checking stock and delivery details. Please wait for confirmation before making a payment.", questionHi: "क्या चेकआउट पर दिखाई गई कीमत फाइनल है?", answerHi: "स्टॉक और डिलीवरी की जानकारी जाँचने के बाद दुकान फाइनल पेमेंट राशि कन्फर्म करेगी। पेमेंट करने से पहले पुष्टि का इंतज़ार करें।" },
  { category: "Offers", question: "How does the FIRST100 offer work?", answer: "Apply code FIRST100 at checkout to get ₹100 off on a qualifying purchase of ₹499 or more. The offer is valid until 9 November 2026, while available and subject to eligibility.", questionHi: "FIRST100 ऑफर कैसे मिलेगा?", answerHi: "₹499 या उससे अधिक की योग्य खरीदारी पर ₹100 की छूट पाने के लिए चेकआउट में FIRST100 कोड लगाएँ। ऑफर 9 नवंबर 2026 तक, उपलब्धता और पात्रता के अनुसार मान्य है।" },
  { category: "Rewards", question: "How do Rashid Rewards points work?", answer: "Earn 5 points for every ₹100 spent. Each point is worth ₹1, and points expire 180 days after they are earned.", questionHi: "Rashid Rewards पॉइंट कैसे मिलते हैं?", answerHi: "हर ₹100 की खरीदारी पर 5 पॉइंट मिलते हैं। 1 पॉइंट की कीमत ₹1 है और पॉइंट मिलने के 180 दिन बाद एक्सपायर हो जाते हैं।" },
  { category: "Rewards", question: "How can I redeem my points?", answer: "Eligible points can be redeemed through the Rewards section. Check your available balance and redemption options before applying them to a purchase.", questionHi: "अपने पॉइंट कैसे रिडीम करें?", answerHi: "योग्य पॉइंट Rewards सेक्शन से रिडीम किए जा सकते हैं। खरीदारी में इस्तेमाल करने से पहले अपना बैलेंस और रिडेम्पशन विकल्प देखें।" },
  { category: "Returns", question: "What if an item is damaged or incorrect?", answer: "Please contact the store promptly and share your order details along with a clear photo of the item. The team will review it and guide you on the next steps.", questionHi: "सामान खराब या गलत मिले तो क्या करें?", answerHi: "जल्द से जल्द दुकान से संपर्क करें और ऑर्डर की जानकारी के साथ सामान की साफ फोटो भेजें। टीम जाँच करके आगे का तरीका बताएगी।" },
  { category: "Monthly Kit", question: "What is included in a Monthly Kit?", answer: "Monthly Kit contents can vary by pack. Open the Monthly Kit section to review the current item list, price and availability before ordering.", questionHi: "Monthly Kit में क्या-क्या मिलता है?", answerHi: "Monthly Kit का सामान पैक के अनुसार अलग हो सकता है। ऑर्डर करने से पहले Monthly Kit सेक्शन में मौजूदा सामान की लिस्ट, कीमत और उपलब्धता देखें।" },
];

const categories = [
  { id: "All", label: "All topics", labelHi: "सभी सवाल", icon: CircleHelp },
  { id: "Orders", label: "Orders", labelHi: "ऑर्डर", icon: ShoppingBag },
  { id: "Delivery", label: "Delivery", labelHi: "डिलीवरी", icon: Truck },
  { id: "Payments", label: "Payments", labelHi: "पेमेंट", icon: CreditCard },
  { id: "Offers", label: "Offers", labelHi: "ऑफर्स", icon: Gift },
  { id: "Rewards", label: "Rewards", labelHi: "रिवॉर्ड्स", icon: Sparkles },
  { id: "Returns", label: "Returns", labelHi: "रिटर्न", icon: RotateCcw },
  { id: "Monthly Kit", label: "Monthly Kit", labelHi: "मंथली किट", icon: ShoppingBag },
];

export default function HelpCenterFAQ({ language }: { language: Language }) {
  const isHindi = language === "hi";
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [openIndex, setOpenIndex] = useState(0);
  const [feedback, setFeedback] = useState<Record<string, "yes" | "no">>({});
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => entries.filter((item) => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const text = query.trim().toLowerCase();
    const matchesSearch = !text || [item.question, item.answer, item.questionHi, item.answerHi, item.category].some((value) => value.toLowerCase().includes(text));
    return matchesCategory && matchesSearch;
  }), [activeCategory, query]);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo("[data-faq-intro]", { y: 22, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .7, stagger: .1, ease: "power3.out", scrollTrigger: undefined });
      gsap.fromTo("[data-faq-card]", { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .55, stagger: .045, ease: "power2.out" });
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!listRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(listRef.current.children, { y: 10, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .35, stagger: .035, ease: "power2.out", overwrite: true });
  }, [activeCategory, query]);

  const activeQuestion = filtered[openIndex];
  const questionLabel = (item: FAQ) => isHindi ? item.questionHi : item.question;
  const answerLabel = (item: FAQ) => isHindi ? item.answerHi : item.answer;

  return (
    <section ref={sectionRef} id="help-center" className="relative isolate overflow-hidden bg-[#f8f4eb] px-4 py-14 sm:px-7 sm:py-20 lg:px-10">
      <div aria-hidden="true" className="pointer-events-none absolute -left-28 top-10 -z-10 h-72 w-72 rounded-full bg-[#e8d4ae]/35 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-28 bottom-0 -z-10 h-80 w-80 rounded-full bg-[#e9d8d8]/40 blur-3xl" />
      <div className="mx-auto max-w-[1120px]">
        <div className="mb-8 text-center sm:mb-10">
          <span data-faq-intro className="inline-flex items-center gap-2 rounded-full border border-[#e5d6bd] bg-white/75 px-3 py-1.5 text-[9px] font-black uppercase tracking-[.2em] text-[#9a713a] backdrop-blur"><Sparkles size={12} /> {isHindi ? "राशिद मेगा मार्ट हेल्प सेंटर" : "RASHID MEGA MART · HELP CENTRE"}</span>
          <h2 data-faq-intro className="mt-4 text-[clamp(2rem,5vw,3.6rem)] font-black leading-[1.02] tracking-[-.065em] text-[#702039]">{isHindi ? "आपके हर सवाल का जवाब।" : "A little help goes a long way."}</h2>
          <p data-faq-intro className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#796b60]">{isHindi ? "ऑर्डर से लेकर रिवॉर्ड्स तक — जो जानना है, यहाँ खोजें।" : "From placing an order to earning rewards, find clear answers to the things you shop for."}</p>
        </div>

        <div data-faq-card className="mx-auto mb-5 flex max-w-[690px] items-center gap-3 rounded-2xl border border-[#e7dccb] bg-white/85 px-4 py-3 shadow-[0_12px_35px_rgba(76,48,30,.06)] backdrop-blur-xl transition focus-within:border-[#b88b57] focus-within:shadow-[0_14px_38px_rgba(128,0,32,.10)]">
          <Search size={19} className="shrink-0 text-[#8a5c3c]" />
          <input value={query} onChange={(event) => { setQuery(event.target.value); setOpenIndex(0); }} placeholder={isHindi ? "अपना सवाल खोजें..." : "Search a question, offer, delivery..."} aria-label={isHindi ? "सवाल खोजें" : "Search frequently asked questions"} className="min-w-0 flex-1 bg-transparent text-sm font-medium text-[#40342e] outline-none placeholder:text-[#a99b8e]" />
          {query && <button type="button" onClick={() => { setQuery(""); setOpenIndex(0); }} className="rounded-full px-2 py-1 text-[10px] font-bold text-[#8a5c3c] hover:bg-[#f5eee3]">{isHindi ? "हटाएँ" : "CLEAR"}</button>}
          <span className="hidden rounded-lg bg-[#f7f1e7] px-2 py-1 text-[9px] font-bold text-[#9a8877] sm:inline">FAQ</span>
        </div>

        <div data-faq-card className="mb-6 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((category) => {
            const Icon = category.icon;
            const selected = activeCategory === category.id;
            return <button key={category.id} type="button" onClick={() => { setActiveCategory(category.id); setOpenIndex(0); }} aria-pressed={selected} className={"inline-flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2.5 text-[11px] font-extrabold transition duration-200 " + (selected ? "border-[#76213b] bg-[#76213b] text-white shadow-[0_7px_18px_rgba(118,33,59,.18)]" : "border-[#e5d9c8] bg-white/70 text-[#76665b] hover:-translate-y-0.5 hover:border-[#c8ad88] hover:bg-white")}>
              <Icon size={13} />{isHindi ? category.labelHi : category.label}
            </button>;
          })}
        </div>

        <div className="grid gap-5 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
          <div data-faq-card className="rounded-[24px] border border-[#e8ddcd] bg-white/65 p-5 shadow-[0_15px_45px_rgba(76,48,30,.055)] backdrop-blur-xl sm:p-7">
            <p className="text-[9px] font-black uppercase tracking-[.2em] text-[#a27b46]">{isHindi ? "जल्दी मदद चाहिए?" : "HERE TO MAKE IT EASY"}</p>
            <h3 className="mt-3 text-2xl font-black leading-tight tracking-[-.05em] text-[#702039]">{isHindi ? "सही जानकारी, बिना परेशानी।" : "Find your answer, without the runaround."}</h3>
            <p className="mt-3 text-xs leading-6 text-[#817367]">{isHindi ? "नीचे टॉपिक चुनें या सर्च करें। किसी जवाब से मदद न मिले तो दुकान की टीम से संपर्क करें।" : "Pick a topic or search above. If an answer doesn't cover your situation, our store team can help confirm the details."}</p>
            <div className="mt-6 grid grid-cols-2 gap-2">
              <div className="rounded-2xl border border-[#eee4d6] bg-[#fffdf8] p-3"><ShoppingBag size={16} className="text-[#8b2947]" /><p className="mt-2 text-[11px] font-extrabold text-[#514239]">{isHindi ? "ऑर्डर सहायता" : "Order guidance"}</p><p className="mt-1 text-[10px] text-[#96877a]">{isHindi ? "ऑर्डर और ट्रैकिंग" : "Orders & tracking"}</p></div>
              <div className="rounded-2xl border border-[#eee4d6] bg-[#fffdf8] p-3"><Gift size={16} className="text-[#a27b46]" /><p className="mt-2 text-[11px] font-extrabold text-[#514239]">{isHindi ? "ऑफर और रिवॉर्ड्स" : "Offers & rewards"}</p><p className="mt-1 text-[10px] text-[#96877a]">{isHindi ? "बचत और पॉइंट्स" : "Savings & points"}</p></div>
            </div>
            <div className="mt-5 flex items-center gap-3 rounded-2xl bg-[#f4eee4] p-3.5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-[#76213b]"><MessageCircle size={18} /></span>
              <div><p className="text-xs font-extrabold text-[#514239]">{isHindi ? "फिर भी मदद चाहिए?" : "Still need a hand?"}</p><p className="mt-1 text-[10px] leading-4 text-[#88796d]">{isHindi ? "दुकान से संपर्क करने के लिए Contact सेक्शन देखें।" : "Visit the Contact section to reach the store team."}</p></div>
            </div>
          </div>

          <div data-faq-card className="overflow-hidden rounded-[24px] border border-[#e8ddcd] bg-white/80 shadow-[0_15px_45px_rgba(76,48,30,.055)] backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-[#eee5d9] px-5 py-4 sm:px-6">
              <div><p className="text-[9px] font-black uppercase tracking-[.18em] text-[#a27b46]">{isHindi ? "मददगार जवाब" : "QUICK ANSWERS"}</p><p className="mt-1 text-xs font-bold text-[#594a40]">{isHindi ? "सवाल और जवाब" : "Questions & answers"}</p></div>
              <span className="rounded-full bg-[#f7f1e8] px-3 py-1.5 text-[10px] font-extrabold tabular-nums text-[#8c725c]">{filtered.length} {isHindi ? "सवाल" : "QUESTIONS"}</span>
            </div>
            <div ref={listRef} className="divide-y divide-[#eee7dd] px-4 sm:px-5">
              {filtered.map((item, index) => {
                const expanded = openIndex === index;
                const vote = feedback[item.question];
                return <article key={item.question} data-faq-item className="py-1">
                  <button type="button" aria-expanded={expanded} onClick={() => setOpenIndex(expanded ? -1 : index)} className="group flex w-full items-center gap-3 py-4 text-left">
                    <span className={"grid h-7 w-7 shrink-0 place-items-center rounded-lg text-[9px] font-black transition " + (expanded ? "bg-[#76213b] text-white" : "bg-[#f6f0e7] text-[#9a7957] group-hover:bg-[#efe3d4]")}>{String(index + 1).padStart(2, "0")}</span>
                    <span className={"flex-1 text-[12px] font-extrabold leading-5 transition sm:text-[13px] " + (expanded ? "text-[#76213b]" : "text-[#514239] group-hover:text-[#76213b]")}>{questionLabel(item)}</span>
                    <ChevronDown size={16} className={"shrink-0 text-[#9b8066] transition-transform duration-300 " + (expanded ? "rotate-180 text-[#76213b]" : "")} />
                  </button>
                  <div className={"grid transition-[grid-template-rows,opacity] duration-300 ease-out " + (expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}><div className="overflow-hidden"><div className="pb-4 pl-10 pr-2">
                    <p className="text-[11px] leading-[1.8] text-[#7d6e62] sm:text-xs">{answerLabel(item)}</p>
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[#f0e9df] pt-3">
                      <span className="text-[9px] font-bold text-[#a19386]">{isHindi ? "क्या यह जवाब मददगार था?" : "Was this answer helpful?"}</span>
                      <div className="flex gap-1.5">
                        <button type="button" onClick={() => setFeedback((old) => ({ ...old, [item.question]: "yes" }))} aria-pressed={vote === "yes"} className={"inline-flex items-center gap-1 rounded-full border px-2.5 py-1.5 text-[9px] font-bold transition " + (vote === "yes" ? "border-[#b8d6c1] bg-[#edf7ef] text-[#287447]" : "border-[#e9e0d5] text-[#8d7d70] hover:bg-[#f7f3ed]")}><ThumbsUp size={11} />{isHindi ? "हाँ" : "Yes"}</button>
                        <button type="button" onClick={() => setFeedback((old) => ({ ...old, [item.question]: "no" }))} aria-pressed={vote === "no"} className={"inline-flex items-center gap-1 rounded-full border px-2.5 py-1.5 text-[9px] font-bold transition " + (vote === "no" ? "border-[#e5c5c5] bg-[#fbefef] text-[#9a4242]" : "border-[#e9e0d5] text-[#8d7d70] hover:bg-[#f7f3ed]")}><ThumbsDown size={11} />{isHindi ? "नहीं" : "No"}</button>
                      </div>
                    </div>
                  </div></div></div>
                </article>;
              })}
              {filtered.length === 0 && <div className="px-4 py-12 text-center"><span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-[#f6f0e7] text-[#9b8066]"><Search size={20} /></span><p className="mt-3 text-sm font-extrabold text-[#594a40]">{isHindi ? "कोई सवाल नहीं मिला" : "No matching questions"}</p><p className="mt-1 text-xs text-[#958578]">{isHindi ? "दूसरा शब्द खोजें या सभी टॉपिक चुनें।" : "Try another keyword or browse all topics."}</p><button type="button" onClick={() => { setQuery(""); setActiveCategory("All"); }} className="mt-4 rounded-full bg-[#76213b] px-4 py-2 text-[10px] font-extrabold text-white">{isHindi ? "सभी सवाल दिखाएँ" : "Show all questions"}</button></div>}
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-[#eee5d9] bg-[#fffdf9]/80 px-5 py-3.5 sm:px-6">
              <span className="text-[9px] font-semibold text-[#9a8b7e]">{isHindi ? "राशिद मेगा मार्ट · आपकी सुविधा के लिए" : "Rashid Mega Mart · Here for your convenience"}</span>
              <button type="button" onClick={() => { setQuery(""); setActiveCategory("All"); setOpenIndex(0); }} className="text-[9px] font-extrabold text-[#76213b] hover:underline">{isHindi ? "रीसेट करें" : "RESET FAQ"}</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
