"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock3, MapPin, Minus, Plus, Search, ShieldCheck, ShoppingBag, Truck } from "lucide-react";
import { useCart } from "./CartProvider";
import { categoryOptions, products, type Product } from "./data";

type SavedOrder = {
  id: string;
  name: string;
  phone: string;
  address: string;
  payment: "COD" | "UPI on Delivery";
  items: { id: string; name: string; price: number; quantity: number }[];
  total: number;
  status: "Pending Approval" | "Confirmed" | "Rejected" | "Packing" | "Out for Delivery" | "Delivered";
  createdAt: string;
};

const money = (value: number) => `₹${value.toLocaleString("en-IN")}`;
const panel = "rounded-3xl border border-[#eadfce] bg-white shadow-[0_12px_40px_rgba(60,40,20,0.06)]";
const button = "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#800020] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#650019] disabled:cursor-not-allowed disabled:opacity-50";
const field = "mt-1.5 h-12 w-full rounded-xl border border-[#e7dccb] bg-white px-4 text-sm text-[#30251f] outline-none transition focus:border-[#138047] focus:ring-4 focus:ring-[#138047]/10";

function PageIntro({ eyebrow, title, desc }: { eyebrow: string; title: string; desc: string }) {
  return <div className="mb-8"><p className="text-xs font-black uppercase tracking-[.22em] text-[#138047]">{eyebrow}</p><h1 className="mt-2 text-3xl font-black tracking-tight text-[#30251f] sm:text-4xl">{title}</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-[#76665c]">{desc}</p></div>;
}

function ProductTile({ product }: { product: Product }) {
  const { addToCart } = useCart();
  return <article className={`${panel} group overflow-hidden`}>
    <Link href={`/products/${product.slug}`} className="block">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#f7f3eb]">
        <Image src={product.image} alt={product.name} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 240px" className="object-cover transition duration-500 group-hover:scale-105" unoptimized />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold text-[#138047]">{product.rating.toFixed(1)} ★</span>
      </div>
      <div className="p-4">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#a77b3e]">{product.brand || "Daily essentials"}</p>
        <h2 className="mt-1 min-h-10 text-sm font-extrabold leading-5 text-[#30251f]">{product.name}</h2>
        <p className="mt-1 text-xs text-[#8b7c70]">{product.unit}</p>
        <div className="mt-3 flex items-center gap-2"><strong className="text-lg text-[#30251f]">{money(product.price)}</strong><span className="text-xs text-[#9b9188] line-through">{money(product.originalPrice)}</span></div>
      </div>
    </Link>
    <div className="px-4 pb-4"><button className={`${button} w-full`} onClick={() => addToCart({ id: product.id, name: product.name, nameHi: product.nameHi, price: product.price, image: product.image, category: product.category })}><Plus size={16}/> Add to Cart</button></div>
  </article>;
}

export function ProductsPage() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "all");
  const filtered = useMemo(() => products.filter(p => (category === "all" || p.category === category) && (p.name.toLowerCase().includes(query.toLowerCase()) || p.nameHi.includes(query.toLowerCase()) || (p.brand || "").toLowerCase().includes(query.toLowerCase()))), [query, category]);
  return <main className="mx-auto min-h-screen max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:px-8">
    <PageIntro eyebrow="RASHID MEGA MART" title="Everyday groceries, all in one place" desc="Browse daily essentials, compare prices and add what your home needs to your cart."/>
    <div className={`${panel} mb-7 grid gap-3 p-4 sm:grid-cols-[1fr_auto]`}>
      <label className="relative block"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#938579]" size={18}/><input aria-label="Search products" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search atta, rice, oil..." className={`${field} mt-0 pl-11`}/></label>
      <div className="flex flex-wrap gap-2">{categoryOptions.map(c=><button key={c.id} onClick={()=>setCategory(c.id)} className={`rounded-full border px-4 py-2 text-xs font-bold transition ${category===c.id?"border-[#138047] bg-[#138047] text-white":"border-[#e7dccb] bg-[#fffdf8] text-[#62564d] hover:border-[#138047]"}`}>{c.en}</button>)}</div>
    </div>
    <div className="mb-4 flex items-center justify-between"><p className="text-sm font-semibold text-[#76665c]">{filtered.length} products</p><Link href="/order-tracking" className="text-xs font-bold text-[#138047]">Track an order <ArrowRight className="inline" size={14}/></Link></div>
    {filtered.length ? <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">{filtered.map(p=><ProductTile key={p.id} product={p}/>)}</div> : <div className={`${panel} p-12 text-center`}><ShoppingBag className="mx-auto text-[#b6a895]" size={34}/><h2 className="mt-3 font-bold text-[#30251f]">No products found</h2><p className="mt-1 text-sm text-[#76665c]">Try another name or category.</p><button className={`${button} mt-5`} onClick={()=>{setQuery("");setCategory("all")}}>Clear filters</button></div>}
  </main>;
}

export function ProductDetailPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const product = products.find(p=>p.slug===params.slug || p.id===params.slug);
  const { addToCart } = useCart();
  const [qty,setQty]=useState(1);
  if (!product) return <main className="mx-auto min-h-screen max-w-4xl px-4 pt-36 text-center"><h1 className="text-2xl font-black">Product not found</h1><Link className="mt-5 inline-block text-[#138047]" href="/products">Back to products</Link></main>;
  return <main className="mx-auto min-h-screen max-w-6xl px-4 pb-16 pt-28 sm:px-6">
    <Link href="/products" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-[#138047]"><ArrowLeft size={16}/> Back to products</Link>
    <div className={`${panel} grid overflow-hidden md:grid-cols-2`}>
      <div className="relative min-h-[280px] bg-[#f7f3eb] sm:min-h-[460px]"><Image src={product.image} alt={product.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" unoptimized/></div>
      <div className="flex flex-col justify-center p-6 sm:p-10"><p className="text-xs font-black uppercase tracking-[.2em] text-[#138047]">{product.brand || "Rashid Mega Mart"}</p><h1 className="mt-3 text-3xl font-black text-[#30251f]">{product.name}</h1><p className="mt-2 text-sm text-[#76665c]">{product.unit} · {product.rating.toFixed(1)} ★ customer rating</p><div className="mt-6 flex items-center gap-3"><strong className="text-3xl text-[#30251f]">{money(product.price)}</strong><span className="text-sm text-[#9b9188] line-through">{money(product.originalPrice)}</span></div><p className="mt-6 text-sm leading-7 text-[#76665c]">{product.description || "A quality everyday grocery essential for your home."}</p><div className="mt-8 flex items-center gap-3"><div className="flex h-11 items-center rounded-xl border border-[#e7dccb]"><button aria-label="Decrease quantity" className="px-3" onClick={()=>setQty(q=>Math.max(1,q-1))}><Minus size={16}/></button><span className="min-w-8 text-center text-sm font-bold">{qty}</span><button aria-label="Increase quantity" className="px-3" onClick={()=>setQty(q=>q+1)}><Plus size={16}/></button></div><button className={`${button} flex-1`} onClick={()=>{addToCart({id:product.id,name:product.name,nameHi:product.nameHi,price:product.price,image:product.image,category:product.category},qty);router.push("/products")}}>Add to Cart · {money(product.price*qty)}</button></div><p className="mt-5 flex items-center gap-2 text-xs text-[#138047]"><ShieldCheck size={15}/> Final availability is confirmed by the store.</p></div>
    </div>
  </main>;
}

export function CheckoutPage() {
  const router=useRouter();
  const {cartItems,cartTotal,changeQuantity,removeFromCart}=useCart();
  const [name,setName]=useState(""); const [phone,setPhone]=useState(""); const [address,setAddress]=useState(""); const [payment,setPayment]=useState<"COD"|"UPI on Delivery">("COD"); const [error,setError]=useState("");
  useEffect(()=>{const loc=localStorage.getItem("rmm_location");if(loc)setAddress(loc)},[]);
  const submit=(e:FormEvent)=>{e.preventDefault();if(!cartItems.length){setError("Your cart is empty.");return}if(!/^[6-9]\d{9}$/.test(phone)){setError("Enter a valid 10-digit mobile number.");return}if(!name.trim()||!address.trim()){setError("Please complete your name and delivery address.");return}
    const order:SavedOrder={id:`RMM-${Date.now().toString().slice(-8)}`,name:name.trim(),phone,address:address.trim(),payment,items:cartItems.map(i=>({id:i.id,name:i.name,price:i.price,quantity:i.quantity})),total:cartTotal,status:"Pending Approval",createdAt:new Date().toISOString()};
    const previous=JSON.parse(localStorage.getItem("rmm_orders")||"[]") as SavedOrder[];localStorage.setItem("rmm_orders",JSON.stringify([order,...previous]));localStorage.setItem("rmm_last_order",order.id);cartItems.forEach(item=>removeFromCart(item.id));localStorage.setItem("rmm_cart_items","[]");router.push(`/order-confirmation?id=${order.id}`);
  };
  return <main className="mx-auto min-h-screen max-w-6xl px-4 pb-16 pt-28 sm:px-6"><PageIntro eyebrow="SECURE CHECKOUT" title="Delivery details" desc="Share where to deliver your groceries. Your order stays pending until the store checks stock and confirms it."/>
    {!cartItems.length?<div className={`${panel} p-10 text-center`}><ShoppingBag className="mx-auto text-[#b6a895]" size={34}/><h2 className="mt-3 text-xl font-bold">Your cart is empty</h2><Link className={`${button} mt-5`} href="/products">Browse products</Link></div>:<form onSubmit={submit} className="grid gap-6 lg:grid-cols-[1fr_360px]"><section className={`${panel} space-y-5 p-5 sm:p-7`}><div><h2 className="text-lg font-black text-[#30251f]">Customer information</h2><label className="mt-4 block text-xs font-bold text-[#76665c]">Full name<input className={field} value={name} onChange={e=>setName(e.target.value)} autoComplete="name" required placeholder="Your name"/></label><label className="mt-4 block text-xs font-bold text-[#76665c]">Mobile number<input className={field} value={phone} onChange={e=>setPhone(e.target.value.replace(/\D/g,"").slice(0,10))} inputMode="numeric" autoComplete="tel" required placeholder="10-digit mobile number"/></label><label className="mt-4 block text-xs font-bold text-[#76665c]">Delivery address<textarea className={`${field} h-24 py-3`} value={address} onChange={e=>setAddress(e.target.value)} autoComplete="street-address" required placeholder="House, street, landmark, area"/></label></div><div className="border-t border-[#eee5d8] pt-5"><h2 className="text-lg font-black text-[#30251f]">Payment method</h2><div className="mt-3 grid gap-3 sm:grid-cols-2"><label className={`cursor-pointer rounded-2xl border p-4 ${payment==="COD"?"border-[#138047] bg-[#138047]/5":"border-[#e7dccb]"}`}><input type="radio" checked={payment==="COD"} onChange={()=>setPayment("COD")} className="mr-2 accent-[#138047]"/> <strong className="text-sm">Cash on Delivery</strong><p className="mt-1 text-xs text-[#76665c]">Pay in cash when your order arrives.</p></label><label className={`cursor-pointer rounded-2xl border p-4 ${payment==="UPI on Delivery"?"border-[#138047] bg-[#138047]/5":"border-[#e7dccb]"}`}><input type="radio" checked={payment==="UPI on Delivery"} onChange={()=>setPayment("UPI on Delivery")} className="mr-2 accent-[#138047]"/> <strong className="text-sm">UPI on Delivery</strong><p className="mt-1 text-xs text-[#76665c]">Pay by UPI when the order is delivered.</p></label></div></div>{error&&<p role="alert" className="text-sm font-semibold text-red-700">{error}</p>}</section><aside className={`${panel} h-fit p-5 sm:p-6`}><h2 className="text-lg font-black">Order summary</h2><div className="mt-4 space-y-4">{cartItems.map(item=><div key={item.id} className="flex items-center justify-between gap-3 text-sm"><div className="min-w-0 flex-1"><p className="truncate font-bold">{item.name}</p><p className="text-xs text-[#76665c]">{money(item.price)} each</p><div className="mt-1 flex items-center gap-2"><button type="button" onClick={()=>changeQuantity(item.id,-1)} className="rounded border px-2">−</button><span className="text-xs">{item.quantity}</span><button type="button" onClick={()=>changeQuantity(item.id,1)} className="rounded border px-2">+</button><button type="button" onClick={()=>removeFromCart(item.id)} className="ml-1 text-xs text-red-700">Remove</button></div></div><strong>{money(item.price*item.quantity)}</strong></div>)}</div><div className="mt-5 border-t border-[#eee5d8] pt-4"><div className="flex justify-between text-sm text-[#76665c]"><span>Subtotal</span><span>{money(cartTotal)}</span></div><div className="mt-2 flex justify-between text-sm text-[#138047]"><span>Delivery</span><span>To be confirmed</span></div><div className="mt-4 flex justify-between text-lg font-black"><span>Estimated total</span><span>{money(cartTotal)}</span></div><p className="mt-2 text-xs leading-5 text-[#76665c]">Stock and final amount are subject to store approval. No payment is collected online.</p><button className={`${button} mt-5 w-full`} type="submit">Place order request <ArrowRight size={16}/></button></div></aside></form>}
  </main>;
}

export function OrderConfirmationPage() {
  const params=useSearchParams();const id=params.get("id");const [order,setOrder]=useState<SavedOrder|null>(null);
  useEffect(()=>{const all=JSON.parse(localStorage.getItem("rmm_orders")||"[]") as SavedOrder[];setOrder(all.find(o=>o.id===id)||null)},[id]);
  return <main className="mx-auto flex min-h-screen max-w-3xl items-center px-4 pb-16 pt-28"><div className={`${panel} w-full p-7 text-center sm:p-12`}><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#138047]/10 text-[#138047]"><CheckCircle2 size={34}/></div><p className="mt-5 text-xs font-black uppercase tracking-[.2em] text-[#138047]">Order request received</p><h1 className="mt-2 text-3xl font-black text-[#30251f]">Thank you for your order</h1>{order?<><p className="mt-3 text-sm text-[#76665c]">Your request <strong>{order.id}</strong> is now <strong>Pending Approval</strong>. The store will check product availability before confirming.</p><div className="mx-auto mt-6 max-w-md rounded-2xl bg-[#f8f5ee] p-5 text-left"><div className="flex justify-between text-sm"><span>Items</span><strong>{order.items.reduce((n,i)=>n+i.quantity,0)}</strong></div><div className="mt-2 flex justify-between text-sm"><span>Estimated total</span><strong>{money(order.total)}</strong></div><div className="mt-2 flex justify-between text-sm"><span>Payment</span><strong>{order.payment}</strong></div><div className="mt-2 flex justify-between text-sm"><span>Status</span><strong className="text-amber-700">{order.status}</strong></div></div><Link href="/order-tracking" className={`${button} mt-6`}>Track order <ArrowRight size={16}/></Link></>:<p className="mt-3 text-sm text-[#76665c]">Order details are available on the device where the order was placed.</p>}<div className="mt-4"><Link href="/products" className="text-sm font-bold text-[#138047]">Continue shopping</Link></div></div></main>;
}

export function TrackOrderPage() {
  const [id,setId]=useState("");const [phone,setPhone]=useState("");const [order,setOrder]=useState<SavedOrder|null>(null);const [searched,setSearched]=useState(false);
  const search=(e:FormEvent)=>{e.preventDefault();const all=JSON.parse(localStorage.getItem("rmm_orders")||"[]") as SavedOrder[];setOrder(all.find(o=>o.id.toLowerCase()===id.trim().toLowerCase()&&o.phone===phone)||null);setSearched(true)};
  const stages=["Pending Approval","Confirmed","Packing","Out for Delivery","Delivered"];
  const current=order?stages.indexOf(order.status):-1;
  return <main className="mx-auto min-h-screen max-w-3xl px-4 pb-16 pt-28"><PageIntro eyebrow="ORDER TRACKING" title="Where is your order?" desc="Enter your order number and the mobile number used at checkout to view its progress."/><form onSubmit={search} className={`${panel} grid gap-4 p-5 sm:grid-cols-2 sm:p-7`}><label className="text-xs font-bold text-[#76665c]">Order number<input className={field} value={id} onChange={e=>setId(e.target.value)} required placeholder="RMM-12345678"/></label><label className="text-xs font-bold text-[#76665c]">Mobile number<input className={field} value={phone} onChange={e=>setPhone(e.target.value.replace(/\D/g,"").slice(0,10))} required inputMode="numeric" placeholder="10-digit mobile"/></label><button className={`${button} sm:col-span-2`} type="submit">Find my order <ArrowRight size={16}/></button></form>{searched&&(!order?<div className={`${panel} mt-5 p-6 text-center text-sm text-[#76665c]`}>No matching order found on this device. Check the details and try again.</div>:<div className={`${panel} mt-5 p-6 sm:p-8`}><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-wider text-[#138047]">Order {order.id}</p><h2 className="mt-1 text-xl font-black">{order.status}</h2></div><span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800">{order.payment}</span></div><div className="mt-7 space-y-5">{stages.map((stage,i)=><div key={stage} className="flex items-start gap-3"><div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${i<=current?"bg-[#138047] text-white":"bg-[#f0ebe2] text-[#9b9188]"}`}>{i<=current?<CheckCircle2 size={17}/>:<Clock3 size={16}/>}</div><div><p className={`text-sm font-bold ${i<=current?"text-[#30251f]":"text-[#9b9188]"}`}>{stage}</p>{i===0&&<p className="text-xs text-[#76665c]">Store checks stock and availability before confirming.</p>}</div></div>)}</div><div className="mt-6 border-t border-[#eee5d8] pt-4 text-sm"><div className="flex justify-between"><span>Estimated amount</span><strong>{money(order.total)}</strong></div><p className="mt-2 flex items-center gap-2 text-xs text-[#76665c]"><MapPin size={14}/>{order.address}</p></div></div>)}</main>;
}

export function MyOrdersPage() {
  const [orders,setOrders]=useState<SavedOrder[]>([]);
  useEffect(()=>{setOrders(JSON.parse(localStorage.getItem("rmm_orders")||"[]") as SavedOrder[])},[]);
  return <main className="mx-auto min-h-screen max-w-4xl px-4 pb-16 pt-28"><PageIntro eyebrow="YOUR ACCOUNT" title="My orders" desc="Orders placed from this browser are listed here. Use your order number to track progress."/>
    {!orders.length?<div className={`${panel} p-10 text-center`}><ShoppingBag className="mx-auto text-[#b6a895]" size={34}/><h2 className="mt-3 text-xl font-bold">No orders yet</h2><p className="mt-1 text-sm text-[#76665c]">Your order history will appear here after checkout.</p><Link className={`${button} mt-5`} href="/products">Start shopping</Link></div>:<div className="space-y-4">{orders.map(o=><article key={o.id} className={`${panel} p-5 sm:p-6`}><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs font-black tracking-wider text-[#138047]">{o.id}</p><p className="mt-1 text-xs text-[#76665c]">{new Date(o.createdAt).toLocaleString("en-IN")}</p></div><span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800">{o.status}</span></div><div className="mt-4 flex flex-wrap items-center justify-between gap-3"><div><p className="text-sm font-bold">{o.items.reduce((n,i)=>n+i.quantity,0)} items · {money(o.total)}</p><p className="mt-1 text-xs text-[#76665c]">{o.payment}</p></div><Link href="/order-tracking" className="text-sm font-bold text-[#138047]">Track order <ArrowRight className="inline" size={14}/></Link></div></article>)}</div>}
  </main>;
}
