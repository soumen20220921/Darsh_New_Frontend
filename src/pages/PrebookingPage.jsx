import React, {  useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, CalendarClock, Check, ChevronDown, Filter, Search, SlidersHorizontal, Sparkles, X } from "lucide-react";
import { useAppContext } from "../context/AppContext.jsx";

const isPrebooking = (product) => {
  const value = product?.preBooking ?? product?.prebooking ?? product?.isPreBooking ?? product?.isPrebooking ?? product?.is_prebooking;
  return value === true || value === 1 || value === "true" || value === "1";
};

const imageOf = (product, url) => {
  const raw = product?.images?.[0] || product?.image || product?.thumbnail || "";
  if (!raw) return "";
  if (/^https?:\/\//i.test(raw) || raw.startsWith("data:") || raw.startsWith("/")) return raw;
  return `${String(url || "").replace(/\/$/, "")}/img/${raw}`;
};

const priceOf = (p) => Number(p?.price || 0);
const dateOf = (p) => new Date(p?.createdAt || p?.createdDate || p?.date || 0).getTime();

const ProductCard = ({ product, url, index }) => {
  const id = product?._id || product?.id;
  const name = product?.productName || product?.name || product?.title || "Pre-booking Saree";
  const image = imageOf(product, url);
  const price = priceOf(product);
  const oldPrice = Number(product?.originalPrice || product?.oldPrice || product?.oldprice || 0);
  const category = product?.category || product?.subCategory || product?.fabric || "Signature weave";
  const description = product?.description || "Crafted specially for the pre-booking collection.";

  return (
    <Link
      to={`/productDetails/${id}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="group block"
      style={{ animationDelay: `${Math.min(index, 9) * 65}ms` }}
    >
      <article className="prebook-page-card h-full overflow-hidden rounded-[1.25rem] border border-[#741522]/10 bg-[#fffaf1] shadow-[0_8px_30px_rgba(63,22,22,.045)] transition duration-500 group-hover:-translate-y-1 group-hover:border-[#d4ad54]/50 group-hover:shadow-[0_20px_55px_rgba(63,22,22,.11)]">
        <div className="relative aspect-[.78] overflow-hidden bg-[#e8dccb]">
          {image ? (
            <img src={image} alt={`${name} - Darsh Pre-booking`} loading={index < 4 ? "eager" : "lazy"} className="h-full w-full object-cover transition duration-[1200ms] group-hover:scale-[1.045]" />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[radial-gradient(circle_at_50%_30%,#fff9ee,#e5d8c5)] text-[#741522]">
              <div className="image-message-pulse flex h-20 w-20 items-center justify-center rounded-full border border-[#d4ad54]/45 bg-[#fffaf1]/80">
                <Sparkles size={26} strokeWidth={1.15} />
              </div>
              <p className="mt-4 text-[8px] font-semibold uppercase tracking-[.2em]">Image upload pending</p>
              <p className="mt-1 px-5 text-center text-[8px] leading-4 text-[#977e73]">The product is available for reservation. Product image will appear after upload.</p>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#3f1616]/60 via-transparent to-transparent" />
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-[#741522]/92 px-3 py-1.5 text-[7px] font-semibold uppercase tracking-[.16em] text-[#fffaf1] backdrop-blur-md">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#e7c979]" /> Pre-booking
          </span>
          <span className="absolute bottom-3 left-3 rounded-full border border-white/20 bg-black/30 px-2.5 py-1.5 text-[7px] text-white backdrop-blur-md">30–40 days dispatch</span>
        </div>

        <div className="p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="mb-2 truncate text-[7px] uppercase tracking-[.2em] text-[#977e73]">{category}</p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-[13px] font-medium text-[#3f1616]">₹{price.toLocaleString("en-IN")}</p>
              {oldPrice > price && <p className="text-[9px] text-[#9b837b] line-through">₹{oldPrice.toLocaleString("en-IN")}</p>}
            </div>
          </div>
                        <h2 className="truncate font-serif text-[10px] leading-tight text-[#3f1616] transition-colors group-hover:text-[#741522] sm:text-[21px]">{name}</h2>

          <p className="mt-3 line-clamp-2 text-[9px] leading-4 text-[#806c63]">{description}</p>

          <div className="mt-4 flex items-center justify-between border-t border-[#741522]/10 pt-3">
            <span className="inline-flex items-center gap-1.5 text-[7px] font-semibold uppercase tracking-[.14em] text-[#977e73]"><CalendarClock size={12} className="text-[#a77d32]" /> Advance booking</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#741522]/15 text-[#741522] transition group-hover:bg-[#741522] group-hover:text-[#fffaf1]"><ArrowRight size={12} /></span>
          </div>
        </div>
      </article>
    </Link>
  );
};

const EmptyState = ({ hasFilters, onReset }) => (
  <div className="col-span-full rounded-[1.5rem] border border-dashed border-[#741522]/15 bg-[#fffaf1] px-6 py-16 text-center">
    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#d4ad54]/35 bg-[#f3eadb] text-[#741522]">
      <Sparkles size={28} strokeWidth={1.1} />
    </div>
    <h3 className="mt-5 font-serif text-[25px] text-[#3f1616]">{hasFilters ? "No matching pre-booking pieces" : "No pre-booking pieces yet"}</h3>
    <p className="mx-auto mt-2 max-w-[430px] text-[10px] leading-5 text-[#806c63]">{hasFilters ? "Try another search, category, or price range." : "Once a product is marked preBooking in the admin, it will automatically appear in this collection."}</p>
    {hasFilters && <button onClick={onReset} className="mt-5 rounded-full bg-[#741522] px-5 py-3 text-[7px] font-semibold uppercase tracking-[.2em] text-[#fffaf1]">Clear filters</button>}
  </div>
);

const PrebookingPage = () => {
  const { allProduct, url } = useAppContext();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("featured");
  const [priceRange, setPriceRange] = useState("all");
  const [mobileFilters, setMobileFilters] = useState(false);


  const products = useMemo(() => (Array.isArray(allProduct) ? allProduct.filter(isPrebooking) : []), [allProduct]);

  const categories = useMemo(() => {
    const values = products.map((p) => p?.category || p?.subCategory || p?.fabric).filter(Boolean);
    return [...new Set(values)].sort((a, b) => String(a).localeCompare(String(b)));
  }, [products]);

  const filteredProducts = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const list = products.filter((product) => {
      const searchable = [product?.productName, product?.name, product?.title, product?.category, product?.subCategory, product?.fabric, product?.description, ...(Array.isArray(product?.tags) ? product.tags : [product?.tags])].filter(Boolean).join(" ").toLowerCase();
      const matchesSearch = !needle || searchable.includes(needle);
      const productCategory = product?.category || product?.subCategory || product?.fabric || "";
      const matchesCategory = category === "all" || productCategory === category;
      const price = priceOf(product);
      const matchesPrice = priceRange === "all" || (priceRange === "under5000" && price < 5000) || (priceRange === "5000to10000" && price >= 5000 && price <= 10000) || (priceRange === "over10000" && price > 10000);
      return matchesSearch && matchesCategory && matchesPrice;
    });

    return [...list].sort((a, b) => {
      if (sort === "priceLow") return priceOf(a) - priceOf(b);
      if (sort === "priceHigh") return priceOf(b) - priceOf(a);
      if (sort === "newest") return dateOf(b) - dateOf(a);
      if (sort === "oldest") return dateOf(a) - dateOf(b);
      return 0;
    });
  }, [products, query, category, priceRange, sort]);

  const clearFilters = () => {
    setQuery("");
    setCategory("all");
    setPriceRange("all");
    setSort("featured");
  };

  const hasFilters = Boolean(query || category !== "all" || priceRange !== "all" || sort !== "featured");

  return (
    <main className="min-h-screen overflow-hidden bg-[#f8f4eb] text-[#3f1616]">
      <style>{`
        @keyframes pageHeroIn { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
        @keyframes cardIn { from { opacity:0; transform:translateY(20px) scale(.985); } to { opacity:1; transform:translateY(0) scale(1); } }
        @keyframes imageMessagePulse { 0%,100% { box-shadow:0 0 0 0 rgba(212,173,84,.16); transform:scale(1); } 50% { box-shadow:0 0 0 14px rgba(212,173,84,0); transform:scale(1.05); } }
        .prebook-page-hero { animation:pageHeroIn .8s ease both; }
        .prebook-page-card { animation:cardIn .65s cubic-bezier(.2,.8,.2,1) both; }
        .image-message-pulse { animation:imageMessagePulse 2.2s ease-in-out infinite; }
        .filter-scroll { scrollbar-width:none; -ms-overflow-style:none; }
        .filter-scroll::-webkit-scrollbar { display:none; }
        @media (prefers-reduced-motion:reduce) { .prebook-page-hero,.prebook-page-card,.image-message-pulse { animation:none !important; } }
      `}</style>

      <section className="relative overflow-hidden border-b border-[#741522]/10 bg-[#741522] text-[#fffaf1]">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border border-[#e7c979]/15" />
        <div className="pointer-events-none absolute bottom-[-180px] left-[15%] h-96 w-96 rounded-full bg-[#d4ad54]/10 blur-3xl" />
        <div className="mx-auto max-w-[1180px] px-5 py-12 sm:px-8 sm:py-16 lg:px-0 lg:py-20">
          <div className="prebook-page-hero max-w-3xl">
            <Link to="/" className="mb-7 inline-flex items-center gap-2 text-[7px] font-semibold uppercase tracking-[.22em] text-[#e7c979] transition hover:text-white"><ArrowLeft size={13} /> Back to Darsh</Link>
            <div className="mb-3 flex items-center gap-2 text-[#e7c979]"><Sparkles size={14} /><span className="text-[7px] font-semibold uppercase tracking-[.34em]">THE DARSH PRE-BOOKING EDIT</span></div>
            <h1 className="font-serif text-[39px] leading-[.94] sm:text-[58px] lg:text-[72px]">Reserve a signature saree before production.</h1>
            <p className="mt-5 max-w-2xl text-[10px] leading-5 text-[#ead8c5] sm:text-[12px] sm:leading-6">This is a purely pre-booking (advance booking) collection. We manufacture selected catalogues based on the number of orders received. Dispatch may take 30–40 days, followed by approximately 5–7 days to reach your address.</p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-3">
            <div className="rounded-2xl border border-[#e7c979]/15 bg-white/[.035] p-4"><p className="text-[7px] uppercase tracking-[.2em] text-[#e7c979]">01 · Production</p><p className="mt-2 text-[11px] font-medium">Made from received bookings</p></div>
            <div className="rounded-2xl border border-[#e7c979]/15 bg-white/[.035] p-4"><p className="text-[7px] uppercase tracking-[.2em] text-[#e7c979]">02 · Dispatch</p><p className="mt-2 text-[11px] font-medium">Usually 30–40 days</p></div>
            <div className="rounded-2xl border border-[#e7c979]/15 bg-white/[.035] p-4"><p className="text-[7px] uppercase tracking-[.2em] text-[#e7c979]">03 · Delivery</p><p className="mt-2 text-[11px] font-medium">Usually another 5–7 days</p></div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-4 py-8 sm:px-8 sm:py-12 lg:px-0">
        <div className="rounded-[1.5rem] border border-[#741522]/10 bg-[#fffaf1] p-4 shadow-[0_10px_35px_rgba(63,22,22,.045)] sm:p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <label className="relative min-w-0 flex-1">
              <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#977e73]" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search saree, weave, fabric, category..." className="h-12 w-full rounded-xl border border-[#741522]/10 bg-[#f8f4eb] pl-11 pr-10 text-[10px] text-[#3f1616] outline-none placeholder:text-[#aa958c] focus:border-[#741522]/35" />
              {query && <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#977e73] hover:text-[#741522]"><X size={14} /></button>}
            </label>

            <button onClick={() => setMobileFilters((v) => !v)} className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-[#741522]/15 px-4 text-[8px] font-semibold uppercase tracking-[.16em] text-[#741522] lg:hidden"><SlidersHorizontal size={14} /> Filters</button>

            <div className={`${mobileFilters ? "grid" : "hidden"} grid-cols-1 gap-2 sm:grid-cols-2 lg:hidden`}>
              <FilterSelect label="Category" value={category} onChange={setCategory} options={[{ value: "all", label: "All categories" }, ...categories.map((item) => ({ value: item, label: item }))]} />
              <FilterSelect label="Price" value={priceRange} onChange={setPriceRange} options={[{ value: "all", label: "All prices" }, { value: "under5000", label: "Under ₹5,000" }, { value: "5000to10000", label: "₹5,000 – ₹10,000" }, { value: "over10000", label: "Above ₹10,000" }]} />
              <FilterSelect label="Sort" value={sort} onChange={setSort} options={[{ value: "featured", label: "Featured" }, { value: "newest", label: "Newest" }, { value: "oldest", label: "Oldest" }, { value: "priceLow", label: "Price: Low to high" }, { value: "priceHigh", label: "Price: High to low" }]} />
            </div>

            <div className="hidden gap-2 lg:flex">
              <FilterSelect label="Category" value={category} onChange={setCategory} options={[{ value: "all", label: "All categories" }, ...categories.map((item) => ({ value: item, label: item }))]} />
              <FilterSelect label="Price" value={priceRange} onChange={setPriceRange} options={[{ value: "all", label: "All prices" }, { value: "under5000", label: "Under ₹5,000" }, { value: "5000to10000", label: "₹5,000 – ₹10,000" }, { value: "over10000", label: "Above ₹10,000" }]} />
              <FilterSelect label="Sort" value={sort} onChange={setSort} options={[{ value: "featured", label: "Featured" }, { value: "newest", label: "Newest" }, { value: "oldest", label: "Oldest" }, { value: "priceLow", label: "Price: Low to high" }, { value: "priceHigh", label: "Price: High to low" }]} />
            </div>
          </div>

          <div className="filter-scroll mt-4 flex gap-2 overflow-x-auto pb-1">
            <button onClick={() => setCategory("all")} className={`shrink-0 rounded-full px-3.5 py-2 text-[7px] font-semibold uppercase tracking-[.16em] transition ${category === "all" ? "bg-[#741522] text-[#fffaf1]" : "border border-[#741522]/10 bg-[#f8f4eb] text-[#806c63]"}`}>All · {products.length}</button>
            {categories.slice(0, 8).map((item) => <button key={item} onClick={() => setCategory(item)} className={`shrink-0 rounded-full px-3.5 py-2 text-[7px] font-semibold uppercase tracking-[.16em] transition ${category === item ? "bg-[#741522] text-[#fffaf1]" : "border border-[#741522]/10 bg-[#f8f4eb] text-[#806c63]"}`}>{item}</button>)}
            {hasFilters && <button onClick={clearFilters} className="ml-auto shrink-0 rounded-full px-3.5 py-2 text-[7px] font-semibold uppercase tracking-[.16em] text-[#741522]">Clear all</button>}
          </div>
        </div>

        <div className="mt-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-[7px] font-semibold uppercase tracking-[.28em] text-[#977e73]">Collection</p>
            <h2 className="mt-2 font-serif text-[31px] leading-none sm:text-[42px]">Pre-booking sarees</h2>
          </div>
          <p className="text-right text-[9px] text-[#806c63]">Showing <b className="text-[#3f1616]">{filteredProducts.length}</b> of {products.length}</p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {filteredProducts.length ? filteredProducts.map((product, index) => <ProductCard key={product?._id || product?.id || index} product={product} url={url} index={index} />) : <EmptyState hasFilters={hasFilters} onReset={clearFilters} />}
        </div>

        <div className="mt-10 rounded-[1.5rem] border border-[#741522]/10 bg-[#741522] p-6 text-[#fffaf1] sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl"><div className="flex items-center gap-2 text-[#e7c979]"><Check size={14} /><span className="text-[7px] uppercase tracking-[.24em]">Please understand before booking</span></div><h3 className="mt-2 font-serif text-[25px] sm:text-[32px]">A slower process for a signature release.</h3><p className="mt-2 text-[9px] leading-5 text-[#e8d5c1]">If you choose to change your mind, you may cancel your booking with ease. Exchange options may be available for another saree from the exclusive collection, subject to the store policy.</p></div>
            <Link to="/" className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-[#e7c979]/55 px-5 py-3 text-[7px] font-semibold uppercase tracking-[.18em] text-[#e7c979] transition hover:bg-[#e7c979] hover:text-[#4c1117]">Back to home <ArrowRight size={13} /></Link>
          </div>
        </div>
      </section>
    </main>
  );
};

const FilterSelect = ({ label, value, onChange, options }) => (
  <label className="relative block min-w-[145px]">
    <span className="sr-only">{label}</span>
    <Filter size={12} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#977e73]" />
    <select value={value} onChange={(e) => onChange(e.target.value)} className="h-12 w-full appearance-none rounded-xl border border-[#741522]/10 bg-[#f8f4eb] pl-8 pr-8 text-[8px] font-medium text-[#3f1616] outline-none focus:border-[#741522]/30">
      {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
    </select>
    <ChevronDown size={13} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#977e73]" />
  </label>
);

export default PrebookingPage;