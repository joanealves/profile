import React, { useEffect, useRef } from "react";

const NeuralNetworkBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const mousePositionRef = useRef({ x: 0, y: 0 });
    const animationFrameRef = useRef<number | null>(null);
    const particlesRef = useRef<any[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Configurações das partículas
        const particleCount = 100;
        const connectionDistance = 120;

        // Classe de Partícula
        class Particle {
            x: number;
            y: number;
            radius: number;
            speedX: number;
            speedY: number;
            color: string;
            originalX: number;
            originalY: number;

            constructor(width: number, height: number) {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.originalX = this.x;
                this.originalY = this.y;
                this.radius = Math.random() * 2 + 1;
                this.speedX = (Math.random() - 0.5) * 1.5; // Reduced speed for smoother movement
                this.speedY = (Math.random() - 0.5) * 1.5;
                this.color = `rgba(135, 206, 250, ${Math.random() * 0.5 + 0.2})`;
            }

            draw(ctx: CanvasRenderingContext2D) {
                ctx.beginPath();
                ctx.fillStyle = this.color;
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fill();
            }

            update(width: number, height: number, mouseX?: number, mouseY?: number) {
                // Movimento básico
                this.x += this.speedX;
                this.y += this.speedY;

                // Interação com mouse (mais suave)
                if (mouseX !== undefined && mouseY !== undefined) {
                    const dx = mouseX - this.x;
                    const dy = mouseY - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        const force = 0.03; // Reduced force for more subtle effect
                        this.x -= dx * force;
                        this.y -= dy * force;
                    }
                }

                // Bounce nas bordas com efeito de desaceleração
                if (this.x < 0) {
                    this.x = 0;
                    this.speedX *= -0.9;
                } else if (this.x > width) {
                    this.x = width;
                    this.speedX *= -0.9;
                }

                if (this.y < 0) {
                    this.y = 0;
                    this.speedY *= -0.9;
                } else if (this.y > height) {
                    this.y = height;
                    this.speedY *= -0.9;
                }

                // Subtle return to original path
                this.speedX += (this.originalX - this.x) * 0.0001;
                this.speedY += (this.originalY - this.y) * 0.0001;

                // Apply friction to prevent excessive speed
                this.speedX *= 0.99;
                this.speedY *= 0.99;
            }
        }

        // Create particles array - MOVIDO PARA ANTES DE SER USADO
        const initParticles = () => {
            if (!canvas) return;

            particlesRef.current = Array.from(
                { length: particleCount },
                () => new Particle(canvas.width, canvas.height)
            );
        };

        // Set initial dimensions
        const setCanvasDimensions = () => {
            if (canvas) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;

                // Agora initParticles já está declarada antes de ser usada
                initParticles();
            }
        };

        setCanvasDimensions();

        // Animation function
        const animate = () => {
            if (!canvas || !ctx) return;

            // Clear canvas with slight trail effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw connections between nearby particles
            for (let i = 0; i < particlesRef.current.length; i++) {
                for (let j = i + 1; j < particlesRef.current.length; j++) {
                    const dx = particlesRef.current[i].x - particlesRef.current[j].x;
                    const dy = particlesRef.current[i].y - particlesRef.current[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        const opacity = 1 - distance / connectionDistance;
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(135, 206, 250, ${opacity * 0.5})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y);
                        ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y);
                        ctx.stroke();
                    }
                }

                // Update and draw each particle
                particlesRef.current[i].update(
                    canvas.width,
                    canvas.height,
                    mousePositionRef.current.x,
                    mousePositionRef.current.y
                );
                particlesRef.current[i].draw(ctx);
            }

            // Request next frame
            animationFrameRef.current = requestAnimationFrame(animate);
        };

        // Start animation
        animate();

        // Throttled mouse move handler
        let lastTime = 0;
        const throttleMs = 16; // ~60fps

        const handleMouseMove = (event: MouseEvent) => {
            const currentTime = Date.now();
            if (currentTime - lastTime < throttleMs) return;

            lastTime = currentTime;
            mousePositionRef.current = { x: event.clientX, y: event.clientY };
        };

        // Handle window resize
        const handleResize = () => {
            setCanvasDimensions();
        };

        // Add event listeners
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', handleResize);

        // Clean up on unmount
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            if (animationFrameRef.current !== null) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 opacity-40 pointer-events-none"
        />
    );
};

export default NeuralNetworkBackground;