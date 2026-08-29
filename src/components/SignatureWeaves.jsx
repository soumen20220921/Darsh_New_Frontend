import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

/* ==========================================================
   CATEGORY DATA
========================================================== */

const weaveCategories = [
  {
    id: 1,
    name: "Pujo Special",
    displayName: "Divine Durga Puja",
    subtitle: "Puja Special Collection",
    description: "Festive sarees crafted for your Puja moments",
    slug: "Pujo Special",
    path: "/Categories/Pujo Special",
    image: "/IMG/ddp5.jpg",
  },
  {
    id: 2,
    name: "Designer Saree",
    displayName: "Designer Saree",
    subtitle: "Awesome Designer",
    description: "Luxurious drapes woven for timeless occasions",
    slug: "Designer Saree",
    image: "/IMG/ddp6.jpg",
  },
  {
    id: 3,
    name: "Handstitch",
    displayName: "Artful Handstitch",
    subtitle: "Handstitch Sarees",
    description: "Intricate handcrafted stitches with Bengali charm",
    slug: "Handstitch",
    image: "/IMG/ddp7.jpg",
  },
  {
    id: 4,
    name: "Bengal Tussar",
    displayName: "Royal Bengal Tussar",
    subtitle: "Bengal Tussar",
    description: "Rich silk heritage woven in vibrant colours",
    slug: "Royal Bengal Tussar",
    image: "/IMG/ddp1.jpg",
  },
  {
    id: 5,
    name: "Tussar kantha Collection",
    displayName: "Pure Tussar kantha",
    subtitle: "Tussar kantha Collection",
    description: "Pure traditional elegance for your special day",
    slug: "Tussar kantha",
    image: "/IMG/ddp3.jpg",
  },
];

/* ==========================================================
   TEXTILE ORNAMENT
   ========================================================== */

