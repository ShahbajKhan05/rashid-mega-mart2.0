// app/components/Navbar.tsx
"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  House, Package, LayoutGrid, X, ArrowUpRight,
  MapPin, Search, ChevronDown, Crosshair, User, Star, Lock, Heart, LogOut, Gift, ShieldCheck, Truck,
  Wheat, Droplet, Flame, Cookie, ShoppingCart, MoreHorizontal, CircleHelp, Info, Phone, FileText, Utensils // Categories and cart navigation
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useLanguage } from "./LanguageProvider";
import { products, categoryOptions } from "./data";
import { useCart } from "./CartProvider";
import { useWishlist } from "./WishlistProvider";

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
  const { cartCount, openCart } = useCart();
  const { wishlistCount } = useWishlist();

  const [searchOpen, setSearchOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const bodyOverflowBeforeOverlay = useRef<string | null>(null);
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
    const overlayOpen = searchOpen || locationModalOpen;

    if (overlayOpen) {
      if (bodyOverflowBeforeOverlay.current === null) {
        bodyOverflowBeforeOverlay.current = document.body.style.overflow;
      }
      document.body.style.overflow = "hidden";
      return;
    }

    if (bodyOverflowBeforeOverlay.current !== null) {
      document.body.style.overflow = bodyOverflowBeforeOverlay.current;
      bodyOverflowBeforeOverlay.current = null;
    }
  }, [searchOpen, locationModalOpen]);

  useEffect(() => {
    return () => {
      if (bodyOverflowBeforeOverlay.current !== null) {
        document.body.style.overflow = bodyOverflowBeforeOverlay.current;
        bodyOverflowBeforeOverlay.current = null;
      }
    };
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 navbar-glass-shell border-b border-[#d8cfc2]/50 bg-white/55 shadow-[0_5px_22px_rgba(65,43,35,0.045)] backdrop-blur-2xl backdrop-saturate-125">

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
              <motion.a href="/kits" className="nav-glass-link rounded-full px-3 py-2 text-sm font-extrabold text-[#9a6b22] hover:bg-white/40 hover:text-[#800020]" whileHover={{ y: -2, scale: 1.025 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 420, damping: 28 }}>{isHindi ? "बचत किट" : "Kits"}</motion.a>
              <motion.a href="/order-tracking" className="nav-glass-link rounded-full px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-white/40 hover:text-[#800020]" whileHover={{ y: -2, scale: 1.025 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 420, damping: 28 }}>{isHindi ? "ऑर्डर ट्रैक करें" : "Track Order"}</motion.a>
              <motion.a href="/my-orders" className="nav-glass-link rounded-full px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-white/40 hover:text-[#800020]" whileHover={{ y: -2, scale: 1.025 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 420, damping: 28 }}>{isHindi ? "मेरे ऑर्डर" : "My Orders"}</motion.a>
              <motion.a href="/rewards" className="nav-glass-link rounded-full px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-white/40 hover:text-[#800020]" whileHover={{ y: -2, scale: 1.025 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 420, damping: 28 }}>{isHindi ? "रिवॉर्ड्स" : "Rewards"}</motion.a>
              <motion.a href="/admin" className="nav-glass-link flex items-center gap-1 rounded-lg px-3 py-2 text-[13px] font-semibold text-[#88796f] hover:bg-white/35 hover:text-[#68162a]" whileHover={{ y: -2, scale: 1.025 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 420, damping: 28 }}>
                <ShieldCheck size={14} /> {isHindi ? "एडमिन" : "Admin"}
              </motion.a>
            </nav>

            <LanguageToggle language={language} onSelect={() => toggleLanguage()} />


          </div>
        </div>

        {/* COMPACT MOBILE HEADER */}
        <div className="flex flex-col gap-1.5 px-3 pb-1.5 pt-1.5 xl:hidden">
          <div className="relative flex h-9 items-center justify-between">
            <a href="/" aria-label="Rashid Mega Mart home" className="relative z-10 flex h-9 w-10 shrink-0 items-center justify-start">
              <Image src="/Logo.png" alt="Rashid Mega Mart" width={34} height={34} className="h-[34px] w-[34px] object-contain" />
            </a>
            <motion.span
              aria-label="Rashid Mega Mart"
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[15px] font-extrabold tracking-[-0.035em] text-[#5a1023]"
              initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0.35 }}
              animate={{ clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)", "inset(0 0% 0 0)"], opacity: [0.35, 1, 1] }}
              transition={{ duration: 1.15, times: [0, 0.62, 1], repeat: Infinity, repeatDelay: 3.2, ease: "easeInOut" }}
            >
              Rashid Mega Mart
            </motion.span>
            <div className="relative z-10 shrink-0">
              <LanguageToggle language={language} onSelect={() => toggleLanguage()} />
            </div>
          </div>

          <div className="flex h-10 items-center gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="flex h-9 min-w-0 flex-1 items-center gap-2 rounded-xl border border-white/80 bg-white/55 px-3 text-left text-[#817780] shadow-[0_5px_16px_rgba(72,35,24,0.07)] backdrop-blur-xl transition active:scale-[0.99]"
            >
              <Search size={16} className="shrink-0 text-[#800020]" />
              <span className="truncate text-xs font-medium">{isHindi ? "आटा, तेल खोजें..." : "Search atta, oil..."}</span>
            </button>
            <button
              type="button"
              onClick={() => setLocationModalOpen(true)}
              className="flex h-9 max-w-[42%] shrink-0 items-center gap-1.5 rounded-xl border border-white/80 bg-white/55 px-2.5 text-left shadow-[0_5px_16px_rgba(72,35,24,0.07)] backdrop-blur-xl"
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
                  className="flex h-7 shrink-0 items-center gap-1.5 rounded-full border border-white/80 bg-white/55 px-3 text-[10px] font-semibold text-[#514b50] shadow-[0_4px_12px_rgba(72,35,24,0.05)] backdrop-blur-lg transition-colors hover:border-[#d9c5a8] hover:text-[#68162a] active:scale-[0.98]"
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

      <div className="h-[136px] xl:h-[76px]" />

      {/* Flipkart-style mobile bottom navigation */}
      <nav aria-label={isHindi ? "मुख्य नेविगेशन" : "Main navigation"} className="fixed inset-x-0 bottom-0 z-[70] border-t border-[#d8cfc2]/50 bg-white/60 shadow-[0_-5px_22px_rgba(65,43,35,0.05)] backdrop-blur-2xl xl:hidden" style={{ paddingBottom: "max(env(safe-area-inset-bottom), 7px)" }}>
        <div className="mx-auto grid h-[68px] max-w-xl grid-cols-6 items-center px-1.5">
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
          <a href="/wishlist" aria-current={pathname === "/wishlist" ? "page" : undefined} className={`group relative flex h-full flex-col items-center justify-center gap-1.5 transition-all ${pathname === "/wishlist" ? "text-[#800020]" : "text-[#887b73] hover:text-[#800020]"}`}>
            <span className={`relative flex h-8 w-10 items-center justify-center rounded-2xl transition-all ${pathname === "/wishlist" ? "bg-[#800020]/[0.09]" : ""}`}><Heart size={19} strokeWidth={pathname === "/wishlist" ? 2.5 : 1.8} />{wishlistCount > 0 && <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#800020] px-1 text-[8px] font-black text-white ring-2 ring-[#fffdf8]">{wishlistCount > 99 ? "99+" : wishlistCount}</span>}</span>
            <span className="text-[9px] font-extrabold tracking-tight">{isHindi ? "विशलिस्ट" : "Saved"}</span>
          </a>
          <button type="button" onClick={() => setMoreOpen(true)} aria-haspopup="dialog" aria-expanded={moreOpen} className={`group flex h-full flex-col items-center justify-center gap-1.5 transition-all ${moreOpen || ["/my-orders","/rewards","/faqs","/about","/contact","/food-safety","/privacy-policy","/terms-and-conditions","/shipping-policy","/payment-policy","/return-replacement","/cancellation-refund","/grievance-redressal"].some(path => pathname.startsWith(path)) ? "text-[#800020]" : "text-[#887b73] hover:text-[#800020]"}`}>
            <span className={`flex h-8 w-12 items-center justify-center rounded-2xl transition-all ${moreOpen ? "bg-[#800020]/[0.09]" : ""}`}><MoreHorizontal size={21} /></span>
            <span className="text-[10px] font-extrabold tracking-tight">{isHindi ? "और" : "More"}</span>
          </button>
          <button type="button" onClick={openCart} aria-label={isHindi ? `कार्ट, ${cartCount} आइटम` : `Cart, ${cartCount} items`}
            aria-haspopup="dialog"
            className={`group relative flex h-full flex-col items-center justify-center gap-1.5 transition-all ${pathname === "/cart" ? "text-[#800020]" : "text-[#887b73] hover:text-[#800020]"}`}>
            <span className={`relative flex h-8 w-12 items-center justify-center rounded-2xl transition-all ${pathname === "/cart" ? "bg-[#800020]/[0.09]" : ""}`}>
              <ShoppingCart size={20} strokeWidth={pathname === "/cart" ? 2.5 : 1.8} />
              {cartCount > 0 && <span className="absolute right-1 top-0 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#800020] px-1 text-[9px] font-black leading-none text-white ring-2 ring-[#fffdf8]">{cartCount > 99 ? "99+" : cartCount}</span>}
            </span>
            <span className="text-[10px] font-extrabold tracking-tight">{isHindi ? "कार्ट" : "Cart"}</span>
          </button>

        </div>
      </nav>


      <AnimatePresence>
        {moreOpen && (
          <>
            <motion.button type="button" aria-label={isHindi ? "मेन्यू बंद करें" : "Close menu"} onClick={() => setMoreOpen(false)} className="fixed inset-0 z-[95] bg-[#24151a]/45 backdrop-blur-[3px] xl:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            <motion.section role="dialog" aria-modal="true" aria-label={isHindi ? "और विकल्प" : "More options"} className="fixed inset-x-0 bottom-0 z-[96] max-h-[82svh] overflow-y-auto rounded-t-[28px] border-t border-white/70 bg-[#fffdf8]/95 px-4 pb-[max(env(safe-area-inset-bottom),18px)] pt-3 shadow-[0_-18px_60px_rgba(35,20,20,.2)] backdrop-blur-2xl xl:hidden" initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", stiffness: 340, damping: 32 }}>
              <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-[#d9cbbd]" />
              <div className="mb-4 flex items-center justify-between">
                <div><p className="text-[9px] font-black uppercase tracking-[.22em] text-[#a77b3e]">Rashid Mega Mart</p><h2 className="mt-1 text-xl font-black tracking-tight text-[#800020]">{isHindi ? "और विकल्प" : "Explore more"}</h2></div>
                <button type="button" onClick={() => setMoreOpen(false)} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-full border border-[#eadfce] bg-white text-[#800020]"><X size={17}/></button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { href: "/rewards", label: isHindi ? "Rashid Rewards" : "Rashid Rewards", hint: isHindi ? "पॉइंट्स और कूपन" : "Points & vouchers", icon: <Gift size={19}/> },
                  { href: "/kits", label: isHindi ? "स्मार्ट बचत किट" : "Smart Bachat Kits", hint: isHindi ? "मंथली राशन कॉम्बो" : "Monthly ration combos", icon: <ShoppingCart size={19}/> },
                  { href: "/my-orders", label: isHindi ? "मेरे ऑर्डर" : "My Orders", hint: isHindi ? "ऑर्डर हिस्ट्री" : "Order history", icon: <Package size={19}/> },
                  { href: "/cart", label: isHindi ? "मेरा कार्ट" : "My Cart", hint: isHindi ? "खरीदारी जारी रखें" : "Continue shopping", icon: <ShoppingCart size={19}/> },
                  { href: "/faqs", label: "FAQs", hint: isHindi ? "सवालों के जवाब" : "Quick answers", icon: <CircleHelp size={19}/> },
                  { href: "/about", label: isHindi ? "हमारे बारे में" : "About us", hint: isHindi ? "हमारी कहानी" : "Our store", icon: <Info size={19}/> },
                  { href: "/contact", label: isHindi ? "संपर्क करें" : "Contact us", hint: isHindi ? "हमसे बात करें" : "Get in touch", icon: <Phone size={19}/> },
                  { href: "/food-safety", label: isHindi ? "फूड सेफ्टी" : "Food safety", hint: isHindi ? "सुरक्षा जानकारी" : "Safety information", icon: <Utensils size={19}/> },
                  { href: "/shipping-policy", label: isHindi ? "डिलीवरी पॉलिसी" : "Shipping policy", hint: isHindi ? "डिलीवरी जानकारी" : "Delivery details", icon: <Truck size={19}/> },
                  { href: "/payment-policy", label: isHindi ? "पेमेंट पॉलिसी" : "Payment policy", hint: isHindi ? "भुगतान जानकारी" : "Payment details", icon: <FileText size={19}/> },
                  { href: "/return-replacement", label: isHindi ? "रिटर्न पॉलिसी" : "Returns policy", hint: isHindi ? "रिटर्न और बदलाव" : "Returns & replacement", icon: <ShieldCheck size={19}/> },
                  { href: "/cancellation-refund", label: isHindi ? "कैंसलेशन और रिफंड" : "Cancellation & refund", hint: isHindi ? "रिफंड नियम" : "Refund information", icon: <FileText size={19}/> },
                  { href: "/privacy-policy", label: isHindi ? "प्राइवेसी पॉलिसी" : "Privacy policy", hint: isHindi ? "डेटा और प्राइवेसी" : "Your privacy", icon: <Lock size={19}/> },
                  { href: "/terms-and-conditions", label: isHindi ? "नियम और शर्तें" : "Terms & conditions", hint: isHindi ? "स्टोर के नियम" : "Store terms", icon: <FileText size={19}/> },
                  { href: "/grievance-redressal", label: isHindi ? "शिकायत सहायता" : "Grievance support", hint: isHindi ? "सहायता और शिकायत" : "Help & complaints", icon: <CircleHelp size={19}/> },
                ].map(item => (
                  <a key={item.href} href={item.href} onClick={() => setMoreOpen(false)} className={`flex min-h-[68px] items-center gap-3 rounded-2xl border px-3 py-2.5 transition active:scale-[.98] ${pathname === item.href ? "border-[#800020]/25 bg-[#800020]/[.06]" : "border-[#eee4d8] bg-white/80 hover:border-[#d8c1a2]"}`}>
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#800020]/[.07] text-[#800020]">{item.icon}</span>
                    <span className="min-w-0"><span className="block truncate text-[12px] font-extrabold text-[#49352f]">{item.label}</span><span className="mt-0.5 block truncate text-[10px] text-[#95877c]">{item.hint}</span></span>
                  </a>
                ))}
              </div>
              <a href="/wishlist" onClick={() => setMoreOpen(false)} className="mt-3 flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#eadfce] bg-white text-xs font-bold text-[#800020]"><Heart size={15}/> {isHindi ? "सेव की गई विशलिस्ट देखें" : "View saved wishlist"}{wishlistCount > 0 ? ` · ${wishlistCount}` : ""}</a>
            </motion.section>
          </>
        )}
      </AnimatePresence>

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