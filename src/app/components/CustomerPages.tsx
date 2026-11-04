"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { AlertCircle, FileDown, Headset, LoaderCircle, MapPin, Package, RotateCcw, Truck, UserRound, XCircle } from "lucide-react";

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
  const [actionMessage, setActionMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleTrack(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setActionMessage("");
    if (!orderId.trim()) {
      setLookupMessage("Please enter your order ID.");
      return;
    }
    setIsLoading(true);
    setLookupMessage("Secure order lookup is not connected yet. Your order details will appear here after backend integration.");
    setIsLoading(false);
  }

  function handleUnavailableAction(action: string) {
    setActionMessage(`${action} will be available when your order is securely loaded and its eligibility is confirmed.`);
  }

  return (
    <main className="relative z-0 min-h-[calc(100svh-76px)] overflow-hidden bg-[radial-gradient(ellipse_at_top_left,_rgba(167,123,62,0.16),_transparent_42%),linear-gradient(135deg,#fffaf0_0%,#f7edf0_48%,#f8f4e9_100%)] px-3 py-4 sm:px-5 sm:py-6">
      <div className="relative mx-auto w-full max-w-[1060px]">
        <section className="overflow-hidden rounded-2xl border border-white/80 bg-white/65 shadow-[0_18px_55px_rgba(80,32,48,0.10)] backdrop-blur-2xl sm:rounded-[22px]">
          <header className="flex items-center justify-between gap-3 border-b border-white/80 bg-white/55 px-4 py-3.5 backdrop-blur-xl sm:px-6 sm:py-4">
            <div className="flex min-w-0 items-center gap-3">
              <Image src="/Logo.png" alt="Rashid Mega Mart" width={48} height={48} priority className="h-10 w-10 shrink-0 rounded-xl object-contain sm:h-12 sm:w-12" />
              <div className="min-w-0">
                <p className="truncate text-sm font-extrabold leading-tight tracking-tight text-[#5a1023] sm:text-base">Rashid Mega Mart</p>
                <p className="mt-0.5 text-xs font-semibold tracking-[0.13em] text-[#a77b3e] sm:text-sm">YOUR TRUSTED GROCERY STORE</p>
              </div>
            </div>
            <Link href="/" className="shrink-0 rounded-lg px-2.5 py-2 text-sm font-bold text-[#800020] transition hover:bg-[#fff6ed] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#800020] sm:text-sm">Back to store</Link>
          </header>

          <div className="p-4 sm:p-6 lg:p-7">
            <div className="mb-4">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#a77b3e]">Order updates</p>
              <h1 className="mt-1 text-[25px] font-extrabold leading-tight tracking-tight text-[#241b1b] sm:text-3xl">Track your order</h1>
              <p className="mt-1.5 max-w-lg text-sm leading-5 text-[#716760]">Track delivery, view items and manage your order in one place.</p>
            </div>

            <form onSubmit={handleTrack} className="flex flex-col gap-2.5 sm:flex-row sm:items-end">
              <label className="min-w-0 flex-1">
                <span className="mb-1.5 block text-sm font-bold text-[#4d413a]">Order ID</span>
                <input value={orderId} onChange={(event) => { setOrderId(event.target.value); setLookupMessage(""); }} placeholder="Enter your order ID" autoComplete="off" className="h-11 w-full rounded-xl border border-[#e7ded2] bg-[#fffdf9] px-3.5 text-sm text-[#241b1b] outline-none transition placeholder:text-[#a69b90] focus:border-[#800020] focus:ring-4 focus:ring-[#800020]/10" />
              </label>
              <button type="submit" disabled={isLoading} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#800020] px-6 text-sm font-bold text-white transition hover:bg-[#650019] disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#800020]">
                {isLoading && <LoaderCircle size={16} className="animate-spin" />}
                {isLoading ? "Checking..." : "Track order"}
              </button>
            </form>
            {lookupMessage && <p role="status" className="mt-2 flex items-start gap-2 rounded-lg border border-[#f0dfc7] bg-[#fff8ed] px-3 py-2 text-sm leading-5 text-[#704d20]"><AlertCircle size={15} className="mt-0.5 shrink-0" />{lookupMessage}</p>}

            <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1.25fr)_minmax(270px,.75fr)]">
              <section className="min-w-0 rounded-xl border border-white/90 bg-white/70 p-3.5 shadow-[0_8px_24px_rgba(80,32,48,0.055)] backdrop-blur-xl sm:p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h2 className="text-sm font-extrabold text-[#29211d] sm:text-base">Order details</h2>
                    <p className="mt-0.5 text-sm text-[#82776e]">Your items and order summary</p>
                  </div>
                  <span className="rounded-full bg-[#f5eee4] px-2.5 py-1 text-xs font-bold text-[#806342]">Awaiting order data</span>
                </div>

                <div className="mt-4 flex gap-3 rounded-xl bg-white/65 p-3">
                  <div className="grid h-[76px] w-[76px] shrink-0 place-items-center rounded-lg border border-[#eee5d8] bg-white text-[#a77b3e] sm:h-[88px] sm:w-[88px]">
                    <Package size={30} strokeWidth={1.6} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-[#332923]">Product details appear here</p>
                    <p className="mt-1 text-sm leading-4 text-[#82776e]">Product name, variant and image will load from your order.</p>
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-[#62574e]">
                      <span>Qty: —</span><span>Price: —</span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 space-y-2 border-t border-dashed border-[#e9e0d5] pt-3 text-sm">
                  <div className="flex justify-between gap-3"><span className="text-[#82776e]">Items total</span><span className="font-semibold text-[#332923]">—</span></div>
                  <div className="flex justify-between gap-3"><span className="text-[#82776e]">Delivery charges</span><span className="font-semibold text-[#332923]">—</span></div>
                  <div className="flex justify-between gap-3 border-t border-[#f0ebe2] pt-2 text-sm"><span className="font-extrabold text-[#332923]">Order total</span><span className="font-extrabold text-[#800020]">—</span></div>
                </div>

                <button type="button" onClick={() => handleUnavailableAction("PDF invoice download")} className="mt-3 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg border border-[#800020]/20 bg-white px-3 py-2 text-sm font-bold text-[#800020] transition hover:bg-[#fff7f4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#800020]">
                  <FileDown size={16} /> Download invoice (PDF)
                </button>
              </section>

              <section className="min-w-0 rounded-xl border border-white/90 bg-white/55 p-3.5 shadow-[0_8px_24px_rgba(80,32,48,0.045)] backdrop-blur-xl sm:p-4">
                <h2 className="text-sm font-extrabold text-[#29211d] sm:text-base">Delivery information</h2>
                <div className="mt-3 flex items-start gap-2.5">
                  <MapPin size={17} className="mt-0.5 shrink-0 text-[#800020]" />
                  <div><p className="text-sm font-bold text-[#332923]">Delivery address</p><p className="mt-0.5 text-sm leading-5 text-[#82776e]">Your saved delivery address will appear after secure order lookup.</p></div>
                </div>
                <div className="mt-4 border-t border-white/80 pt-3">
                  <div className="flex items-center gap-2">
                    <Truck size={17} className="text-[#800020]" />
                    <p className="text-sm font-bold text-[#332923]">Your delivery partner</p>
                    <span className="ml-auto rounded-full bg-[#e8f4eb] px-2 py-1 text-[11px] font-bold text-[#28633b]">Assigned</span>
                  </div>
                  <div className="mt-3 flex items-center gap-3 rounded-xl border border-white/90 bg-white/65 p-3 shadow-[0_5px_18px_rgba(80,32,48,0.045)]">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#800020] to-[#a77b3e] text-sm font-extrabold text-white shadow-md">SK</div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-extrabold text-[#332923]">Shahbaj Khan</p>
                      <p className="mt-0.5 text-sm text-[#786e65]">Delivery Partner</p>
                    </div>
                    <span className="rounded-lg bg-[#f5eee4] px-2 py-1 text-xs font-bold text-[#6e4b28]">25 · Male</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-sm text-[#82776e]"><UserRound size={13} /> Partner profile provided by Rashid Mega Mart</div>
                </div>
                <div className="mt-4 rounded-lg bg-[#f5eee4] p-3">
                  <p className="text-sm font-bold text-[#5a1023]">Delivery updates</p>
                  <p className="mt-1 text-sm leading-4 text-[#786e65]">Estimated date and live status will update from your order record.</p>
                </div>
              </section>
            </div>

            <section className="mt-4 rounded-xl border border-white/90 bg-white/70 p-3.5 shadow-[0_8px_24px_rgba(80,32,48,0.055)] backdrop-blur-xl sm:p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-sm font-extrabold text-[#29211d] sm:text-base">Tracking timeline</h2>
                <span className="text-xs font-semibold text-[#82776e]">Order journey</span>
              </div>
              <ol className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {["Order Placed", "Processing", "Out for Delivery", "Delivered"].map((step, index) => (
                  <li key={step} className="flex min-w-0 items-start gap-2">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-[#e4d8c7] bg-[#fffdf8] text-sm font-extrabold text-[#800020]">{index + 1}</span>
                    <div className="min-w-0"><p className="text-sm font-bold leading-4 text-[#332923]">{step}</p><p className="mt-0.5 text-sm leading-4 text-[#82776e]">Status pending</p></div>
                  </li>
                ))}
              </ol>
            </section>

            <section className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-white/90 bg-white/55 p-3.5 shadow-[0_8px_24px_rgba(80,32,48,0.045)] backdrop-blur-xl sm:p-4">
                <h2 className="text-sm font-extrabold text-[#29211d]">Cancel order</h2>
                <p className="mt-1 text-sm leading-5 text-[#82776e]">Cancellation is available only when your order status and store policy allow it.</p>
                <button type="button" onClick={() => handleUnavailableAction("Order cancellation")} className="mt-3 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg border border-[#e8d8d8] bg-white px-3 py-2 text-sm font-bold text-[#800020] transition hover:bg-[#fff5f5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#800020]"><XCircle size={15} /> Check cancellation eligibility</button>
              </div>
              <div className="rounded-xl border border-[#eee8de] bg-[#fffdf8] p-3.5 sm:p-4">
                <h2 className="text-sm font-extrabold text-[#29211d]">Return / replacement</h2>
                <p className="mt-1 text-sm leading-5 text-[#82776e]">Return options appear only for eligible products within the applicable return window.</p>
                <button type="button" onClick={() => handleUnavailableAction("Return or replacement")} className="mt-3 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg border border-[#e8d8d8] bg-white px-3 py-2 text-sm font-bold text-[#800020] transition hover:bg-[#fff5f5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#800020]"><RotateCcw size={15} /> Check return eligibility</button>
              </div>
            </section>

            {actionMessage && <p role="status" className="mt-3 flex items-start gap-2 rounded-lg border border-[#f0dfc7] bg-[#fff8ed] px-3 py-2 text-sm leading-5 text-[#704d20]"><AlertCircle size={15} className="mt-0.5 shrink-0" />{actionMessage}</p>}

            <footer className="mt-4 flex flex-col gap-2 rounded-xl bg-[#5a1023] p-3.5 text-white sm:flex-row sm:items-center sm:justify-between sm:px-4">
              <div><p className="text-sm font-extrabold">Need help with your order?</p><p className="mt-0.5 text-sm text-white/75">Rashid Mega Mart customer support · Rewa, Madhya Pradesh</p></div>
              <a href="https://wa.me/918962531603" target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-extrabold text-[#5a1023] transition hover:bg-[#fff3df]"><Headset size={15} /> Contact support</a>
            </footer>
            <p className="mt-3 text-center text-xs leading-4 text-[#978b80]">Order information, invoice and action eligibility will be displayed after secure order verification.</p>
          </div>
        </section>
      </div>
    </main>
  );
}

export function MyOrdersPage() {
  return <CenterPage title="MY ORDERS PAGE" />;
}
