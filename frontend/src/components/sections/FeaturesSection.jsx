import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle, Edit3, Trash2, TrendingUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: <CheckCircle className="w-8 h-8 text-primary" />,
    title: "Create Tasks",
    description: "Instantly capture ideas and todos with our lightning-fast interface."
  },
  {
    icon: <Edit3 className="w-8 h-8 text-accent" />,
    title: "Edit Intuitively",
    description: "Update priorities, due dates, and categories with zero friction."
  },
  {
    icon: <Trash2 className="w-8 h-8 text-red-500" />,
    title: "Manage Effortlessly",
    description: "Keep your workspace clean with swift, animated deletions."
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-emerald-500" />,
    title: "Track Progress",
    description: "Visualize your productivity with dynamic charts and statistics."
  }
];

export default function FeaturesSection() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(headerRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      });

      // Staggered cards animation
      gsap.from(cardsRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 50%",
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.2)"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col items-center justify-center px-4 bg-surface dark:bg-surface-dark/20">
      <div ref={headerRef} className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-500 dark:from-white dark:to-gray-400">
          Powerful Simplicity
        </h2>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
          Everything you need to manage your workflow, wrapped in a beautiful, distraction-free interface.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl w-full">
        {features.map((feature, index) => (
          <div
            key={index}
            ref={el => cardsRef.current[index] = el}
            className="glass-card p-8 group hover:-translate-y-2 transition-transform duration-300"
          >
            <div className="mb-6 p-4 bg-gray-50 dark:bg-white/5 inline-block rounded-2xl group-hover:scale-110 transition-transform duration-300">
              {feature.icon}
            </div>
            <h3 className="text-2xl font-semibold mb-3 dark:text-white">
              {feature.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
