import React, { useEffect, useRef } from "react";

// Interface para definir a estrutura da partícula
interface ParticleInterface {
    x: number;
    y: number;
    radius: number;
    speedX: number;
    speedY: number;
    color: string;
    draw: (ctx: CanvasRenderingContext2D) => void;
    update: (width: number, height: number) => void;
}

const NeuralNetworkBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        // Verificação de nulidade segura
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Configurações de dimensão
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        // Resize inicial
        resizeCanvas();

        // Configurações das partículas
        const particleCount = 100;
        const connectionDistance = 150;

        // Classe de Partícula com tipagem adequada
        class Particle implements ParticleInterface {
            x: number;
            y: number;
            radius: number;
            speedX: number;
            speedY: number;
            color: string;

            constructor(width: number, height: number) {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.radius = Math.random() * 3 + 1;
                this.speedX = (Math.random() - 0.5) * 2;
                this.speedY = (Math.random() - 0.5) * 2;
                this.color = `rgba(135, 206, 250, ${Math.random() * 0.5 + 0.2})`;
            }

            // Método de desenho
            draw(ctx: CanvasRenderingContext2D): void {
                ctx.beginPath();
                ctx.fillStyle = this.color;
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fill();
            }

            // Método de atualização
            update(width: number, height: number): void {
                this.x += this.speedX;
                this.y += this.speedY;

                // Fazer partículas bouncearem nas bordas
                if (this.x < 0 || this.x > width) this.speedX *= -1;
                if (this.y < 0 || this.y > height) this.speedY *= -1;
            }
        }

        // Criar array tipado de partículas
        const particles: ParticleInterface[] = Array.from(
            { length: particleCount },
            () => new Particle(canvas.width, canvas.height)
        );

        // Função de animação principal
        const animate = () => {
            // Limpar canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Desenhar conexões entre partículas próximas
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(135, 206, 250, ${1 - distance / connectionDistance})`;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }

                // Atualizar e desenhar cada partícula
                particles[i].update(canvas.width, canvas.height);
                particles[i].draw(ctx);
            }

            // Próximo quadro de animação
            requestAnimationFrame(animate);
        };

        animate();

        window.addEventListener('resize', resizeCanvas);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 opacity-30 pointer-events-none"
        />
    );
};

export default NeuralNetworkBackground;