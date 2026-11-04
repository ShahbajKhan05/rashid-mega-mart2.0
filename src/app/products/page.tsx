import { Suspense } from "react";
import { ProductsPage } from "../components/CustomerPages";
export default function Page() { return <Suspense fallback={<main className="min-h-screen pt-32 text-center">Loading products...</main>}><ProductsPage /></Suspense>; }
