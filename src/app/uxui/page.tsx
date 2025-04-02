"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, AnimatePresence, PanInfo } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    DragHandleDots2Icon,
    MixerHorizontalIcon,
    LayoutIcon,
    ImageIcon,
    TextIcon,
    CheckIcon,
    Cross2Icon
} from "@radix-ui/react-icons";

// Interfaces para tipagem
interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    tags: string[];
}

interface DesignElement {
    id: string;
    type: string;
    label: string;
    color: string;
}

interface DroppedElement {
    instanceId: string;
    element: DesignElement;
    x: number;
    y: number;
}

interface MousePosition {
    x: number;
    y: number;
}

// Mock data dos projetos
const projectsData: Project[] = [
    {
        id: 1,
        title: "Redesign App Bancário",
        description: "Reformulação completa da experiência do usuário para um aplicativo bancário de grande porte.",
        image: "/api/placeholder/600/400",
        tags: ["Mobile", "Fintech", "Design System"]
    },
    {
        id: 2,
        title: "Dashboard Analytics",
        description: "Design de interface para dashboard com visualização de dados complexos.",
        image: "/api/placeholder/600/400",
        tags: ["Web", "Data Viz", "B2B"]
    },
    {
        id: 3,
        title: "E-commerce UI Kit",
        description: "Kit de componentes para plataformas de comércio eletrônico.",
        image: "/api/placeholder/600/400",
        tags: ["Design System", "E-commerce", "Components"]
    }
];

// Componentes de design arrastáveis
const designElements: DesignElement[] = [
    { id: "btn-1", type: "button", label: "Botão Primário", color: "bg-blue-500" },
    { id: "btn-2", type: "button", label: "Botão Secundário", color: "bg-gray-500" },
    { id: "card-1", type: "card", label: "Card Info", color: "bg-indigo-500" },
    { id: "input-1", type: "input", label: "Campo de Texto", color: "bg-gray-600" },
    { id: "toggle-1", type: "toggle", label: "Toggle Switch", color: "bg-green-500" }
];

// Componente para o cursor personalizado
interface CustomCursorProps {
    mousePosition: MousePosition;
}

