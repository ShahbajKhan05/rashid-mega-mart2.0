// app/components/Navbar.tsx
"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  House, Package, LayoutGrid, X, ArrowUpRight,
  MapPin, Search, ChevronDown, Crosshair, User, Star, Lock, Heart, LogOut, Gift, ShieldCheck, Truck,
  Wheat, Droplet, Flame, Cookie // 🔥 Categories ke liye naye icons import kiye
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useLanguage } from "./LanguageProvider";
import { products, categoryOptions } from "./data";

type Language = "en" | "hi";
const DEFAULT_LOCATION = "Ghoghar, Rewa";

function LanguageToggle({ language, onSelect }: { language: Language; onSelect: (l: Language) => void; }) {
  return (
    <div className="inline-flex h-9 shrink-0 items-center rounded-full border border-white/70 bg-white/45 p-1 shadow-[0_2px_12px_rgba(31,41,55,0.06)] backdrop-blur-xl">
      {(["en", "hi"] as Language[]).map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => onSelect(lang)}
          className={`flex h-full min-w-[32px] items-center justify-center rounded-md text-[10px] font-black transition-all ${
            language === lang ? "bg-[#800020] text-white shadow-[3px_3px_7px_rgba(80,0,24,0.24),inset_1px_1px_2px_rgba(255,255,255,0.25)]" : "text-gray-500 hover:bg-white/70"
          }`}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { language, toggleLanguage } = useLanguage();

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(DEFAULT_LOCATION);
  const [manualLocation, setManualLocation] = useState("");
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState("");

  const isHindi = language === "hi";

  useEffect(() => {
    const saved = localStorage.getItem("rmm_location");
    if (saved) setSelectedLocation(saved);

  }, []);

  const handleLiveLocation = () => {
    setIsLocating(true);
    setLocationError("");
    if (!navigator.geolocation) {
      setLocationError("Geolocation not supported.");
      setIsLocating(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`);
          const data = await res.json();
          const city = data.address.city || data.address.town || data.address.village || "";
          const suburb = data.address.suburb || data.address.neighbourhood || "";
          const state = data.address.state || "";

          let finalAddress = suburb && city ? `${suburb}, ${city}` : city ? `${city}, ${state}` : data.display_name.split(",").slice(0, 2).join(",");
          setSelectedLocation(finalAddress);
          localStorage.setItem("rmm_location", finalAddress);
          setLocationModalOpen(false);
        } catch (error) {
          setLocationError("Could not fetch address.");
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        setIsLocating(false);
        setLocationError(error.code === error.PERMISSION_DENIED ? "Please allow location access." : "Failed to get location.");
      },
      { timeout: 10000 }
    );
  };

  const handleSaveManualLocation = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualLocation.trim()) {
      setSelectedLocation(manualLocation.trim());
      localStorage.setItem("rmm_location", manualLocation.trim());
      setManualLocation("");
      setLocationModalOpen(false);
    }
  };

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return products.filter((p) => p.name.toLowerCase().includes(q) || p.nameHi.includes(q));
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?category=all&q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };



  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (searchOpen || locationModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = previousOverflow;
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [searchOpen, locationModalOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 navbar-glass-shell border-b border-[#eadfce]/80 bg-[#fffdf8]/90 shadow-[0_8px_30px_rgba(72,35,24,0.07)] backdrop-blur-2xl backdrop-saturate-150">

        {/* =========================================
            DESKTOP HEADER
            ========================================= */}
        <div className="mx-auto hidden h-[76px] max-w-[1440px] items-center justify-between gap-3 px-4 xl:px-6 xl:flex">
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-2 shrink-0">
              <Image src="/Logo.png" alt="Logo" width={40} height={40} className="h-10 w-10 object-contain" />
              <div className="flex flex-col">
                <span className="text-[19px] font-extrabold leading-none tracking-[-0.045em] text-[#5a1023]">Rashid</span>
                <span className="text-[9px] font-bold tracking-[0.28em] text-[#a77b3e]">MEGA MART</span>
              </div>
            </a>
            <button
              onClick={() => setLocationModalOpen(true)}
              className="flex shrink-0 items-center gap-2 rounded-xl border border-[#eee5d8] bg-white/75 px-3.5 py-2 transition hover:border-[#d7c4a5] hover:bg-white"
            >
              <MapPin size={16} className="text-[#138047]" />
              <div className="flex flex-col items-start">
                <span className="text-[10px] font-bold text-[#138047]">{isHindi ? "30 मिनट में डिलीवरी" : "Delivery in 30 mins"}</span>
                <span className="flex items-center gap-1 text-[11px] font-black text-gray-800">
                  {selectedLocation} <ChevronDown size={14} className="text-gray-500" />
                </span>
              </div>
            </button>
          </div>

          <div className="relative min-w-0 flex-1 max-w-sm">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <Search size={18} className="absolute left-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isHindi ? "आटा, तेल खोजें..." : "Search for atta, oil..."}
                className="h-11 w-full rounded-xl border border-[#eee7dc] bg-[#f8f6f1] pl-11 pr-4 text-[13px] font-medium text-[#493d37] outline-none transition placeholder:text-[#a69b90] focus:border-[#b99a70] focus:bg-white focus:ring-4 focus:ring-[#a77b3e]/10"
              />
            </form>
          </div>

          <div className="flex items-center gap-3">
            <nav className="flex items-center gap-1.5">
              <motion.a href="/" className="nav-glass-link rounded-lg px-3 py-2 text-[13px] font-semibold tracking-[-0.01em] text-[#65574f] hover:bg-white/35 hover:text-[#68162a]" whileHover={{ y: -2, scale: 1.025 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 420, damping: 28 }}>{isHindi ? "होम" : "Home"}</motion.a>
              <motion.a href="/products" className="nav-glass-link rounded-full px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-white/40 hover:text-[#800020]" whileHover={{ y: -2, scale: 1.025 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 420, damping: 28 }}>{isHindi ? "सामान" : "Products"}</motion.a>
              <motion.a href="/order-tracking" className="nav-glass-link rounded-full px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-white/40 hover:text-[#800020]" whileHover={{ y: -2, scale: 1.025 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 420, damping: 28 }}>{isHindi ? "ऑर्डर ट्रैक करें" : "Track Order"}</motion.a>
              <motion.a href="/my-orders" className="nav-glass-link rounded-full px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-white/40 hover:text-[#800020]" whileHover={{ y: -2, scale: 1.025 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 420, damping: 28 }}>{isHindi ? "मेरे ऑर्डर" : "My Orders"}</motion.a>
              <motion.a href="/admin" className="nav-glass-link flex items-center gap-1 rounded-lg px-3 py-2 text-[13px] font-semibold text-[#88796f] hover:bg-white/35 hover:text-[#68162a]" whileHover={{ y: -2, scale: 1.025 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 420, damping: 28 }}>
                <ShieldCheck size={14} /> {isHindi ? "एडमिन" : "Admin"}
              </motion.a>
            </nav>

            <LanguageToggle language={language} onSelect={() => toggleLanguage()} />


          </div>
        </div>

        {/* COMPACT MOBILE HEADER */}
        <div className="flex flex-col gap-1.5 px-3 pb-2 pt-2 xl:hidden">
          <div className="flex h-9 items-center justify-between gap-2">
            <a href="/" aria-label="Rashid Mega Mart home" className="flex min-w-0 items-center gap-2">
              <Image src="/Logo.png" alt="Rashid Mega Mart" width={32} height={32} className="h-8 w-8 shrink-0 object-contain" />
              <span className="truncate text-[14px] font-extrabold tracking-[-0.035em] text-[#5a1023]">Rashid Mega Mart</span>
            </a>
            <LanguageToggle language={language} onSelect={() => toggleLanguage()} />
          </div>

          <div className="flex h-10 items-center gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="flex h-10 min-w-0 flex-1 items-center gap-2 rounded-xl border border-[#eadfce] bg-white/80 px-3 text-left text-[#817780] shadow-[0_2px_9px_rgba(72,35,24,0.04)] transition active:scale-[0.99]"
            >
              <Search size={16} className="shrink-0 text-[#800020]" />
              <span className="truncate text-xs font-medium">{isHindi ? "आटा, तेल खोजें..." : "Search atta, oil..."}</span>
            </button>
            <button
              type="button"
              onClick={() => setLocationModalOpen(true)}
              className="flex h-10 max-w-[42%] shrink-0 items-center gap-1.5 rounded-xl border border-[#eadfce] bg-white/80 px-2.5 text-left shadow-[0_2px_9px_rgba(72,35,24,0.04)]"
              aria-label={isHindi ? "डिलीवरी लोकेशन बदलें" : "Change delivery location"}
            >
              <MapPin size={15} className="shrink-0 text-[#138047]" />
              <span className="max-w-[112px] truncate text-[11px] font-bold text-[#51463f]">{selectedLocation}</span>
              <ChevronDown size={12} className="shrink-0 text-[#887b73]" />
            </button>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {categoryOptions.map((cat) => {
              let Icon = LayoutGrid;
              const cid = cat.id.toLowerCase();
              if (cid === "staples") Icon = Wheat;
              else if (cid === "oil") Icon = Droplet;
              else if (cid === "masala") Icon = Flame;
              else if (cid === "snacks") Icon = Cookie;

              return (
                <a
                  key={cat.id}
                  href={`/products${cat.id !== "all" ? `?category=${cat.id}` : ""}`}
                  className="flex h-8 shrink-0 items-center gap-1.5 rounded-full border border-[#eadfce] bg-white/75 px-3 text-[10px] font-semibold text-[#514b50] transition-colors hover:border-[#d9c5a8] hover:text-[#68162a] active:scale-[0.98]"
                >
                  <Icon size={14} className="text-[#800020]" />
                  {isHindi ? cat.hi : cat.en}
                </a>
              );
            })}
          </div>
        </div>

      </header>

      {/* Spacer */}

      <div className="h-[122px] xl:h-[76px]" />

      {/* Flipkart-style mobile bottom navigation */}
      <nav aria-label={isHindi ? "मुख्य नेविगेशन" : "Main navigation"} className="fixed inset-x-0 bottom-0 z-[70] border-t border-[#e9ddcc] bg-[#fffdf8]/96 shadow-[0_-10px_35px_rgba(72,35,24,0.12)] backdrop-blur-2xl xl:hidden" style={{ paddingBottom: "max(env(safe-area-inset-bottom), 7px)" }}>
        <div className="mx-auto grid h-[68px] max-w-xl grid-cols-4 items-center px-2">
          <a href="/" aria-current={pathname === "/" ? "page" : undefined} className={`group flex h-full flex-col items-center justify-center gap-1.5 transition-all ${pathname === "/" ? "text-[#800020]" : "text-[#887b73] hover:text-[#800020]"}`}>
            <span className={`flex h-8 w-12 items-center justify-center rounded-2xl transition-all ${pathname === "/" ? "bg-[#800020]/[0.09] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]" : ""}`}><House size={20} strokeWidth={pathname === "/" ? 2.5 : 1.8} /></span>
            <span className="text-[10px] font-extrabold tracking-tight">{isHindi ? "होम" : "Home"}</span>
          </a>
          <a href="/products" aria-current={pathname.startsWith("/products") ? "page" : undefined} className={`group flex h-full flex-col items-center justify-center gap-1.5 transition-all ${pathname.startsWith("/products") ? "text-[#800020]" : "text-[#887b73] hover:text-[#800020]"}`}>
            <span className={`flex h-8 w-12 items-center justify-center rounded-2xl transition-all ${pathname.startsWith("/products") ? "bg-[#800020]/[0.09] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]" : ""}`}><LayoutGrid size={20} strokeWidth={pathname.startsWith("/products") ? 2.5 : 1.8} /></span>
            <span className="text-[10px] font-extrabold tracking-tight">{isHindi ? "सामान" : "Products"}</span>
          </a>
          <a href="/order-tracking" aria-current={pathname.startsWith("/order-tracking") ? "page" : undefined} className={`group flex h-full flex-col items-center justify-center gap-1.5 transition-all ${pathname.startsWith("/order-tracking") ? "text-[#800020]" : "text-[#887b73] hover:text-[#800020]"}`}>
            <span className={`flex h-8 w-12 items-center justify-center rounded-2xl transition-all ${pathname.startsWith("/order-tracking") ? "bg-[#800020]/[0.09] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]" : ""}`}><Truck size={20} strokeWidth={pathname.startsWith("/order-tracking") ? 2.5 : 1.8} /></span>
            <span className="text-[10px] font-extrabold tracking-tight">{isHindi ? "ट्रैक" : "Track"}</span>
          </a>
          <a href="/my-orders" aria-current={pathname.startsWith("/my-orders") ? "page" : undefined} className={`group flex h-full flex-col items-center justify-center gap-1.5 transition-all ${pathname.startsWith("/my-orders") ? "text-[#800020]" : "text-[#887b73] hover:text-[#800020]"}`}>
            <span className={`flex h-8 w-12 items-center justify-center rounded-2xl transition-all ${pathname.startsWith("/my-orders") ? "bg-[#800020]/[0.09] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]" : ""}`}><Package size={20} strokeWidth={pathname.startsWith("/my-orders") ? 2.5 : 1.8} /></span>
            <span className="text-[10px] font-extrabold tracking-tight">{isHindi ? "मेरे ऑर्डर" : "My Orders"}</span>
          </a>

        </div>
      </nav>


      {/* =========================================
          LOCATION MODAL
          ========================================= */}
      <AnimatePresence>
        {locationModalOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLocationModalOpen(false)} className="fixed inset-0 z-[100] bg-black/45" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="fixed left-1/2 top-1/2 z-[101] w-[92%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-5 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-black text-[#800020] flex items-center gap-2"><MapPin size={20} /> {isHindi ? "डिलीवरी लोकेशन" : "Delivery Location"}</h3>
                <button onClick={() => setLocationModalOpen(false)} className="rounded-full bg-gray-100 p-1.5 text-gray-600 hover:bg-gray-200"><X size={18} /></button>
              </div>

              <button onClick={handleLiveLocation} disabled={isLocating} className="mb-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#138047] py-3 text-sm font-bold text-white hover:bg-[#0D6837] transition disabled:opacity-60">
                <Crosshair size={18} /> {isLocating ? (isHindi ? "लोकेशन ढूंढ रहे हैं..." : "Detecting...") : (isHindi ? "वर्तमान लोकेशन उपयोग करें" : "Use Current Location")}
              </button>

              {locationError && <p className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-xs font-bold text-red-600">{locationError}</p>}

              <div className="relative mb-4 flex items-center">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
                <div className="relative mx-auto bg-white px-3 text-[10px] font-bold text-gray-400">{isHindi ? "या मैन्युअल दर्ज करें" : "OR ENTER MANUALLY"}</div>
              </div>

              <form onSubmit={handleSaveManualLocation} className="flex flex-col gap-3">
                <input type="text" value={manualLocation} onChange={(e) => setManualLocation(e.target.value)} placeholder={isHindi ? "अपना शहर / इलाका दर्ज करें" : "Enter your city / area"} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium outline-none focus:border-[#800020] focus:bg-white" />
                <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#800020] py-3 text-sm font-bold text-white hover:bg-[#600018] transition"><MapPin size={16} /> {isHindi ? "सेव करें" : "Save Location"}</button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* =========================================
          SEARCH OVERLAY
          ========================================= */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-white">
            <div className="flex h-full flex-col">
              <div className="border-b border-gray-100 p-3">
                <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
                  <div className="relative flex flex-1 items-center">
                    <Search size={18} className="absolute left-3 text-gray-400" />
                    <input type="text" autoFocus value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={isHindi ? "आटा, तेल, दाल खोजें..." : "Search atta, oil, dal..."} className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm font-medium outline-none focus:border-[#800020] focus:bg-white" />
                  </div>
                  <button type="button" onClick={() => { setSearchOpen(false); setSearchQuery(""); }} className="rounded-full bg-gray-100 p-2.5 text-gray-600 hover:bg-gray-200"><X size={20} /></button>
                </form>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                {!searchQuery.trim() ? (
                  <div className="mt-8 text-center text-gray-400">
                    <Search size={48} className="mx-auto mb-3 opacity-40" />
                    <p className="text-sm font-bold">{isHindi ? "कुछ खोजें..." : "Start typing to search..."}</p>
                  </div>
                ) : searchResults.length === 0 ? (
                  <div className="mt-8 text-center text-gray-400">
                    <Package size={48} className="mx-auto mb-3 opacity-40" />
                    <p className="text-sm font-bold">{isHindi ? "कोई उत्पाद नहीं मिला" : "No products found"}</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {searchResults.slice(0, 10).map((product) => (
                      <a key={product.id} href={`/products/${product.slug || product.id}`} onClick={() => { setSearchOpen(false); setSearchQuery(""); }} className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-3 hover:bg-gray-50 transition">
                        <div className="h-12 w-12 shrink-0 rounded-lg bg-gray-50 p-1 flex items-center justify-center">
                          <img src={product.image} alt={product.name} className="h-full object-contain mix-blend-multiply" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-gray-800 truncate">{isHindi ? product.nameHi : product.name}</p>
                          <p className="text-xs font-black text-[#800020] mt-0.5">₹{product.price}</p>
                        </div>
                        <ArrowUpRight size={16} className="text-gray-400" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


    </>
  );
}