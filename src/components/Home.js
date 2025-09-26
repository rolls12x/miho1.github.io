import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Heart, Music, Sparkles, Gift } from "lucide-react";
import { mockData } from "../data/mock";
import AnimationsLayer from "./AnimationsLayer";
import MusicPlayer from "./MusicPlayer";

const Home = () => {
  const [showSurprise, setShowSurprise] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSurprise(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex((prev) => 
        (prev + 1) % mockData.birthdayMessages.length
      );
    }, 4000);
    return () => clearInterval(messageInterval);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50">
      <MusicPlayer />
      <AnimationsLayer />
      
      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <div className={`transform transition-all duration-2000 ${showSurprise ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
          
          {/* Main Title */}
          <div className="mb-8 space-y-4">
            <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 animate-pulse">
              Mihriban
            </h1>
            <div className="flex items-center justify-center space-x-2 text-3xl md:text-4xl font-semibold text-rose-600">
              <Sparkles className="w-8 h-8 text-yellow-400 animate-bounce" />
              <span>21 Yaşında!</span>
              <Sparkles className="w-8 h-8 text-yellow-400 animate-bounce" />
            </div>
          </div>

          {/* Birthday Message Card */}
          <Card className="max-w-2xl mx-auto mb-8 bg-white/80 backdrop-blur-sm border-pink-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-pink-500 mr-2 animate-pulse" />
                <h2 className="text-2xl font-semibold text-gray-800">Doğum Günün Kutlu Olsun!</h2>
                <Heart className="w-6 h-6 text-pink-500 ml-2 animate-pulse" />
              </div>
              <p className="text-lg text-gray-700 leading-relaxed min-h-[3rem] transition-all duration-500">
                {mockData.birthdayMessages[currentMessageIndex]}
              </p>
            </CardContent>
          </Card>

          {/* Interactive Elements */}
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8">
            <Button 
              className="bg-gradient-to-r from-pink-400 to-rose-500 hover:from-pink-500 hover:to-rose-600 text-white px-8 py-3 rounded-full font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg"
              onClick={() => {
                // Create massive confetti explosion across entire site
                const colors = ['#ff69b4', '#ff1493', '#ffc0cb', '#ffb6c1', '#dda0dd', '#ffd700', '#ff6347', '#98fb98', '#87ceeb', '#dda0dd'];
                const shapes = ['🎊', '🎉', '⭐', '💕', '🌸', '✨', '🎈', '🎁', '💖', '🌺'];
                
                // Create multiple explosion points across the screen
                const explosionPoints = [
                  { x: '20%', y: '30%' },
                  { x: '80%', y: '20%' },
                  { x: '50%', y: '40%' },
                  { x: '10%', y: '70%' },
                  { x: '90%', y: '60%' },
                  { x: '30%', y: '80%' },
                  { x: '70%', y: '10%' },
                  { x: '60%', y: '90%' }
                ];
                
                explosionPoints.forEach((point, pointIndex) => {
                  for (let i = 0; i < 50; i++) {
                    setTimeout(() => {
                      const particle = document.createElement('div');
                      const isEmoji = Math.random() > 0.6;
                      
                      if (isEmoji) {
                        particle.textContent = shapes[Math.floor(Math.random() * shapes.length)];
                        particle.style.fontSize = Math.random() * 25 + 20 + 'px';
                      } else {
                        particle.style.width = Math.random() * 20 + 8 + 'px';
                        particle.style.height = Math.random() * 20 + 8 + 'px';
                        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                        particle.style.borderRadius = Math.random() > 0.5 ? '50%' : '0%';
                      }
                      
                      particle.style.position = 'fixed';
                      particle.style.left = point.x;
                      particle.style.top = point.y;
                      particle.style.pointerEvents = 'none';
                      particle.style.zIndex = '9999';
                      particle.style.transform = 'translate(-50%, -50%)';
                      
                      // Random direction and distance for each explosion point
                      const angle = (Math.PI * 2 * i) / 25 + Math.random() * 0.5;
                      const velocity = Math.random() * 400 + 150;
                      const duration = Math.random() * 3 + 2;
                      
                      const vx = Math.cos(angle) * velocity;
                      const vy = Math.sin(angle) * velocity;
                      
                      particle.style.animation = `
                        siteWideConfetti${pointIndex} ${duration}s ease-out forwards
                      `;
                      
                      // Add custom animation for each explosion point
                      const keyframes = `
                        @keyframes siteWideConfetti${pointIndex} {
                          0% {
                            transform: translate(-50%, -50%) rotate(0deg) scale(1);
                            opacity: 1;
                          }
                          100% {
                            transform: translate(${vx/8}px, ${vy/8 + 500}px) rotate(${Math.random() * 1440}deg) scale(0.2);
                            opacity: 0;
                          }
                        }
                      `;
                      
                      if (!document.getElementById(`confetti-styles-${pointIndex}`)) {
                        const style = document.createElement('style');
                        style.id = `confetti-styles-${pointIndex}`;
                        style.textContent = keyframes;
                        document.head.appendChild(style);
                      }
                      
                      document.body.appendChild(particle);
                      
                      setTimeout(() => {
                        if (particle.parentNode) {
                          particle.parentNode.removeChild(particle);
                        }
                      }, duration * 1000);
                    }, (i * 8) + (pointIndex * 200));
                  }
                });
              }}
            >
              <Gift className="w-5 h-5 mr-2" />
              Sürpriz Kutlama!
            </Button>
            
            <Button 
              variant="outline"
              className="border-purple-300 text-purple-600 hover:bg-purple-50 px-8 py-3 rounded-full font-semibold transform hover:scale-105 transition-all duration-300"
              onClick={() => {
                // Toggle animations on/off
                const animations = document.querySelectorAll('.floating-hearts, .falling-particle, .sparkles');
                animations.forEach(element => {
                  if (element.style.display === 'none') {
                    element.style.display = '';
                  } else {
                    element.style.display = 'none';
                  }
                });
              }}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Animasyon Aç/Kapat
            </Button>
          </div>

          {/* Special Themes Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {mockData.themes.map((theme, index) => (
              <Card key={index} className="bg-white/70 backdrop-blur-sm border-pink-200 hover:bg-white/90 transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">{theme.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{theme.title}</h3>
                  <p className="text-sm text-gray-600">{theme.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Footer Message */}
          <div className="mt-12 text-center">
            <p className="text-xl font-medium text-gray-700 mb-2">
              Bu özel gün sadece senin! 
            </p>
            <p className="text-lg text-pink-600 font-semibold mb-8">
              🎂 Mutlu yıllar Mihriban! 🎂
            </p>
            
            {/* Made with phoenixvac */}
            <div className="mt-8 pb-4">
              <p className="text-sm text-gray-500">
                Made with 💜 phoenixvac
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;