const CustomCursor: React.FC<CustomCursorProps> = ({ mousePosition }) => {
    const [cursorText, setCursorText] = useState("");
    const [isInteracting, setIsInteracting] = useState(false);

    return (
        <motion.div
            className="fixed pointer-events-none z-50 flex items-center justify-center"
            style={{
                x: mousePosition.x - 16,
                y: mousePosition.y - 16,
            }}
        >
            <motion.div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs
                ${isInteracting ? "bg-blue-500" : "bg-white border-2 border-blue-500"}`}
            >
                {cursorText && <span className="text-white">{cursorText}</span>}
            </motion.div>
        </motion.div>
    );
};

// Componente para elemento de design arrastável
interface DraggableDesignElementProps {
    element: DesignElement;
    onDrag: (id: string, info: PanInfo) => void;
    onDragEnd: (id: string, info: PanInfo) => void;
}

const DraggableDesignElement: React.FC<DraggableDesignElementProps> = ({ element, onDrag, onDragEnd }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    return (
        <motion.div
            drag
            dragMomentum={false}
            style={{ x, y }}
            onDrag={(_, info) => onDrag(element.id, info)}
            onDragEnd={(_, info) => onDragEnd(element.id, info)}
            whileDrag={{ scale: 1.05, zIndex: 20 }}
            className={`${element.color} rounded-md p-3 mb-3 cursor-grab active:cursor-grabbing shadow-lg text-white flex items-center`}
        >
            <DragHandleDots2Icon className="mr-2" />
            {element.label}
        </motion.div>
    );
};

// Componente para área de canvas
interface DesignCanvasProps {
    droppedElements: DroppedElement[];
    onRemoveElement: (instanceId: string) => void;
}

const DesignCanvas: React.FC<DesignCanvasProps> = ({ droppedElements, onRemoveElement }) => {
    return (
        <div className="bg-gray-700 rounded-lg p-6 min-h-96 relative">
            <div className="absolute top-4 left-4 opacity-20 text-lg">Canvas de Design</div>

            {/* Grade de referência */}
            <div className="absolute inset-0 grid grid-cols-12 gap-1 pointer-events-none">
                {Array(12).fill(0).map((_, i) => (
                    <div key={i} className="h-full border-l border-white/10" />
                ))}
                {Array(12).fill(0).map((_, i) => (
                    <div key={i} className="w-full border-t border-white/10" />
                ))}
            </div>

            {/* Elementos posicionados no canvas */}
            <AnimatePresence>
                {droppedElements.map((item) => (
                    <motion.div
                        key={`${item.id}-${item.instanceId}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className={`absolute ${item.element.color} rounded-md p-3 shadow-lg text-white`}
                        style={{ left: item.x, top: item.y, zIndex: 10 }}
                    >
                        <div className="flex justify-between items-center">
                            {item.element.label}
                            <button
                                onClick={() => onRemoveElement(item.instanceId)}
                                className="ml-3 rounded-full bg-white/10 p-1 hover:bg-white/30"
                            >
                                <Cross2Icon />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

// Componente para showcase de projetos
const ProjectShowcase: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {projectsData.map((project) => (
                <motion.div
                    key={project.id}
                    whileHover={{ y: -10, transition: { duration: 0.3 } }}
                    className="group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: project.id * 0.1 }}
                >
                    <Card className="bg-gray-800 border-gray-700 overflow-hidden h-full">
                        <div className="relative h-48 overflow-hidden">
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60" />
                        </div>
                        <CardHeader>
                            <CardTitle className="text-xl text-white">{project.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-400">{project.description}</p>
                            <div className="flex flex-wrap gap-2 mt-4">
                                {project.tags.map((tag) => (
                                    <span key={tag} className="bg-gray-700 text-gray-300 px-2 py-1 rounded-md text-xs">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" className="w-full">Ver Detalhes</Button>
                        </CardFooter>
                    </Card>
                </motion.div>
            ))}
        </div>
    );
};

export default function UXUI() {
    const [activeTab, setActiveTab] = useState("process");
    const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
    const [droppedElements, setDroppedElements] = useState<DroppedElement[]>([]);
    const canvasRef = useRef<HTMLDivElement>(null);

    // Acompanhar posição do mouse
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    // Gerenciar arrastar e soltar
    const handleDrag = (id: string, info: PanInfo) => {
        // Implementação futura para indicadores visuais durante o arrastar
    };

    const handleDragEnd = (id: string, info: PanInfo) => {
        if (!canvasRef.current) return;

        const canvasBounds = canvasRef.current.getBoundingClientRect();
        const x = info.point.x - canvasBounds.left;
        const y = info.point.y - canvasBounds.top;

        // Verificar se o elemento foi solto dentro do canvas
        if (
            x >= 0 &&
            x <= canvasBounds.width &&
            y >= 0 &&
            y <= canvasBounds.height
        ) {
            const element = designElements.find(el => el.id === id);
            if (element) {
                setDroppedElements(prev => [
                    ...prev,
                    {
                        instanceId: `${id}-${Date.now()}`,
                        element,
                        x,
                        y,
                        id // Adicionando id para compatibilidade com a key do React
                    }
                ]);
            }
        }
    };

    const handleRemoveElement = (instanceId: string) => {
        setDroppedElements(prev => prev.filter(item => item.instanceId !== instanceId));
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen relative">
            {/* Cursor personalizado */}
            <CustomCursor mousePosition={mousePosition} />

            <header className="p-6 flex justify-between items-center bg-gray-900/90 backdrop-blur-md sticky top-0 z-20">
                <Link href="/">
                    <h1 className="text-2xl font-bold">Joane Alves</h1>
                </Link>
                <nav aria-label="Navegação Principal">
                    <ul className="flex gap-6">
                        <li>
                            <Link href="/" className="hover:text-gray-400 transition-colors">
                                Voltar ao Portfólio
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>

            <main className="container mx-auto p-8">
                <motion.div
                    className="flex flex-col md:flex-row md:items-center justify-between mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div>
                        <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                            UX/UI Design
                        </h1>
                        <p className="text-xl mb-6 text-gray-300 max-w-2xl">
                            Transformando conceitos em experiências intuitivas.
                            Minha abordagem para criar interfaces que encantam usuários
                            e resolvem problemas reais.
                        </p>
                    </div>

                    <motion.div
                        className="hidden md:flex items-center gap-3 text-gray-400"
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="flex items-center gap-2 border border-gray-700 rounded-full px-4 py-2">
                            <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
                            Disponível para Projetos
                        </div>
                    </motion.div>
                </motion.div>

                <Tabs defaultValue="process" className="w-full" onValueChange={setActiveTab}>
                    <TabsList className="grid grid-cols-3 mb-8">
                        <TabsTrigger value="process">Processo de Design</TabsTrigger>
                        <TabsTrigger value="interactive">Design Interativo</TabsTrigger>
                        <TabsTrigger value="projects">Projetos</TabsTrigger>
                    </TabsList>

                    <TabsContent value="process" className="space-y-12">
                        {/* Processo de Design - Mantendo o conteúdo original e melhorando */}
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 gap-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Card className="bg-gray-800 border-gray-700 h-full overflow-hidden relative">
                                <div className="absolute -right-12 -top-12 w-40 h-40 rounded-full bg-blue-500/10 blur-2xl"></div>
                                <CardHeader>
                                    <CardTitle className="text-2xl text-white">Design Centrado no Usuário</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-400">
                                        Meu processo de design é totalmente focado nas necessidades, objetivos e preferências dos usuários.
                                        Através de pesquisas detalhadas e testes de usabilidade, crio soluções que não apenas resolvem
                                        problemas reais, mas também proporcionam experiências agradáveis.
                                    </p>
                                    <div className="mt-6 flex items-center gap-3 text-gray-400">
                                        <span className="text-sm bg-gray-700 px-3 py-1 rounded-full">Entrevistas</span>
                                        <span className="text-sm bg-gray-700 px-3 py-1 rounded-full">Personas</span>
                                        <span className="text-sm bg-gray-700 px-3 py-1 rounded-full">Jornadas</span>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-gray-800 border-gray-700 h-full overflow-hidden relative">
                                <div className="absolute -left-12 -bottom-12 w-40 h-40 rounded-full bg-purple-500/10 blur-2xl"></div>
                                <CardHeader>
                                    <CardTitle className="text-2xl text-white">Interfaces Intuitivas</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-400">
                                        Desenvolvo interfaces que são fáceis de entender e navegar, com elementos visuais consistentes
                                        e hierarquia clara. Meu objetivo é criar designs que os usuários possam utilizar de forma
                                        natural e sem esforço.
                                    </p>
                                    <div className="mt-6 flex items-center gap-3 text-gray-400">
                                        <span className="text-sm bg-gray-700 px-3 py-1 rounded-full">Usabilidade</span>
                                        <span className="text-sm bg-gray-700 px-3 py-1 rounded-full">Acessibilidade</span>
                                        <span className="text-sm bg-gray-700 px-3 py-1 rounded-full">Design Systems</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div
                            className="mt-12"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                        >
                            <h2 className="text-2xl font-bold mb-6">Meu Processo de Design</h2>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                {[
                                    {
                                        phase: "Pesquisa",
                                        desc: "Entendendo os usuários e suas necessidades",
                                        icon: <MixerHorizontalIcon className="w-8 h-8 text-blue-400" />
                                    },
                                    {
                                        phase: "Protótipo",
                                        desc: "Desenvolvendo soluções visuais e testando conceitos",
                                        icon: <LayoutIcon className="w-8 h-8 text-purple-400" />
                                    },
                                    {
                                        phase: "Teste",
                                        desc: "Validando designs e coletando feedback",
                                        icon: <CheckIcon className="w-8 h-8 text-green-400" />
                                    },
                                    {
                                        phase: "Iteração",
                                        desc: "Refinando com base em dados e insights",
                                        icon: <Cross2Icon className="w-8 h-8 text-red-400" />
                                    }
                                ].map((item, index) => (
                                    <motion.div
                                        key={item.phase}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                                    >
                                        <Card className="bg-gray-800 border-gray-700 h-full group hover:bg-gray-750 transition-all">
                                            <CardHeader className="pb-2">
                                                <div className="mb-3">{item.icon}</div>
                                                <CardTitle className="text-xl text-white">{item.phase}</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-gray-400">{item.desc}</p>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </TabsContent>

                    <TabsContent value="interactive">
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                            {/* Painel lateral com elementos arrastáveis */}
                            <div className="col-span-1 bg-gray-800 rounded-lg p-4">
                                <h3 className="text-lg font-medium mb-4 text-gray-300">Componentes</h3>
                                <p className="text-sm text-gray-400 mb-6">
                                    Arraste e solte os elementos para o canvas para criar sua interface.
                                </p>

                                {designElements.map((element) => (
                                    <DraggableDesignElement
                                        key={element.id}
                                        element={element}
                                        onDrag={handleDrag}
                                        onDragEnd={handleDragEnd}
                                    />
                                ))}

                                <div className="mt-6 pt-4 border-t border-gray-700">
                                    <h4 className="text-sm font-medium mb-2 text-gray-400">Instruções</h4>
                                    <ul className="text-xs text-gray-500 space-y-2">
                                        <li className="flex items-center gap-2">
                                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                            Arraste elementos para o canvas
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                            Clique no X para remover
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Canvas de design interativo */}
                            <div className="col-span-1 lg:col-span-4" ref={canvasRef}>
                                <DesignCanvas
                                    droppedElements={droppedElements}
                                    onRemoveElement={handleRemoveElement}
                                />

                                <div className="mt-4 flex gap-4 justify-end">
                                    <Button variant="outline" onClick={() => setDroppedElements([])}>
                                        Limpar Canvas
                                    </Button>
                                    <Button variant="default">
                                        Exportar Design
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 bg-gray-800 rounded-lg p-6">
                            <h3 className="text-xl font-medium mb-4">Sobre esta Ferramenta</h3>
                            <p className="text-gray-400">
                                Esta demonstração interativa simula um ambiente simplificado de design de interfaces.
                                Em meu processo real de trabalho, utilizo ferramentas profissionais como Figma e Adobe XD
                                para criar protótipos de alta fidelidade com interações complexas e testes de usabilidade.
                            </p>
                        </div>
                    </TabsContent>

                    <TabsContent value="projects">
                        <ProjectShowcase />
                    </TabsContent>
                </Tabs>
            </main>

            <footer className="p-6 text-center text-gray-400 bg-gray-950">
                <p>© {new Date().getFullYear()} Joane Alves - Todos os direitos reservados.</p>
            </footer>
        </div>
    );
}