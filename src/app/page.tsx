export default function Home() {
  const sections = [
    "HERO SECTION",
    "CATEGORY SECTION",
    "FEATURED PRODUCTS",
    "OFFERS & DEALS",
    "POPULAR PRODUCTS",
    "WHY CHOOSE US",
    "FOOTER",
  ];

  return (
    <main className="min-h-[calc(100svh-5rem)] bg-[#FFFCF0] px-4 py-10 sm:px-8">
      <div className="mx-auto flex min-h-[70vh] w-full max-w-4xl flex-col items-center justify-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-[#71816E]">
          Rashid Mega Mart
        </p>
        <h1 className="mb-10 text-center text-3xl font-semibold tracking-tight text-[#244A30] sm:text-4xl">
          HOME PAGE
        </h1>

        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
          {sections.map((section, index) => (
            <div
              key={section}
              className="flex min-h-20 items-center gap-4 rounded-xl border border-[#E7E2D5] bg-white/70 px-5 py-4"
            >
              <span className="font-mono text-xs text-[#A18B60]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-sm font-medium tracking-[0.12em] text-[#485747]">
                {section}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-xs tracking-wide text-[#9A9588]">
          SECTION LAYOUT PLACEHOLDERS — DESIGN TO BE ADDED LATER
        </p>
      </div>
    </main>
  );
}
