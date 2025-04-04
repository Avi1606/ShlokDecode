// Particles.js - Cosmic background animation

class ParticleSystem {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particleContainer = document.getElementById('particle-container');
        this.particleContainer.appendChild(this.canvas);
        
        this.particles = [];
        this.particleCount = 150;
        this.mouseX = 0;
        this.mouseY = 0;
        
        this.init();
    }
    
    init() {
        // Set canvas to full size
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        
        // Track mouse movement
        window.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
        
        // Create particles
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 2 + 0.5,
                color: this.getRandomColor(),
                vx: Math.random() * 0.2 - 0.1,
                vy: Math.random() * 0.2 - 0.1,
                originX: Math.random() * this.canvas.width,
                originY: Math.random() * this.canvas.height
            });
        }
        
        // Start animation
        this.animate();
    }
    
    resizeCanvas() {
        this.canvas.width = this.particleContainer.offsetWidth;
        this.canvas.height = this.particleContainer.offsetHeight;
    }
    
    getRandomColor() {
        const colors = [
            'rgba(255, 255, 255, 0.7)',
            'rgba(247, 184, 1, 0.5)',
            'rgba(67, 97, 238, 0.5)',
            'rgba(58, 12, 163, 0.5)'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    drawParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw each particle
        this.particles.forEach(particle => {
            // Calculate distance from mouse
            const dx = this.mouseX - particle.x;
            const dy = this.mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Move away from mouse if close
            if (distance < 100) {
                const angle = Math.atan2(dy, dx);
                const force = (100 - distance) / 500;
                particle.vx -= Math.cos(angle) * force;
                particle.vy -= Math.sin(angle) * force;
            }
            
            // Add velocity
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Return to origin position slowly
            particle.vx += (particle.originX - particle.x) * 0.003;
            particle.vy += (particle.originY - particle.y) * 0.003;
            
            // Add friction
            particle.vx *= 0.98;
            particle.vy *= 0.98;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.fill();
        });
        
        // Draw connections between nearby particles
        this.drawConnections();
    }
    
    drawConnections() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 100)})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }
    
    animate() {
        this.drawParticles();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize particle system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('particle-container')) {
        new ParticleSystem();
    }
});