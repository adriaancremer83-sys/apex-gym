"use client";
import { motion } from "framer-motion";

const plans = [
  {
    name: "APEX Essential",
    price: "R899",
    featured: false,
    features: [
      "Full gym access",
      "Group classes (10/month)",
      "Locker room & shower access",
      "Fitness assessment",
      "APEX app access",
    ],
  },
  {
    name: "APEX Pro",
    price: "R1,499",
    featured: true,
    features: [
      "Full gym access — unlimited",
      "All group classes",
      "Monthly 1-on-1 coaching session",
      "Nutrition guidance",
      "Priority class booking",
      "Guest passes (2/month)",
    ],
  },
  {
    name: "APEX Elite",
    price: "R2,200",
    featured: false,
    features: [
      "Everything in Pro",
      "Weekly private coaching sessions",
      "Custom programming",
      "Recovery suite access",
      "Unlimited guest passes",
      "Direct coach line",
    ],
  },
];

export default function Membership() {
  return (
    <section id="membership" className="bg-apex-black py-28 px-8 md:px-16 lg:px-24">
      <div className="mb-20">
        <p className="font-inter text-[11px] uppercase tracking-[0.4em] text-apex-gold mb-4">
          Membership
        </p>
        <h2 className="font-bebas text-7xl md:text-9xl text-apex-white leading-none">
          CHOOSE YOUR
          <br />
          STANDARD.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        {plans.map((plan, i) => (
          <motion.div
            key={i}
            className={`relative p-10 border transition-all duration-300 ${
              plan.featured
                ? "border-apex-gold bg-apex-surface md:scale-105 md:-my-2"
                : "border-apex-white/10 bg-apex-surface/40 hover:border-apex-white/25"
            }`}
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: i * 0.12, ease: [0.76, 0, 0.24, 1] }}
          >
            {plan.featured && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <span className="bg-apex-gold text-apex-black font-inter text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1.5">
                  Most Popular
                </span>
              </div>
            )}

            <p className="font-inter text-[10px] uppercase tracking-[0.3em] text-apex-gold mb-4">
              {plan.name}
            </p>
            <div className="flex items-baseline gap-2 mb-8">
              <span className="font-bebas text-6xl text-apex-white leading-none">{plan.price}</span>
              <span className="font-inter text-xs text-apex-white/40">/month</span>
            </div>

            <ul className="space-y-4 mb-10">
              {plan.features.map((feature, j) => (
                <li key={j} className="flex items-start gap-3">
                  <span className="text-apex-gold mt-px leading-none">✓</span>
                  <span className="font-inter text-[13px] text-apex-white/65 leading-snug">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              className={`w-full py-4 font-inter text-[11px] uppercase tracking-[0.3em] transition-all duration-300 ${
                plan.featured
                  ? "bg-apex-gold text-apex-black hover:bg-apex-white"
                  : "border border-apex-gold text-apex-gold hover:bg-apex-gold hover:text-apex-black"
              }`}
            >
              Start Today
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
