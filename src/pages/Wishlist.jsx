import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  ArrowRight,
  ChevronRight,
  Crown,
  Heart,
  Loader2,
  ShoppingBag,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useAppContext } from "../context/AppContext";

const STORAGE_KEY = "wishlist";
const PLACEHOLDER = "/IMG/placeholder.jpg";

/* ============================================================
   SMALL HELPERS
============================================================ */

const getProductId = (item) =>
  item?._id ||
  item?.id ||
  item?.productId ||
  null;

const getProductName = (item) =>
  item?.productName ||
  item?.name ||
  item?.title ||
  "Darsh Saree";

const getProductPrice = (item) =>
  Number(
    item?.price ??
      item?.sellingPrice ??
      item?.finalPrice ??
      0
  ) || 0;

const getOriginalPrice = (item) =>
  Number(
    item?.originalPrice ??
      item?.oldPrice ??
      item?.mrp ??
      0
  ) || 0;

const getProductCategory = (item) =>
  item?.category ||
  item?.subCategory ||
  "Handwoven Saree";

const getRawImage = (item) =>
  item?.image ||
  item?.images?.[0] ||
  item?.img ||
  item?.imgSrc ||
  "";

const getImageFilename = (item) => {
  const raw = getRawImage(item);

  if (!raw) return "";

  const value = String(raw).trim();

  if (/^https?:\/\//i.test(value)) {
    try {
      const parsed = new URL(value);
      return (
        parsed.pathname
          .split("/")
          .filter(Boolean)
          .pop() || ""
      );
    } catch {
      return value
        .split("/")
        .filter(Boolean)
        .pop() || "";
    }
  }

  return (
    value
      .split("/")
      .filter(Boolean)
      .pop() || value
  );
};

/* ============================================================
   WISHLIST STORAGE
============================================================ */

const readWishlist = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const emitWishlistUpdate = () => {
  window.dispatchEvent(
    new Event("wishlistUpdated")
  );

  window.dispatchEvent(
    new Event("darsh-wishlist-updated")
  );
};

/* ============================================================
   PAGE
============================================================ */

