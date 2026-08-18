import React from "react";
import {
  Truck,
  Clock3,
  MapPin,
  PackageCheck,
  ShieldCheck,
  CircleHelp,
  Mail,
  Phone,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";

const ShippingAndDelivery = () => {
  const shippingSections = [
    {
      number: "01",
      icon: Clock3,
      title: "Processing Time",
      text: "All orders are shipped within 2-3 business days and delivered within 7-10 business days. Orders are not shipped or delivered on weekends or holidays. If we are experiencing a high volume of orders, shipments may be delayed by a few days. Please allow additional days in transit for delivery.",
    },
    {
      number: "02",
      icon: MapPin,
      title: "Shipping Rates & Delivery Estimates",
      text: "Shipping charges for your order will be calculated and displayed at checkout. Delivery delays can occasionally occur, depending on your location and other factors.",
    },
    {
      number: "03",
      icon: PackageCheck,
      title: "Shipment Confirmation & Order Tracking",
      text: "You will receive a Shipment Confirmation email once your order has shipped containing your tracking number(s). The tracking number will be active within 24 hours.",
    },
    {
      number: "04",
      icon: ShieldCheck,
      title: "Customs, Duties, and Taxes",
      text: "We are not responsible for any customs and taxes applied to your order. All fees imposed during or after shipping are the responsibility of the customer (tariffs, taxes, etc.).",
    },
    {
      number: "05",
      icon: PackageCheck,
      title: "Damages",
      text: "We are not liable for any products damaged or lost during shipping. If you received your order damaged, please contact the shipment carrier to file a claim (video of package unboxing is mandatory). Save all packaging materials and damaged goods before filing a claim.",
    },
    {
      number: "06",
      icon: CircleHelp,
      title: "Contact Information",
      text: "If you have any questions about these Terms, please contact us at: darshsathi@gmail.com or +91 9907804710",
    },
  ];

  const timeline = [
    {
      step: "01",
      title: "Order placed",
      text: "Your order is received and confirmed.",
    },
    {
      step: "02",
      title: "Order processed",
      text: "Your product is carefully prepared for dispatch.",
    },
    {
      step: "03",
      title: "Order shipped",
      text: "Your shipment is handed over to the delivery carrier.",
    },
    {
      step: "04",
      title: "Delivered",
      text: "Your order arrives at your delivery address.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#faf9f7] text-[#29231f]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#171310]">
        {/* Decorative background */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#c99545]/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-[#c99545]/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#c99545]/30 bg-[#c99545]/10">
              <Truck className="h-8 w-8 text-[#d9aa5d]" />
            </div>

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#d9aa5d]">
              Darsh Delivery
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Shipping & Delivery
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
              We are committed to delivering your order as quickly as
              possible. Please review our shipping and delivery policies
              below.
            </p>
          </motion.div>
        </div>
      </section>

      {/* QUICK INFO */}
      <section className="relative mx-auto -mt-7 max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="grid overflow-hidden rounded-2xl border border-[#e8e2dc] bg-white shadow-xl shadow-black/[0.06] sm:grid-cols-3"
        >
          <div className="flex items-center gap-3 border-b border-[#eee8e2] p-5 sm:border-b-0 sm:border-r">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f8f1e7]">
              <Clock3 className="h-5 w-5 text-[#a97932]" />
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-wide text-[#9a8f86]">
                Processing
              </p>
              <p className="mt-1 text-sm font-semibold">
                2-3 Business Days
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 border-b border-[#eee8e2] p-5 sm:border-b-0 sm:border-r">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f8f1e7]">
              <Truck className="h-5 w-5 text-[#a97932]" />
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-wide text-[#9a8f86]">
                Delivery
              </p>
              <p className="mt-1 text-sm font-semibold">
                7-10 Business Days
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f8f1e7]">
              <PackageCheck className="h-5 w-5 text-[#a97932]" />
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-wide text-[#9a8f86]">
                Tracking
              </p>
              <p className="mt-1 text-sm font-semibold">
                Available After Dispatch
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* INTRO */}
      <section className="mx-auto max-w-4xl px-4 pb-4 pt-14 sm:px-6 lg:px-8 lg:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a97932]">
            Delivery information
          </p>

          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
            Everything you need to know
          </h2>

          <div className="mx-auto mt-4 h-px w-16 bg-[#c99545]" />
        </motion.div>
      </section>

      {/* TIMELINE */}
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-4">
          {timeline.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              className="group relative rounded-2xl border border-[#e8e2dc] bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-[#d6bd98] hover:shadow-lg hover:shadow-black/[0.04]"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-[#e8ddd0]">
                  {item.step}
                </span>

                {index < timeline.length - 1 && (
                  <ChevronRight className="hidden h-4 w-4 text-[#c99545] md:block" />
                )}
              </div>

              <h3 className="mt-4 text-sm font-bold">
                {item.title}
              </h3>

              <p className="mt-2 text-xs leading-5 text-[#82776f]">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* MAIN POLICY */}
      <main className="mx-auto max-w-4xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <div className="space-y-4">
          {shippingSections.map((section, index) => {
            const Icon = section.icon;

            return (
              <motion.article
                key={section.number}
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
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.04,
                }}
                className="group overflow-hidden rounded-2xl border border-[#e8e2dc] bg-white transition duration-300 hover:-translate-y-0.5 hover:border-[#d6bd98] hover:shadow-xl hover:shadow-black/[0.04]"
              >
                <div className="flex gap-4 p-5 sm:gap-5 sm:p-7">
                  {/* Number */}
                  <div className="hidden shrink-0 sm:block">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f8f1e7] text-xs font-bold text-[#a97932]">
                      {section.number}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f8f1e7] sm:hidden">
                        <Icon className="h-5 w-5 text-[#a97932]" />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <Icon className="hidden h-4 w-4 text-[#b08443] sm:block" />

                          <h2 className="text-base font-bold text-[#302923] sm:text-lg">
                            {section.title}
                          </h2>
                        </div>

                        <p className="mt-3 text-sm leading-7 text-[#746b64]">
                          {section.text}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </main>

      {/* IMPORTANT DELIVERY NOTE */}
      <section className="border-y border-[#e7ded4] bg-[#f5efe8]">
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-[#dec9ae] bg-white/70 p-5 sm:p-7"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#a97932]">
                <ShieldCheck className="h-5 w-5 text-white" />
              </div>

              <div>
                <h2 className="text-base font-bold text-[#302923] sm:text-lg">
                  Important: Damaged package?
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#746b64]">
                  Please keep the package, packaging materials and damaged
                  product safely. A video of the package unboxing is mandatory
                  when reporting a damaged delivery.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="bg-[#171310]">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 lg:px-8 lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d9aa5d]">
              Need assistance?
            </p>

            <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              We're here to help
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-zinc-400">
              If you have any questions about shipping or delivery, please
              contact our support team.
            </p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="mailto:darshsathi@gmail.com"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#c99545] px-5 text-sm font-semibold text-white transition hover:bg-[#d9aa5d] active:scale-[0.98]"
              >
                <Mail className="h-4 w-4" />
                darshsathi@gmail.com
              </a>

              <a
                href="tel:+919907804710"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 text-sm font-semibold text-zinc-200 transition hover:bg-white/[0.08] active:scale-[0.98]"
              >
                <Phone className="h-4 w-4" />
                +91 9907804710
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ShippingAndDelivery;