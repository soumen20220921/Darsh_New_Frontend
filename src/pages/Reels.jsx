import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
  Pause,
} from "lucide-react";
import { Link } from "react-router-dom";

/* ============================================================
   REELS DATA
   ============================================================ */

const reelsData = [
  {
    id: 1,
    video: "https://www.youtube.com/embed/ir9QHORiq7Q",
    title: "Mirror Modal Saree",
    subtitle:
      "Elegant mirror work on soft modal fabric for a graceful and stylish look.",
    shopLink: "/allproducts",
    thumbnail: "/IMG/reels2.png",
    price: "₹ 1,450",
    label: "Mirror Work",
  },
  {
    id: 2,
    video: "https://www.youtube.com/embed/l9uewPMPJj8",
    title: "Dolabari Replica Saree",
    subtitle:
      "Traditional elegance with a premium look at an affordable price.",
    shopLink: "/allproducts",
    thumbnail: "/IMG/reels1.png",
    price: "₹ 1,780",
    label: "Traditional Edit",
  },
  {
    id: 3,
    video: "https://www.youtube.com/embed/gR6Ipl1pKig",
    title: "Handloom Cotton Saree",
    subtitle:
      "Soft, breathable & beautifully handwoven for everyday comfort and elegance.",
    shopLink: "/allproducts",
    thumbnail: "/IMG/reels3.png",
    price: "₹ 1,280",
    label: "Handloom",
  },
];

/* ============================================================
   SMALL HELPERS
   ============================================================ */

const getYoutubeEmbedUrl = ({ video, muted, playing }) => {
  const separator = video.includes("?") ? "&" : "?";

  return `${video}${separator}autoplay=${playing ? 1 : 0}&mute=${muted ? 0 :1}&controls=0&modestbranding=1&rel=0&playsinline=1&iv_load_policy=3&enablejsapi=1`;
};

const clampIndex = (index, length) => {
  if (!length) return 0;
  return (index + length) % length;
};

/* ============================================================
   REELS COMPONENT
   ============================================================ */

