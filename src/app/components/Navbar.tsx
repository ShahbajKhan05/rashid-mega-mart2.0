// app/components/Navbar.tsx
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  House, Package, LayoutGrid, ShoppingCart, Menu, X, ArrowUpRight,
  MapPin, Search, ChevronDown, Crosshair, User, Star, Lock, Heart, LogOut, Gift, ShieldCheck, Truck,
  Wheat, Droplet, Flame, Cookie // 🔥 Categories ke liye naye icons import kiye
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useLanguage } from "./LanguageProvider";
import { useCart } from "./CartProvider";
import { products, categoryOptions } from "./data";

type Language = "en" | "hi";
const DEFAULT_LOCATION = "Ghoghar, Rewa";

function LanguageToggle({ language, onSelect }: { language: Language; onSelect: (l: Language) => void; }) {
  return (
    <div className="inline-flex h-9 shrink-0 items-center rounded-full border border-white/80 bg-[#eeece6] p-1 shadow-[inset_2px_2px_5px_rgba(120,110,90,0.12),inset_-2px_-2px_5px_rgba(255,255,255,0.95)]">
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
  const { language, toggleLanguage } = useLanguage();
  const { cartCount, openCart } = useCart();

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(DEFAULT_LOCATION);
  const [manualLocation, setManualLocation] = useState("");
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState("");

  const isHindi = language === "hi";
  const cartLabelCount = cartCount > 99 ? "99+" : cartCount;

  useEffect(() => {
    const saved = localStorage.getItem("rmm_location");
    if (saved) setSelectedLocation(saved);

    const user = localStorage.getItem("rmm_user");
    if (user) setIsLoggedIn(true);
  }, [menuOpen]);

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

  const searchResults = products.filter((p) => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.nameHi.includes(q);
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?category=all&q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("rmm_user");
    setIsLoggedIn(false);
    setMenuOpen(false);
    router.push("/");
  };

  useEffect(() => {
    document.body.style.overflow = (menuOpen || searchOpen || locationModalOpen) ? "hidden" : "unset";
  }, [menuOpen, searchOpen, locationModalOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/70 bg-[#fffdf8]/90 shadow-[0_8px_30px_rgba(48,26,18,0.07)] backdrop-blur-2xl">

        {/* =========================================
            DESKTOP HEADER
            ========================================= */}
        <div className="mx-auto hidden h-[76px] max-w-[1440px] items-center justify-between gap-3 px-4 xl:px-6 lg:flex">
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
                <span className="text-[10px] font-bold text-[#138047]">Delivery in 30 mins</span>
                <span className="flex items-center gap-1 text-[11px] font-black text-gray-800">
                  {selectedLocation} <ChevronDown size={14} className="text-gray-500" />
                </span>
              </div>
            </button>
          </div>

          <div className="relative flex-1 max-w-sm">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <Search size={18} className="absolute left-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for atta, oil..."
                className="h-11 w-full rounded-xl border border-[#eee7dc] bg-[#f8f6f1] pl-11 pr-4 text-[13px] font-medium text-[#493d37] outline-none transition placeholder:text-[#a69b90] focus:border-[#b99a70] focus:bg-white focus:ring-4 focus:ring-[#a77b3e]/10"
              />
            </form>
          </div>

          <div className="flex items-center gap-3">
            <nav className="flex items-center gap-1.5">
              <a href="/" className="rounded-lg px-3 py-2 text-[13px] font-semibold tracking-[-0.01em] text-[#65574f] transition hover:bg-[#f5f0e8] hover:text-[#68162a]">Home</a>
              <a href="/products" className="rounded-full px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-white hover:text-[#800020] hover:shadow-sm">Products</a>
              <a href="/order-tracking" className="rounded-full px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-white hover:text-[#800020] hover:shadow-sm">Track Order</a>
              <a href="/admin" className="flex items-center gap-1 flex items-center gap-1 rounded-lg px-3 py-2 text-[13px] font-semibold text-[#88796f] transition hover:bg-[#f5f0e8] hover:text-[#68162a]">
                <ShieldCheck size={14} /> Admin
              </a>
            </nav>

            <LanguageToggle language={language} onSelect={() => toggleLanguage()} />

            <button onClick={openCart} className="flex h-11 items-center gap-2.5 rounded-xl bg-[#68162a] px-4 text-white shadow-[0_5px_14px_rgba(75,16,35,0.16)] transition hover:-translate-y-0.5 hover:bg-[#501020] active:translate-y-0">
              <ShoppingCart size={18} />
              <span className="text-sm font-bold">Cart</span>
              <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#D4A84F] px-1 text-[10px] font-black text-[#35120D]">
                {cartLabelCount}
              </span>
            </button>
          </div>
        </div>

        {/* =========================================
            MOBILE HEADER (Clean & Professional)
            ========================================= */}
        <div className="flex flex-col gap-2 border-t border-[#eee7dc]/80 px-3 pb-3 pt-3 lg:hidden">

          {/* ROW 1: Menu + Logo + Clean Icons */}
          <div className="flex min-h-10 items-center justify-between gap-2">
            
            {/* Left Side */}
            <div className="flex items-center gap-2 min-w-0">
              {/* Menu Button */}
              <button
                onClick={() => setMenuOpen(true)}
                className="flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-xl border border-[#eee5d9] bg-white px-3 text-xs font-bold text-[#5e514a] shadow-[0_2px_8px_rgba(56,35,24,0.05)] transition active:scale-95"
              >
                <Menu size={17} /> Menu
              </button>
              
              {/* Logo & Location */}
              <a href="/" className="flex min-w-0 items-center gap-2">
                <Image src="/Logo.png" alt="Logo" width={32} height={32} className="h-8 w-8 shrink-0 object-contain" />
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-black leading-tight text-[#800020] truncate">
                    Rashid Mega Mart
                  </span>
                  <button onClick={() => setLocationModalOpen(true)} className="mt-0.5 flex min-w-0 items-center gap-1 text-[10px] font-bold text-gray-500">
                    <MapPin size={11} className="shrink-0 text-[#138047]" />
                    <span className="max-w-[112px] truncate">{selectedLocation}</span>
                    <ChevronDown size={11} className="shrink-0" />
                  </button>
                </div>
              </a>
            </div>

            {/* Right Side Icons (Clean, No heavy borders) */}
            <div className="flex shrink-0 items-center gap-2">
              {/* Cart Button */}
              <button onClick={openCart} className="relative ml-0.5 flex h-10 w-10 items-center justify-center rounded-xl bg-[#68162a] text-white shadow-[0_4px_12px_rgba(75,16,35,0.18)] transition active:scale-95">
                <ShoppingCart size={19} />
                <span className="absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#D4A84F] px-1 text-[9px] font-black text-[#35120D] shadow-sm">
                  {cartLabelCount}
                </span>
              </button>
            </div>
          </div>

          {/* ROW 2: Search + Language */}
          <div className="mt-1 flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex h-11 flex-1 items-center gap-2.5 rounded-xl border border-[#eee5d9] bg-white px-3.5 text-sm text-[#95877c] shadow-[0_2px_8px_rgba(56,35,24,0.04)] transition active:scale-[0.99]"
            >
              <Search size={17} />
              <span className="truncate text-xs font-medium">{isHindi ? "आटा, तेल खोजें..." : "Search atta, oil..."}</span>
            </button>
            <div className="origin-right shrink-0 scale-95">
              <LanguageToggle language={language} onSelect={() => toggleLanguage()} />
            </div>
          </div>

          {/* 🔥 ROW 3: Categories with Original Icons */}
          <div className="mt-1 flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {categoryOptions.map((cat) => {
              // 🔥 Har category ke liye uske naam ka sahi icon select kar rahe hain
              let Icon = LayoutGrid;
              const cid = cat.id.toLowerCase();
              if (cid === 'staples') Icon = Wheat;
              else if (cid === 'oil') Icon = Droplet;
              else if (cid === 'masala') Icon = Flame;
              else if (cid === 'snacks') Icon = Cookie;

              return (
                <a
                  key={cat.id}
                  href={`/products${cat.id !== "all" ? `?category=${cat.id}` : ""}`}
                  className="flex h-9 shrink-0 items-center gap-2 rounded-full border border-[#eee5d9] bg-white px-3 py-1.5 text-[11px] font-bold text-[#66584f] shadow-[0_2px_7px_rgba(56,35,24,0.04)] transition hover:border-[#d9c5a8] hover:text-[#68162a] active:scale-[0.98]"
                >
                  <Icon size={15} className="text-[#800020]" />
                  {isHindi ? cat.hi : cat.en}
                </a>
              );
            })}
          </div>

        </div>
      </header>

      {/* Spacer */}
      <div className="h-[154px] lg:h-[76px]" />

      {/* =========================================
          LOCATION MODAL
          ========================================= */}
      <AnimatePresence>
        {locationModalOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLocationModalOpen(false)} className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm" />
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

      {/* =========================================
          MOBILE MENU DRAWER
          ========================================= */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMenuOpen(false)} className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm lg:hidden" />
            <motion.div initial={{ x: "-100%", opacity: 0.92 }} animate={{ x: 0, opacity: 1 }} exit={{ x: "-100%", opacity: 0.92 }} transition={{ type: "spring", stiffness: 290, damping: 30 }} className="fixed bottom-0 left-0 top-0 z-[100] flex w-[88%] max-w-[390px] flex-col overflow-y-auto border-r border-[#a77b3e]/25 bg-[radial-gradient(ellipse_at_top_left,_#81283d_0%,_#551326_48%,_#32101d_100%)] px-5 pb-8 pt-7 text-[#fffaf2] shadow-[24px_0_70px_rgba(28,5,13,0.38)] lg:hidden">
              <div className="mb-9 flex items-center justify-between border-b border-white/15 pb-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#d8bd8b]/40 bg-white p-1 shadow-[0_8px_22px_rgba(0,0,0,0.18)]"><Image src="/Logo.png" alt="Logo" width={40} height={40} className="h-10 w-10 object-contain" /></div>
                  <div className="flex flex-col gap-1"><span className="text-[17px] font-extrabold tracking-[-0.04em] text-[#fffaf2]">Rashid Mega Mart</span><span className="text-[9px] font-bold tracking-[0.28em] text-[#d8bd8b]">THE EVERYDAY LUXURY</span></div>
                </div>
                <button onClick={() => setMenuOpen(false)} aria-label="Close menu" className="rounded-full border border-white/20 bg-white/10 p-2.5 text-[#fffaf2] transition hover:bg-white/20"><X size={19} /></button>
              </div>

              <button onClick={() => { setMenuOpen(false); setLocationModalOpen(true); }} className="mb-9 flex w-full items-center gap-3 rounded-2xl border border-[#d8bd8b]/35 bg-[linear-gradient(135deg,rgba(255,250,242,0.14),rgba(255,250,242,0.06))] p-4 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] transition hover:bg-white/15">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d8bd8b] text-[#4a1424]"><MapPin size={18} /></span>
                <span className="flex min-w-0 flex-1 flex-col gap-1"><span className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#d8bd8b]">Delivering to</span><span className="truncate text-[14px] font-bold text-[#fffaf2]">{selectedLocation}</span></span>
                <ChevronDown size={17} className="text-[#d8bd8b]" />
              </button>

              <div className="mb-3 text-[9px] font-bold uppercase tracking-[0.28em] text-[#d8bd8b]/80">Explore the store</div>
              <div className="flex flex-col gap-2">
                <a href="/" onClick={() => setMenuOpen(false)} className="group flex min-h-[58px] items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.07] px-4 text-[#fffaf2] transition hover:translate-x-1 hover:border-[#d8bd8b]/45 hover:bg-white/[0.12]"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#d8bd8b]/15 text-[#e7c995]"><House size={18} /></span><span className="flex-1 text-[14px] font-semibold">{isHindi ? "होम" : "Home"}</span><ArrowUpRight size={16} className="text-white/35 transition group-hover:text-[#e7c995]" /></a>
                <a href="/products" onClick={() => setMenuOpen(false)} className="group flex min-h-[58px] items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.07] px-4 text-[#fffaf2] transition hover:translate-x-1 hover:border-[#d8bd8b]/45 hover:bg-white/[0.12]"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#d8bd8b]/15 text-[#e7c995]"><Package size={18} /></span><span className="flex-1 text-[14px] font-semibold">{isHindi ? "उत्पाद" : "Products"}</span><ArrowUpRight size={16} className="text-white/35 transition group-hover:text-[#e7c995]" /></a>
                <a href="/order-tracking" onClick={() => setMenuOpen(false)} className="group flex min-h-[58px] items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.07] px-4 text-[#fffaf2] transition hover:translate-x-1 hover:border-[#d8bd8b]/45 hover:bg-white/[0.12]"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#d8bd8b]/15 text-[#e7c995]"><Truck size={18} /></span><span className="flex-1 text-[14px] font-semibold">{isHindi ? "ऑर्डर ट्रैक करें" : "Track Order"}</span><ArrowUpRight size={16} className="text-white/35 transition group-hover:text-[#e7c995]" /></a>
                <a href="/admin" onClick={() => setMenuOpen(false)} className="group flex min-h-[58px] items-center gap-4 rounded-2xl border border-[#d8bd8b]/30 bg-[#d8bd8b]/10 px-4 text-[#fffaf2] transition hover:translate-x-1 hover:bg-[#d8bd8b]/15"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#d8bd8b] text-[#4a1424]"><ShieldCheck size={18} /></span><span className="flex-1 text-[14px] font-semibold">{isHindi ? "एडमिन पैनल" : "Admin Panel"}</span><ArrowUpRight size={16} className="text-[#d8bd8b]/70" /></a>
              </div>

              <div className="mt-auto pt-10"><div className="h-px bg-gradient-to-r from-transparent via-[#d8bd8b]/40 to-transparent" /><p className="pt-5 text-center text-[9px] font-semibold tracking-[0.24em] text-white/35">RASHID MEGA MART · REWA</p></div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}