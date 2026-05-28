"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function RadarGrid() {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    setMounted(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, .cursor-pointer")) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!mounted) return null;

  return (
    <>
      <style jsx global>{`
        body, a, button, .cursor-pointer { cursor: none !important; }
      `}</style>

      {/* Main Tactical Crosshair */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ x: smoothX, y: smoothY, translateX: "-50%", translateY: "-50%" }}
      >
        {/* Core Blue Sensor Dot */}
        <div className="w-1.5 h-1.5 rounded-full bg-[#007aff] shadow-[0_0_8px_#007aff]" />

        {/* Inner Aiming Ring */}
        <motion.div 
          animate={{ scale: isHovered ? 1.4 : 1 }}
          className="absolute -inset-2.5 border border-[#007aff]/40 rounded-full transition-transform duration-300"
        />

        {/* External Intersect Frame */}
        <motion.div 
          animate={{ 
            width: isHovered ? 36 : 24, 
            height: isHovered ? 36 : 24,
            borderColor: isHovered ? "#daff9a" : "#007aff" 
          }}
          className="absolute -translate-x-1/2 -translate-y-1/2 border border-dashed rounded-[2px] opacity-60 transition-all duration-300"
          style={{ top: "3px", left: "3px" }}
        />
      </motion.div>
    </>
  );
}