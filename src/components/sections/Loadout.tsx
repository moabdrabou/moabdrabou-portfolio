import React from "react";
import { useInView } from "@/hooks/useInView";

const skills = [
  {
    category: "PRIMARY_WEAPON",
    label: "FRONTEND",
    tools: [
      "HTML",
      "CSS",
      "React",
      "Next.js",
      "JavaScript",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
    ],
    level: 95,
  },
  {
    category: "SECONDARY_WEAPON",
    label: "BACKEND",
    tools: [
      "Node.js",
      "Express",
      "Python",
      "Supabase",
      "PostgreSQL",
      "MongoDB",
      "MariaDB",
    ],
    level: 85,
  },
  {
    category: "TACTICAL_GEAR",
    label: "DevOps",
    tools: [
      "Docker",
      "kubernetes",
      "AWS",
      "GCP",
      "Linux",
      "CI/CD",
      "Git",
      "GitHub Actions",
    ],
    level: 83,
  },
  {
    category: "PERKS",
    label: "DATA & AI",
    tools: [
      "Power BI",
      "Tableau",
      "PyTorch",
      "TensorFlow",
      "NLP",
      "Hugging Face",
    ],
    level: 78,
  },
];

function SkillCard({ skill, index }: { skill: typeof skills[0]; index: number }) {
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref}
      className={`p-6 border border-[#00ffaa]/20 bg-[#00ffaa]/5 relative overflow-hidden group hover:border-[#00ffaa]/60 transition-all duration-500 ${
        inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-5"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <span className="text-[10px] tracking-widest text-[#ffae00] font-bold block mb-1">
            [{skill.category}]
          </span>
          <h3 className="font-display text-3xl tracking-widest uppercase group-hover:text-white transition-colors">
            {skill.label}
          </h3>
        </div>
        <div className="text-right">
          <span className="text-[10px] opacity-60 block">
            MASTERY_LEVEL
          </span>
          <span className="font-display text-4xl text-[#00ffaa]">
            {skill.level}%
          </span>
        </div>
      </div>

      {/* Mastery Bar */}
      <div
        className="h-2 w-full bg-[#00ffaa]/10 border border-[#00ffaa]/30 mb-8 relative"
        role="progressbar"
        aria-valuenow={skill.level}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${skill.label} mastery: ${skill.level}%`}
      >
        <div
          className="h-full bg-[#00ffaa] relative transition-[width] duration-1000 ease-out"
          style={{ width: inView ? `${skill.level}%` : "0%", transitionDelay: "0.5s" }}
        >
          <div className="absolute top-0 right-0 w-1 h-full bg-white animate-pulse" aria-hidden="true" />
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        {skill.tools.map((tool) => (
          <div key={tool} className="flex items-center gap-2 group/tool">
            <div className="w-1.5 h-1.5 border border-[#00ffaa] group-hover/tool:bg-[#00ffaa] transition-colors" />
            <span className="text-xs font-mono opacity-80 group-hover/tool:opacity-100">
              {tool}
            </span>
          </div>
        ))}
      </div>

      {/* Tactical background elements */}
      <div className="absolute bottom-0 right-0 text-[40px] font-bold opacity-[0.03] pointer-events-none group-hover:opacity-[0.08] transition-opacity leading-none pr-2 pb-1">
        {skill.category.split("_")[0]}
      </div>
    </div>
  );
}

const Loadout: React.FC = () => {
  return (
    <section id="loadout" className="py-24 border-t border-[#00ffaa]/10">
      <div className="flex items-center gap-4 mb-12">
        <h2 className="font-display text-2xl md:text-5xl tracking-wider md:tracking-widest uppercase">
          &gt;&gt;&gt; OPERATOR LOADOUT
        </h2>
        <div className="h-[2px] flex-1 bg-gradient-to-r from-[#00ffaa]/40 to-transparent" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skills.map((skill, index) => (
          <SkillCard key={skill.label} skill={skill} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Loadout;
