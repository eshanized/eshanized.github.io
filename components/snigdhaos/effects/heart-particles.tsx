import React, { useEffect } from 'react';

export const HeartParticles = () => {
  useEffect(() => {
    const createHeart = () => {
      const heart = document.createElement('div');
      heart.classList.add('heart');
      heart.innerHTML = '♥';
      const cssText = `
        position: fixed;
        left: ${Math.random() * 100}vw;
        top: -10vh;
        font-size: ${Math.random() * 20 + 10}px;
        color: hsla(${Math.random() * 60 + 320}, 100%, 70%, ${Math.random() * 0.5 + 0.3});
        z-index: 0;
        pointer-events: none;
        animation: fall ${Math.random() * 3 + 2}s linear forwards;
        text-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
      `;
      heart.style.cssText = cssText;
      document.querySelector('.heart-particles')?.appendChild(heart);
      setTimeout(() => heart.remove(), 5000);
    };
    const heartInterval = setInterval(createHeart, 300);
    const style = document.createElement('style');
    const styleText = `
      @keyframes fall {
        to {
          transform: translateY(110vh) rotate(${Math.random() * 360}deg);
        }
      }
    `;
    style.innerHTML = styleText;
    document.head.appendChild(style);
    return () => {
      clearInterval(heartInterval);
      document.head.removeChild(style);
    };
  }, []);
  return <div className="heart-particles" />;
}; 