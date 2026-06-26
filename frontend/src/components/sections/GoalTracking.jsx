import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiAward, FiTarget, FiFlag } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const goals = [
  {
    title: "Launch TaskFlow X MVP",
    progress: 85,
    color: "bg-primary",
    milestones: [
      { name: "Design System", completed: true },
      { name: "Frontend Architecture", completed: true },
      { name: "Backend Integration", completed: false },
    ]
  },
  {
    title: "Read 12 Books this Year",
    progress: 40,
    color: "bg-accent",
    milestones: [
      { name: "Q1 Books", completed: true },
      { name: "Q2 Books", completed: false },
      { name: "Q3 Books", completed: false },
    ]
  }
];

export default function GoalTracking() {
  const container = useRef(null);
  const barsRef = useRef([]);

  useGSAP(() => {
    barsRef.current.forEach((bar) => {
      const targetWidth = bar.getAttribute('data-width');
      gsap.fromTo(bar, 
        { width: "0%" },
        {
          scrollTrigger: {
            trigger: bar,
            start: "top 80%",
          },
          width: targetWidth,
          duration: 1.5,
          ease: "power3.out"
        }
      );
    });
  }, { scope: container });

  return (
    <section ref={container} className="w-full py-32 px-4 bg-background dark:bg-background-dark flex flex-col items-center">
      <div className="max-w-5xl w-full">
        
        <div className="mb-16 text-center">
          <div className="inline-flex items-center justify-center p-4 bg-yellow-100 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 rounded-full mb-6">
            <FiAward className="w-8 h-8" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Goal Tracking</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">Set milestones and celebrate your wins.</p>
        </div>

        <div className="space-y-8">
          {goals.map((goal, i) => (
            <div key={i} className="glass-card p-8 group">
              <div className="flex justify-between items-end mb-4">
                <div className="flex items-center gap-3">
                  <FiTarget className="w-6 h-6 text-gray-400" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{goal.title}</h3>
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">{goal.progress}%</span>
              </div>
              
              {/* Animated Progress Bar */}
              <div className="w-full h-4 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden mb-8">
                <div 
                  ref={el => barsRef.current[i] = el}
                  data-width={`${goal.progress}%`}
                  className={`h-full ${goal.color} rounded-full relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-white/20 w-1/2 -skew-x-12 translate-x-[-150%] animate-[shimmer_2s_infinite]"></div>
                </div>
              </div>

              {/* Milestones */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {goal.milestones.map((milestone, j) => (
                  <div key={j} className={`p-4 rounded-xl border flex items-center gap-3 transition-colors ${
                    milestone.completed 
                      ? 'bg-gray-50 dark:bg-white/5 border-transparent text-gray-900 dark:text-white' 
                      : 'bg-transparent border-dashed border-gray-200 dark:border-white/10 text-gray-400'
                  }`}>
                    {milestone.completed ? (
                      <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                        <FiFlag className="w-3 h-3" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center"></div>
                    )}
                    <span className="font-medium">{milestone.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
      
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(250%) skewX(-12deg); }
        }
      `}</style>
    </section>
  );
}
