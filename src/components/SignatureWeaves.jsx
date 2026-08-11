import { Link } from "react-router-dom";

const weaveCategories = [
  {
    id: 1,
    name: "Pujo Special",
    subtitle: "Durga Puja Collection",
    slug: "Pujo Special",
  },
  {
    id: 2,
    name: "Banarasi",
    subtitle: "Luxurious drapes for special occasions",
    slug: "banarasi",
  },
  {
    id: 3,
    name: "Kanthastitch",
    subtitle: " Intricate embroidery for timeless elegance",
    slug: "Kanthastitch",
  },
  {
    id: 4,
    name: "Kanjivaram",
    subtitle: " Rich heritage woven in vibrant colors",
    slug: "Kanjivaram",
  },
];

export default function SignatureWeaves() {
  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-[#f5eddf]
        border-y
        border-[#6f3e2d]/[0.06]
      "
    >
      {/* =========================================
          MAIN CONTAINER
      ========================================= */}

      <div
        className="
          mx-auto
          w-full
          max-w-[1500px]

          px-5
          py-10

          sm:px-8
          sm:py-12

          md:px-12
          md:py-14

          lg:px-20
          lg:py-16

          xl:px-28
        "
      >
        <div
          className="
            grid
            grid-cols-2
            gap-y-9
            gap-x-3

            sm:gap-y-11
            sm:gap-x-8

            md:grid-cols-4
            md:gap-0
          "
        >
          {weaveCategories.map((item, index) => (
            <Link
              key={item.id}
              to={`/Categories/${item.slug}`}
              onClick={() => window.scrollTo(0, 0)}
              className="
                group
                relative
                flex
                min-w-0
                flex-col
                items-center
                justify-center
                px-2
                text-center

                sm:px-4

                md:px-5
                lg:px-8
                xl:px-10

                focus:outline-none
              "
            >
              {/* =====================================
                  DESKTOP SEPARATOR
              ===================================== */}

              {index > 0 && (
                <span
                  className="
                    absolute
                    left-0
                    top-1/2
                    hidden
                    h-12
                    w-px
                    -translate-y-1/2
                    bg-[#744735]/10

                    md:block
                  "
                />
              )}

              {/* =====================================
                  SMALL NUMBER
              ===================================== */}

              <span
                className="
                  mb-2
                  font-sans
                  text-[7px]
                  font-medium
                  uppercase
                  tracking-[0.28em]
                  text-[#a27a59]/70

                  sm:text-[8px]
                "
              >
                0{index + 1}
              </span>

              {/* =====================================
                  TITLE
              ===================================== */}

              <h2
                className="
                  relative
                  whitespace-nowrap
                  font-serif
                  font-normal
                  leading-none
                  tracking-[-0.02em]
                  text-[#4d281f]

                  text-[19px]

                  sm:text-[23px]

                  md:text-[22px]

                  lg:text-[24px]

                  xl:text-[27px]
                "
              >
                {item.name}

                {/* Animated underline */}
                <span
                  className="
                    absolute
                    -bottom-2
                    left-1/2
                    h-px
                    w-0
                    -translate-x-1/2
                    bg-[#b58a4b]
                    transition-all
                    duration-500
                    ease-out

                    group-hover:w-full
                  "
                />
              </h2>

              {/* =====================================
                  DESCRIPTION
              ===================================== */}

              <p
                className="
                  mt-3
                  max-w-[190px]
                  font-sans
                  text-[8px]
                  leading-4
                  tracking-[0.05em]
                  text-[#80675c]

                  sm:text-[9px]
                  sm:tracking-[0.06em]

                  md:text-[9px]

                  lg:text-[10px]
                "
              >
                {item.subtitle}
              </p>

              {/* =====================================
                  MOBILE / HOVER DOT
              ===================================== */}

              <span
                className="
                  mt-3
                  h-1
                  w-1
                  rounded-full
                  bg-[#b58a4b]/40
                  transition-all
                  duration-500

                  group-hover:w-5
                  group-hover:rounded-none
                  group-hover:bg-[#b58a4b]
                "
              />
            </Link>
          ))}
        </div>
      </div>

      {/* =========================================
          VERY SUBTLE TOP DECORATION
      ========================================= */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-px
          w-20
          -translate-x-1/2
          bg-[#b58a4b]/40
        "
      />

      {/* =========================================
          RESPONSIVE MOTION
      ========================================= */}

      <style>
        {`
          @media (max-width: 380px) {
            .signature-weave-title {
              font-size: 17px;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            * {
              transition-duration: 0.01ms !important;
              animation-duration: 0.01ms !important;
            }
          }
        `}
      </style>
    </section>
  );
}