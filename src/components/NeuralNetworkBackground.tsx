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

        const particleCount = 100;
        const connectionDistance = 120;

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
                this.speedX = (Math.random() - 0.5) * 1.5;  // movement
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
                this.x += this.speedX;
                this.y += this.speedY;

                if (mouseX !== undefined && mouseY !== undefined) {
                    const dx = mouseX - this.x;
                    const dy = mouseY - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        const force = 0.03;
                        this.x -= dx * force;
                        this.y -= dy * force;
                    }
                }

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

                this.speedX += (this.originalX - this.x) * 0.0001;
                this.speedY += (this.originalY - this.y) * 0.0001;

                this.speedX *= 0.99;
                this.speedY *= 0.99;
            }
        }

        const initParticles = () => {
            if (!canvas) return;

            particlesRef.current = Array.from(
                { length: particleCount },
                () => new Particle(canvas.width, canvas.height)
            );
        };

        const setCanvasDimensions = () => {
            if (canvas) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;

                initParticles();
            }
        };

        setCanvasDimensions();

        const animate = () => {
            if (!canvas || !ctx) return;

            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

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

                particlesRef.current[i].update(
                    canvas.width,
                    canvas.height,
                    mousePositionRef.current.x,
                    mousePositionRef.current.y
                );
                particlesRef.current[i].draw(ctx);
            }

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animate();

        let lastTime = 0;
        const throttleMs = 16;

        const handleMouseMove = (event: MouseEvent) => {
            const currentTime = Date.now();
            if (currentTime - lastTime < throttleMs) return;

            lastTime = currentTime;
            mousePositionRef.current = { x: event.clientX, y: event.clientY };
        };

        const handleResize = () => {
            setCanvasDimensions();
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', handleResize);

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