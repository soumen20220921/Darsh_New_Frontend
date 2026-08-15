import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Filter, Heart, Search, SlidersHorizontal, Sparkles, X, Crown } from "lucide-react";
import { useAppContext } from "../context/AppContext.jsx";

const PREMIUM_KEYWORDS = [
  "premium", "kanchipuram", "kanjivaram", "banarasi", "gadwal",
  "muga", "mulberry silk", "pure silk", "tussar silk",
];

const COLORS = ["All", "Red", "White", "Yellow", "Blue", "Green", "Pink", "Black", "Purple"];

const getText = (p) => [
  p?.productName,
  p?.name,
  p?.title,
  p?.fabric,
  p?.description,
  p?.shortDescription,
  ...(Array.isArray(p?.tags) ? p.tags : []),
].filter(Boolean).join(" ").toLowerCase();

const getColor = (p) => String(
  p?.color || p?.colour || p?.productColor || p?.shade || p?.variant?.color || ""
).toLowerCase();

const isPremium = (p) => {
  // PRICE is the only eligibility rule.
  // Category name is intentionally NOT used.
  return Number(p?.price || 0) >= 5000;
};

const premiumKeywordScore = (p) => {
  const text = getText(p);

  return PREMIUM_KEYWORDS.reduce(
    (score, keyword) =>
      score + (text.includes(keyword) ? 1 : 0),
    0
  );
};

const imageFor = (p, url) => p?.images?.[0] ? `${url}/img/${p.images[0]}` : p?.image || "/IMG/saree.png";

const ProductCard = ({ product, url, index, onWish, wished }) => {
  const id = product?._id || product?.id;
  const name = product?.productName || product?.name || "Premium Saree";
  const price = Number(product?.price || 0);
  const oldPrice = Number(product?.originalPrice || product?.oldPrice || product?.oldprice || 0);
  const meta = product?.fabric || product?.category || product?.subCategory || "SIGNATURE WEAVE";

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: .45, delay: Math.min(index * .045, .35) }}
      className="group min-w-0"
    >
      <Link to={`/productDetails/${id}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="block">
        <div className="relative aspect-[0.78] overflow-hidden bg-[#eee5d5]">
          <img src={imageFor(product, url)} alt={`${name} - Darsh Premium Saree`} loading={index > 3 ? "lazy" : "eager"} className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-[1.045]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#3f1616]/45 via-transparent to-transparent opacity-70" />
          <span className="absolute flex flex-nowrap gap-1 left-3 top-3 bg-[#d4ad54] px-2.5 py-1.5 text-[6px] font-semibold uppercase tracking-[.2em] text-[#4a1815] sm:text-[7px]"> <Crown size={10} /> PREMIUM</span>
          <button type="button" aria-label="Wishlist" onClick={(e) => { e.preventDefault(); e.stopPropagation(); onWish(product); }} className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border backdrop-blur-sm transition-all ${wished ? "border-[#741522] bg-[#741522] text-white" : "border-white/70 bg-white/80 text-[#741522] hover:bg-white"}`}>
            <Heart size={14} fill={wished ? "currentColor" : "none"} />
          </button>
          <div className="absolute bottom-3 left-1/2 hidden -translate-x-1/2 translate-y-3 opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100 sm:block">
            <span className="whitespace-nowrap bg-[#f8f4eb]/95 px-5 py-2.5 text-[7px] uppercase tracking-[.2em] text-[#741522] shadow-lg">View Saree</span>
          </div>
        </div>
      </Link>
      <div className="pt-3 sm:pt-4">
        <div className="flex items-start justify-between gap-2">
          <h2 className="min-w-0 truncate font-serif text-[16px] leading-tight text-[#3f1616] sm:text-[19px]">{name}</h2>
          <div className="shrink-0 text-right">
            <p className="text-[10px] text-[#3d1714] sm:text-[12px]">₹{price.toLocaleString("en-IN")}</p>
            {oldPrice > price && <p className="text-[8px] text-[#8e7770] line-through">₹{oldPrice.toLocaleString("en-IN")}</p>}
          </div>
        </div>
        <p className="mt-1.5 truncate text-[7px] uppercase tracking-[.18em] text-[#977e73] sm:text-[8px]">{meta}</p>
      </div>
    </motion.article>
  );
};

