import React, { useState, useCallback, lazy, Suspense } from "react";
import "./tactical.css";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/icons";
import { Mail, Menu, X, Crosshair, Wrench, Shield, Radio } from "lucide-react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import maLogo from "./assets/malogo.png";

const Hero = lazy(() => import("./components/sections/Hero"));
const Missions = lazy(() => import("./components/sections/Missions"));
const Loadout = lazy(() => import("./components/sections/Loadout"));
const Background = lazy(() => import("@/components/Background"));
const BootSequence = lazy(() => import("@/components/ui/BootSequence"));

const navLinks = [
  { href: "#missions", label: "MISSIONS", sub: "01_PROJECTS", icon: Crosshair },
  { href: "#loadout", label: "LOADOUT", sub: "02_SKILLS", icon: Wrench },
  { href: "#intel", label: "INTEL", sub: "03_ABOUT", icon: Shield },
  { href: "#comms", label: "COMMS", sub: "04_CONNECT", icon: Radio },
];

const contactLinks = [
  {
    icon: GithubIcon,
    href: "https://github.com/moabdrabou",
    label: "GitHub",
    meta: "[ACCESS_REPO]",
  },
  {
    icon: LinkedinIcon,
    href: "https://www.linkedin.com/in/moabdrabou/",
    label: "LinkedIn",
    meta: "[OPERATOR_DOSSIER]",
  },
  {
    icon: TwitterIcon,
    href: "https://x.com/MoeAbdrabou",
    label: "Twitter",
    meta: "[GLOBAL_FEED]",
  },
  {
    icon: Mail,
    href: "mailto:moabdrabou@hotmail.com",
    label: "Email",
    meta: "[DIRECT_UPLINK]",
  },
];

