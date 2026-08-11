import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";


const carouselImages = [
  {
    id: 1,
    src: "/IMG/about.jpeg",
    eyebrow: "HANDWOVEN · DIRECT",
    title: "From the weaver's",
    title2: "hands",
    highlight: "straight to yours.",
    description:
      "Discover authentic handwoven sarees, crafted with patience, tradition and timeless Indian artistry.",
  },
  {
    id: 2,
    src: "/IMG/P22.jpg",
    eyebrow: "DARSH · NEW COLLECTION",
    title: "Woven with",
    title2: "tradition",
    highlight: "made for today.",
    description:
      "Elegant sarees created for women who appreciate heritage, craftsmanship and effortless beauty.",
  },
  {
    id: 3,
    src: "/IMG/P31.jpeg",
    eyebrow: "THE DARSH EDIT",
    title: "Timeless",
    title2: "Indian",
    highlight: "elegance.",
    description:
      "A carefully selected collection of textures, colours and stories from India's weaving traditions.",
  },
  {
    id: 4,
    src: "/IMG/P34.jpeg",
    eyebrow: "DARSH · NEW COLLECTION",
    title: "Woven with",
    title2: "tradition",
    highlight: "made for today.",
    description:
      "Elegant sarees created for women who appreciate heritage, craftsmanship and effortless beauty.",
  }
];

