import React from "react";
import { motion } from "framer-motion";
import mbsImage from "@/assets/MBS.jpg";
import ohBuildsImage from "@/assets/OHBuilds.png";
import HabitTracker from "@/assets/HabitTracker.png";

const missions = [
  {
    id: "OP-001",
    title: "UoM Middle East",
    status: "COMPLETED",
    description:
      "Enterprise-grade Webflow platform for the Middle East Centre. Engineered complex CMS architecture for academic programs and global alumni databases.",
    tech: ["WEBFLOW CMS", "ENTERPRISE DESIGN", "SEO"],
    image: mbsImage,
    link: "https://www.manchester.ac.ae/",
  },
  {
    id: "OP-002",
    title: "Build Vault",
    status: "COMPLETED",
    description:
      "High-performance database for 'Once Human' character builds. Real-time data fetching via Supabase and optimized filtering.",
    tech: ["REACT", "TYPESCRIPT", "SUPABASE", "TAILWIND CSS"],
    image: ohBuildsImage,
    link: "https://ohbuilds.moabdrabou.dev/",
    repo: "https://github.com/moabdrabou/OnceHuman-Builds",
  },
  {
    id: "OP-003",
    title: "Habit Tracker",
    status: "COMPLETED",
    description:
      "Mobile-responsive tracking app. Features GitHub-style heatmaps and consistency visualization for objective-based progression.",
    tech: ["REACT", "TYPESCRIPT", "SUPABASE", "TAILWIND CSS"],
    image: HabitTracker,
    link: "https://do.moabdrabou.dev/",
    repo: "https://github.com/moabdrabou/habit-tracker",
  },
];

const Missions: React.FC = () => {
  return (
    <section id="missions" className="py-24 border-t border-[#00ffaa]/10">
      <div className="flex items-center gap-4 mb-12">
        <h2 className="font-display text-5xl tracking-widest uppercase">
          &gt;&gt;&gt; ACTIVE MISSIONS
        </h2>
        <div className="h-[2px] flex-1 bg-gradient-to-r from-[#00ffaa]/40 to-transparent" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {missions.map((mission, index) => (
          <motion.div
            key={mission.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="corner-frame bg-[#00ffaa]/5 group hover:bg-[#00ffaa]/10 transition-all duration-300"
          >
            <div className="corner-frame-inner relative overflow-hidden">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs tracking-[0.2em] text-[#ffae00] font-bold">
                  ID: {mission.id}
                </span>
                <span className="text-[10px] tracking-widest bg-[#00ffaa] text-black px-2 py-0.5 font-bold">
                  {mission.status}
                </span>
              </div>

              <div className="aspect-video mb-6 overflow-hidden border border-[#00ffaa]/20 grayscale hover:grayscale-0 transition-all duration-500">
                <img
                  src={mission.image}
                  alt={mission.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              <h3 className="font-display text-2xl tracking-widest mb-2 uppercase">
                {mission.title}
              </h3>
              <p className="text-sm opacity-70 mb-6 leading-relaxed font-mono min-h-[4rem]">
                {mission.description}
              </p>

              <div className="flex flex-wrap gap-4 mt-auto pt-6 border-t border-[#00ffaa]/10">
                {mission.tech.map((t) => (
                  <div key={t} className="flex items-center gap-2 group/tool">
                    <div className="w-1.5 h-1.5 border border-[#00ffaa] group-hover/tool:bg-[#00ffaa] transition-colors" />
                    <span className="text-xs font-mono opacity-80 group-hover/tool:opacity-100 uppercase tracking-widest">
                      {t}
                    </span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <a
                  href={mission.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 border border-[#00ffaa] text-center text-[10px] tracking-[0.2em] font-bold hover:bg-[#00ffaa] hover:text-black transition-colors uppercase"
                >
                  COORDINATES
                </a>
                {mission.repo ? (
                  <a
                    href={mission.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 border border-[#00ffaa]/40 text-center text-[10px] tracking-[0.2em] font-bold hover:bg-[#00ffaa]/20 transition-colors uppercase"
                  >
                    ACCESS_FILES
                  </a>
                ) : (
                  <div className="py-2 border border-[#00ffaa]/10 text-center text-[10px] tracking-[0.2em] opacity-20 cursor-not-allowed uppercase">
                    CLASSIFIED
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Missions;
