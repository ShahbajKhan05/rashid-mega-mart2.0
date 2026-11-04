const sections = [
  { number: "01", name: "HERO SECTION", position: "HOME PAGE · TOP" },
  { number: "02", name: "CATEGORY SECTION", position: "HOME PAGE · BELOW HERO" },
  { number: "03", name: "FEATURED PRODUCTS", position: "HOME PAGE · BELOW CATEGORIES" },
  { number: "04", name: "OFFERS & DEALS", position: "HOME PAGE · BELOW FEATURED PRODUCTS" },
  { number: "05", name: "POPULAR PRODUCTS", position: "HOME PAGE · BELOW OFFERS" },
  { number: "06", name: "WHY CHOOSE US", position: "HOME PAGE · BELOW POPULAR PRODUCTS" },
  { number: "07", name: "FOOTER", position: "HOME PAGE · BOTTOM" },
];

export default function Home() {
  return (
    <main className="relative min-h-[calc(100svh-5rem)] overflow-hidden bg-[#F8F8F3] px-4 py-12 sm:px-8 sm:py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_10%,rgba(184,198,164,0.20),transparent_42%),radial-gradient(ellipse_at_90%_85%,rgba(214,196,151,0.18),transparent_38%)]" />

      <div className="relative mx-auto w-full max-w-5xl">
        <header className="mb-10 text-center sm:mb-14">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.34em] text-[#71816E]">
            RASHID MEGA MART
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-[#244A30] sm:text-4xl">
            HOME PAGE
          </h1>
        </header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {sections.map((section) => (
            <section
              key={section.number}
              className="group relative flex min-h-[112px] items-center gap-5 overflow-hidden rounded-2xl border border-white/80 bg-white/55 px-5 py-5 shadow-[0_8px_30px_rgba(43,62,39,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-[#C8D2BD] hover:bg-white/75 hover:shadow-[0_16px_38px_rgba(43,62,39,0.10)] sm:px-6"
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/45 via-transparent to-[#E8EDE3]/25 opacity-80" />
              <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#DCE4D6] bg-white/65 font-mono text-xs text-[#71816E] shadow-sm">
                {section.number}
              </span>
              <div className="relative min-w-0">
                <h2 className="text-sm font-semibold tracking-[0.12em] text-[#294B32] sm:text-[15px]">
                  {section.name}
                </h2>
                <p className="mt-2 text-[9px] font-medium tracking-[0.14em] text-[#8B9183] sm:text-[10px]">
                  {section.position}
                </p>
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
