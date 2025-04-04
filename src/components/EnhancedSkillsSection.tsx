import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

// Estrutura para armazenar informações de cada skill
interface Skill {
  name: string;
  category: string;
  related: string[];
  color: string;
  icon?: React.ReactNode;
  demo?: React.ReactNode;
}

// Componente de demonstração para React
const ReactDemo = () => (
  <div className="h-full flex items-center justify-center">
    <div className="animate-spin h-6 w-6 border-2 border-blue-500 rounded-full border-t-transparent"></div>
  </div>
);

// Componente de demonstração para Framer Motion
const FramerMotionDemo = () => (
  <motion.div
    className="h-5 w-5 bg-purple-500 rounded-sm"
    animate={{ 
      scale: [1, 1.2, 1],
      rotate: [0, 180, 0],
    }}
    transition={{ duration: 2, repeat: Infinity }}
  />
);

// Componente de demonstração para Tailwind
const TailwindDemo = () => (
  <div className="grid grid-cols-3 gap-1">
    {['bg-blue-500', 'bg-indigo-500', 'bg-purple-500', 'bg-pink-500', 'bg-red-500', 'bg-orange-500'].map((color, i) => (
      <div key={i} className={`${color} h-2 w-2 rounded-full`}></div>
    ))}
  </div>
);

// Componente de demonstração para TypeScript
const TypeScriptDemo = () => (
  <div className="text-xs font-mono text-blue-400">
    <span className="text-purple-400">interface</span> User {"{"}
    <span className="text-yellow-400">name</span>: <span className="text-green-400">string</span>
    {"}"}
  </div>
);

// Componente de demonstração para Next.js
const NextJSDemo = () => (
  <div className="flex items-center justify-center">
    <div className="relative h-4 w-4">
      <div className="absolute inset-0 bg-white rounded-full animate-pulse"></div>
      <div className="absolute inset-0 bg-black rounded-full scale-75"></div>
    </div>
  </div>
);

