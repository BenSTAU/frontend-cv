import { useRef, useEffect } from "react";

// Type pour définir la structure d'une bulle


// Composant d'arrière-plan animé avec des bulles interactives
export default function Bubbles() {
  const canvasRef = useRef(null); // <-- corrige ici

  // Palette de couleurs pastel pour les bulles
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
    // Initialisation du canvas et du contexte
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Fonction pour redimensionner le canvas à la taille de la fenêtre
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Génération aléatoire de la taille des bulles
    function randomSize() {
      const sizeNumber = Math.floor(Math.random() * 10);
      if (sizeNumber < 5) return Math.random() * 100 + 250;
      else return Math.random() * 100 + 50;
    }

    // Création des bulles initiales
    const bubbles = [];
    for (let i = 0; i < Math.random() * 3 + 6; i++) {
      bubbles.push({
        size: randomSize(),
        color: colors[Math.floor(Math.random() * colors.length)],
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        dx: (Math.random() - 0.5) * 2,
        dy: (Math.random() - 0.5) * 2,
      });
    }

    // Suivi de la position de la souris
    const mouse = { x: canvas.width / 2, y: canvas.height / 2 };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Boucle d'animation principale
    function animate() {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      bubbles.forEach((bubble) => {
        // Dessin des bulles
        ctx.beginPath();
        ctx.fillStyle = bubble.color;
        ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2);
        ctx.fill();

        // Mise à jour de la position
        bubble.x += bubble.dx;
        bubble.y += bubble.dy;

        // Gestion des collisions avec les bords
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

        // Effet de répulsion avec la souris
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

    // Nettoyage des event listeners
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  // Rendu du canvas avec effet de flou
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
