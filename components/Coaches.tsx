"use client";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";

const coaches = [
  {
    name: "Jin-Ho Park",
    specialty: "Strength & Olympic Lifting",
    bio: "Korean national weightlifting champion. Trained under the Korean Olympic programme before bringing elite barbell science to Sandton.",
    image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=600&q=80",
  },
  {
    name: "Sarah Mitchell",
    specialty: "Conditioning & Mobility",
    bio: "Former Comrades top-10 finisher turned APEX head of conditioning. She builds engines that last and bodies that move pain-free.",
    image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=600&q=80",
  },
  {
    name: "Themba Ndlovu",
    specialty: "Combat & Functional Training",
    bio: "Ex-professional heavyweight boxer and certified Functional Patterns coach. Combines fight conditioning with structural correction.",
    image: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&q=80",
  },
];

function CoachCard({ coach }: { coach: (typeof coaches)[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springX = useSpring(rawX, { stiffness: 80, damping: 18 });
  const springY = useSpring(rawY, { stiffness: 80, damping: 18 });

  const rotateY = useTransform(springX, [-0.5, 0.5], ["-10deg", "10deg"]);
  const rotateX = useTransform(springY, [-0.5, 0.5], ["10deg", "-10deg"]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative aspect-[3/4] overflow-hidden group"
    >
      <Image
        src={coach.image}
        alt={coach.name}
        fill
        className="object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-apex-black via-apex-black/20 to-transparent" />

      <div
        className="absolute bottom-0 left-0 right-0 p-8"
        style={{ transform: "translateZ(30px)" }}
      >
        <p className="font-cormorant text-base italic text-apex-gold mb-2">{coach.specialty}</p>
        <h3 className="font-bebas text-3xl text-apex-white mb-3 leading-tight">{coach.name}</h3>
        <p className="font-inter text-sm text-apex-white/55 leading-relaxed">{coach.bio}</p>
      </div>
    </motion.div>
  );
}

export default function Coaches() {
  return (
    <section id="coaches" className="bg-apex-black py-28 px-8 md:px-16 lg:px-24">
      <div className="mb-20">
        <p className="font-inter text-[11px] uppercase tracking-[0.4em] text-apex-gold mb-4">
          The Team
        </p>
        <h2 className="font-bebas text-7xl md:text-9xl text-apex-white leading-none">
          ELITE
          <br />
          COACHES.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5" style={{ perspective: "1200px" }}>
        {coaches.map((coach, i) => (
          <CoachCard key={i} coach={coach} />
        ))}
      </div>
    </section>
  );
}
