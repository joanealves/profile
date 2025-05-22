import React, { useState } from "react";
import { motion } from "framer-motion";

interface Skill {
  id: string;
  name: string;
  category: string;
  experience: number;
  color: string;
  status: "Expert" | "Advanced" | "Intermediate";
}

const CompactDashboardSkills: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const skillsData: Skill[] = [
    { id: "react", name: "React", category: "Frontend", experience: 90, color: "#61DAFB", status: "Expert" },
    { id: "javascript", name: "JavaScript", category: "Frontend", experience: 90, color: "#F7DF1E", status: "Expert" },
    { id: "Next", name: "Nextjs", category: "Frontend", experience: 90, color: "#F24E1E", status: "Expert" },
    { id: "typescript", name: "TypeScript", category: "Frontend", experience: 80, color: "#3178C6", status: "Advanced" },
    { id: "python", name: "Python", category: "Backend", experience: 70, color: "#3776AB", status: "Advanced" },
    { id: "sql", name: "SQL", category: "Database", experience: 75, color: "#4479A1", status: "Advanced" },
  ];

  const categories = ["Frontend", "Backend", "Database", "Design"];
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Expert": return "text-green-400 bg-green-400/20";
      case "Advanced": return "text-blue-400 bg-blue-400/20";
      case "Intermediate": return "text-yellow-400 bg-yellow-400/20";
      default: return "text-slate-400 bg-slate-400/20";
    }
  };

  return (
    <section className="py-16 bg-slate-900/95">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-slate-200 mb-2">
            Tech Stack Dashboard
          </h2>
          <p className="text-slate-400 text-sm">
            Skills overview • Real-time proficiency
          </p>
        </motion.div>

        <motion.div
          className="bg-slate-800/80 rounded-xl border border-slate-700/50 overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-slate-700/50 px-4 md:px-6 py-3 border-b border-slate-600/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-400"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                </div>
                <span className="text-slate-300 text-sm font-medium ml-2">skills-dashboard</span>
              </div>
              <div className="text-xs text-slate-400 hidden md:block">
                Last updated: now
              </div>
            </div>
          </div>

          <div className="flex border-b border-slate-700/50">
            <button
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === "overview"
                  ? "text-blue-400 border-b-2 border-blue-400 bg-slate-700/30"
                  : "text-slate-400 hover:text-slate-300"
              }`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === "details"
                  ? "text-blue-400 border-b-2 border-blue-400 bg-slate-700/30"
                  : "text-slate-400 hover:text-slate-300"
              }`}
              onClick={() => setActiveTab("details")}
            >
              Details
            </button>
          </div>

          <div className="p-4 md:p-6">
            {activeTab === "overview" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {categories.map((category) => {
                    const categorySkills = skillsData.filter(s => s.category === category);
                    const avgExp = Math.round(
                      categorySkills.reduce((sum, skill) => sum + skill.experience, 0) / categorySkills.length
                    );
                    
                    return (
                      <div key={category} className="bg-slate-700/40 rounded-lg p-3 text-center">
                        <div className="text-lg font-bold text-slate-200">{categorySkills.length}</div>
                        <div className="text-xs text-slate-400 mb-1">{category}</div>
                        <div className="text-xs text-blue-400">{avgExp}% avg</div>
                      </div>
                    );
                  })}
                </div>

                <div>
                  <h3 className="text-sm font-medium text-slate-300 mb-3">Top Skills</h3>
                  <div className="space-y-2">
                    {skillsData
                      .sort((a, b) => b.experience - a.experience)
                      .slice(0, 4)
                      .map((skill, index) => (
                        <motion.div
                          key={skill.id}
                          className="flex items-center gap-3"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div 
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: skill.color }}
                          />
                          <span className="text-sm text-slate-300 min-w-0 flex-1">{skill.name}</span>
                          <span className={`text-xs px-2 py-0.5 rounded ${getStatusColor(skill.status)}`}>
                            {skill.status}
                          </span>
                          <span className="text-xs text-slate-400 w-8 text-right">{skill.experience}%</span>
                        </motion.div>
                      ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "details" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-3"
              >
                {skillsData.map((skill, index) => (
                  <motion.div
                    key={skill.id}
                    className="flex items-center justify-between py-2 px-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div 
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: skill.color }}
                      />
                      <span className="text-sm text-slate-200 truncate">{skill.name}</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="hidden md:block w-16 h-1 bg-slate-600 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: skill.color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.experience}%` }}
                          transition={{ duration: 0.8, delay: index * 0.1 }}
                        />
                      </div>
                      <span className="text-xs text-slate-400 w-8 text-right">{skill.experience}%</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </motion.div>

        <motion.div
          className="text-center mt-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-xs text-slate-500">
            Dashboard simulado • Dados atualizados automaticamente
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CompactDashboardSkills;