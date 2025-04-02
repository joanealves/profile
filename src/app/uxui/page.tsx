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
    Cross2Icon,
    MagicWandIcon,
    FontStyleIcon,
    AspectRatioIcon,
    ColorWheelIcon
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
    icon?: React.ReactNode;
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

// Componentes de design arrastáveis (expandido)
const designElements: DesignElement[] = [
    { id: "btn-1", type: "button", label: "Botão Primário", color: "bg-blue-500", icon: <MagicWandIcon /> },
    { id: "btn-2", type: "button", label: "Botão Secundário", color: "bg-gray-500", icon: <MagicWandIcon /> },
    { id: "card-1", type: "card", label: "Card Info", color: "bg-indigo-500", icon: <LayoutIcon /> },
    { id: "input-1", type: "input", label: "Campo de Texto", color: "bg-gray-600", icon: <TextIcon /> },
    { id: "toggle-1", type: "toggle", label: "Toggle Switch", color: "bg-green-500", icon: <LayoutIcon /> },
    { id: "img-1", type: "image", label: "Placeholder Imagem", color: "bg-purple-500", icon: <ImageIcon /> },
    { id: "text-1", type: "text", label: "Título H1", color: "bg-yellow-600", icon: <FontStyleIcon /> },
    { id: "text-2", type: "text", label: "Parágrafo", color: "bg-yellow-500", icon: <TextIcon /> },
    { id: "icon-1", type: "icon", label: "Ícone UI", color: "bg-pink-500", icon: <AspectRatioIcon /> },
    { id: "shape-1", type: "shape", label: "Forma Geométrica", color: "bg-orange-500", icon: <ColorWheelIcon /> }
];

// Componente para o cursor personalizado
interface CustomCursorProps {
    mousePosition: MousePosition;
    isDragging: boolean;
    draggedElement: string | null;
}

