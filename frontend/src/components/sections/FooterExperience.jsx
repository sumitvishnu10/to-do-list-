import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiArrowUp } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

export default function FooterExperience() {
  const container = useRef(null);
  const footerContentRef = useRef(null);

  useGSAP(() => {
    // Dramatic slide-up reveal
    gsap.from(footerContentRef.current, {
      scrollTrigger: {
        trigger: container.current,
        start: "top bottom",
        end: "bottom bottom",
        scrub: true,
      },
      y: 200,
      opacity: 0,
    });
  }, { scope: container });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer ref={container} className="w-full relative bg-gray-900 text-white overflow-hidden" style={{ minHeight: '60vh' }}>
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute bottom-[-20%] left-[10%] w-[500px] h-[500px] bg-primary rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-20%] right-[10%] w-[400px] h-[400px] bg-accent rounded-full blur-[100px]"></div>
      </div>

      <div ref={footerContentRef} className="relative z-10 w-full h-full flex flex-col justify-between max-w-7xl mx-auto px-8 py-20 min-h-[60vh]">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
          <div className="max-w-2xl">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              TaskFlow X
            </h2>
            <p className="text-2xl text-gray-400 font-light max-w-md">
              The next generation of productivity. Designed for those who demand excellence.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-12 text-lg">
            <div className="flex flex-col gap-4">
              <span className="font-bold text-gray-500 uppercase tracking-widest text-sm mb-2">Connect</span>
              <a href="#" className="flex items-center gap-2 hover:text-primary transition-colors"><FiTwitter /> Twitter</a>
              <a href="#" className="flex items-center gap-2 hover:text-primary transition-colors"><FiGithub /> GitHub</a>
              <a href="#" className="flex items-center gap-2 hover:text-primary transition-colors"><FiLinkedin /> LinkedIn</a>
            </div>
            <div className="flex flex-col gap-4">
              <span className="font-bold text-gray-500 uppercase tracking-widest text-sm mb-2">Legal</span>
              <a href="#" className="hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms</a>
              <a href="#" className="flex items-center gap-2 hover:text-primary transition-colors"><FiMail /> Contact</a>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-20 pt-10 border-t border-white/10">
          <p className="text-gray-500">&copy; {new Date().getFullYear()} TaskFlow X. All rights reserved.</p>
          
          <button 
            onClick={scrollToTop}
            className="p-4 bg-white/5 hover:bg-white/10 rounded-full transition-colors group"
          >
            <FiArrowUp className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors group-hover:-translate-y-1 transform duration-300" />
          </button>
        </div>

      </div>
    </footer>
  );
}
