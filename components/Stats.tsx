"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const stats = [
  { number: "2,400", label: "Members" },
  { number: "38", label: "Elite Coaches" },
  { number: "6AM–11PM", label: "Open Daily" },
  { number: "0", label: "Excuses Tolerated" },
];

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const isDesktop = window.innerWidth >= 768;

    if (!isDesktop) return;

    if (containerRef.current) {
      containerRef.current.style.width = `${stats.length * 100}vw`;
      containerRef.current.style.display = "flex";
    }

    const ctx = gsap.context(() => {
      gsap.to(containerRef.current, {
        x: () => -(stats.length - 1) * window.innerWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${(stats.length - 1) * window.innerWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-apex-black overflow-hidden">
      <div ref={containerRef} className="flex flex-col md:flex-row">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="w-full md:w-screen h-screen flex flex-col items-center justify-center bg-apex-black border-b md:border-b-0 md:border-r border-apex-white/5 relative"
          >
            {/* Panel number */}
            <div className="mb-2">
              <span className="font-bebas text-[20vw] md:text-[15vw] text-apex-gold leading-none block text-center">
                {stat.number}
              </span>
            </div>
            <span className="font-inter text-xs md:text-sm uppercase tracking-[0.5em] text-apex-white/60 text-center">
              {stat.label}
            </span>

            {/* Panel index */}
            <span className="absolute bottom-10 right-10 font-bebas text-8xl text-apex-white/[0.03] select-none">
              0{i + 1}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
