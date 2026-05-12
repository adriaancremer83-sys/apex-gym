"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const LINE1 = "YOUR FIRST SESSION";
const LINE2 = "IS FREE.";

export default function CTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLHeadingElement>(null);
  const line2Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const letters1 = line1Ref.current?.querySelectorAll(".cta-letter");
      const letters2 = line2Ref.current?.querySelectorAll(".cta-letter");

      if (letters1?.length) {
        gsap.fromTo(
          letters1,
          { opacity: 0, filter: "blur(18px)" },
          {
            opacity: 1,
            filter: "blur(0px)",
            stagger: 0.035,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 65%",
              end: "center 40%",
              scrub: 0.8,
            },
          }
        );
      }

      if (letters2?.length) {
        gsap.fromTo(
          letters2,
          { opacity: 0, filter: "blur(18px)" },
          {
            opacity: 1,
            filter: "blur(0px)",
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 45%",
              end: "center 25%",
              scrub: 0.8,
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen bg-apex-black flex flex-col items-center justify-center px-8 overflow-hidden"
    >
      {/* Background noise texture */}
      <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(ellipse_at_center,_#C8890D_0%,_transparent_70%)]" />

      <div className="relative z-10 text-center">
        <h2
          ref={line1Ref}
          className="font-bebas text-[9vw] leading-none text-apex-white mb-0"
        >
          {LINE1.split("").map((char, i) => (
            <span key={i} className="cta-letter inline-block">
              {char === " " ? " " : char}
            </span>
          ))}
        </h2>
        <h2
          ref={line2Ref}
          className="font-bebas text-[9vw] leading-none text-apex-gold mb-14"
        >
          {LINE2.split("").map((char, i) => (
            <span key={i} className="cta-letter inline-block">
              {char === " " ? " " : char}
            </span>
          ))}
        </h2>

        <p className="font-cormorant text-xl md:text-2xl italic text-apex-white/60 mb-14 tracking-wide">
          No contracts. No excuses. Just results.
        </p>

        <button className="group relative border border-apex-gold text-apex-gold font-inter text-[11px] uppercase tracking-[0.35em] px-14 py-5 overflow-hidden transition-colors duration-500 hover:text-apex-black">
          <span className="relative z-10">Claim Your Free Session</span>
          {/* Fill on hover */}
          <span className="absolute inset-0 bg-apex-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
          {/* Shimmer sweep */}
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 delay-100 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        </button>
      </div>
    </section>
  );
}
