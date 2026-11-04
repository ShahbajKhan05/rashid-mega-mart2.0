"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-[calc(100svh-76px)] items-center justify-center overflow-hidden bg-[#f5f0e6] px-4 py-8 sm:py-12">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-60 [background-image:linear-gradient(rgba(128,0,32,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(128,0,32,.045)_1px,transparent_1px)] [background-size:34px_34px]" />
      <section className="w-full max-w-4xl overflow-hidden rounded-[28px] border border-[#dfd1bb] bg-[#fffdf8] shadow-[0_28px_90px_rgba(69,45,24,.14)]">
        <header className="flex items-center justify-between border-b border-[#eadfce] px-4 py-3 sm:px-7">
          <Link href="/" aria-label="Rashid Mega Mart home" className="inline-flex items-center">
            <Image src="/Logo.png" alt="Rashid Mega Mart" width={150} height={64} priority className="h-10 w-auto object-contain sm:h-12" />
          </Link>
          <span className="rounded-full border border-[#e4cda8] bg-[#fff6e4] px-3 py-1 text-[10px] font-black tracking-[.18em] text-[#8b5b22] sm:text-xs">SITE WORK IN PROGRESS</span>
        </header>

        <div className="grid items-center gap-2 p-4 sm:gap-8 sm:p-8 md:grid-cols-[1.05fr_.95fr]">
          <div className="order-2 text-center md:order-1 md:text-left">
            <p className="text-[10px] font-black tracking-[.28em] text-[#a77b3e] sm:text-xs">RASHID MEGA MART · SITE NOTICE</p>
            <h1 className="mt-3 text-3xl font-black leading-[.98] tracking-[-.06em] text-[#800020] sm:text-5xl">Oops! This page is still being built.</h1>
            <p className="mt-3 text-sm leading-6 text-[#71665a] sm:text-base">Our construction crew is working on this area. The page you’re looking for isn’t ready or may have moved.</p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#f8edda] px-3 py-2 text-[11px] font-extrabold tracking-[.1em] text-[#82531e]">
              <span className="relative flex h-2.5 w-2.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d49a3d] opacity-70" /><span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#b87926]" /></span>
              CREW AT WORK · 404
            </div>
            <div className="mt-6 flex flex-col justify-center gap-2.5 sm:flex-row md:justify-start">
              <Link href="/" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#800020] px-5 text-sm font-bold text-white shadow-[0_8px_18px_rgba(128,0,32,.18)] transition hover:-translate-y-0.5 hover:bg-[#650019] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#800020]"><Home size={16} /> Back to Home</Link>
              <Link href="/products" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#e5d6bd] bg-white px-5 text-sm font-bold text-[#5a1023] transition hover:-translate-y-0.5 hover:bg-[#fffaf0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#800020]"><ArrowLeft size={16} /> Explore Store</Link>
            </div>
          </div>

          <div className="order-1 rounded-2xl border border-[#e7d9c4] bg-[linear-gradient(180deg,#fffaf0,#f2e7d4)] p-2 sm:p-4 md:order-2">
            <svg viewBox="0 0 620 440" role="img" aria-label="Detailed animated construction site: a yellow JCB excavator actively digging soil beside a building under construction, with bricklayers, scaffolding, a tower crane and construction materials" className="h-auto w-full">
              <defs>
                <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#fffaf0"/><stop offset="1" stopColor="#e8d8bd"/></linearGradient>
                <linearGradient id="jcbPaint" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#ffe18a"/><stop offset=".5" stopColor="#e5a72f"/><stop offset="1" stopColor="#a96a19"/></linearGradient>
                <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#c5dddd"/><stop offset="1" stopColor="#789b9b"/></linearGradient>
                <linearGradient id="soil" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#c99a60"/><stop offset="1" stopColor="#8b5d38"/></linearGradient>
                <pattern id="bricks" width="42" height="24" patternUnits="userSpaceOnUse"><path d="M0 0H42M0 12H42M21 0V12M0 12V24" stroke="#a66e4b" strokeWidth="1.5" opacity=".75"/></pattern>
                <pattern id="warningStripe" width="18" height="18" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><rect width="9" height="18" fill="#f4ca70"/><rect x="9" width="9" height="18" fill="#7e172d"/></pattern>
                <filter id="shadow"><feGaussianBlur stdDeviation="5"/></filter>
              </defs>
              <rect x="7" y="7" width="606" height="426" rx="20" fill="url(#sky)"/>
              <circle cx="535" cy="70" r="31" fill="#e8c77f" opacity=".65"/>
              <path d="M25 344Q115 329 190 344T350 342T600 341V420H25Z" fill="#d5b58a" opacity=".55"/>
              <path d="M25 365H595" stroke="#947657" strokeWidth="3" strokeDasharray="10 8"/>
              <!-- Tower crane -->
              <g stroke="#8a1b32" strokeWidth="5" fill="none" strokeLinejoin="round">
                <path d="M510 340V48M493 340L510 48L527 340M510 48H595L579 61H510"/>
                <path d="M510 48L595 48M527 48L595 95M510 82L572 48M510 116L548 48"/>
                <path d="M535 340H485L475 353H545Z" fill="#d6a13e" stroke="#9c6b2c"/>
              </g>
              <path d="M586 61V127" stroke="#6f172b" strokeWidth="3"/>
              <g className="crane-load"><path d="M586 127V145Q586 158 599 152" fill="none" stroke="#6f172b" strokeWidth="4" strokeLinecap="round"/><rect x="572" y="151" width="28" height="24" rx="3" fill="#d9a346" stroke="#80562a" strokeWidth="2"/><path d="M576 157H596M576 164H596" stroke="#fff1cb" strokeWidth="2"/></g>
              <!-- Building skeleton and unfinished floors -->
              <g>
                <path d="M230 345V139L333 88L436 139V345Z" fill="#e8d9bf" stroke="#967b59" strokeWidth="3"/>
                <path d="M230 139L333 88L436 139V345H230Z" fill="url(#bricks)" opacity=".8"/>
                <path d="M215 143L333 82L451 143" fill="none" stroke="#7f1930" strokeWidth="8" strokeLinejoin="round"/>
                <path d="M230 205H436M230 274H436" stroke="#8f7656" strokeWidth="5"/>
                <path d="M253 157H294V196H253ZM312 157H353V196H312ZM371 157H412V196H371Z" fill="url(#glass)" stroke="#927958" strokeWidth="3"/>
                <path d="M253 222H294V263H253ZM312 222H353V263H312ZM371 222H412V263H371Z" fill="#f7efdf" stroke="#927958" strokeWidth="3"/>
                <path d="M310 345V293Q333 267 356 293V345" fill="#7f1930" opacity=".88"/>
                <path d="M230 139H436V151H230Z" fill="#d7c3a2"/>
                <path d="M242 122L242 345M424 122V345" stroke="#927958" strokeWidth="4"/>
                <path d="M242 210H424M242 278H424" stroke="#927958" strokeWidth="3" strokeDasharray="7 5"/>
              </g>
              <!-- Scaffolding in front of building -->
              <g fill="none" stroke="#9b7448" strokeWidth="4">
                <path d="M195 125V345M165 125V345M135 125V345M120 160H210M120 220H210M120 280H210M120 160L195 220M195 160L120 220M120 220L195 280M195 220L120 280"/>
                <path d="M165 125L180 110H210V125"/>
              </g>
              <g fill="#d6a13e" stroke="#8d632d" strokeWidth="2"><rect x="155" y="151" width="22" height="8" rx="2"/><rect x="185" y="211" width="22" height="8" rx="2"/></g>
              <!-- Brick stacks and cement bags -->
              <g stroke="#9c6849" strokeWidth="1.5"><path d="M445 326H492V344H445Z" fill="#b96f4c"/><path d="M445 317H492V326H445Z" fill="#d08b61"/><path d="M450 308H487V317H450Z" fill="#b96f4c"/><path d="M449 335H488M457 317V326M477 317V326" stroke="#f1c39b"/></g>
              <g><path d="M452 285Q468 276 484 285L488 307H449Z" fill="#e6ddc8" stroke="#a99a7c" strokeWidth="2"/><path d="M457 292H480" stroke="#a99a7c" strokeWidth="2"/></g>
              <!-- Fresh excavation trench and soil -->
              <path d="M20 355Q83 337 142 357Q183 373 232 352L232 397H20Z" fill="url(#soil)"/>
              <path d="M26 354Q77 338 125 355T224 352" fill="none" stroke="#7e5234" strokeWidth="5"/>
              <path d="M35 369Q78 355 111 370T190 368" fill="none" stroke="#e0b37b" strokeWidth="3" opacity=".8"/>
              <g className="dirt-fall" fill="#9a673d"><circle cx="188" cy="330" r="4"/><circle cx="199" cy="340" r="3"/><circle cx="211" cy="331" r="5"/><circle cx="222" cy="344" r="3"/></g>
              <!-- JCB excavator: tracks, body, cab -->
              <ellipse cx="105" cy="361" rx="93" ry="12" fill="#5b4633" opacity=".2" filter="url(#shadow)"/>
              <g>
                <path d="M32 332Q32 313 52 313H162Q181 313 184 332L176 359H40Z" fill="#34312d" stroke="#242321" strokeWidth="3"/>
                <path d="M45 337H171" stroke="#a69a84" strokeWidth="4" strokeDasharray="10 6"/>
                <circle cx="59" cy="347" r="12" fill="#5e574d" stroke="#b6a58a" strokeWidth="4"/><circle cx="91" cy="347" r="12" fill="#5e574d" stroke="#b6a58a" strokeWidth="4"/><circle cx="123" cy="347" r="12" fill="#5e574d" stroke="#b6a58a" strokeWidth="4"/><circle cx="155" cy="347" r="12" fill="#5e574d" stroke="#b6a58a" strokeWidth="4"/>
                <path d="M49 315Q52 278 91 272H145Q164 278 169 315Z" fill="url(#jcbPaint)" stroke="#8a5d20" strokeWidth="3"/>
                <path d="M66 279Q70 257 96 253H126L144 279Z" fill="#e8ad35" stroke="#8a5d20" strokeWidth="3"/>
                <path d="M91 259H123L137 281H88Z" fill="url(#glass)" stroke="#6c604b" strokeWidth="3"/>
                <path d="M103 260V279" stroke="#f8e9c9" strokeWidth="2"/>
                <path d="M55 300H77V309H55Z" fill="#f7d77d"/><path d="M148 291H164V303H148Z" fill="#fff0b6"/>
                <text x="99" y="302" fill="#713c12" fontSize="11" fontWeight="900" letterSpacing="1">JCB</text>
              </g>
              <!-- Articulated digging arm; bucket moves down into the trench -->
              <g className="dig-arm">
                <path d="M151 284L181 251L211 264L190 300Z" fill="url(#jcbPaint)" stroke="#8a5d20" strokeWidth="4" strokeLinejoin="round"/>
                <circle cx="177" cy="270" r="8" fill="#514337" stroke="#f1c66d" strokeWidth="3"/>
                <path d="M202 269L231 311L218 321L185 284Z" fill="#d89a2c" stroke="#80531d" strokeWidth="4" strokeLinejoin="round"/>
                <circle cx="210" cy="294" r="7" fill="#514337" stroke="#f1c66d" strokeWidth="3"/>
                <path d="M229 309L247 329L237 352Q229 359 218 350L207 337L218 328L228 340L235 326Z" fill="#8a5b2d" stroke="#604124" strokeWidth="3" strokeLinejoin="round"/>
                <path d="M215 342L225 350M228 344L236 351" stroke="#e2b16c" strokeWidth="3"/>
              </g>
              <!-- Site worker on scaffold -->
              <g className="worker-motion">
                <circle cx="181" cy="190" r="8" fill="#b77b52"/>
                <path d="M172 187Q181 175 190 187L191 191H171Z" fill="#e6ad39" stroke="#8b642d" strokeWidth="2"/>
                <path d="M174 201H188L193 229H170Z" fill="#7f1930"/>
                <path d="M176 208L163 221M187 208L200 219" stroke="#b77b52" strokeWidth="5" strokeLinecap="round"/>
                <path d="M175 229L171 240M187 229L191 240" stroke="#51483e" strokeWidth="5" strokeLinecap="round"/>
              </g>
              <!-- Bricklayer working on upper floor -->
              <g>
                <circle cx="387" cy="211" r="7" fill="#b77b52"/><path d="M379 208Q387 197 395 208L395 212H379Z" fill="#e6ad39"/>
                <path d="M379 220H394L398 245H376Z" fill="#315f58"/>
                <path d="M380 225L366 235M393 225L405 233" stroke="#b77b52" strokeWidth="5" strokeLinecap="round"/>
                <path d="M380 245L378 255M392 245L395 255" stroke="#51483e" strokeWidth="5"/>
                <path d="M401 230L410 219" stroke="#8b6a45" strokeWidth="3"/>
              </g>
              <!-- Safety barriers, warning boards and cones -->
              <g><path d="M22 385H202M22 385V411M202 385V411M22 400H202" stroke="#7f1930" strokeWidth="6" strokeLinecap="round"/><path d="M24 385L47 400M67 385L90 400M110 385L133 400M153 385L176 400" stroke="#f4cf7e" strokeWidth="6"/></g>
              <g className="cone"><path d="M470 382L483 345L496 382Z" fill="#df9f36" stroke="#8a602a" strokeWidth="2"/><path d="M476 365H490" stroke="#fff5df" strokeWidth="5"/><path d="M464 384H502" stroke="#7f1930" strokeWidth="5" strokeLinecap="round"/></g>
              <g><rect x="270" y="366" width="102" height="25" rx="4" fill="url(#warningStripe)" stroke="#7e172d" strokeWidth="2"/><text x="321" y="383" textAnchor="middle" fontSize="10" fontWeight="900" fill="#401b20">CAUTION</text></g>
              <style>{`
                .dig-arm { transform-box: fill-box; transform-origin: 151px 284px; animation: digging 2.8s ease-in-out infinite; }
                .dirt-fall { animation: soilDrop 2.8s ease-in-out infinite; }
                .crane-load { transform-box: fill-box; transform-origin: top center; animation: loadSwing 3.5s ease-in-out infinite; }
                .worker-motion { transform-box: fill-box; transform-origin: center bottom; animation: workerMove 2.2s ease-in-out infinite; }
                .cone { animation: coneBounce 2.6s ease-in-out infinite; transform-origin: center bottom; }
                @keyframes digging { 0%,100% { transform: rotate(0deg); } 42% { transform: rotate(13deg); } 72% { transform: rotate(-5deg); } }
                @keyframes soilDrop { 0%,35%,100% { opacity:.25; transform:translateY(-3px); } 55% { opacity:1; transform:translateY(8px); } }
                @keyframes loadSwing { 0%,100% { transform:rotate(-4deg); } 50% { transform:rotate(5deg); } }
                @keyframes workerMove { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-3px); } }
                @keyframes coneBounce { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-3px); } }
                @media (prefers-reduced-motion: reduce) { .dig-arm,.dirt-fall,.crane-load,.worker-motion,.cone { animation:none !important; } }
              `}</style>
            </svg>      </svg>
          </div>
        </div>
        <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-[#eadfce] bg-[#fffaf1] px-4 py-3 text-[10px] font-bold tracking-[.12em] text-[#9b8261] sm:px-7">
          <span>SAFETY FIRST · QUALITY ALWAYS</span><span>RASHID MEGA MART CONSTRUCTION ZONE</span>
        </footer>
      </section>
    </main>
  );
}
