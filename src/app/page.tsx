"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowRight, ArrowUpRight, BadgeCheck, Heart, MapPin, Menu, Search, ShieldCheck, ShoppingBag, Sparkles, Truck, X } from "lucide-react";

const categories = [
  { name: "Atta, Rice & Dal", subtitle: "Everyday kitchen staples", emoji: "🌾", image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=700&q=85", tone: "sand" },
  { name: "Oil & Ghee", subtitle: "Made for every meal", emoji: "🫒", image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=700&q=85", tone: "butter" },
  { name: "Spices & Masala", subtitle: "Bring flavour home", emoji: "🌶️", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=700&q=85", tone: "rose" },
  { name: "Tea & Coffee", subtitle: "A little daily comfort", emoji: "☕", image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=700&q=85", tone: "latte" },
  { name: "Snacks & Namkeen", subtitle: "Something to savour", emoji: "🍿", image: "https://images.unsplash.com/photo-1621939514649-280e2aa2f1c9?w=700&q=85", tone: "peach" },
  { name: "Biscuits & Bakery", subtitle: "Little everyday treats", emoji: "🍪", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=700&q=85", tone: "biscuit" },
  { name: "Dairy & Breakfast", subtitle: "Start fresh every day", emoji: "🥛", image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=700&q=85", tone: "sky" },
  { name: "Home Essentials", subtitle: "Care for your home", emoji: "🏡", image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=700&q=85", tone: "sage" },
];

const products = [
  { name: "Aashirvaad Atta", unit: "5 kg", price: 240, oldPrice: 280, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=85", tag: "EVERYDAY ESSENTIAL" },
  { name: "India Gate Basmati Rice", unit: "2 kg", price: 280, oldPrice: 350, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=85", tag: "PANTRY PICK" },
  { name: "Fortune Sunflower Oil", unit: "1 L", price: 135, oldPrice: 160, image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&q=85", tag: "KITCHEN FAVOURITE" },
  { name: "Tata Sampann Toor Dal", unit: "1 kg", price: 160, oldPrice: 190, image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=85", tag: "DAILY STAPLE" },
];
const brands = ["AASHIRVAAD", "FORTUNE", "TATA SAMPANN", "AMUL", "BRITANNIA", "INDIA GATE"];

export default function Home() {
  const pageRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .fromTo(".hero-kicker", { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55 })
        .fromTo(".hero-title-line", { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.85, stagger: 0.12 }, "-=0.2")
        .fromTo(".hero-copy, .hero-actions, .hero-trust", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.12 }, "-=0.45")
        .fromTo(".hero-visual", { scale: 0.92, opacity: 0, rotate: 2 }, { scale: 1, opacity: 1, rotate: 0, duration: 1 }, "-=0.65");
      gsap.utils.toArray<HTMLElement>(".reveal-up").forEach((element) => {
        gsap.fromTo(element, { y: 34, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.75, ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 88%", once: true },
        });
      });
      gsap.to(".hero-orbit", { rotate: 360, duration: 38, repeat: -1, ease: "none" });
      gsap.to(".floating-note", { y: -10, duration: 2.8, repeat: -1, yoyo: true, ease: "sine.inOut" });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main ref={pageRef} className="rmm-home">
      <div className="announcement"><Sparkles size={13} /><span>Your neighbourhood store for everyday essentials</span><span className="announcement-link">DISCOVER MORE <ArrowUpRight size={12} /></span></div>
      <header className="site-header">
        <a href="#top" className="brand-lockup" aria-label="Rashid Mega Mart home">
          <img src="/Logo.png" alt="Rashid Mega Mart" className="brand-logo" />
          <span className="brand-words"><strong>RASHID</strong><small>MEGA MART</small></span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a className="active" href="#top">Home</a><a href="#categories">Categories</a><a href="#best-sellers">Best Sellers</a><a href="#kits">Grocery Kits</a><a href="#footer">Contact</a>
        </nav>
        <div className="header-actions"><a href="#categories" className="header-search" aria-label="Explore categories"><Search size={18} /></a><a href="#best-sellers" className="header-shop"><ShoppingBag size={16} /><span>Explore Store</span></a></div>
        <button className="mobile-menu-button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>{menuOpen ? <X size={23} /> : <Menu size={23} />}</button>
      </header>
      {menuOpen && <nav className="mobile-nav" aria-label="Mobile navigation"><a href="#top" onClick={closeMenu}>Home</a><a href="#categories" onClick={closeMenu}>Categories</a><a href="#best-sellers" onClick={closeMenu}>Best Sellers</a><a href="#kits" onClick={closeMenu}>Grocery Kits</a><a href="#footer" onClick={closeMenu}>Contact</a></nav>}

      <section id="top" className="hero-section">
        <div className="hero-grain" />
        <div className="hero-content">
          <div className="hero-kicker"><span className="kicker-dot" /> YOUR DAILY NEEDS, OUR PRIORITY</div>
          <div className="hero-title-wrap"><h1><span className="hero-title-mask"><span className="hero-title-line">Good food.</span></span><span className="hero-title-mask"><span className="hero-title-line title-accent">Good living.</span></span><span className="hero-title-mask"><span className="hero-title-line">All in one place.</span></span></h1></div>
          <p className="hero-copy">From everyday kitchen staples to little household favourites, bring home the things that make every day better.</p>
          <div className="hero-actions"><a href="#categories" className="button-primary">Explore Categories <ArrowRight size={17} /></a><a href="#best-sellers" className="button-text">Discover favourites <span>↗</span></a></div>
          <div className="hero-trust"><span><ShieldCheck size={16} /> Quality essentials</span><i /><span><Heart size={16} /> Neighbourhood care</span></div>
        </div>
        <div className="hero-visual">
          <div className="hero-image-frame"><img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=90" alt="Fresh vegetables and everyday grocery produce" /><div className="hero-image-shade" /><div className="hero-image-caption"><span>THE EVERYDAY EDITION</span><strong>Fresh picks.<br />Familiar favourites.</strong></div></div>
          <div className="hero-orbit" />
          <div className="floating-note note-top"><span className="note-icon"><Truck size={19} /></span><span><strong>Everyday convenience</strong><small>Shopping made simpler</small></span></div>
          <div className="floating-note note-bottom"><span className="note-icon gold"><BadgeCheck size={19} /></span><span><strong>Carefully selected</strong><small>Essentials for your home</small></span></div>
          <div className="hero-stamp"><span>RASHID</span><strong>MM</strong><span>EST. EVERYDAY</span></div>
        </div>
        <div className="hero-side-label">GROCERIES · HOUSEHOLD · EVERYDAY</div>
      </section>

      <section className="brand-strip" aria-label="Popular brands"><span className="brand-strip-label">FAMILIAR BRANDS, EVERYDAY FAVOURITES</span><div className="brand-list">{brands.map((brand) => <span key={brand}>{brand}</span>)}</div></section>

      <section id="categories" className="categories-section section-shell">
        <div className="section-heading reveal-up"><div><span className="eyebrow">A LITTLE BIT OF EVERYTHING</span><h2>Shop by <em>category.</em></h2><p>Find your everyday essentials, all under one roof.</p></div><a href="#best-sellers" className="round-link">Explore favourites <ArrowUpRight size={17} /></a></div>
        <div className="category-grid">{categories.map((category, index) => <a href="#best-sellers" key={category.name} className={"category-tile tone-" + category.tone + " reveal-up"} style={{ transitionDelay: (index % 4) * 55 + "ms" }}><div className="category-photo"><img src={category.image} alt="" loading="lazy" /><span className="category-emoji">{category.emoji}</span></div><div className="category-info"><div><h3>{category.name}</h3><p>{category.subtitle}</p></div><span className="category-arrow"><ArrowUpRight size={17} /></span></div></a>)}</div>
      </section>

      <section id="best-sellers" className="bestsellers-section"><div className="section-shell">
        <div className="section-heading reveal-up"><div><span className="eyebrow">THE PANTRY EDIT</span><h2>Everyday <em>favourites.</em></h2><p>A few essentials to get your shopping started.</p></div><a href="#kits" className="round-link">See grocery kits <ArrowUpRight size={17} /></a></div>
        <div className="product-grid">{products.map((product, index) => <article className="product-card reveal-up" key={product.name} style={{ transitionDelay: index * 65 + "ms" }}><div className="product-image"><span className="product-tag">{product.tag}</span><img src={product.image} alt={product.name} loading="lazy" /><button className="product-heart" aria-label={"Save " + product.name}><Heart size={17} /></button></div><div className="product-details"><span className="product-unit">{product.unit}</span><h3>{product.name}</h3><div className="product-price"><strong>₹{product.price}</strong><del>₹{product.oldPrice}</del></div><a href="#kits" className="product-link">Explore item <ArrowUpRight size={15} /></a></div></article>)}</div>
        <p className="catalog-note">Product selection and prices shown are illustrative for this homepage preview.</p>
      </div></section>

      <section id="kits" className="kit-section section-shell"><div className="kit-panel reveal-up">
        <div className="kit-copy"><span className="eyebrow light">THE SMARTER WAY TO STOCK UP</span><h2>Your monthly essentials.<br /><em>One thoughtful kit.</em></h2><p>Make everyday shopping feel simpler with curated grocery bundles for your home.</p><a href="#footer" className="button-cream">Explore grocery kits <ArrowRight size={17} /></a></div>
        <div className="kit-art"><div className="kit-orbit" /><img src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=900&q=90" alt="A selection of grocery essentials" loading="lazy" /><div className="kit-seal"><Sparkles size={17} /><span>MADE FOR<br />EVERYDAY</span></div></div>
      </div></section>

      <section className="promise-section"><div className="section-shell promise-grid">
        <div className="promise-intro reveal-up"><span className="eyebrow">THE RASHID PROMISE</span><h2>Small things.<br /><em>Done thoughtfully.</em></h2></div>
        <div className="promise-item reveal-up"><span><ShieldCheck size={21} /></span><h3>Quality first</h3><p>Everyday essentials selected with care.</p></div>
        <div className="promise-item reveal-up"><span><ShoppingBag size={21} /></span><h3>Easy shopping</h3><p>A clear, simple way to find what you need.</p></div>
        <div className="promise-item reveal-up"><span><Heart size={21} /></span><h3>Neighbourhood care</h3><p>A familiar store experience, made more convenient.</p></div>
      </div></section>

      <footer id="footer" className="site-footer"><div className="footer-main section-shell">
        <div className="footer-brand"><a href="#top" className="brand-lockup"><img src="/Logo.png" alt="" className="brand-logo" /><span className="brand-words"><strong>RASHID</strong><small>MEGA MART</small></span></a><p>Your daily needs, our priority. Everyday shopping, made a little simpler.</p></div>
        <div className="footer-links"><span>EXPLORE</span><a href="#categories">Categories</a><a href="#best-sellers">Favourites</a><a href="#kits">Grocery Kits</a></div>
        <div className="footer-links"><span>GET IN TOUCH</span><p><MapPin size={15} /> Your neighbourhood store</p><a href="#top">Back to top ↑</a></div>
      </div><div className="footer-bottom section-shell"><span>© {new Date().getFullYear()} Rashid Mega Mart. All rights reserved.</span><span>CRAFTED WITH CARE</span></div></footer>
    </main>
  );
}
