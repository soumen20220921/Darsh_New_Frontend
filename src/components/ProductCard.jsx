import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const ProductCard = ({
  product,
  onAddToCart,
  isCompactMobile,
}) => {
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

  const discount =
    oldPrice && Number(price) < Number(oldPrice)
      ? Math.round(
          ((Number(oldPrice) - Number(price)) /
            Number(oldPrice)) *
            100
        )
      : null;

  const productLink = `/productDetails/${id}`;

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <article
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

    </article>
  );
};

export default ProductCard;