const OrnamentPattern = ({ bottom = false }) => {
  const groups = Array.from({ length: 2 });

  return (
    <div
      className={`signature-ornament-track ${
        bottom ? "signature-ornament-track-bottom" : ""
      }`}
    >
      {groups.map((_, groupIndex) => (
        <div
          className="signature-ornament-group"
          key={groupIndex}
          aria-hidden="true"
        >
          {Array.from({ length: 20 }).map((_, index) => (
            <span className="ornament-motif" key={index}>
              <i className="ornament-diamond" />
              <b className="ornament-leaf ornament-leaf-left" />
              <b className="ornament-leaf ornament-leaf-right" />
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

/* ==========================================================
   CARD ANIMATION
========================================================== */

const cardVariants = {
  hidden: (index) => ({
    opacity: 0,
    y: 35,
    scale: 0.94,
    x: index % 2 === 0 ? -18 : 18,
  }),

  visible: (index) => ({
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      delay: index * 0.08,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const titleVariants = {
  hidden: {
    opacity: 0,
    x: -35,
  },

  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* ==========================================================
   MAIN COMPONENT
========================================================== */

function SignatureWeaves() {
  return (
    <section
      className="signature-weaves-section"
      aria-labelledby="signature-weaves-title"
    >
      {/* ======================================================
          TOP TEXTILE ORNAMENT
          LEFT → RIGHT INFINITE
      ====================================================== */}

      <div
        className="signature-ornament signature-ornament-top"
        aria-hidden="true"
      >
        <div className="signature-ornament-mask">
          <OrnamentPattern />
        </div>
      </div>

      {/* ======================================================
          BACKGROUND EFFECTS
      ====================================================== */}

      <div
        className="signature-glow signature-glow-left"
        aria-hidden="true"
      />

      <div
        className="signature-glow signature-glow-right"
        aria-hidden="true"
      />

      <div
        className="signature-background-pattern"
        aria-hidden="true"
      />

      {/* ======================================================
          MAIN CONTAINER
      ====================================================== */}

      <div className="signature-container">
        {/* ====================================================
            HEADING
        ==================================================== */}

        <motion.div
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.25,
          }}
          className="signature-heading"
        >
          <div className="heading-wrapper">
            <div className="heading-left">
              <span className="heading-kicker">
                DARSH COLLECTIONS
              </span>

              <h2 id="signature-weaves-title">
                Curated Collection
              </h2>

              <div className="heading-line">
                <span />
              </div>
            </div>

            <div className="heading-side-text">
              <span>Handpicked Weaves</span>
              <span>Timelessly Styled</span>
            </div>
          </div>
        </motion.div>

        {/* ====================================================
            CATEGORY AREA
        ==================================================== */}

        <div className="signature-scroll-area">
          <div className="signature-grid">
            {weaveCategories.map((item, index) => (
              <motion.div
                key={item.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                className="signature-item"
              >
                <Link
                  to={`/Categories/${item.slug}`}
                  onClick={() => window.scrollTo(0, 0)}
                  aria-label={`Explore ${item.subtitle}`}
                  className="signature-link"
                >
                  {/* ==================================================
                      CARD
                  ================================================== */}

                  <div className="signature-card-wrapper">
                    <div className="signature-card-outer">
                      <div className="signature-card-inner">
                        {/* IMAGE */}

                        <img
                          src={item.image}
                          alt={item.subtitle}
                          loading="lazy"
                          draggable="false"
                          className="signature-image"
                          onError={(event) => {
                            event.currentTarget.style.opacity = "0";
                          }}
                        />

                        {/* OVERLAY */}

                        <div className="signature-image-overlay" />

                        {/* INNER FRAME */}

                        <div className="signature-inner-border" />



                        {/* CARD CONTENT */}

                        <div className=" signature-card-content">
                          <h3>{item.displayName}</h3>

                          <div className="card-leaf-divider">
                            <span className="leaf left" />
                            <span className="divider-line" />
                            <span className="leaf right" />
                          </div>
                        </div>

                        {/* SHINE */}

                        <div className="signature-shine" />

                        {/* GLOW */}

                        <div className="signature-card-glow" />
                      </div>
                    </div>
                  </div>

                  {/* ==================================================
                      TEXT
                  ================================================== */}

                  <div className="signature-text">
                    <h4>{item.subtitle}</h4>

                    <p>{item.description}</p>
                  </div>

                  {/* ACTIVE LINE */}

                  <div className="signature-bottom-line">
                    <span />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ====================================================
            MOBILE SWIPE
        ==================================================== */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.5,
            duration: 0.5,
          }}
          className="mobile-swipe"
        >
          <span className="swipe-line" />
          <span>Swipe to Explore</span>
          <span className="swipe-line" />
        </motion.div>

        {/* ====================================================
            BOTTOM DIVIDER
        ==================================================== */}

        <div className="signature-bottom-decoration">
          <div className="bottom-line" />

          <div className="bottom-diamonds">
            <span />
            <i />
            <b />
            <i />
            <span />
          </div>
        </div>
      </div>

      {/* ======================================================
          BOTTOM TEXTILE ORNAMENT
          LEFT → RIGHT INFINITE
      ====================================================== */}

      <div
        className="signature-ornament signature-ornament-bottom"
        aria-hidden="true"
      >
        <div className="signature-ornament-mask">
          <OrnamentPattern bottom />
        </div>
      </div>

      {/* ======================================================
          COMPLETE STYLES
      ====================================================== */}

      <style>{`

        /* =====================================================
           ROOT
        ===================================================== */

        .signature-weaves-section {
          --cream: #f8f0e7;
          --cream-light: #fffaf5;

          --brown: #5a2d20;
          --brown-dark: #3d1e17;
          --brown-soft: #805745;

          --gold: #b58a64;
          --gold-light: #d4b08c;
          --gold-pale: #ead5bc;

          position: relative;
          width: 100%;
          max-width: 100%;
          overflow: hidden;
          isolation: isolate;

          background:
            radial-gradient(
              circle at 10% 20%,
              rgba(181,138,100,.12),
              transparent 28%
            ),
            radial-gradient(
              circle at 90% 75%,
              rgba(118,19,29,.045),
              transparent 30%
            ),
            linear-gradient(
              180deg,
              var(--cream-light),
              var(--cream)
            );

          color: var(--brown);
        }


        /* =====================================================
           ORNAMENT BAR
        ===================================================== */

        .signature-ornament {
          position: relative;
          width: 100%;
          height: 19px;
          overflow: hidden;

          background:
            linear-gradient(
              180deg,
              rgba(181,138,100,.14),
              rgba(181,138,100,.035)
            );

          border-top: 1px solid rgba(181,138,100,.38);
          border-bottom: 1px solid rgba(181,138,100,.38);

          z-index: 5;
        }

        .signature-ornament-mask {
          position: absolute;
          inset: 0;
          overflow: hidden;
          width: 100%;
          height: 100%;
        }


        /* =====================================================
           INFINITE TEXTILE TRACK
        ===================================================== */

        .signature-ornament-track {
          display: flex;
          width: max-content;
          height: 100%;

          animation:
            signatureOrnamentMove
            22s
            linear
            infinite;

          will-change: transform;
          transform: translate3d(-50%, 0, 0);
        }

        .signature-ornament-track-bottom {
          animation-duration: 29s;
        }

        @keyframes signatureOrnamentMove {
          0% {
            transform: translate3d(-50%, 0, 0);
          }

          100% {
            transform: translate3d(0, 0, 0);
          }
        }


        /* =====================================================
           ORNAMENT GROUP
        ===================================================== */

        .signature-ornament-group {
          display: flex;
          align-items: center;
          height: 100%;
          flex-shrink: 0;
        }


        /* =====================================================
           MOTIF
        ===================================================== */

        .ornament-motif {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;

          width: 54px;
          min-width: 54px;
          height: 100%;

          opacity: .78;
        }


        .ornament-motif::before,
        .ornament-motif::after {
          content: "";
          position: absolute;
          top: 50%;

          width: 15px;
          height: 1px;

          background:
            rgba(158,112,82,.45);
        }

        .ornament-motif::before {
          right: 4px;
        }

        .ornament-motif::after {
          left: 4px;
        }


        /* =====================================================
           DIAMOND
        ===================================================== */

        .ornament-diamond {
          position: absolute;

          width: 5px;
          height: 5px;

          background:
            linear-gradient(
              135deg,
              #e0bd96,
              #8c6248
            );

          transform: rotate(45deg);

          box-shadow:
            0 0 7px rgba(181,138,100,.28);
        }


        /* =====================================================
           LEAVES
        ===================================================== */

        .ornament-leaf {
          position: absolute;

          width: 13px;
          height: 5px;

          border: 1px solid rgba(145,101,72,.68);

          border-radius:
            100% 0 100% 0;

          background:
            rgba(255,255,255,.08);
        }

        .ornament-leaf-left {
          margin-right: 18px;
          transform: rotate(-24deg);
        }

        .ornament-leaf-right {
          margin-left: 18px;
          transform: rotate(156deg);
        }


        /* =====================================================
           ORNAMENT SHIMMER
        ===================================================== */

        .signature-ornament::after {
          content: "";

          position: absolute;
          top: 0;
          left: -30%;

          width: 18%;
          height: 100%;

          pointer-events: none;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(255,255,255,.34),
              transparent
            );

          transform: skewX(-18deg);

          animation:
            ornamentShimmer
            7s
            ease-in-out
            infinite;
        }

        @keyframes ornamentShimmer {
          0%,
          40% {
            left: -30%;
          }

          72%,
          100% {
            left: 125%;
          }
        }


        /* =====================================================
           PAUSE ON DESKTOP HOVER
        ===================================================== */

        @media (hover: hover) {
          .signature-weaves-section:hover
          .signature-ornament-track {
            animation-play-state: paused;
          }
        }


        /* =====================================================
           BACKGROUND GLOW
        ===================================================== */

        .signature-glow {
          position: absolute;
          pointer-events: none;
          border-radius: 999px;
          filter: blur(65px);
          z-index: -1;
        }

        .signature-glow-left {
          width: 260px;
          height: 260px;
          left: -150px;
          top: 120px;
          background: rgba(181,138,100,.10);
        }

        .signature-glow-right {
          width: 300px;
          height: 300px;
          right: -160px;
          bottom: 50px;
          background: rgba(118,19,29,.05);
        }


        /* =====================================================
           DOT PATTERN
        ===================================================== */

        .signature-background-pattern {
          position: absolute;
          inset: 0;

          pointer-events: none;

          opacity: .24;

          background-image:
            radial-gradient(
              rgba(111,62,45,.12) .7px,
              transparent .7px
            );

          background-size: 15px 15px;

          mask-image:
            linear-gradient(
              to bottom,
              transparent,
              black 15%,
              black 85%,
              transparent
            );

          z-index: -1;
        }


        /* =====================================================
           CONTAINER
        ===================================================== */

        .signature-container {
          position: relative;

          width: 100%;
          max-width: 1640px;

          margin: 0 auto;

          padding:
            38px
            58px
            34px;
        }


        /* =====================================================
           HEADING
        ===================================================== */

        .signature-heading {
          margin-bottom: 32px;
        }

        .heading-wrapper {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 30px;
        }

        .heading-left {
          min-width: 0;
        }

        .heading-kicker {
          display: block;

          margin-bottom: 6px;

          font-size: 8px;
          font-weight: 700;

          letter-spacing: .32em;
          text-transform: uppercase;

          color: #a27a59;
        }

        .heading-left h2 {
          margin: 0;

          color: var(--brown);

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size:
            clamp(
              30px,
              3vw,
              44px
            );

          font-weight: 400;
          line-height: 1;

          letter-spacing: -.025em;
        }

        .heading-line {
          position: relative;

          width: 330px;
          max-width: 100%;

          height: 2px;

          margin-top: 12px;

          overflow: hidden;

          background:
            rgba(90,45,32,.12);
        }

        .heading-line span {
          display: block;

          width: 100%;
          height: 100%;

          background: var(--brown);

          transform-origin: left;

          animation:
            headingLine
            1.2s
            ease
            forwards;
        }

        @keyframes headingLine {
          from {
            transform: scaleX(0);
          }

          to {
            transform: scaleX(1);
          }
        }

        .heading-side-text {
          display: flex;
          flex-direction: column;
          align-items: flex-end;

          padding-bottom: 3px;

          font-size: 8px;
          line-height: 1.7;

          letter-spacing: .14em;
          text-transform: uppercase;

          color: #80675c;

          text-align: right;
        }


        /* =====================================================
           GRID
        ===================================================== */

        .signature-scroll-area {
          width: 100%;
        }

        .signature-grid {
          display: grid;

          grid-template-columns:
            repeat(5, minmax(0, 1fr));

          gap: 20px;

          width: 100%;
        }

        .signature-item {
          min-width: 0;
        }

        .signature-link {
          display: block;

          width: 100%;

          color: inherit;
          text-decoration: none;

          outline: none;
        }


        /* =====================================================
           CARD
        ===================================================== */

        .signature-card-wrapper {
          position: relative;

          width: 100%;

          aspect-ratio: .88;
        }

        .signature-card-outer {
          position: absolute;
          inset: 0;

          padding: 3px;

          background:
            linear-gradient(
              145deg,
              #8e654b,
              #e0bd96 25%,
              #a97b59 50%,
              #d9b68d 76%,
              #82583f
            );

          border-radius:
            44% 44% 9% 9%
            /
            18% 18% 9% 9%;

          box-shadow:
            0 12px 26px rgba(76,40,31,.12);

          transition:
            transform .55s cubic-bezier(.22,1,.36,1),
            box-shadow .55s ease;
        }

        .signature-link:hover
        .signature-card-outer {
          transform: translateY(-8px);

          box-shadow:
            0 22px 45px rgba(76,40,31,.20);
        }

        .signature-card-inner {
          position: relative;

          width: 100%;
          height: 100%;

          overflow: hidden;

          background: #6c4435;

          border:
            1px solid
            rgba(255,255,255,.75);

          border-radius:
            43% 43% 8% 8%
            /
            17% 17% 8% 8%;
        }


        /* =====================================================
           IMAGE
        ===================================================== */

        .signature-image {
          position: absolute;
          inset: 0;

          width: 100%;
          height: 100%;

          object-fit: cover;

          filter:
            saturate(.84)
            contrast(.96)
            brightness(.91);

          transform: scale(1.01);

          transition:
            transform .9s cubic-bezier(.22,1,.36,1),
            filter .6s ease;
        }

        .signature-link:hover
        .signature-image {
          transform: scale(1.09);

          filter:
            saturate(1)
            contrast(1)
            brightness(.97);
        }


        /* =====================================================
           IMAGE OVERLAY
        ===================================================== */

        .signature-image-overlay {
          position: absolute;
          inset: 0;

          background:
            linear-gradient(
              to bottom,
              rgba(45,25,19,.02) 15%,
              rgba(45,25,19,.05) 42%,
              rgba(48,23,17,.28) 68%,
              rgba(48,23,17,.94) 100%
            );

          z-index: 2;
        }


        /* =====================================================
           INNER FRAME
        ===================================================== */

        .signature-inner-border {
          position: absolute;
          inset: 8px;

          z-index: 4;

          pointer-events: none;

          border:
            1px solid
            rgba(255,255,255,.78);

          border-radius:
            40% 40% 6% 6%
            /
            15% 15% 6% 6%;

          box-shadow:
            inset 0 0 0 1px
            rgba(181,138,100,.18);
        }


        /* =====================================================
           CORNERS
        ===================================================== */

        .corner-detail {
          position: absolute;

          z-index: 6;

          width: 18px;
          height: 18px;

          border-color:
            rgba(255,255,255,.8);

          border-style: solid;

          pointer-events: none;

          transition:
            width .45s ease,
            height .45s ease,
            border-color .45s ease;
        }

        .corner-tl {
          top: 5px;
          left: 5px;
          border-width: 1px 0 0 1px;
        }

        .corner-tr {
          top: 5px;
          right: 5px;
          border-width: 1px 1px 0 0;
        }

        .corner-bl {
          bottom: 5px;
          left: 5px;
          border-width: 0 0 1px 1px;
        }

        .corner-br {
          right: 5px;
          bottom: 5px;
          border-width: 0 1px 1px 0;
        }

        .signature-link:hover
        .corner-detail {
          width: 24px;
          height: 24px;

          border-color: #f2d8b5;
        }


        /* =====================================================
           NUMBER
        ===================================================== */

        .signature-number {
          position: absolute;

          top: 14px;
          left: 16px;

          z-index: 7;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 8px;
          letter-spacing: .2em;

          color:
            rgba(255,255,255,.92);
        }


        /* =====================================================
           CARD CONTENT
        ===================================================== */

        .signature-card-content {
          position: absolute;

          left: 15px;
          right: 15px;
          bottom: 17px;

          z-index: 7;

          text-align: center;
        }

        .signature-card-content h3 {
          margin: 0;

          color: #fff;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size:
            clamp(
              13px,
              1.2vw,
              18px
            );

          font-weight: 600;

          line-height: 1.2;

          letter-spacing: .02em;

          text-transform: uppercase;

          text-shadow:
            0 2px 8px rgba(0,0,0,.25);
        }


        /* =====================================================
           LEAF DIVIDER
        ===================================================== */

        .card-leaf-divider {
          display: flex;

          align-items: center;
          justify-content: center;

          gap: 4px;

          margin-top: 8px;
        }

        .divider-line {
          width: 32px;
          height: 1px;

          background:
            rgba(255,255,255,.85);

          transition:
            width .45s ease;
        }

        .signature-link:hover
        .divider-line {
          width: 48px;
        }

        .leaf {
          position: relative;

          width: 7px;
          height: 4px;

          border:
            1px solid
            rgba(255,255,255,.8);

          border-radius:
            100% 0 100% 0;
        }

        .leaf.left {
          transform: rotate(-25deg);
        }

        .leaf.right {
          transform: rotate(155deg);
        }


        /* =====================================================
           SHINE
        ===================================================== */

        .signature-shine {
          position: absolute;

          top: -20%;
          left: -80%;

          z-index: 5;

          width: 35%;
          height: 150%;

          pointer-events: none;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(255,255,255,.20),
              transparent
            );

          transform: rotate(18deg);

          transition:
            left .9s ease;
        }

        .signature-link:hover
        .signature-shine {
          left: 130%;
        }


        /* =====================================================
           CARD GLOW
        ===================================================== */

        .signature-card-glow {
          position: absolute;
          inset: 0;

          z-index: 3;

          pointer-events: none;

          opacity: 0;

          background:
            radial-gradient(
              circle at 50% 65%,
              rgba(255,220,180,.15),
              transparent 45%
            );

          transition:
            opacity .55s ease;
        }

        .signature-link:hover
        .signature-card-glow {
          opacity: 1;
        }


        /* =====================================================
           TEXT
        ===================================================== */

        .signature-text {
          padding:
            11px
            5px
            0;

          text-align: center;
        }

        .signature-text h4 {
          margin: 0;

          color: #63372b;

          font-family:
            Arial,
            Helvetica,
            sans-serif;

          font-size: 12px;

          font-weight: 600;

          line-height: 1.35;
        }

        .signature-text p {
          margin:
            4px
            auto
            0;

          max-width: 190px;

          color: #92796b;

          font-family:
            Arial,
            Helvetica,
            sans-serif;

          font-size: 8px;

          line-height: 1.5;

          white-space: nowrap;

          overflow: hidden;

          text-overflow: ellipsis;
        }


        /* =====================================================
           BOTTOM ACTIVE LINE
        ===================================================== */

        .signature-bottom-line {
          width: 100%;
          height: 2px;

          margin-top: 12px;

          overflow: hidden;

          background:
            rgba(90,45,32,.09);
        }

        .signature-bottom-line span {
          display: block;

          width: 0;
          height: 100%;

          margin: 0 auto;

          background: #6f3e2d;

          transition:
            width .55s cubic-bezier(.22,1,.36,1);
        }

        .signature-link:hover
        .signature-bottom-line span {
          width: 100%;
        }


        /* =====================================================
           MOBILE SWIPE
        ===================================================== */

        .mobile-swipe {
          display: none;

          align-items: center;
          justify-content: center;

          gap: 9px;

          margin-top: 22px;

          color: #a27a59;

          font-size: 7px;
          font-weight: 700;

          letter-spacing: .22em;
          text-transform: uppercase;
        }

        .swipe-line {
          width: 24px;
          height: 1px;

          background:
            rgba(181,138,100,.5);
        }


        /* =====================================================
           BOTTOM DECORATION
        ===================================================== */

        .signature-bottom-decoration {
          margin-top: 30px;
        }

        .bottom-line {
          position: relative;

          width: 100%;
          height: 1px;

          background:
            rgba(90,45,32,.22);
        }

        .bottom-line::after {
          content: "";

          position: absolute;

          left: 0;
          top: -1px;

          width: 23%;
          height: 3px;

          background: #6f3e2d;

          animation:
            bottomSweep
            2.2s
            cubic-bezier(.22,1,.36,1)
            infinite alternate;
        }

        @keyframes bottomSweep {
          from {
            left: 0;
          }

          to {
            left: 77%;
          }
        }

        .bottom-diamonds {
          display: flex;

          align-items: center;
          justify-content: center;

          gap: 9px;

          margin-top: 10px;
        }

        .bottom-diamonds span {
          width: 5px;
          height: 5px;

          background:
            rgba(181,138,100,.65);

          transform: rotate(45deg);
        }

        .bottom-diamonds i {
          display: block;

          width: 55px;
          height: 1px;

          background:
            rgba(181,138,100,.35);
        }

        .bottom-diamonds b {
          display: block;

          width: 8px;
          height: 8px;

          border:
            1px solid #b58a4b;

          transform: rotate(45deg);
        }


        /* =====================================================
           LARGE TABLET
        ===================================================== */

        @media (max-width: 1200px) {

          .signature-container {
            padding:
              32px
              30px
              30px;
          }

          .signature-grid {
            grid-template-columns:
              repeat(3, minmax(0, 1fr));

            gap: 20px;
          }

          .signature-card-content h3 {
            font-size: 17px;
          }
        }


        /* =====================================================
           TABLET
        ===================================================== */

        @media (max-width: 768px) {

          .signature-ornament {
            height: 15px;
          }

          .ornament-motif {
            width: 44px;
            min-width: 44px;
          }

          .signature-ornament-track {
            animation-duration: 18s;
          }

          .signature-ornament-track-bottom {
            animation-duration: 24s;
          }

          .signature-container {
            padding:
              28px
              20px
              28px;
          }

          .signature-heading {
            margin-bottom: 24px;
          }

          .heading-side-text {
            display: none;
          }

          .heading-left h2 {
            font-size: 32px;
          }

          .heading-line {
            width: 180px;
          }

          /* horizontal mobile/tablet carousel */

          .signature-scroll-area {
            overflow-x: auto;
            overflow-y: visible;

            margin-right: -20px;
            padding-right: 20px;
            padding-bottom: 8px;

            scrollbar-width: none;
            -ms-overflow-style: none;

            overscroll-behavior-x: contain;
            scroll-snap-type: x proximity;
          }

          .signature-scroll-area::-webkit-scrollbar {
            display: none;
          }

          .signature-grid {
            display: flex;
            width: max-content;

            gap: 15px;
          }

          .signature-item {
            width: 180px;
            min-width: 180px;

            scroll-snap-align: start;
          }

          .mobile-swipe {
            display: flex;
          }

          .signature-bottom-decoration {
            margin-top: 25px;
          }

          .bottom-diamonds i {
            width: 32px;
          }
        }


        /* =====================================================
           MOBILE
        ===================================================== */

        @media (max-width: 560px) {

          .signature-ornament {
            height: 12px;
          }

          .ornament-motif {
            width: 38px;
            min-width: 38px;
          }

          .ornament-diamond {
            width: 4px;
            height: 4px;
          }

          .ornament-leaf {
            width: 10px;
            height: 4px;
          }

          .signature-ornament-track {
            animation-duration: 15s;
          }

          .signature-ornament-track-bottom {
            animation-duration: 20s;
          }

          .signature-container {
            padding:
              25px
              14px
              24px;
          }

          .signature-heading {
            margin-bottom: 20px;
          }

          .heading-kicker {
            font-size: 7px;
            letter-spacing: .25em;
          }

          .heading-left h2 {
            font-size: 27px;
          }

          .heading-line {
            width: 150px;
            margin-top: 8px;
          }

          .signature-scroll-area {
            margin-right: -14px;
            padding-right: 14px;
          }

          .signature-grid {
            gap: 12px;
          }

          .signature-item {
            width: 145px;
            min-width: 145px;
          }

          .signature-card-wrapper {
            aspect-ratio: .86;
          }

          .signature-card-content {
            bottom: 14px;
          }

          .signature-card-content h3 {
            font-size: 13px;
          }

          .signature-text {
            padding-top: 8px;
          }

          .signature-text h4 {
            font-size: 10px;
          }

          .signature-text p {
            font-size: 7px;
          }

          .signature-bottom-line {
            margin-top: 9px;
          }

          .mobile-swipe {
            margin-top: 17px;
          }

          .signature-bottom-decoration {
            margin-top: 20px;
          }
        }


        /* =====================================================
           SMALL MOBILE
        ===================================================== */

        @media (max-width: 380px) {

          .signature-container {
            padding-left: 11px;
            padding-right: 11px;
          }

          .heading-left h2 {
            font-size: 24px;
          }

          .signature-scroll-area {
            margin-right: -11px;
            padding-right: 11px;
          }

          .signature-item {
            width: 136px;
            min-width: 136px;
          }

          .signature-grid {
            gap: 10px;
          }

          .signature-card-content h3 {
            font-size: 12px;
          }
        }


        /* =====================================================
           TOUCH DEVICES
        ===================================================== */

        @media (hover: none) {

          .signature-card-outer {
            transition:
              transform .35s ease;
          }

          .signature-link:active
          .signature-card-outer {
            transform: scale(.97);
          }

          .signature-link:active
          .signature-image {
            transform: scale(1.04);
          }
        }


        /* =====================================================
           ACCESSIBILITY
        ===================================================== */

        .signature-link:focus-visible {
          outline:
            2px solid #b58a4b;

          outline-offset: 4px;

          border-radius: 5px;
        }


        /* =====================================================
           REDUCED MOTION
        ===================================================== */

        @media (prefers-reduced-motion: reduce) {

          .signature-weaves-section *,
          .signature-weaves-section *::before,
          .signature-weaves-section *::after {

            animation: none !important;

            transition: none !important;
          }

          .signature-scroll-area {
            scroll-behavior: auto !important;
          }
        }

      `}</style>
    </section>
  );
}

export default SignatureWeaves;