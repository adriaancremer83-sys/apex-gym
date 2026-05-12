"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = ["Programs", "Coaches", "Membership"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-6 transition-colors duration-500"
        style={{
          backgroundColor: scrolled ? "rgba(5,5,5,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
        }}
      >
        <span className="font-bebas text-3xl tracking-widest text-apex-white select-none">
          APEX
        </span>

        <div className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="font-inter text-[11px] uppercase tracking-[0.25em] text-apex-white/60 hover:text-apex-gold transition-colors duration-300"
            >
              {l}
            </a>
          ))}
          <a
            href="#membership"
            className="border border-apex-gold text-apex-gold font-inter text-[11px] uppercase tracking-[0.25em] px-6 py-3 hover:bg-apex-gold hover:text-apex-black transition-all duration-300"
          >
            Join Now
          </a>
        </div>

        <button
          className="md:hidden flex flex-col justify-center gap-[6px] w-8 h-8"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span
            className={`block h-px bg-apex-white transition-all duration-300 origin-center ${open ? "rotate-45 translate-y-[7px] w-7" : "w-7"}`}
          />
          <span
            className={`block h-px bg-apex-white transition-all duration-300 ${open ? "opacity-0 w-7" : "w-5"}`}
          />
          <span
            className={`block h-px bg-apex-white transition-all duration-300 origin-center ${open ? "-rotate-45 -translate-y-[7px] w-7" : "w-7"}`}
          />
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 bg-apex-black flex flex-col items-center justify-center gap-10 md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            {[...links, "Contact"].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className="font-bebas text-7xl text-apex-white hover:text-apex-gold transition-colors duration-300"
              >
                {l}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
