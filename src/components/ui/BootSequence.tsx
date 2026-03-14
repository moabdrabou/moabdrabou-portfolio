import React, { useEffect, useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LOGS = [
  "> INITIALIZING OPERATOR_OS...",
  "> KERNEL_CHECK: OK",
  "> LOADING LOADOUT: REACT_JS / TypeScript / TAILWIND_CSS",
  "> DECRYPTING INTEL...",
  "> SYSTEM_READY // ACCESS_GRANTED",
];

const BootSequence: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [done, setDone] = useState(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const bootId = useMemo(() => Math.random().toString(16).substring(2, 10).toUpperCase(), []);

  useEffect(() => {
    if (done) return;

    if (currentIndex < BOOT_LOGS.length) {
      const timer = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 600);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setDone(true);
        setTimeout(() => onCompleteRef.current(), 800);
      }, 1400);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, done]);

  const visibleLogs = BOOT_LOGS.slice(0, currentIndex);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{
        opacity: done ? 0 : 1,
        scale: done ? 1.1 : 1,
        filter: done ? "blur(20px)" : "blur(0px)",
      }}
      transition={{ duration: 0.8, ease: "circOut" }}
      className="fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-center p-6 font-mono"
    >
      {/* Background Grid & Scanline */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(0,255,170,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,170,0.1)_1px,transparent_1px)] bg-[length:30px_30px]" />
      <div className="absolute inset-0 pointer-events-none scanlines opacity-30" />

      <div className="w-full max-w-2xl">
        <div className="space-y-2">
          {visibleLogs.map((log, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`text-sm md:text-base tracking-widest ${
                log.includes("READY") ? "text-[#ffae00]" : "text-[#00ffaa]"
              }`}
            >
              {log}
            </motion.div>
          ))}
          <motion.div
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="inline-block w-2 h-5 bg-[#00ffaa] align-middle ml-1"
          />
        </div>

        {/* Tactical HUD elements */}
        <div className="mt-12 flex justify-between items-end opacity-40 border-t border-[#00ffaa]/20 pt-4">
          <div className="text-[10px] space-y-1">
            <div>
              BOOT_ID: {bootId}
            </div>
            <div>SECTOR_7_UPLINK: STABLE</div>
          </div>
          <div className="text-right text-[10px]">
            LOADING_OPERATOR_INTERFACE...
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BootSequence;
