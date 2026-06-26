import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  { name: "Sarah J.", role: "Product Manager", text: "TaskFlow X completely changed how our team manages deadlines. The UI is stunning." },
  { name: "David L.", role: "Software Engineer", text: "Finally, a productivity app that feels as fast as I think. The keyboard shortcuts are a lifesaver." },
  { name: "Emily R.", role: "Freelance Designer", text: "It's rare to find an app where aesthetics and functionality are perfectly balanced. Brilliant." },
  { name: "Michael T.", role: "Startup Founder", text: "The AI assistant alone is worth it. It reschedules my chaotic days effortlessly." },
  { name: "Jessica K.", role: "Marketing Director", text: "I've tried them all. Linear, Notion, Asana... TaskFlow X is in a league of its own." },
  { name: "Alex W.", role: "Student", text: "Managing my coursework and personal life has never been this visually pleasing." }
];

export default function Testimonials() {
  const container = useRef(null);
  const trackRef = useRef(null);

  useGSAP(() => {
    // Infinite Marquee
    const trackWidth = trackRef.current.scrollWidth / 2;
    
    gsap.to(trackRef.current, {
      x: `-=${trackWidth}`,
      duration: 20,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % trackWidth)
      }
    });

    // Intro Animation
    gsap.from(".testimonial-header", {
      scrollTrigger: {
        trigger: container.current,
        start: "top 70%",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });

  }, { scope: container });

  return (
    <section ref={container} className="w-full py-32 bg-background dark:bg-background-dark overflow-hidden flex flex-col items-center">
      <div className="testimonial-header text-center mb-20 px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Don't just take our word for it.</h2>
        <p className="text-xl text-gray-600 dark:text-gray-400">Join thousands of professionals doing their best work.</p>
      </div>

      <div className="w-[110vw] md:w-[150vw] -rotate-3 overflow-hidden py-10 relative">
        <div ref={trackRef} className="flex gap-6 w-max">
          {/* Double the array for infinite scroll effect */}
          {[...testimonials, ...testimonials].map((testimonial, i) => (
            <div 
              key={i} 
              className="w-[350px] md:w-[450px] p-8 glass-card border border-gray-200/50 dark:border-white/10 shrink-0 transform perspective-1000 hover:rotate-y-12 hover:scale-105 transition-all duration-500 cursor-pointer"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent"></div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                  <span className="text-sm text-gray-500">{testimonial.role}</span>
                </div>
              </div>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                "{testimonial.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