export const EnhancedSkillsSection = () => {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [connections, setConnections] = useState<{start: DOMRect, ends: DOMRect[]}[]>([]);
  const [skillElements, setSkillElements] = useState<{[key: string]: HTMLElement | null}>({});
  
  // Definição das skills com categorias e relações
  const skills: Skill[] = [
    { 
      name: "JavaScript", 
      category: "Frontend", 
      related: ["React", "TypeScript", "Node"], 
      color: "#F7DF1E", 
      demo: <div className="text-xs font-mono text-yellow-400">const sum = (a, b) {'=>'} a + b;</div> 
    },
    { 
      name: "React", 
      category: "Frontend", 
      related: ["JavaScript", "Next.js", "Framer Motion"], 
      color: "#61DAFB", 
      demo: <ReactDemo /> 
    },
    { 
      name: "TypeScript", 
      category: "Frontend", 
      related: ["JavaScript", "React", "Next.js"], 
      color: "#3178C6", 
      demo: <TypeScriptDemo /> 
    },
    { 
      name: "Next.js", 
      category: "Frontend", 
      related: ["React", "TypeScript"], 
      color: "#000000", 
      demo: <NextJSDemo /> 
    },
    { 
      name: "Tailwind", 
      category: "Frontend", 
      related: ["CSS", "React"], 
      color: "#06B6D4", 
      demo: <TailwindDemo /> 
    },
    { 
      name: "Framer Motion", 
      category: "Frontend", 
      related: ["React"], 
      color: "#0055FF", 
      demo: <FramerMotionDemo /> 
    },
    { 
      name: "Python", 
      category: "Backend", 
      related: ["Django", "FastAPI"], 
      color: "#3776AB", 
      demo: <div className="text-xs font-mono text-blue-400">def greet(): return "Hello"</div> 
    },
    { 
      name: "Django", 
      category: "Backend", 
      related: ["Python"], 
      color: "#092E20", 
      demo: <div className="text-xs font-mono text-green-700">@api_view(['GET'])</div> 
    },
    { 
      name: "FastAPI", 
      category: "Backend", 
      related: ["Python"], 
      color: "#009688", 
      demo: <div className="text-xs font-mono text-green-500">@app.get("/")</div> 
    },
    { 
      name: "Node", 
      category: "Backend", 
      related: ["JavaScript"], 
      color: "#339933", 
      demo: <div className="text-xs font-mono text-green-400">app.listen(3000)</div> 
    },
    { 
      name: "SQL", 
      category: "Database", 
      related: ["Postgres"], 
      color: "#4479A1", 
      demo: <div className="text-xs font-mono text-blue-300">SELECT * FROM users</div> 
    },
    { 
      name: "Postgres", 
      category: "Database", 
      related: ["SQL"], 
      color: "#336791", 
      demo: <div className="text-xs font-mono text-blue-400">CREATE TABLE users</div> 
    },
    { 
      name: "Git", 
      category: "Tools", 
      related: [], 
      color: "#F05032", 
      demo: <div className="text-xs font-mono text-red-400">git commit -m "feat"</div> 
    },
    { 
      name: "Figma", 
      category: "Design", 
      related: ["UX/UI Design"], 
      color: "#F24E1E", 
      demo: <div className="flex items-center justify-center">
        <div className="h-2 w-2 bg-red-500 rounded-sm mr-1"></div>
        <div className="h-2 w-2 bg-purple-500 rounded-sm"></div>
      </div> 
    },
    { 
      name: "UX/UI Design", 
      category: "Design", 
      related: ["Figma"], 
      color: "#FF61F6", 
      demo: <div className="flex flex-col items-center justify-center">
        <div className="w-4 h-1 bg-purple-400 rounded-full mb-1"></div>
        <div className="w-3 h-1 bg-purple-300 rounded-full"></div>
      </div> 
    }
  ];

  // Efeito para calcular posições e conexões quando activeSkill muda
  useEffect(() => {
    if (!activeSkill || !containerRef.current) return;
    
    const activeElement = skillElements[activeSkill];
    if (!activeElement) return;
    
    const activeBounds = activeElement.getBoundingClientRect();
    const containerBounds = containerRef.current.getBoundingClientRect();
    
    // Encontrar a skill ativa no array
    const activeSkillObj = skills.find(s => s.name === activeSkill);
    if (!activeSkillObj) return;
    
    // Calcular conexões para skills relacionadas
    const newConnections = activeSkillObj.related
      .filter(relatedName => skillElements[relatedName])
      .map(relatedName => {
        const relatedElement = skillElements[relatedName];
        if (!relatedElement) return null;
        
        const endBounds = relatedElement.getBoundingClientRect();
        return {
          start: {
            x: activeBounds.left + activeBounds.width / 2 - containerBounds.left,
            y: activeBounds.top + activeBounds.height / 2 - containerBounds.top,
            width: 0,
            height: 0,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          } as unknown as DOMRect,
          end: {
            x: endBounds.left + endBounds.width / 2 - containerBounds.left,
            y: endBounds.top + endBounds.height / 2 - containerBounds.top,
            width: 0,
            height: 0,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          } as unknown as DOMRect
        };
      })
      .filter(Boolean) as {start: DOMRect, end: DOMRect}[];
    
    // Agrupar para o formato esperado pelo componente SVG
    if (newConnections.length > 0) {
      setConnections([{
        start: activeBounds,
        ends: newConnections.map(c => c.end)
      }]);
    }
  }, [activeSkill, skillElements]);

  // Registrar referências aos elementos DOM de cada skill
  const registerSkillElement = (name: string, element: HTMLElement | null) => {
    setSkillElements(prev => ({
      ...prev,
      [name]: element
    }));
  };

  // Agrupar skills por categoria para exibição
  const categorizedSkills: {[key: string]: Skill[]} = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as {[key: string]: Skill[]});

  return (
    <motion.section
      id="skills"
      className="p-12 text-center container mx-auto relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2
          }
        }
      }}
    >
      <motion.h2
        className="text-3xl font-bold mb-8"
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.7,
              ease: [0.25, 0.1, 0.25, 1.0]
            }
          }
        }}
      >
        Skills
      </motion.h2>
      
      {/* Conexões SVG - Sobrepostas no top */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full">
          {connections.map((connection, i) => 
            connection.ends.map((end, j) => (
              <motion.line
                key={`line-${i}-${j}`}
                x1={connection.start.x}
                y1={connection.start.y}
                x2={end.x}
                y2={end.y}
                stroke={skills.find(s => s.name === activeSkill)?.color || "#553C9A"}
                strokeWidth="2"
                strokeDasharray="5,5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.7 }}
                transition={{ duration: 0.5 }}
              />
            ))
          )}
        </svg>
      </div>
      
      {/* Container para skills com referência para cálculo de posição */}
      <div className="relative z-10" ref={containerRef}>
        {Object.entries(categorizedSkills).map(([category, categorySkills]) => (
          <div key={category} className="mb-8">
            <h3 className="text-xl font-semibold text-purple-400 mb-4">{category}</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {categorySkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  ref={el => registerSkillElement(skill.name, el)}
                  className="relative"
                  onMouseEnter={() => setActiveSkill(skill.name)}
                  onMouseLeave={() => setActiveSkill(null)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.1 * index, duration: 0.5 }
                  }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="bg-gray-700 px-4 py-2 rounded-full text-sm cursor-pointer"
                    style={{ borderColor: activeSkill === skill.name ? skill.color : 'transparent' }}
                    whileHover={{
                      backgroundColor: "#553C9A",
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    }}
                  >
                    {skill.name}
                  </motion.div>
                  
                  {/* Pop-up de demonstração */}
                  {activeSkill === skill.name && (
                    <motion.div
                      className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 bg-gray-800 border border-gray-700 p-3 rounded-md shadow-lg w-40 z-20"
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      style={{ borderColor: skill.color }}
                    >
                      <div className="h-20 flex items-center justify-center mb-2">
                        {skill.demo}
                      </div>
                      <div className="text-xs text-gray-400">
                        {skill.related.length > 0 ? (
                          <>Relacionado com: {skill.related.join(', ')}</>
                        ) : (
                          <>Tecnologia independente</>
                        )}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default EnhancedSkillsSection;