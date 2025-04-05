import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

// Interface para representar um ponto de conexão
interface ConnectionPoint {
  x: number;
  y: number;
}

// Interface para representar uma conexão entre duas skills
interface Connection {
  from: ConnectionPoint;
  to: ConnectionPoint;
  color: string;
}

export const EnhancedSkillsSection = () => {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [skillElements, setSkillElements] = useState<{ [key: string]: HTMLElement | null }>({});

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
    },
    {
      name: "CSS",
      category: "Frontend",
      related: ["Tailwind"],
      color: "#1572B6",
      demo: <div className="text-xs font-mono text-blue-500">.class {'{'}color: blue;{'}'}</div>
    }

  ];

  // Função auxiliar para obter o centro de um elemento
  const getElementCenter = (element: HTMLElement, containerRect: DOMRect): ConnectionPoint => {
    const rect = element.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2 - containerRect.left,
      y: rect.top + rect.height / 2 - containerRect.top
    };
  };

  // Calcular as conexões quando o activeSkill ou os elementos mudam
  useEffect(() => {
    if (!activeSkill || !containerRef.current) return;

    const activeElement = skillElements[activeSkill];
    if (!activeElement) return;

    const containerRect = containerRef.current.getBoundingClientRect();

    // Encontrar a skill ativa
    const activeSkillObj = skills.find(s => s.name === activeSkill);
    if (!activeSkillObj) return;

    // Calcular as conexões
    const newConnections: Connection[] = [];

    activeSkillObj.related.forEach(relatedName => {
      const relatedElement = skillElements[relatedName];
      if (!relatedElement) return;

      const fromPoint = getElementCenter(activeElement, containerRect);
      const toPoint = getElementCenter(relatedElement, containerRect);

      newConnections.push({
        from: fromPoint,
        to: toPoint,
        color: activeSkillObj.color
      });
    });

    setConnections(newConnections);
  }, [activeSkill, skillElements]);

  // Registrar os elementos DOM das skills
  const registerSkillElement = (name: string, element: HTMLElement | null) => {
    if (element) {
      setSkillElements(prev => ({
        ...prev,
        [name]: element
      }));
    }
  };

  // Agrupar skills por categoria
  const categorizedSkills: { [key: string]: Skill[] } = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as { [key: string]: Skill[] });

  // Função para verificar se duas skills estão relacionadas
  const areSkillsRelated = (skill1: string, skill2: string): boolean => {
    const s1 = skills.find(s => s.name === skill1);
    return s1 ? s1.related.includes(skill2) : false;
  };

  return (
    <motion.section
      id="skills"
      className="px-6 py-12 md:p-12 text-center container mx-auto relative overflow-hidden"
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
        Skills & Tecnologias
      </motion.h2>

      {/* Container com referência para cálculo de posições */}
      <div className="relative z-10" ref={containerRef}>
        {/* Linhas de conexão SVG */}
        <svg className="absolute inset-0 pointer-events-none">
          <defs>
            <marker
              id="arrowhead"
              markerWidth="6"
              markerHeight="6"
              refX="5"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 6 3, 0 6" fill="currentColor" />
            </marker>
          </defs>

          {connections.map((conn, i) => (
            <motion.path
              key={`connection-${i}`}
              d={`M${conn.from.x},${conn.from.y} Q${(conn.from.x + conn.to.x) / 2},${(conn.from.y + conn.to.y) / 2 - 20} ${conn.to.x},${conn.to.y}`}
              stroke={conn.color}
              strokeWidth="2"
              strokeDasharray="5,3"
              fill="none"
              markerEnd="url(#arrowhead)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.7 }}
              transition={{ duration: 0.6 }}
              style={{ color: conn.color }}
            />
          ))}
        </svg>

        {/* Skills agrupadas por categoria */}
        {Object.entries(categorizedSkills).map(([category, categorySkills]) => (
          <motion.div
            key={category}
            className="mb-10"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 }
            }}
          >
            <h3 className="text-xl font-semibold text-purple-400 mb-4">{category}</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {categorySkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  ref={el => registerSkillElement(skill.name, el as HTMLElement)}
                  className="relative"
                  onMouseEnter={() => setActiveSkill(skill.name)}
                  onMouseLeave={() => setActiveSkill(null)}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { delay: 0.1 * index, duration: 0.5 }
                    }
                  }}
                >
                  <motion.div
                    className={`px-4 py-2 rounded-full text-sm cursor-pointer transition-all duration-200 ${activeSkill === skill.name ? 'bg-gray-800' : 'bg-gray-700'
                      }`}
                    style={{
                      borderWidth: "2px",
                      borderStyle: "solid",
                      borderColor: activeSkill === skill.name ||
                        (activeSkill && areSkillsRelated(activeSkill, skill.name))
                        ? skill.color
                        : 'transparent'
                    }}
                    whileHover={{
                      backgroundColor: "#553C9A",
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    }}
                  >
                    {skill.name}
                  </motion.div>

                  {/* Card de detalhes da skill */}
                  <AnimatePresence>
                    {activeSkill === skill.name && (
                      <motion.div
                        className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 bg-gray-800 border-2 p-3 rounded-md shadow-lg w-48 z-20"
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
                        style={{ borderColor: skill.color }}
                      >
                        {/* Triângulo indicador */}
                        <div
                          className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-full w-0 h-0"
                          style={{
                            borderLeft: '8px solid transparent',
                            borderRight: '8px solid transparent',
                            borderTop: `8px solid ${skill.color}`
                          }}
                        />

                        <div className="h-20 flex items-center justify-center mb-2 border-b border-gray-700 pb-2">
                          {skill.demo}
                        </div>

                        <div className="text-xs">
                          {skill.related.length > 0 ? (
                            <div>
                              <span className="text-gray-400 block mb-1">Relacionado com:</span>
                              <div className="flex flex-wrap gap-1 justify-center">
                                {skill.related.map(rel => (
                                  <span key={rel} className="px-2 py-1 bg-gray-700 rounded-md text-white">
                                    {rel}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <span className="text-gray-400">Tecnologia independente</span>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default EnhancedSkillsSection;