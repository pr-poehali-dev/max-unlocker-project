import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

type Stage = 'initial' | 'loading' | 'final';

const loadingMessages = [
  'ЗАГРУЖАЕМ ВИРУСЫ',
  'ЛОМАЕМ ВАШ КОМП',
  'УНИЧТОЖЕНИЕ ЗАЩИТЫ',
  'ОШИБКА!'
];

const Index = () => {
  const [stage, setStage] = useState<Stage>('initial');
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [victimCount, setVictimCount] = useState(() => {
    const saved = localStorage.getItem('victimCount');
    return saved ? parseInt(saved, 10) : 0;
  });

  const playSound = (frequency: number, duration: number, type: OscillatorType = 'sine') => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = type;
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration / 1000);
  };

  const handleDownload = () => {
    playSound(200, 300, 'sawtooth');
    const newCount = victimCount + 1;
    setVictimCount(newCount);
    localStorage.setItem('victimCount', newCount.toString());
    setStage('loading');
    setCurrentMessageIndex(0);
    setShowMessage(true);
  };

  useEffect(() => {
    if (stage === 'loading') {
      if (currentMessageIndex < loadingMessages.length) {
        playSound(400 + currentMessageIndex * 200, 200, 'square');
        
        const timer = setTimeout(() => {
          setShowMessage(false);
          
          setTimeout(() => {
            if (currentMessageIndex < loadingMessages.length - 1) {
              setCurrentMessageIndex(prev => prev + 1);
              setShowMessage(true);
            } else {
              setStage('final');
              playSound(100, 800, 'sawtooth');
              setTimeout(() => {
                playSound(800, 1000, 'sine');
              }, 500);
              downloadFile();
            }
          }, 200);
        }, 1200);

        return () => clearTimeout(timer);
      }
    }
  }, [stage, currentMessageIndex]);

  const downloadFile = () => {
    const content = 'лол у тебя вирус через 3... 2... 1.... ЛОШАРА.';
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'VIRUS.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (stage === 'final') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden relative animate-shake">
        <div 
          className="absolute inset-0 animate-rainbow"
          style={{
            background: 'linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3)',
            backgroundSize: '400% 400%'
          }}
        />
        
        <div className="relative z-10 text-center animate-fade-in space-y-8">
          <div className="bg-black/50 px-6 py-3 rounded-full inline-block mb-4 backdrop-blur-sm">
            <span className="text-white font-bold text-lg">
              💀 ЖЕРТВ: {victimCount} 💀
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-black text-white drop-shadow-2xl animate-glitch mb-8">
            ХА ХА МЫ<br />УНИЧТОЖИЛИ<br />ТВОЙ КОМП
          </h1>
          <div className="text-2xl md:text-3xl text-white font-bold drop-shadow-lg animate-pulse mb-8">
            😈 💀 😈
          </div>
          <Button 
            size="lg" 
            onClick={() => {
              playSound(600, 200, 'sine');
              setStage('initial');
              setCurrentMessageIndex(0);
              setShowMessage(false);
            }}
            className="text-xl px-8 py-6 font-bold bg-white text-black hover:bg-gray-200 hover:scale-110 transition-all shadow-2xl"
          >
            <Icon name="RotateCcw" size={24} className="mr-2" />
            ПЕРЕЗАПУСТИТЬ
          </Button>
        </div>
      </div>
    );
  }

  if (stage === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-[#1A1F2C]">
        <div className="text-center">
          {showMessage && (
            <h2 className="text-4xl md:text-6xl font-black text-danger animate-glitch">
              {loadingMessages[currentMessageIndex]}
            </h2>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A1F2C] via-[#2D1B69] to-[#1A1F2C]" />
      
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(155, 135, 245, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(126, 105, 171, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 20%, rgba(139, 92, 246, 0.2) 0%, transparent 50%)
          `
        }}
      />
      
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(45deg, #9b87f5 1px, transparent 1px),
            linear-gradient(-45deg, #9b87f5 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
      
      <div className="relative z-10 max-w-3xl w-full text-center space-y-8 animate-fade-in">
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <div className="inline-block bg-primary/20 px-6 py-3 rounded-full border-2 border-primary">
              <span className="text-primary font-bold text-lg tracking-wider">
                lt.MAX uNlOcKeR
              </span>
            </div>
            {victimCount > 0 && (
              <div className="inline-block bg-danger/20 px-6 py-3 rounded-full border-2 border-danger">
                <span className="text-danger font-bold text-lg">
                  💀 {victimCount} ЖЕРТВ
                </span>
              </div>
            )}
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-foreground leading-tight">
            САМЫЙ ЛУЧШИЙ<br />
            <span className="text-primary">УСТАНОВЩИК</span><br />
            ПРИЛОЖЕНИЙ
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground font-medium">
            Быстро. Надёжно. Безопасно. 🔒
          </p>
        </div>

        <div className="pt-8">
          <Button 
            size="lg" 
            onClick={handleDownload}
            className="text-2xl px-12 py-8 font-bold hover:scale-105 transition-transform shadow-2xl hover:shadow-primary/50"
          >
            <Icon name="Download" size={32} className="mr-3" />
            СКАЧАТЬ СЕЙЧАС
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-12 max-w-2xl mx-auto">
          <div className="bg-card p-4 rounded-lg border border-border">
            <div className="text-3xl mb-2">⚡</div>
            <div className="font-semibold">Быстро</div>
          </div>
          <div className="bg-card p-4 rounded-lg border border-border">
            <div className="text-3xl mb-2">🛡️</div>
            <div className="font-semibold">Безопасно</div>
          </div>
          <div className="bg-card p-4 rounded-lg border border-border">
            <div className="text-3xl mb-2">✨</div>
            <div className="font-semibold">Легко</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;