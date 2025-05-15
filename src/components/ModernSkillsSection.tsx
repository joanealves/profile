import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Skill {
  id: string;
  name: string;
  category: string;
  experience: number; // 0-100
  related: string[];
  color: string;
}

const ModernSkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  const skillsData: Skill[] = [
    { id: "react", name: "React", category: "Frontend", experience: 90, related: ["javascript", "typescript", "nextjs"], color: "#61DAFB" },
    { id: "javascript", name: "JavaScript", category: "Frontend", experience: 90, related: ["react", "typescript", "nodejs"], color: "#F7DF1E" },
    { id: "typescript", name: "TypeScript", category: "Frontend", experience: 80, related: ["javascript", "react", "nextjs"], color: "#3178C6" },
    { id: "nextjs", name: "Next.js", category: "Frontend", experience: 75, related: ["react", "typescript"], color: "#000000" },
    { id: "tailwind", name: "Tailwind", category: "Frontend", experience: 85, related: ["css", "react"], color: "#06B6D4" },
    { id: "css", name: "CSS", category: "Frontend", experience: 90, related: ["tailwind"], color: "#1572B6" },
    { id: "framer", name: "Framer Motion", category: "Frontend", experience: 70, related: ["react"], color: "#0055FF" },

    { id: "python", name: "Python", category: "Backend", experience: 70, related: ["django", "fastapi"], color: "#3776AB" },
    { id: "django", name: "Django", category: "Backend", experience: 60, related: ["python"], color: "#092E20" },
    { id: "fastapi", name: "FastAPI", category: "Backend", experience: 70, related: ["python"], color: "#009688" },
    { id: "nodejs", name: "Node.js", category: "Backend", experience: 60, related: ["javascript"], color: "#339933" },

    { id: "sql", name: "SQL", category: "Database", experience: 75, related: ["postgres"], color: "#4479A1" },
    { id: "postgres", name: "Postgres", category: "Database", experience: 60, related: ["sql"], color: "#336791" },

    { id: "figma", name: "Figma", category: "Design", experience: 90, related: ["uxui"], color: "#F24E1E" },
    { id: "uxui", name: "UX/UI Design", category: "Design", experience: 90, related: ["figma"], color: "#FF61F6" },

    { id: "git", name: "Git", category: "Tools", experience: 85, related: [], color: "#F05032" },
  ];

  const categories = Array.from(new Set(skillsData.map(skill => skill.category)));

  const filteredSkills = activeCategory
    ? skillsData.filter(skill => skill.category === activeCategory)
    : skillsData;


  const handleCategoryClick = (category: string) => {
    setActiveCategory(activeCategory === category ? null : category);
    setActiveSkill(null);
  };

  return (
    <section className="py-16 px-4 md:px-8 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          className="text-3xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Minhas Habilidades Técnicas
        </motion.h2>

        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <motion.button
            className={`px-4 py-2 rounded-md transition-all ${
              activeCategory === null 
                ? "bg-purple-600 text-white font-medium shadow-lg shadow-purple-500/20" 
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setActiveCategory(null);
              setActiveSkill(null);
            }}
          >
            Todas
          </motion.button>
          
          {categories.map((category) => (
            <motion.button
              key={category}
              className={`px-4 py-2 rounded-md transition-all ${
                activeCategory === category 
                  ? "bg-purple-600 text-white font-medium shadow-lg shadow-purple-500/20" 
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        <div className="space-y-10">
          {!activeCategory && (
            <>
              {categories.map((category, i) => (
                <motion.div 
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="mb-8"
                >
                  <div className="flex items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-100">{category}</h3>
                    <div className="ml-4 h-px bg-gray-700 flex-grow"></div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    {skillsData
                      .filter(skill => skill.category === category)
                      .map((skill) => (
                        <SkillBadge 
                          key={skill.id} 
                          skill={skill} 
                          isActive={activeSkill === skill.id}
                          onClick={() => setActiveSkill(activeSkill === skill.id ? null : skill.id)}
                        />
                      ))}
                  </div>
                </motion.div>
              ))}
            </>
          )}

          {activeCategory && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap gap-3"
            >
              {filteredSkills.map((skill) => (
                <SkillBadge 
                  key={skill.id} 
                  skill={skill} 
                  isActive={activeSkill === skill.id}
                  onClick={() => setActiveSkill(activeSkill === skill.id ? null : skill.id)}
                />
              ))}
            </motion.div>
          )}
        </div>

        <AnimatePresence>
          {activeSkill && (
            <motion.div 
              className="mt-12 p-6 rounded-xl bg-gray-800 border border-gray-700 shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              {skillsData.filter(skill => skill.id === activeSkill).map(skill => (
                <div key={skill.id}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold" style={{ color: skill.color }}>{skill.name}</h3>
                    <div className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: `${skill.color}20`, color: skill.color }}>
                      {skill.category}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Experiência</span>
                      <span className="text-gray-300">{skill.experience}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full rounded-full"
                        style={{ backgroundColor: skill.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.experience}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                  
                  {skill.related.length > 0 && (
                    <div>
                      <h4 className="text-sm text-gray-400 mb-2">Relacionado com:</h4>
                      <div className="flex flex-wrap gap-2">
                        {skill.related.map(relId => {
                          const relatedSkill = skillsData.find(s => s.id === relId);
                          return relatedSkill ? (
                            <span
                              key={relId}
                              className="text-xs px-2 py-1 rounded-full cursor-pointer"
                              style={{
                                backgroundColor: `${relatedSkill.color}20`,
                                color: relatedSkill.color,
                                border: `1px solid ${relatedSkill.color}50`
                              }}
                              onClick={() => setActiveSkill(relId)}
                            >
                              {relatedSkill.name}
                            </span>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

interface SkillBadgeProps {
  skill: Skill;
  isActive: boolean;
  onClick: () => void;
}

const SkillBadge: React.FC<SkillBadgeProps> = ({ skill, isActive, onClick }) => {
  return (
    <motion.div
      className={`px-4 py-2 rounded-lg cursor-pointer transition-all shadow-sm ${
        isActive 
          ? "shadow-lg" 
          : "hover:shadow-md"
      }`}
      style={{
        backgroundColor: isActive ? `${skill.color}30` : "rgba(31, 41, 55, 0.8)",
        border: `1px solid ${isActive ? skill.color : "rgba(75, 85, 99, 0.4)"}`,
        color: isActive ? skill.color : "#e5e7eb"
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      layout
    >
      <div className="flex items-center gap-2">
        <span className="font-medium">{skill.name}</span>
        
        {/* Small experience indicator dot */}
        <div className="flex items-center justify-end">
          <div className="flex space-x-0.5">
            {[1, 2, 3, 4, 5].map((level) => (
              <div
                key={level}
                className="w-1 h-1 rounded-full"
                style={{
                  backgroundColor: skill.experience >= level * 20 ? skill.color : "rgba(75, 85, 99, 0.4)"
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ModernSkillsSection;