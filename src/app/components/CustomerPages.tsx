"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "./LanguageProvider";
import Image from "next/image";
import { AlertCircle, FileDown, Headset, LoaderCircle, MapPin, Package, RotateCcw, Truck, UserRound, XCircle } from "lucide-react";

function CenterPage({ title }: { title: string }) {
  const { language } = useLanguage();
  const labels: Record<string, string> = { "PRODUCTS PAGE": "उत्पाद", "PRODUCT DETAILS PAGE": "उत्पाद की जानकारी", "CART PAGE": "कार्ट", "CHECKOUT PAGE": "चेकआउट", "ORDER CONFIRMATION PAGE": "ऑर्डर की पुष्टि" };
  return (
    <main className="fixed inset-0 z-0 flex items-center justify-center px-4 pointer-events-none">
      <h1 className="text-center text-2xl font-semibold tracking-[0.08em] text-[#263B2B] sm:text-3xl md:text-4xl">
        {title}
      </h1>
    </main>
  );
}

export function ProductsPage() {
  return <CenterPage title="PRODUCTS PAGE" />;
}

export function ProductDetailPage() {
  return <CenterPage title="PRODUCT DETAILS PAGE" />;
}

export function CartPage() {
  return <CenterPage title="CART PAGE" />;
}

export function CheckoutPage() {
  return <CenterPage title="CHECKOUT PAGE" />;
}

export function OrderConfirmationPage() {
  return <CenterPage title="ORDER CONFIRMATION PAGE" />;
}

const trackingSteps = [
  { title: "Order Placed", description: "We have received your order." },
  { title: "Processing", description: "Your order is being prepared." },
  { title: "Out for Delivery", description: "Your order is on its way." },
  { title: "Delivered", description: "Your order has reached you." },
] as const;

