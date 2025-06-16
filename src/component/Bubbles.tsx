import { useRef, useEffect } from "react";

type BubblesType = {
    size: number;
    color: string;
    x: number;
    y: number;
    dx: number;
    dy: number;
};

export default function Bubbles() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const colors = [
        "#E6CCFF", // pastel violet clair
        "#D1B3FF", // lavande claire
        "#BFA3FF", // violet doux
        "#A3B8FF", // lavande bleutée
        "#99CCFF", // bleu clair pastel
        "#B3E0FF", // baby blue
        "#CCEFFF", // bleu très pâle
    ];

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        const bubbles: BubblesType[] = [];
        for (let i = 0; i < Math.random() * 3 + 3; i++) {
            bubbles.push({
                size: Math.random() * 100 + 250,
                color: colors[Math.floor(Math.random() * colors.length)],
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                dx: (Math.random() - 0.5) * 2,
                dy: (Math.random() - 0.5) * 2,
            });
        }

        const mouse = { x: canvas.width / 2, y: canvas.height / 2 };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };
        window.addEventListener("mousemove", handleMouseMove);


        function animate() {
            if (!ctx || !canvas) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            bubbles.forEach((bubble) => {
                ctx.beginPath();
                ctx.fillStyle = bubble.color;
                ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2);
                ctx.fill();

                bubble.x += bubble.dx;
                bubble.y += bubble.dy;

                // Warp to opposite side
                if (bubble.x < -bubble.size) {
                    bubble.x = canvas.width + bubble.size;
                    bubble.color = colors[Math.floor(Math.random() * colors.length)];
                }
                if (bubble.x > canvas.width + bubble.size) {
                    bubble.x = -bubble.size;
                    bubble.color = colors[Math.floor(Math.random() * colors.length)];
                }
                if (bubble.y < -bubble.size) {
                    bubble.y = canvas.height + bubble.size;
                    bubble.color = colors[Math.floor(Math.random() * colors.length)];
                }
                if (bubble.y > canvas.height + bubble.size) {
                    bubble.y = -bubble.size;
                    bubble.color = colors[Math.floor(Math.random() * colors.length)];
                }

                // Mouse repulsion
                const dx = bubble.x - mouse.x;
                const dy = bubble.y - mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    const force = (150 - distance) / 150;
                    const angle = Math.atan2(dy, dx);
                    const pushX = Math.cos(angle) * force;
                    const pushY = Math.sin(angle) * force;

                    bubble.dx += pushX * 0.2;
                    bubble.dy += pushY * 0.2;
                }

            });

            requestAnimationFrame(animate);
        }

        animate();

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", resizeCanvas);
        };
    }, []);

    return (
        <>
            <canvas
                ref={canvasRef}
                className="fixed top-0 left-0  pointer-events-none w-screen h-screen"
                style={{ filter: "blur(30px)", opacity: 0.7 }}
            />

        </>
    );
}