const CustomCursor: React.FC<CustomCursorProps> = ({ mousePosition, isDragging, draggedElement }) => {
    const [cursorText, setCursorText] = useState("");

    // Determinar qual texto mostrar no cursor (se necessário)
    useEffect(() => {
        if (isDragging && draggedElement) {
            setCursorText("+");
        } else {
            setCursorText("");
        }
    }, [isDragging, draggedElement]);

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
                ${isDragging ? "bg-blue-500" : "bg-white border-2 border-blue-500"}`}
                animate={{
                    scale: isDragging ? 1.2 : 1,
                    opacity: isDragging ? 0.9 : 0.7
                }}
            >
                {cursorText && <span className="text-white text-lg">{cursorText}</span>}
            </motion.div>
        </motion.div>
    );
};

// Componente para elemento de design arrastável
interface DraggableDesignElementProps {
    element: DesignElement;
    onDragStart: (id: string) => void;
    onDrag: (id: string, info: PanInfo) => void;
    onDragEnd: (id: string, info: PanInfo) => void;
}

const DraggableDesignElement: React.FC<DraggableDesignElementProps> = ({
    element,
    onDragStart,
    onDrag,
    onDragEnd
}) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    return (
        <motion.div
            drag
            dragMomentum={false}
            style={{ x, y }}
            onDragStart={() => onDragStart(element.id)}
            onDrag={(_, info) => onDrag(element.id, info)}
            onDragEnd={(_, info) => {
                onDragEnd(element.id, info);
                // Reset position after drag ends
                x.set(0);
                y.set(0);
            }}
            whileDrag={{ scale: 1.05, zIndex: 20 }}
            className={`${element.color} rounded-md p-3 mb-3 cursor-grab active:cursor-grabbing shadow-lg text-white flex items-center`}
        >
            {element.icon ? <span className="mr-2">{element.icon}</span> : <DragHandleDots2Icon className="mr-2" />}
            {element.label}
        </motion.div>
    );
};

// Componente para renderizar o elemento posicionado no canvas
interface CanvasElementProps {
    item: DroppedElement;
    onRemoveElement: (instanceId: string) => void;
    onStartDrag: (instanceId: string) => void;
    onDragElement: (instanceId: string, newX: number, newY: number) => void;
}

const CanvasElement: React.FC<CanvasElementProps> = ({
    item,
    onRemoveElement,
    onStartDrag,
    onDragElement
}) => {
    const elementRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    // Cria motion values para controlar a posição
    const x = useMotionValue(item.x);
    const y = useMotionValue(item.y);

    // Atualiza os motion values quando os props mudam
    useEffect(() => {
        x.set(item.x);
        y.set(item.y);
    }, [item.x, item.y]);

    // Renderiza o elemento de design baseado no tipo
    const renderElementContent = () => {
        switch (item.element.type) {
            case 'button':
                return (
                    <div className={`flex justify-between items-center w-full`}>
                        <span className="mr-2">{item.element.icon || <MagicWandIcon />}</span>
                        {item.element.label}
                        <button
                            onClick={() => onRemoveElement(item.instanceId)}
                            className="ml-3 rounded-full bg-white/10 p-1 hover:bg-white/30"
                        >
                            <Cross2Icon />
                        </button>
                    </div>
                );
            case 'card':
                return (
                    <div className="w-48">
                        <div className="flex justify-between items-center mb-2">
                            <span>{item.element.label}</span>
                            <button
                                onClick={() => onRemoveElement(item.instanceId)}
                                className="rounded-full bg-white/10 p-1 hover:bg-white/30"
                            >
                                <Cross2Icon />
                            </button>
                        </div>
                        <div className="bg-black/30 p-2 rounded mt-2 text-sm">
                            Conteúdo do card
                        </div>
                    </div>
                );
            case 'input':
                return (
                    <div className="w-40">
                        <div className="flex justify-between items-center mb-2">
                            <span>{item.element.label}</span>
                            <button
                                onClick={() => onRemoveElement(item.instanceId)}
                                className="rounded-full bg-white/10 p-1 hover:bg-white/30"
                            >
                                <Cross2Icon />
                            </button>
                        </div>
                        <div className="bg-black/30 p-2 rounded mt-1 text-sm border border-white/20">
                            Nome
                        </div>
                    </div>
                );
            case 'image':
                return (
                    <div className="w-40">
                        <div className="flex justify-between items-center mb-2">
                            <span>{item.element.label}</span>
                            <button
                                onClick={() => onRemoveElement(item.instanceId)}
                                className="rounded-full bg-white/10 p-1 hover:bg-white/30"
                            >
                                <Cross2Icon />
                            </button>
                        </div>
                        <div className="bg-black/30 h-24 flex items-center justify-center border border-white/20 rounded">
                            <ImageIcon className="w-8 h-8 text-white/50" />
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="flex justify-between items-center">
                        {item.element.label}
                        <button
                            onClick={() => onRemoveElement(item.instanceId)}
                            className="ml-3 rounded-full bg-white/10 p-1 hover:bg-white/30"
                        >
                            <Cross2Icon />
                        </button>
                    </div>
                );
        }
    };

    return (
        <motion.div
            ref={elementRef}
            drag
            dragMomentum={false}
            style={{ x, y }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className={`absolute ${item.element.color} rounded-md p-3 shadow-lg text-white cursor-move hover:shadow-xl transition-shadow`}
            onDragStart={() => {
                setIsDragging(true);
                onStartDrag(item.instanceId);
            }}
            onDrag={(_, info) => {
                // Calcula a nova posição sem sair do canvas
                const newX = Math.max(0, Math.min(info.point.x - (elementRef.current?.offsetWidth || 0) / 2,
                    (elementRef.current?.parentElement?.offsetWidth || 0) - (elementRef.current?.offsetWidth || 0)));
                const newY = Math.max(0, Math.min(info.point.y - (elementRef.current?.offsetHeight || 0) / 2,
                    (elementRef.current?.parentElement?.offsetHeight || 0) - (elementRef.current?.offsetHeight || 0)));

                // Atualiza a posição no componente pai
                onDragElement(item.instanceId, newX, newY);
            }}
            onDragEnd={() => {
                setIsDragging(false);
            }}
            whileDrag={{
                zIndex: 30,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5)"
            }}
        >
            {renderElementContent()}
        </motion.div>
    );
};

// Componente para área de canvas
interface DesignCanvasProps {
    droppedElements: DroppedElement[];
    onRemoveElement: (instanceId: string) => void;
    onStartDragElement: (instanceId: string) => void;
    onDragElement: (instanceId: string, newX: number, newY: number) => void;
}

const DesignCanvas: React.FC<DesignCanvasProps> = ({
    droppedElements,
    onRemoveElement,
    onStartDragElement,
    onDragElement
}) => {
    return (
        <div className="bg-gray-700 rounded-lg p-6 min-h-96 relative overflow-hidden">
            <div className="absolute top-4 left-4 opacity-20 text-lg">Canvas de Design</div>

            {/* Grade de referência */}
            <div className="absolute inset-0 grid grid-cols-12 gap-1 pointer-events-none">
                {Array(12).fill(0).map((_, i) => (
                    <div key={`col-${i}`} className="h-full border-l border-white/10" />
                ))}
                {Array(12).fill(0).map((_, i) => (
                    <div key={`row-${i}`} className="w-full border-t border-white/10" />
                ))}
            </div>

            {/* Elementos posicionados no canvas */}
            <AnimatePresence>
                {droppedElements.map((item) => (
                    <CanvasElement
                        key={item.instanceId}
                        item={item}
                        onRemoveElement={onRemoveElement}
                        onStartDrag={onStartDragElement}
                        onDragElement={onDragElement}
                    />
                ))}
            </AnimatePresence>

            {/* Mensagem quando o canvas está vazio */}
            {droppedElements.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 pointer-events-none">
                    <div className="text-center">
                        <LayoutIcon className="w-12 h-12 mx-auto mb-4 opacity-30" />
                        <p>Arraste elementos do painel esquerdo para começar a desenhar</p>
                    </div>
                </div>
            )}
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

// Componente auxiliar para ferramentas de design
const DesignTools: React.FC = () => {
    return (
        <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <h3 className="text-sm font-medium mb-3 text-gray-300">Ferramentas</h3>
            <div className="flex flex-wrap gap-2">
                {["Seleção", "Alinhar", "Distribuir", "Agrupar", "Camadas"].map((tool) => (
                    <Button key={tool} variant="outline" size="sm" className="text-xs">
                        {tool}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default function UXUI() {
    const [activeTab, setActiveTab] = useState("process");
    const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
    const [droppedElements, setDroppedElements] = useState<DroppedElement[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [draggedElementId, setDraggedElementId] = useState<string | null>(null);
    const canvasRef = useRef<HTMLDivElement>(null);

    // Acompanhar posição do mouse
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    // Iniciar o arrastar
    const handleDragStart = (id: string) => {
        setIsDragging(true);
        setDraggedElementId(id);
    };

    // Gerenciar arrastar e soltar
    const handleDrag = (id: string, info: PanInfo) => {
        // Mostrar indicador visual durante o arrastar
        setIsDragging(true);
        setDraggedElementId(id);

        // Para efeitos visuais adicionais durante o arrastar
        // (já implementados através do whileDrag no componente)
    };

    const handleDragEnd = (id: string, info: PanInfo) => {
        if (!canvasRef.current) return;

        const canvasBounds = canvasRef.current.getBoundingClientRect();

        // Verificar se o elemento foi solto dentro do canvas
        if (
            info.point.x >= canvasBounds.left &&
            info.point.x <= canvasBounds.right &&
            info.point.y >= canvasBounds.top &&
            info.point.y <= canvasBounds.bottom
        ) {
            // Calcular posição relativa ao canvas
            const x = info.point.x - canvasBounds.left;
            const y = info.point.y - canvasBounds.top;

            const element = designElements.find(el => el.id === id);
            if (element) {
                // Adicionar novo elemento com posição precisa
                setDroppedElements(prev => [
                    ...prev,
                    {
                        instanceId: `${id}-${Date.now()}`,
                        element,
                        x,
                        y
                    }
                ]);
            }
        }

        // Resetar estado após o drop
        setIsDragging(false);
        setDraggedElementId(null);
    };

    const handleRemoveElement = (instanceId: string) => {
        setDroppedElements(prev => prev.filter(item => item.instanceId !== instanceId));
    };

    // Manipular início de arrastar elemento do canvas
    const handleStartDragElement = (instanceId: string) => {
        setIsDragging(true);
    };

    // Manipular arrastar elemento dentro do canvas
    const handleDragElement = (instanceId: string, newX: number, newY: number) => {
        setDroppedElements(prev =>
            prev.map(item =>
                item.instanceId === instanceId
                    ? { ...item, x: newX, y: newY }
                    : item
            )
        );
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen relative">
            {/* Cursor personalizado */}
            <CustomCursor
                mousePosition={mousePosition}
                isDragging={isDragging}
                draggedElement={draggedElementId}
            />

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
                        {/* Processo de Design */}
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
                                        onDragStart={handleDragStart}
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
                                    onStartDragElement={handleStartDragElement}
                                    onDragElement={handleDragElement}
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