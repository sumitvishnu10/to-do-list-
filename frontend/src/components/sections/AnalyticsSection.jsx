import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTodoContext } from '../../context/TodoContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

gsap.registerPlugin(ScrollTrigger);

export default function AnalyticsSection() {
  const { todos } = useTodoContext();
  const containerRef = useRef(null);
  const countersRef = useRef([]);

  const totalTasks = todos.length;
  const completedTasks = todos.filter(t => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  // Mock data for the chart based on current categories
  const categoryData = ['work', 'personal', 'study', 'shopping'].map(cat => ({
    name: cat.charAt(0).toUpperCase() + cat.slice(1),
    count: todos.filter(t => t.category === cat).length
  }));

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate numbers
      countersRef.current.forEach((counter) => {
        if (!counter) return;
        const target = parseFloat(counter.getAttribute('data-target'));
        gsap.to(counter, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
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

      // Animate chart container
      gsap.from('.chart-container', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 50%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });
    }, containerRef);

    return () => ctx.revert();
  }, [totalTasks, completedTasks, pendingTasks, completionRate]);

  const stats = [
    { label: 'Total Tasks', value: totalTasks },
    { label: 'Completed', value: completedTasks },
    { label: 'Pending', value: pendingTasks },
    { label: 'Productivity', value: completionRate, suffix: '%' }
  ];

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col items-center justify-center px-4 bg-surface dark:bg-background-dark">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 dark:text-white">
          Analytics & Insights
        </h2>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
          Understand your productivity patterns and see how much you've accomplished.
        </p>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <div key={i} className="glass-card p-6 flex flex-col items-center justify-center text-center group hover:scale-105 transition-transform duration-300">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">
              {stat.label}
            </span>
            <div className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              <span 
                ref={el => countersRef.current[i] = el}
                data-target={stat.value}
                data-suffix={stat.suffix || ''}
              >
                0
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="chart-container w-full max-w-5xl h-[300px] glass-card p-6">
        <h3 className="text-lg font-semibold mb-6 dark:text-white">Tasks by Category</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={categoryData}>
            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip 
              cursor={{fill: 'transparent'}}
              contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px -2px rgba(0,0,0,0.1)' }}
            />
            <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
