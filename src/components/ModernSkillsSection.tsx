import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";

interface Skill {
  id: string;
  name: string;
  category: string;
  experience: number;
  color: string;
  status: "Expert" | "Avançado" | "Intermediário";
}

const ModernSkillsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"visao-geral" | "detalhes">("visao-geral");

  const handleTabChange = useCallback((tab: "visao-geral" | "detalhes") => {
    setActiveTab(tab);
  }, []);

  const skillsData: Skill[] = [
    { id: "react", name: "React", category: "Frontend", experience: 90, color: "#61DAFB", status: "Expert" },
    { id: "javascript", name: "JavaScript", category: "Frontend", experience: 90, color: "#F7DF1E", status: "Expert" },
    { id: "nextjs", name: "Next.js", category: "Frontend", experience: 85, color: "#000000", status: "Expert" },
    { id: "typescript", name: "TypeScript", category: "Frontend", experience: 80, color: "#3178C6", status: "Avançado" },
    { id: "tailwind", name: "Tailwind CSS", category: "Frontend", experience: 90, color: "#06B6D4", status: "Expert" },
    { id: "html", name: "HTML5", category: "Frontend", experience: 95, color: "#E34F26", status: "Expert" },
    { id: "css", name: "CSS3", category: "Frontend", experience: 90, color: "#1572B6", status: "Expert" },
    { id: "nodejs", name: "Node.js", category: "Backend", experience: 55, color: "#339933", status: "Intermediário" },
    { id: "python", name: "Python", category: "Backend", experience: 75, color: "#3776AB", status: "Avançado" },
    { id: "postgresql", name: "PostgreSQL", category: "Database", experience: 75, color: "#4169E1", status: "Avançado" },
    { id: "mongodb", name: "MongoDB", category: "Database", experience: 30, color: "#47A248", status: "Intermediário" },
    { id: "mysql", name: "MySQL", category: "Database", experience: 80, color: "#4479A1", status: "Avançado" },
    { id: "figma", name: "Figma", category: "Design", experience: 85, color: "#F24E1E", status: "Expert" },
    { id: "git", name: "Git", category: "Ferramentas", experience: 85, color: "#F05032", status: "Avançado" },
    { id: "docker", name: "Docker", category: "Ferramentas", experience: 30, color: "#2496ED", status: "Intermediário" },
  ];

  const categories = ["Frontend", "Backend", "Database", "Design", "Ferramentas"];
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Expert": return "text-green-400 bg-green-400/20 border-green-400/30";
      case "Avançado": return "text-blue-400 bg-blue-400/20 border-blue-400/30";
      case "Intermediário": return "text-yellow-400 bg-yellow-400/20 border-yellow-400/30";
      default: return "text-gray-400 bg-gray-400/20 border-gray-400/30";
    }
  };

  const topSkills = skillsData
    .sort((a, b) => b.experience - a.experience)
    .slice(0, 6);

  return (
    <section 
      id="modernSkills"
      className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900"
      aria-labelledby="skills-heading"
    >
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 
            id="skills-heading"
            className="text-3xl md:text-4xl font-bold text-white mb-4 bg-gradient-to-r from-white via-gray-200 to-slate-400 bg-clip-text text-transparent"
          >
            Competências Técnicas
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Tecnologias e ferramentas que domino para criar soluções digitais completas
          </p>
        </motion.div>

        <motion.div
          className="bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="bg-gray-700/40 px-6 py-4 border-b border-gray-600/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <span className="text-gray-300 font-medium">skills-dashboard.tsx</span>
              </div>
              <div className="text-sm text-gray-400 hidden md:block">
                Atualizado agora
              </div>
            </div>
          </div>

          <nav 
            className="flex border-b border-gray-700/50 bg-gray-800/30"
            role="tablist"
            aria-label="Visualização de competências"
          >
            <button
              role="tab"
              aria-selected={activeTab === "visao-geral"}
              aria-controls="visao-geral-panel"
              className={`px-6 py-3 text-sm font-medium transition-all duration-200 relative ${
                activeTab === "visao-geral"
                  ? "text-blue-400 bg-gray-700/40"
                  : "text-gray-400 hover:text-gray-300 hover:bg-gray-700/20"
              }`}
              onClick={() => handleTabChange("visao-geral")}
            >
              Visão Geral
              {activeTab === "visao-geral" && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400"
                  layoutId="activeTab"
                  transition={{ duration: 0.2 }}
                />
              )}
            </button>
            <button
              role="tab"
              aria-selected={activeTab === "detalhes"}
              aria-controls="detalhes-panel"
              className={`px-6 py-3 text-sm font-medium transition-all duration-200 relative ${
                activeTab === "detalhes"
                  ? "text-blue-400 bg-gray-700/40"
                  : "text-gray-400 hover:text-gray-300 hover:bg-gray-700/20"
              }`}
              onClick={() => handleTabChange("detalhes")}
            >
              Todas as Skills
              {activeTab === "detalhes" && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400"
                  layoutId="activeTab"
                  transition={{ duration: 0.2 }}
                />
              )}
            </button>
          </nav>

          <div className="p-6">
            {activeTab === "visao-geral" && (
              <motion.div
                id="visao-geral-panel"
                role="tabpanel"
                aria-labelledby="visao-geral-tab"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {categories.map((category) => {
                    const categorySkills = skillsData.filter(s => s.category === category);
                    const avgExp = categorySkills.length > 0 
                      ? Math.round(categorySkills.reduce((sum, skill) => sum + skill.experience, 0) / categorySkills.length)
                      : 0;
                    
                    return (
                      <motion.div 
                        key={category} 
                        className="bg-gray-700/40 backdrop-blur-sm rounded-lg p-4 text-center border border-gray-600/30"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: categories.indexOf(category) * 0.1 }}
                      >
                        <div className="text-2xl font-bold text-white">{categorySkills.length}</div>
                        <div className="text-sm text-gray-400 mb-1">{category}</div>
                        <div className="text-sm text-blue-400 font-medium">{avgExp}% média</div>
                      </motion.div>
                    );
                  })}
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-200 mb-4 flex items-center">
                    🏆 Principais Competências
                  </h3>
                  <div className="grid gap-3">
                    {topSkills.map((skill, index) => (
                      <motion.div
                        key={skill.id}
                        className="flex items-center gap-4 p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-all duration-200"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div 
                          className="w-4 h-4 rounded-full flex-shrink-0"
                          style={{ backgroundColor: skill.color }}
                          aria-hidden="true"
                        />
                        <span className="text-gray-200 font-medium min-w-0 flex-1">
                          {skill.name}
                        </span>
                        <span className={`text-xs px-3 py-1 rounded-full border ${getStatusColor(skill.status)}`}>
                          {skill.status}
                        </span>
                        <span className="text-sm text-gray-400 font-mono min-w-12 text-right">
                          {skill.experience}%
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "detalhes" && (
              <motion.div
                id="detalhes-panel"
                role="tabpanel"
                aria-labelledby="detalhes-tab"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {categories.map((category) => {
                  const categorySkills = skillsData.filter(s => s.category === category);
                  if (categorySkills.length === 0) return null;

                  return (
                    <div key={category}>
                      <h3 className="text-lg font-semibold text-gray-200 mb-3 flex items-center">
                        <span className="mr-2">{category}</span>
                        <span className="text-sm text-gray-400 font-normal">
                          ({categorySkills.length} skills)
                        </span>
                      </h3>
                      <div className="grid gap-2">
                        {categorySkills.map((skill, index) => (
                          <motion.div
                            key={skill.id}
                            className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-all duration-200"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                              <div 
                                className="w-3 h-3 rounded-full flex-shrink-0"
                                style={{ backgroundColor: skill.color }}
                                aria-hidden="true"
                              />
                              <span className="text-gray-200 truncate">{skill.name}</span>
                            </div>
                            
                            <div className="flex items-center gap-4">
                              <div className="hidden md:flex w-20 h-2 bg-gray-600 rounded-full overflow-hidden">
                                <motion.div
                                  className="h-full rounded-full"
                                  style={{ backgroundColor: skill.color }}
                                  initial={{ width: 0 }}
                                  animate={{ width: `${skill.experience}%` }}
                                  transition={{ duration: 0.8, delay: index * 0.1 }}
                                />
                              </div>
                              <span className="text-sm text-gray-400 font-mono min-w-12 text-right">
                                {skill.experience}%
                              </span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            )}
          </div>
        </motion.div>

        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-sm text-gray-500">
            Competências em constante evolução • Sempre aprendendo novas tecnologias
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ModernSkillsSection;