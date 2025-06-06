import React, { useEffect } from 'react';

export interface ParticlesEffectProps {
  theme: string;
}

export const ParticlesEffect = ({ theme }: ParticlesEffectProps) => {
  useEffect(() => {
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      const size = Math.random() * 4 + 2;
      const color = theme === 'dark'
        ? `rgba(255, 255, 255, ${Math.random() * 0.3})`
        : `rgba(0, 0, 0, ${Math.random() * 0.2})`;
      particle.style.cssText = `
        position: fixed;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        pointer-events: none;
        left: ${Math.random() * 100}vw;
        top: -10px;
        z-index: 0;
      `;
      document.querySelector('.particles-container')?.appendChild(particle);
      const animation = particle.animate(
        [
          { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
          {
            transform: `translateY(${window.innerHeight + 10}px) rotate(${Math.random() * 360}deg)`,
            opacity: 0
          }
        ],
        {
          duration: Math.random() * 3000 + 3000,
          easing: 'linear'
        }
      );
      animation.onfinish = () => particle.remove();
    };
    const interval = setInterval(createParticle, 200);
    return () => clearInterval(interval);
  }, [theme]);
  return <div className="particles-container fixed inset-0 pointer-events-none" />;
}; 