const RedesignApp: React.FC = () => {
  const [isBooting, setIsBooting] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [signalStatus, setSignalStatus] = useState<"IDLE" | "TRANSMITTING" | "SENT">("IDLE");
  const [activeSection, setActiveSection] = useState<string>("");

  const handleBootComplete = useCallback(() => {
    setIsBooting(false);
  }, []);

  React.useEffect(() => {
    if (isBooting) return;
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isBooting]);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  const handleSendSignal = () => {
    setSignalStatus("TRANSMITTING");

    // Simulate transmission delay
    setTimeout(() => {
      setSignalStatus("SENT");
      window.location.href = "mailto:moabdrabou@hotmail.com";

      // Reset after some time
      setTimeout(() => setSignalStatus("IDLE"), 4000);
    }, 1200);
  };

  return (
    <MotionConfig reducedMotion="user">
      <Suspense fallback={null}>
        <AnimatePresence>
          {isBooting && <BootSequence key="boot" onComplete={handleBootComplete} />}
        </AnimatePresence>
      </Suspense>

      <motion.div
        initial={false}
        animate={{ opacity: isBooting ? 0 : 1 }}
        transition={{ duration: 0.8 }}
        style={{ pointerEvents: isBooting ? 'none' : 'auto' }}
        className="tactical-hud min-h-dvh text-[#00ffaa] relative"
      >
        <Suspense fallback={null}>
          <Background />
        </Suspense>

        {/* Skip to main content (keyboard / screen reader) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-[#00ffaa] focus:text-black focus:font-bold focus:tracking-widest focus:text-sm"
        >
          SKIP TO CONTENT
        </a>

        {/* Screen reader announcements */}
        <div aria-live="polite" role="status" className="sr-only">
          {signalStatus === "TRANSMITTING"
            ? "Transmitting signal..."
            : signalStatus === "SENT"
            ? "Signal sent. Uplink established."
            : ""}
        </div>

      {/* Tactical Header / Navbar */}
      <header className="fixed top-0 left-0 w-full px-6 py-4 z-50 border-b border-[#00ffaa]/10 backdrop-blur-md bg-black/50">
        <div className="max-w-7xl mx-auto flex justify-between items-center relative">
          <a
            href="#hero"
            aria-label="Mohammed Abdrabou — back to top"
            className="flex items-center gap-4 hover:opacity-80 transition-opacity"
          >
            <div className="w-12 h-12 border-2 border-[#00ffaa] flex items-center justify-center transition-all duration-300 p-1 hover:shadow-[0_0_15px_rgba(0,255,170,0.5),inset_0_0_15px_rgba(0,255,170,0.1)] hover:border-[#00ffaa] hover:scale-105">
              <img src={maLogo} alt="MA Logo" className="w-full h-full object-contain transition-all duration-300 hover:drop-shadow-[0_0_6px_rgba(0,255,170,0.8)]" style={{ filter: 'brightness(0) saturate(100%) invert(88%) sepia(33%) saturate(1057%) hue-rotate(99deg) brightness(101%) contrast(106%)' }} />
            </div>
            <div className="hidden lg:block">
              <span className="font-display text-lg tracking-[0.3em] uppercase leading-none">
                OPERATOR_PORTFOLIO
              </span>
            </div>
          </a>

          {/* Desktop Nav Container */}
          <div className="hidden md:flex items-center flex-1 justify-center px-8 gap-4 lg:gap-8">
            {/* Left System Data */}
            <div className="hidden xl:flex items-center gap-2 text-[10px] font-mono opacity-40 whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span>SAT_LINK: ACTIVE</span>
            </div>

            {/* Main Nav Items */}
            <nav className="flex items-center gap-1 lg:gap-4">
              {navLinks.map((link, idx) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                <React.Fragment key={link.href}>
                  <a
                    href={link.href}
                    aria-label={link.label}
                    aria-current={isActive ? "location" : undefined}
                    className={`group relative flex flex-col items-center px-4 py-2 transition-all duration-300 ${isActive ? "text-white" : ""}`}
                  >
                    {/* Hover Bracket Wrap [ ] */}
                    <span className="absolute inset-0 border-x-2 border-[#00ffaa] scale-y-0 group-hover:scale-y-100 opacity-0 group-hover:opacity-100 transition-all duration-300" />

                    <div className="flex items-center gap-2 relative z-10">
                      <link.icon className={`w-3 h-3 transition-all ${isActive ? "opacity-100 text-white" : "opacity-40 group-hover:opacity-100 group-hover:text-white"}`} aria-hidden="true" />
                      <span className={`font-display text-sm tracking-[0.2em] group-hover:text-white group-hover:animate-flicker ${isActive ? "text-white" : ""}`}>
                        // {link.label}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono opacity-50 mt-1 tracking-widest group-hover:opacity-100 transition-opacity" aria-hidden="true">
                      {link.sub}
                    </span>

                    {/* Active indicator */}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/4 right-1/4 h-[1px] bg-[#00ffaa]" />
                    )}

                    {/* Scanning Animation Line */}
                    <div className="absolute left-0 w-full h-[1px] bg-[#00ffaa] opacity-0 group-hover:opacity-50 group-hover:animate-scan pointer-events-none" />
                  </a>
                  {idx < navLinks.length - 1 && (
                    <div className="w-[1px] h-8 bg-gradient-to-b from-transparent via-[#00ffaa]/20 to-transparent mx-2" />
                  )}
                </React.Fragment>
                );
              })}
            </nav>
          </div>

          {/* Mobile Menu Button */}
          {!isMenuOpen ? (
            <button
              className="md:hidden text-[#00ffaa] p-2 hover:bg-[#00ffaa]/10 transition-colors"
              onClick={toggleMenu}
              aria-label="Open navigation menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav"
            >
              <Menu size={32} aria-hidden="true" />
            </button>
          ) : null}
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{
              type: "tween",
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="fixed inset-0 bg-[#050505] z-[100] flex flex-col"
          >
            {/* Tactical background elements */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.15] bg-[linear-gradient(rgba(0,255,170,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,170,0.1)_1px,transparent_1px)] bg-[length:40px_40px]" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#00ffaa]/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="p-8 h-full flex flex-col relative z-[101]">
              <div className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 border-2 border-[#00ffaa] flex items-center justify-center transition-all duration-300 p-1 hover:shadow-[0_0_15px_rgba(0,255,170,0.5),inset_0_0_15px_rgba(0,255,170,0.1)] hover:scale-105">
                    <img src={maLogo} alt="MA Logo" className="w-full h-full object-contain transition-all duration-300 hover:drop-shadow-[0_0_6px_rgba(0,255,170,0.8)]" style={{ filter: 'brightness(0) saturate(100%) invert(88%) sepia(33%) saturate(1057%) hue-rotate(99deg) brightness(101%) contrast(106%)' }} />
                  </div>
                  <span className="text-[10px] tracking-[0.5em] font-bold uppercase text-[#00ffaa]">
                    // MENU_ACCESSED
                  </span>
                </div>
                <button
                  onClick={toggleMenu}
                  aria-label="Close navigation menu"
                  className="p-3 border-2 border-[#00ffaa] bg-[#00ffaa]/10 hover:bg-[#00ffaa] hover:text-black transition-all"
                >
                  <X size={28} aria-hidden="true" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                <nav className="flex flex-col gap-8 mb-16">
                  <span className="text-[10px] tracking-[0.8em] text-[#ffae00] font-bold mb-4 uppercase">
                    &gt; NAVIGATION_NODES
                  </span>
                  {navLinks.map((link, idx) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + idx * 0.1 }}
                      className="font-display text-5xl sm:text-7xl tracking-widest hover:text-[#00ffaa] transition-all flex items-center gap-6 group"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="text-sm font-mono opacity-30 group-hover:opacity-100 group-hover:text-[#00ffaa]">
                        0{idx + 1}
                      </span>
                      {link.label.replace("// ", "")}
                    </motion.a>
                  ))}
                </nav>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 mt-auto pt-12 border-t border-[#00ffaa]/10">
                  <div className="flex flex-col gap-6">
                    <span className="text-[10px] tracking-[0.8em] text-[#ffae00] font-bold uppercase">
                      &gt; COMM_CHANNELS
                    </span>
                    <div className="flex gap-8">
                      <a
                        href="https://github.com/moabdrabou"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub profile"
                        className="hover:text-[#00ffaa] transition-colors hover:scale-110 flex items-center justify-center w-11 h-11"
                      >
                        <GithubIcon className="w-8 h-8" aria-hidden="true" />
                      </a>
                      <a
                        href="https://www.linkedin.com/in/moabdrabou/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn profile"
                        className="hover:text-[#00ffaa] transition-colors hover:scale-110 flex items-center justify-center w-11 h-11"
                      >
                        <LinkedinIcon className="w-8 h-8" aria-hidden="true" />
                      </a>
                      <a
                        href="mailto:moabdrabou@hotmail.com"
                        aria-label="Send email"
                        className="hover:text-[#00ffaa] transition-colors hover:scale-110 flex items-center justify-center w-11 h-11"
                      >
                        <Mail className="w-8 h-8" aria-hidden="true" />
                      </a>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <span className="text-[10px] tracking-[0.8em] text-[#ffae00] font-bold uppercase">
                      &gt; OPERATOR_STATUS
                    </span>
                    <div className="font-mono text-xs opacity-70 leading-loose uppercase bg-[#00ffaa]/5 p-4 border-l-2 border-[#00ffaa]/30">
                      [LOC] .... REMOTE_OPERATIONAL
                      <br />
                      [AVA] .... READY_FOR_DEPLOYMENT
                      <br />
                      [LVL] .... ELITE_DEVELOPER
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative HUD Elements */}
              <div className="mt-8 flex justify-between items-center opacity-30">
                <div className="text-[10px] tracking-[0.3em] font-mono">
                  HUD_VER_4.2.0 // BYPASS_PROTOCOL_ACTIVE
                </div>
                <div className="text-[10px] tracking-[0.3em] font-mono">
                  [REDACTED]
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main id="main-content" className="pt-32 px-6 max-w-7xl mx-auto">
        <Suspense fallback={null}>
          <Hero />
        </Suspense>

        <Suspense fallback={null}>
          <Missions />
        </Suspense>

        <Suspense fallback={null}>
          <Loadout />
        </Suspense>

        {/* Tactical Intel Section (About) */}
        <section id="intel" className="py-24 border-t border-[#00ffaa]/10">
          <div className="corner-frame bg-[#ffae00]/5 border-[#ffae00]/20">
            <div className="corner-frame-inner">
              <span className="text-[10px] tracking-[0.5em] text-[#ffae00] mb-4 block font-bold">
                Bio-Data
              </span>
              <h2 className="font-display text-2xl md:text-5xl mb-8 tracking-wider md:tracking-widest">
                &gt;&gt;&gt; MISSION BRIEFING
              </h2>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <p className="text-lg opacity-80 leading-relaxed">
                    I'm a passionate Full-Stack Developer with a deep interest
                    in Artificial Intelligence and scalable systems. My journey
                    began with a curiosity for how things work under the hood,
                    leading me to master modern web technologies and explore the
                    frontiers of machine learning.
                  </p>
                  <p className="text-lg opacity-80 leading-relaxed">
                    When I'm not coding, you can find me building
                    community-focused gaming projects or optimizing my tactical
                    workflow. I believe in clean code, user-centric design, and
                    continuous learning.
                  </p>
                </div>
                <div className="p-6 border border-[#ffae00]/40 bg-[#ffae00]/5 font-mono text-xs leading-loose">
                  <span className="text-[#ffae00] uppercase font-bold tracking-widest">
                    // ARCHITECTURE_LOGS
                  </span>
                  <br />
                  <div className="mt-4 space-y-2 opacity-80">
                    <div>[FOCUS] ........... FULL_STACK & AI</div>
                    <div>[LOCATION] ........ OPEN_TO_REMOTE</div>
                    <div>[PASSION] ......... OPEN_SOURCE</div>
                    <div>[STATUS] .......... ALWAYS_LEARNING</div>
                    <div className="pt-4 text-[#ffae00]">
                      // SYSTEM_OPERATIONAL
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Footer */}
        <section id="comms" className="py-24 border-t border-[#00ffaa]/10">
          <div className="text-center max-w-2xl mx-auto px-4">
            <h2 className="font-display text-4xl md:text-5xl mb-4 tracking-widest uppercase">
              Establish Comms
            </h2>
            <p className="font-mono text-[10px] md:text-sm opacity-60 mb-12 uppercase tracking-tighter md:tracking-normal">
              STANDING BY FOR NEW OBJECTIVES AND STRATEGIC ALLIANCES.
            </p>

            <div className="flex justify-center gap-4 md:gap-10 mb-16">
              {contactLinks.map((link) => (
                <div key={link.label} className="relative group flex flex-col items-center">
                  <a
                    href={link.href}
                    target={link.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="w-14 h-14 md:w-20 md:h-20 border border-[#00ffaa]/30 flex items-center justify-center hover:bg-[#00ffaa] hover:text-black hover:scale-110 transition-all duration-300"
                  >
                    <link.icon className="w-5 h-5 md:w-8 md:h-8" aria-hidden="true" />
                  </a>
                  <span className="absolute -bottom-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-mono text-[10px] text-[#ffae00] tracking-widest whitespace-nowrap">
                    {link.meta}
                  </span>
                </div>
              ))}
            </div>

            <div className="mb-8 flex flex-col items-center gap-2 font-mono text-[10px] tracking-[0.2em]">
              <div className="flex items-center gap-4">
                <span className="opacity-40">SIGNAL:</span>
                <span className="text-[#00ffaa]">STABLE [||||||||||]</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="opacity-40">ENCRYPTION:</span>
                <span className="text-[#ffae00]">AES-256 ACTIVE</span>
              </div>
            </div>

            <button
              onClick={handleSendSignal}
              disabled={signalStatus !== "IDLE"}
              className={`w-full md:w-auto px-4 md:px-12 py-4 font-display text-sm md:text-2xl tracking-[0.1em] md:tracking-[0.3em] transition-all uppercase relative overflow-hidden group
                ${signalStatus === "IDLE" ? "cursor-pointer bg-[#00ffaa] text-black hover:bg-white hover:scale-105" : ""}
                ${signalStatus === "TRANSMITTING" ? "cursor-wait bg-[#ffae00] text-black" : ""}
                ${signalStatus === "SENT" ? "cursor-default bg-white text-black border-2 border-[#00ffaa]" : ""}
              `}
            >
              {signalStatus === "IDLE" ? "SEND_ENCRYPTED_SIGNAL" : signalStatus === "TRANSMITTING" ? (
                <span className="flex items-center gap-2">
                  <span className="animate-pulse">UPLOADING_DATA...</span>
                </span>
              ) : "UPLINK_ESTABLISHED // MISSION_READY"}

              {/* Progress bar for transmitting state */}
              {signalStatus === "TRANSMITTING" ? (
                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-black/40"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5, ease: "linear" }}
                />
              ) : null}
            </button>
          </div>
        </section>
      </main>

      <footer className="p-10 text-center opacity-70 text-xs tracking-[0.5em] uppercase border-t border-[#00ffaa]/10">
        &copy; {new Date().getFullYear()} // MOHAMMED ABDRABOU // END OF FILE //
        SECURED ENCRYPTION
      </footer>
      </motion.div>
    </MotionConfig>
  );
};

export default RedesignApp;
