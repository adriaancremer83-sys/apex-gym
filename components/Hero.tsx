"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

const SCENE_IMAGES = [
  "/videos/hero1.mp4",
  "/videos/hero2.mp4",
  "/videos/hero3.mp4",
];

export default function Hero() {
  const outerRef = useRef<HTMLDivElement>(null);

  // Image layer refs
  const img1Ref = useRef<HTMLDivElement>(null);
  const img1ZoomRef = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);
  const img3Ref = useRef<HTMLDivElement>(null);

  // Text refs
  const scene1TextRef = useRef<HTMLDivElement>(null);
  const builtRef = useRef<HTMLHeadingElement>(null);
  const differentRef = useRef<HTMLHeadingElement>(null);
  const apexRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: outerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      // ─── SCENE 1 (0 – 3.3) ──────────────────────────
      // Slow zoom on image 1
      tl.to(img1ZoomRef.current, { scale: 1.08, ease: "none", duration: 3.3 }, 0);
      // Fade scroll indicator out
      tl.to(scrollIndicatorRef.current, { opacity: 0, duration: 0.4 }, 0.5);
      // Scene 1 text fades in
      tl.fromTo(
        scene1TextRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        0.4
      );
      // Scene 1 text exits with blur
      tl.to(
        scene1TextRef.current,
        { opacity: 0, filter: "blur(10px)", duration: 0.5, ease: "power2.in" },
        2.3
      );
      // Crossfade: image 1 → image 2
      tl.to(img1Ref.current, { opacity: 0, duration: 0.9 }, 2.6);

      // ─── SCENE 2 (3.3 – 6.6) ────────────────────────
      // Image 2 fades in
      tl.fromTo(img2Ref.current, { opacity: 0 }, { opacity: 1, duration: 0.9 }, 2.7);
      // BUILT slides in from left
      tl.fromTo(
        builtRef.current,
        { x: -90, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.65, ease: "power3.out" },
        3.4
      );
      // DIFFERENT. slams from right
      tl.fromTo(
        differentRef.current,
        { x: 90, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.45, ease: "power4.out" },
        3.75
      );
      // Scene 2 text exits
      tl.to(
        [builtRef.current, differentRef.current],
        { opacity: 0, filter: "blur(10px)", duration: 0.5, ease: "power2.in" },
        5.6
      );
      // Crossfade: image 2 → image 3
      tl.to(img2Ref.current, { opacity: 0, duration: 0.9 }, 5.8);

      // ─── SCENE 3 (6.6 – 10) ─────────────────────────
      // Image 3 fades in
      tl.fromTo(img3Ref.current, { opacity: 0 }, { opacity: 1, duration: 0.9 }, 5.9);
      // APEX. scales + fades in
      tl.fromTo(
        apexRef.current,
        { opacity: 0, scale: 0.94 },
        { opacity: 1, scale: 1, duration: 0.9, ease: "power2.out" },
        7.0
      );
      // Subtext slides up
      tl.fromTo(
        subtextRef.current,
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
        7.6
      );
      // CTA pulses in
      tl.fromTo(
        ctaRef.current,
        { scale: 0.88, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.55, ease: "back.out(1.6)" },
        8.2
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    // 300vh outer div — provides the scroll distance
    <div ref={outerRef} style={{ height: "300vh" }}>
      {/* Sticky inner — stays pinned at top, clips overflow */}
      <div className="sticky top-0 h-screen overflow-hidden bg-apex-black">

        {/* ── IMAGE LAYERS ────────────────────────── */}

        {/* Scene 1 — extreme close-up, hands on bar */}
        <div ref={img1Ref} className="absolute inset-0 z-0">
          <div ref={img1ZoomRef} className="absolute inset-0">
            <video autoPlay muted loop playsInline
  style={{position:'absolute',inset:0,
  width:'100%',height:'100%',
  objectFit:'cover',opacity:0.65}}>
  <source src={SCENE_IMAGES[0]} type="video/mp4"/>
</video>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-apex-black/80 via-apex-black/20 to-apex-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-apex-black/40 via-transparent to-transparent" />
        </div>

        {/* Scene 2 — pull-ups, back muscles */}
        <div ref={img2Ref} className="absolute inset-0 z-0 opacity-0">
          <video autoPlay muted loop playsInline
  style={{position:'absolute',inset:0,
  width:'100%',height:'100%',
  objectFit:'cover',opacity:0.65}}>
  <source src={SCENE_IMAGES[1]} type="video/mp4"/>
</video>
          <div className="absolute inset-0 bg-gradient-to-t from-apex-black/80 via-apex-black/20 to-apex-black/20" />
        </div>

        {/* Scene 3 — gym wide shot */}
        <div ref={img3Ref} className="absolute inset-0 z-0 opacity-0">
          <video autoPlay muted loop playsInline
  style={{position:'absolute',inset:0,
  width:'100%',height:'100%',
  objectFit:'cover',opacity:0.55}}>
  <source src={SCENE_IMAGES[2]} type="video/mp4"/>
</video>
          <div className="absolute inset-0 bg-gradient-to-t from-apex-black/90 via-apex-black/40 to-apex-black/20" />
        </div>

        {/* ── TEXT LAYERS ─────────────────────────── */}

        {/* Scene 1 — IT STARTS / WITH GRIP. */}
        <div
          ref={scene1TextRef}
          className="absolute inset-0 z-10 flex flex-col justify-end pb-28 px-8 md:px-16 lg:px-24 opacity-0"
          style={{ filter: "blur(0px)" }}
        >
          <h2 className="font-bebas text-[11vw] md:text-[8.5vw] leading-none text-apex-white">
            IT STARTS
          </h2>
          <h2 className="font-bebas text-[11vw] md:text-[8.5vw] leading-none text-apex-gold">
            WITH GRIP.
          </h2>
          <p className="font-cormorant text-lg md:text-2xl italic text-apex-white/55 mt-3">
            Every champion begins at the bar.
          </p>
        </div>

        {/* Scene 2 — BUILT / DIFFERENT. */}
        <div className="absolute inset-0 z-10 flex flex-col justify-end pb-28 px-8 md:px-16 lg:px-24 pointer-events-none">
          <h2
            ref={builtRef}
            className="font-bebas text-[13vw] md:text-[11vw] leading-none text-apex-white opacity-0"
            style={{ filter: "blur(0px)" }}
          >
            BUILT
          </h2>
          <h2
            ref={differentRef}
            className="font-bebas text-[13vw] md:text-[11vw] leading-none text-apex-gold opacity-0"
            style={{ filter: "blur(0px)" }}
          >
            DIFFERENT.
          </h2>
        </div>

        {/* Scene 3 — APEX. centered */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-8 pointer-events-none">
          <h2
            ref={apexRef}
            className="font-bebas text-[20vw] md:text-[15vw] leading-none text-apex-gold opacity-0 tracking-wider"
            style={{ filter: "blur(0px)" }}
          >
            APEX.
          </h2>
          <p
            ref={subtextRef}
            className="font-cormorant text-xl md:text-3xl italic text-apex-white/70 mt-2 opacity-0"
          >
            {"Sandton's most elite training facility."}
          </p>
          <button
            ref={ctaRef}
            className="pointer-events-auto mt-10 border border-apex-gold text-apex-gold font-inter text-[11px] uppercase tracking-[0.35em] px-12 py-4 opacity-0 hover:bg-apex-gold hover:text-apex-black transition-all duration-300"
          >
            Start Your Journey
          </button>
        </div>

        {/* Scroll indicator */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-10 left-8 md:left-16 z-20 flex flex-col items-start gap-3"
        >
          <span className="font-inter text-[10px] uppercase tracking-[0.35em] text-apex-white/35">
            Scroll
          </span>
          <div className="relative w-px h-12 bg-apex-white/10 overflow-hidden">
            <div
              className="absolute inset-x-0 top-0 h-1/2 bg-apex-gold"
              style={{ animation: "scrollPulse 1.6s ease-in infinite" }}
            />
          </div>
        </div>

        {/* APEX wordmark — top left always visible */}
        <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-8 md:px-16 py-7 pointer-events-none">
          <span className="font-bebas text-2xl tracking-widest text-apex-white/80 select-none">
            APEX
          </span>
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollPulse {
          0% { transform: translateY(0%); }
          100% { transform: translateY(200%); }
        }
      `}</style>
    </div>
  );
}
