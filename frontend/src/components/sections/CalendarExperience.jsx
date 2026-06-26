import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { format, addDays, startOfWeek, isSameDay } from 'date-fns';
import { FiCalendar, FiChevronLeft, FiChevronRight, FiClock } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const events = [
  { date: new Date(), title: "Team Standup", time: "10:00 AM", type: "work" },
  { date: new Date(), title: "Design Review", time: "2:00 PM", type: "work" },
  { date: addDays(new Date(), 1), title: "Doctor Appointment", time: "9:00 AM", type: "personal" },
  { date: addDays(new Date(), 2), title: "Project Deadline", time: "11:59 PM", type: "urgent" },
];

export default function CalendarExperience() {
  const container = useRef(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('weekly');

  const startDate = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(startDate, i));

  useGSAP(() => {
    gsap.from(".cal-day", {
      scrollTrigger: {
        trigger: container.current,
        start: "top 70%",
      },
      y: 30,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: "power2.out"
    });

    gsap.from(".cal-event", {
      scrollTrigger: {
        trigger: container.current,
        start: "top 60%",
      },
      scale: 0.8,
      opacity: 0,
      stagger: 0.1,
      duration: 0.5,
      delay: 0.5,
      ease: "back.out(1.5)"
    });
  }, { scope: container });

  const getEventColor = (type) => {
    switch(type) {
      case 'work': return 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300 border-blue-200 dark:border-blue-500/30';
      case 'personal': return 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300 border-purple-200 dark:border-purple-500/30';
      case 'urgent': return 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300 border-red-200 dark:border-red-500/30';
      default: return 'bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-300 border-gray-200 dark:border-white/10';
    }
  };

  return (
    <section ref={container} className="w-full min-h-screen py-32 px-4 bg-surface dark:bg-surface-dark flex flex-col items-center">
      <div className="max-w-6xl w-full">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Timeline</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">Your upcoming week at a glance.</p>
          </div>

          <div className="mt-6 md:mt-0 flex items-center gap-4">
            <div className="flex bg-white dark:bg-black/20 p-1 rounded-xl shadow-sm border border-gray-100 dark:border-white/10">
              {['daily', 'weekly', 'monthly'].map((v) => (
                <button 
                  key={v}
                  onClick={() => setView(v)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                    view === v ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-md' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button className="p-2 bg-white dark:bg-black/20 rounded-xl shadow-sm border border-gray-100 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10 transition-colors">
                <FiChevronLeft className="w-5 h-5 dark:text-white" />
              </button>
              <button className="p-2 bg-white dark:bg-black/20 rounded-xl shadow-sm border border-gray-100 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10 transition-colors">
                <FiChevronRight className="w-5 h-5 dark:text-white" />
              </button>
            </div>
          </div>
        </div>

        <div className="glass-card overflow-hidden">
          {/* Calendar Header */}
          <div className="grid grid-cols-7 border-b border-gray-100 dark:border-white/10 bg-gray-50/50 dark:bg-black/10">
            {weekDays.map((date, i) => (
              <div key={i} className="cal-day p-4 text-center border-r border-gray-100 dark:border-white/10 last:border-0">
                <span className="block text-sm font-medium text-gray-500 mb-1">{format(date, 'EEE')}</span>
                <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-lg font-bold ${
                  isSameDay(date, new Date()) ? 'bg-primary text-white shadow-glow' : 'text-gray-900 dark:text-white'
                }`}>
                  {format(date, 'd')}
                </span>
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 h-[400px]">
            {weekDays.map((date, i) => (
              <div key={i} className="cal-day p-2 border-r border-gray-100 dark:border-white/10 last:border-0 hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                {events.filter(e => isSameDay(e.date, date)).map((ev, j) => (
                  <div 
                    key={j} 
                    className={`cal-event mt-2 p-3 rounded-xl border flex flex-col gap-2 cursor-pointer hover:shadow-md transition-shadow ${getEventColor(ev.type)}`}
                  >
                    <span className="font-semibold text-sm leading-tight">{ev.title}</span>
                    <div className="flex items-center gap-1 text-xs opacity-80 font-medium">
                      <FiClock className="w-3 h-3" />
                      {ev.time}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
