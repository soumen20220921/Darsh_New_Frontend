import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Heart,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const ProductCard = ({
  product,
  onAddToCart,
  isCompactMobile,
}) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  /*
    IMPORTANT:
    Hooks must always run in the same order.
    productId is derived safely BEFORE the hook, so an absent
    product never causes a conditional hook call.
  */
  const productId =
    product?.id || product?._id || null;

  useEffect(() => {
    if (!productId) {
      setIsWishlisted(false);
      return;
    }
    try {
      const saved = JSON.parse(
        localStorage.getItem("wishlist") || "[]"
      );

      setIsWishlisted(
        Array.isArray(saved) &&
          saved.some(
            (item) =>
              String(item?._id || item?.id) ===
              String(productId)
          )
      );
    } catch {
      setIsWishlisted(false);
    }
  }, [productId]);

  /*
    Keep the null guard AFTER all hooks.
    This fixes react-hooks/rules-of-hooks.
  */
  if (!product) return null;

  const {
    id,
    name,
    image,
    price,
    oldPrice = product?.oldprice,
    isNew,
    rating,
    reviews,
    fabric,
    category,
    subCategory,
  } = product;

  const wishlistItem = {
    ...product,
    id: productId,
    _id: product?._id || productId,
    name:
      product?.name ||
      product?.productName ||
      "Darsh Saree",
    image:
      product?.image ||
      product?.images?.[0] ||
      product?.img ||
      "/IMG/placeholder.jpg",
    price: Number(product?.price || 0),
    oldPrice:
      product?.oldPrice ??
      product?.oldprice ??
      product?.originalPrice ??
      product?.mrp ??
      0,
  };

  const toggleWishlist = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!productId) {
      toast.error("Product ID not available", {
        theme: "dark",
      });
      return;
    }

    try {
      const saved = JSON.parse(
        localStorage.getItem("wishlist") || "[]"
      );

      const items = Array.isArray(saved)
        ? saved
        : [];

      const exists = items.some(
        (item) =>
          String(item?._id || item?.id) ===
          String(productId)
      );

      const updated = exists
        ? items.filter(
            (item) =>
              String(item?._id || item?.id) !==
              String(productId)
          )
        : [...items, wishlistItem];

      localStorage.setItem(
        "wishlist",
        JSON.stringify(updated)
      );

      window.dispatchEvent(
        new Event("darsh-wishlist-updated")
      );

      setIsWishlisted(!exists);

      toast.success(
        exists
          ? "Removed from wishlist"
          : "Added to wishlist",
        {
          theme: "dark",
          autoClose: 1400,
        }
      );
    } catch {
      toast.error(
        "Unable to update wishlist",
        { theme: "dark" }
      );
    }
  };

  const isPremium =
    Number(price || 0) >= 5000;

  const discount =
    oldPrice && Number(price) < Number(oldPrice)
      ? Math.round(
          ((Number(oldPrice) - Number(price)) /
            Number(oldPrice)) *
            100
        )
      : null;

  const productLink = `/productDetails/${productId}`;

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`
        group
        relative
        w-full
        bg-transparent
        text-[#3f1616]
        ${
          isCompactMobile
            ? "max-w-none mx-auto"
            : ""
        }
      `}
    >

      {/* =====================================================
          IMAGE
      ===================================================== */}

      <Link
        to={productLink}
        onClick={handleScrollTop}
        className="
          relative
          block
          overflow-hidden
          bg-[#eee5d5]
          aspect-[3/4]
        "
      >

        {/* Product image */}

        <img
          src={
            image ||
            "https://placehold.co/600x800/f0e8da/741522?text=Darsh"
          }
          alt={name}
          loading="lazy"
          className="
            absolute
            inset-0
            w-full
            h-full
            object-cover
            transition-transform
            duration-1000
            ease-[cubic-bezier(0.22,1,0.36,1)]
            group-hover:scale-[1.045]
          "
        />


        {/* Soft image overlay */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-[#3f1616]/20
            via-transparent
            to-transparent
            opacity-0
            group-hover:opacity-100
            transition-opacity
            duration-700
            pointer-events-none
          "
        />


        {/* ===================================================
            BADGES
        =================================================== */}

        <div
          className="
            absolute
            top-3
            left-3
            flex
            flex-col
            items-start
            gap-2
          "
        >

          {isNew && (
            <span
              className="
                bg-[#d4ad54]
                text-[#4a211f]
                px-2.5
                py-1.5
                text-[7px]
                tracking-[0.2em]
                uppercase
                leading-none
              "
            >
              New
            </span>
          )}

          {discount && (
            <span
              className="
                bg-[#741522]
                text-[#f8f4eb]
                px-2.5
                py-1.5
                text-[7px]
                tracking-[0.16em]
                uppercase
                leading-none
              "
            >
              -{discount}%
            </span>
          )}

        </div>


        {/* ===================================================
            WISHLIST
        =================================================== */}

        <motion.button
          type="button"
          onClick={toggleWishlist}
          whileTap={{ scale: 0.88 }}
          whileHover={{ scale: 1.06 }}
          aria-label={
            isWishlisted
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
          className="
            absolute
            top-3
            right-3
            z-30
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            border
            border-white/60
            bg-[#FFFDF8]/90
            text-[#741522]
            shadow-[0_6px_18px_rgba(63,22,22,0.12)]
            backdrop-blur-md
            transition-all
            duration-300
            hover:bg-[#741522]
            hover:text-white
          "
        >
          <motion.span
            animate={
              isWishlisted
                ? {
                    scale: [1, 1.25, 1],
                    rotate: [0, -8, 8, 0],
                  }
                : { scale: 1 }
            }
            transition={{ duration: 0.35 }}
          >
            <Heart
              size={16}
              strokeWidth={1.5}
              fill={
                isWishlisted
                  ? "currentColor"
                  : "none"
            }
          />
          </motion.span>

          {isWishlisted && (
            <span
              className="
                absolute
                -right-0.5
                -top-0.5
                h-2
                w-2
                rounded-full
                bg-[#C9A24A]
              "
            />
          )}
        </motion.button>

        {/* PREMIUM BADGE */}

        {isPremium && (
          <div
            className="
              absolute
              bottom-3
              left-3
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
              size={10}
              className="text-[#C9A24A]"
            />
            PREMIUM
          </div>
        )}

                {/* ===================================================
            HOVER VIEW BUTTON
        =================================================== */}

        <div
          className="
            absolute
            inset-x-0
            bottom-0
            p-3
            sm:p-4
            flex
            justify-end
            translate-y-3
            opacity-0
            group-hover:translate-y-0
            group-hover:opacity-100
            transition-all
            duration-500
          "
        >

          <span
            className="
              inline-flex
              items-center
              gap-2
              bg-[#f8f4eb]
              text-[#741522]
              px-3
              sm:px-4
              py-2
              text-[7px]
              sm:text-[8px]
              tracking-[0.18em]
              uppercase
              shadow-sm
            "
          >

            View

            <ArrowUpRight
              size={13}
              strokeWidth={1.2}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
              "
            />

          </span>

        </div>

      </Link>


      {/* =====================================================
          PRODUCT INFORMATION
      ===================================================== */}

      <div
        className="
          pt-4
          pb-1
        "
      >

        {/* Name + Price */}

        <div
          className="
            flex
            items-start
            justify-between
            gap-3
          "
        >

          <Link
            to={productLink}
            onClick={handleScrollTop}
            className="
              min-w-0
              group/name
            "
          >

            <h3
              className="
                font-serif
                font-normal
                text-[16px]
                sm:text-[18px]
                leading-[1.2]
                text-[#3f1616]
                transition-colors
                duration-300
                group-hover/name:text-[#741522]
                line-clamp-2
              "
            >
              {name}
            </h3>

          </Link>


          {/* Price */}

          <div
            className="
              shrink-0
              text-right
            "
          >

            <div
              className="
                text-[11px]
                sm:text-[12px]
                text-[#3f1616]
                whitespace-nowrap
              "
            >
              ₹{Number(price || 0).toLocaleString("en-IN")}
            </div>


            {oldPrice && (
              <div
                className="
                  mt-0.5
                  text-[9px]
                  text-[#9c8980]
                  line-through
                  whitespace-nowrap
                "
              >
                ₹
                {Number(oldPrice).toLocaleString(
                  "en-IN"
                )}
              </div>
            )}

          </div>

        </div>


        {/* ===================================================
            PRODUCT META
        =================================================== */}

        {(fabric ||
          category ||
          subCategory) && (
          <p
            className="
              mt-2
              text-[7px]
              sm:text-[8px]
              tracking-[0.18em]
              uppercase
              text-[#927c71]
              truncate
            "
          >

            {fabric ||
              subCategory ||
              category}

            {(fabric ||
              subCategory) &&
              " · "}

            {subCategory ||
              category ||
              "Handwoven"}

          </p>
        )}


        {/* ===================================================
            RATING
        =================================================== */}

        {rating ? (
          <div
            className="
              mt-2.5
              flex
              items-center
              gap-2
            "
          >

            <span
              className="
                text-[9px]
                tracking-[1px]
                text-[#b58b32]
              "
            >
              {"★".repeat(
                Math.min(
                  5,
                  Math.floor(rating)
                )
              )}
              {"☆".repeat(
                Math.max(
                  0,
                  5 -
                    Math.floor(rating)
                )
              )}
            </span>

            {reviews && (
              <span
                className="
                  text-[8px]
                  text-[#9c8980]
                "
              >
                ({reviews})
              </span>
            )}

          </div>
        ) : null}


        {/* ===================================================
            MOBILE VIEW LINK
        =================================================== */}

        <Link
          to={productLink}
          onClick={handleScrollTop}
          className="
            mt-3
            inline-flex
            sm:hidden
            items-center
            gap-1.5
            text-[7px]
            tracking-[0.2em]
            uppercase
            text-[#741522]
            opacity-70
            group-hover:opacity-100
            transition-opacity
          "
        >

          View piece

          <ArrowUpRight
            size={11}
            strokeWidth={1.2}
          />

        </Link>

      </div>


      {/* =====================================================
          EDITORIAL HOVER LINE
      ===================================================== */}

      <div
        className="
          absolute
          left-0
          bottom-0
          w-0
          h-px
          bg-[#d4ad54]
          group-hover:w-full
          transition-all
          duration-700
          ease-out
        "
      />

    </motion.article>
  );
};

export default ProductCard;