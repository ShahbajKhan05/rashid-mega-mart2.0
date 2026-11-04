"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { Headset, Package, ShieldCheck } from "lucide-react";

function CenterPage({ title }: { title: string }) {
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
  { title: "Processing", description: "Your items are being prepared." },
  { title: "Out for Delivery", description: "Your order is on its way." },
  { title: "Delivered", description: "Your order has reached you." },
] as const;

export function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [lookupMessage, setLookupMessage] = useState("");

  function handleTrack(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLookupMessage(
      orderId.trim()
        ? "Order lookup will be available once secure order tracking is connected."
        : "Please enter your order ID."
    );
  }

  return (
    <main className="relative z-0 min-h-[calc(100svh-76px)] overflow-hidden bg-[#FFFCF0] px-3 py-4 sm:px-5 sm:py-6">
      <div className="relative mx-auto w-full max-w-[1060px]">
        <section className="overflow-hidden rounded-2xl border border-[#eee5d8] bg-white shadow-[0_8px_28px_rgba(54,35,20,0.055)] sm:rounded-[22px]">
          <header className="flex items-center justify-between gap-3 border-b border-[#f0ebe2] px-4 py-3.5 sm:px-6 sm:py-4">
            <div className="flex min-w-0 items-center gap-3">
              <Image
                src="/Logo.png"
                alt="Rashid Mega Mart"
                width={48}
                height={48}
                priority
                className="h-10 w-10 shrink-0 rounded-xl object-contain sm:h-12 sm:w-12"
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-extrabold leading-tight tracking-tight text-[#5a1023] sm:text-base">Rashid Mega Mart</p>
                <p className="mt-0.5 text-[10px] font-semibold tracking-[0.13em] text-[#a77b3e] sm:text-[11px]">YOUR TRUSTED GROCERY STORE</p>
              </div>
            </div>
            <Link href="/" className="shrink-0 rounded-lg px-2.5 py-2 text-xs font-bold text-[#800020] transition hover:bg-[#fff6ed] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#800020] sm:text-sm">
              Back to store
            </Link>
          </header>

          <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.78fr)]">
            <div className="p-4 sm:p-6 lg:p-7">
              <div className="mb-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#a77b3e]">Order updates</p>
                <h1 className="mt-1 text-[25px] font-extrabold leading-tight tracking-tight text-[#241b1b] sm:text-3xl">Track your order</h1>
                <p className="mt-1.5 max-w-lg text-sm leading-5 text-[#716760]">Enter your order ID to see its latest delivery progress.</p>
              </div>

              <form onSubmit={handleTrack} className="flex flex-col gap-2.5 sm:flex-row sm:items-end">
                <label className="min-w-0 flex-1">
                  <span className="mb-1.5 block text-xs font-bold text-[#4d413a]">Order ID</span>
                  <input
                    value={orderId}
                    onChange={(event) => { setOrderId(event.target.value); setLookupMessage(""); }}
                    placeholder="Enter your order ID"
                    autoComplete="off"
                    className="h-11 w-full rounded-xl border border-[#e7ded2] bg-[#fffdf9] px-3.5 text-sm text-[#241b1b] outline-none transition placeholder:text-[#a69b90] focus:border-[#800020] focus:ring-4 focus:ring-[#800020]/10"
                  />
                </label>
                <button type="submit" className="h-11 rounded-xl bg-[#800020] px-6 text-sm font-bold text-white transition hover:bg-[#650019] active:scale-[.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#800020]">
                  Track order
                </button>
              </form>
              {lookupMessage && <p role="status" className="mt-2 rounded-lg bg-[#fff5e8] px-3 py-2 text-xs leading-5 text-[#704d20]">{lookupMessage}</p>}

              <div className="mt-5 rounded-xl border border-[#eee8de] bg-[#fffdf8] p-3.5 sm:p-4">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-sm font-bold text-[#29211d] sm:text-base">How tracking works</h2>
                  <span className="rounded-full bg-[#f5eee4] px-2.5 py-1 text-[10px] font-bold text-[#806342]">4 simple steps</span>
                </div>
                <ol className="mt-4 grid grid-cols-2 gap-x-3 gap-y-4 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                  {trackingSteps.map((step, index) => (
                    <li key={step.title} className="flex min-w-0 items-start gap-2">
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-[#e4d8c7] bg-white text-[11px] font-extrabold text-[#800020]">{index + 1}</span>
                      <div className="min-w-0">
                        <p className="text-xs font-bold leading-4 text-[#332923]">{step.title}</p>
                        <p className="mt-0.5 text-[11px] leading-4 text-[#82776e]">{step.description}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <aside className="border-t border-[#f0ebe2] bg-[#fffdf8] p-4 sm:p-6 lg:border-l lg:border-t-0 lg:p-7">
              <h2 className="text-base font-extrabold text-[#29211d]">Shopping with confidence</h2>
              <p className="mt-1 text-xs leading-5 text-[#786e65]">We keep your order information clear and easy to follow.</p>
              <div className="mt-4 space-y-3">
                <div className="flex items-start gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#f4eadc] text-[#800020]"><Package size={16} /></span>
                  <div><p className="text-xs font-bold text-[#332923]">Clear order updates</p><p className="mt-0.5 text-[11px] leading-4 text-[#82776e]">Follow each step from confirmation to delivery.</p></div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#f4eadc] text-[#800020]"><ShieldCheck size={16} /></span>
                  <div><p className="text-xs font-bold text-[#332923]">Your details matter</p><p className="mt-0.5 text-[11px] leading-4 text-[#82776e]">Order information should only be shown to its customer.</p></div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#f4eadc] text-[#800020]"><Headset size={16} /></span>
                  <div><p className="text-xs font-bold text-[#332923]">Need help?</p><p className="mt-0.5 text-[11px] leading-4 text-[#82776e]">Talk to the Rashid Mega Mart support team.</p></div>
                </div>
              </div>
              <a href="https://wa.me/918962531603" target="_blank" rel="noreferrer" className="mt-5 inline-flex min-h-10 w-full items-center justify-center rounded-xl border border-[#800020]/20 bg-white px-4 py-2.5 text-xs font-extrabold text-[#800020] transition hover:bg-[#fff5f5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#800020]">
                Contact customer support
              </a>
              <p className="mt-3 text-center text-[10px] leading-4 text-[#978b80]">Rashid Mega Mart · Rewa, Madhya Pradesh</p>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}

export function MyOrdersPage() {
  return <CenterPage title="MY ORDERS PAGE" />;
}
