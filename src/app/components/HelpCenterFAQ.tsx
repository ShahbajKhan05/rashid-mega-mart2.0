"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import { ChevronDown } from "lucide-react";

type Language = "en" | "hi";
type FAQ = { question: string; answer: string; questionHi: string; answerHi: string };

const entries: FAQ[] = [
  { question: "How do I place an order?", answer: "Explore the products, add your favourites to the cart and submit your order request at checkout. Our store team will contact you to confirm availability and delivery details.", questionHi: "ऑर्डर कैसे करें?", answerHi: "प्रोडक्ट देखें, पसंदीदा सामान कार्ट में जोड़ें और चेकआउट पर ऑर्डर रिक्वेस्ट भेजें। हमारी टीम उपलब्धता और डिलीवरी की जानकारी कन्फर्म करने के लिए आपसे संपर्क करेगी।" },
  { question: "Is my order confirmed immediately?", answer: "Your checkout creates an order request. The store confirms product availability, the final amount and delivery details before accepting it.", questionHi: "क्या ऑर्डर तुरंत कन्फर्म हो जाता है?", answerHi: "चेकआउट के बाद आपकी ऑर्डर रिक्वेस्ट मिलती है। ऑर्डर स्वीकार करने से पहले दुकान सामान की उपलब्धता, फाइनल कीमत और डिलीवरी की जानकारी कन्फर्म करती है।" },
  { question: "Can I change or cancel my order?", answer: "Please contact the store as soon as possible with your order details. Changes depend on whether the order has already been prepared or dispatched.", questionHi: "क्या ऑर्डर बदल या कैंसल कर सकते हैं?", answerHi: "अपने ऑर्डर की जानकारी के साथ जल्द से जल्द दुकान से संपर्क करें। बदलाव इस बात पर निर्भर करेगा कि ऑर्डर तैयार या डिस्पैच हुआ है या नहीं।" },
  { question: "How can I track my order?", answer: "Open the Track Order page and enter the tracking details shared by the store. If you have not received tracking information, contact the store.", questionHi: "ऑर्डर ट्रैक कैसे करें?", answerHi: "Track Order पेज खोलें और दुकान से मिली ट्रैकिंग जानकारी भरें। अगर जानकारी नहीं मिली है, तो दुकान से संपर्क करें।" },
  { question: "When will my order arrive?", answer: "Delivery availability and estimated timing are confirmed by the store after checking your location and items. The team will share the details with you.", questionHi: "मेरा ऑर्डर कब आएगा?", answerHi: "आपकी लोकेशन और सामान चेक करने के बाद दुकान डिलीवरी की उपलब्धता और अनुमानित समय बताएगी।" },
  { question: "Which payment methods are available?", answer: "Available payment options are shared by the store while confirming your order. Please follow the payment instructions provided by the store team.", questionHi: "पेमेंट के कौन-कौन से तरीके हैं?", answerHi: "ऑर्डर कन्फर्म करते समय दुकान आपको उपलब्ध पेमेंट विकल्प बताएगी। दुकान की टीम द्वारा दिए गए निर्देशों का पालन करें।" },
  { question: "How does the FIRST100 offer work?", answer: "Apply code FIRST100 at checkout to get ₹100 off on a qualifying purchase of ₹499 or more. The offer is valid until 9 November 2026, while available and subject to eligibility.", questionHi: "FIRST100 ऑफर कैसे मिलेगा?", answerHi: "₹499 या उससे अधिक की योग्य खरीदारी पर ₹100 की छूट पाने के लिए चेकआउट में FIRST100 कोड लगाएँ। ऑफर 9 नवंबर 2026 तक, उपलब्धता और पात्रता के अनुसार मान्य है।" },
  { question: "How do Rashid Rewards points work?", answer: "Earn 5 points for every ₹100 spent. Each point is worth ₹1, and points expire 180 days after they are earned.", questionHi: "Rashid Rewards पॉइंट कैसे मिलते हैं?", answerHi: "हर ₹100 की खरीदारी पर 5 पॉइंट मिलते हैं। 1 पॉइंट की कीमत ₹1 है और पॉइंट मिलने के 180 दिन बाद एक्सपायर हो जाते हैं।" },
  { question: "What if an item is damaged or incorrect?", answer: "Please contact the store promptly and share your order details along with a clear photo of the item. The team will review it and guide you on the next steps.", questionHi: "सामान खराब या गलत मिले तो क्या करें?", answerHi: "जल्द से जल्द दुकान से संपर्क करें और ऑर्डर की जानकारी के साथ सामान की साफ फोटो भेजें। टीम जाँच करके आगे का तरीका बताएगी।" },
  { question: "What is included in a Monthly Kit?", answer: "Monthly Kit contents can vary by pack. Open the Monthly Kit section to review the current item list, price and availability before ordering.", questionHi: "Monthly Kit में क्या-क्या मिलता है?", answerHi: "Monthly Kit का सामान पैक के अनुसार अलग हो सकता है। ऑर्डर करने से पहले Monthly Kit सेक्शन में मौजूदा सामान की लिस्ट, कीमत और उपलब्धता देखें।" },
];

