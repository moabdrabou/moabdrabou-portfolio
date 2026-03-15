import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const Hero: React.FC = () => {
  const scrollToMissions = () =>
    document.getElementById("missions")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="py-20 flex flex-col items-center justify-center min-h-[70vh]"
    >
      <div className="w-full relative">
        {/* Scanning Line Animation */}
        <motion.div
          className="absolute top-0 left-0 w-full h-1 bg-[#00ffaa]/30 z-10 pointer-events-none"
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />

        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.5em] text-[#ffae00] font-bold uppercase mb-4 block">
              IDENTIFIED OPERATOR: ALPHA-01
            </span>
            <h1
              className="text-4xl sm:text-6xl md:text-8xl tracking-widest text-[#00ffaa] mb-6 filter drop-shadow-[0_0_10px_rgba(0,255,170,0.5)] uppercase break-words"
              style={{ fontFamily: "'Black Ops One', cursive" }}
            >
              Mohammed Abdrabou
            </h1>
          </motion.div>

          {/* Availability Status */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="flex justify-center mb-6"
          >
            <div className="flex items-center gap-2.5 px-4 py-1.5 border border-[#00ffaa]/30 bg-[#00ffaa]/5 font-mono text-xs tracking-widest">
              <span className="w-2 h-2 rounded-full bg-[#00ffaa] animate-pulse" aria-hidden="true" />
              <span className="text-[#00ffaa]">AVAILABLE_FOR_DEPLOYMENT</span>
            </div>
          </motion.div>

          {/* Role Badges */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 text-sm font-mono opacity-80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="px-3 py-1 border border-[#00ffaa]/30 bg-[#00ffaa]/5">
              // FULL_STACK_ENGINEER
            </div>
            <div className="px-3 py-1 border border-[#00ffaa]/30 bg-[#00ffaa]/5">
              // AI_SPECIALIST
            </div>
            <div className="px-3 py-1 border border-[#00ffaa]/30 bg-[#00ffaa]/5">
              // REACT_ARCHITECT
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            className="mt-12 max-w-2xl mx-auto p-4 border-l-4 border-[#ffae00] bg-[#ffae00]/5 text-left"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <p className="font-mono text-sm leading-relaxed">
              <span className="text-[#ffae00] mr-2">[INFO]</span>
              Specialist in orchestrating high-velocity digital ecosystems.
              Proven track record of deploying robust architectures using the
              React/Next.js framework.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="mt-12 md:mt-16 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            <button
              onClick={scrollToMissions}
              className="cursor-pointer px-6 sm:px-8 py-3 bg-[#00ffaa] text-black font-display text-base sm:text-xl tracking-widest hover:bg-[#ffae00] hover:scale-105 transition-all duration-300"
            >
              ENGAGE MISSION
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("loadout")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="cursor-pointer px-6 sm:px-8 py-3 border border-[#00ffaa] text-[#00ffaa] font-display text-base sm:text-xl tracking-widest hover:bg-[#00ffaa]/10 transition-all duration-300"
            >
              VIEW LOADOUT
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        className="mt-16 flex flex-col items-center gap-2 opacity-40 hover:opacity-80 transition-opacity cursor-pointer focus-visible:opacity-80"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        onClick={scrollToMissions}
        aria-label="Scroll to projects"
      >
        <span className="text-[10px] font-mono tracking-[0.5em] uppercase">SCROLL</span>
        <ChevronDown className="w-5 h-5" aria-hidden="true" />
      </motion.button>
    </section>
  );
};

export default Hero;
