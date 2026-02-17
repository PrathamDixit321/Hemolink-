// ===== PARTICLE ANIMATION =====
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random properties
        const size = Math.random() * 6 + 2;
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        const duration = Math.random() * 20 + 15;
        const delay = Math.random() * 5;
        const opacity = Math.random() * 0.3 + 0.1;

        // Random color (red or blue tones)
        const colors = ['rgba(230, 57, 70, 0.6)', 'rgba(67, 97, 238, 0.6)', 'rgba(6, 214, 160, 0.6)'];
        const color = colors[Math.floor(Math.random() * colors.length)];

        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            left: ${startX}%;
            top: ${startY}%;
            opacity: ${opacity};
            animation: particleFloat ${duration}s ease-in-out ${delay}s infinite;
            pointer-events: none;
        `;

        particlesContainer.appendChild(particle);
    }

    // Add CSS animation if not already present
    if (!document.getElementById('particle-animation-style')) {
        const style = document.createElement('style');
        style.id = 'particle-animation-style';
        style.textContent = `
            @keyframes particleFloat {
                0%, 100% {
                    transform: translate(0, 0) scale(1);
                }
                25% {
                    transform: translate(20px, -30px) scale(1.2);
                }
                50% {
                    transform: translate(-15px, -60px) scale(0.8);
                }
                75% {
                    transform: translate(25px, -30px) scale(1.1);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== COUNTER ANIMATION =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-card h3, .mini-stat strong');

    counters.forEach(counter => {
        const target = parseInt(counter.textContent) || 0;
        if (target === 0) return;

        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        // Use Intersection Observer to trigger animation when visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(counter);
    });
}
