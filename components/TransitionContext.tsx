"use client";

import { createContext, useContext, useState, ReactNode, useEffect, Suspense } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const TransitionContext = createContext<{ navigate: (url: string) => void }>({ navigate: () => {} });

export function TransitionProvider({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<>{children}</>}>
      <TransitionProviderContent>{children}</TransitionProviderContent>
    </Suspense>
  );
}

function TransitionProviderContent({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // We use this to trigger the overlay manually
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [destinationUrl, setDestinationUrl] = useState<string | null>(null);

  const navigate = (url: string) => {
    if (url === window.location.pathname + window.location.search) return; // Same page
    setIsTransitioning(true);
    setDestinationUrl(url);
    // Push the route as soon as the screen is fully covered (1.5s)
    setTimeout(() => {
      router.push(url);
    }, 1500);
  };

  // When pathname or searchParams change, hold the text briefly, then slide out speedily
  useEffect(() => {
    if (isTransitioning) {
      const t = setTimeout(() => {
        setIsTransitioning(false);
        setDestinationUrl(null);
      }, 800);
      return () => clearTimeout(t);
    }
  }, [pathname, searchParams, isTransitioning]);

  // Global link interceptor
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (target && target.href && target.target !== "_blank" && target.origin === window.location.origin) {
        e.preventDefault();
        // Ignore anchor links on the same page
        const url = new URL(target.href);
        if (url.pathname === window.location.pathname && url.hash) {
           window.location.hash = url.hash;
           return;
        }
        navigate(target.href);
      }
    };
    
    document.addEventListener("click", handleClick, { capture: true });
    return () => document.removeEventListener("click", handleClick, { capture: true });
  }, [navigate]);

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}

      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center pointer-events-none"
            style={{ background: "#0a0a0a" }}
            initial={{ y: "100%" }}
            animate={{ y: "0%", transition: { duration: 1.5, ease: [0.76, 0, 0.24, 1] } }}
            exit={{ y: "-100%", transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }}
          >
            <motion.span
              className="text-white font-black uppercase tracking-widest leading-none"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(60px, 15vw, 250px)",
                letterSpacing: "-0.02em",
              }}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1.05 }}
              transition={{ duration: 5, ease: "linear" }}
            >
              NORIE
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
}

export const useTransition = () => useContext(TransitionContext);