const PremiumSarees = () => {
  const { allProduct = [], url } = useAppContext();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [color, setColor] = useState("All");
  const [price, setPrice] = useState("all");
  const [sort, setSort] = useState("featured");
  const [mobileFilters, setMobileFilters] = useState(false);
  const [wishlist, setWishlist] = useState(() => {
    try { return JSON.parse(localStorage.getItem("wishlist") || "[]"); } catch { return []; }
  });

  const premiumProducts = useMemo(() => {
    const source = Array.isArray(allProduct) ? allProduct : [];
    return source
      .filter(isPremium)
      .sort((a, b) => {
        const keywordDifference =
          premiumKeywordScore(b) -
          premiumKeywordScore(a);

        if (keywordDifference !== 0) {
          return keywordDifference;
        }

        return (
          Number(b?.price || 0) -
          Number(a?.price || 0)
        );
      });
  }, [allProduct]);

  const categories = useMemo(() => {
    const set = new Set();
    premiumProducts.forEach((p) => {
      [p?.category, p?.subCategory, p?.fabric].filter(Boolean).forEach((v) => set.add(String(v).trim()));
    });
    return ["All", ...Array.from(set).sort((a,b) => a.localeCompare(b))];
  }, [premiumProducts]);

  const filtered = useMemo(() => {
    let list = premiumProducts.filter((p) => {
      const text = getText(p);
      const q = search.trim().toLowerCase();
      const catText = [p?.category, p?.subCategory, p?.fabric].filter(Boolean).join(" ").toLowerCase();
      const c = getColor(p);
      const amount = Number(p?.price || 0);

      // Final safety guard: never show below ₹5,000.
      const matchesPremiumPrice =
        amount >= 5000;

      const matchesSearch = !q || text.includes(q);
      const matchesCategory = category === "All" || catText.includes(category.toLowerCase());
      const matchesColor = color === "All" || c.includes(color.toLowerCase());
      const matchesPrice = price === "all" || (price === "under10" && amount < 10000) || (price === "10to20" && amount >= 10000 && amount <= 20000) || (price === "above20" && amount > 20000);
      return (
        matchesPremiumPrice &&
        matchesSearch &&
        matchesCategory &&
        matchesColor &&
        matchesPrice
      );
    });
    if (sort === "priceLow") list.sort((a,b) => Number(a?.price||0)-Number(b?.price||0));
    if (sort === "priceHigh") list.sort((a,b) => Number(b?.price||0)-Number(a?.price||0));
    if (sort === "newest") list.sort((a,b) => new Date(b?.createdAt||0)-new Date(a?.createdAt||0));
    return list;
  }, [premiumProducts, search, category, color, price, sort]);

  const toggleWishlist = (product) => {
    const id = product?._id || product?.id;
    const exists = wishlist.some((p) => (p?._id || p?.id) === id);
    const next = exists ? wishlist.filter((p) => (p?._id || p?.id) !== id) : [...wishlist, product];
    setWishlist(next);
    localStorage.setItem("wishlist", JSON.stringify(next));
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  const clearFilters = () => { setSearch(""); setCategory("All"); setColor("All"); setPrice("all"); setSort("featured"); };

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-[7px] uppercase tracking-[.25em] text-[#977e73]">Search</label>
        <div className="flex items-center border border-[#741522]/15 bg-white px-3">
          <Search size={14} className="text-[#977e73]" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search premium sarees" className="w-full bg-transparent px-2 py-3 text-[11px] outline-none placeholder:text-[#b3a29b]" />
        </div>
      </div>
      <div>
        <label className="mb-2 block text-[7px] uppercase tracking-[.25em] text-[#977e73]">Weave / Category</label>
        <div className="max-h-44 space-y-1 overflow-y-auto pr-1">
          {categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={`flex w-full items-center justify-between px-3 py-2.5 text-left text-[9px] transition ${category===item ? "bg-[#741522] text-white" : "text-[#6e5a52] hover:bg-[#741522]/5"}`}><span className="truncate">{item}</span>{category===item && <span>✓</span>}</button>)}
        </div>
      </div>
      
      <div>
        <label className="mb-2 block text-[7px] uppercase tracking-[.25em] text-[#977e73]">Price</label>
        <div className="space-y-1">{[["all","All prices"],["under10","Under ₹10,000"],["10to20","₹10,000 – ₹20,000"],["above20","Above ₹20,000"]].map(([v,l]) => <button key={v} onClick={() => setPrice(v)} className={`flex w-full items-center justify-between px-3 py-2.5 text-[9px] ${price===v ? "bg-[#741522] text-white" : "text-[#6e5a52] hover:bg-[#741522]/5"}`}>{l}{price===v && <span>✓</span>}</button>)}</div>
      </div>
      <button onClick={clearFilters} className="w-full border border-[#741522]/30 px-4 py-3 text-[7px] uppercase tracking-[.22em] text-[#741522] hover:bg-[#741522] hover:text-white">Reset filters</button>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#f8f4eb] text-[#3f1616]">
      <section className="relative overflow-hidden border-b border-[#741522]/10 bg-[#3f1616] py-10 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-2 text-[#e7c979]"><Sparkles size={14}/><span className="text-[8px] uppercase tracking-[.35em]">THE DARSH SIGNATURE EDIT</span></div>
            <h1 className="font-serif text-[40px] leading-[.95] text-[#fff8ed] sm:text-[58px]">Premium Sarees</h1>
            <p className="mt-1 max-w-xl text-[11px] leading-6 text-[#dccdc0] sm:mt-5 sm:text-[13px]">Discover an elevated collection of exceptional silks, heirloom weaves and statement sarees, selected for their richness, craft and occasion-ready elegance.</p>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-[4px] sm:mt-7 sm:text-[7px] uppercase tracking-[.18em] text-[#eadaca]"><span className="border border-white/15 px-3 py-2">Curated collection</span><span className="border border-white/15 px-3 py-2">Handwoven spirit</span><span className="border border-[#d4ad54]/40 px-3 py-2 text-[#f0d486]">Darsh premium edit</span></div>
        </div>
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#d4ad54]/10 blur-3xl" />
      </section>

      <div className="mx-auto max-w-[1240px] px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
        <div className="mb-7 flex flex-col gap-4 border-b border-[#741522]/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div><p className="text-[8px] uppercase tracking-[.3em] text-[#977e73]">SIGNATURE COLLECTION</p><p className="mt-1 font-serif text-[24px] text-[#3f1616]">{filtered.length} premium pieces</p></div>
          <div className="flex items-center gap-2">
            <button onClick={() => setMobileFilters(true)} className="inline-flex items-center gap-2 border border-[#741522]/20 px-4 py-3 text-[7px] uppercase tracking-[.18em] text-[#741522] lg:hidden"><SlidersHorizontal size={13}/> Filters</button>
            <div className="relative flex items-center border border-[#741522]/20 bg-white"><select value={sort} onChange={(e) => setSort(e.target.value)} className="appearance-none bg-transparent py-3 pl-3 pr-8 text-[8px] uppercase tracking-[.12em] text-[#6e5a52] outline-none"><option value="featured">Featured</option><option value="newest">Newest</option><option value="priceLow">Price: Low to High</option><option value="priceHigh">Price: High to Low</option></select><ChevronDown size={12} className="pointer-events-none absolute right-2 text-[#977e73]"/></div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[240px_minmax(0,1fr)]">
          <aside className="hidden lg:block"><div className="sticky top-24 border border-[#741522]/10 bg-[#f3eadb] p-5"><div className="mb-5 flex items-center gap-2"><Filter size={14} className="text-[#741522]"/><span className="text-[8px] font-semibold uppercase tracking-[.24em]">Refine edit</span></div><FilterContent /></div></aside>
          <section>
            {filtered.length ? <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-5 lg:gap-x-6 lg:gap-y-14">{filtered.map((p,i) => <ProductCard key={p?._id||p?.id||i} product={p} url={url} index={i} onWish={toggleWishlist} wished={wishlist.some((w)=>(w?._id||w?.id)===(p?._id||p?.id))}/>)}</div> : <div className="border border-[#741522]/10 bg-[#f3eadb] px-6 py-20 text-center"><Sparkles size={22} className="mx-auto mb-4 text-[#c9a24a]"/><h2 className="font-serif text-2xl">No premium sarees found</h2><p className="mt-2 text-[10px] text-[#806c63]">Try another filter or reset your selection.</p><button onClick={clearFilters} className="mt-6 border border-[#741522]/40 px-6 py-3 text-[7px] uppercase tracking-[.22em] text-[#741522]">Reset filters</button></div>}
          </section>
        </div>
      </div>

      <AnimatePresence>{mobileFilters && <><motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setMobileFilters(false)} className="fixed inset-0 z-[90] bg-[#241013]/45 backdrop-blur-sm lg:hidden"/><motion.aside initial={{x:"100%"}} animate={{x:0}} exit={{x:"100%"}} transition={{duration:.3}} className="fixed right-0 top-0 z-[100] h-full w-[88%] max-w-sm overflow-y-auto bg-[#f8f4eb] p-5 shadow-2xl lg:hidden"><div className="mb-7 flex items-center justify-between border-b border-[#741522]/10 pb-4"><div><p className="text-[7px] uppercase tracking-[.25em] text-[#977e73]">DARSH</p><h2 className="font-serif text-2xl">Refine Premium</h2></div><button onClick={()=>setMobileFilters(false)} className="flex h-9 w-9 items-center justify-center rounded-full border border-[#741522]/15 text-[#741522]"><X size={16}/></button></div><FilterContent/><button onClick={()=>setMobileFilters(false)} className="mt-6 w-full bg-[#741522] px-4 py-3 text-[8px] uppercase tracking-[.22em] text-white">Show {filtered.length} pieces</button></motion.aside></>}</AnimatePresence>
    </main>
  );
};

export default PremiumSarees;