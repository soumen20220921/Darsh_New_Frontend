import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowDown,
  Sparkles,
 
} from "lucide-react";



const FestiveBanner = () => {
  return (
    <main className="bg-[#f8f4eb] text-[#3f1616] overflow-hidden">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        className="
          relative
          min-h-[620px]
          sm:min-h-[680px]
          lg:min-h-[720px]
          bg-[#741522]
          flex
          items-center
          justify-center
          overflow-hidden
        "
      >

        {/* Background Decoration */}

        <div className="absolute inset-0 pointer-events-none">

          {/* Large Circle */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 1.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              absolute
              -left-40
              -top-40
              w-[500px]
              h-[500px]
              rounded-full
              border
              border-[#d4ad54]/10
            "
          />

          {/* Right Circle */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.85,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 2,
              delay: 0.2,
            }}
            className="
              absolute
              -right-40
              -bottom-40
              w-[520px]
              h-[520px]
              rounded-full
              border
              border-[#d4ad54]/10
            "
          />

          {/* Horizontal Lines */}

          <div
            className="
              absolute
              left-0
              right-0
              top-[18%]
              h-px
              bg-[#d4ad54]/10
            "
          />

          <div
            className="
              absolute
              left-0
              right-0
              bottom-[18%]
              h-px
              bg-[#d4ad54]/10
            "
          />

          {/* Floating Gold Dots */}

          <motion.span
            animate={{
              y: [0, -18, 0],
              opacity: [0.25, 0.8, 0.25],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute
              left-[15%]
              top-[30%]
              w-1
              h-1
              rounded-full
              bg-[#d4ad54]
              shadow-[0_0_15px_rgba(212,173,84,.7)]
            "
          />

          <motion.span
            animate={{
              y: [0, 20, 0],
              opacity: [0.2, 0.7, 0.2],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="
              absolute
              right-[17%]
              top-[25%]
              w-1.5
              h-1.5
              rounded-full
              bg-[#d4ad54]
            "
          />

          <motion.span
            animate={{
              y: [0, -12, 0],
              x: [0, 8, 0],
              opacity: [0.15, 0.6, 0.15],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="
              absolute
              right-[25%]
              bottom-[25%]
              w-1
              h-1
              rounded-full
              bg-[#d4ad54]
            "
          />

        </div>


        {/* =====================================================
            HERO CONTENT
        ===================================================== */}

        <div
          className="
            relative
            z-10
            max-w-[1050px]
            mx-auto
            px-6
            sm:px-10
            text-center
          "
        >

          <motion.div
            initial={{
              opacity: 0,
              y: 45,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >

            {/* Eyebrow */}

            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.15,
                duration: 0.7,
              }}
              className="
                flex
                items-center
                justify-center
                gap-4
                mb-7
              "
            >

              <span
                className="
                  hidden
                  sm:block
                  w-8
                  h-px
                  bg-[#d4ad54]
                "
              />

              <span
                className="
                  text-[#e1c982]
                  text-[8px]
                  sm:text-[9px]
                  tracking-[0.42em]
                  uppercase
                "
              >
                OUR STORY
              </span>

              <span
                className="
                  hidden
                  sm:block
                  w-8
                  h-px
                  bg-[#d4ad54]
                "
              />

            </motion.div>


            {/* Main Heading */}

            <motion.h1
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.25,
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                font-serif
                font-normal
                text-[#f8f4eb]
                text-[40px]
                sm:text-[52px]
                md:text-[64px]
                lg:text-[72px]
                leading-[1.02]
                tracking-[-0.025em]
              "
            >
              Tradition,
              <span className="block">
                beautifully draped.
              </span>
            </motion.h1>


            {/* Gold Divider */}

            <motion.div
              initial={{
                width: 0,
                opacity: 0,
              }}
              animate={{
                width: 90,
                opacity: 1,
              }}
              transition={{
                delay: 0.65,
                duration: 0.8,
              }}
              className="
                mx-auto
                mt-7
                mb-7
                h-px
                bg-[#d4ad54]
              "
            />


            {/* Short Information */}

            <motion.p
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.7,
                duration: 0.8,
              }}
              className="
                max-w-[720px]
                mx-auto
                text-[#f4e9dc]/80
                text-[12px]
                sm:text-[14px]
                md:text-[15px]
                leading-7
                sm:leading-8
              "
            >
              Darsh is a celebration of India's timeless handloom heritage.
              We bring together beautiful sarees, regional artistry and
              traditional craftsmanship from across India — thoughtfully
              curated for the modern woman.
            </motion.p>


            {/* CTA */}

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
                delay: 0.95,
                duration: 0.7,
              }}
              className="
                flex
                flex-col
                sm:flex-row
                items-center
                justify-center
                gap-3
                mt-9
              "
            >

              <Link
                to="/allproducts"
                className="
                  group
                  inline-flex
                  items-center
                  gap-3
                  bg-[#d4ad54]
                  text-[#4b1519]
                  px-7
                  py-3.5
                  text-[8px]
                  sm:text-[9px]
                  tracking-[0.25em]
                  uppercase
                  font-medium
                  transition-all
                  duration-500
                  hover:bg-[#e2c477]
                  hover:-translate-y-0.5
                "
              >
                Explore Our Collection

                <ArrowRight
                  size={14}
                  strokeWidth={1.3}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </Link>


              <a
                href="/newarrivals"
                className="
                  group
                  inline-flex
                  items-center
                  gap-3
                  border
                  border-[#f8f4eb]/35
                  text-[#f8f4eb]
                  px-7
                  py-3.5
                  text-[8px]
                  sm:text-[9px]
                  tracking-[0.25em]
                  uppercase
                  transition-all
                  duration-500
                  hover:border-[#d4ad54]
                  hover:text-[#e1c982]
                "
              >
                Discover Darsh

                <ArrowDown
                  size={13}
                  strokeWidth={1.2}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-y-1
                  "
                />
              </a>

            </motion.div>

          </motion.div>

        </div>


        {/* Scroll Indicator */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 1.5,
            duration: 1,
          }}
          className="
            absolute
            bottom-7
            left-1/2
            -translate-x-1/2
            flex
            flex-col
            items-center
            gap-2
            text-[#e1c982]/60
          "
        >

          <span
            className="
              text-[7px]
              tracking-[0.3em]
              uppercase
            "
          >
            SCROLL
          </span>

          <motion.span
            animate={{
              y: [0, 5, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          >
            <ArrowDown
              size={14}
              strokeWidth={1}
            />
          </motion.span>

        </motion.div>

      </section>


     


      {/* =====================================================
          WHAT IS DARSH
      ===================================================== */}

      <section
        className="
          bg-[#eee5d6]
          py-16
          sm:py-20
          lg:py-24
        "
      >

        <div
          className="
            max-w-[900px]
            mx-auto
            px-6
            text-center
          "
        >

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            viewport={{
              once: true,
            }}
          >

            <span
              className="
                text-[8px]
                tracking-[0.38em]
                uppercase
                text-[#977e73]
              "
            >
              WHAT IS DARSH?
            </span>

            <h2
              className="
                font-serif
                text-[#3f1616]
                text-[34px]
                sm:text-[45px]
                mt-3
              "
            >
              India's traditions, one collection
            </h2>

            <p
              className="
                mt-6
                text-[#806c63]
                text-[12px]
                sm:text-[14px]
                leading-7
                sm:leading-8
                max-w-[720px]
                mx-auto
              "
            >
              From Bengal's handloom artistry to the rich silk traditions of
              Banaras, Kanjivaram and Uppada, Darsh brings together the
              distinctive beauty of India's weaving heritage in one place.
            </p>

            <p
              className="
                mt-4
                text-[#806c63]
                text-[12px]
                sm:text-[14px]
                leading-7
                sm:leading-8
                max-w-[720px]
                mx-auto
              "
            >
              Every collection is chosen to help you discover something
              beautiful, authentic and uniquely yours.
            </p>

          </motion.div>

        </div>

      </section>


      {/* =====================================================
          CELEBRATE TRADITIONS
      ===================================================== */}

      <section
        className="
          bg-[#f8f4eb]
          py-16
          sm:py-20
          lg:py-24
        "
      >

        <div
          className="
            max-w-[1100px]
            mx-auto
            px-6
            sm:px-8
            grid
            lg:grid-cols-2
            gap-12
            lg:gap-20
            items-center
          "
        >

          {/* Left */}

          <motion.div
            initial={{
              opacity: 0,
              x: -30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            viewport={{
              once: true,
            }}
          >

            <span
              className="
                text-[8px]
                tracking-[0.38em]
                uppercase
                text-[#977e73]
              "
            >
              CELEBRATE TRADITIONS
            </span>

            <h2
              className="
                font-serif
                text-[#3f1616]
                text-[37px]
                sm:text-[48px]
                leading-tight
                mt-3
              "
            >
              A saree for
              <span className="block">
                every story.
              </span>
            </h2>

            <div
              className="
                w-14
                h-px
                bg-[#d4ad54]
                my-6
              "
            />

            <p
              className="
                text-[#806c63]
                text-[12px]
                sm:text-[14px]
                leading-7
                sm:leading-8
              "
            >
              Whether it is a simple everyday drape, a festive celebration,
              a wedding occasion or a meaningful gift, Darsh brings together
              sarees for every chapter of your life.
            </p>

            <p
              className="
                text-[#806c63]
                text-[12px]
                sm:text-[14px]
                leading-7
                sm:leading-8
                mt-4
              "
            >
              Choose the colour, weave and story that feels like you.
            </p>

          </motion.div>


          {/* Right Quote Card */}

          <motion.div
            initial={{
              opacity: 0,
              x: 30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            viewport={{
              once: true,
            }}
            className="
              relative
              bg-[#741522]
              min-h-[330px]
              flex
              items-center
              justify-center
              px-8
              sm:px-12
              overflow-hidden
            "
          >

            {/* Decorative Circle */}

            <div
              className="
                absolute
                -right-24
                -top-24
                w-64
                h-64
                rounded-full
                border
                border-[#d4ad54]/15
              "
            />

            <div
              className="
                absolute
                -left-24
                -bottom-24
                w-64
                h-64
                rounded-full
                border
                border-[#d4ad54]/15
              "
            />

            <div className="relative z-10 text-center">

              <Sparkles
                size={18}
                strokeWidth={1}
                className="
                  mx-auto
                  mb-6
                  text-[#d4ad54]
                "
              />

              <p
                className="
                  font-serif
                  italic
                  text-[#f8f4eb]
                  text-[27px]
                  sm:text-[35px]
                  leading-[1.2]
                "
              >
                Wear the tradition.
                <span className="block">
                  Carry the story.
                </span>
              </p>

              <div
                className="
                  mt-7
                  text-[8px]
                  tracking-[0.35em]
                  uppercase
                  text-[#d9bd78]
                "
              >
                — DARSH
              </div>

            </div>

          </motion.div>

        </div>

      </section>


      {/* =====================================================
          FOOTER CTA
      ===================================================== */}

      <section
        className="
          bg-[#eee5d6]
          py-16
          sm:py-20
          text-center
        "
      >

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
          }}
          viewport={{
            once: true,
          }}
        >

          <p
            className="
              text-[8px]
              tracking-[0.38em]
              text-[#977e73]
              uppercase
              mb-4
            "
          >
            CONTINUE THE JOURNEY
          </p>

          <h2
            className="
              font-serif
              text-[#3f1616]
              text-[35px]
              sm:text-[45px]
            "
          >
            Find your perfect weave
          </h2>

          <p
            className="
              max-w-[520px]
              mx-auto
              mt-4
              px-6
              text-[11px]
              sm:text-[12px]
              leading-6
              text-[#806c63]
            "
          >
            Explore the colours, fabrics and traditions that make every
            Darsh saree special.
          </p>

          <Link
            to="/allproducts"
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
              sm:text-[9px]
              tracking-[0.28em]
              uppercase
              transition-all
              duration-300
              hover:bg-[#741522]
              hover:text-[#f8f4eb]
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

        </motion.div>

      </section>


      {/* =====================================================
          REDUCED MOTION
      ===================================================== */}

      <style>
        {`
          @media (prefers-reduced-motion: reduce) {
            *,
            *::before,
            *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
              scroll-behavior: auto !important;
            }
          }
        `}
      </style>

    </main>
  );
};

export default FestiveBanner;