export default function Hero() {
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const intervalRef = useRef(null);

  const currentSlide = carouselImages[currentIndex];

  /* ---------------------------------------
     Navigation
  --------------------------------------- */

  const handleClickShop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    navigate("/allproducts");
  };

  const handleClickStory = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    navigate("/aboutus");
  };

  /* ---------------------------------------
     Carousel
  --------------------------------------- */

  const nextSlide = () => {
    setCurrentIndex(
      (prev) => (prev + 1) % carouselImages.length
    );
  };

  const previousSlide = () => {
    setCurrentIndex(
      (prev) =>
        (prev - 1 + carouselImages.length) %
        carouselImages.length
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  /* ---------------------------------------
     Auto Play
  --------------------------------------- */

  useEffect(() => {
    if (isPaused) return;

    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentIndex, isPaused]);

  return (
    <section
      className="
        relative
        w-full
        h-[620px]
        sm:h-[680px]
        lg:h-[calc(100vh-128px)]
        min-h-[560px]
        max-h-[850px]
        overflow-hidden
        bg-[#3d090f]
      "
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* =====================================================
          BACKGROUND SLIDES
      ===================================================== */}

      <div className="absolute inset-0">
        {carouselImages.map((image, index) => {
          const active = index === currentIndex;

          return (
            <div
              key={image.id}
              className={`
                absolute
                inset-0
                overflow-hidden
                transition-opacity
                duration-[1200ms]
                ease-out
                ${
                  active
                    ? "opacity-100 z-10"
                    : "opacity-0 z-0"
                }
              `}
            >
              <img
                src={image.src}
                alt={image.title}
                className={`
                  absolute
                  inset-0
                  w-full
                  h-full
                  object-cover
                  transition-transform
                  duration-[8000ms]
                  ease-out
                  ${
                    active
                      ? "scale-110"
                      : "scale-100"
                  }
                `}
              />

              {/* Dark cinematic overlay */}

              <div
                className="
                  absolute
                  inset-0
                  bg-[#39070d]/30
                "
              />

              {/* Left wine gradient */}

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-r
                  from-[#500912]/95
                  via-[#5c1017]/70
                  via-45%
                  to-transparent
                "
              />

              {/* Bottom shadow */}

              <div
                className="
                  absolute
                  inset-x-0
                  bottom-0
                  h-1/2
                  bg-gradient-to-t
                  from-[#250508]/70
                  via-transparent
                  to-transparent
                "
              />

              {/* Warm golden atmosphere */}

              <div
                className="
                  absolute
                  top-0
                  right-0
                  w-[55%]
                  h-full
                  bg-gradient-to-l
                  from-[#c59a55]/10
                  to-transparent
                  pointer-events-none
                "
              />
            </div>
          );
        })}
      </div>

      {/* =====================================================
          DECORATIVE VERTICAL LINE
      ===================================================== */}

      <div
        className="
          absolute
          left-6
          sm:left-10
          lg:left-16
          top-1/2
          -translate-y-1/2
          h-[55%]
          w-px
          bg-gradient-to-b
          from-transparent
          via-[#d3a64d]/50
          to-transparent
          z-20
          hidden sm:block
        "
      />

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div
        className="
          relative
          z-20
          h-full
          max-w-[1500px]
          mx-auto
          px-7
          sm:px-12
          lg:px-20
          xl:px-28
          flex
          items-center
        "
      >
        <div
          key={currentSlide.id}
          className="
            max-w-[720px]
            pt-6
            sm:pt-10
            lg:pt-0
            animate-[heroContent_900ms_ease-out]
          "
        >
          {/* Eyebrow */}

          <div
            className="
              flex
              items-center
              gap-3
              mb-5
              sm:mb-7
            "
          >
            <span
              className="
                block
                w-7
                sm:w-10
                h-px
                bg-[#d4a84e]
              "
            />

            <span
              className="
                text-[#dfc889]
                text-[9px]
                sm:text-[10px]
                md:text-[11px]
                tracking-[0.38em]
                uppercase
                font-medium
              "
            >
              {currentSlide.eyebrow}
            </span>
          </div>

          {/* Main heading */}

          <h1
            className="
              font-serif
              text-[#f8f3e8]
              text-[35px]
              leading-[0.98]
              sm:text-[64px]
              sm:leading-[0.95]
              md:text-[76px]
              lg:text-[80px]
              xl:text-[87px]
              font-normal
              tracking-[-0.025em]
            "
          >
            <span className="block">
              {currentSlide.title}
            </span>

            <span className="block">
              {currentSlide.title2}
            </span>

            <span
              className="
                block
                mt-1
                sm:mt-2
                text-[#d2a84e]
                italic
                font-light
                text-[29px]
                sm:text-[52px]
                md:text-[61px]
                lg:text-[68px]
                xl:text-[76px]
              "
            >
              {currentSlide.highlight}
            </span>
          </h1>

          {/* Description */}

          <p
            className="
              mt-6
              sm:mt-8
              max-w-[510px]
              text-[#f1e5d5]/80
              text-[12px]
              sm:text-[14px]
              md:text-[15px]
              leading-7
              tracking-wide
            "
          >
            {currentSlide.description}
          </p>

          {/* =================================================
              BUTTONS
          ================================================= */}

          <div
            className="
              mt-7
              sm:mt-9
              flex
              flex-wrap
              items-center
              gap-3
              sm:gap-4
            "
          >
            {/* Primary */}

            <button
              onClick={handleClickShop}
              className="
                group
                relative
                overflow-hidden
                bg-[#d1a447]
                text-[#3d1711]
                px-6
                sm:px-8
                py-3.5
                sm:py-4
                text-[9px]
                sm:text-[10px]
                tracking-[0.22em]
                font-semibold
                uppercase
                transition-all
                duration-500
                hover:bg-[#e0b85d]
                hover:-translate-y-0.5
                shadow-[0_10px_30px_rgba(0,0,0,0.15)]
              "
            >
              {/* Shine */}

              <span
                className="
                  absolute
                  inset-y-0
                  -left-full
                  w-1/2
                  skew-x-[-20deg]
                  bg-white/25
                  transition-all
                  duration-700
                  group-hover:left-[130%]
                "
              />

              <span
                className="
                  relative
                  flex
                  items-center
                  gap-3
                "
              >
                <ShoppingBag
                  size={15}
                  strokeWidth={1.5}
                />

                Shop Collection

                <ArrowRight
                  size={14}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </span>
            </button>

            {/* Secondary */}

            <button
              onClick={handleClickStory}
              className="
                group
                relative
                border
                border-[#f3dfbd]/45
                text-[#f8f3e8]
                px-6
                sm:px-8
                py-3.5
                sm:py-4
                text-[9px]
                sm:text-[10px]
                tracking-[0.22em]
                font-semibold
                uppercase
                backdrop-blur-sm
                transition-all
                duration-500
                hover:bg-[#f8f3e8]/10
                hover:border-[#d4a84e]
              "
            >
              <span>
                Our Story
              </span>

              <span
                className="
                  absolute
                  left-0
                  bottom-0
                  w-0
                  h-[1px]
                  bg-[#d4a84e]
                  transition-all
                  duration-500
                  group-hover:w-full
                "
              />
            </button>
          </div>

          {/* Small trust line */}

          <div
            className="
              mt-7
              flex
              items-center
              gap-3
              text-[#ead8b5]/70
            "
          >
            <Sparkles
              size={13}
              strokeWidth={1.2}
            />

            <span
              className="
                text-[8px]
                sm:text-[9px]
                tracking-[0.25em]
                uppercase
              "
            >
              Authentic · Handwoven · Thoughtfully Made
            </span>
          </div>
        </div>
      </div>

     

      {/* =====================================================
          PROGRESS INDICATORS
      ===================================================== */}

      <div
        className="
          absolute
          left-1/2
          -translate-x-1/2
          bottom-8
          sm:bottom-10
          z-30
          flex
          items-center
          gap-2
        "
      >
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${
              index + 1
            }`}
            className="
              group
              relative
              h-5
              flex
              items-center
            "
          >
            <span
              className={`
                block
                h-[1px]
                transition-all
                duration-500
                ${
                  index === currentIndex
                    ? "w-9 bg-[#d2a84e]"
                    : "w-5 bg-[#f5e8d0]/45 group-hover:bg-[#f5e8d0]/80"
                }
              `}
            />
          </button>
        ))}
      </div>

      {/* =====================================================
          ARROW CONTROLS
      ===================================================== */}

      <div
        className="
          absolute
          right-7
          sm:right-12
          lg:right-20
          bottom-7
          sm:bottom-9
          z-30
          flex
        "
      >
        {/* Previous */}

        <button
          onClick={previousSlide}
          aria-label="Previous slide"
          className="
            group
            w-6
            h-6
            sm:w-12
            sm:h-12
            border
            border-[#f4e5c8]/35
            flex
            items-center
            justify-center
            text-[#f8f3e8]
            transition-all
            duration-300
            hover:bg-[#d1a447]
            hover:text-[#3d1711]
            hover:border-[#d1a447]
          "
        >
          <ChevronLeft
            size={18}
            strokeWidth={1.2}
            className="
              transition-transform
              group-hover:-translate-x-0.5
            "
          />
        </button>

        {/* Next */}

        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="
            group
            w-6
            h-6
            sm:w-12
            sm:h-12
            border
            border-l-0
            border-[#f4e5c8]/35
            flex
            items-center
            justify-center
            text-[#f8f3e8]
            transition-all
            duration-300
            hover:bg-[#d1a447]
            hover:text-[#3d1711]
            hover:border-[#d1a447]
          "
        >
          <ChevronRight
            size={18}
            strokeWidth={1.2}
            className="
              transition-transform
              group-hover:translate-x-0.5
            "
          />
        </button>
      </div>

      {/* =====================================================
          TOP RIGHT DECORATION
      ===================================================== */}

      <div
        className="
          absolute
          right-8
          sm:right-14
          lg:right-20
          top-10
          z-20
          hidden
          md:block
        "
      >
        <div
          className="
            flex
            items-center
            gap-3
            text-[#f3ddaf]/60
          "
        >
          <span
            className="
              text-[8px]
              tracking-[0.35em]
              uppercase
            "
          >
            DARSH
          </span>

          <span className="w-8 h-px bg-[#d1a447]/40" />

          <span
            className="
              text-[8px]
              tracking-[0.2em]
            "
          >
            2026
          </span>
        </div>
      </div>

      {/* =====================================================
          ANIMATED GOLD PARTICLES
      ===================================================== */}

      <div
        className="
          absolute
          top-[22%]
          right-[35%]
          z-20
          w-1
          h-1
          rounded-full
          bg-[#d4a84e]
          shadow-[0_0_12px_#d4a84e]
          animate-[goldFloat_4s_ease-in-out_infinite]
        "
      />

      <div
        className="
          absolute
          bottom-[30%]
          right-[18%]
          z-20
          w-1.5
          h-1.5
          rounded-full
          bg-[#e5c477]/60
          blur-[1px]
          animate-[goldFloat_5s_ease-in-out_infinite_reverse]
        "
      />

      {/* =====================================================
          CUSTOM ANIMATIONS
      ===================================================== */}

      <style>
        {`
          @keyframes heroContent {
            0% {
              opacity: 0;
              transform: translateY(35px);
            }

            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes goldFloat {
            0%,
            100% {
              transform: translateY(0) translateX(0);
              opacity: 0.3;
            }

            50% {
              transform: translateY(-25px) translateX(12px);
              opacity: 1;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            *,
            *::before,
            *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
        `}
      </style>
    </section>
  );
}