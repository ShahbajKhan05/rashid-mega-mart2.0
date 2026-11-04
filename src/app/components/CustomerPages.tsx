"use client";

import Link from "next/link";
import { CalendarDays, Check, Package, X } from "lucide-react";

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
  {
    title: "Order Placed",
    description: "We've received your order.",
    time: "Order confirmed",
    complete: true,
  },
  {
    title: "Processing",
    description: "Your order is being prepared.",
    time: "Processing",
    complete: true,
  },
  {
    title: "In Transit",
    description: "Your order is on the way.",
    time: "In progress",
    complete: true,
  },
  {
    title: "Delivered",
    description: "Your order will be marked delivered once it reaches you.",
    time: "Pending",
    complete: false,
  },
];

export function TrackOrderPage() {
  return (
    <main className="relative z-0 min-h-[calc(100svh-76px)] overflow-hidden bg-[#FFF9D8] px-3 py-6 sm:px-6 sm:py-10">
      <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-[#D4A84F]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[#800020]/[0.06] blur-3xl" />

      <section
        aria-labelledby="tracking-title"
        className="relative mx-auto w-full max-w-[860px] rounded-[24px] border border-[#eee5d5] bg-white p-5 shadow-[0_18px_60px_rgba(45,30,18,0.08)] sm:rounded-[30px] sm:p-8 md:p-10"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#800020] sm:text-sm">
              Rashid Mega Mart
            </p>
            <h1
              id="tracking-title"
              className="text-[25px] font-bold leading-tight tracking-tight text-[#171717] sm:text-3xl md:text-[38px]"
            >
              Track your order
            </h1>
            <p className="mt-3 text-sm text-[#6b625b] sm:text-base">
              Order <span className="font-semibold text-[#171717]">#RMM-231034</span>
            </p>
            <p className="mt-1 text-sm text-[#6b625b] sm:text-base">
              Grocery order · Order date: 05 Nov 2026
            </p>
          </div>
          <Link
            href="/"
            aria-label="Close order tracking"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#eee5d5] text-[#51443b] transition hover:bg-[#fff9d8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#800020] sm:h-11 sm:w-11"
          >
            <X size={21} />
          </Link>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-3 sm:mt-9 sm:grid-cols-2 sm:gap-4">
          <div className="flex min-h-[104px] items-center gap-3 rounded-2xl bg-[#e1f5e7] p-4 sm:p-5">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/75 text-[#249653]">
              <Package size={23} />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-medium text-[#355c43] sm:text-sm">Current status</p>
              <p className="mt-1 text-lg font-bold text-[#173d27] sm:text-xl">In Transit</p>
            </div>
          </div>

          <div className="flex min-h-[104px] items-center gap-3 rounded-2xl bg-[#e1f4f7] p-4 sm:p-5">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/75 text-[#168ba2]">
              <CalendarDays size={23} />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-medium text-[#315d67] sm:text-sm">Estimated delivery</p>
              <p className="mt-1 text-lg font-bold text-[#173d45] sm:text-xl">To be confirmed</p>
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-10">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-xl font-bold tracking-tight text-[#171717] sm:text-2xl">
              Tracking details
            </h2>
            <span className="rounded-full bg-[#fff5e4] px-3 py-1 text-xs font-semibold text-[#805b22]">
              Order progress
            </span>
          </div>

          <ol className="relative space-y-0">
            {trackingSteps.map((step, index) => {
              const isLast = index === trackingSteps.length - 1;
              return (
                <li key={step.title} className="relative grid grid-cols-[34px_minmax(0,1fr)] gap-3 pb-7 last:pb-0 sm:grid-cols-[42px_minmax(0,1fr)] sm:gap-4 sm:pb-9">
                  {!isLast && (
                    <span
                      aria-hidden="true"
                      className={`absolute left-[16px] top-8 h-[calc(100%-18px)] w-[3px] rounded-full sm:left-[19px] sm:top-9 ${
                        step.complete ? "bg-[#32b965]" : "bg-[#dedede]"
                      }`}
                    />
                  )}
                  <span
                    className={`relative z-10 grid h-[34px] w-[34px] place-items-center rounded-full border-2 sm:h-[40px] sm:w-[40px] ${
                      step.complete
                        ? "border-[#32b965] bg-[#32b965] text-white"
                        : "border-[#d4d4d4] bg-white text-[#b7b7b7]"
                    }`}
                  >
                    <Check size={19} strokeWidth={3} />
                  </span>
                  <div className="min-w-0 pt-0.5">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                      <h3 className="text-base font-semibold text-[#171717] sm:text-lg">
                        {step.title}
                      </h3>
                      <span className="text-xs font-medium text-[#77716b] sm:pt-1 sm:text-sm">
                        {step.time}
                      </span>
                    </div>
                    <p className="mt-1 max-w-[560px] text-sm leading-relaxed text-[#625d58] sm:text-[15px]">
                      {step.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="mt-8 rounded-2xl border border-[#eee5d5] bg-[#fffdf6] p-4 sm:mt-10 sm:flex sm:items-center sm:justify-between sm:gap-4 sm:p-5">
          <div>
            <p className="font-semibold text-[#171717]">Need help with your order?</p>
            <p className="mt-1 text-sm text-[#6b625b]">
              Contact Rashid Mega Mart for an update.
            </p>
          </div>
          <a
            href="https://wa.me/918962531603"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-[#800020] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#640019] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#800020] sm:mt-0 sm:w-auto"
          >
            Contact support
          </a>
        </div>
      </section>
    </main>
  );
}

export function MyOrdersPage() {
  return <CenterPage title="MY ORDERS PAGE" />;
}
