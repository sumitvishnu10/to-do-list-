import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiBriefcase, FiUser, FiBookOpen, FiActivity, FiShoppingCart, FiDollarSign, FiMap } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { name: 'Work', icon: <FiBriefcase className="w-6 h-6" />, color: 'bg-blue-500', count: 12 },
  { name: 'Personal', icon: <FiUser className="w-6 h-6" />, color: 'bg-purple-500', count: 8 },
  { name: 'Study', icon: <FiBookOpen className="w-6 h-6" />, color: 'bg-yellow-500', count: 5 },
  { name: 'Fitness', icon: <FiActivity className="w-6 h-6" />, color: 'bg-emerald-500', count: 3 },
  { name: 'Shopping', icon: <FiShoppingCart className="w-6 h-6" />, color: 'bg-pink-500', count: 15 },
  { name: 'Finance', icon: <FiDollarSign className="w-6 h-6" />, color: 'bg-green-600', count: 2 },
  { name: 'Travel', icon: <FiMap className="w-6 h-6" />, color: 'bg-orange-500', count: 1 },
];

export default function SmartCategories() {
  const container = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(() => {
    gsap.from(cardsRef.current, {
      scrollTrigger: {
        trigger: container.current,
        start: "top 70%",
      },
      y: 40,
      opacity: 0,
      stagger: 0.1,
      ease: "back.out(1.5)",
      duration: 0.8
    });
  }, { scope: container });

  return (
    <section ref={container} className="w-full py-32 px-4 bg-surface dark:bg-surface-dark flex flex-col items-center">
      <div className="max-w-6xl w-full">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Smart Categories</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">Everything in its right place.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {categories.map((cat, i) => (
            <div 
              key={i}
              ref={el => cardsRef.current[i] = el}
              className="group relative cursor-pointer"
            >
              <div className="absolute inset-0 bg-white dark:bg-white/5 rounded-3xl shadow-sm border border-gray-100 dark:border-white/10 group-hover:scale-105 transition-transform duration-300 ease-out"></div>
              
              <div className="relative z-10 flex flex-col items-center justify-center p-8 w-40 h-40">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white mb-4 shadow-lg ${cat.color} group-hover:-translate-y-2 transition-transform duration-300 ease-out`}>
                  {cat.icon}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{cat.name}</h3>
                <span className="text-sm font-medium text-gray-500 bg-gray-100 dark:bg-black/30 px-3 py-1 rounded-full">
                  {cat.count} Tasks
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
