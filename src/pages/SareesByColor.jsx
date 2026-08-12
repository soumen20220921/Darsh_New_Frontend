import React, { useMemo, useState } from "react";
import { Check, ChevronRight } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext.jsx";

/* =========================================================
   SAREES BY COLOR PAGE
   Dedicated destination from the Home page color preview.
========================================================= */

const COLOR_STORIES = [
  {
    key: "red",
    label: "RED",
    subtitle: "Bold & timeless",
    swatches: ["#8f1725", "#c83b45", "#5f0d17"],
  },
  {
    key: "white",
    label: "WHITE",
    subtitle: "Pure & elegant",
    swatches: ["#fffaf0", "#e9e2d4", "#cfc7b8"],
  },
  {
    key: "yellow",
    label: "YELLOW",
    subtitle: "Warm & radiant",
    swatches: ["#d4a72c", "#f0c94b", "#b98217"],
  },
  {
    key: "blue",
    label: "BLUE",
    subtitle: "Calm & graceful",
    swatches: ["#173b67", "#356a9f", "#0d2744"],
  },
];

const getProductColorText = (product) =>
  [
    product?.color,
    product?.colour,
    product?.productColor,
    product?.colors,
    product?.colours,
    product?.shade,
    product?.variant?.color,
    product?.variants?.[0]?.color,
  ]
    .flatMap((value) => (Array.isArray(value) ? value : value ? [value] : []))
    .join(" ")
    .toLowerCase()
    .trim();

const matchesColor = (product, colorKey) => {
  const text = getProductColorText(product);

  const aliases = {
    red: ["red", "maroon", "crimson", "scarlet", "wine", "burgundy", "rani", "vermilion"],
    white: ["white", "ivory", "cream", "off white", "off-white", "pearl", "beige", "ekru", "ecru"],
    yellow: ["yellow", "mustard", "golden yellow", "lemon", "haldi", "turmeric", "ochre"],
    blue: ["blue", "navy", "sapphire", "cerulean", "azure", "cobalt"],
  };

  return aliases[colorKey]?.some((alias) => text.includes(alias));
};

const ProductCard = ({ product, url }) => {
  const id = product?._id || product?.id;
  const image = product?.images?.[0]
    ? `${url}/img/${product.images[0]}`
    : product?.image || "/IMG/saree.png";

  return (
    <Link
      to={`/productDetails/${id}`}
      onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
      className="group block"
    >
      <div className="relative aspect-[0.78] overflow-hidden bg-[#eee5d5]">
        <img
          src={image}
          alt={`${product?.productName || "Saree"} - Darsh`}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.045]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#4c1117]/45 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <span className="absolute bottom-3 left-1/2 -translate-x-1/2 translate-y-2 bg-[#f8f4eb]/95 px-4 py-2 text-[7px] uppercase tracking-[0.2em] text-[#741522] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          View Saree
        </span>
      </div>

      <div className="pt-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="min-w-0 font-serif text-[17px] leading-tight text-[#3f1616]">
            {product?.productName || product?.name || "Handwoven Saree"}
          </h3>

          <span className="shrink-0 text-[11px] text-[#3d1714]">
            ₹{(Number(product?.price) || 0).toLocaleString("en-IN")}
          </span>
        </div>

        <p className="mt-1.5 truncate text-[7px] uppercase tracking-[0.18em] text-[#977e73]">
          {product?.fabric || product?.category || product?.subCategory || "HANDWOVEN · DARSH"}
        </p>
      </div>
    </Link>
  );
};

