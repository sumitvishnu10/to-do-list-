import { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowRight, FiPlayCircle, FiCheckCircle, FiActivity, FiStar, FiZap, FiChevronDown, FiTrendingUp } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

function MagneticButton({ children, className, onClick }) {
  const buttonRef = useRef(null);

  useGSAP(() => {
    const button = buttonRef.current;
    const xTo = gsap.quickTo(button, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(button, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = button.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo(x * 0.4);
      yTo(y * 0.4);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <button ref={buttonRef} className={`relative ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default function HeroExperience() {
  const container = useRef(null);
  const headlineRef = useRef(null);
  const sublineRef = useRef(null);
  const buttonsRef = useRef(null);
  const dashboardRef = useRef(null);
  const statsRef = useRef([]);
  const pillsRef = useRef(null);
  
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useGSAP(() => {
    // Reveal Sequence
    const tl = gsap.timeline();

    tl.from(pillsRef.current, { y: -20, opacity: 0, duration: 0.8, ease: "power3.out" })
      .from(headlineRef.current.querySelectorAll('.word'), { 
        y: 80, opacity: 0, rotateX: -90, stagger: 0.1, duration: 1, ease: "power4.out" 
      }, "-=0.4")
      .from(sublineRef.current, { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
      .from(buttonsRef.current, { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
      .from(dashboardRef.current, { y: 100, opacity: 0, scale: 0.9, rotateX: 20, duration: 1.5, ease: "expo.out" }, "-=0.4")
      .from(statsRef.current, { x: 50, opacity: 0, stagger: 0.1, duration: 0.8, ease: "back.out(1.5)" }, "-=1");

    // Dashboard Float Animation
    gsap.to(dashboardRef.current, {
      y: -20,
      rotationX: 2,
      rotationY: -2,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Scroll Parallax
    gsap.to(container.current, {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    // Blur dashboard slightly on scroll
    gsap.to(dashboardRef.current, {
      filter: "blur(10px)",
      scale: 0.95,
      opacity: 0.5,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

  }, { scope: container });

  const scrollToDashboard = () => {
    document.getElementById('tasks')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={container} className="relative w-full min-h-[120vh] flex flex-col items-center justify-start pt-32 pb-20 overflow-hidden bg-[#050505] text-white">
      
      {/* 1. Aurora Animated Background */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none overflow-hidden" style={{ filter: 'blur(100px)' }}>
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full mix-blend-screen bg-gradient-to-r from-blue-600 to-indigo-600 animate-[aurora_15s_infinite_ease-in-out]"></div>
        <div className="absolute top-[10%] right-[-10%] w-[60vw] h-[60vw] rounded-full mix-blend-screen bg-gradient-to-l from-purple-600 to-pink-600 animate-[aurora_20s_infinite_reverse_ease-in-out]"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[40vw] h-[40vw] rounded-full mix-blend-screen bg-gradient-to-t from-emerald-500 to-teal-400 opacity-50 animate-[aurora_25s_infinite_ease-in-out]"></div>
      </div>

      {/* 2. Mouse Follower Glow */}
      <div 
        className="absolute w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] pointer-events-none z-0 mix-blend-overlay"
        style={{
          left: mousePos.x - 300,
          top: mousePos.y - 300,
          transition: 'left 0.1s ease-out, top 0.1s ease-out'
        }}
      />

      <div className="relative z-10 w-full max-w-7xl px-4 flex flex-col items-center text-center">
        
        {/* Feature Pills */}
        <div ref={pillsRef} className="flex flex-wrap justify-center gap-3 mb-10">
          {['Smart Tasks', 'Goal Tracking', 'Analytics', 'AI Suggestions'].map((pill, i) => (
            <span key={i} className="px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm font-medium flex items-center gap-2 shadow-[0_0_15px_rgba(255,255,255,0.05)] text-gray-300">
              <FiCheckCircle className="text-emerald-400" /> {pill}
            </span>
          ))}
        </div>

        {/* 3. Massive Typography */}
        <h1 
          ref={headlineRef} 
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] mb-8 flex flex-wrap justify-center gap-[1vw] perspective-1000"
          style={{ textShadow: '0 10px 40px rgba(255,255,255,0.1)' }}
        >
          {['The', 'Future', 'of', 'Personal', 'Productivity'].map((word, i) => (
            <div key={i} className="word inline-block bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/50 pb-2">
              {word}
            </div>
          ))}
        </h1>

        {/* Subheadline */}
        <p ref={sublineRef} className="text-xl md:text-2xl text-gray-400 max-w-3xl mb-12 font-light tracking-wide leading-relaxed">
          Stop managing tasks. <span className="text-white font-medium">Start building momentum.</span> Experience the $100M productivity engine designed for high-performers.
        </p>

        {/* 4. Magnetic Buttons */}
        <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center gap-6 mb-24">
          <MagneticButton 
            onClick={scrollToDashboard}
            className="group flex items-center gap-3 px-10 py-5 bg-white text-black rounded-full font-bold text-lg overflow-hidden transition-all hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.2)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              Get Started <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </MagneticButton>

          <MagneticButton 
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            className="group flex items-center gap-3 px-10 py-5 bg-transparent border border-white/20 text-white rounded-full font-bold text-lg transition-all hover:bg-white/5 hover:scale-105 backdrop-blur-md"
          >
            Watch Demo <FiPlayCircle className="w-5 h-5 opacity-70 group-hover:opacity-100" />
          </MagneticButton>
        </div>

        {/* 5. Floating Glassmorphism Dashboard */}
        <div className="relative w-full max-w-6xl mx-auto perspective-1000 mt-10">
          <div 
            ref={dashboardRef}
            className="w-full aspect-[16/9] rounded-[2rem] border border-white/10 bg-[#111]/80 backdrop-blur-2xl shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden flex"
            style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
          >
            {/* Mock Sidebar */}
            <div className="w-64 border-r border-white/10 bg-white/5 hidden md:flex flex-col p-6 gap-6">
              <div className="flex items-center gap-3 text-xl font-bold mb-8">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent"></div>
                TaskFlow X
              </div>
              {['Inbox', 'Today', 'Upcoming', 'Projects'].map((item, i) => (
                <div key={i} className={`px-4 py-2 rounded-lg font-medium ${i === 1 ? 'bg-white/10 text-white' : 'text-gray-500'}`}>
                  {item}
                </div>
              ))}
            </div>

            {/* Mock Main Content */}
            <div className="flex-1 p-8 md:p-12 flex flex-col gap-8">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">Good Morning, Alex</h2>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10"></div>
                  <div className="w-10 h-10 rounded-full bg-primary"></div>
                </div>
              </div>

              {/* Mock Dashboard Widgets */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10">
                  <FiActivity className="text-blue-400 mb-4 w-6 h-6" />
                  <div className="text-3xl font-bold mb-1">85%</div>
                  <div className="text-gray-400 text-sm">Completion Rate</div>
                </div>
                <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10">
                  <FiStar className="text-yellow-400 mb-4 w-6 h-6" />
                  <div className="text-3xl font-bold mb-1">12</div>
                  <div className="text-gray-400 text-sm">Active Tasks</div>
                </div>
                <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10">
                  <FiTrendingUp className="text-emerald-400 mb-4 w-6 h-6" />
                  <div className="text-3xl font-bold mb-1">94</div>
                  <div className="text-gray-400 text-sm">Productivity Score</div>
                </div>
              </div>

              {/* Mock Task List */}
              <div className="flex-1 rounded-2xl border border-white/10 bg-black/40 p-6 flex flex-col gap-4">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-colors">
                    <div className="w-5 h-5 rounded-full border-2 border-gray-600"></div>
                    <div className="flex-1 h-3 bg-white/10 rounded-full"></div>
                    <div className="w-16 h-3 bg-white/5 rounded-full"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 6. Floating Statistics */}
          <div ref={el => statsRef.current[0] = el} className="absolute -left-10 top-20 p-4 rounded-2xl bg-[#1a1a1a]/80 backdrop-blur-xl border border-white/10 shadow-2xl flex items-center gap-4 hidden lg:flex animate-[float_6s_infinite_ease-in-out]">
            <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl"><FiCheckCircle className="w-6 h-6" /></div>
            <div>
              <div className="text-xl font-bold">1.2M+</div>
              <div className="text-xs text-gray-400 font-medium tracking-wide uppercase">Tasks Done</div>
            </div>
          </div>

          <div ref={el => statsRef.current[1] = el} className="absolute -right-12 bottom-40 p-4 rounded-2xl bg-[#1a1a1a]/80 backdrop-blur-xl border border-white/10 shadow-2xl flex items-center gap-4 hidden lg:flex animate-[float_8s_infinite_ease-in-out_reverse]">
            <div className="p-3 bg-blue-500/20 text-blue-400 rounded-xl"><FiZap className="w-6 h-6" /></div>
            <div>
              <div className="text-xl font-bold">50K+</div>
              <div className="text-xs text-gray-400 font-medium tracking-wide uppercase">Active Users</div>
            </div>
          </div>

          <div ref={el => statsRef.current[2] = el} className="absolute left-20 -bottom-10 p-4 rounded-2xl bg-[#1a1a1a]/80 backdrop-blur-xl border border-white/10 shadow-2xl flex items-center gap-4 hidden lg:flex animate-[float_7s_infinite_ease-in-out]">
            <div className="p-3 bg-purple-500/20 text-purple-400 rounded-xl"><FiActivity className="w-6 h-6" /></div>
            <div>
              <div className="text-xl font-bold">99.9%</div>
              <div className="text-xs text-gray-400 font-medium tracking-wide uppercase">Uptime Server</div>
            </div>
          </div>

        </div>
      </div>

      {/* 7. Animated Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 opacity-60">
        <span className="text-xs font-semibold tracking-widest uppercase">Scroll to Explore</span>
        <FiChevronDown className="w-5 h-5 animate-bounce" />
      </div>

    </section>
  );
}
