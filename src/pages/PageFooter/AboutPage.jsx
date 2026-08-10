import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowDown,
  Sparkles,
  Heart,
  Hand,
} from "lucide-react";
import { Link } from "react-router-dom";


/* =========================================================
   DARSH BRAND INFORMATION
========================================================= */

const values = [
  {
    number: "01",
    icon: Hand,
    title: "Handloom at heart",
    description:
      "We celebrate the beauty of handwoven sarees, where every thread carries the character of the craft behind it.",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "Many weaving traditions",
    description:
      "From Chanderi and Tussar to Banarasi and Kanjeevaram-inspired weaves, Darsh brings together diverse Indian textile traditions.",
  },
  {
    number: "03",
    icon: Heart,
    title: "Chosen with care",
    description:
      "Every collection is selected for its fabric, texture, colour, detailing and the story it brings to your wardrobe.",
  },
];


const collections = [
  "Pure Handloom Chanderi",
  "Semi Tussar Banarasi",
  "Gachi Tussar Kantha",
  "Kanjeevaram & Tissue",
  "Traditional Handloom Sarees",
  "Contemporary Saree Collections",
];


const careItems = [
  {
    number: "01",
    title: "Store with care",
    text:
      "Keep your saree folded gently in a clean cotton or muslin cloth.",
  },
  {
    number: "02",
    title: "Give the weave space",
    text:
      "Refold your saree occasionally so the same creases do not remain for long.",
  },
  {
    number: "03",
    title: "Follow the fabric",
    text:
      "Always follow the individual wash and care instructions provided with your saree.",
  },
];


/* =========================================================
   ANIMATION
========================================================= */

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 35,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};


const fadeLeft = {
  hidden: {
    opacity: 0,
    x: -35,
  },

  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};


const fadeRight = {
  hidden: {
    opacity: 0,
    x: 35,
  },

  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};


