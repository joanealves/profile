import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Skill {
  name: string;
  category: string;
  related: string[];
  color: string;
  icon?: React.ReactNode;
  demo?: React.ReactNode;
}

const ReactDemo = () => (
  <div className="h-full flex items-center justify-center">
    <div className="animate-spin h-6 w-6 border-2 border-blue-500 rounded-full border-t-transparent"></div>
  </div>
);

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

const TailwindDemo = () => (
  <div className="grid grid-cols-3 gap-1">
    {['bg-blue-500', 'bg-indigo-500', 'bg-purple-500', 'bg-pink-500', 'bg-red-500', 'bg-orange-500'].map((color, i) => (
      <div key={i} className={`${color} h-2 w-2 rounded-full`}></div>
    ))}
  </div>
);

const TypeScriptDemo = () => (
  <div className="text-xs font-mono text-blue-400">
    <span className="text-purple-400">interface</span> User {"{"}
    <span className="text-yellow-400">name</span>: <span className="text-green-400">string</span>
    {"}"}
  </div>
);

const NextJSDemo = () => (
  <div className="flex items-center justify-center">
    <div className="relative h-4 w-4">
      <div className="absolute inset-0 bg-white rounded-full animate-pulse"></div>
      <div className="absolute inset-0 bg-black rounded-full scale-75"></div>
    </div>
  </div>
);