const Wishlist = () => {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();

  const {
    token,
    url,
    getCart,
    allProduct,
  } = useAppContext();

  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [movingId, setMovingId] = useState(null);
  const [removingId, setRemovingId] = useState(null);
  const [showClearConfirm, setShowClearConfirm] =
    useState(false);

  const apiBaseUrl = useMemo(
    () => String(url || "").replace(/\/+$/, ""),
    [url]
  );

  /* ----------------------------------------------------------
     LOAD + SYNC
  ---------------------------------------------------------- */

  const loadWishlist = useCallback(() => {
    setWishlist(readWishlist());
    setLoading(false);
  }, []);

  useEffect(() => {
    loadWishlist();

    const sync = () => loadWishlist();

    window.addEventListener(
      "wishlistUpdated",
      sync
    );
    window.addEventListener(
      "darsh-wishlist-updated",
      sync
    );
    window.addEventListener("storage", sync);

    return () => {
      window.removeEventListener(
        "wishlistUpdated",
        sync
      );
      window.removeEventListener(
        "darsh-wishlist-updated",
        sync
      );
      window.removeEventListener(
        "storage",
        sync
      );
    };
  }, [loadWishlist]);

  /* ----------------------------------------------------------
     STORAGE UPDATE
  ---------------------------------------------------------- */

  const updateWishlist = useCallback((items) => {
    const safeItems = Array.isArray(items)
      ? items
      : [];

    setWishlist(safeItems);

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(safeItems)
      );
    } catch (error) {
      console.error(
        "Wishlist storage error:",
        error
      );
    }

    emitWishlistUpdate();
  }, []);

  const removeItem = useCallback(
    (id, notify = true) => {
      if (!id) return;

      const updated = wishlist.filter(
        (item) =>
          String(getProductId(item)) !==
          String(id)
      );

      updateWishlist(updated);

      if (notify) {
        toast.info("Removed from wishlist", {
          theme: "dark",
        });
      }
    },
    [wishlist, updateWishlist]
  );

  const clearWishlist = () => {
    updateWishlist([]);
    setShowClearConfirm(false);

    toast.success("Wishlist cleared", {
      theme: "dark",
    });
  };

  /* ----------------------------------------------------------
     IMAGE URL
  ---------------------------------------------------------- */

  const getImage = useCallback(
    (item) => {
      const raw = getRawImage(item);

      if (!raw) return PLACEHOLDER;

      const value = String(raw).trim();

      if (/^https?:\/\//i.test(value)) {
        return value;
      }

      const filename =
        getImageFilename(item);

      if (!filename) return PLACEHOLDER;

      return `${apiBaseUrl}/img/${filename}`;
    },
    [apiBaseUrl]
  );

  /* ----------------------------------------------------------
     OPEN PRODUCT
  ---------------------------------------------------------- */

  const openProduct = useCallback(
    (item) => {
      const id = getProductId(item);

      if (!id) return;

      navigate(`/productDetails/${id}`);

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    },
    [navigate]
  );

  /* ----------------------------------------------------------
     MOVE TO BAG
     Same API contract as ProductDetails.
  ---------------------------------------------------------- */

  const moveToCart = useCallback(
    async (item) => {
      const productId = getProductId(item);

      if (!productId) {
        toast.error(
          "Product information is missing.",
          { theme: "dark" }
        );
        return;
      }

      if (!token) {
        toast.info(
          "Please login to add this saree to your bag.",
          { theme: "dark" }
        );

        navigate("/auth", {
          state: {
            from: "/wishlist",
            message:
              "Please login to move wishlist items to your bag.",
          },
        });

        return;
      }

      if (movingId) return;

      const liveProduct =
        Array.isArray(allProduct)
          ? allProduct.find(
              (product) =>
                String(
                  product?._id ||
                    product?.id
                ) === String(productId)
            )
          : null;

      /*
        Prefer live product data. This keeps Wishlist aligned
        with ProductDetails even when the saved wishlist object
        is older.
      */
      const source = liveProduct || item;

      const title = getProductName(source);
      const price = getProductPrice(source);

      const savedSize =
        item?.selectedSize ||
        item?.size ||
        null;

      const liveSizes = String(
        liveProduct?.size ||
          item?.sizeOptions ||
          ""
      )
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean);

      /*
        If the product requires a size and the wishlist item
        does not have a selected size, do not send an invalid
        cart request. Let the customer choose it on details.
      */
      if (
        liveSizes.length > 0 &&
        !savedSize
      ) {
        toast.info(
          "Please select a size before adding this saree to your bag.",
          { theme: "dark" }
        );

        navigate(
          `/productDetails/${productId}`
        );

        return;
      }

      if (!title || price <= 0) {
        toast.error(
          "This product cannot be added right now.",
          { theme: "dark" }
        );
        return;
      }

      const cartDetails = {
        productId: String(productId),
        title,
        price,
        qty: 1,
        size: savedSize,
        imgSrc:
          liveProduct?.images?.[0] ||
          getImageFilename(source),
      };

      setMovingId(String(productId));

      try {
        const response = await axios.post(
          `${apiBaseUrl}/api/cart/addToCart`,
          cartDetails,
          {
            headers: {
              Auth: token,
              "Content-Type":
                "application/json",
            },
          }
        );

        if (response?.data?.success) {
          if (typeof getCart === "function") {
            await getCart();
          }

          removeItem(productId, false);

          toast.success(
            "Saree added to your shopping bag.",
            { theme: "dark" }
          );
        } else {
          toast.error(
            response?.data?.message ||
              "Unable to add this item to your bag.",
            { theme: "dark" }
          );
        }
      } catch (error) {
        console.error(
          "Wishlist → Cart error:",
          error
        );

        toast.error(
          error?.response?.data?.message ||
            "Something went wrong. Please try again.",
          { theme: "dark" }
        );
      } finally {
        setMovingId(null);
      }
    },
    [
      allProduct,
      apiBaseUrl,
      getCart,
      getImage,
      movingId,
      navigate,
      removeItem,
      token,
    ]
  );

  /* ----------------------------------------------------------
     TOTALS
  ---------------------------------------------------------- */

  const totalItems = wishlist.length;

  const totalValue = useMemo(
    () =>
      wishlist.reduce(
        (sum, item) =>
          sum + getProductPrice(item),
        0
      ),
    [wishlist]
  );

  const premiumCount = useMemo(
    () =>
      wishlist.filter(
        (item) =>
          getProductPrice(item) >= 5000
      ).length,
    [wishlist]
  );

  /* ----------------------------------------------------------
     RENDER
  ---------------------------------------------------------- */

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F8F5ED] text-[#3F302B]">
      {/* ======================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden border-b border-[#741522]/10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 top-0 h-64 w-64 rounded-full bg-[#C9A24A]/10 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[#741522]/8 blur-3xl"
        />

        <div className="relative mx-auto max-w-[1500px] px-4 pb-4 pt-4 sm:px-6 sm:pb-12 sm:pt-12 lg:px-10 lg:pb-14 lg:pt-14 xl:px-14">
          <motion.div
            initial={{
              opacity: 0,
              y: reduceMotion ? 0 : 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: reduceMotion ? 0 : 0.55,
            }}
            className="mx-auto max-w-2xl text-center"
          >
            <motion.div
              animate={
                reduceMotion
                  ? undefined
                  : {
                      scale: [1, 1.08, 1],
                    }
              }
              transition={
                reduceMotion
                  ? undefined
                  : {
                      duration: 2.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
              }
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#C9A24A]/60 bg-[#FFFDF8] shadow-[0_12px_35px_rgba(116,21,34,.08)] sm:h-16 sm:w-16"
            >
              <Heart
                size={24}
                strokeWidth={1.3}
                className="text-[#741522]"
              />
            </motion.div>

            <p className="mt-5 text-[8px] font-medium tracking-[0.35em] text-[#C9A24A] sm:text-[9px]">
              YOUR CURATED COLLECTION
            </p>

            <h1 className="mt-2 font-serif text-3xl text-[#3F302B] sm:text-4xl lg:text-5xl">
              My Wishlist
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-[8px] leading-5 text-[#806B63] sm:text-[12px] sm:leading-6">
              Keep the sarees you love close.
              Your favourite Darsh pieces,
              ready whenever you are.
            </p>
          </motion.div>

          {/* SUMMARY STRIP */}

          {totalItems > 0 && (
            <motion.div
              initial={{
                opacity: 0,
                y: reduceMotion ? 0 : 14,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: reduceMotion ? 0 : 0.15,
              }}
              className="mx-auto mt-7 grid max-w-4xl grid-cols-2 gap-2 sm:mt-8 sm:grid-cols-3 sm:gap-3"
            >
              <SummaryItem
                label="Saved"
                value={totalItems}
              />
              <SummaryItem
                label="Collection value"
                value={`₹${totalValue.toLocaleString(
                  "en-IN"
                )}`}
              />
              <div className="col-span-2 sm:col-span-1">
                <SummaryItem
                  label="Premium"
                  value={premiumCount}
                />
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* ======================================================
          CONTENT
      ====================================================== */}

      <section className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-14 xl:px-14">
        {loading ? (
          <WishlistSkeleton />
        ) : !totalItems ? (
          <EmptyWishlist
            onContinue={() =>
              navigate("/allproducts")
            }
          />
        ) : (
          <>
            {/* TOOLBAR */}

            <div className="mb-7 flex flex-col gap-4 border-b border-[#741522]/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[8px] tracking-[0.22em] text-[#9A8982]">
                  SAVED FOR LATER
                </p>

                <h2 className="mt-1 font-serif text-xl text-[#3F302B] sm:text-2xl">
                  Your favourites
                </h2>

                <p className="mt-1 text-[8px] tracking-[0.08em] text-[#9A8982]">
                  Move any favourite directly
                  to your shopping bag.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center">
                <Link
                  to="/allproducts"
                  className="group inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-[#741522]/15 bg-[#FFFDF8] px-4 text-[8px] font-medium tracking-[0.14em] text-[#741522] transition hover:border-[#C9A24A] hover:shadow-sm"
                >
                  CONTINUE SHOPPING
                  <ArrowRight
                    size={12}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>

                <button
                  type="button"
                  onClick={() =>
                    setShowClearConfirm(true)
                  }
                  className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-full border border-[#741522]/10 px-4 text-[8px] tracking-[0.14em] text-[#806B63] transition hover:border-[#741522]/30 hover:text-[#741522]"
                >
                  <Trash2 size={12} />
                  CLEAR ALL
                </button>
              </div>
            </div>

            {/* GRID */}

            <motion.div
              layout
              className="grid grid-cols-2 gap-x-2.5 gap-y-7 min-[480px]:gap-x-4 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-10 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
            >
              <AnimatePresence mode="popLayout">
                {wishlist.map(
                  (item, index) => (
                    <WishlistCard
                      key={
                        getProductId(item) ||
                        index
                      }
                      item={item}
                      index={index}
                      getImage={getImage}
                      onOpen={openProduct}
                      onRemove={removeItem}
                      onMoveToCart={
                        moveToCart
                      }
                      movingId={movingId}
                    />
                  )
                )}
              </AnimatePresence>
            </motion.div>

            {/* FOOTER CTA */}

            <div className="mt-14 border-t border-[#741522]/10 pt-10 text-center sm:mt-16">
              <Sparkles
                size={16}
                strokeWidth={1.3}
                className="mx-auto text-[#C9A24A]"
              />

              <p className="mt-3 font-serif text-lg italic text-[#806B63] sm:text-xl">
                Some things are worth
                waiting for.
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate("/allproducts")
                }
                className="group mx-auto mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#741522] px-6 text-[8px] font-medium tracking-[0.2em] text-white shadow-[0_10px_30px_rgba(116,21,34,.14)] transition hover:bg-[#5F101D] hover:shadow-[0_14px_35px_rgba(116,21,34,.2)]"
              >
                EXPLORE MORE
                <ArrowRight
                  size={13}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </div>
          </>
        )}
      </section>

      {/* CLEAR CONFIRMATION */}

      <AnimatePresence>
        {showClearConfirm && (
          <ClearWishlistModal
            onCancel={() =>
              setShowClearConfirm(false)
            }
            onConfirm={clearWishlist}
          />
        )}
      </AnimatePresence>
    </main>
  );
};

