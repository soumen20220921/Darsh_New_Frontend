import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Shield,
  Truck,
  Star,
  CheckCircle,
  Facebook,
  ArrowUpRight,
  Instagram,
  Youtube,
} from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* =====================================================
     EXISTING FOOTER DATA — KEPT
  ===================================================== */

  const footerLinks = {
    support: [
      {
        name: "Contact Us",
        path: "/contactus",
      },
      {
        name: "Returns",
        path: "/CancellationandRefund",
      },
      {
        name: "Terms And Conditions",
        path: "/terms-and-conditions",
      },
      {
        name: "Track Order",
        path: "/track-order",
      },
    ],

    company: [
      {
        name: "About Us",
        path: "/aboutus",
      },
      {
        name: "Disclaimer",
        path: "/disclaimer",
      },
      {
        name: "Privacy Policy",
        path: "/PrivacyPolicy",
      },
      {
        name: "Payment Options",
        path: "/PaymentOptions",
      },
    ],
  };


  /* =====================================================
     NEWSLETTER
  ===================================================== */

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setSubscribed(true);
      setIsSubmitting(false);

      console.log(
        `Subscribed with email: ${email}`
      );

      setEmail("");

      setTimeout(() => {
        setSubscribed(false);
      }, 4000);
    }, 1200);
  };


  return (
    <footer
      className="
        relative
        overflow-hidden
        bg-[#f4ecdf]
        text-[#3f1616]
        border-t
        border-[#741522]/10
      "
    >

      {/* =====================================================
          DECORATIVE BACKGROUND
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -left-48
          -bottom-48
          w-[520px]
          h-[520px]
          rounded-full
          border
          border-[#d4ad54]/10
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-48
          -top-48
          w-[520px]
          h-[520px]
          rounded-full
          border
          border-[#741522]/5
        "
      />


      {/* =====================================================
          MAIN FOOTER
      ===================================================== */}

      <div
        className="
          relative
          z-10
          max-w-[1180px]
          mx-auto
          px-5
          sm:px-8
          lg:px-10
          py-14
          sm:py-16
          lg:py-20
        "
      >

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-[1.7fr_1fr_1fr_1fr]
            gap-12
            lg:gap-14
          "
        >

          {/* =================================================
              DARSH BRAND
          ================================================= */}

          <div
            className="
              lg:pr-8
              animate-[fadeIn_0.8s_ease-out]
            "
          >

            <Link
              to="/"
              className="
                inline-block
                group
              "
            >

              <h2
                className="
                  font-serif
                  font-normal
                  text-[#741522]
                  text-[30px]
                  sm:text-[34px]
                  tracking-[0.2em]
                  leading-none
                  transition-all
                  duration-500
                  group-hover:tracking-[0.28em]
                "
              >
                DARSH
              </h2>

            </Link>


            <p
              className="
                mt-4
                text-[7px]
                sm:text-[8px]
                tracking-[0.34em]
                uppercase
                text-[#806c63]
              "
            >
              HANDWOVEN SAREES · KANCHIPURAM · INDIA
            </p>


            {/* Existing description,
                redesigned */}
            <p
              className="
                mt-7
                max-w-[380px]
                text-[10px]
                sm:text-[11px]
                leading-6
                text-[#806c63]
              "
            >
              Premium products with unbeatable prices.
              Experience fast shipping and outstanding
              service.
            </p>


            {/* =================================================
                CONTACT INFORMATION
            ================================================= */}

            <div
              className="
                mt-7
                space-y-4
              "
            >

              {/* Phone */}

              <a
                href="tel:+919907804710"
                className="
                  group
                  flex
                  items-center
                  gap-3
                  text-[10px]
                  text-[#5e4941]
                  hover:text-[#741522]
                  transition-colors
                "
              >

                <Phone
                  size={15}
                  strokeWidth={1.2}
                  className="
                    text-[#d4ad54]
                    transition-transform
                    group-hover:scale-110
                  "
                />

                <span>
                  +91 9907804710
                </span>

              </a>


              {/* Email */}

              <a
                href="mailto:contactdarsh9@gmail.com"
                className="
                  group
                  flex
                  items-center
                  gap-3
                  text-[10px]
                  text-[#5e4941]
                  hover:text-[#741522]
                  transition-colors
                "
              >

                <Mail
                  size={15}
                  strokeWidth={1.2}
                  className="
                    text-[#d4ad54]
                    transition-transform
                    group-hover:scale-110
                  "
                />

                <span className="break-all">
                 contactdarsh9@gmail.com
                </span>

              </a>


              {/* Address */}

              <a
                href="https://share.google/pClPGHzUnS3mJENSA"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group
                  flex
                  items-start
                  gap-3
                  text-[10px]
                  leading-5
                  text-[#5e4941]
                  hover:text-[#741522]
                  transition-colors
                "
              >

                <MapPin
                  size={15}
                  strokeWidth={1.2}
                  className="
                    mt-0.5
                    shrink-0
                    text-[#d4ad54]
                  "
                />

                <span>
                   6VJG+23H, Ichlabad, Bardhaman, West Bengal 713103, Burdwan, India, 713103
                </span>

              </a>

            </div>


           {/* =================================================
                             SOCIAL
                         ================================================= */}
           
                         <div className="flex  mt-7 items-center gap-3">
                           <span
                             className="
                 text-[7px]
                 tracking-[0.3em]
                 uppercase
                 text-[#977e73]
                 mr-1
               "
                           >
                             FOLLOW DARSH
                           </span>
           
                           {/* Facebook */}
                           <a
                             href="https://www.facebook.com/Darshpage"
                             target="_blank"
                             rel="noopener noreferrer"
                             aria-label="Darsh Facebook"
                             className="
                 w-9 h-9
                 border border-[#741522]/25
                 flex items-center justify-center
                 text-[#741522]
                 transition-all duration-300
                 hover:bg-[#741522]
                 hover:text-[#f8f4eb]
               "
                           >
                             <Facebook size={15} strokeWidth={1.2} />
                           </a>
           
                           {/* Instagram */}
                           <a
                             href="https://www.instagram.com/darsh_bysathi/"
                             target="_blank"
                             rel="noopener noreferrer"
                             aria-label="Darsh Instagram"
                             className="
                 w-9 h-9
                 border border-[#741522]/25
                 flex items-center justify-center
                 text-[#741522]
                 transition-all duration-300
                 hover:bg-[#741522]
                 hover:text-[#f8f4eb]
               "
                           >
                             <Instagram size={15} strokeWidth={1.2} />
                           </a>
           
                           {/* YouTube */}
                           <a
                             href="https://youtube.com/@darsh7901?si=6uplC1BKqxBEYZbt"
                             target="_blank"
                             rel="noopener noreferrer"
                             aria-label="Darsh YouTube"
                             className="
                 w-9 h-9
                 border border-[#741522]/25
                 flex items-center justify-center
                 text-[#741522]
                 transition-all duration-300
                 hover:bg-[#741522]
                 hover:text-[#f8f4eb]
               "
                           >
                             <Youtube size={15} strokeWidth={1.2} />
                           </a>
                         </div>

          </div>


          {/* =================================================
              SUPPORT
          ================================================= */}

          <FooterColumn
            title="SUPPORT"
            links={footerLinks.support}
          />


          {/* =================================================
              COMPANY
          ================================================= */}

          <FooterColumn
            title="COMPANY"
            links={footerLinks.company}
          />


          {/* =================================================
              WHY SHOP WITH US
          ================================================= */}

          <div>

            <h3
              className="
                text-[7px]
                sm:text-[8px]
                tracking-[0.35em]
                uppercase
                text-[#977e73]
                mb-6
              "
            >
              WHY SHOP WITH US
            </h3>


            <div className="space-y-5">

              {/* Fast Shipping */}

              <Feature
                icon={Truck}
                title="Fast Shipping"
                text="On all orders over 1000"
              />


              {/* Secure Payments */}

              <Feature
                icon={Shield}
                title="Secure Payments"
                text="Advanced SSL encryption"
              />


              {/* Quality */}

              <Feature
                icon={Star}
                title="Quality Guaranteed"
                text="100% satisfaction policy"
              />

            </div>

          </div>

        </div>


        {/* =====================================================
            NEWSLETTER
        ===================================================== */}

        <div
          className="
            mt-14
            pt-8
            border-t
            border-[#741522]/10
          "
        >

          <div
            className="
              grid
              grid-cols-1
              lg:grid-cols-[1fr_1fr]
              gap-7
              items-center
            "
          >

            {/* Newsletter text */}

            <div>

              <p
                className="
                  text-[7px]
                  tracking-[0.35em]
                  uppercase
                  text-[#977e73]
                  mb-2
                "
              >
                STAY CONNECTED
              </p>

              <h3
                className="
                  font-serif
                  text-[24px]
                  sm:text-[28px]
                  text-[#3f1616]
                "
              >
                New drops, directly to you.
              </h3>

              <p
                className="
                  mt-2
                  text-[9px]
                  sm:text-[10px]
                  text-[#806c63]
                "
              >
                Subscribe for special offers,
                giveaways, and updates.
              </p>

            </div>


            {/* Newsletter form */}

            <div>

              {subscribed ? (

                <div
                  className="
                    h-12
                    border
                    border-[#741522]/20
                    bg-[#fbf8f2]
                    flex
                    items-center
                    justify-center
                    gap-3
                  "
                >

                  <CheckCircle
                    size={17}
                    className="text-[#741522]"
                  />

                  <span
                    className="
                      text-[9px]
                      tracking-[0.18em]
                      uppercase
                      text-[#741522]
                    "
                  >
                    Successfully Subscribed!
                  </span>

                </div>

              ) : (

                <form
                  onSubmit={handleSubscribe}
                  className="
                    flex
                    w-full
                  "
                >

                  <input
                    type="email"
                    placeholder="Email for new drops"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    required
                    disabled={isSubmitting}
                    className="
                      flex-1
                      min-w-0
                      h-12
                      px-4
                      bg-[#fbf8f2]
                      border
                      border-[#741522]/15
                      border-r-0
                      outline-none
                      text-[10px]
                      sm:text-[11px]
                      text-[#3f1616]
                      placeholder:text-[#a6948b]
                      focus:border-[#741522]
                      transition-colors
                    "
                  />


                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="
                      h-12
                      px-6
                      sm:px-8
                      bg-[#741522]
                      text-[#f4ecdf]
                      text-[7px]
                      sm:text-[8px]
                      tracking-[0.25em]
                      uppercase
                      transition-all
                      duration-300
                      hover:bg-[#d4ad54]
                      hover:text-[#741522]
                      disabled:opacity-60
                    "
                  >
                    {isSubmitting
                      ? "SUBSCRIBING..."
                      : "JOIN"}
                  </button>

                </form>

              )}

            </div>

          </div>

        </div>


        

      </div>


      {/* =====================================================
          COPYRIGHT / POLICY BAR
      ===================================================== */}

      <div
        className="
          relative
          z-10
          border-t
          border-[#741522]/10
        "
      >

        <div
          className="
            max-w-[1180px]
            mx-auto
            px-5
            sm:px-8
            lg:px-10
            py-5
            flex
            flex-col
            md:flex-row
            items-center
            justify-between
            gap-4
          "
        >

          {/* Existing copyright information */}

          <p
            className="
              text-[8px]
              sm:text-[9px]
              text-[#806c63]
              text-center
              md:text-left
            "
          >
            © 2026 Darsh.
            All rights reserved.
          </p>


          {/* Policy links */}

          <div
            className="
              flex
              flex-wrap
              justify-center
              items-center
              gap-x-5
              gap-y-2
            "
          >

            <Link
              to="/PrivacyPolicy"
              className="FooterPolicyLink"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms-and-conditions"
              className="FooterPolicyLink"
            >
              Terms of Service
            </Link>

            <Link
              to="/CancellationandRefund"
              className="FooterPolicyLink"
            >
              Returns Policy
            </Link>

          </div>

        </div>

      </div>


      {/* =====================================================
          ANIMATION
      ===================================================== */}

      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(18px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .FooterPolicyLink {
            font-size: 8px;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            color: #806c63;
            transition:
              color 300ms ease,
              letter-spacing 300ms ease;
          }

          .FooterPolicyLink:hover {
            color: #741522;
            letter-spacing: 0.19em;
          }

          @media (max-width: 640px) {
            .FooterPolicyLink {
              font-size: 7px;
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

    </footer>
  );
}


/* =========================================================
   FOOTER COLUMN
========================================================= */

const FooterColumn = ({
  title,
  links,
}) => {
  return (
    <div>

      <h3
        className="
          text-[7px]
          sm:text-[8px]
          tracking-[0.35em]
          uppercase
          text-[#977e73]
          mb-6
        "
      >
        {title}
      </h3>


      <ul className="space-y-4">

        {links.map((link) => (
          <li key={link.name}>

            <Link
              to={link.path}
              className="
                group
                inline-flex
                items-center
                gap-2
                text-[10px]
                sm:text-[11px]
                text-[#5e4941]
                hover:text-[#741522]
                transition-colors
                duration-300
              "
            >

              {link.name}

              <ArrowUpRight
                size={11}
                strokeWidth={1}
                className="
                  opacity-0
                  -translate-y-1
                  group-hover:opacity-100
                  group-hover:translate-y-0
                  transition-all
                  duration-300
                  text-[#d4ad54]
                "
              />

            </Link>

          </li>
        ))}

      </ul>

    </div>
  );
};


/* =========================================================
   FEATURE
========================================================= */

const Feature = ({
  icon: Icon,
  title,
  text,
}) => {
  return (
    <div
      className="
        group
        flex
        items-start
        gap-3
      "
    >

      <div
        className="
          w-8
          h-8
          shrink-0
          border
          border-[#d4ad54]/50
          flex
          items-center
          justify-center
          text-[#741522]
          group-hover:bg-[#741522]
          group-hover:text-[#d4ad54]
          transition-all
          duration-300
        "
      >

        <Icon
          size={14}
          strokeWidth={1.2}
        />

      </div>


      <div>

        <h4
          className="
            font-serif
            text-[14px]
            text-[#3f1616]
          "
        >
          {title}
        </h4>

        <p
          className="
            mt-1
            text-[8px]
            sm:text-[9px]
            leading-4
            text-[#806c63]
          "
        >
          {text}
        </p>

      </div>

    </div>
  );
};