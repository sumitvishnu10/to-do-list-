import { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

gsap.registerPlugin(ScrollTrigger);

const data = [
  { name: 'Mon', completed: 4 },
  { name: 'Tue', completed: 7 },
  { name: 'Wed', completed: 5 },
  { name: 'Thu', completed: 10 },
  { name: 'Fri', completed: 8 },
  { name: 'Sat', completed: 2 },
  { name: 'Sun', completed: 12 },
];

export default function ProductivityAnalytics() {
  const container = useRef(null);
  const countersRef = useRef([]);

  useGSAP(() => {
    countersRef.current.forEach((counter) => {
      const target = parseInt(counter.getAttribute('data-target'), 10);
      gsap.to(counter, {
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
        },
        innerHTML: target,
        duration: 2,
        snap: { innerHTML: 1 },
        ease: "power2.out",
        onUpdate: function() {
          counter.innerHTML = Math.round(this.targets()[0].innerHTML) + (counter.getAttribute('data-suffix') || '');
        }
      });
    });

    gsap.from(".chart-container", {
      scrollTrigger: {
        trigger: ".chart-container",
        start: "top 80%",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2
    });
  }, { scope: container });

  return (
    <section ref={container} className="w-full min-h-screen py-32 px-4 bg-background dark:bg-background-dark">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Productivity Analytics</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">Visualize your workflow. Measure your impact.</p>
        </div>

        {/* Animated Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { label: 'Total Tasks', target: 1240, suffix: '+' },
            { label: 'Completed', target: 890, suffix: '+' },
            { label: 'Pending', target: 350, suffix: '' },
            { label: 'Efficiency', target: 94, suffix: '%' },
          ].map((stat, i) => (
            <div key={i} className="glass-card p-8 flex flex-col items-center justify-center text-center hover:-translate-y-1 transition-transform">
              <span 
                ref={el => countersRef.current[i] = el}
                data-target={stat.target}
                data-suffix={stat.suffix}
                className="text-5xl font-bold text-primary mb-2"
              >
                0
              </span>
              <span className="text-gray-600 dark:text-gray-400 font-medium uppercase tracking-wider text-sm">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Dynamic Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="chart-container glass-card p-8 h-[400px]">
            <h3 className="text-xl font-bold mb-6 dark:text-white">Weekly Progress</h3>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                <Area type="monotone" dataKey="completed" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorCompleted)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-container glass-card p-8 h-[400px] flex items-center justify-center">
            {/* Custom Circular Progress */}
            <div className="relative w-64 h-64 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="128" cy="128" r="100" stroke="currentColor" strokeWidth="16" fill="transparent" className="text-gray-100 dark:text-white/5" />
                <circle 
                  cx="128" cy="128" r="100" 
                  stroke="currentColor" 
                  strokeWidth="16" 
                  fill="transparent" 
                  strokeDasharray="628"
                  strokeDashoffset="628"
                  className="text-emerald-500 animate-[dash_2s_ease-out_forwards]" 
                  style={{ animationDelay: '0.5s' }}
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-4xl font-bold dark:text-white">85%</span>
                <span className="text-sm text-gray-500">Goal Reached</span>
              </div>
            </div>
            
            <style>{`
              @keyframes dash {
                to { stroke-dashoffset: 94; /* 628 * (1 - 0.85) */ }
              }
            `}</style>
          </div>
        </div>

      </div>
    </section>
  );
}
