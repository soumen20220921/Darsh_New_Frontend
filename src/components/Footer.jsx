
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
  Heart,
} from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const footerLinks = {
    support: [
      { name: "Contact Us", path: "/contactus" },
      { name: "Returns", path: "/CancellationandRefund" },
      { name: "Terms And Conditions", path: "/terms-and-conditions" },
      { name: "Shipping & Delivery", path: "/ShippingAndDelivery" },
    ],
    company: [
      { name: "About Us", path: "/aboutus" },
      { name: "Disclaimer", path: "/disclaimer" },
      { name: "Privacy Policy", path: "/PrivacyPolicy" },
      { name: "Payment Options", path: "/PaymentOptions" },
    ],
  };

  const socialLinks = [
    {
      name: "Facebook",
      href: "https://www.facebook.com/Darshpage",
      icon: Facebook,
      background: "bg-[#1877F2]",
      hover: "hover:bg-[#0d65d9]",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/darsh_bysathi/",
      icon: Instagram,
      background:
        "bg-gradient-to-tr from-[#FCAF45] via-[#E1306C] to-[#833AB4]",
      hover:
        "hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888]",
    },
    {
      name: "YouTube",
      href: "https://youtube.com/@darsh7901?si=6uplC1BKqxBEYZbt",
      icon: Youtube,
      background: "bg-[#FF0000]",
      hover: "hover:bg-[#d90000]",
    },
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email.trim() || isSubmitting) return;

    setIsSubmitting(true);

    // Connect your actual newsletter API here.
    setTimeout(() => {
      console.log(`Subscribed with email: ${email}`);

      setSubscribed(true);
      setIsSubmitting(false);
      setEmail("");

      setTimeout(() => {
        setSubscribed(false);
      }, 4000);
    }, 1200);
  };

  return (
    <footer className="relative overflow-hidden bg-[#f4ecdf] text-[#3f1616] border-t border-[#741522]/10">

      {/* Decorative Background */}

      <div className="pointer-events-none absolute -left-48 -bottom-48 w-[520px] h-[520px] rounded-full border border-[#d4ad54]/10" />

      <div className="pointer-events-none absolute -right-48 -top-48 w-[520px] h-[520px] rounded-full border border-[#741522]/5" />

      {/* Main Footer */}

      <div className="relative z-10 max-w-[1180px] mx-auto px-5 sm:px-8 lg:px-10 py-14 sm:py-16 lg:py-20">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.7fr_1fr_1fr_1fr] gap-12 lg:gap-14">

          {/* DARSH BRAND */}

          <div className="lg:pr-8 animate-[fadeIn_0.8s_ease-out]">

            <Link to="/" className="inline-block group">

              <h2 className="font-serif font-normal text-[#741522] text-[30px] sm:text-[34px] tracking-[0.2em] leading-none transition-all duration-500 group-hover:tracking-[0.28em]">
                DARSH
              </h2>

            </Link>

            <p className="mt-4 text-[7px] sm:text-[8px] tracking-[0.34em] uppercase text-[#806c63]">
              HANDWOVEN SAREES · KANCHIPURAM · INDIA
            </p>

            <p className="mt-7 max-w-[380px] text-[10px] sm:text-[11px] leading-6 text-[#806c63]">
              Premium products with unbeatable prices.
              Experience fast shipping and outstanding service.
            </p>

            {/* CONTACT INFORMATION */}

            <div className="mt-7 space-y-4">

              <a
                href="tel:+919907804710"
                className="group flex items-center gap-3 text-[10px] text-[#5e4941] hover:text-[#741522] transition-colors"
              >
                <Phone
                  size={15}
                  strokeWidth={1.2}
                  className="text-[#d4ad54]"
                />
                <span>+91 9907804710</span>
              </a>

              <a
                href="mailto:contactdarsh22@gmail.com"
                className="group flex items-center gap-3 text-[10px] text-[#5e4941] hover:text-[#741522] transition-colors"
              >
                <Mail
                  size={15}
                  strokeWidth={1.2}
                  className="text-[#d4ad54]"
                />
                <span className="break-all">
                  contactdarsh22@gmail.com
                </span>
              </a>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Patrasayer%2C+Bankura%2C+West+Bengal+722206"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 text-[10px] leading-5 text-[#5e4941] hover:text-[#741522] transition-colors"
              >
                <MapPin
                  size={15}
                  strokeWidth={1.2}
                  className="mt-0.5 shrink-0 text-[#d4ad54]"
                />

                <span>
                  Patrasayer, Bankura, West Bengal 722206
                </span>
              </a>

            </div>

            {/* SOCIAL MEDIA - ALWAYS BRAND COLORS */}

            <div className="mt-8">

              <p className="text-[8px] tracking-[0.3em] uppercase text-[#977e73] mb-4">
                FOLLOW DARSH
              </p>

              <div className="flex items-center gap-3">

                {socialLinks.map((social) => {
                  const Icon = social.icon;

                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Follow Darsh on ${social.name}`}
                      title={social.name}
                      className={`
                        group
                        relative
                        w-10 h-10
                        rounded-xl
                        flex items-center justify-center
                        text-white
                        shadow-md
                        transition-all duration-300 ease-out
                        hover:-translate-y-1
                        hover:scale-110
                        hover:shadow-xl
                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-[#741522]
                        focus-visible:ring-offset-2
                        ${social.background}
                        ${social.hover}
                      `}
                    >
                      <Icon
                        size={18}
                        strokeWidth={2}
                        className="transition-transform duration-300 group-hover:scale-110"
                      />

                    </a>
                  );
                })}

              </div>

              <p className="mt-3 text-[9px] text-[#977e73] tracking-wide">
                Stay connected with our latest collections.
              </p>

            </div>

          </div>

          {/* SUPPORT */}

          <FooterColumn
            title="SUPPORT"
            links={footerLinks.support}
          />

          {/* COMPANY */}

          <FooterColumn
            title="COMPANY"
            links={footerLinks.company}
          />

          {/* WHY SHOP WITH US */}

          <div>

            <h3 className="text-[7px] sm:text-[8px] tracking-[0.35em] uppercase text-[#977e73] mb-6">
              WHY SHOP WITH US
            </h3>

            <div className="space-y-5">

              <Feature
                icon={Truck}
                title="Fast Shipping"
                text="On all orders over 1000"
              />

              <Feature
                icon={Shield}
                title="Secure Payments"
                text="Advanced SSL encryption"
              />

              <Feature
                icon={Star}
                title="Quality Guaranteed"
                text="100% satisfaction policy"
              />

            </div>

          </div>

        </div>

        {/* NEWSLETTER */}

        <div className="mt-14 pt-8 border-t border-[#741522]/10">

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-7 items-center">

            <div>

              <p className="text-[7px] tracking-[0.35em] uppercase text-[#977e73] mb-2">
                STAY CONNECTED
              </p>

              <h3 className="font-serif text-[24px] sm:text-[28px] text-[#3f1616]">
                New drops, directly to you.
              </h3>

              <p className="mt-2 text-[9px] sm:text-[10px] text-[#806c63]">
                Subscribe for special offers, giveaways, and updates.
              </p>

            </div>

            <div>

              {subscribed ? (

                <div className="h-12 border border-[#741522]/20 bg-[#fbf8f2] flex items-center justify-center gap-3">

                  <CheckCircle
                    size={17}
                    className="text-[#741522]"
                  />

                  <span className="text-[9px] tracking-[0.18em] uppercase text-[#741522]">
                    Successfully Subscribed!
                  </span>

                </div>

              ) : (

                <form
                  onSubmit={handleSubscribe}
                  className="flex w-full"
                >

                  <input
                    type="email"
                    placeholder="Email for new drops"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isSubmitting}
                    className="flex-1 min-w-0 h-12 px-4 bg-[#fbf8f2] border border-[#741522]/15 border-r-0 outline-none text-[10px] sm:text-[11px] text-[#3f1616] placeholder:text-[#a6948b] focus:border-[#741522] transition-colors"
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-12 px-6 sm:px-8 bg-[#741522] text-[#f4ecdf] text-[7px] sm:text-[8px] tracking-[0.25em] uppercase transition-all duration-300 hover:bg-[#d4ad54] hover:text-[#741522] disabled:opacity-60"
                  >
                    {isSubmitting ? "SUBSCRIBING..." : "JOIN"}
                  </button>

                </form>

              )}

            </div>

          </div>

        </div>

      </div>

      {/* COPYRIGHT / POLICY BAR */}

      <div className="relative z-10 border-t border-[#741522]/10">

        <div className="max-w-[1180px] mx-auto px-5 sm:px-8 lg:px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-[8px] sm:text-[9px] text-[#806c63] text-center md:text-left">
            © {new Date().getFullYear()} Darsh. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-2">

            <Link to="/PrivacyPolicy" className="FooterPolicyLink">
              Privacy Policy
            </Link>

            <Link to="/terms-and-conditions" className="FooterPolicyLink">
              Terms of Service
            </Link>

            <Link to="/CancellationandRefund" className="FooterPolicyLink">
              Returns Policy
            </Link>

          </div>

          <p className="flex items-center gap-1 text-[8px] text-[#977e73]">
            Made with
            <Heart size={10} className="text-[#741522] fill-[#741522]" />
            for Darsh
          </p>

        </div>

      </div>

      {/* STYLES */}

      <style>{`
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
          transition: color 300ms ease, letter-spacing 300ms ease;
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
      `}</style>

    </footer>
  );
}

/* FOOTER COLUMN */

const FooterColumn = ({ title, links }) => {
  return (
    <div>

      <h3 className="text-[7px] sm:text-[8px] tracking-[0.35em] uppercase text-[#977e73] mb-6">
        {title}
      </h3>

      <ul className="space-y-4">

        {links.map((link) => (
          <li key={link.name}>

            <Link
              to={link.path}
              className="group inline-flex items-center gap-2 text-[10px] sm:text-[11px] text-[#5e4941] hover:text-[#741522] transition-colors duration-300"
            >
              {link.name}

              <ArrowUpRight
                size={11}
                strokeWidth={1}
                className="opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 text-[#d4ad54]"
              />

            </Link>

          </li>
        ))}

      </ul>

    </div>
  );
};

/* FEATURE */

const Feature = ({ icon: Icon, title, text }) => {
  return (
    <div className="group flex items-start gap-3">

      <div className="w-8 h-8 shrink-0 border border-[#d4ad54]/50 flex items-center justify-center text-[#741522] group-hover:bg-[#741522] group-hover:text-[#d4ad54] transition-all duration-300">

        <Icon size={14} strokeWidth={1.2} />

      </div>

      <div>

        <h4 className="font-serif text-[14px] text-[#3f1616]">
          {title}
        </h4>

        <p className="mt-1 text-[8px] sm:text-[9px] leading-4 text-[#806c63]">
          {text}
        </p>

      </div>

    </div>
  );
};