/* =========================================================
   ABOUT PAGE
========================================================= */

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-[#f8f4eb] text-[#3f1616] overflow-hidden">

      {/* =====================================================
          HERO STORY
      ===================================================== */}

      <section className="relative bg-[#f8f4eb] border-b border-[#741522]/10">

        <div className="max-w-[1180px] mx-auto px-5 sm:px-8 lg:px-10">

          <div className="
            grid
            grid-cols-1
            lg:grid-cols-[0.95fr_1.05fr]
            min-h-[680px]
            lg:min-h-[760px]
          ">

            {/* =================================================
                STORY TEXT
            ================================================= */}

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.2,
              }}
              variants={fadeLeft}
              className="
                flex
                flex-col
                justify-center
                py-16
                sm:py-20
                lg:py-24
                lg:pr-16
              "
            >

              {/* Eyebrow */}

              <div className="flex items-center gap-3 mb-6">

                <span className="w-8 h-px bg-[#d4ad54]" />

                <span className="
                  text-[8px]
                  sm:text-[9px]
                  tracking-[0.42em]
                  uppercase
                  text-[#977e73]
                ">
                  ABOUT DARSH
                </span>

              </div>


              {/* Main heading */}

              <h1 className="
                font-serif
                font-normal
                text-[#3f1616]
                text-[44px]
                sm:text-[54px]
                md:text-[62px]
                lg:text-[68px]
                leading-[1.02]
                tracking-[-0.03em]
              ">
                Sarees that carry

                <span className="
                  block
                  italic
                  text-[#741522]
                  mt-1
                ">
                  a story.
                </span>
              </h1>


              {/* Gold line */}

              <div className="
                w-16
                h-px
                bg-[#d4ad54]
                mt-8
                mb-7
              " />


              {/* Main brand story */}

              <div className="
                max-w-[520px]
                space-y-5
                text-[11px]
                sm:text-[12px]
                md:text-[13px]
                leading-6
                text-[#806c63]
              ">

                <p>
                  Darsh is a saree destination inspired by
                  India's rich textile traditions — bringing
                  together beautiful weaves, colours,
                  textures and craftsmanship for the
                  modern wardrobe.
                </p>

                <p>
                  From handloom Chanderi and Tussar
                  varieties to Banarasi, Kanjeevaram,
                  tissue and kantha-inspired creations,
                  our collections celebrate the diversity
                  of Indian sarees.
                </p>

                <p>
                  We believe a saree is more than something
                  you wear. It is a piece of culture, craft
                  and character — chosen to become part of
                  your own story.
                </p>

              </div>


              {/* CTA */}

              <div className="
                flex
                flex-wrap
                gap-3
                mt-9
              ">

                <Link
                  to="/allproducts"
                  className="
                    group
                    inline-flex
                    items-center
                    gap-3
                    bg-[#741522]
                    text-[#f8f4eb]
                    px-7
                    py-3.5
                    text-[8px]
                    tracking-[0.25em]
                    uppercase
                    transition-all
                    duration-300
                    hover:bg-[#d4ad54]
                    hover:text-[#4b1519]
                  "
                >
                  Explore Sarees

                  <ArrowRight
                    size={14}
                    strokeWidth={1.2}
                    className="
                      transition-transform
                      group-hover:translate-x-1
                    "
                  />
                </Link>


                <a
                  href="#collections"
                  className="
                    group
                    inline-flex
                    items-center
                    gap-2
                    border
                    border-[#741522]/30
                    text-[#741522]
                    px-7
                    py-3.5
                    text-[8px]
                    tracking-[0.25em]
                    uppercase
                    transition-all
                    duration-300
                    hover:bg-[#741522]
                    hover:text-[#f8f4eb]
                  "
                >
                  Discover Darsh

                  <ArrowDown
                    size={13}
                    strokeWidth={1}
                    className="
                      transition-transform
                      group-hover:translate-y-1
                    "
                  />
                </a>

              </div>

            </motion.div>


            {/* =================================================
                HERO IMAGE
            ================================================= */}

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.15,
              }}
              variants={fadeRight}
              className="
                relative
                min-h-[480px]
                lg:min-h-full
              "
            >

              {/* Gold frame */}

              <div className="
                absolute
                top-8
                right-0
                bottom-8
                left-4
                sm:left-8
                border
                border-[#d4ad54]/60
                pointer-events-none
                z-10
              " />


              <div className="
                absolute
                inset-0
                lg:ml-8
                overflow-hidden
                bg-[#e7ddcd]
              ">

                <img
                  src="/IMG/about.jpeg"
                  alt="Darsh saree collection"
                  className="
                    w-full
                    h-full
                    object-cover
                    transition-transform
                    duration-[1800ms]
                    hover:scale-[1.04]
                  "
                />

                <div className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-[#4b1117]/35
                  via-transparent
                  to-transparent
                " />

              </div>


              {/* Image caption */}

              <div className="
                absolute
                z-20
                left-10
                sm:left-14
                bottom-10
                sm:bottom-14
                bg-[#f8f4eb]/95
                px-5
                py-4
              ">

                <p className="
                  text-[7px]
                  tracking-[0.3em]
                  uppercase
                  text-[#977e73]
                ">
                  DARSH
                </p>

                <p className="
                  font-serif
                  text-[17px]
                  mt-1
                  text-[#3f1616]
                ">
                  Indian weaves, beautifully lived.
                </p>

              </div>

            </motion.div>

          </div>

        </div>

      </section>


      {/* =====================================================
          MAROON BRAND STATEMENT
      ===================================================== */}

      <section className="
        relative
        overflow-hidden
        bg-[#741522]
        py-20
        sm:py-24
        lg:py-28
      ">

        {/* Decorative circles */}

        <div className="
          absolute
          -left-40
          -top-40
          w-[480px]
          h-[480px]
          rounded-full
          border
          border-[#d4ad54]/10
        " />

        <div className="
          absolute
          -right-40
          -bottom-40
          w-[480px]
          h-[480px]
          rounded-full
          border
          border-[#d4ad54]/10
        " />


        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
          }}
          variants={fadeUp}
          className="
            relative
            z-10
            max-w-[850px]
            mx-auto
            px-6
            text-center
          "
        >

          <Sparkles
            size={18}
            strokeWidth={1}
            className="
              mx-auto
              mb-6
              text-[#d4ad54]
            "
          />

          <h2 className="
            font-serif
            font-normal
            italic
            text-[#f8f4eb]
            text-[30px]
            sm:text-[40px]
            md:text-[48px]
            leading-[1.15]
          ">
            Every weave has a character.

            <span className="
              block
              text-[#d4ad54]
              mt-2
            ">
              Find yours.
            </span>
          </h2>

        </motion.div>

      </section>


      {/* =====================================================
          WHAT DARSH BRINGS TO YOU
      ===================================================== */}

      <section
        id="collections"
        className="
          bg-[#eee5d6]
          py-20
          sm:py-24
          lg:py-28
          border-b
          border-[#741522]/10
        "
      >

        <div className="
          max-w-[1050px]
          mx-auto
          px-5
          sm:px-8
        ">

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
            }}
            variants={fadeUp}
            className="
              text-center
              mb-12
            "
          >

            <p className="
              text-[8px]
              tracking-[0.4em]
              uppercase
              text-[#977e73]
              mb-4
            ">
              THE DARSH COLLECTION
            </p>

            <h2 className="
              font-serif
              font-normal
              text-[38px]
              sm:text-[48px]
              text-[#3f1616]
            ">
              A world of Indian weaves
            </h2>

            <p className="
              max-w-[550px]
              mx-auto
              mt-4
              text-[11px]
              sm:text-[12px]
              leading-6
              text-[#806c63]
            ">
              Explore sarees inspired by different
              regions, techniques and textile
              traditions of India.
            </p>

          </motion.div>


          {/* Collection list */}

          <div className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            border
            border-[#741522]/10
          ">

            {collections.map(
              (collection, index) => (
                <motion.div
                  key={collection}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    delay: index * 0.07,
                    duration: 0.6,
                  }}
                  className="
                    group
                    min-h-[145px]
                    p-7
                    border-b
                    sm:border-r
                    border-[#741522]/10
                    last:border-b-0
                    hover:bg-[#f8f4eb]
                    transition-colors
                    duration-500
                  "
                >

                  <div className="
                    flex
                    items-center
                    justify-between
                    mb-8
                  ">

                    <span className="
                      text-[8px]
                      tracking-[0.25em]
                      text-[#a18b80]
                    ">
                      {String(index + 1).padStart(
                        2,
                        "0"
                      )}
                    </span>

                    <ArrowRight
                      size={14}
                      strokeWidth={1}
                      className="
                        text-[#d4ad54]
                        opacity-0
                        -translate-x-2
                        group-hover:opacity-100
                        group-hover:translate-x-0
                        transition-all
                      "
                    />

                  </div>


                  <h3 className="
                    font-serif
                    text-[19px]
                    text-[#3f1616]
                    group-hover:text-[#741522]
                    transition-colors
                  ">
                    {collection}
                  </h3>

                </motion.div>
              )
            )}

          </div>

        </div>

      </section>


      {/* =====================================================
          OUR VALUES
      ===================================================== */}

      <section className="
        bg-[#f8f4eb]
        py-20
        sm:py-24
        lg:py-28
      ">

        <div className="
          max-w-[1050px]
          mx-auto
          px-5
          sm:px-8
        ">

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
            }}
            variants={fadeUp}
            className="
              text-center
              mb-12
            "
          >

            <p className="
              text-[8px]
              tracking-[0.4em]
              uppercase
              text-[#977e73]
              mb-4
            ">
              WHY DARSH
            </p>

            <h2 className="
              font-serif
              font-normal
              text-[38px]
              sm:text-[48px]
              text-[#3f1616]
            ">
              Chosen with intention
            </h2>

          </motion.div>


          <div className="
            grid
            grid-cols-1
            md:grid-cols-3
            border
            border-[#741522]/10
          ">

            {values.map(
              (value, index) => {
                const Icon = value.icon;

                return (
                  <motion.div
                    key={value.title}
                    initial={{
                      opacity: 0,
                      y: 25,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.2,
                    }}
                    transition={{
                      delay: index * 0.12,
                      duration: 0.7,
                    }}
                    className="
                      group
                      min-h-[260px]
                      p-8
                      sm:p-9
                      border-b
                      md:border-b-0
                      md:border-r
                      last:border-b-0
                      last:border-r-0
                      border-[#741522]/10
                      hover:bg-[#eee5d6]
                      transition-colors
                      duration-500
                    "
                  >

                    <div className="
                      flex
                      items-center
                      justify-between
                    ">

                      <span className="
                        text-[8px]
                        tracking-[0.25em]
                        text-[#a18b80]
                      ">
                        {value.number}
                      </span>

                      <Icon
                        size={18}
                        strokeWidth={1}
                        className="
                          text-[#741522]
                          group-hover:scale-110
                          transition-transform
                        "
                      />

                    </div>


                    <div className="
                      w-8
                      h-px
                      bg-[#d4ad54]
                      mt-12
                      mb-5
                      group-hover:w-14
                      transition-all
                      duration-500
                    " />


                    <h3 className="
                      font-serif
                      text-[23px]
                      text-[#3f1616]
                    ">
                      {value.title}
                    </h3>


                    <p className="
                      mt-3
                      text-[10px]
                      sm:text-[11px]
                      leading-5
                      text-[#806c63]
                    ">
                      {value.description}
                    </p>

                  </motion.div>
                );
              }
            )}

          </div>

        </div>

      </section>


      {/* =====================================================
          CARE GUIDE
      ===================================================== */}

      <section className="
        bg-[#eee5d6]
        py-20
        sm:py-24
        lg:py-28
        border-y
        border-[#741522]/10
      ">

        <div className="
          max-w-[900px]
          mx-auto
          px-5
          sm:px-8
        ">

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
            }}
            variants={fadeUp}
            className="
              text-center
              mb-12
            "
          >

            <p className="
              text-[8px]
              tracking-[0.4em]
              uppercase
              text-[#977e73]
              mb-4
            ">
              AFTER YOU RECEIVE IT
            </p>

            <h2 className="
              font-serif
              font-normal
              text-[35px]
              sm:text-[45px]
              text-[#3f1616]
            ">
              How to care for your saree
            </h2>

          </motion.div>


          <div className="
            grid
            grid-cols-1
            sm:grid-cols-3
            border
            border-[#741522]/10
          ">

            {careItems.map(
              (item, index) => (
                <motion.div
                  key={item.number}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.6,
                  }}
                  className="
                    p-7
                    sm:p-8
                    min-h-[190px]
                    border-b
                    sm:border-b-0
                    sm:border-r
                    last:border-b-0
                    last:border-r-0
                    border-[#741522]/10
                    hover:bg-[#f8f4eb]
                    transition-colors
                    duration-500
                  "
                >

                  <span className="
                    text-[8px]
                    tracking-[0.25em]
                    text-[#a18b80]
                  ">
                    {item.number}
                  </span>

                  <h3 className="
                    font-serif
                    text-[20px]
                    mt-10
                    text-[#3f1616]
                  ">
                    {item.title}
                  </h3>

                  <p className="
                    mt-2
                    text-[10px]
                    sm:text-[11px]
                    leading-5
                    text-[#806c63]
                  ">
                    {item.text}
                  </p>

                </motion.div>
              )
            )}

          </div>

        </div>

      </section>


      {/* =====================================================
          FACEBOOK / SOCIAL CTA
      ===================================================== */}

      <section className="
        bg-[#f8f4eb]
        py-16
        sm:py-20
        text-center
      ">

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
        >

          <p className="
            text-[8px]
            tracking-[0.4em]
            uppercase
            text-[#977e73]
            mb-4
          ">
            FOLLOW DARSH
          </p>

          <h2 className="
            font-serif
            text-[34px]
            sm:text-[44px]
            text-[#3f1616]
          ">
            See the latest from our world.
          </h2>

          <p className="
            max-w-[480px]
            mx-auto
            mt-4
            text-[11px]
            leading-6
            text-[#806c63]
          ">
            Discover new sarees, styling inspiration,
            handloom stories and the latest Darsh
            collections.
          </p>


          <a
            href="https://www.facebook.com/Darshpage"
            target="_blank"
            rel="noopener noreferrer"
            className="
              group
              inline-flex
              items-center
              gap-3
              mt-7
              border
              border-[#741522]
              text-[#741522]
              px-7
              py-3.5
              text-[8px]
              tracking-[0.28em]
              uppercase
              transition-all
              duration-300
              hover:bg-[#741522]
              hover:text-[#f8f4eb]
            "
          >
            Visit Facebook

            <ArrowRight
              size={14}
              className="
                transition-transform
                group-hover:translate-x-1
              "
            />

          </a>

        </motion.div>

      </section>


      {/* =====================================================
          FINAL MAROON CTA
      ===================================================== */}

      <section className="
        bg-[#741522]
        py-16
        sm:py-20
        text-center
      ">

        <p className="
          text-[8px]
          tracking-[0.4em]
          uppercase
          text-[#d9bd78]
          mb-4
        ">
          DARSH
        </p>

        <h2 className="
          font-serif
          italic
          text-[#f8f4eb]
          text-[34px]
          sm:text-[45px]
        ">
          Find a saree that feels like you.
        </h2>

        <Link
          to="/allproducts"
          className="
            group
            inline-flex
            items-center
            gap-3
            mt-7
            border
            border-[#d4ad54]
            text-[#d9bd78]
            px-7
            py-3.5
            text-[8px]
            tracking-[0.28em]
            uppercase
            transition-all
            duration-300
            hover:bg-[#d4ad54]
            hover:text-[#741522]
          "
        >
          Shop Darsh

          <ArrowRight
            size={14}
            className="
              transition-transform
              group-hover:translate-x-1
            "
          />

        </Link>

      </section>


      {/* =====================================================
          REDUCED MOTION
      ===================================================== */}

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media (prefers-reduced-motion: reduce) {
              *,
              *::before,
              *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
              }
            }
          `
        }}
      />

    </main>
  );
};


export default AboutPage;