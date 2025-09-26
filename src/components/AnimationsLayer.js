import React, { useEffect, useState } from "react";
import "./animations.css";

const AnimationsLayer = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Create confetti particles
    const createParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          type: Math.random() > 0.5 ? 'confetti' : Math.random() > 0.5 ? 'flower' : 'cat',
          left: Math.random() * 100,
          delay: Math.random() * 3,
          size: Math.random() * 20 + 10,
          duration: Math.random() * 3 + 4
        });
      }
      setParticles(newParticles);
    };

    createParticles();
    const interval = setInterval(createParticles, 8000);

    return () => clearInterval(interval);
  }, []);

  const getParticleContent = (type) => {
    switch (type) {
      case 'confetti':
        return '🎊';
      case 'flower':
        return '🌸';
      case 'cat':
        return '🐱';
      default:
        return '✨';
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Floating Hearts */}
      <div className="floating-hearts">
        {[...Array(8)].map((_, i) => (
          <div
            key={`heart-${i}`}
            className="floating-heart"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + Math.random() * 2}s`
            }}
          >
            💕
          </div>
        ))}
      </div>

      {/* Falling Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`falling-particle ${particle.type}`}
          style={{
            left: `${particle.left}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
            fontSize: `${particle.size}px`
          }}
        >
          {getParticleContent(particle.type)}
        </div>
      ))}

      {/* Sparkle Effects */}
      <div className="sparkles">
        {[...Array(20)].map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`
            }}
          >
            ✨
          </div>
        ))}
      </div>

      {/* Background Pattern */}
      <div className="bg-pattern"></div>
    </div>
  );
};

export default AnimationsLayer;