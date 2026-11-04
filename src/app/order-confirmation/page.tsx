import { Suspense } from "react";
import { OrderConfirmationPage } from "../components/CustomerPages";
export default function Page() { return <Suspense fallback={<main className="min-h-screen pt-32 text-center">Loading order...</main>}><OrderConfirmationPage /></Suspense>; }
