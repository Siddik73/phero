import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  depth: number; // For parallax effect: 0.5 (far), 1.0 (middle), 1.5 (near)
  opacity: number;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = 120;
    const maxLinkDistance = 120;
    const grabDistance = 140;

    // Handle resizing
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      
      // Re-initialize particles to fit new screen bounds if empty
      if (particles.length === 0) {
        initParticles();
      } else {
        // Keep particles within bounds
        particles.forEach((p) => {
          p.x = Math.min(p.x, window.innerWidth);
          p.y = Math.min(p.y, window.innerHeight);
        });
      }
    };

    // Initialize particles
    const initParticles = () => {
      particles = [];
      const colors = ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ff5722"]; // ~10% amber
      
      for (let i = 0; i < particleCount; i++) {
        // Assign a depth layer (0.5 for far, 1.0 for mid, 1.5 for near)
        const rand = Math.random();
        let depth = 1.0;
        let sizeMultiplier = 1.0;
        let speedMultiplier = 1.0;

        if (rand < 0.3) {
          depth = 0.6; // Far
          sizeMultiplier = 0.6;
          speedMultiplier = 0.5;
        } else if (rand > 0.8) {
          depth = 1.4; // Near
          sizeMultiplier = 1.4;
          speedMultiplier = 1.3;
        }

        const size = (Math.random() * 1.2 + 0.6) * sizeMultiplier;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const opacity = (Math.random() * 0.2 + 0.1) * (depth === 0.6 ? 0.7 : depth === 1.4 ? 1.3 : 1.0);

        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.8 * speedMultiplier,
          vy: (Math.random() - 0.5) * 0.8 * speedMultiplier,
          size,
          color,
          depth,
          opacity,
        });
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // 1. Move and draw particles
      particles.forEach((p) => {
        // Ambient motion (zero-gravity drift)
        p.x += p.vx;
        p.y += p.vy;

        // Boundary bounce / wrap-around
        if (p.x < 0 || p.x > window.innerWidth) p.vx *= -1;
        if (p.y < 0 || p.y > window.innerHeight) p.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        
        // Custom color overlay based on node type
        if (p.color === "#ff5722") {
          ctx.fillStyle = `rgba(255, 87, 34, ${p.opacity * 1.5})`;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        }
        ctx.fill();
      });

      // 2. Draw lines between particles (the neural network grid)
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          
          // Calculate distance
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Connect if close enough
          const linkDist = maxLinkDistance * ((p1.depth + p2.depth) / 2);
          if (dist < linkDist) {
            const opacity = (1 - dist / linkDist) * 0.1 * ((p1.opacity + p2.opacity) / 2);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            
            // Choose line color based on nodes (amber glow if either node is amber)
            if (p1.color === "#ff5722" || p2.color === "#ff5722") {
              ctx.strokeStyle = `rgba(255, 87, 34, ${opacity * 1.5})`;
            } else {
              ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            }
            
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // 3. Mouse interaction (grab/repulsion)
        if (mouseRef.current.active) {
          const m = mouseRef.current;
          const dx = p1.x - m.x;
          const dy = p1.y - m.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Grab mode: Draw connections directly to cursor
          if (dist < grabDistance) {
            // Stronger links to mouse
            const opacity = (1 - dist / grabDistance) * 0.25;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(m.x, m.y);
            ctx.strokeStyle = p1.color === "#ff5722" 
              ? `rgba(255, 87, 34, ${opacity * 1.5})` 
              : `rgba(255, 255, 255, ${opacity})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();

            // Repulsion effect (gentle warp away from cursor)
            const force = (grabDistance - dist) / grabDistance;
            const angle = Math.atan2(dy, dx);
            p1.x += Math.cos(angle) * force * 0.6;
            p1.y += Math.sin(angle) * force * 0.6;
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // Mouse events
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none block"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
