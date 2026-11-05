"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products } from "./data";
import { groceryKits } from "./kits-data";
export type WishlistProduct = (typeof products)[number];
type WishlistContextValue = { wishlistKitIds: string[]; isKitWishlisted: (id: string) => boolean; toggleKitWishlist: (id: string) => void; removeKitFromWishlist: (id: string) => void; clearKitWishlist: () => void; wishlistProducts: WishlistProduct[]; wishlistIds: string[]; wishlistCount: number; isWishlisted: (id: string) => boolean; toggleWishlist: (id: string) => void; removeFromWishlist: (id: string) => void; clearWishlist: () => void; };
const STORAGE_KEY = "rmm_wishlist_v1";
const WishlistContext = createContext<WishlistContextValue | null>(null);
export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const [wishlistKitIds, setWishlistKitIds] = useState<string[]>([]);
  useEffect(() => { try { const stored: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); if (Array.isArray(stored)) setWishlistIds(stored.filter((id): id is string => typeof id === "string"));
      const savedKits: unknown = JSON.parse(localStorage.getItem("rmm_wishlist_kits_v1") || "[]");
      if (Array.isArray(savedKits)) setWishlistKitIds(savedKits.filter((id): id is string => typeof id === "string" && groceryKits.some((kit) => kit.id === id))); } catch { localStorage.removeItem(STORAGE_KEY); } setReady(true); }, []);
  useEffect(() => { if (ready) { localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlistIds)); localStorage.setItem("rmm_wishlist_kits_v1", JSON.stringify(wishlistKitIds)); } }, [wishlistIds, wishlistKitIds, ready]);
  const toggleWishlist = useCallback((id: string) => setWishlistIds(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id]), []);
  const removeFromWishlist = useCallback((id: string) => setWishlistIds(current => current.filter(item => item !== id)), []);
  const toggleKitWishlist = useCallback((id: string) => setWishlistKitIds(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id]), []);
  const removeKitFromWishlist = useCallback((id: string) => setWishlistKitIds(current => current.filter(item => item !== id)), []);
  const clearKitWishlist = useCallback(() => setWishlistKitIds([]), []);
  const clearWishlist = useCallback(() => setWishlistIds([]), []);
  const wishlistProducts = useMemo(() => wishlistIds.map(id => products.find(product => product.id === id)).filter((product): product is WishlistProduct => Boolean(product)), [wishlistIds]);
  const value = useMemo<WishlistContextValue>(() => ({ wishlistKitIds, isKitWishlisted: id => wishlistKitIds.includes(id), toggleKitWishlist, removeKitFromWishlist, clearKitWishlist, wishlistProducts, wishlistIds, wishlistCount: wishlistProducts.length + wishlistKitIds.length, isWishlisted: id => wishlistIds.includes(id), toggleWishlist, removeFromWishlist, clearWishlist }), [wishlistProducts, wishlistIds, wishlistKitIds, toggleKitWishlist, removeKitFromWishlist, clearKitWishlist, toggleWishlist, removeFromWishlist, clearWishlist]);
  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}
export function useWishlist() { const context = useContext(WishlistContext); if (!context) throw new Error("useWishlist must be used inside WishlistProvider"); return context; }
