"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const ringX = useSpring(mouseX, { damping: 20, stiffness: 150, mass: 0.8 });
  const ringY = useSpring(mouseY, { damping: 20, stiffness: 150, mass: 0.8 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [data-cursor-hover]")) setIsHovering(true);
    };

    const onOut = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [data-cursor-hover]")) setIsHovering(false);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="hidden md:block">
      {/* Gold dot — exact position */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          className="w-2 h-2 rounded-full bg-apex-gold"
          animate={{ scale: isHovering ? 0 : 1 }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>

      {/* Ring — spring lag */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          className="rounded-full border border-apex-gold"
          animate={{
            width: isHovering ? 52 : 32,
            height: isHovering ? 52 : 32,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </motion.div>
    </div>
  );
}
