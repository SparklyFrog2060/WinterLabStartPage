import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  alpha: number;
  pulseSpeed: number;
  phase: number;
}

interface WinterCanvasProps {
  interactive?: boolean;
  intensity?: 'gentle' | 'active';
}

export function WinterCanvas({ interactive = true, intensity = 'gentle' }: WinterCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];

    const updateSize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      initParticles();
    };

    const initParticles = () => {
      const count = intensity === 'gentle' ? Math.floor(Math.max(25, (width * height) / 38000)) : Math.floor(Math.max(40, (width * height) / 24000));
      particles = [];
      for (let i = 0; i < count; i++) {
        const radius = Math.random() * 2 + 1.2;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: Math.random() * 0.45 + 0.15, // gentle drift downwards like soft snow/crystal dust
          radius,
          baseRadius: radius,
          alpha: Math.random() * 0.45 + 0.2,
          pulseSpeed: Math.random() * 0.02 + 0.01,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }
    updateSize();

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle constellation lines between nearby particles
      const maxDistance = 110;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * 0.14;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(14, 116, 144, ${lineAlpha})`; // subtle cyan/slate line
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // Draw mouse cursor interactive glow & connection
      if (mouseRef.current.active && interactive) {
        const mouse = mouseRef.current;
        const mouseRadius = 140;

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseRadius) {
            const connectAlpha = (1 - dist / mouseRadius) * 0.28;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${connectAlpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();

            // gentle cursor repulsion/nudge
            const force = (1 - dist / mouseRadius) * 0.6;
            p.x -= (dx / dist) * force;
            p.y -= (dy / dist) * force;
          }
        }
      }

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.phase += p.pulseSpeed;
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y > height) {
          p.y = 0;
          p.x = Math.random() * width;
        }

        const currentAlpha = p.alpha + Math.sin(p.phase) * 0.15;

        // Frost crystal glow
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 2.8);
        gradient.addColorStop(0, `rgba(14, 165, 233, ${Math.max(0.1, currentAlpha * 0.9)})`);
        gradient.addColorStop(0.5, `rgba(6, 182, 212, ${Math.max(0.05, currentAlpha * 0.4)})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core particle point
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(15, 23, 42, ${Math.min(0.65, currentAlpha * 1.1)})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [interactive, intensity]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none w-full h-full z-0 opacity-80"
      style={{ display: 'block' }}
    />
  );
}
