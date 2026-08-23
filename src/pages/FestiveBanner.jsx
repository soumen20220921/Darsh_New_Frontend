import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  Gift,
  CalendarDays,
  Clock3,
} from "lucide-react";
import { motion } from "framer-motion";

/* =========================================================
   FESTIVAL BANNER DATA
========================================================= */

const festivalBannerData = {
  active: true,

  festival: "Rakshabandhan",

  title: "Rakshabandhan Sale",

  subtitle:
    "Celebrate the beautiful bond of Rakhi with exclusive Darsh sarees.",

  discount: "60% OFF",

  image: "/IMG/festival.png",

  buttonText: "Shop 60% Sale",

  route: "/festival-sale",

  /* Raksha Bandhan 2026 */
  festivalDate: "Friday, August 28, 2026",

  /* Shubh Muhurat */
  muhurat: "5:57 AM – 9:48 AM IST",

  /* Sale countdown deadline */
  saleEndsAt: "2026-08-28T23:59:59+05:30",
};

/* =========================================================
   COUNTDOWN HELPER
========================================================= */

const getCountdown = (targetDate) => {
  const target = new Date(targetDate).getTime();
  const now = Date.now();

  const difference = target - now;

  if (!Number.isFinite(target) || difference <= 0) {
    return {
      expired: true,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  const totalSeconds = Math.floor(difference / 1000);

  return {
    expired: false,

    days: Math.floor(
      totalSeconds / (60 * 60 * 24)
    ),

    hours: Math.floor(
      (totalSeconds % (60 * 60 * 24)) /
        (60 * 60)
    ),

    minutes: Math.floor(
      (totalSeconds % (60 * 60)) / 60
    ),

    seconds: totalSeconds % 60,
  };
};

/* =========================================================
   COUNTDOWN ITEM
========================================================= */

const CountdownItem = ({ value, label }) => {
  return (
    <div className="flex items-center gap-1">
      <div
        className="
          flex
          min-w-[34px]
          flex-col
          items-center
          justify-center
          rounded-md
          border
          border-[#e7c979]/40
          bg-black/15
          px-1.5
          py-1
          backdrop-blur-sm
          sm:min-w-[42px]
          sm:px-2
          sm:py-1.5
        "
      >
        <span
          className="
            font-serif
            text-[14px]
            font-bold
            leading-none
            text-[#fff8ed]
            sm:text-[17px]
          "
        >
          {String(value).padStart(2, "0")}
        </span>

        <span
          className="
            mt-1
            text-[4px]
            font-semibold
            uppercase
            tracking-[0.12em]
            text-[#e5cfb0]
            sm:text-[5px]
          "
        >
          {label}
        </span>
      </div>
    </div>
  );
};

/* =========================================================
   FESTIVE BANNER
========================================================= */

const FestiveBanner = ({
  data = festivalBannerData,
}) => {
  const [countdown, setCountdown] = React.useState(
    () =>
      getCountdown(
        data?.saleEndsAt ||
          festivalBannerData.saleEndsAt
      )
  );

  /* -------------------------------------------------------
     Live countdown
  ------------------------------------------------------- */

  React.useEffect(() => {
    const target =
      data?.saleEndsAt ||
      festivalBannerData.saleEndsAt;

    setCountdown(getCountdown(target));

    const timer = window.setInterval(() => {
      setCountdown(getCountdown(target));
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [data?.saleEndsAt]);

  /* -------------------------------------------------------
     Safety check
  ------------------------------------------------------- */

  if (
    !data ||
    data.active === false ||
    !data.image ||
    !data.discount
  ) {
    return null;
  }

  const festival =
    data.festival ||
    "Rakshabandhan";

  const festivalDate =
    data.festivalDate ||
    "Friday, August 28, 2026";

  const muhurat =
    data.muhurat ||
    "5:57 AM – 9:48 AM IST";

  return (
    <section
      className="
        relative
        overflow-hidden
        border-b
        border-[#741522]/10
        bg-[#f8f4eb]
        px-3
        py-3
        sm:px-5
        sm:py-5
      "
    >
      <div className="mx-auto w-full max-w-[1400px]">
        <Link
          to={data.route || "/festival-sale"}
          onClick={() => {
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth",
            });
          }}
          className="
            group
            relative
            block
            overflow-hidden
            rounded-[14px]
            border
            border-[#741522]/15
            bg-[#3f1616]
            shadow-[0_14px_45px_rgba(63,22,22,.14)]
          "
        >
          {/* =================================================
              DECORATIVE GLOW
          ================================================= */}

          <div
            className="
              pointer-events-none
              absolute
              -left-20
              -top-20
              h-48
              w-48
              rounded-full
              bg-[#e7c979]/20
              blur-3xl
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              -bottom-24
              -right-20
              h-56
              w-56
              rounded-full
              bg-[#b53b46]/25
              blur-3xl
            "
          />

          {/* =================================================
              ANIMATED SHIMMER
          ================================================= */}

          <motion.div
            initial={{ x: "-120%" }}
            animate={{ x: "120%" }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeInOut",
            }}
            className="
              pointer-events-none
              absolute
              inset-y-0
              z-30
              w-[20%]
              skew-x-[-20deg]
              bg-gradient-to-r
              from-transparent
              via-white/10
              to-transparent
            "
          />

          {/* =================================================
              MAIN GRID
          ================================================= */}

          <div
            className="
              relative
              grid
              min-h-[245px]
              grid-cols-2
              sm:min-h-[265px]
              lg:min-h-[300px]
              lg:grid-cols-[1.05fr_.95fr]
            "
          >
            {/* =================================================
                LEFT CONTENT
            ================================================= */}

            <div
              className="
                relative
                z-20
                flex
                flex-col
                justify-center
                px-5
                py-7
                sm:px-8
                sm:py-9
                lg:px-12
                lg:py-10
              "
            >
              {/* Festival label */}

              <div className="mb-2 flex items-center gap-2">
                <motion.span
                  animate={{
                    rotate: [0, 8, -8, 0],
                    scale: [1, 1.08, 1],
                  }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                  }}
                >
                  <Gift
                    size={14}
                    className="text-[#e7c979]"
                  />
                </motion.span>

                <span
                  className="
                    text-[7px]
                    font-medium
                    uppercase
                    tracking-[0.32em]
                    text-[#e5cfb0]
                    sm:text-[8px]
                  "
                >
                  {festival} Special
                </span>
              </div>

              {/* Title */}

              <h2
                className="
                  max-w-[620px]
                  font-serif
                  text-[29px]
                  leading-[0.95]
                  text-[#fff8ed]
                  sm:text-[38px]
                  lg:text-[46px]
                  xl:text-[52px]
                "
              >
                {data.title}
              </h2>

              {/* Subtitle */}

              <p
                className="
                  mt-2
                  max-w-[500px]
                  text-[8px]
                  leading-4
                  text-[#dfcfc0]
                  sm:text-[10px]
                  sm:leading-5
                "
              >
                {data.subtitle}
              </p>

              {/* =================================================
                  COUNTDOWN
              ================================================= */}

              <div className="mt-4 sm:mt-5">
                <p
                  className="
                    mb-1.5
                    text-[5px]
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                    text-[#e5cfb0]
                    sm:text-[6px]
                  "
                >
                  Sale Ends In
                </p>

                {countdown.expired ? (
                  <div
                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-full
                      bg-[#e7c979]
                      px-4
                      py-2
                      text-[7px]
                      font-bold
                      uppercase
                      tracking-[0.12em]
                      text-[#3f1616]
                    "
                  >
                    <Sparkles size={11} />
                    Festival Sale Ended
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <CountdownItem
                      value={countdown.days}
                      label="Days"
                    />

                    <span className="mb-3 text-[#e7c979]">
                      :
                    </span>

                    <CountdownItem
                      value={countdown.hours}
                      label="Hours"
                    />

                    <span className="mb-3 text-[#e7c979]">
                      :
                    </span>

                    <CountdownItem
                      value={countdown.minutes}
                      label="Min"
                    />

                    <span className="mb-3 text-[#e7c979]">
                      :
                    </span>

                    <CountdownItem
                      value={countdown.seconds}
                      label="Sec"
                    />
                  </div>
                )}
              </div>

              {/* =================================================
                  OFFER + CTA
              ================================================= */}

              <div
                className="
                  mt-4
                  flex
                  flex-wrap
                  items-center
                  gap-3
                  sm:mt-5
                "
              >
                <motion.span
                  animate={{
                    scale: [1, 1.04, 1],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                  }}
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    bg-[#e7c979]
                    px-4
                    py-2
                    text-[8px]
                    font-bold
                    tracking-[0.16em]
                    text-[#3f1616]
                    sm:px-5
                    sm:py-2.5
                    sm:text-[9px]
                  "
                >
                  <Sparkles size={11} />
                  {data.discount}
                </motion.span>

                <span
                  className="
                    inline-flex
                    items-center
                    gap-2
                    text-[7px]
                    uppercase
                    tracking-[0.22em]
                    text-[#f5e6d2]
                    sm:text-[8px]
                  "
                >
                  {data.buttonText || "Shop now"}

                  <ArrowRight
                    size={13}
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  />
                </span>
              </div>
            </div>

            {/* =================================================
                RIGHT IMAGE
            ================================================= */}

            <div
              className="
                relative
                min-h-[145px]
                overflow-hidden
                sm:min-h-[175px]
                lg:min-h-0
              "
            >
              <img
                src={data.image}
                alt={`${festival} sale at Darsh`}
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  object-cover
                  object-center
                  transition-transform
                  duration-[1400ms]
                  ease-out
                  group-hover:scale-[1.035]
                "
                onError={(event) => {
                  event.currentTarget.style.display =
                    "none";
                }}
              />

              {/* Image overlay */}

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-[#3f1616]/55
                  via-transparent
                  to-transparent
                  lg:bg-gradient-to-r
                  lg:from-[#3f1616]
                  lg:via-[#3f1616]/15
                  lg:to-transparent
                "
              />

              {/* Image side label */}

              <div
                className="
                  absolute
                  bottom-4
                  right-4
                  rounded-lg
                  border
                  border-white/20
                  bg-black/20
                  px-3
                  py-2
                  text-right
                  backdrop-blur-md
                  sm:bottom-5
                  sm:right-5
                "
              >
                <p
                  className="
                    text-[5px]
                    uppercase
                    tracking-[0.18em]
                    text-[#e7c979]
                  "
                >
                  Limited Festival Edit
                </p>

                <p
                  className="
                    mt-0.5
                    text-[7px]
                    font-semibold
                    text-white
                  "
                >
                  Darsh Handlooms
                </p>
              </div>
            </div>
          </div>

          {/* =================================================
              BOTTOM INFORMATION BAR
          ================================================= */}

          <div
            className="
              relative
              z-30
              flex
              flex-wrap
              items-center
              justify-center
              gap-x-4
              gap-y-1
              border-t
              border-[#e7c979]/20
              bg-black/10
              px-4
              py-2
              text-center
              sm:justify-between
              sm:px-6
            "
          >
            <span
              className="
                text-[5px]
                uppercase
                tracking-[0.16em]
                text-[#e5cfb0]
                sm:text-[6px]
              "
            >
              Raksha Bandhan • August 28, 2026
            </span>

            <span
              className="
                text-[5px]
                uppercase
                tracking-[0.16em]
                text-[#e5cfb0]
                sm:text-[6px]
              "
            >
              Shubh Muhurat: 5:57 AM – 9:48 AM IST
            </span>

            <span
              className="
                text-[5px]
                font-semibold
                uppercase
                tracking-[0.16em]
                text-[#e7c979]
                sm:text-[6px]
              "
            >
              60% OFF & Above
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default FestiveBanner;