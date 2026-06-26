import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiCheckSquare, FiBriefcase, FiTarget, FiBarChart2 } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: <FiCheckSquare className="w-8 h-8 text-primary" />,
    title: "Smart Task Management",
    description: "Organize, prioritize, and crush your daily to-dos with an interface that gets out of your way."
  },
  {
    icon: <FiBriefcase className="w-8 h-8 text-accent" />,
    title: "Project Tracking",
    description: "Group related tasks into dedicated projects. Monitor overall progress at a single glance."
  },
  {
    icon: <FiTarget className="w-8 h-8 text-emerald-500" />,
    title: "Goal Planning",
    description: "Set ambitious long-term goals and break them down into actionable milestones."
  },
  {
    icon: <FiBarChart2 className="w-8 h-8 text-blue-400" />,
    title: "Productivity Analytics",
    description: "Understand your working habits with gorgeous, real-time data visualizations."
  }
];

export default function SolutionShowcase() {
  const container = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(() => {
    // Pin the section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "+=150%",
        pin: true,
        scrub: 1,
      }
    });

    // Reveal the title
    tl.from(".solution-header", {
      y: 50,
      opacity: 0,
      duration: 0.5,
    });

    // Rotate cards into view one by one
    cardsRef.current.forEach((card, i) => {
      tl.from(card, {
        y: 100,
        opacity: 0,
        rotationX: -45,
        scale: 0.8,
        transformOrigin: "bottom center",
        duration: 0.8,
      }, "-=0.4");
    });

  }, { scope: container });

  return (
    <section ref={container} className="w-full h-screen flex flex-col items-center justify-center bg-background dark:bg-background-dark py-20 px-4 overflow-hidden perspective-1000">
      
      <div className="solution-header text-center mb-16">
        <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-4">The Solution</h2>
        <h3 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500 dark:from-white dark:to-gray-400 tracking-tight">
          Enter TaskFlow X
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl mx-auto">
        {features.map((feature, i) => (
          <div 
            key={i}
            ref={el => cardsRef.current[i] = el}
            className="glass-card p-8 flex flex-col h-full bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10"
          >
            <div className="mb-6 p-4 bg-surface dark:bg-black/30 rounded-2xl w-fit">
              {feature.icon}
            </div>
            <h4 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
              {feature.title}
            </h4>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed flex-grow">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

    </section>
  );
}