/* ============================================================
   SUMMARY ITEM
============================================================ */

const SummaryItem = ({
  label,
  value,
}) => (
  <div className="rounded-2xl border border-[#741522]/10 bg-[#FFFDF8]/80 px-3 py-3 text-center shadow-[0_8px_25px_rgba(63,48,43,.03)] backdrop-blur-sm sm:px-4 sm:py-4">
    <p className="text-[7px] tracking-[0.2em] text-[#9A8982] sm:text-[8px]">
      {label}
    </p>
    <p className="mt-1 font-serif text-base text-[#741522] sm:text-lg">
      {value}
    </p>
  </div>
);

/* ============================================================
   CARD
============================================================ */

const WishlistCard = ({
  item,
  index,
  getImage,
  onOpen,
  onRemove,
  onMoveToCart,
  movingId,
}) => {
  const reduceMotion = useReducedMotion();

  const id = getProductId(item);
  const name = getProductName(item);
  const category = getProductCategory(item);
  const price = getProductPrice(item);
  const originalPrice =
    getOriginalPrice(item);

  const discount =
    originalPrice > price && price > 0
      ? Math.round(
          ((originalPrice - price) /
            originalPrice) *
            100
        )
      : 0;

  const isPremium = price >= 5000;
  const isMoving =
    movingId === String(id);

  const [imageSrc, setImageSrc] =
    useState(() => getImage(item));

  useEffect(() => {
    setImageSrc(getImage(item));
  }, [getImage, item]);

  return (
    <motion.article
      layout
      initial={{
        opacity: 0,
        y: reduceMotion ? 0 : 24,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        scale: 0.94,
        y: reduceMotion ? 0 : 8,
      }}
      transition={{
        duration: reduceMotion ? 0 : 0.42,
        delay: reduceMotion
          ? 0
          : Math.min(index * 0.035, 0.28),
      }}
      className="group min-w-0"
    >
      {/* IMAGE */}

      <div className="relative aspect-[3/4] overflow-hidden rounded-[14px] border border-[#741522]/8 bg-[#EDE7DC] shadow-[0_8px_25px_rgba(63,48,43,.04)] transition duration-500 group-hover:shadow-[0_18px_45px_rgba(63,48,43,.1)] sm:rounded-2xl">
        <button
          type="button"
          onClick={() => onOpen(item)}
          className="absolute inset-0 z-10"
          aria-label={`View ${name}`}
        />

        <motion.img
          src={imageSrc}
          alt={name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-center"
          initial={{
            scale: reduceMotion ? 1 : 1.02,
          }}
          animate={{ scale: 1 }}
          transition={{
            duration: reduceMotion ? 0 : 0.7,
          }}
          whileHover={
            reduceMotion
              ? undefined
              : { scale: 1.045 }
          }
          onError={() => {
            if (imageSrc !== PLACEHOLDER) {
              setImageSrc(PLACEHOLDER);
            }
          }}
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-white/10 opacity-80" />

        {/* PREMIUM */}

        {isPremium && (
          <motion.div
            initial={{
              opacity: 0,
              x: -8,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            className="absolute left-2.5 top-2.5 z-20 inline-flex items-center gap-1 rounded-full border border-[#C9A24A]/60 bg-[#FFFDF8]/95 px-2 py-1 text-[6px] font-semibold tracking-[0.13em] text-[#741522] shadow-sm backdrop-blur-md sm:left-3 sm:top-3 sm:px-2.5 sm:py-1.5 sm:text-[7px]"
          >
            <Crown
              size={8}
              className="text-[#C9A24A]"
            />
            PREMIUM
          </motion.div>
        )}

       


        {/* DESKTOP / TABLET OVERLAY BAG ACTION */}

        <div className="absolute inset-x-2.5 bottom-2.5 z-20 hidden sm:block">
          <MoveToBagButton
            item={item}
            moving={isMoving}
            onClick={() =>
              onMoveToCart(item)
            }
            overlay
          />
        </div>
      </div>

      {/* DETAILS */}

      <div className="px-0.5 pt-3 sm:px-1 sm:pt-4">
        <p className="mb-1 line-clamp-1 text-[6px] font-medium tracking-[0.16em] text-[#C9A24A] sm:text-[7px]">
          {category}
        </p>

        <button
          type="button"
          onClick={() => onOpen(item)}
          className="line-clamp-2 min-h-[38px] w-full text-left font-serif text-[13px] leading-[1.35] text-[#3F302B] transition-colors hover:text-[#741522] sm:min-h-[42px] sm:text-[15px]"
        >
          {name}
        </button>

        <div className="mt-2 flex flex-wrap items-baseline gap-1.5">
          <span className="text-[12px] font-semibold text-[#741522] sm:text-[14px]">
            ₹{price.toLocaleString("en-IN")}
          </span>

          {originalPrice > price && (
            <span className="text-[8px] text-[#9A8982] line-through sm:text-[9px]">
              ₹
              {originalPrice.toLocaleString(
                "en-IN"
              )}
            </span>
          )}
        </div>

        {/* MOBILE BAG BUTTON — ALWAYS VISIBLE */}

        <div className="mt-3 sm:hidden">
          <MoveToBagButton
            item={item}
            moving={isMoving}
            onClick={() =>
              onMoveToCart(item)
            }
          />
        </div>
      </div>
    </motion.article>
  );
};

/* ============================================================
   MOVE TO BAG BUTTON
   Visible on every device.
============================================================ */

const MoveToBagButton = ({
  item,
  moving,
  onClick,
  overlay = false,
}) => {
  const reduceMotion = useReducedMotion();
  const [successPulse, setSuccessPulse] =
    useState(false);

  const handleClick = async () => {
    if (moving) return;

    setSuccessPulse(true);

    window.setTimeout(
      () => setSuccessPulse(false),
      650
    );

    await onClick();
  };

  return (
    <motion.button
      type="button"
      disabled={moving}
      onClick={(event) => {
        event.stopPropagation();
        handleClick();
      }}
      whileHover={
        reduceMotion
          ? undefined
          : { y: -2, scale: 1.01 }
      }
      whileTap={
        reduceMotion
          ? undefined
          : { scale: 0.97 }
      }
      className={[
        "relative flex min-h-10 w-full items-center justify-center gap-2 overflow-hidden rounded-xl border px-3 text-[7px] font-semibold tracking-[0.16em] transition-all duration-300 sm:min-h-11 sm:text-[8px]",
        overlay
          ? "border-white/70 bg-[#FFFDF8]/95 text-[#741522] shadow-[0_8px_22px_rgba(0,0,0,.1)] backdrop-blur-md hover:bg-[#741522] hover:text-white"
          : "border-[#741522] bg-[#741522] text-white shadow-[0_8px_22px_rgba(116,21,34,.13)] hover:bg-[#5F101D]",
        moving
          ? "cursor-wait opacity-90"
          : "",
      ].join(" ")}
      aria-label={`Move ${getProductName(item)} to bag`}
    >
      
      {/* SUCCESS RIPPLE */}

      <AnimatePresence>
        {successPulse && (
          <motion.span
            initial={{
              scale: 0,
              opacity: 0.5,
            }}
            animate={{
              scale: 3,
              opacity: 0,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            className="pointer-events-none absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/30"
          />
        )}
      </AnimatePresence>

      <AnimatePresence
        mode="wait"
        initial={false}
      >
        {moving ? (
          <motion.span
            key="moving"
            initial={{
              opacity: 0,
              y: 5,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -5,
            }}
            className="relative z-10 inline-flex items-center gap-2"
          >
            <Loader2
              size={13}
              className="animate-spin"
            />
            ADDING TO BAG...
          </motion.span>
        ) : (
          <motion.span
            key="idle"
            initial={{
              opacity: 0,
              y: 5,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -5,
            }}
            className="relative z-10 inline-flex items-center gap-2"
          >
            <ShoppingBag size={13} />
            MOVE TO BAG
            <ChevronRight
              size={12}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

/* ============================================================
   EMPTY
============================================================ */

const EmptyWishlist = ({
  onContinue,
}) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: reduceMotion ? 0 : 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="mx-auto flex max-w-lg flex-col items-center rounded-3xl border border-[#741522]/10 bg-[#FFFDF8] px-6 py-14 text-center shadow-[0_20px_60px_rgba(63,48,43,.06)] sm:px-10 sm:py-20"
    >
      <motion.div
        animate={
          reduceMotion
            ? undefined
            : {
                y: [0, -6, 0],
                rotate: [0, -3, 3, 0],
              }
        }
        transition={
          reduceMotion
            ? undefined
            : {
                duration: 3.2,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
        className="flex h-20 w-20 items-center justify-center rounded-full border border-[#C9A24A]/50 bg-[#F8F5ED]"
      >
        <Heart
          size={30}
          strokeWidth={1.2}
          className="text-[#741522]/65"
        />
      </motion.div>

      <p className="mt-7 text-[8px] tracking-[0.3em] text-[#C9A24A]">
        NOTHING SAVED YET
      </p>

      <h2 className="mt-3 font-serif text-2xl text-[#3F302B] sm:text-3xl">
        Your wishlist is waiting.
      </h2>

      <p className="mt-3 max-w-sm text-[11px] leading-6 text-[#806B63]">
        Discover handwoven sarees you
        love and tap the heart to save
        them here for later.
      </p>

      <button
        type="button"
        onClick={onContinue}
        className="group mt-7 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#741522] px-7 text-[8px] font-medium tracking-[0.2em] text-white transition hover:bg-[#5F101D] hover:shadow-[0_12px_30px_rgba(116,21,34,.18)]"
      >
        DISCOVER SAREES
        <ArrowRight
          size={13}
          className="transition-transform group-hover:translate-x-1"
        />
      </button>
    </motion.div>
  );
};

/* ============================================================
   CLEAR MODAL
============================================================ */

const ClearWishlistModal = ({
  onCancel,
  onConfirm,
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[100] flex items-center justify-center bg-[#241411]/45 px-4 backdrop-blur-sm"
    onClick={onCancel}
  >
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
        scale: 0.96,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        y: 12,
        scale: 0.97,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25,
      }}
      onClick={(event) =>
        event.stopPropagation()
      }
      className="w-full max-w-sm rounded-3xl border border-[#741522]/10 bg-[#FFFDF8] p-6 shadow-[0_25px_80px_rgba(0,0,0,.2)] sm:p-7"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[8px] tracking-[0.25em] text-[#C9A24A]">
            DARSH WISHLIST
          </p>
          <h3 className="mt-2 font-serif text-2xl text-[#3F302B]">
            Clear everything?
          </h3>
        </div>

        <button
          type="button"
          onClick={onCancel}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F8F5ED] text-[#741522]"
          aria-label="Close"
        >
          <X size={16} />
        </button>
      </div>

      <p className="mt-4 text-[11px] leading-6 text-[#806B63]">
        This will remove every saved saree
        from your wishlist. Your cart will
        not be affected.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="min-h-11 rounded-xl border border-[#741522]/15 text-[8px] font-medium tracking-[0.15em] text-[#741522]"
        >
          KEEP THEM
        </button>

        <button
          type="button"
          onClick={onConfirm}
          className="min-h-11 rounded-xl bg-[#741522] text-[8px] font-medium tracking-[0.15em] text-white hover:bg-[#5F101D]"
        >
          CLEAR ALL
        </button>
      </div>
    </motion.div>
  </motion.div>
);

/* ============================================================
   SKELETON
============================================================ */

const WishlistSkeleton = () => (
  <div className="grid grid-cols-2 gap-x-2.5 gap-y-8 min-[480px]:gap-x-4 sm:grid-cols-2 sm:gap-x-5 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
    {Array.from({ length: 10 }).map(
      (_, index) => (
        <motion.div
          key={index}
          animate={{
            opacity: [0.42, 0.82, 0.42],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: index * 0.04,
          }}
        >
          <div className="aspect-[3/4] rounded-[14px] bg-[#E8E0D4] sm:rounded-2xl" />

          <div className="mt-3 h-2 w-16 rounded-full bg-[#E8E0D4]" />
          <div className="mt-2 h-4 w-4/5 rounded-full bg-[#E8E0D4]" />
          <div className="mt-2 h-3 w-20 rounded-full bg-[#E8E0D4]" />
          <div className="mt-3 h-10 w-full rounded-xl bg-[#E8E0D4]" />
        </motion.div>
      )
    )}
  </div>
);

export default Wishlist;