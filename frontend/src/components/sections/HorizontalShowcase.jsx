import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const panels = [
  {
    title: "Insightful Dashboards",
    description: "Visualize your entire life in one beautifully structured view. Uncover patterns in your productivity.",
    color: "bg-blue-500/10 dark:bg-blue-500/5"
  },
  {
    title: "Earn Achievements",
    description: "Gamify your workflow. Unlock premium badges as you consistently hit your daily targets.",
    color: "bg-purple-500/10 dark:bg-purple-500/5"
  },
  {
    title: "Global Sync",
    description: "Whether on desktop, tablet, or mobile, your data flows seamlessly everywhere you go.",
    color: "bg-emerald-500/10 dark:bg-emerald-500/5"
  },
  {
    title: "Infinite Flexibility",
    description: "Customize everything. TaskFlow X molds to your unique working style.",
    color: "bg-orange-500/10 dark:bg-orange-500/5"
  }
];

export default function HorizontalShowcase() {
  const container = useRef(null);
  const scrollWrapper = useRef(null);

  useGSAP(() => {
    const panels = gsap.utils.toArray('.h-panel');
    
    gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        pin: true,
        scrub: 1,
        snap: 1 / (panels.length - 1),
        end: () => "+=" + scrollWrapper.current.offsetWidth
      }
    });
  }, { scope: container });

  return (
    <section ref={container} className="relative w-full h-screen overflow-hidden bg-background dark:bg-background-dark">
      <div 
        ref={scrollWrapper}
        className="flex w-[400vw] h-full"
      >
        {panels.map((panel, i) => (
          <div 
            key={i} 
            className={`h-panel w-screen h-full flex flex-col items-center justify-center p-8 ${panel.color}`}
          >
            <div className="max-w-4xl w-full flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 space-y-6">
                <span className="text-xl font-bold text-gray-400 tracking-widest uppercase">0{i + 1}</span>
                <h2 className="text-6xl md:text-8xl font-black text-gray-900 dark:text-white leading-none tracking-tighter">
                  {panel.title}
                </h2>
                <p className="text-2xl text-gray-600 dark:text-gray-400 max-w-lg font-light leading-relaxed">
                  {panel.description}
                </p>
              </div>
              
              <div className="flex-1 w-full aspect-square md:aspect-video rounded-3xl glass-card border border-white/20 shadow-2xl overflow-hidden relative">
                {/* Placeholder abstract graphic */}
                <div className="absolute inset-0 opacity-50 dark:opacity-20 flex items-center justify-center">
                  <div className="w-64 h-64 border-[40px] border-gray-200 dark:border-white/10 rounded-full mix-blend-multiply dark:mix-blend-screen animate-spin" style={{ animationDuration: '20s' }}></div>
                  <div className="absolute w-40 h-40 border-[20px] border-primary rounded-full mix-blend-multiply dark:mix-blend-screen animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
