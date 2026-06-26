import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiClock, FiFileText, FiTrendingDown, FiLayers } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const problems = [
  {
    icon: <FiClock className="w-10 h-10 text-red-500" />,
    title: "Missed Deadlines",
    description: "Important tasks slip through the cracks when there's no clear priority or timeline.",
    direction: -100 // slide from left
  },
  {
    icon: <FiFileText className="w-10 h-10 text-orange-500" />,
    title: "Scattered Notes",
    description: "Ideas and to-dos are spread across multiple apps, sticky notes, and emails.",
    direction: 100 // slide from right
  },
  {
    icon: <FiTrendingDown className="w-10 h-10 text-yellow-500" />,
    title: "Poor Productivity",
    description: "Spending more time organizing work than actually getting it done.",
    direction: -100
  },
  {
    icon: <FiLayers className="w-10 h-10 text-purple-500" />,
    title: "Task Overload",
    description: "Feeling overwhelmed by a massive backlog without a clear path forward.",
    direction: 100
  }
];

export default function ProblemStorytelling() {
  const container = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(() => {
    // Header animation
    gsap.from(".problem-header", {
      scrollTrigger: {
        trigger: container.current,
        start: "top 70%",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });

    // Cards staggered animation
    cardsRef.current.forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
        },
        x: problems[i].direction,
        opacity: 0,
        rotation: i % 2 === 0 ? -5 : 5,
        duration: 1.2,
        ease: "back.out(1.2)"
      });
    });

    // Morphing background shape
    gsap.to(".morph-shape", {
      borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
      rotation: 360,
      duration: 20,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

  }, { scope: container });

  return (
    <section ref={container} className="relative w-full min-h-screen py-32 px-4 flex flex-col items-center justify-center bg-surface dark:bg-surface-dark overflow-hidden">
      
      {/* Background Morphing Shape */}
      <div className="morph-shape absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[800px] h-[80vw] max-h-[800px] bg-gradient-to-tr from-red-500/5 to-orange-500/5 dark:from-red-500/10 dark:to-orange-500/10 blur-3xl rounded-full z-0 pointer-events-none transition-all"></div>

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center">
        
        <div className="problem-header text-center mb-20 max-w-3xl">
          <h2 className="text-sm font-bold tracking-widest text-red-500 uppercase mb-4">The Chaos</h2>
          <h3 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
            Work shouldn't feel like a mess.
          </h3>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Without the right system, managing your daily tasks turns into a full-time job itself.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {problems.map((problem, i) => (
            <div 
              key={i}
              ref={el => cardsRef.current[i] = el}
              className="glass-card p-10 group hover:-translate-y-2 hover:shadow-premium transition-all duration-300 relative overflow-hidden"
            >
              {/* Subtle hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              
              <div className="relative z-10">
                <div className="mb-6 p-4 bg-white dark:bg-black/20 inline-block rounded-2xl shadow-sm group-hover:scale-110 transition-transform duration-300">
                  {problem.icon}
                </div>
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {problem.title}
                </h4>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  {problem.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