const SareesByColor = () => {
  const { allProduct = [], url } = useAppContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const initial = searchParams.get("color");
  const [selectedColor, setSelectedColor] = useState(
    COLOR_STORIES.some((item) => item.key === initial) ? initial : "red"
  );

  const products = useMemo(() => {
    return allProduct || [];
  }, [allProduct]);

  const activeColor =
    COLOR_STORIES.find((item) => item.key === selectedColor) || COLOR_STORIES[0];

  const filteredProducts = useMemo(
    () => products.filter((product) => matchesColor(product, selectedColor)),
    [products, selectedColor]
  );

  const changeColor = (key) => {
    setSelectedColor(key);
    setSearchParams({ color: key });
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#f8f4eb] text-[#3f1616]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#3f1616] px-5 pb-14 pt-24 text-[#f8f4eb] sm:px-8 sm:pb-18 sm:pt-28">
        <div className="mx-auto max-w-[1120px]">
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 text-[7px] uppercase tracking-[0.25em] text-[#e6d2ae] transition-opacity hover:opacity-70"
          >
            <ChevronRight size={12} className="rotate-180" />
            Back to home
          </Link>

          <p className="mb-4 text-[8px] uppercase tracking-[0.38em] text-[#d4ad54]">
            THE DARSH COLOR EDIT
          </p>

          <h1 className="max-w-[700px] font-serif text-[42px] font-normal leading-[0.94] sm:text-[62px]">
            Sarees by color
          </h1>

          <p className="mt-5 max-w-[560px] text-[12px] leading-6 text-[#e6d2ae]/80 sm:text-[13px]">
            Explore Darsh sarees through four signature shades, curated to make
            finding your perfect drape feel effortless.
          </p>
        </div>

        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-[#d4ad54]/15" />
      </section>

      {/* Color navigation */}
      <section className="sticky top-0 z-30 border-b border-[#741522]/10 bg-[#f8f4eb]/95 px-4 py-3 backdrop-blur-md sm:px-8">
        <div className="mx-auto grid max-w-[1120px] grid-cols-4 gap-2 sm:gap-3">
          {COLOR_STORIES.map((color) => {
            const active = selectedColor === color.key;

            return (
              <button
                key={color.key}
                type="button"
                onClick={() => changeColor(color.key)}
                className={`
                  relative overflow-hidden px-2 py-3 text-center transition-all duration-300 sm:px-4 sm:py-3.5
                  ${active ? "bg-[#741522] text-[#f8f4eb]" : "bg-[#f3eadb] text-[#3f1616] hover:bg-[#eee2d0]"}
                `}
              >
                <span className="mx-auto mb-1.5 flex justify-center gap-1">
                  {color.swatches.map((swatch, index) => (
                    <span
                      key={index}
                      className="h-2.5 w-2.5 rounded-full border border-black/10"
                      style={{ backgroundColor: swatch }}
                    />
                  ))}
                </span>

                <span className="font-serif text-[16px] sm:text-[19px]">
                  {color.label}
                </span>

                {active && (
                  <span className="absolute inset-x-0 bottom-0 h-[2px] bg-[#d4ad54]" />
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* Collection */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-[1120px] px-5 sm:px-8 lg:px-0">
          <div className="mb-8 flex items-end justify-between gap-4 sm:mb-10">
            <div>
              <p className="text-[7px] uppercase tracking-[0.3em] text-[#977e73]">
                CURATED SHADE
              </p>
              <h2 className="mt-2 font-serif text-[31px] leading-none text-[#3f1616] sm:text-[42px]">
                {activeColor.label}
              </h2>
              <p className="mt-2 text-[10px] text-[#806c63] sm:text-[11px]">
                {activeColor.subtitle}
              </p>
            </div>

            <span className="text-[7px] uppercase tracking-[0.2em] text-[#977e73]">
              {filteredProducts.length} pieces
            </span>
          </div>

          {filteredProducts.length > 0 ? (
            <div
              key={selectedColor}
              className="grid grid-cols-2 gap-x-3 gap-y-10 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 lg:gap-6"
            >
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product?._id || product?.id}
                  product={product}
                  url={url}
                />
              ))}
            </div>
          ) : (
            <div className="flex min-h-[300px] items-center justify-center border border-dashed border-[#741522]/15 bg-[#f3eadb] px-6 text-center">
              <div>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#741522]/15 text-[#741522]">
                  <Check size={18} strokeWidth={1.2} />
                </div>
                <h3 className="mt-5 font-serif text-[25px] text-[#3f1616]">
                  More {activeColor.label.toLowerCase()} sarees are coming
                </h3>
                <p className="mt-2 text-[9px] uppercase tracking-[0.18em] text-[#977e73]">
                  New Darsh pieces are added regularly
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default SareesByColor;