interface ConnectionPoint {
  x: number;
  y: number;
}

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
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Frontend": return "#61DAFB"; 
      case "Backend": return "#3776AB";  
      case "Database": return "#4479A1"; 
      case "Design": return "#F24E1E";   
      case "Tools": return "#F05032";    
      default: return "#9333EA";         
    }
  };

  const getElementCenter = (element: HTMLElement, containerRect: DOMRect): ConnectionPoint => {
    const rect = element.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2 - containerRect.left,
      y: rect.top + rect.height / 2 - containerRect.top
    };
  };

  useEffect(() => {
    if (!activeSkill || !containerRef.current) return;

    const activeElement = skillElements[activeSkill];
    if (!activeElement) return;

    const containerRect = containerRef.current.getBoundingClientRect();

    const activeSkillObj = skills.find(s => s.name === activeSkill);
    if (!activeSkillObj) return;

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

  const registerSkillElement = (name: string, element: HTMLElement | null) => {
    if (element) {
      setSkillElements(prev => ({
        ...prev,
        [name]: element
      }));
    }
  };

  const categorizedSkills: { [key: string]: Skill[] } = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as { [key: string]: Skill[] });

  const areSkillsRelated = (skill1: string, skill2: string): boolean => {
    const s1 = skills.find(s => s.name === skill1);
    return s1 ? s1.related.includes(skill2) : false;
  };

  return (
    <motion.section
      id="skills"
      className="px-6 py-16 md:p-16 text-center container mx-auto relative overflow-hidden"
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
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 1.5 }}
      >
        <div className="absolute inset-0 bg-grid-pattern"></div>
      </motion.div>

      <motion.h2
        className="text-4xl font-bold mb-12 relative"
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
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Skills & Tecnologias
        </span>
        <motion.div
          className="h-1 w-24 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mt-2 mx-auto"
          initial={{ width: 0 }}
          whileInView={{ width: 96 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
        />
      </motion.h2>

      <div className="relative z-10" ref={containerRef}>
        <svg className="absolute inset-0 pointer-events-none">
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

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
              filter="url(#glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.7 }}
              transition={{ duration: 0.6 }}
              style={{ color: conn.color }}
            />
          ))}
        </svg>

        {Object.entries(categorizedSkills).map(([category, categorySkills]) => (
          <motion.div
            key={category}
            className="mb-16 relative p-6 rounded-xl bg-gradient-to-b from-gray-800/50 to-gray-900/30"
            onMouseEnter={() => setHoveredCategory(category)}
            onMouseLeave={() => setHoveredCategory(null)}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 }
            }}
          >
            <div className="flex items-center justify-center mb-8">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-gray-600 mr-4"></div>
              <motion.h3
                className="text-xl font-semibold px-5 py-2 rounded-lg flex items-center justify-center gap-2 relative"
                whileHover={{ scale: 1.05 }}
                style={{
                  background: `linear-gradient(90deg, rgba(17,24,39,0.8) 0%, rgba(${hoveredCategory === category ? '78, 78, 78' : '31, 41, 55'}, 0.4) 100%)`,
                  borderLeft: `4px solid ${getCategoryColor(category)}`
                }}
              >
                <motion.span
                  initial={{ color: "#fff" }}
                  animate={{ color: hoveredCategory === category ? getCategoryColor(category) : "#fff" }}
                  transition={{ duration: 0.3 }}
                >
                  {category}
                </motion.span>

                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${getCategoryColor(category)}, transparent)`
                  }}
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                />
              </motion.h3>
              <div className="h-px w-16 bg-gradient-to-r from-gray-600 to-transparent ml-4"></div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 relative">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <motion.div
                  className="h-32 w-32 rounded-full border border-dashed opacity-20"
                  style={{ borderColor: getCategoryColor(category) }}
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.1, 0.3, 0.1],
                    rotate: 360
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                <motion.div
                  className="absolute h-24 w-24 rounded-full border border-dashed opacity-20"
                  style={{ borderColor: getCategoryColor(category) }}
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.2, 0.4, 0.2],
                    rotate: -360
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                <motion.div
                  className="absolute h-16 w-16 rounded-full border border-dashed opacity-20"
                  style={{ borderColor: getCategoryColor(category) }}
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.1, 0.2, 0.1],
                    rotate: 180
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />

                <div
                  className="h-12 w-12 rounded-full flex items-center justify-center text-xs"
                  style={{
                    backgroundColor: `${getCategoryColor(category)}20`,
                    border: `1px solid ${getCategoryColor(category)}40`
                  }}
                >
                  <motion.span
                    className="opacity-60"
                    animate={{ opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ color: getCategoryColor(category) }}
                  >
                    {category.substring(0, 2)}
                  </motion.span>
                </div>
              </div>

              {categorySkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  ref={el => registerSkillElement(skill.name, el as HTMLElement)}
                  className="relative z-10"
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
                    className={`px-4 py-2 rounded-full text-sm cursor-pointer transition-all duration-200`}
                    style={{
                      backgroundColor: activeSkill === skill.name
                        ? `${skill.color}20`
                        : activeSkill && areSkillsRelated(activeSkill, skill.name)
                          ? `${skill.color}15`
                          : 'rgba(31, 41, 55, 0.8)',
                      borderWidth: "2px",
                      borderStyle: "solid",
                      borderColor: activeSkill === skill.name ||
                        (activeSkill && areSkillsRelated(activeSkill, skill.name))
                        ? skill.color
                        : 'transparent',
                      boxShadow: activeSkill === skill.name ? `0 0 12px ${skill.color}40` : 'none'
                    }}
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    }}
                  >
                    {skill.name}
                  </motion.div>

                  <AnimatePresence>
                    {activeSkill === skill.name && (
                      <motion.div
                        className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 bg-gray-800/90 backdrop-blur-sm border-2 p-3 rounded-md shadow-lg w-48 z-20"
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
                        style={{
                          borderColor: skill.color,
                          boxShadow: `0 4px 20px ${skill.color}30`
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-800/20 to-gray-900/60 rounded-md -z-10"></div>

                        <div
                          className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-full w-0 h-0"
                          style={{
                            borderLeft: '8px solid transparent',
                            borderRight: '8px solid transparent',
                            borderTop: `8px solid ${skill.color}`
                          }}
                        />

                        <div className="text-sm font-medium mb-2 pb-1 border-b border-gray-700 text-center" style={{ color: skill.color }}>
                          {skill.name}
                        </div>

                        <div className="h-20 flex items-center justify-center mb-2 border-b border-gray-700 pb-2">
                          {skill.demo}
                        </div>

                        <div className="text-xs">
                          {skill.related.length > 0 ? (
                            <div>
                              <span className="text-gray-400 block mb-1">Relacionado com:</span>
                              <div className="flex flex-wrap gap-1 justify-center">
                                {skill.related.map(rel => (
                                  <span
                                    key={rel}
                                    className="px-2 py-1 rounded-md text-white text-opacity-80"
                                    style={{
                                      backgroundColor: `${skill.color}20`,
                                      border: `1px solid ${skill.color}40`
                                    }}
                                  >
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

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-full h-full">
          {Object.entries(categorizedSkills).map(([category], index) => (
            <motion.div
              key={`bg-${category}`}
              className="absolute rounded-full opacity-5"
              style={{
                backgroundColor: getCategoryColor(category),
                width: '300px',
                height: '300px',
                top: `${(index * 7 + 10) % 100}%`,
                left: `${(index * 13 + 20) % 100}%`,
                filter: 'blur(80px)'
              }}
              animate={{
                x: [0, 30, 0, -30, 0],
                y: [0, -30, 0, 30, 0],
              }}
              transition={{
                duration: 20 + (index % 10),
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}

        </div>
      </div>
    </motion.section>
  );
};

export default EnhancedSkillsSection;