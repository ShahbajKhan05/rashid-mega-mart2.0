"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "./LanguageProvider";
import { ArrowLeft, ArrowUpRight, ChevronDown, ShieldCheck, FileText, Truck, RotateCcw, CreditCard, MessageCircle, Leaf, HelpCircle, Scale, Info, Clock3 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Block = { heading: string; body: string; bullets?: string[] };
type Policy = { title: string; subtitle: string; icon: typeof ShieldCheck; sections: Block[] };
const copy: Record<string, { en: Policy; hi: Policy }> = {
  "privacy-policy": {
    en: { title: "Privacy Policy", subtitle: "How information is handled when you browse Rashid Mega Mart or contact us to place an order.", icon: ShieldCheck, sections: [
      { heading: "Information you choose to share", body: "When you use the shopping experience or send an order request, you may choose to provide details such as your name, mobile number, delivery address, landmark, delivery instructions and the items you want to order." },
      { heading: "How information is used", body: "Information you provide is used to understand and respond to your request, coordinate an order, communicate about product availability and support customer service. Do not send passwords, OTPs, card details or other sensitive credentials in a chat." },
      { heading: "WhatsApp order requests", body: "The current checkout flow prepares an order message and hands it off to WhatsApp. WhatsApp is a separate service with its own terms and privacy practices. Review WhatsApp's privacy information before sharing personal details there." },
      { heading: "Storage and sharing", body: "The website experience may store limited preferences on your device, such as cart contents or language selection. We do not state a specific retention period or list of service providers here because those operational details have not yet been confirmed. Information should only be accessed by people who need it to respond to your request." },
      { heading: "Your choices and requests", body: "You may choose not to submit optional information. To ask about information you have shared, request correction, or raise a privacy concern, use the contact route displayed in the current checkout experience. A verified privacy contact will be added when business details are confirmed." },
      { heading: "Updates", body: "This notice may be updated as the store's ordering and data-handling processes are finalised. The date shown above indicates the latest content revision." }
    ]},
    hi: { title: "गोपनीयता नीति", subtitle: "Rashid Mega Mart की वेबसाइट देखने या ऑर्डर के लिए संपर्क करने पर आपकी जानकारी कैसे संभाली जाती है।", icon: ShieldCheck, sections: [
      { heading: "आपकी ओर से दी गई जानकारी", body: "शॉपिंग या ऑर्डर अनुरोध के दौरान आप अपना नाम, मोबाइल नंबर, डिलीवरी पता, लैंडमार्क, निर्देश और पसंद किए गए सामान की जानकारी दे सकते हैं।" },
      { heading: "जानकारी का उपयोग", body: "आपकी दी गई जानकारी का उपयोग अनुरोध समझने, ऑर्डर पर बात करने, सामान की उपलब्धता बताने और ग्राहक सहायता के लिए किया जाता है। चैट में पासवर्ड, OTP, कार्ड विवरण या अन्य संवेदनशील जानकारी न भेजें।" },
      { heading: "WhatsApp ऑर्डर अनुरोध", body: "वर्तमान checkout ऑर्डर संदेश तैयार करके WhatsApp पर भेजता है। WhatsApp एक अलग सेवा है और उसकी अपनी शर्तें व गोपनीयता नीति है। वहाँ निजी जानकारी साझा करने से पहले उसकी नीति पढ़ें।" },
      { heading: "जानकारी का संग्रह और साझा करना", body: "वेबसाइट आपके डिवाइस पर कार्ट या भाषा जैसी सीमित पसंद सेव कर सकती है। डेटा कितने समय तक रखा जाता है या किन सेवा प्रदाताओं के साथ साझा होता है, इसकी पुष्टि अभी नहीं की गई है; इसलिए यहाँ कोई निश्चित अवधि या सूची नहीं दी जा रही।" },
      { heading: "आपके विकल्प", body: "आप वैकल्पिक जानकारी न देने का विकल्प चुन सकते हैं। अपनी साझा की गई जानकारी के बारे में पूछने, सुधार का अनुरोध करने या गोपनीयता संबंधी शिकायत के लिए checkout में दिखाए गए संपर्क माध्यम का उपयोग करें। सत्यापित privacy contact बाद में जोड़ा जाएगा।" },
      { heading: "नीति में बदलाव", body: "ऑर्डर और डेटा प्रक्रिया तय होने पर यह नीति अपडेट की जा सकती है। ऊपर दी गई तारीख इस सामग्री के आखिरी संशोधन को दिखाती है।" }
    ]}
  },
  "terms-and-conditions": {
    en: { title:"Terms & Conditions", subtitle:"Basic terms for browsing the store and sending an order request.", icon:FileText, sections:[
      {heading:"Using this website",body:"Use the website lawfully and provide accurate information when you submit a request. Product listings, images and displayed information are provided to help you browse; availability and final details should be confirmed before an order is accepted."},
      {heading:"Order requests and confirmation",body:"The current checkout prepares an order request for WhatsApp. Sending a message is not, by itself, confirmation that the store has accepted the order. The store should confirm item availability, final price, delivery feasibility and any applicable charges directly with you."},
      {heading:"Prices and product information",body:"Prices, descriptions, images and stock information may change. If a listing is incomplete, unclear or inconsistent, ask for confirmation before proceeding. No unverified offer, discount or delivery promise is created by this policy."},
      {heading:"Cancellations and changes",body:"If you need to change or withdraw a request, contact the store through the same conversation as soon as possible. Any accepted order-specific arrangement should be confirmed directly; no universal cancellation deadline is stated here."},
      {heading:"Website content and availability",body:"We aim to keep the website available and information useful, but do not guarantee uninterrupted access or that every listing is error-free. We may update or remove content as the catalogue changes."},
      {heading:"Applicable law",body:"These terms are intended for use in India and are subject to applicable Indian laws. Any business-specific legal identity and dispute contact will be added after verification."}
    ]},
    hi:{title:"नियम और शर्तें",subtitle:"स्टोर वेबसाइट देखने और ऑर्डर अनुरोध भेजने के लिए बुनियादी शर्तें।",icon:FileText,sections:[
      {heading:"वेबसाइट का उपयोग",body:"वेबसाइट का कानूनी तरीके से उपयोग करें और अनुरोध भेजते समय सही जानकारी दें। उत्पाद सूची, फोटो और विवरण खरीदारी समझने में मदद के लिए हैं; ऑर्डर स्वीकार होने से पहले उपलब्धता और अंतिम जानकारी की पुष्टि करें।"},
      {heading:"ऑर्डर अनुरोध और पुष्टि",body:"वर्तमान checkout WhatsApp के लिए ऑर्डर अनुरोध तैयार करता है। केवल संदेश भेजने से ऑर्डर स्वीकार या पक्का नहीं माना जाएगा। सामान की उपलब्धता, अंतिम कीमत, डिलीवरी की सुविधा और लागू शुल्क की पुष्टि स्टोर द्वारा सीधे की जानी चाहिए।"},
      {heading:"कीमत और उत्पाद जानकारी",body:"कीमत, विवरण, फोटो और स्टॉक बदल सकते हैं। जानकारी अधूरी या अस्पष्ट हो तो आगे बढ़ने से पहले पुष्टि करें। यह नीति किसी अपुष्ट ऑफर, छूट या डिलीवरी वादे को लागू नहीं करती।"},
      {heading:"ऑर्डर रद्द करना या बदलना",body:"अनुरोध बदलना या वापस लेना हो तो उसी बातचीत में जल्द संपर्क करें। स्वीकार किए गए ऑर्डर की विशेष व्यवस्था सीधे पुष्टि की जानी चाहिए; यहाँ कोई सार्वभौमिक cancellation समय-सीमा नहीं बताई गई है।"},
      {heading:"वेबसाइट और सामग्री",body:"वेबसाइट और जानकारी उपयोगी रखने का प्रयास है, लेकिन बिना रुकावट उपलब्धता या हर सूची के त्रुटिरहित होने की गारंटी नहीं दी जाती। कैटलॉग के अनुसार सामग्री बदली या हटाई जा सकती है।"},
      {heading:"लागू कानून",body:"ये शर्तें भारत में उपयोग के लिए हैं और लागू भारतीय कानूनों के अधीन हैं। सत्यापन के बाद व्यवसाय की कानूनी पहचान और विवाद संपर्क जोड़ा जाएगा।"}
    ]}
  },
  "shipping-policy": {
    en:{title:"Shipping & Delivery",subtitle:"How delivery is discussed and confirmed for a WhatsApp order request.",icon:Truck,sections:[
      {heading:"Delivery coverage",body:"Delivery availability depends on the order address, item availability and the store's ability to fulfil the request. A serviceable-area list has not yet been verified, so please confirm your location with the store before relying on delivery."},
      {heading:"Delivery charges and timing",body:"No fixed delivery fee, free-delivery offer or guaranteed delivery time is published in this policy. Any applicable charge and estimated time should be communicated and agreed before the order is confirmed."},
      {heading:"Order hand-off",body:"The website currently hands the prepared order request to WhatsApp. The store must confirm the order, items, total amount and delivery arrangement in that conversation."},
      {heading:"Receiving your order",body:"Please check the items and quantities when the order is handed over. If something is missing, damaged or incorrect, raise it promptly in the order conversation so it can be reviewed."},
      {heading:"Delays or unavailable items",body:"If an item becomes unavailable or delivery cannot be completed as expected, the store should contact you to discuss available alternatives or next steps. No automatic substitution is assumed."}
    ]},
    hi:{title:"शिपिंग और डिलीवरी",subtitle:"WhatsApp ऑर्डर अनुरोध के लिए डिलीवरी कैसे बताई और पक्की की जाती है।",icon:Truck,sections:[
      {heading:"डिलीवरी क्षेत्र",body:"डिलीवरी आपके पते, सामान की उपलब्धता और स्टोर की व्यवस्था पर निर्भर करती है। सेवा क्षेत्र की सत्यापित सूची अभी उपलब्ध नहीं है; डिलीवरी मानकर चलने से पहले अपना क्षेत्र स्टोर से पूछें।"},
      {heading:"डिलीवरी शुल्क और समय",body:"इस नीति में कोई तय डिलीवरी शुल्क, फ्री डिलीवरी ऑफर या गारंटीड समय नहीं दिया गया है। लागू शुल्क और अनुमानित समय ऑर्डर पक्का होने से पहले बताया और स्वीकार किया जाना चाहिए।"},
      {heading:"ऑर्डर भेजना",body:"वेबसाइट अभी तैयार ऑर्डर अनुरोध WhatsApp पर भेजती है। स्टोर को उसी बातचीत में ऑर्डर, सामान, कुल राशि और डिलीवरी व्यवस्था की पुष्टि करनी होगी।"},
      {heading:"ऑर्डर प्राप्त करते समय",body:"सामान मिलने पर वस्तुओं और मात्रा की जाँच करें। कुछ गायब, खराब या गलत हो तो उसी ऑर्डर बातचीत में जल्द बताएं ताकि जाँच हो सके।"},
      {heading:"देरी या सामान उपलब्ध न होना",body:"यदि सामान उपलब्ध न हो या डिलीवरी अपेक्षा के अनुसार न हो सके, तो स्टोर को विकल्प या अगले कदम पर आपसे बात करनी चाहिए। आपकी अनुमति के बिना सामान बदलना मानकर नहीं चला जाएगा।"}
    ]}
  },
  "cancellation-refund": {
    en:{title:"Cancellation & Refund",subtitle:"A transparent note while order-specific cancellation and refund rules are being confirmed.",icon:RotateCcw,sections:[
      {heading:"Before an order is confirmed",body:"A WhatsApp message sent from checkout is an order request. If you change your mind, tell the store in the same conversation as soon as possible, before the store confirms acceptance or begins fulfilment."},
      {heading:"After confirmation",body:"If the store has confirmed your order, contact it promptly to ask whether cancellation is still possible. The outcome may depend on the order's status and any applicable law. No fixed cut-off time is stated here."},
      {heading:"Refunds",body:"No standard refund timeline, method or eligibility window has been verified for publication yet. If a refund is agreed or required, the amount, method and expected processing time should be confirmed with you in writing."},
      {heading:"Incorrect, damaged or missing items",body:"Report the issue promptly in the order conversation and share relevant details. The store should review the issue and communicate the available resolution in line with applicable consumer law."},
      {heading:"Statutory rights",body:"Nothing in this page is intended to take away rights or remedies available to consumers under applicable Indian law."}
    ]},
    hi:{title:"ऑर्डर रद्द और रिफंड",subtitle:"ऑर्डर-विशेष cancellation और refund नियम तय होने तक पारदर्शी जानकारी।",icon:RotateCcw,sections:[
      {heading:"ऑर्डर पक्का होने से पहले",body:"Checkout से भेजा गया WhatsApp संदेश ऑर्डर अनुरोध है। मन बदलने पर, स्टोर की स्वीकृति या तैयारी शुरू होने से पहले उसी बातचीत में जल्द बताएं।"},
      {heading:"ऑर्डर की पुष्टि के बाद",body:"यदि स्टोर ने ऑर्डर स्वीकार कर लिया है, तो cancellation संभव है या नहीं पूछने के लिए तुरंत संपर्क करें। निर्णय ऑर्डर की स्थिति और लागू कानून पर निर्भर हो सकता है। यहाँ कोई तय अंतिम समय नहीं दिया गया है।"},
      {heading:"रिफंड",body:"अभी कोई मानक refund समय, तरीका या पात्रता अवधि सत्यापित नहीं है। यदि refund तय होता है या कानूनन जरूरी है, तो राशि, तरीका और अनुमानित समय आपको लिखित में बताया जाना चाहिए।"},
      {heading:"गलत, खराब या कम सामान",body:"समस्या की जानकारी जल्द उसी ऑर्डर बातचीत में दें और जरूरी विवरण साझा करें। स्टोर को लागू उपभोक्ता कानून के अनुसार जाँच करके समाधान बताना चाहिए।"},
      {heading:"कानूनी अधिकार",body:"इस पेज का उद्देश्य भारतीय कानून के तहत उपभोक्ताओं को मिलने वाले अधिकारों या उपायों को कम करना नहीं है।"}
    ]}
  },
  "return-replacement": {
    en:{title:"Returns & Replacement",subtitle:"What to do if an item received does not match the confirmed order.",icon:RotateCcw,sections:[
      {heading:"Raise an issue",body:"If an item is incorrect, damaged, defective or missing, contact the store promptly in the order conversation. Include the item name, order details and a clear description of the issue. Photos may help explain the issue where appropriate."},
      {heading:"Review and resolution",body:"The store should review the details and let you know the next step. A return, replacement, correction or refund may depend on the product, issue, order status and applicable consumer law."},
      {heading:"No blanket exclusions",body:"Product-specific return windows, hygiene exceptions and condition requirements have not been verified for this store. No blanket exclusion is created by this page; applicable legal rights remain unaffected."},
      {heading:"Keep order details",body:"Keep your order conversation and any confirmation details until the issue is resolved."}
    ]},
    hi:{title:"रिटर्न और रिप्लेसमेंट",subtitle:"मिला हुआ सामान पक्के ऑर्डर से अलग हो तो क्या करें।",icon:RotateCcw,sections:[
      {heading:"समस्या बताएं",body:"सामान गलत, खराब, defective या कम हो तो ऑर्डर बातचीत में जल्द स्टोर से संपर्क करें। सामान का नाम, ऑर्डर विवरण और समस्या साफ-साफ बताएं। जरूरत पड़ने पर फोटो मदद कर सकती है।"},
      {heading:"जाँच और समाधान",body:"स्टोर को विवरण देखकर अगला कदम बताना चाहिए। Return, replacement, correction या refund उत्पाद, समस्या, ऑर्डर की स्थिति और लागू उपभोक्ता कानून पर निर्भर हो सकता है।"},
      {heading:"कोई मनमाना प्रतिबंध नहीं",body:"इस स्टोर के लिए उत्पाद-विशेष return अवधि, hygiene अपवाद और सामान की स्थिति संबंधी शर्तें अभी सत्यापित नहीं हैं। यह पेज कोई blanket exclusion नहीं बनाता; कानूनी अधिकार बने रहते हैं।"},
      {heading:"ऑर्डर विवरण संभालें",body:"समस्या हल होने तक ऑर्डर बातचीत और पुष्टि से जुड़ी जानकारी संभालकर रखें।"}
    ]}
  },
  "payment-policy": {
    en:{title:"Payment Policy",subtitle:"Payment is discussed and confirmed directly with the store for each order.",icon:CreditCard,sections:[
      {heading:"Current checkout flow",body:"The website currently prepares an order summary and opens WhatsApp so you can send an order request. It does not present an online card, UPI or payment-gateway checkout in this flow."},
      {heading:"Confirm before paying",body:"Before making any payment, confirm the final items, quantities, total amount, delivery charges (if any) and the payment method directly with the store. Do not transfer money to an account or UPI ID unless the store has confirmed it through a trusted channel."},
      {heading:"Payment proof",body:"If you pay using a method agreed with the store, keep the transaction reference or receipt. Share payment proof only in the order conversation when requested and avoid sharing PINs, OTPs or passwords."},
      {heading:"Refunds and disputes",body:"If a payment issue occurs, contact the store with the order details and transaction reference. Refund handling is subject to applicable law and the confirmed order arrangement; no unverified processing timeline is promised here."}
    ]},
    hi:{title:"भुगतान नीति",subtitle:"हर ऑर्डर के भुगतान की जानकारी स्टोर से सीधे तय और पुष्टि की जाती है।",icon:CreditCard,sections:[
      {heading:"वर्तमान checkout प्रक्रिया",body:"वेबसाइट अभी ऑर्डर सारांश तैयार करके WhatsApp खोलती है ताकि आप ऑर्डर अनुरोध भेज सकें। इस प्रक्रिया में ऑनलाइन कार्ड, UPI या payment gateway checkout उपलब्ध नहीं दिखाया गया है।"},
      {heading:"भुगतान से पहले पुष्टि",body:"भुगतान करने से पहले सामान, मात्रा, कुल राशि, लागू डिलीवरी शुल्क और भुगतान तरीके की पुष्टि स्टोर से करें। किसी खाते या UPI ID पर पैसे तभी भेजें जब स्टोर ने भरोसेमंद माध्यम से पुष्टि की हो।"},
      {heading:"भुगतान प्रमाण",body:"स्टोर से तय तरीके से भुगतान करने पर transaction reference या रसीद संभालें। भुगतान प्रमाण केवल ऑर्डर बातचीत में माँगे जाने पर साझा करें; PIN, OTP या पासवर्ड कभी न दें।"},
      {heading:"रिफंड और विवाद",body:"भुगतान समस्या हो तो ऑर्डर विवरण और transaction reference के साथ स्टोर से संपर्क करें। रिफंड लागू कानून और तय ऑर्डर व्यवस्था के अनुसार होगा; यहाँ कोई अपुष्ट processing समय नहीं बताया गया है।"}
    ]}
  },
  contact: {
    en:{title:"Contact Us",subtitle:"For an order question, product availability or support, use the contact option shown in the checkout conversation.",icon:MessageCircle,sections:[
      {heading:"Order support",body:"The current shopping flow sends order requests to WhatsApp. For an existing request, continue in the same conversation so the store can understand the context."},
      {heading:"Before contacting us",body:"Keep the item names, quantities and any order confirmation details ready. Never share an OTP, UPI PIN, card security code or account password."},
      {heading:"Business contact details",body:"A verified business address, support email, grievance contact and operating hours have not yet been supplied for publication. They will be added here after confirmation rather than displaying unverified details."}
    ]},
    hi:{title:"संपर्क करें",subtitle:"ऑर्डर, सामान की उपलब्धता या सहायता के लिए checkout बातचीत में दिखाए गए संपर्क विकल्प का उपयोग करें।",icon:MessageCircle,sections:[
      {heading:"ऑर्डर सहायता",body:"वर्तमान शॉपिंग प्रक्रिया ऑर्डर अनुरोध WhatsApp पर भेजती है। पहले से अनुरोध भेजा है तो उसी बातचीत में आगे बात करें ताकि स्टोर संदर्भ समझ सके।"},
      {heading:"संपर्क से पहले",body:"सामान के नाम, मात्रा और ऑर्डर पुष्टि की जानकारी तैयार रखें। OTP, UPI PIN, कार्ड सुरक्षा कोड या अकाउंट पासवर्ड कभी साझा न करें।"},
      {heading:"व्यवसाय संपर्क विवरण",body:"सत्यापित व्यवसाय पता, support email, grievance contact और कामकाज के समय अभी प्रकाशन के लिए उपलब्ध नहीं कराए गए हैं। पुष्टि होने पर यहाँ जोड़े जाएँगे; अपुष्ट जानकारी नहीं दिखाई जाएगी।"}
    ]}
  },
  about: {
    en:{title:"About Rashid Mega Mart",subtitle:"A neighbourhood shopping experience for everyday grocery and household needs.",icon:Info,sections:[
      {heading:"What this website offers",body:"Rashid Mega Mart's website lets visitors explore listed products, build a cart and prepare an order request. The current checkout hands the request to WhatsApp for direct confirmation."},
      {heading:"How orders work",body:"Product availability, final prices, delivery arrangements and payment details should be confirmed with the store before an order is treated as accepted."},
      {heading:"Our approach",body:"We aim to make product information easier to browse and order conversations clearer. Business history, legal entity details, registrations and verified operating commitments will be published when supplied and checked."}
    ]},
    hi:{title:"Rashid Mega Mart के बारे में",subtitle:"रोज़मर्रा के किराना और घरेलू सामान के लिए पड़ोस की शॉपिंग सुविधा।",icon:Info,sections:[
      {heading:"वेबसाइट पर क्या उपलब्ध है",body:"Rashid Mega Mart की वेबसाइट पर ग्राहक सूचीबद्ध उत्पाद देख सकते हैं, कार्ट बना सकते हैं और ऑर्डर अनुरोध तैयार कर सकते हैं। वर्तमान checkout अनुरोध को सीधे पुष्टि के लिए WhatsApp पर भेजता है।"},
      {heading:"ऑर्डर कैसे होता है",body:"ऑर्डर स्वीकार मानने से पहले सामान की उपलब्धता, अंतिम कीमत, डिलीवरी व्यवस्था और भुगतान विवरण स्टोर से पक्के करें।"},
      {heading:"हमारा तरीका",body:"हम उत्पाद जानकारी देखना आसान और ऑर्डर बातचीत स्पष्ट बनाने का प्रयास करते हैं। व्यवसाय का इतिहास, कानूनी पहचान, पंजीकरण और सत्यापित सेवाएँ जानकारी मिलने और जाँच होने पर प्रकाशित की जाएँगी।"}
    ]}
  },
  faqs: {
    en:{title:"Frequently Asked Questions",subtitle:"Quick answers about browsing, ordering and delivery.",icon:HelpCircle,sections:[
      {heading:"How do I place an order?",body:"Add products to your cart, continue to checkout and send the prepared request through WhatsApp. The store must confirm the order directly."},
      {heading:"Is my order confirmed after I send WhatsApp message?",body:"No. A sent message is a request only. Wait for the store to confirm availability, total amount and delivery details."},
      {heading:"Can I pay online on this website?",body:"The current checkout flow hands the order request to WhatsApp and does not provide an online payment gateway."},
      {heading:"How much is delivery and how long does it take?",body:"Delivery fee and timing are not guaranteed on this page. Confirm both for your address and order before accepting."},
      {heading:"Can I cancel or return an item?",body:"Contact the store promptly in the order conversation. The outcome depends on the order status, product issue and applicable consumer law."},
      {heading:"Where can I find FSSAI details?",body:"No FSSAI number or licence claim is displayed until the store supplies verified registration details. See the Food Safety page for the current disclosure."}
    ]},
    hi:{title:"अक्सर पूछे जाने वाले सवाल",subtitle:"वेबसाइट, ऑर्डर और डिलीवरी से जुड़े आसान जवाब।",icon:HelpCircle,sections:[
      {heading:"ऑर्डर कैसे करें?",body:"कार्ट में सामान जोड़ें, checkout पर जाएँ और तैयार अनुरोध WhatsApp से भेजें। स्टोर को सीधे ऑर्डर की पुष्टि करनी होगी।"},
      {heading:"WhatsApp संदेश भेजने पर ऑर्डर पक्का हो जाता है?",body:"नहीं। भेजा गया संदेश केवल अनुरोध है। उपलब्धता, कुल राशि और डिलीवरी विवरण की स्टोर से पुष्टि का इंतज़ार करें।"},
      {heading:"क्या वेबसाइट पर ऑनलाइन भुगतान कर सकते हैं?",body:"वर्तमान checkout ऑर्डर अनुरोध WhatsApp पर भेजता है और इसमें ऑनलाइन payment gateway उपलब्ध नहीं है।"},
      {heading:"डिलीवरी का शुल्क और समय कितना है?",body:"इस पेज पर डिलीवरी शुल्क या समय की गारंटी नहीं है। ऑर्डर स्वीकार करने से पहले अपने पते और ऑर्डर के लिए दोनों की पुष्टि करें।"},
      {heading:"क्या सामान रद्द या वापस कर सकते हैं?",body:"ऑर्डर बातचीत में जल्द स्टोर से संपर्क करें। समाधान ऑर्डर की स्थिति, उत्पाद समस्या और लागू उपभोक्ता कानून पर निर्भर करेगा।"},
      {heading:"FSSAI की जानकारी कहाँ मिलेगी?",body:"सत्यापित पंजीकरण जानकारी मिलने तक कोई FSSAI नंबर या लाइसेंस दावा नहीं दिखाया जाता। मौजूदा जानकारी के लिए Food Safety पेज देखें।"}
    ]}
  },
  "grievance-redressal": {
    en:{title:"Grievance Redressal",subtitle:"A clear route for raising an unresolved order, service or privacy concern.",icon:Scale,sections:[
      {heading:"How to raise a concern",body:"Start by replying in the existing order conversation and clearly describe the issue. Include the relevant item and order details, but do not share passwords, OTPs or payment credentials."},
      {heading:"What to include",body:"Share the date of the request, item name, a short description of the issue and any relevant transaction or confirmation reference. Share only information needed to understand the complaint."},
      {heading:"Grievance officer details",body:"A formally designated grievance officer's name, postal address, email and response timeline have not yet been provided or verified. These details will be published once the business confirms the responsible person and process."},
      {heading:"Consumer rights",body:"This page does not limit any consumer rights or complaint options available under applicable Indian law."}
    ]},
    hi:{title:"शिकायत निवारण",subtitle:"ऑर्डर, सेवा या गोपनीयता से जुड़ी समस्या उठाने का स्पष्ट तरीका।",icon:Scale,sections:[
      {heading:"शिकायत कैसे करें",body:"पहले से चल रही ऑर्डर बातचीत में जवाब देकर समस्या साफ-साफ बताएं। संबंधित सामान और ऑर्डर विवरण दें, लेकिन पासवर्ड, OTP या भुगतान credentials साझा न करें।"},
      {heading:"क्या जानकारी दें",body:"अनुरोध की तारीख, सामान का नाम, समस्या का छोटा विवरण और संबंधित transaction या confirmation reference दें। शिकायत समझने के लिए जरूरी जानकारी ही साझा करें।"},
      {heading:"Grievance Officer विवरण",body:"औपचारिक रूप से नियुक्त grievance officer का नाम, डाक पता, ईमेल और जवाब देने की समय-सीमा अभी उपलब्ध या सत्यापित नहीं है। जिम्मेदार व्यक्ति और प्रक्रिया की पुष्टि के बाद ये विवरण प्रकाशित होंगे।"},
      {heading:"उपभोक्ता अधिकार",body:"यह पेज लागू भारतीय कानून के तहत उपलब्ध उपभोक्ता अधिकारों या शिकायत विकल्पों को सीमित नहीं करता।"}
    ]}
  },
  "food-safety": {
    en:{title:"Food Safety & FSSAI Information",subtitle:"Food-safety information is shown transparently; no registration number is claimed until verified.",icon:Leaf,sections:[
      {heading:"FSSAI registration disclosure",body:"The store has not yet supplied a verified 14-digit FSSAI licence or registration number and legal food-business name for this website. For that reason, this page does not display an FSSAI logo, certificate, number or claim of registration."},
      {heading:"What customers should check",body:"For packaged food, check the original label for the product name, ingredients, allergen information, net quantity, batch details, best-before/use-by date and the FSSAI number printed by the manufacturer or responsible food business operator."},
      {heading:"Product and packaging information",body:"Product images and catalogue descriptions are for browsing. Refer to the actual product packaging for authoritative ingredient, allergen, storage and date information. Contact the store before ordering if a listing is unclear."},
      {heading:"Compliance details to be added",body:"Once verified, this page can be updated with the responsible legal business name, applicable FSSAI licence/registration number and relevant food-business disclosures. The correct licence category and any e-commerce obligations must be confirmed for the actual business model."},
      {heading:"Report a food-safety concern",body:"If you notice damaged packaging, a suspected quality issue or a date/label concern, do not consume the product. Keep the packaging and purchase details and raise the concern through the store's order conversation."}
    ]},
    hi:{title:"खाद्य सुरक्षा और FSSAI जानकारी",subtitle:"खाद्य सुरक्षा जानकारी पारदर्शी रूप से दी गई है; सत्यापन से पहले कोई पंजीकरण दावा नहीं।",icon:Leaf,sections:[
      {heading:"FSSAI पंजीकरण जानकारी",body:"स्टोर ने अभी इस वेबसाइट के लिए सत्यापित 14 अंकों का FSSAI लाइसेंस/पंजीकरण नंबर और कानूनी food-business नाम उपलब्ध नहीं कराया है। इसलिए यहाँ FSSAI लोगो, प्रमाणपत्र, नंबर या पंजीकृत होने का दावा नहीं दिखाया गया है।"},
      {heading:"ग्राहक क्या जाँचें",body:"पैक किए गए खाद्य पदार्थ पर उत्पाद का नाम, सामग्री, allergen जानकारी, कुल मात्रा, batch विवरण, best-before/use-by तारीख और निर्माता/जिम्मेदार food business operator का FSSAI नंबर देखें।"},
      {heading:"उत्पाद और पैकेजिंग जानकारी",body:"उत्पाद फोटो और कैटलॉग विवरण देखने के लिए हैं। सामग्री, एलर्जी, भंडारण और तारीख की सही जानकारी के लिए असली पैकेजिंग देखें। सूची अस्पष्ट हो तो ऑर्डर से पहले स्टोर से पूछें।"},
      {heading:"अनुपालन विवरण बाद में जोड़े जाएँगे",body:"सत्यापन के बाद इस पेज पर जिम्मेदार कानूनी व्यवसाय नाम, लागू FSSAI लाइसेंस/पंजीकरण नंबर और संबंधित खाद्य व्यवसाय जानकारी जोड़ी जा सकती है। सही लाइसेंस श्रेणी और e-commerce दायित्व वास्तविक व्यवसाय मॉडल के अनुसार पुष्टि किए जाने चाहिए।"},
      {heading:"खाद्य सुरक्षा समस्या बताएं",body:"पैकेट खराब हो, गुणवत्ता पर संदेह हो या तारीख/लेबल में समस्या दिखे तो उत्पाद का सेवन न करें। पैकेजिंग और खरीद विवरण संभालकर ऑर्डर बातचीत में समस्या बताएं।"}
    ]}
  }
};

const routes = [
  ["privacy-policy","Privacy Policy","गोपनीयता नीति"],["terms-and-conditions","Terms & Conditions","नियम और शर्तें"],
  ["shipping-policy","Shipping & Delivery","शिपिंग और डिलीवरी"],["cancellation-refund","Cancellation & Refund","रद्द और रिफंड"],
  ["return-replacement","Returns & Replacement","रिटर्न और रिप्लेसमेंट"],["payment-policy","Payment Policy","भुगतान नीति"],
  ["contact","Contact Us","संपर्क करें"],["about","About Us","हमारे बारे में"],["faqs","FAQs","अक्सर पूछे जाने वाले सवाल"],
  ["grievance-redressal","Grievance Redressal","शिकायत निवारण"],["food-safety","Food Safety & FSSAI","खाद्य सुरक्षा और FSSAI"]
] as const;

export default function PolicyPage({ slug }: { slug: string }) {
  const { language } = useLanguage();
  const hi = language === "hi";
  const policy = copy[slug]?.[hi ? "hi" : "en"];
  const pageRef = useRef<HTMLElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [progress, setProgress] = useState(0);
  const date = "5 November 2026";
  const Icon = policy?.icon ?? FileText;
  const toc = useMemo(() => policy?.sections.map((s,i)=>({id:"section-"+i,title:s.heading})) ?? [],[policy]);

  useEffect(() => {
    if (!pageRef.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(".policy-hero-item",{y:24,opacity:0},{y:0,opacity:1,duration:.8,stagger:.1,ease:"power3.out"});
      gsap.fromTo(".policy-section",{y:22,opacity:0},{y:0,opacity:1,duration:.65,stagger:.09,ease:"power3.out",scrollTrigger:{trigger:".policy-content",start:"top 82%",once:true}});
    },pageRef);
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    update();
    window.addEventListener("scroll",update,{passive:true});
    return () => { window.removeEventListener("scroll",update); ctx.revert(); };
  },[slug]);

  if (!policy) return <main className="min-h-[60vh] px-5 py-24 text-center"><h1 className="text-3xl font-black text-[#5a1023]">Page not found</h1><Link href="/" className="mt-5 inline-flex text-sm font-bold text-[#800020]">Back home</Link></main>;

  return (
    <main ref={pageRef} className="min-h-screen bg-[#FFFCF0] pb-24 pt-[112px] text-[#382b2b] xl:pb-10">
      <div className="fixed left-0 right-0 top-0 z-[70] h-[3px] bg-[#800020]/10"><div className="h-full bg-gradient-to-r from-[#800020] to-[#c39a56]" style={{width:progress+"%"}} /></div>
      <div className="mx-auto max-w-[1180px] px-4 sm:px-7">
        <Link href="/" className="policy-hero-item inline-flex items-center gap-2 text-xs font-bold text-[#8a7465] transition hover:text-[#800020]"><ArrowLeft size={15}/>{hi?"होम पर वापस":"Back to home"}</Link>
        <section className="relative mt-5 overflow-hidden rounded-[28px] border border-white/80 bg-[linear-gradient(125deg,rgba(255,255,255,.94),rgba(250,241,225,.78))] p-6 shadow-[0_18px_55px_rgba(87,48,32,.07)] backdrop-blur-xl sm:p-10">
          <div className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full bg-[#c39a56]/10 blur-3xl"/>
          <div className="policy-hero-item relative flex h-12 w-12 items-center justify-center rounded-2xl border border-[#eadcc8] bg-white/80 text-[#800020] shadow-sm"><Icon size={23}/></div>
          <p className="policy-hero-item relative mt-6 text-[10px] font-black uppercase tracking-[.25em] text-[#a77b3e]">RASHID MEGA MART · {hi?"जानकारी":"INFORMATION"}</p>
          <h1 className="policy-hero-item relative mt-2 max-w-3xl text-[clamp(30px,5vw,54px)] font-extrabold leading-[1.08] tracking-[-.055em] text-[#5a1023]">{policy.title}</h1>
          <p className="policy-hero-item relative mt-4 max-w-2xl text-sm leading-7 text-[#74645b] sm:text-base">{policy.subtitle}</p>
          <div className="policy-hero-item relative mt-6 flex flex-wrap items-center gap-3 text-[11px] font-semibold text-[#8d7e73]"><span className="inline-flex items-center gap-1.5 rounded-full border border-[#e8ddcf] bg-white/65 px-3 py-1.5"><Clock3 size={13}/>{hi?"आखिरी अपडेट":"Last updated"}: {date}</span><span>{hi?"भारत":"India"}</span></div>
        </section>

        <div className="mt-7 grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="h-fit rounded-2xl border border-[#eee3d5] bg-white/65 p-5 shadow-[0_8px_25px_rgba(87,48,32,.035)] lg:sticky lg:top-24">
            <h2 className="text-[10px] font-black uppercase tracking-[.2em] text-[#a77b3e]">{hi?"इस पेज पर":"ON THIS PAGE"}</h2>
            <nav className="mt-4 space-y-1.5">{toc.map((item,i)=><a key={item.id} href={"#"+item.id} className="group flex items-start gap-2 rounded-lg px-2.5 py-2 text-xs font-semibold leading-5 text-[#75665e] transition hover:bg-[#f8f0e5] hover:text-[#800020]"><span className="mt-0.5 text-[10px] text-[#b88a42]">0{i+1}</span>{item.title}</a>)}</nav>
          </aside>
          <div className="policy-content min-w-0 space-y-4">
            {policy.sections.map((section,i)=>(
              <section id={"section-"+i} key={section.heading} className="policy-section scroll-mt-28 rounded-2xl border border-[#eee4d8] bg-white/75 p-5 shadow-[0_8px_24px_rgba(87,48,32,.035)] backdrop-blur-sm sm:p-7">
                {slug==="faqs" ? <><button type="button" aria-expanded={openFaq===i} onClick={()=>setOpenFaq(openFaq===i?null:i)} className="flex w-full items-center justify-between gap-4 text-left"><h2 className="text-base font-extrabold leading-6 text-[#5a1023] sm:text-lg">{section.heading}</h2><ChevronDown size={18} className={"shrink-0 text-[#a77b3e] transition-transform duration-300 "+(openFaq===i?"rotate-180":"")}/></button>{openFaq===i&&<p className="mt-4 border-t border-[#f0e8dd] pt-4 text-sm leading-7 text-[#716259]">{section.body}</p>}</> :
                <><h2 className="text-base font-extrabold leading-6 text-[#5a1023] sm:text-lg">{section.heading}</h2><p className="mt-3 text-sm leading-7 text-[#716259]">{section.body}</p></>}
              </section>
            ))}
          </div>
        </div>

        <section className="mt-7 flex flex-col gap-4 rounded-2xl border border-[#e8dac6] bg-[linear-gradient(120deg,#fff9ee,#fff)] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <div><p className="text-sm font-extrabold text-[#5a1023]">{hi?"कुछ और मदद चाहिए?":"Need more help?"}</p><p className="mt-1 text-xs leading-6 text-[#7d6e64]">{hi?"ऑर्डर और सहायता के लिए FAQ या संपर्क पेज देखें।":"Visit FAQs or Contact Us for order-related information."}</p></div>
          <div className="flex flex-wrap gap-2"><Link href="/faqs" className="inline-flex h-10 items-center gap-2 rounded-full border border-[#e6d9c8] bg-white px-4 text-xs font-bold text-[#6c2436] transition hover:-translate-y-0.5 hover:shadow-md">{hi?"FAQs देखें":"View FAQs"}<ArrowUpRight size={13}/></Link><Link href="/contact" className="inline-flex h-10 items-center gap-2 rounded-full bg-[#800020] px-4 text-xs font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#650019]">{hi?"संपर्क करें":"Contact"}<ArrowUpRight size={13}/></Link></div>
        </section>
        <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 border-t border-[#eadfce] pt-5 text-[11px] font-semibold text-[#958578]">{routes.filter(([s])=>s!==slug).map(([s,en,hiLabel])=><Link key={s} href={"/"+s} className="transition hover:text-[#800020]">{hi?hiLabel:en}</Link>)}</div>
      </div>
    </main>
  );
}