export function TrackOrderPage() {
  const { language } = useLanguage();
  const isHindi = language === "hi";
  const [orderId, setOrderId] = useState("");
  const [lookupMessage, setLookupMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleTrack(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = orderId.trim();
    if (!value) {
      setLookupMessage(isHindi ? "कृपया अपना ऑर्डर आईडी दर्ज करें।" : "Please enter your order ID.");
      return;
    }

    setIsLoading(true);
    setLookupMessage(isHindi ? "ऑर्डर ट्रैकिंग अभी डेटाबेस से जुड़ी नहीं है। फिलहाल ऑर्डर की जानकारी सत्यापित नहीं हो सकती।" : "Order tracking is not connected to the order database yet. No order details can be verified right now.");
    setIsLoading(false);
  }

  return (
    <main className="min-h-[calc(100svh-76px)] bg-[#fffaf2] px-3 py-6 text-[#2d2424] sm:px-5 sm:py-9">
      <div className="mx-auto w-full max-w-2xl">
        <header className="mb-7 flex flex-col items-center text-center">
          <Link href="/" aria-label={isHindi ? "राशिद मेगा मार्ट होम" : "Rashid Mega Mart home"} className="mb-5 inline-flex items-center justify-center">
            <Image src="/Logo.png" alt="Rashid Mega Mart" width={520} height={190} priority className="h-auto max-h-[82px] w-auto max-w-[min(76vw,300px)] object-contain sm:max-h-[104px] sm:max-w-[360px]" />
          </Link>
          <span className="rounded-full border border-[#ead9bd] bg-white px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-[.18em] text-[#a77b3e]">{isHindi ? "ऑर्डर अपडेट" : "Order updates"}</span>
          <h1 className="mt-3 text-[clamp(1.8rem,6vw,2.65rem)] font-extrabold leading-tight tracking-[-.045em] text-[#800020]">{isHindi ? "अपना ऑर्डर ट्रैक करें" : "Track your order"}</h1>
          <p className="mt-2 max-w-md text-sm leading-6 text-[#716760] sm:text-base">{isHindi ? "डिलीवरी की नई जानकारी देखने के लिए अपना ऑर्डर आईडी डालें।" : "Enter your order ID to check the latest delivery update."}</p>
        </header>

        <section className="rounded-2xl border border-[#eee2d3] bg-white p-4 shadow-[0_14px_42px_rgba(80,32,48,.07)] sm:rounded-3xl sm:p-7">
          <form onSubmit={handleTrack} className="flex flex-col gap-3 sm:flex-row">
            <label className="min-w-0 flex-1">
              <span className="mb-2 block text-sm font-bold text-[#493b36]">{isHindi ? "ऑर्डर आईडी" : "Order ID"}</span>
              <input
                value={orderId}
                onChange={(event) => { setOrderId(event.target.value); setLookupMessage(""); }}
                placeholder={isHindi ? "जैसे RMM-1024" : "e.g. RMM-1024"}
                autoComplete="off"
                aria-label={isHindi ? "ऑर्डर आईडी" : "Order ID"}
                className="h-12 w-full rounded-xl border border-[#e7ded2] bg-[#fffdf9] px-4 text-base text-[#241b1b] outline-none transition placeholder:text-[#a69b90] focus:border-[#800020] focus:ring-4 focus:ring-[#800020]/10"
              />
            </label>
            <button type="submit" disabled={isLoading} className="mt-auto inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#800020] px-6 text-sm font-extrabold text-white transition hover:bg-[#650019] disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#800020] sm:min-w-[150px]">
              {isLoading ? <LoaderCircle size={17} className="animate-spin" /> : <Package size={17} />}
              {isHindi ? "ऑर्डर ट्रैक करें" : "Track order"}
            </button>
          </form>
          {lookupMessage && (
            <p role="status" className="mt-4 rounded-xl border border-[#f0dfc7] bg-[#fff8ed] px-4 py-3 text-sm leading-5 text-[#704d20]">
              {lookupMessage}
            </p>
          )}
          <div className="mt-5 flex items-start gap-3 rounded-xl bg-[#faf5ed] p-3.5">
            <AlertCircle size={18} className="mt-0.5 shrink-0 text-[#a77b3e]" />
            <p className="text-xs leading-5 text-[#76665c] sm:text-sm">{isHindi ? "चेकआउट के बाद आपका ऑर्डर आईडी मिलेगा। डिलीवरी की जानकारी के लिए इसे संभालकर रखें।" : "Your order ID is shared after checkout. Keep it handy to check delivery progress."}</p>
          </div>
        </section>

        <section className="mt-5 rounded-2xl border border-[#eee2d3] bg-white p-4 shadow-[0_10px_30px_rgba(80,32,48,.045)] sm:rounded-3xl sm:p-6">
          <h2 className="text-base font-extrabold text-[#332923] sm:text-lg">{isHindi ? "ट्रैकिंग कैसे काम करती है" : "How tracking works"}</h2>
          <p className="mt-1 text-sm leading-5 text-[#82776e]">{isHindi ? "आपका ऑर्डर इन चार आसान चरणों से गुजरता है।" : "Your order moves through these four simple steps."}</p>
          <ol className="mt-5 grid gap-4 sm:grid-cols-4 sm:gap-3">
            {trackingSteps.map((step, index) => (
              <li key={step.title} className="relative flex min-w-0 items-start gap-3 sm:flex-col sm:gap-2.5">
                {index < trackingSteps.length - 1 && <span aria-hidden="true" className="absolute left-[15px] top-8 h-[calc(100%+8px)] w-px bg-[#e8ded1] sm:left-8 sm:top-[15px] sm:h-px sm:w-[calc(100%+12px)]" />}
                <span className="relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-[#e6d8c8] bg-[#fffdf8] text-sm font-extrabold text-[#800020]">{index + 1}</span>
                <div className="min-w-0 pb-1 sm:pb-0">
                  <p className="text-sm font-extrabold leading-5 text-[#332923]">{isHindi ? ["ऑर्डर मिला", "तैयारी जारी", "डिलीवरी के लिए निकला", "डिलीवर हो गया"][index] : step.title}</p>
                  <p className="mt-0.5 text-xs leading-5 text-[#82776e]">{isHindi ? ["हमें आपका ऑर्डर मिल गया है।", "आपका ऑर्डर तैयार किया जा रहा है।", "आपका ऑर्डर रास्ते में है।", "आपका ऑर्डर आप तक पहुँच गया है।"][index] : step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <footer className="mt-5 flex flex-col items-center justify-between gap-3 rounded-2xl bg-[#5a1023] px-4 py-4 text-center text-white sm:flex-row sm:px-5 sm:text-left">
          <div>
            <p className="text-sm font-extrabold">{isHindi ? "मदद चाहिए?" : "Need help?"}</p>
            <p className="mt-0.5 text-xs text-white/75">Rashid Mega Mart · Rewa, Madhya Pradesh</p>
          </div>
          <a href="https://wa.me/918962531603" target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center justify-center rounded-lg bg-white px-4 py-2 text-sm font-extrabold text-[#5a1023] transition hover:bg-[#fff3df]">{isHindi ? "WhatsApp पर संपर्क करें" : "Contact on WhatsApp"}</a>
        </footer>
      </div>
    </main>
  );
}

export function MyOrdersPage() {
  const { language } = useLanguage();
  const isHindi = language === "hi";
  return (
    <main className="min-h-[calc(100svh-76px)] bg-[#fffaf2] px-3 py-6 text-[#2d2424] sm:px-5 sm:py-9">
      <div className="mx-auto w-full max-w-2xl">
        <header className="mb-7 flex flex-col items-center text-center">
          <Link href="/" aria-label="Rashid Mega Mart home" className="mb-5 inline-flex items-center justify-center">
            <Image src="/Logo.png" alt="Rashid Mega Mart" width={520} height={190} priority className="h-auto max-h-[82px] w-auto max-w-[min(76vw,300px)] object-contain sm:max-h-[104px] sm:max-w-[360px]" />
          </Link>
          <span className="rounded-full border border-[#ead9bd] bg-white px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-[.18em] text-[#a77b3e]">{isHindi ? "आपका खाता" : "Your account"}</span>
          <h1 className="mt-3 text-[clamp(1.8rem,6vw,2.65rem)] font-extrabold leading-tight tracking-[-.045em] text-[#800020]">{isHindi ? "मेरे ऑर्डर" : "My Orders"}</h1>
          <p className="mt-2 max-w-md text-sm leading-6 text-[#716760] sm:text-base">{isHindi ? "आपकी सभी खरीदारी एक ही जगह।" : "Your purchases, all in one place."}</p>
        </header>

        <section className="rounded-2xl border border-[#eee2d3] bg-white px-5 py-8 text-center shadow-[0_14px_42px_rgba(80,32,48,.07)] sm:rounded-3xl sm:px-8 sm:py-11">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-[#f8eff0] text-[#800020] sm:h-[76px] sm:w-[76px]">
            <Package size={34} strokeWidth={1.6} />
          </div>
          <h2 className="mt-5 text-xl font-extrabold tracking-tight text-[#332923] sm:text-2xl">{isHindi ? "अभी कोई ऑर्डर नहीं है" : "No orders to show yet"}</h2>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#82776e] sm:text-base">
            {isHindi ? "ऑर्डर हिस्ट्री जुड़ने के बाद राशिद मेगा मार्ट से किए गए ऑर्डर यहाँ दिखाई देंगे।" : "Orders placed with Rashid Mega Mart will appear here once your order history is connected."}
          </p>
          <div className="mx-auto mt-6 flex w-full max-w-sm flex-col gap-3">
            <Link href="/products" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#800020] px-5 text-sm font-extrabold text-white transition hover:bg-[#650019] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#800020]">
              Explore products <span aria-hidden="true">→</span>
            </Link>
            <Link href="/order-tracking" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#e8d8d8] bg-white px-5 text-sm font-bold text-[#800020] transition hover:bg-[#fff7f4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#800020]">
              <Truck size={17} /> Track an existing order
            </Link>
          </div>
        </section>

        <footer className="mt-5 flex flex-col items-center justify-between gap-3 rounded-2xl bg-[#5a1023] px-4 py-4 text-center text-white sm:flex-row sm:px-5 sm:text-left">
          <div>
            <p className="text-sm font-extrabold">{isHindi ? "ऑर्डर में मदद चाहिए?" : "Need help with an order?"}</p>
            <p className="mt-0.5 text-xs text-white/75">Rashid Mega Mart · Rewa, Madhya Pradesh</p>
          </div>
          <a href="https://wa.me/918962531603" target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center justify-center rounded-lg bg-white px-4 py-2 text-sm font-extrabold text-[#5a1023] transition hover:bg-[#fff3df]">{isHindi ? "WhatsApp पर संपर्क करें" : "Contact on WhatsApp"}</a>
        </footer>
      </div>
    </main>
  );
}
