
import React, { useEffect, useRef } from 'react';

const HeroAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Define Particle class first, before using it
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 0.5;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        
        // Create gradient colors using the new color palette
        const colors = ['#00A19A', '#8DC63F', '#717171'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
      }
      
      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Particles array
    const particles: Particle[] = [];
    const particleCount = 80;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    // Draw outer circle
    const drawOuterCircle = () => {
      if (!ctx) return;
      
      // Create radial gradient with new colors
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, canvas.height / 10,
        canvas.width / 2, canvas.height / 2, canvas.height / 2
      );
      gradient.addColorStop(0, 'rgba(0, 161, 154, 0.2)');
      gradient.addColorStop(0.5, 'rgba(141, 198, 63, 0.1)');
      gradient.addColorStop(1, 'rgba(113, 113, 113, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, canvas.height / 2, 0, Math.PI * 2);
      ctx.fill();
    };
    
    // Draw inner circle
    const drawInnerCircle = () => {
      if (!ctx) return;
      
      // Create radial gradient with new colors
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.height / 4
      );
      gradient.addColorStop(0, 'rgba(0, 161, 154, 0.8)');
      gradient.addColorStop(0.5, 'rgba(141, 198, 63, 0.6)');
      gradient.addColorStop(1, 'rgba(113, 113, 113, 0.4)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, canvas.height / 4, 0, Math.PI * 2);
      ctx.fill();
    };
    
    // Connect particles
    const connectParticles = () => {
      if (!ctx) return;
      
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < canvas.width / 7) {
            ctx.strokeStyle = `rgba(0, 161, 154, ${1 - distance / (canvas.width / 7)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };
    
    // Animation loop
    const animate = () => {
      if (!ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      drawOuterCircle();
      drawInnerCircle();
      
      for (const particle of particles) {
        particle.update();
        particle.draw();
      }
      
      connectParticles();
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
    };
  }, []);
  
  return (
    <div className="relative w-full h-full min-h-[400px]">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full absolute inset-0 animate-pulse-light"
      />
    </div>
  );
};

export default HeroAnimation;
