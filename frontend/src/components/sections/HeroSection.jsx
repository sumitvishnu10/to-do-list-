import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDown } from 'lucide-react';

export default function HeroSection() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animations
      gsap.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.2
      });
      
      gsap.from(subtitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.4
      });

      gsap.from(ctaRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.6
      });

      // Floating background orbs
      gsap.to('.orb-1', {
        y: 'random(-50, 50)',
        x: 'random(-50, 50)',
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      gsap.to('.orb-2', {
        y: 'random(-50, 50)',
        x: 'random(-50, 50)',
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTasks = () => {
    document.getElementById('tasks')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} className="relative w-full h-full flex items-center justify-center overflow-hidden bg-background dark:bg-background-dark">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="orb-1 absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-primary/20 dark:bg-primary/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen opacity-70"></div>
        <div className="orb-2 absolute bottom-1/4 right-1/4 w-[35vw] h-[35vw] bg-accent/20 dark:bg-accent/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen opacity-70"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <h1 
          ref={titleRef} 
          className="text-6xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 mb-6"
        >
          TaskFlow Pro
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl font-light tracking-wide"
        >
          Organize. Track. Achieve. The premium workspace for your most important goals.
        </p>

        <button 
          ref={ctaRef}
          onClick={scrollToTasks}
          className="group relative px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-medium text-lg overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-premium"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
            Get Started
            <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
          </span>
        </button>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
        <ArrowDown className="w-6 h-6 text-gray-400" />
      </div>
    </div>
  );
}
