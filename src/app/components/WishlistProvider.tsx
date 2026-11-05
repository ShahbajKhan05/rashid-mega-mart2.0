"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products } from "./data";
export type WishlistProduct = (typeof products)[number];
type WishlistContextValue = { wishlistProducts: WishlistProduct[]; wishlistIds: string[]; wishlistCount: number; isWishlisted: (id: string) => boolean; toggleWishlist: (id: string) => void; removeFromWishlist: (id: string) => void; clearWishlist: () => void; };
const STORAGE_KEY = "rmm_wishlist_v1";
const WishlistContext = createContext<WishlistContextValue | null>(null);
export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  useEffect(() => { try { const stored: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); if (Array.isArray(stored)) setWishlistIds(stored.filter((id): id is string => typeof id === "string")); } catch { localStorage.removeItem(STORAGE_KEY); } setReady(true); }, []);
  useEffect(() => { if (ready) localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlistIds)); }, [wishlistIds, ready]);
  const toggleWishlist = useCallback((id: string) => setWishlistIds(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id]), []);
  const removeFromWishlist = useCallback((id: string) => setWishlistIds(current => current.filter(item => item !== id)), []);
  const clearWishlist = useCallback(() => setWishlistIds([]), []);
  const wishlistProducts = useMemo(() => wishlistIds.map(id => products.find(product => product.id === id)).filter((product): product is WishlistProduct => Boolean(product)), [wishlistIds]);
  const value = useMemo<WishlistContextValue>(() => ({ wishlistProducts, wishlistIds, wishlistCount: wishlistProducts.length, isWishlisted: id => wishlistIds.includes(id), toggleWishlist, removeFromWishlist, clearWishlist }), [wishlistProducts, wishlistIds, toggleWishlist, removeFromWishlist, clearWishlist]);
  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}
export function useWishlist() { const context = useContext(WishlistContext); if (!context) throw new Error("useWishlist must be used inside WishlistProvider"); return context; }
