import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Music, VolumeX, Volume2 } from "lucide-react";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioContextRef = useRef(null);
  const oscillatorRef = useRef(null);
  const gainNodeRef = useRef(null);

  // Romantic melody notes (frequencies for Happy Birthday melody)
  const melody = [
    { freq: 523.25, duration: 500 }, // C5
    { freq: 523.25, duration: 250 }, // C5
    { freq: 587.33, duration: 500 }, // D5
    { freq: 523.25, duration: 500 }, // C5
    { freq: 698.46, duration: 500 }, // F5
    { freq: 659.25, duration: 1000 }, // E5
    { freq: 523.25, duration: 500 }, // C5
    { freq: 523.25, duration: 250 }, // C5
    { freq: 587.33, duration: 500 }, // D5
    { freq: 523.25, duration: 500 }, // C5
    { freq: 783.99, duration: 500 }, // G5
    { freq: 698.46, duration: 1000 }, // F5
  ];

  const playRomanticMelody = async () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }

      const audioContext = audioContextRef.current;
      if (audioContext.state === 'suspended') {
        await audioContext.resume();
      }

      // Create gain node for volume control
      gainNodeRef.current = audioContext.createGain();
      gainNodeRef.current.connect(audioContext.destination);
      gainNodeRef.current.gain.value = 0.1;

      let currentTime = audioContext.currentTime;
      
      melody.forEach((note, index) => {
        const oscillator = audioContext.createOscillator();
        const noteGain = audioContext.createGain();
        
        oscillator.connect(noteGain);
        noteGain.connect(gainNodeRef.current);
        
        oscillator.frequency.value = note.freq;
        oscillator.type = 'sine';
        
        // Add envelope for smoother sound
        noteGain.gain.setValueAtTime(0, currentTime);
        noteGain.gain.linearRampToValueAtTime(0.3, currentTime + 0.1);
        noteGain.gain.linearRampToValueAtTime(0, currentTime + (note.duration / 1000));
        
        oscillator.start(currentTime);
        oscillator.stop(currentTime + (note.duration / 1000));
        
        currentTime += (note.duration / 1000);
      });

      setIsPlaying(true);

      // Stop playing after melody ends and repeat
      setTimeout(() => {
        setIsPlaying(false);
        setTimeout(() => {
          if (!isMuted) {
            playRomanticMelody();
          }
        }, 2000);
      }, currentTime * 1000);

    } catch (error) {
      console.log("Audio playback error:", error);
    }
  };

  useEffect(() => {
    // Auto-play melody on component mount
    const startMusic = async () => {
      await playRomanticMelody();
    };

    // Delay to allow user interaction first (some browsers require user gesture)
    const timer = setTimeout(startMusic, 1000);
    return () => clearTimeout(timer);
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      // Stop current audio
      if (oscillatorRef.current) {
        try {
          oscillatorRef.current.stop();
        } catch (e) {}
      }
      setIsPlaying(false);
    } else {
      playRomanticMelody();
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = isMuted ? 0.1 : 0;
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg border border-pink-200">
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={togglePlay}
          className="text-pink-600 hover:text-pink-700 hover:bg-pink-50 rounded-full"
          title={isPlaying ? "Müziği Durdur" : "Müzik Çal"}
        >
          <Music className={`w-5 h-5 ${isPlaying ? 'animate-pulse text-pink-700' : 'text-pink-500'}`} />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleMute}
          className="text-pink-600 hover:text-pink-700 hover:bg-pink-50 rounded-full"
          title={isMuted ? "Sesi Aç" : "Sesi Kapat"}
        >
          {isMuted ? <VolumeX className="w-5 h-5 text-gray-400" /> : <Volume2 className="w-5 h-5 text-pink-500" />}
        </Button>
        
        <span className="text-xs text-pink-600 font-medium px-2">
          {isPlaying ? "🎵" : "🎶"}
        </span>
      </div>
    </div>
  );
};

export default MusicPlayer;