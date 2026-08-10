import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Play,
} from "lucide-react";

import { Link } from "react-router-dom";

const reelsData = [
  {
    id: 1,
    video: "https://www.youtube.com/embed/ir9QHORiq7Q",
    title: "Mirror Modal Saree",
    subtitle:
      " Elegant mirror work on soft modal fabric for a graceful and stylish look.",
    shopLink: "/allproducts",
    thumbnail:
      "/IMG/reels2.png",
  },

  {
    id: 2,
    video: "https://www.youtube.com/embed/l9uewPMPJj8",
    title: "Dolabari Replica Saree",
    subtitle:
      " Traditional elegance with a premium look at an affordable price.",
    shopLink: "/allproducts",
    thumbnail:
      "/IMG/reels1.png"
      },

  {
    id: 3,
    video: "https://www.youtube.com/embed/gR6Ipl1pKig",
    title: "Handloom Cotton Saree",
    subtitle:
      " Soft, breathable & beautifully handwoven for everyday comfort and elegance.",
    shopLink: "/allproducts",
    thumbnail:
      "/IMG/reels3.png",
  },
];


/* =========================================================
   REELS COMPONENT
========================================================= */

const Reels = () => {
  const [currentReel, setCurrentReel] =
    useState(0);

  const [muted, setMuted] =
    useState(false);

  const [isPlaying, setIsPlaying] =
    useState(false);

  const [isFullscreen, setIsFullscreen] =
    useState(false);

  const [isHovered, setIsHovered] =
    useState(false);

  const reelRef = useRef(null);
  const containerRef = useRef(null);


  /* =======================================================
     CURRENT REEL
  ======================================================= */

  const current =
    reelsData[currentReel];


  /* =======================================================
     NEXT
  ======================================================= */

  const handleNextReel = () => {
    setCurrentReel(
      (prev) =>
        (prev + 1) %
        reelsData.length
    );
  };


  /* =======================================================
     PREVIOUS
  ======================================================= */

  const handlePrevReel = () => {
    setCurrentReel(
      (prev) =>
        prev === 0
          ? reelsData.length - 1
          : prev - 1
    );
  };


  /* =======================================================
     MUTE
  ======================================================= */

  const toggleMute = () => {
    setMuted((prev) => !prev);
  };


  /* =======================================================
     FULLSCREEN
  ======================================================= */

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await containerRef.current?.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error(
        "Fullscreen error:",
        error
      );
    }
  };


  /* =======================================================
     FULLSCREEN STATE
  ======================================================= */

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(
        Boolean(document.fullscreenElement)
      );
    };

    document.addEventListener(
      "fullscreenchange",
      handleFullscreenChange
    );

    return () => {
      document.removeEventListener(
        "fullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);


  /* =======================================================
     INTERSECTION OBSERVER
  ======================================================= */

  useEffect(() => {
    if (!reelRef.current) return;

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          setIsPlaying(
            entry.isIntersecting &&
              entry.intersectionRatio >= 0.65
          );
        },
        {
          threshold: [
            0,
            0.35,
            0.65,
            1,
          ],
        }
      );

    observer.observe(reelRef.current);

    return () => {
      observer.disconnect();
    };
  }, [currentReel]);


  /* =======================================================
     KEYBOARD NAVIGATION
  ======================================================= */

  useEffect(() => {
    const handleKeyDown = (event) => {
      /*
        Don't hijack keyboard controls
        when typing in an input.
      */

      const tag =
        event.target?.tagName;

      if (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT"
      ) {
        return;
      }

      if (
        event.key === "ArrowRight"
      ) {
        handleNextReel();
      }

      if (
        event.key === "ArrowLeft"
      ) {
        handlePrevReel();
      }

      if (event.key === "m") {
        toggleMute();
      }

      if (event.key === "Escape") {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        }
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);


  /* =======================================================
     YOUTUBE URL
  ======================================================= */

  const videoUrl =
    `${current.video}` +
    `?autoplay=${isPlaying ? 1 : 0}` +
    `&mute=${muted ? 1 : 0}` +
    `&controls=0` +
    `&modestbranding=1` +
    `&rel=0` +
    `&playsinline=1`;


  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#f8f4eb]
        text-[#3f1616]
        border-t
        border-[#741522]/10
        py-20
        sm:py-24
        lg:py-28
      "
    >

      {/* ===================================================
          DECORATIVE BACKGROUND
      =================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          overflow-hidden
        "
      >

        <div
          className="
            absolute
            -right-40
            top-20
            w-[450px]
            h-[450px]
            rounded-full
            border
            border-[#741522]/5
          "
        />

        <div
          className="
            absolute
            -left-40
            bottom-[-150px]
            w-[500px]
            h-[500px]
            rounded-full
            border
            border-[#d4ad54]/10
          "
        />

      </div>


      {/* ===================================================
          MAIN WRAPPER
      =================================================== */}

      <div
        className="
          relative
          z-10
          max-w-[1120px]
          mx-auto
          px-5
          sm:px-8
          lg:px-0
        "
      >

        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="
            flex
            flex-col
            lg:flex-row
            lg:items-end
            lg:justify-between
            gap-7
            mb-12
          "
        >

          <div>

            {/* Eyebrow */}

            <div
              className="
                flex
                items-center
                gap-3
                mb-4
              "
            >

              <span
                className="
                  w-8
                  h-px
                  bg-[#d4ad54]
                "
              />

              <span
                className="
                  text-[8px]
                  sm:text-[9px]
                  tracking-[0.38em]
                  uppercase
                  text-[#977e73]
                "
              >
                THE DARSH EDIT
              </span>

            </div>


            {/* Heading */}

            <h2
              className="
                font-serif
                font-normal
                text-[#3f1616]
                text-[34px]
                sm:text-[48px]
                lg:text-[56px]
                leading-none
                tracking-[-0.025em]
              "
            >
              Trending looks
              <span
                className="
                  block
                  text-[#741522]
                  italic
                  mt-1
                "
              >
                to watch
              </span>
            </h2>


            {/* Description */}

            <p
              className="
                max-w-[500px]
                mt-5
                text-[11px]
                sm:text-[13px]
                leading-6
                text-[#806c63]
              "
            >
              Discover our latest styles,
              see the drape up close and
              find inspiration for your
              next Darsh look.
            </p>

          </div>


          {/* Header CTA */}

          <Link
            to="/allproducts"
            className="
              group
              inline-flex
              items-center
              gap-3
              self-start
              lg:self-auto
              border
              border-[#741522]/40
              text-[#741522]
              px-6
              py-3
              text-[8px]
              tracking-[0.25em]
              uppercase
              transition-all
              duration-300
              hover:bg-[#741522]
              hover:text-[#f8f4eb]
            "
          >
            Shop the looks

            <ArrowRight
              size={14}
              strokeWidth={1.2}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />
          </Link>

        </div>


        {/* =================================================
            REEL AREA
        ================================================= */}

        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-[minmax(0,1fr)_300px]
            gap-8
            lg:gap-10
            items-start
          "
        >

          {/* ===============================================
              PLAYER
          =============================================== */}

          <div
            ref={containerRef}
            className="
              relative
              bg-[#4b1117]
              overflow-hidden
              min-h-[520px]
              sm:min-h-[620px]
              lg:min-h-[650px]
              flex
              items-center
              justify-center
              group/player
            "
            onMouseEnter={() =>
              setIsHovered(true)
            }
            onMouseLeave={() =>
              setIsHovered(false)
            }
          >

            {/* Decorative frame */}

            <div
              className="
                pointer-events-none
                absolute
                inset-3
                sm:inset-4
                border
                border-[#d4ad54]/20
                z-20
              "
            />


            {/* Reel */}

            <div
              ref={reelRef}
              className="
                relative
                w-full
                h-full
                min-h-[520px]
                sm:min-h-[620px]
                lg:min-h-[650px]
                flex
                items-center
                justify-center
                bg-black
              "
            >

              <iframe
                key={`${current.id}-${muted}`}
                src={videoUrl}
                title={current.title}
                className="
                  w-full
                  h-full
                  min-h-[520px]
                  sm:min-h-[620px]
                  lg:min-h-[650px]
                  border-0
                "
                allow="
                  accelerometer;
                  autoplay;
                  clipboard-write;
                  encrypted-media;
                  gyroscope;
                  picture-in-picture;
                  fullscreen
                "
                allowFullScreen
              />


              {/* =========================================
                  TOP BRAND LABEL
              ========================================= */}

              <div
                className="
                  absolute
                  top-7
                  left-7
                  sm:left-9
                  z-30
                  flex
                  items-center
                  gap-2
                  pointer-events-none
                "
              >

                <Sparkles
                  size={13}
                  strokeWidth={1}
                  className="
                    text-[#d4ad54]
                  "
                />

                <span
                  className="
                    text-[8px]
                    tracking-[0.3em]
                    uppercase
                    text-[#f8f4eb]
                  "
                >
                  DARSH
                </span>

              </div>


              {/* =========================================
                  PLAY INDICATOR
              ========================================= */}

              {!isPlaying && (
                <div
                  className="
                    absolute
                    inset-0
                    z-20
                    flex
                    items-center
                    justify-center
                    pointer-events-none
                  "
                >
                  <div
                    className="
                      w-14
                      h-14
                      sm:w-16
                      sm:h-16
                      border
                      border-[#f8f4eb]/60
                      flex
                      items-center
                      justify-center
                      bg-[#741522]/50
                      backdrop-blur-sm
                    "
                  >
                    <Play
                      size={19}
                      fill="currentColor"
                      strokeWidth={1}
                      className="
                        text-[#f8f4eb]
                        ml-0.5
                      "
                    />
                  </div>
                </div>
              )}


              {/* =========================================
                  BOTTOM OVERLAY
              ========================================= */}

              <div
                className="
                  absolute
                  left-0
                  right-0
                  bottom-0
                  z-30
                  p-6
                  sm:p-8
                  bg-gradient-to-t
                  from-[#2d070c]/95
                  via-[#2d070c]/60
                  to-transparent
                  pointer-events-none
                "
              >

                <div
                  className="
                    max-w-[500px]
                  "
                >

                  <p
                    className="
                      text-[7px]
                      tracking-[0.28em]
                      uppercase
                      text-[#d4ad54]
                      mb-2
                    "
                  >
                    WATCH THE WEAVE
                  </p>

                  <h3
                    className="
                      font-serif
                      text-[#f8f4eb]
                      text-[22px]
                      sm:text-[27px]
                    "
                  >
                    {current.title}
                  </h3>

                  <p
                    className="
                      mt-2
                      text-[10px]
                      sm:text-[11px]
                      text-[#f8f4eb]/70
                    "
                  >
                    {current.subtitle}
                  </p>

                </div>

              </div>


              {/* =========================================
                  CONTROLS
              ========================================= */}

              <div
                className={`
                  absolute
                  bottom-6
                  right-6
                  sm:right-8
                  z-40
                  flex
                  gap-1
                  transition-all
                  duration-300
                  ${
                    isHovered
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2"
                  }
                `}
              >

                {/* Mute */}

                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={
                    muted
                      ? "Unmute reel"
                      : "Mute reel"
                  }
                  className="
                    w-10
                    h-10
                    border
                    border-[#f8f4eb]/40
                    bg-[#4b1117]/60
                    backdrop-blur-sm
                    text-[#f8f4eb]
                    flex
                    items-center
                    justify-center
                    transition-all
                    duration-300
                    hover:bg-[#d4ad54]
                    hover:text-[#4b1117]
                    hover:border-[#d4ad54]
                  "
                >
                  {muted ? (
                    <VolumeX
                      size={16}
                      strokeWidth={1.2}
                    />
                  ) : (
                    <Volume2
                      size={16}
                      strokeWidth={1.2}
                    />
                  )}
                </button>


                {/* Fullscreen */}

                <button
                  type="button"
                  onClick={toggleFullscreen}
                  aria-label={
                    isFullscreen
                      ? "Exit fullscreen"
                      : "Enter fullscreen"
                  }
                  className="
                    w-10
                    h-10
                    border
                    border-[#f8f4eb]/40
                    bg-[#4b1117]/60
                    backdrop-blur-sm
                    text-[#f8f4eb]
                    flex
                    items-center
                    justify-center
                    transition-all
                    duration-300
                    hover:bg-[#d4ad54]
                    hover:text-[#4b1117]
                    hover:border-[#d4ad54]
                  "
                >
                  {isFullscreen ? (
                    <Minimize
                      size={16}
                      strokeWidth={1.2}
                    />
                  ) : (
                    <Maximize
                      size={16}
                      strokeWidth={1.2}
                    />
                  )}
                </button>

              </div>


              {/* =========================================
                  LEFT / RIGHT NAVIGATION
              ========================================= */}

              {reelsData.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevReel}
                    aria-label="Previous reel"
                    className="
                      absolute
                      left-5
                      top-1/2
                      -translate-y-1/2
                      z-40
                      w-10
                      h-10
                      border
                      border-[#f8f4eb]/40
                      bg-[#4b1117]/40
                      backdrop-blur-sm
                      text-[#f8f4eb]
                      flex
                      items-center
                      justify-center
                      transition-all
                      duration-300
                      hover:bg-[#d4ad54]
                      hover:text-[#4b1117]
                    "
                  >
                    <ChevronLeft
                      size={18}
                      strokeWidth={1.2}
                    />
                  </button>

                  <button
                    type="button"
                    onClick={handleNextReel}
                    aria-label="Next reel"
                    className="
                      absolute
                      right-5
                      top-1/2
                      -translate-y-1/2
                      z-40
                      w-10
                      h-10
                      border
                      border-[#f8f4eb]/40
                      bg-[#4b1117]/40
                      backdrop-blur-sm
                      text-[#f8f4eb]
                      flex
                      items-center
                      justify-center
                      transition-all
                      duration-300
                      hover:bg-[#d4ad54]
                      hover:text-[#4b1117]
                    "
                  >
                    <ChevronRight
                      size={18}
                      strokeWidth={1.2}
                    />
                  </button>
                </>
              )}

            </div>

          </div>


          {/* ===============================================
              REEL LIST
          =============================================== */}

          <div
            className="
              hidden
              lg:block
            "
          >

            <div
              className="
                border-t
                border-[#741522]/15
              "
            >

              <div
                className="
                  py-5
                  flex
                  items-center
                  justify-between
                  border-b
                  border-[#741522]/15
                "
              >

                <span
                  className="
                    text-[8px]
                    tracking-[0.3em]
                    uppercase
                    text-[#977e73]
                  "
                >
                  LATEST REELS
                </span>

                <span
                  className="
                    text-[9px]
                    text-[#977e73]
                  "
                >
                  {String(
                    currentReel + 1
                  ).padStart(2, "0")}
                  /
                  {String(
                    reelsData.length
                  ).padStart(2, "0")}
                </span>

              </div>


              {/* Reel items */}

              <div>
                {reelsData.map(
                  (reel, index) => {
                    const active =
                      index === currentReel;

                    return (
                      <button
                        key={reel.id}
                        type="button"
                        onClick={() =>
                          setCurrentReel(index)
                        }
                        className={`
                          w-full
                          text-left
                          flex
                          gap-4
                          py-5
                          border-b
                          border-[#741522]/10
                          transition-all
                          duration-400
                          group
                          ${
                            active
                              ? "bg-[#eee5d6]"
                              : "hover:bg-[#eee5d6]/60"
                          }
                        `}
                      >

                        {/* Thumbnail */}

                        <div
                          className="
                            relative
                            w-[74px]
                            aspect-[9/12]
                            shrink-0
                            overflow-hidden
                            bg-[#e9dfcf]
                          "
                        >

                          <img
                            src={reel.thumbnail}
                            alt=""
                            className="
                              w-full
                              h-full
                              object-cover
                              transition-transform
                              duration-700
                              group-hover:scale-105
                            "
                          />

                          <div
                            className={`
                              absolute
                              inset-0
                              flex
                              items-center
                              justify-center
                              ${
                                active
                                  ? "bg-[#741522]/35"
                                  : "bg-black/10"
                              }
                            `}
                          >
                            <Play
                              size={13}
                              fill="currentColor"
                              className="
                                text-white
                              "
                            />
                          </div>

                        </div>


                        {/* Text */}

                        <div
                          className="
                            py-1
                            min-w-0
                          "
                        >

                          <p
                            className="
                              text-[7px]
                              tracking-[0.22em]
                              uppercase
                              text-[#977e73]
                              mb-2
                            "
                          >
                            REEL{" "}
                            {String(
                              index + 1
                            ).padStart(2, "0")}
                          </p>

                          <h4
                            className={`
                              font-serif
                              text-[17px]
                              leading-tight
                              ${
                                active
                                  ? "text-[#741522]"
                                  : "text-[#3f1616]"
                              }
                            `}
                          >
                            {reel.title}
                          </h4>

                          <span
                            className="
                              inline-flex
                              items-center
                              gap-2
                              mt-3
                              text-[7px]
                              tracking-[0.2em]
                              uppercase
                              text-[#977e73]
                            "
                          >
                            Watch

                            <ArrowRight
                              size={11}
                              className="
                                transition-transform
                                group-hover:translate-x-1
                              "
                            />
                          </span>

                        </div>

                      </button>
                    );
                  }
                )}
              </div>

            </div>


            {/* Keyboard hint */}

            <div
              className="
                mt-6
                flex
                items-center
                gap-3
                text-[#a18b80]
              "
            >

              <span
                className="
                  text-[7px]
                  tracking-[0.2em]
                  uppercase
                "
              >
                ← →
              </span>

              <span
                className="
                  text-[8px]
                "
              >
                Use arrow keys to browse
              </span>

            </div>

          </div>

        </div>


        {/* =================================================
            MOBILE REEL INDICATORS
        ================================================= */}

        {reelsData.length > 1 && (
          <div
            className="
              flex
              lg:hidden
              justify-center
              items-center
              gap-2
              mt-7
            "
          >

            {reelsData.map(
              (_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() =>
                    setCurrentReel(index)
                  }
                  aria-label={`Open reel ${
                    index + 1
                  }`}
                  className={`
                    h-px
                    transition-all
                    duration-500
                    ${
                      index === currentReel
                        ? "w-9 bg-[#741522]"
                        : "w-4 bg-[#741522]/20"
                    }
                  `}
                />
              )
            )}

          </div>
        )}


        {/* =================================================
            FOOT NOTE
        ================================================= */}

        <div
          className="
            mt-10
            flex
            flex-col
            sm:flex-row
            items-center
            justify-center
            gap-3
            text-center
          "
        >

          <span
            className="
              text-[8px]
              tracking-[0.22em]
              uppercase
              text-[#977e73]
            "
          >
            SOUND ON FOR THE FULL EXPERIENCE
          </span>

          <span
            className="
              hidden
              sm:block
              w-5
              h-px
              bg-[#d4ad54]
            "
          />

          <span
            className="
              text-[8px]
              text-[#a18b80]
            "
          >
            Press M to mute
          </span>

        </div>

      </div>


      {/* ===================================================
          REDUCED MOTION
      =================================================== */}

      <style>
        {`
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
};

export default Reels;