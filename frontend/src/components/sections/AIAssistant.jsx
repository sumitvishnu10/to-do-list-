import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiCpu, FiMessageSquare, FiZap, FiCheckCircle } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const suggestions = [
  { icon: <FiZap className="text-yellow-500" />, text: "You usually complete 'Design Review' faster in the morning. Consider moving it to 9 AM." },
  { icon: <FiMessageSquare className="text-blue-500" />, text: "You have 3 overdue personal tasks. Want me to reschedule them for the weekend?" },
  { icon: <FiCheckCircle className="text-emerald-500" />, text: "Great momentum! You're 20% more productive this week. Keep it up!" }
];

export default function AIAssistant() {
  const container = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(() => {
    gsap.from(".ai-header", {
      scrollTrigger: {
        trigger: container.current,
        start: "top 70%",
      },
      y: 30,
      opacity: 0,
      duration: 1,
      ease: "power2.out"
    });

    gsap.from(cardsRef.current, {
      scrollTrigger: {
        trigger: container.current,
        start: "top 60%",
      },
      y: 50,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: "back.out(1.2)"
    });
  }, { scope: container });

  return (
    <section ref={container} className="w-full min-h-screen py-32 px-4 bg-surface dark:bg-surface-dark flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Abstract AI Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-4xl w-full relative z-10 flex flex-col items-center">
        
        <div className="ai-header text-center mb-16">
          <div className="inline-flex items-center justify-center p-4 bg-white dark:bg-black/20 rounded-full shadow-lg border border-gray-100 dark:border-white/10 mb-8 animate-[pulse_3s_infinite]">
            <FiCpu className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">Meet Your AI Assistant</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            TaskFlow X analyzes your working habits to provide actionable insights and smart scheduling recommendations.
          </p>
        </div>

        <div className="w-full space-y-6">
          {suggestions.map((sug, i) => (
            <div 
              key={i}
              ref={el => cardsRef.current[i] = el}
              className="glass p-6 md:p-8 rounded-3xl flex items-start gap-6 hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl shrink-0">
                {sug.icon}
              </div>
              <div className="flex-1">
                <p className="text-lg md:text-xl text-gray-800 dark:text-gray-200 font-medium leading-relaxed">
                  "{sug.text}"
                </p>
                <div className="mt-4 flex gap-3">
                  <button className="px-4 py-2 bg-gray-900 text-white dark:bg-white dark:text-gray-900 text-sm font-semibold rounded-full shadow-md hover:opacity-90 transition-opacity">
                    Apply Suggestion
                  </button>
                  <button className="px-4 py-2 bg-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white text-sm font-medium rounded-full transition-colors">
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
