"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

const programs = [
  {
    title: "APEX Strength",
    description: "Iron will, iron body. Progressive overload programming for maximal strength gains.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
  },
  {
    title: "APEX Conditioning",
    description: "High-intensity metabolic training that builds engines, not excuses.",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80",
  },
  {
    title: "Combat Training",
    description: "Boxing, MMA fundamentals, and functional combat conditioning.",
    image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800&q=80",
  },
  {
    title: "Olympic Lifting",
    description: "Technical mastery of the snatch and clean & jerk under elite coaching.",
    image: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=800&q=80",
  },
  {
    title: "Recovery & Mobility",
    description: "The work that lets you keep working. Structured recovery for elite performers.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
  },
  {
    title: "Personal Coaching",
    description: "One-on-one with Sandton's finest. Your goals, your program, your timeline.",
    image: "https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?w=800&q=80",
  },
];

export default function Programs() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".program-card");

      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            delay: (i % 3) * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="programs" className="bg-apex-black py-28 px-8 md:px-16 lg:px-24">
      <div className="mb-20">
        <p className="font-inter text-[11px] uppercase tracking-[0.4em] text-apex-gold mb-4">
          Training Programs
        </p>
        <h2 className="font-bebas text-7xl md:text-9xl text-apex-white leading-none">
          BUILT FOR
          <br />
          RESULTS.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0.5">
        {programs.map((program, i) => (
          <div
            key={i}
            className="program-card group relative aspect-[4/5] overflow-hidden"
          >
            <Image
              src={program.image}
              alt={program.title}
              fill
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-apex-black via-apex-black/50 to-transparent" />

            {/* Gold border on hover */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-apex-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left" />

            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h3 className="font-bebas text-4xl text-apex-white mb-2 transition-transform duration-500 group-hover:-translate-y-1">
                {program.title}
              </h3>
              <p className="font-inter text-sm text-apex-white/55 leading-relaxed">
                {program.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
