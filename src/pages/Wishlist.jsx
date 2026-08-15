import React, {
  useEffect,
  useState,
} from "react";
import {
  ArrowRight,
  Heart,
  ShoppingBag,
  Trash2,
  Sparkles,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
} from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const STORAGE_KEY = "wishlist";

const Wishlist = () => {
  const navigate = useNavigate();

  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ============================================================
     LOAD WISHLIST
  ============================================================ */

  useEffect(() => {
    loadWishlist();

    const handleUpdate = () => {
      loadWishlist();
    };

    window.addEventListener(
      "darsh-wishlist-updated",
      handleUpdate
    );

    window.addEventListener(
      "wishlistUpdated",
      handleUpdate
    );

    window.addEventListener(
      "storage",
      handleUpdate
    );

    return () => {
      window.removeEventListener(
        "darsh-wishlist-updated",
        handleUpdate
      );

      window.removeEventListener(
        "wishlistUpdated",
        handleUpdate
      );

      window.removeEventListener(
        "storage",
        handleUpdate
      );
    };
  }, []);

  const loadWishlist = () => {
    try {
      const saved = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
      );

      setWishlist(
        Array.isArray(saved) ? saved : []
      );
    } catch {
      setWishlist([]);
    } finally {
      setLoading(false);
    }
  };

  /* ============================================================
     UPDATE STORAGE
  ============================================================ */

  const updateWishlist = (items) => {
    setWishlist(items);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(items)
    );

    window.dispatchEvent(
      new Event("darsh-wishlist-updated")
    );

    window.dispatchEvent(
      new Event("wishlistUpdated")
    );
  };

  /* ============================================================
     REMOVE
  ============================================================ */

  const removeItem = (id) => {
    const updated = wishlist.filter(
      (item) =>
        String(item._id || item.id) !== String(id)
    );

    updateWishlist(updated);

    toast.info("Removed from wishlist", {
      theme: "dark",
    });
  };

  /* ============================================================
     CLEAR ALL
  ============================================================ */

  const clearWishlist = () => {
    updateWishlist([]);

    toast.success("Wishlist cleared", {
      theme: "dark",
    });
  };

  /* ============================================================
     PRODUCT DATA HELPERS
  ============================================================ */

  const getId = (item) =>
    item?._id || item?.id;

  const getName = (item) =>
    item?.name ||
    item?.productName ||
    "Darsh Saree";

  /* ============================================================
     ROBUST PRODUCT IMAGE RESOLVER
     ------------------------------------------------------------
     Wishlist items can come from different pages / API responses,
     so image data may be:
       - image: "..."
       - image: [...]
       - images: [...]
       - imageUrl / img / thumbnail
       - an object containing url/src/path
       - a JSON string containing an image array

     Always return one safe URL/string for the <img>.
  ============================================================ */

  const getImage = (item) => {
    const rawCandidates = [
      item?.image,
      item?.images,
      item?.imageUrl,
      item?.img,
      item?.thumbnail,
      item?.thumbnailUrl,
      item?.photo,
      item?.coverImage,
    ];

    const flattenImageValue = (value) => {
      if (!value) return null;

      if (typeof value === "string") {
        const trimmed = value.trim();

        if (!trimmed) return null;

        // Handle image arrays stored as JSON strings.
        if (
          (trimmed.startsWith("[") &&
            trimmed.endsWith("]")) ||
          (trimmed.startsWith("{") &&
            trimmed.endsWith("}"))
        ) {
          try {
            return flattenImageValue(
              JSON.parse(trimmed)
            );
          } catch {
            return trimmed;
          }
        }

        return trimmed;
      }

      if (Array.isArray(value)) {
        for (const entry of value) {
          const resolved =
            flattenImageValue(entry);

          if (resolved) return resolved;
        }

        return null;
      }

      if (typeof value === "object") {
        return (
          flattenImageValue(value.url) ||
          flattenImageValue(value.src) ||
          flattenImageValue(value.path) ||
          flattenImageValue(value.image) ||
          flattenImageValue(value.imageUrl) ||
          flattenImageValue(value.secure_url) ||
          flattenImageValue(value.location) ||
          null
        );
      }

      return null;
    };

    for (const candidate of rawCandidates) {
      const resolved =
        flattenImageValue(candidate);

      if (resolved) return resolved;
    }

    return "/IMG/placeholder.jpg";
  };

  const getPrice = (item) =>
    Number(
      item?.price ??
        item?.sellingPrice ??
        item?.finalPrice ??
        0
    );

  const getOriginalPrice = (item) =>
    Number(
      item?.originalPrice ??
        item?.oldPrice ??
        item?.mrp ??
        0
    );

  const getCategory = (item) =>
    item?.category ||
    item?.subCategory ||
    "Handwoven Saree";

  /* ============================================================
     TOTAL
  ============================================================ */

  const totalItems = wishlist.length;

  const hasItems = totalItems > 0;

  /* ============================================================
     VIEW PRODUCT
  ============================================================ */

  const openProduct = (item) => {
    const id = getId(item);

    if (!id) return;

    navigate(`/productDetails/${id}`);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* ============================================================
     ADD TO CART
     This dispatches a reusable event. If your Cart/AppContext
     already listens to another event, replace this section
     with your existing add-to-cart function.
  ============================================================ */

  const moveToCart = (item) => {
    window.dispatchEvent(
      new CustomEvent("cart", {
        detail: item,
      })
    );

    removeItem(getId(item));

    toast.success("Added to shopping bag", {
      theme: "dark",
    });
  };

  return (
    <main
      className="
        min-h-screen
        bg-[#F8F5ED]
        text-[#3F302B]
      "
    >
      {/* ========================================================
          HERO
      ======================================================== */}

      <section
        className="
          relative overflow-hidden
          border-b border-[#741522]/10
        "
      >
        <div
          className="
            absolute -left-20 top-10
            h-48 w-48 rounded-full
            bg-[#C9A24A]/8 blur-3xl
          "
        />

        <div
          className="
            absolute -right-20 bottom-0
            h-64 w-64 rounded-full
            bg-[#741522]/6 blur-3xl
          "
        />

        <div
          className="
            relative mx-auto
            max-w-[1300px]
            px-2 py-2
            sm:px-8 sm:py-20
            lg:px-5 lg:py-8
          "
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            className="text-center"
          >
            <div
              className="
                mx-auto mb-5
                flex h-14 w-14
                items-center justify-center
                rounded-full
                border border-[#C9A24A]/60
                bg-[#FFFDF8]
                shadow-[0_10px_30px_rgba(116,21,34,0.08)]
              "
            >
              <motion.div
                animate={{
                  scale: [1, 1.12, 1],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                }}
              >
                <Heart
                  size={22}
                  strokeWidth={1.3}
                  className="text-[#741522]"
                />
              </motion.div>
            </div>

            <p
              className="
                mb-3 text-[8px]
                font-medium
                tracking-[0.35em]
                text-[#C9A24A]
              "
            >
              YOUR CURATED COLLECTION
            </p>

            <h1
              className="
                font-serif
                text-3xl
                text-[#3F302B]
                sm:text-4xl
                lg:text-5xl
              "
            >
              My Wishlist
            </h1>

            <p
              className="
               hidden
                mx-auto mt-4
                max-w-xl
                text-[11px]
                leading-6
                text-[#806B63]
                sm:text-[12px]
                sm:block
              "
            >
              Keep the sarees you love close.
              Your favourite Darsh pieces,
              all in one beautiful place.
            </p>

            {hasItems && (
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.9,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                className="
                  mt-5 inline-flex
                  items-center gap-2
                  rounded-full
                  border border-[#741522]/10
                  bg-[#FFFDF8]
                  px-4 py-2
                  text-[8px]
                  tracking-[0.18em]
                  text-[#741522]
                "
              >
                <Heart
                  size={12}
                  fill="currentColor"
                />

                {totalItems}{" "}
                {totalItems === 1
                  ? "FAVOURITE"
                  : "FAVOURITES"}
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ========================================================
          CONTENT
      ======================================================== */}

      <section
        className="
          mx-auto max-w-[1400px]
          px-5 py-10
          sm:px-8 sm:py-14
          lg:px-12 lg:py-16
        "
      >
        {loading ? (
          <WishlistSkeleton />
        ) : !hasItems ? (
          <EmptyWishlist
            onContinue={() => {
              navigate("/allproducts");

              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          />
        ) : (
          <>
            {/* TOP BAR */}

            <div
              className="
                mb-7 flex flex-col
                gap-4
                border-b
                border-[#741522]/10
                pb-5
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
              <div>
                <p
                  className="
                    text-[8px]
                    tracking-[0.22em]
                    text-[#9A8982]
                  "
                >
                  SAVED FOR LATER
                </p>

                <p
                  className="
                    mt-1 font-serif
                    text-lg text-[#3F302B]
                  "
                >
                  Your favourites
                </p>

                <p
                  className="
                    mt-1
                    text-[7px]
                    tracking-[0.12em]
                    text-[#9A8982]
                  "
                >
                  Premium pieces are highlighted
                  automatically at ₹5,000+
                </p>
              </div>

              <div className="flex items-center gap-4">
                <Link
                  to="/allproducts"
                  className="
                    group flex items-center gap-2
                    text-[8px]
                    font-medium
                    tracking-[0.18em]
                    text-[#741522]
                  "
                >
                  CONTINUE SHOPPING

                  <ArrowRight
                    size={13}
                    className="
                      transition-transform
                      group-hover:translate-x-1
                    "
                  />
                </Link>

                <button
                  onClick={clearWishlist}
                  className="
                    flex items-center gap-1.5
                    text-[8px]
                    tracking-[0.16em]
                    text-[#9A8982]
                    transition-colors
                    hover:text-[#741522]
                  "
                >
                  <Trash2 size={12} />
                  CLEAR ALL
                </button>
              </div>
            </div>

            {/* PRODUCT GRID */}

            <motion.div
              layout
              className="
                grid grid-cols-2
                gap-x-3 gap-y-8
                sm:grid-cols-2
                sm:gap-x-5 sm:gap-y-10
                lg:grid-cols-3
                xl:grid-cols-4
              "
            >
              <AnimatePresence mode="popLayout">
                {wishlist.map((item, index) => (
                  <WishlistCard
                    key={getId(item) || index}
                    item={item}
                    index={index}
                    getId={getId}
                    getName={getName}
                    getImage={getImage}
                    getPrice={getPrice}
                    getOriginalPrice={
                      getOriginalPrice
                    }
                    getCategory={getCategory}
                    onRemove={removeItem}
                    onMoveToCart={moveToCart}
                    onOpen={openProduct}
                  />
                ))}
              </AnimatePresence>
            </motion.div>

            {/* BOTTOM MESSAGE */}

            <div
              className="
                mt-16
                flex flex-col
                items-center
                border-t
                border-[#741522]/10
                pt-10
                text-center
              "
            >
              <Sparkles
                size={15}
                strokeWidth={1.3}
                className="text-[#C9A24A]"
              />

              <p
                className="
                  mt-3 font-serif
                  text-lg italic
                  text-[#806B63]
                "
              >
                Some things are worth waiting for.
              </p>

              <button
                onClick={() => navigate("/allproducts")}
                className="
                  group mt-5
                  flex items-center gap-2
                  rounded-full
                  bg-[#741522]
                  px-6 py-3
                  text-[8px]
                  font-medium
                  tracking-[0.2em]
                  text-white
                  transition-all
                  hover:bg-[#5F101D]
                  hover:shadow-[0_10px_25px_rgba(116,21,34,0.18)]
                "
              >
                EXPLORE MORE

                <ArrowRight
                  size={13}
                  className="
                    transition-transform
                    group-hover:translate-x-1
                  "
                />
              </button>
            </div>
          </>
        )}
      </section>
    </main>
  );
};

/* ============================================================
   WISHLIST CARD
============================================================ */

const WishlistCard = ({
  item,
  index,
  getId,
  getName,
  getImage,
  getPrice,
  getOriginalPrice,
  getCategory,
  onRemove,
  onMoveToCart,
  onOpen,
}) => {
  const price = getPrice(item);

  const [imageSrc, setImageSrc] = useState(
    () => getImage(item)
  );

  useEffect(() => {
    setImageSrc(getImage(item));
  }, [item, getImage]);
  const originalPrice = getOriginalPrice(item);

 

  return (
    <motion.article
      layout
      initial={{
        opacity: 0,
        y: 25,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        scale: 0.92,
      }}
      transition={{
        duration: 0.45,
        delay: Math.min(index * 0.05, 0.3),
      }}
      className="group"
    >
      {/* IMAGE */}

      <div
        className="
          relative aspect-[3/4]
          overflow-hidden
          rounded-xl
          bg-[#EDE7DC]
        "
      >
        <motion.div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute inset-0 z-0
            bg-gradient-to-br
            from-white/35
            via-transparent
            to-[#C9A24A]/10
          "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />

        <button
          onClick={() => onOpen(item)}
          className="absolute inset-0 z-10"
          aria-label={`View ${getName(item)}`}
        />

        <img
          src={imageSrc}
          alt={getName(item)}
          loading="lazy"
          decoding="async"
          className="
            h-full w-full
            object-cover
            object-center
            transition-transform
            duration-700
            ease-out
            group-hover:scale-[1.045]
          "
          onError={() => {
            if (
              imageSrc !==
              "/IMG/placeholder.jpg"
            ) {
              setImageSrc(
                "/IMG/placeholder.jpg"
              );
            }
          }}
        />

        {/* IMAGE GRADIENT */}

        <div
          className="
            pointer-events-none
            absolute inset-x-0 bottom-0
            h-24
            bg-gradient-to-t
            from-black/25
            to-transparent
            opacity-0
            transition-opacity
            duration-500
            group-hover:opacity-100
          "
        />

       

        {/* PREMIUM */}

        {price >= 5000 && (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="
              absolute
              left-3
              bottom-3
              z-20
              flex
              items-center
              gap-1.5
              rounded-full
              border
              border-[#C9A24A]/50
              bg-[#FFFDF8]/90
              px-2.5
              py-1.5
              text-[6px]
              font-semibold
              tracking-[0.16em]
              text-[#741522]
              shadow-sm
              backdrop-blur-md
            "
          >
            <Sparkles
              size={9}
              className="text-[#C9A24A]"
            />
            PREMIUM
          </motion.span>
        )}

        {/* REMOVE */}

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            onRemove(getId(item));
          }}
          className="
            absolute right-3 top-3
            z-20 flex h-8 w-8
            items-center justify-center
            rounded-full
            bg-[#FFFDF8]/95
            text-[#741522]
            shadow-sm
            backdrop-blur-md
            transition-all
            hover:bg-[#741522]
            hover:text-white
          "
          aria-label="Remove from wishlist"
        >
          <Heart
            size={15}
            strokeWidth={1.5}
            fill="#741522"
          />
        </motion.button>

        {/* QUICK CART */}

        <motion.button
          initial={{
            opacity: 0,
            y: 10,
          }}
          whileHover={{
            scale: 1.02,
          }}
          animate={{
            opacity: 0,
          }}
          className="pointer-events-none"
        />

        <button
          onClick={(e) => {
            e.stopPropagation();
            onMoveToCart(item);
          }}
          className="
            absolute bottom-3
            left-3 right-3
            z-20
            flex items-center
            justify-center gap-2
            rounded-lg
            bg-[#FFFDF8]/95
            px-3 py-2.5
            text-[7px]
            font-semibold
            tracking-[0.18em]
            text-[#741522]
            opacity-0
            translate-y-2
            backdrop-blur-md
            transition-all duration-300
            group-hover:translate-y-0
            group-hover:opacity-100
            hover:bg-[#741522]
            hover:text-white
          "
        >
          <ShoppingBag size={13} />
          MOVE TO BAG
        </button>
      </div>

      {/* DETAILS */}

      <div className="px-1 pt-4">
        <p
          className="
            mb-1 text-[7px]
            tracking-[0.16em]
            text-[#C9A24A]
          "
        >
          {getCategory(item)}
        </p>

        <button
          onClick={() => onOpen(item)}
          className="
            line-clamp-2
            text-left
            font-serif
            text-[14px]
            leading-5
            text-[#3F302B]
            transition-colors
            hover:text-[#741522]
            sm:text-[15px]
          "
        >
          {getName(item)}
        </button>

        <div className="mt-2 flex items-center gap-2">
          <span
            className="
              text-[12px]
              font-semibold
              text-[#741522]
            "
          >
            ₹{price.toLocaleString("en-IN")}
          </span>

          {originalPrice > price && (
            <span
              className="
                text-[9px]
                text-[#9A8982]
                line-through
              "
            >
              ₹
              {originalPrice.toLocaleString(
                "en-IN"
              )}
            </span>
          )}
        </div>

        <button
          onClick={() => onMoveToCart(item)}
          className="
            mt-3 flex items-center gap-1.5
            text-[7px]
            font-medium
            tracking-[0.16em]
            text-[#806B63]
            transition-colors
            hover:text-[#741522]
            sm:hidden
          "
        >
          <ShoppingBag size={12} />
          MOVE TO BAG
        </button>
      </div>
    </motion.article>
  );
};

/* ============================================================
   EMPTY WISHLIST
============================================================ */

const EmptyWishlist = ({ onContinue }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="
        mx-auto
        flex max-w-xl
        flex-col items-center
        rounded-2xl
        border border-[#741522]/10
        bg-[#FFFDF8]
        px-6 py-16
        text-center
        shadow-[0_15px_50px_rgba(63,48,43,0.05)]
        sm:px-10 sm:py-20
      "
    >
      <div
        className="
          relative
          flex h-20 w-20
          items-center justify-center
          rounded-full
          border border-[#C9A24A]/50
          bg-[#F8F5ED]
        "
      >
        <motion.div
          animate={{
            y: [0, -5, 0],
            rotate: [0, -3, 3, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Heart
            size={29}
            strokeWidth={1.2}
            className="text-[#741522]/60"
          />
        </motion.div>

        <Sparkles
          size={12}
          className="
            absolute right-1 top-1
            text-[#C9A24A]
          "
        />
      </div>

      <p
        className="
          mt-7 text-[8px]
          tracking-[0.3em]
          text-[#C9A24A]
        "
      >
        NOTHING SAVED YET
      </p>

      <h2
        className="
          mt-3 font-serif
          text-2xl
          text-[#3F302B]
        "
      >
        Your wishlist is waiting.
      </h2>

      <p
        className="
          mt-3 max-w-sm
          text-[11px]
          leading-6
          text-[#806B63]
        "
      >
        Discover handwoven sarees you
        love and tap the heart to save
        them here for later.
      </p>

      <button
        onClick={onContinue}
        className="
          group mt-7
          flex items-center gap-2
          rounded-full
          bg-[#741522]
          px-7 py-3.5
          text-[8px]
          font-medium
          tracking-[0.2em]
          text-white
          transition-all
          hover:bg-[#5F101D]
          hover:shadow-[0_12px_30px_rgba(116,21,34,0.18)]
        "
      >
        DISCOVER SAREES

        <ArrowRight
          size={13}
          className="
            transition-transform
            group-hover:translate-x-1
          "
        />
      </button>
    </motion.div>
  );
};

/* ============================================================
   LOADING
============================================================ */

const WishlistSkeleton = () => {
  return (
    <div
      className="
        grid grid-cols-2
        gap-4
        sm:grid-cols-3
        lg:grid-cols-4
      "
    >
      {Array.from({ length: 8 }).map(
        (_, index) => (
          <motion.div
            key={index}
            animate={{
              opacity: [0.45, 0.8, 0.45],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: index * 0.05,
            }}
          >
            <div
              className="
                aspect-[3/4]
                rounded-xl
                bg-[#E9E2D7]
              "
            />

            <div
              className="
                mt-4 h-2 w-20
                rounded-full
                bg-[#E9E2D7]
              "
            />

            <div
              className="
                mt-2 h-4 w-3/4
                rounded-full
                bg-[#E9E2D7]
              "
            />

            <div
              className="
                mt-2 h-3 w-20
                rounded-full
                bg-[#E9E2D7]
              "
            />
          </motion.div>
        )
      )}
    </div>
  );
};

export default Wishlist;