const Reels = () => {
  const [currentReel, setCurrentReel] = useState(0);
  const [muted, setMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  const [direction, setDirection] = useState(1);

  const sectionRef = useRef(null);
  const reelRef = useRef(null);
  const containerRef = useRef(null);
  const touchStartX = useRef(null);
  const wheelLock = useRef(false);

  const current = reelsData[currentReel];

  const previousIndex = useMemo(
    () => clampIndex(currentReel - 1, reelsData.length),
    [currentReel]
  );

  const nextIndex = useMemo(
    () => clampIndex(currentReel + 1, reelsData.length),
    [currentReel]
  );

  const previousReel = reelsData[previousIndex];
  const nextReel = reelsData[nextIndex];

  /* ==========================================================
     NAVIGATION
     ========================================================== */

  const goToReel = useCallback((index, navDirection = 1) => {
    setDirection(navDirection);
    setCurrentReel(clampIndex(index, reelsData.length));
    setIsPlaying(false);
  }, []);

  const handleNextReel = useCallback(() => {
    goToReel(currentReel + 1, 1);
  }, [currentReel, goToReel]);

  const handlePrevReel = useCallback(() => {
    goToReel(currentReel - 1, -1);
  }, [currentReel, goToReel]);

  /* ==========================================================
     MUTE / PLAY
     ========================================================== */

  const toggleMute = useCallback(() => {
    setMuted((prev) => !prev);
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  /* ==========================================================
     FULLSCREEN
     ========================================================== */

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await containerRef.current?.requestFullscreen?.();
      } else {
        await document.exitFullscreen?.();
      }
    } catch (error) {
      console.error("Fullscreen error:", error);
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  /* ==========================================================
     AUTO PLAY WHEN THE SECTION IS IN VIEW
     ========================================================== */

  useEffect(() => {
    if (!sectionRef.current) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.45) {
          setIsPlaying(true);
        } else {
          setIsPlaying(false);
        }
      },
      {
        threshold: [0, 0.25, 0.45, 0.7, 1],
      }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, [currentReel]);

  /* ==========================================================
     KEYBOARD NAVIGATION
     ========================================================== */

  useEffect(() => {
    const handleKeyDown = (event) => {
      const tag = event.target?.tagName;

      if (["INPUT", "TEXTAREA", "SELECT"].includes(tag)) return;

      if (event.key === "ArrowRight") handleNextReel();
      if (event.key === "ArrowLeft") handlePrevReel();
      if (event.key.toLowerCase() === "m") toggleMute();
      if (event.key === " ") {
        event.preventDefault();
        togglePlay();
      }

      if (event.key === "Escape" && document.fullscreenElement) {
        document.exitFullscreen();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNextReel, handlePrevReel, toggleMute, togglePlay]);

  /* ==========================================================
     TOUCH SWIPE
     ========================================================== */

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches?.[0]?.clientX ?? null;
    setIsTouching(true);
  };

  const handleTouchEnd = (event) => {
    const startX = touchStartX.current;
    const endX = event.changedTouches?.[0]?.clientX;

    setIsTouching(false);
    touchStartX.current = null;

    if (startX == null || endX == null) return;

    const distance = endX - startX;
    if (Math.abs(distance) < 45) return;

    if (distance < 0) handleNextReel();
    else handlePrevReel();
  };

  /* ==========================================================
     MOUSE WHEEL / TRACKPAD NAVIGATION
     ========================================================== */

  const handleWheel = (event) => {
    if (window.innerWidth < 1024) return;
    if (Math.abs(event.deltaX) < Math.abs(event.deltaY)) return;
    if (Math.abs(event.deltaX) < 35 || wheelLock.current) return;

    wheelLock.current = true;
    if (event.deltaX > 0) handleNextReel();
    else handlePrevReel();

    window.setTimeout(() => {
      wheelLock.current = false;
    }, 550);
  };

  const videoUrl = getYoutubeEmbedUrl({
    video: current.video,
    muted,
    playing: isPlaying,
  });

  return (
    <section
      ref={sectionRef}
      className="
        relative overflow-hidden
        border-t border-[#741522]/10
        bg-[#faf8f3]
        px-4 py-14 text-[#3f1616]
        sm:px-6 sm:py-18
        lg:px-8 lg:py-24
      "
    >
      {/* ========================================================
          BACKGROUND DECORATION
          ======================================================== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full border border-[#d4ad54]/10" />
        <div className="absolute -left-52 top-1/3 h-[500px] w-[500px] rounded-full border border-[#741522]/5" />
        <div className="absolute -right-52 bottom-0 h-[520px] w-[520px] rounded-full border border-[#d4ad54]/10" />
        <div className="absolute left-1/2 top-20 h-40 w-40 -translate-x-1/2 rounded-full bg-[#d4ad54]/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1240px]">
        {/* ======================================================
            HEADER
            ====================================================== */}
        <div className="mb-9 flex flex-col items-center text-center sm:mb-12">
          <div className="mb-3 flex items-center gap-3">
            <span className="h-px w-7 bg-[#d4ad54] sm:w-10" />
            <span className="text-[7px] font-medium uppercase tracking-[0.35em] text-[#977e73] sm:text-[8px]">
              THE DARSH REELS
            </span>
            <span className="h-px w-7 bg-[#d4ad54] sm:w-10" />
          </div>

          <h2 className="font-serif text-[30px] font-normal leading-none tracking-[-0.025em] text-[#3f1616] sm:text-[42px] lg:text-[48px]">
            Watch it. <span className="italic text-[#741522]">Love it.</span> Own it.
          </h2>

          <p className="mt-4 max-w-[520px] text-[10px] leading-5 text-[#806c63] sm:text-[11px] sm:leading-6">
            Discover the drape, texture and details before you choose your next Darsh saree.
          </p>
        </div>

        {/* ======================================================
            REEL STAGE
            ====================================================== */}
        <div
          onWheel={handleWheel}
          className="relative mx-auto flex min-h-[570px] items-center justify-center sm:min-h-[690px] lg:min-h-[760px]"
        >
          {/* LEFT PREVIEW */}
          <button
            type="button"
            onClick={handlePrevReel}
            aria-label={`Previous reel: ${previousReel.title}`}
            className="
              group absolute left-0 z-10 hidden
              h-[360px] w-[220px]
              overflow-hidden rounded-sm
              border border-black/10 bg-black
              shadow-[0_18px_45px_rgba(50,20,20,0.13)]
              transition-all duration-500
              hover:-translate-x-2 hover:scale-[1.015]
              xl:block xl:w-[250px] xl:h-[405px]
            "
          >
            <img
              src={previousReel.thumbnail}
              alt={previousReel.title}
              className="h-full w-full object-cover opacity-55 blur-[1px] grayscale-[15%] transition-all duration-700 group-hover:scale-105 group-hover:opacity-75 group-hover:blur-0"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-black/35 to-black/70" />
            <div className="absolute bottom-0 left-0 right-0 p-5 text-left">
              <p className="text-[7px] uppercase tracking-[0.25em] text-white/60">
                REEL {String(previousIndex + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 font-serif text-[18px] leading-tight text-white">
                {previousReel.title}
              </h3>
              <p className="mt-1 text-[9px] text-white/65">{previousReel.price}</p>
            </div>
          </button>

          {/* RIGHT PREVIEW */}
          <button
            type="button"
            onClick={handleNextReel}
            aria-label={`Next reel: ${nextReel.title}`}
            className="
              group absolute right-0 z-10 hidden
              h-[360px] w-[220px]
              overflow-hidden rounded-sm
              border border-black/10 bg-black
              shadow-[0_18px_45px_rgba(50,20,20,0.13)]
              transition-all duration-500
              hover:translate-x-2 hover:scale-[1.015]
              xl:block xl:w-[250px] xl:h-[405px]
            "
          >
            <img
              src={nextReel.thumbnail}
              alt={nextReel.title}
              className="h-full w-full object-cover opacity-55 blur-[1px] grayscale-[15%] transition-all duration-700 group-hover:scale-105 group-hover:opacity-75 group-hover:blur-0"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-black/25 via-black/35 to-black/70" />
            <div className="absolute bottom-0 left-0 right-0 p-5 text-left">
              <p className="text-[7px] uppercase tracking-[0.25em] text-white/60">
                REEL {String(nextIndex + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 font-serif text-[18px] leading-tight text-white">
                {nextReel.title}
              </h3>
              <p className="mt-1 text-[9px] text-white/65">{nextReel.price}</p>
            </div>
          </button>

          {/* OUTER ARROWS */}
          <button
            type="button"
            onClick={handlePrevReel}
            aria-label="Previous reel"
            className="
              absolute left-0 top-1/2 z-30
              flex h-10 w-10 -translate-y-1/2 items-center justify-center
              rounded-full border border-[#3f1616]/30 bg-white/90 text-[#3f1616]
              shadow-sm backdrop-blur
              transition-all duration-300 hover:-translate-x-1 hover:bg-[#741522] hover:text-white
              sm:h-11 sm:w-11
              xl:left-[17%]
            "
          >
            <ChevronLeft size={18} strokeWidth={1.5} />
          </button>

          <button
            type="button"
            onClick={handleNextReel}
            aria-label="Next reel"
            className="
              absolute right-0 top-1/2 z-30
              flex h-10 w-10 -translate-y-1/2 items-center justify-center
              rounded-full border border-[#3f1616]/30 bg-white/90 text-[#3f1616]
              shadow-sm backdrop-blur
              transition-all duration-300 hover:translate-x-1 hover:bg-[#741522] hover:text-white
              sm:h-11 sm:w-11
              xl:right-[17%]
            "
          >
            <ChevronRight size={18} strokeWidth={1.5} />
          </button>

          {/* ====================================================
              CENTER PORTRAIT PLAYER
              ==================================================== */}
          <div
            ref={containerRef}
            className={`
              group/player relative z-20
              h-[570px] w-[calc(100vw-88px)] max-w-[350px]
              overflow-hidden rounded-[2px]
              bg-black
              shadow-[0_25px_80px_rgba(49,16,20,0.25)]
              ring-1 ring-black/10
              transition-transform duration-500
              sm:h-[650px] sm:w-[365px]
              lg:h-[710px] lg:w-[400px]
              xl:h-[730px] xl:w-[410px]
              ${isTouching ? "scale-[0.985]" : ""}
            `}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* slim luxury frame */}
            <div className="pointer-events-none absolute inset-2 z-30 border border-white/15 sm:inset-3" />

            {/* video */}
            <div
              ref={reelRef}
              className="absolute inset-0 flex items-center justify-center bg-black"
            >
              <iframe
                key={`${current.id}-${muted}-${isPlaying}`}
                src={videoUrl}
                title={current.title}
                className="h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
              />
            </div>

            {/* top gradient */}
            <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-32 bg-gradient-to-b from-black/65 to-transparent" />

            {/* top brand */}
            <div className="absolute left-6 top-5 z-40 flex items-center gap-2 sm:left-7 sm:top-6">
              <Sparkles size={12} strokeWidth={1.2} className="text-[#d4ad54]" />
              <span className="text-[7px] uppercase tracking-[0.32em] text-white/90 sm:text-[8px]">
                DARSH
              </span>
            </div>

            {/* reel counter */}
            <div className="absolute right-6 top-5 z-40 rounded-full border border-white/20 bg-black/20 px-2.5 py-1 backdrop-blur-md sm:right-7 sm:top-6">
              <span className="text-[7px] tracking-[0.2em] text-white/80">
                {String(currentReel + 1).padStart(2, "0")} / {String(reelsData.length).padStart(2, "0")}
              </span>
            </div>

            {/* paused indicator */}
            {!isPlaying && (
              <button
                type="button"
                onClick={togglePlay}
                aria-label="Play reel"
                className="absolute left-1/2 top-1/2 z-40 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-black/30 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-[#741522]/75"
              >
                <Play size={20} fill="currentColor" strokeWidth={1} className="ml-0.5" />
              </button>
            )}

            {/* bottom info */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 bg-gradient-to-t from-black/90 via-black/55 to-transparent px-6 pb-6 pt-28 sm:px-7 sm:pb-7">
              <p className="text-[7px] uppercase tracking-[0.28em] text-[#e2c26b]">
                {current.label}
              </p>
              <h3 className="mt-2 font-serif text-[23px] leading-tight text-white sm:text-[27px]">
                {current.title}
              </h3>
              <p className="mt-2 max-w-[290px] text-[9px] leading-4 text-white/70 sm:text-[10px]">
                {current.subtitle}
              </p>

              <div className="mt-4 flex items-center gap-4">
                <span className="text-[12px] font-medium text-white">{current.price}</span>
                <span className="h-px w-7 bg-[#d4ad54]" />
                <span className="text-[7px] uppercase tracking-[0.22em] text-white/60">
                  WATCH THE WEAVE
                </span>
              </div>
            </div>

            {/* controls */}
            <div
              className={`
                absolute bottom-6 right-5 z-50 flex gap-1.5
                transition-all duration-300
                sm:bottom-7 sm:right-6
                ${isHovered ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}
              `}
            >
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause reel" : "Play reel"}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-black/35 text-white backdrop-blur-md transition-all hover:border-[#d4ad54] hover:bg-[#d4ad54] hover:text-[#3f1616]"
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} fill="currentColor" />}
              </button>

              <button
                type="button"
                onClick={toggleMute}
                aria-label={muted ? "Unmute reel" : "Mute reel"}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-black/35 text-white backdrop-blur-md transition-all hover:border-[#d4ad54] hover:bg-[#d4ad54] hover:text-[#3f1616]"
              >
                {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>

              <button
                type="button"
                onClick={toggleFullscreen}
                aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-black/35 text-white backdrop-blur-md transition-all hover:border-[#d4ad54] hover:bg-[#d4ad54] hover:text-[#3f1616]"
              >
                {isFullscreen ? <Minimize size={14} /> : <Maximize size={14} />}
              </button>
            </div>
          </div>
        </div>

        {/* ======================================================
            MOBILE / TABLET PRODUCT STRIP
            ====================================================== */}
        <div className="mt-7 grid grid-cols-3 gap-2 xl:hidden sm:mx-auto sm:max-w-[620px] sm:gap-3">
          {reelsData.map((reel, index) => {
            const active = index === currentReel;

            return (
              <button
                key={reel.id}
                type="button"
                onClick={() => goToReel(index, index > currentReel ? 1 : -1)}
                className={`group overflow-hidden rounded-sm border text-left transition-all duration-500 ${
                  active
                    ? "border-[#741522]/35 bg-[#eee5d6] shadow-sm"
                    : "border-black/10 bg-white hover:border-[#741522]/20"
                }`}
              >
                <div className="relative aspect-[9/12] overflow-hidden bg-[#e8dfd3]">
                  <img
                    src={reel.thumbnail}
                    alt={reel.title}
                    className={`h-full w-full object-cover transition duration-700 group-hover:scale-105 ${
                      active ? "scale-105" : "opacity-75"
                    }`}
                  />
                  <div className={`absolute inset-0 transition ${active ? "bg-[#741522]/15" : "bg-black/10"}`} />
                  <span className="absolute bottom-2 left-2 rounded-full bg-black/35 px-2 py-1 text-[6px] uppercase tracking-[0.18em] text-white backdrop-blur-sm">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="p-2.5 sm:p-3">
                  <p className="truncate font-serif text-[11px] text-[#3f1616] sm:text-[13px]">
                    {reel.title}
                  </p>
                  <span className="mt-1 block text-[7px] uppercase tracking-[0.14em] text-[#977e73]">
                    {reel.price}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* ======================================================
            SHOP CTA
            ====================================================== */}
        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:mt-11 sm:flex-row">
          <Link
            to={current.shopLink}
            className="group inline-flex items-center gap-3 border border-[#741522]/40 px-6 py-3 text-[8px] uppercase tracking-[0.25em] text-[#741522] transition-all duration-300 hover:bg-[#741522] hover:text-[#faf8f3]"
          >
            Shop this look
            <ArrowRight size={13} strokeWidth={1.2} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <div className="flex items-center gap-2 text-[7px] uppercase tracking-[0.2em] text-[#a18b80]">
            <span className="h-px w-5 bg-[#d4ad54]" />
            Swipe / use arrows to explore
            <span className="h-px w-5 bg-[#d4ad54]" />
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2">
          {reelsData.map((reel, index) => (
            <button
              key={reel.id}
              type="button"
              onClick={() => goToReel(index, index > currentReel ? 1 : -1)}
              aria-label={`Open ${reel.title}`}
              className={`h-px transition-all duration-500 ${
                index === currentReel ? "w-10 bg-[#741522]" : "w-4 bg-[#741522]/20 hover:bg-[#741522]/45"
              }`}
            />
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-3 text-center">
          <Sparkles size={10} className="text-[#d4ad54]" />
          <span className="text-[7px] uppercase tracking-[0.22em] text-[#977e73]">
            Sound on for the full experience · Press M to mute · Space to play/pause
          </span>
          <Sparkles size={10} className="text-[#d4ad54]" />
        </div>
      </div>

      <style>{`
        @keyframes reelsSoftFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Reels;