"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function InitialLoader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if we've already shown the loader in this session
    const hasLoaded = sessionStorage.getItem("norie_initial_loaded");
    if (hasLoaded) {
      setLoading(false);
      return;
    }

    // Simulate loading progress
    const duration = 2000; // 2 seconds total loading
    const intervalTime = 20; // update every 20ms
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const currentProgress = Math.min(Math.floor((currentStep / steps) * 100), 100);
      setProgress(currentProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          setLoading(false);
          sessionStorage.setItem("norie_initial_loaded", "true");
        }, 400); // slight pause at 100%
      }
    }, intervalTime);

    // Lock body scroll while loading
    document.body.style.overflow = "hidden";

    return () => {
      clearInterval(timer);
      document.body.style.overflow = "";
    };
  }, []);

  // Unlock scroll when loading finishes
  useEffect(() => {
    if (!loading) {
      document.body.style.overflow = "";
    }
  }, [loading]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="initial-loader"
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center pointer-events-auto"
          style={{ background: "#0a0a0a", color: "#f0ece4" }}
          initial={{ y: "0%" }}
          exit={{ 
            y: "-100%", 
            transition: { duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.2 } 
          }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
            <motion.span
              className="font-black uppercase tracking-widest leading-none mb-8"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(60px, 15vw, 250px)",
                letterSpacing: "-0.02em",
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              NORIE
            </motion.span>
            
            <div className="flex flex-col items-center gap-2">
              <span 
                className="font-bold text-sm tracking-widest"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                {progress}%
              </span>
              <div className="w-48 h-[1px] bg-[rgba(240,236,228,0.2)] relative overflow-hidden">
                <motion.div 
                  className="absolute top-0 left-0 bottom-0 bg-[#e8291c]"
                  style={{ width: `${progress}%` }}
                  layout
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