export default function HelpCenterFAQ({ language }: { language: Language }) {
  const isHindi = language === "hi";
  const [openIndex, setOpenIndex] = useState(-1);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo("[data-faq-row]", { y: 8, autoAlpha: 0 }, {
        y: 0, autoAlpha: 1, duration: .35, stagger: .035, ease: "power2.out",
        scrollTrigger: { trigger: "#help-center", start: "top 90%", once: true },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="help-center" className="relative overflow-hidden bg-[#F5F0E6] px-3.5 py-7 sm:px-6 sm:py-10">
      <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full bg-[#fffaf0]/70 blur-2xl" />
      <div className="relative mx-auto max-w-[760px]">
        <div className="mb-4 text-center sm:mb-6">
          <p className="text-[9px] font-extrabold uppercase tracking-[.22em] text-[#A47A2C]">A LITTLE HELP, RIGHT HERE</p>
          <h2 className="mt-1.5 text-[clamp(1.3rem,5.4vw,2rem)] font-black leading-[1.12] tracking-[-.055em] text-[#70202A]">
            {isHindi ? "आपके सवाल, हमारे जवाब" : "Good to know before you shop"}
          </h2>
          <p className="mx-auto mt-1.5 max-w-[310px] text-[11px] leading-[1.55] text-[#78695D] sm:max-w-none sm:text-[13px]">
            {isHindi ? "ऑर्डर, डिलीवरी और पेमेंट से जुड़ी ज़रूरी जानकारी।" : "Quick answers about orders, delivery, payments and rewards."}
          </p>
        </div>

        <div className="space-y-2.5 sm:space-y-3">
          {entries.map((item, index) => {
            const expanded = openIndex === index;
            return (
              <article
                data-faq-row
                key={item.question}
                className={"overflow-hidden rounded-[15px] border transition-all duration-300 sm:rounded-[18px] " + (expanded
                  ? "border-[#D8BD91] bg-[#F8F2E7] shadow-[inset_3px_3px_7px_rgba(137,111,76,.12),inset_-3px_-3px_7px_rgba(255,255,255,.9),0_5px_14px_rgba(100,73,39,.07)]"
                  : "border-[#E8DFD0] bg-[#F8F3E9] shadow-[5px_5px_12px_rgba(135,112,80,.12),-5px_-5px_12px_rgba(255,255,255,.92)]")}
              >
                <button
                  type="button"
                  aria-expanded={expanded}
                  onClick={() => setOpenIndex(expanded ? -1 : index)}
                  className="flex min-h-[52px] w-full items-center gap-3 px-3.5 py-3 text-left active:scale-[.995] sm:min-h-[58px] sm:px-5"
                >
                  <span className={"grid h-7 w-7 shrink-0 place-items-center rounded-full text-[10px] font-extrabold transition-colors " + (expanded ? "bg-[#812631] text-white" : "bg-[#EDE3D2] text-[#8A6A42] shadow-[inset_1px_1px_3px_rgba(125,96,59,.12),inset_-1px_-1px_3px_white]")}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1 text-[12px] font-extrabold leading-[1.4] tracking-[-.015em] text-[#3F3029] sm:text-[14px]">
                    {isHindi ? item.questionHi : item.question}
                  </span>
                  <span className={"grid h-7 w-7 shrink-0 place-items-center rounded-full transition-all duration-300 " + (expanded ? "rotate-180 bg-[#812631] text-white" : "bg-[#EEE5D7] text-[#806B55]")}>
                    <ChevronDown size={15} />
                  </span>
                </button>
                <div className={"grid transition-[grid-template-rows,opacity] duration-300 ease-out " + (expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                  <div className="overflow-hidden">
                    <p className="border-t border-[#E5D8C5] px-3.5 pb-3.5 pt-2.5 pl-[3.55rem] text-[11px] leading-[1.65] text-[#6D5C50] sm:px-5 sm:pb-4 sm:pt-3 sm:pl-[4.25rem] sm:text-[13px]">
                      {isHindi ? item.answerHi : item.answer}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        <p className="mt-4 text-center text-[10px] font-medium text-[#8A7867] sm:mt-5 sm:text-[11px]">
          {isHindi ? "कुछ और पूछना है? हमसे संपर्क करें।" : "Still need a hand? Our store team is happy to help."}
          {" "}<a href="/contact" className="font-extrabold text-[#8B2630] underline decoration-[#C8A56B] underline-offset-2">{isHindi ? "संपर्क करें" : "Talk to us"}</a>
        </p>
      </div>
    </section>
  );
}