"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const MANIFESTO =
  "At APEX we don't believe in average. We believe in showing up before the sun rises. In pushing past the point where most people stop. In building a body and a mind that nothing can break. This is not a gym. This is a standard.";

export default function Manifesto() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);

  const words = MANIFESTO.split(" ");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const wordEls = wordsRef.current.filter(Boolean) as HTMLSpanElement[];
    const total = wordEls.length;

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: () => `+=${window.innerHeight * 4}`,
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        const activeIndex = Math.floor(self.progress * total);
        wordEls.forEach((word, i) => {
          if (i < activeIndex) {
            word.style.opacity = "1";
            word.style.color = "#F0EDE8";
          } else if (i === activeIndex) {
            word.style.opacity = "1";
            word.style.color = "#C8890D";
          } else {
            word.style.opacity = "0.15";
            word.style.color = "#F0EDE8";
          }
        });
      },
    });

    return () => st.kill();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-apex-black flex items-center justify-center min-h-screen px-8 md:px-20 lg:px-32"
    >
      <div className="max-w-5xl mx-auto">
        <p className="font-inter text-[11px] uppercase tracking-[0.4em] text-apex-gold mb-12 text-center">
          The Standard
        </p>
        <p className="font-bebas text-4xl md:text-6xl lg:text-[4.5rem] leading-tight tracking-wide text-center">
          {words.map((word, i) => (
            <span
              key={i}
              ref={(el) => { wordsRef.current[i] = el; }}
              className="inline-block mr-[0.28em] last:mr-0"
              style={{ opacity: 0.15, color: "#F0EDE8", transition: "none" }}
            >
              {word}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
