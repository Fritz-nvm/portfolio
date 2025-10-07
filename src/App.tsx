import { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Code2, Database, Brain, Server, ChevronDown, Menu, X, Terminal, Lock, Unlock, Trophy, Star, Zap, Download, Briefcase } from 'lucide-react';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [terminalText, setTerminalText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [unlockedSections, setUnlockedSections] = useState<string[]>(['home', 'about']);
  const [achievements, setAchievements] = useState<string[]>([]);
  const [visitedSections, setVisitedSections] = useState<string[]>(['home']);

  const fullText = "> You enter the portfolio of Your Name\n> What would you like to explore?";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTerminalText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);

    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => {
      clearInterval(timer);
      clearInterval(cursorTimer);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ['home', 'about', 'projects', 'skills', 'experience', 'hire', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);

            if (!visitedSections.includes(section)) {
              setVisitedSections(prev => [...prev, section]);
              unlockSection(section);
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visitedSections]);

  const unlockSection = (section: string) => {
    if (!unlockedSections.includes(section)) {
      setUnlockedSections(prev => [...prev, section]);

      const achievementMap: { [key: string]: string } = {
        'projects': 'Explorer - Discovered the Projects Archive',
        'skills': 'Scholar - Unlocked the Skills Matrix',
        'experience': 'Historian - Accessed Experience Timeline',
        'hire': 'Recruiter - Found the Hire Portal',
        'contact': 'Networker - Reached the Contact Portal'
      };

      if (achievementMap[section] && !achievements.includes(achievementMap[section])) {
        setAchievements(prev => [...prev, achievementMap[section]]);
        showAchievement(achievementMap[section]);
      }
    }
  };

  const showAchievement = (achievement: string) => {
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.innerHTML = `
      <div class="flex items-center gap-3 bg-amber-900/90 backdrop-blur-sm text-amber-100 px-6 py-4 rounded-lg border border-amber-500/30 shadow-2xl">
        <svg class="w-6 h-6 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
        <div>
          <div class="font-bold text-sm">Achievement Unlocked!</div>
          <div class="text-xs">${achievement}</div>
        </div>
      </div>
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const getSectionIcon = (section: string) => {
    if (unlockedSections.includes(section)) {
      return <Unlock size={16} className="text-emerald-400" />;
    }
    return <Lock size={16} className="text-stone-500" />;
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 relative overflow-x-hidden">
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)`
        }} />
      </div>

      <style>{`
        .achievement-notification {
          position: fixed;
          top: 100px;
          right: 20px;
          z-index: 1000;
          animation: slideInRight 0.5s ease-out, slideOutRight 0.5s ease-in 2.5s;
        }

        @keyframes slideInRight {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideOutRight {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(400px);
            opacity: 0;
          }
        }
      `}</style>

      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-stone-950/95 backdrop-blur-sm border-b border-stone-800' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <a href="#home" className="flex items-center gap-2 text-stone-100 font-mono text-sm group">
              <Terminal size={20} className="text-emerald-400 group-hover:text-emerald-300 transition-colors" />
              <span className="group-hover:text-emerald-400 transition-colors">&gt; portfolio.exe</span>
            </a>

            <button
              className="md:hidden text-stone-400 hover:text-stone-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div className="hidden md:flex gap-6 font-mono text-sm">
              {['about', 'projects', 'skills', 'experience', 'hire', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-all duration-200 flex items-center gap-2 ${
                    activeSection === section
                      ? 'text-emerald-400'
                      : unlockedSections.includes(section)
                      ? 'text-stone-400 hover:text-stone-100'
                      : 'text-stone-600 cursor-not-allowed'
                  }`}
                  disabled={!unlockedSections.includes(section)}
                >
                  {getSectionIcon(section)}
                  [{section}]
                </button>
              ))}
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 flex flex-col gap-3 font-mono text-sm">
              {['about', 'projects', 'skills', 'experience', 'hire', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize text-left transition-colors flex items-center gap-2 ${
                    activeSection === section
                      ? 'text-emerald-400'
                      : unlockedSections.includes(section)
                      ? 'text-stone-400'
                      : 'text-stone-600 cursor-not-allowed'
                  }`}
                  disabled={!unlockedSections.includes(section)}
                >
                  {getSectionIcon(section)}
                  [{section}]
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20 relative">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="mb-12">
            <div className="bg-stone-900/50 backdrop-blur-sm border border-stone-800 rounded-lg p-8 font-mono text-sm shadow-2xl">
              <div className="flex items-center gap-2 mb-4 text-stone-500">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/50"></div>
                </div>
                <span className="ml-2">terminal</span>
              </div>
              <div className="text-emerald-400 whitespace-pre-wrap">
                {terminalText}
                {showCursor && <span className="inline-block w-2 h-4 bg-emerald-400 ml-1 animate-pulse"></span>}
              </div>
              {terminalText.length >= fullText.length && (
                <div className="mt-6 flex flex-wrap gap-3 animate-fade-in">
                  {['Projects', 'Skills', 'Experience', 'Hire', 'Contact'].map((item) => (
                    <button
                      key={item}
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className="text-stone-400 hover:text-emerald-400 transition-colors border border-stone-700 hover:border-emerald-400/50 px-4 py-2 rounded"
                    >
                      [{item}]
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="text-center mb-8">
            <div className="relative inline-block mb-6">
              <div className="w-24 h-24 rounded-full border-2 border-stone-700 bg-stone-900 mx-auto flex items-center justify-center text-stone-400 text-3xl font-bold">
                YN
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-stone-100">
              Full-Stack Developer & AI Enthusiast
            </h1>

            <p className="text-lg md:text-xl text-stone-400 mb-8 max-w-2xl mx-auto">
              Crafting intelligent, scalable applications that solve real-world problems
            </p>

            <div className="flex gap-4 justify-center mb-8">
              <a href="#" className="text-stone-400 hover:text-emerald-400 transition-colors">
                <Github size={24} />
              </a>
              <a href="#" className="text-stone-400 hover:text-emerald-400 transition-colors">
                <Linkedin size={24} />
              </a>
              <a href="#contact" className="text-stone-400 hover:text-emerald-400 transition-colors">
                <Mail size={24} />
              </a>
            </div>

            <div className="inline-flex items-center gap-2 text-stone-500 text-sm font-mono">
              <Trophy size={16} className="text-amber-400" />
              <span>{achievements.length} / 5 Achievements Unlocked</span>
            </div>
          </div>

          <button
            onClick={() => scrollToSection('about')}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-stone-500 hover:text-emerald-400 transition-colors"
          >
            <ChevronDown size={32} />
          </button>
        </div>
      </section>

      <section id="about" className="min-h-screen flex items-center justify-center px-6 py-20 relative">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-8 font-mono text-sm">
            <Unlock size={20} className="text-emerald-400" />
            <h2 className="text-3xl md:text-4xl font-bold text-stone-100">
              &gt; about.md
            </h2>
          </div>

          <div className="bg-stone-900/50 backdrop-blur-sm border border-stone-800 rounded-lg p-8 md:p-12 shadow-xl">
            <div className="space-y-6 text-stone-300 leading-relaxed">
              <p>
                I'm a passionate full-stack developer with a deep fascination for artificial intelligence and its potential to transform how we interact with technology. My journey into tech began with a simple curiosity about how things work, which has evolved into a career building sophisticated applications that make a difference.
              </p>

              <p>
                What drives me is the intersection of elegant code and practical problem-solving. I believe the best software isn't just functional—it's intuitive, performant, and delightful to use. Whether I'm architecting backend systems, crafting responsive frontends, or integrating AI capabilities, I approach each project with attention to detail and a commitment to best practices.
              </p>

              <p>
                Beyond coding, I'm committed to continuous learning. The tech landscape evolves rapidly, and I embrace that challenge by exploring new frameworks, contributing to open source, and sharing knowledge with the developer community. My goal is to build systems that scale, code that lasts, and solutions that matter.
              </p>

              <div className="border-t border-stone-800 pt-6 mt-6">
                <h3 className="text-xl font-semibold mb-3 text-emerald-400 font-mono">
                  &gt; current_objectives
                </h3>
                <p>
                  I'm seeking opportunities to work with innovative teams on challenging problems, particularly in areas involving AI/ML integration, complex system architecture, and products that have meaningful impact on users' lives.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="min-h-screen px-6 py-20 relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-4 font-mono text-sm">
            <Unlock size={20} className="text-emerald-400" />
            <h2 className="text-3xl md:text-4xl font-bold text-stone-100">
              &gt; projects.list
            </h2>
          </div>
          <p className="text-stone-400 mb-12 font-mono text-sm">
            // Real-world applications showcasing technical depth
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="group bg-stone-900/50 backdrop-blur-sm border border-stone-800 hover:border-emerald-400/50 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-emerald-400/5">
              <div className="h-40 bg-gradient-to-br from-stone-800 to-stone-900 flex items-center justify-center border-b border-stone-800">
                <Brain size={48} className="text-stone-600 group-hover:text-emerald-400 transition-colors" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-stone-100 font-mono">
                  AI-Powered Content Analyzer
                </h3>
                <p className="text-stone-400 text-sm mb-4 leading-relaxed">
                  Full-stack application leveraging NLP models to analyze and categorize large volumes of text data with 94% accuracy. Processes 10,000+ documents daily.
                </p>
                <div className="mb-4">
                  <h4 className="font-mono text-xs text-stone-500 mb-2">TECH_STACK:</h4>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'Node.js', 'Python', 'TensorFlow', 'PostgreSQL', 'Redis'].map(tech => (
                      <span key={tech} className="bg-stone-800 text-stone-400 px-2 py-1 rounded text-xs font-mono border border-stone-700">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4 text-sm">
                  <a href="#" className="flex items-center gap-1 text-stone-400 hover:text-emerald-400 font-mono transition-colors">
                    <ExternalLink size={14} /> demo
                  </a>
                  <a href="#" className="flex items-center gap-1 text-stone-400 hover:text-emerald-400 font-mono transition-colors">
                    <Github size={14} /> source
                  </a>
                </div>
              </div>
            </div>

            <div className="group bg-stone-900/50 backdrop-blur-sm border border-stone-800 hover:border-emerald-400/50 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-emerald-400/5">
              <div className="h-40 bg-gradient-to-br from-stone-800 to-stone-900 flex items-center justify-center border-b border-stone-800">
                <Server size={48} className="text-stone-600 group-hover:text-emerald-400 transition-colors" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-stone-100 font-mono">
                  E-Commerce Platform
                </h3>
                <p className="text-stone-400 text-sm mb-4 leading-relaxed">
                  Enterprise-grade marketplace with real-time inventory management, payment processing, and analytics. Handles 50,000+ monthly transactions.
                </p>
                <div className="mb-4">
                  <h4 className="font-mono text-xs text-stone-500 mb-2">TECH_STACK:</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Next.js', 'TypeScript', 'Express', 'MongoDB', 'Stripe', 'AWS'].map(tech => (
                      <span key={tech} className="bg-stone-800 text-stone-400 px-2 py-1 rounded text-xs font-mono border border-stone-700">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4 text-sm">
                  <a href="#" className="flex items-center gap-1 text-stone-400 hover:text-emerald-400 font-mono transition-colors">
                    <ExternalLink size={14} /> demo
                  </a>
                  <a href="#" className="flex items-center gap-1 text-stone-400 hover:text-emerald-400 font-mono transition-colors">
                    <Github size={14} /> source
                  </a>
                </div>
              </div>
            </div>

            <div className="group bg-stone-900/50 backdrop-blur-sm border border-stone-800 hover:border-emerald-400/50 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-emerald-400/5">
              <div className="h-40 bg-gradient-to-br from-stone-800 to-stone-900 flex items-center justify-center border-b border-stone-800">
                <Database size={48} className="text-stone-600 group-hover:text-emerald-400 transition-colors" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-stone-100 font-mono">
                  Real-Time Analytics Dashboard
                </h3>
                <p className="text-stone-400 text-sm mb-4 leading-relaxed">
                  High-performance data visualization platform processing millions of events per day with sub-second query response times.
                </p>
                <div className="mb-4">
                  <h4 className="font-mono text-xs text-stone-500 mb-2">TECH_STACK:</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Vue.js', 'FastAPI', 'ClickHouse', 'Kafka', 'Docker', 'K8s'].map(tech => (
                      <span key={tech} className="bg-stone-800 text-stone-400 px-2 py-1 rounded text-xs font-mono border border-stone-700">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4 text-sm">
                  <a href="#" className="flex items-center gap-1 text-stone-400 hover:text-emerald-400 font-mono transition-colors">
                    <ExternalLink size={14} /> demo
                  </a>
                  <a href="#" className="flex items-center gap-1 text-stone-400 hover:text-emerald-400 font-mono transition-colors">
                    <Github size={14} /> source
                  </a>
                </div>
              </div>
            </div>

            <div className="group bg-stone-900/50 backdrop-blur-sm border border-stone-800 hover:border-emerald-400/50 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-emerald-400/5">
              <div className="h-40 bg-gradient-to-br from-stone-800 to-stone-900 flex items-center justify-center border-b border-stone-800">
                <Code2 size={48} className="text-stone-600 group-hover:text-emerald-400 transition-colors" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-stone-100 font-mono">
                  Developer Collaboration Tool
                </h3>
                <p className="text-stone-400 text-sm mb-4 leading-relaxed">
                  Real-time collaborative code editor with integrated chat, version control, and AI-powered code suggestions.
                </p>
                <div className="mb-4">
                  <h4 className="font-mono text-xs text-stone-500 mb-2">TECH_STACK:</h4>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'Socket.io', 'Monaco', 'Node.js', 'Redis', 'OpenAI'].map(tech => (
                      <span key={tech} className="bg-stone-800 text-stone-400 px-2 py-1 rounded text-xs font-mono border border-stone-700">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4 text-sm">
                  <a href="#" className="flex items-center gap-1 text-stone-400 hover:text-emerald-400 font-mono transition-colors">
                    <ExternalLink size={14} /> demo
                  </a>
                  <a href="#" className="flex items-center gap-1 text-stone-400 hover:text-emerald-400 font-mono transition-colors">
                    <Github size={14} /> source
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="min-h-screen px-6 py-20 relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-4 font-mono text-sm">
            <Unlock size={20} className="text-emerald-400" />
            <h2 className="text-3xl md:text-4xl font-bold text-stone-100">
              &gt; skills.matrix
            </h2>
          </div>
          <p className="text-stone-400 mb-12 font-mono text-sm">
            // Progress bars indicate proficiency levels
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <div className="bg-stone-900/50 backdrop-blur-sm border border-stone-800 rounded-lg p-4 md:p-6">
              <h3 className="text-base md:text-lg font-bold mb-3 md:mb-4 text-emerald-400 font-mono flex items-center gap-2">
                <Code2 size={18} className="md:w-5 md:h-5" />
                LANGUAGES
              </h3>
              <div className="space-y-3 md:space-y-4">
                {[
                  { name: 'JavaScript/TypeScript', level: 90, xp: '2500 XP' },
                  { name: 'Python', level: 90, xp: '2400 XP' },
                  { name: 'Java', level: 70, xp: '1800 XP' },
                  { name: 'Go', level: 40, xp: '800 XP' }
                ].map(skill => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-1.5 md:mb-2 text-xs md:text-sm">
                      <span className="text-stone-300 font-mono truncate">{skill.name}</span>
                      <span className="text-stone-500 font-mono text-xs ml-2">{skill.xp}</span>
                    </div>
                    <div className="h-1.5 md:h-2 bg-stone-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                    <div className="text-right text-xs text-stone-600 mt-1 font-mono">
                      Level {Math.floor(skill.level / 10)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-stone-900/50 backdrop-blur-sm border border-stone-800 rounded-lg p-4 md:p-6">
              <h3 className="text-base md:text-lg font-bold mb-3 md:mb-4 text-emerald-400 font-mono flex items-center gap-2">
                <Server size={18} className="md:w-5 md:h-5" />
                BACKEND
              </h3>
              <ul className="space-y-2 text-stone-400 text-xs md:text-sm font-mono">
                {['Node.js & Express', 'FastAPI & Django', 'PostgreSQL & MongoDB', 'Redis & ElasticSearch', 'GraphQL & REST APIs', 'Microservices'].map(skill => (
                  <li key={skill} className="hover:text-emerald-400 transition-colors flex items-center gap-2">
                    <Star size={10} className="text-stone-700 md:w-3 md:h-3" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-stone-900/50 backdrop-blur-sm border border-stone-800 rounded-lg p-4 md:p-6">
              <h3 className="text-base md:text-lg font-bold mb-3 md:mb-4 text-emerald-400 font-mono flex items-center gap-2">
                <Brain size={18} className="md:w-5 md:h-5" />
                AI & ML
              </h3>
              <ul className="space-y-2 text-stone-400 text-xs md:text-sm font-mono">
                {['TensorFlow & PyTorch', 'NLP & Computer Vision', 'OpenAI & Hugging Face', 'ML Model Deployment', 'Data Processing', 'Vector Databases'].map(skill => (
                  <li key={skill} className="hover:text-emerald-400 transition-colors flex items-center gap-2">
                    <Star size={10} className="text-stone-700 md:w-3 md:h-3" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-stone-900/50 backdrop-blur-sm border border-stone-800 rounded-lg p-4 md:p-6">
              <h3 className="text-base md:text-lg font-bold mb-3 md:mb-4 text-emerald-400 font-mono">
                FRONTEND
              </h3>
              <ul className="space-y-2 text-stone-400 text-xs md:text-sm font-mono">
                {['React & Next.js', 'Vue.js & Nuxt', 'Tailwind CSS', 'State Management', 'Responsive Design', 'Accessibility'].map(skill => (
                  <li key={skill} className="hover:text-emerald-400 transition-colors flex items-center gap-2">
                    <Star size={10} className="text-stone-700 md:w-3 md:h-3" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-stone-900/50 backdrop-blur-sm border border-stone-800 rounded-lg p-4 md:p-6">
              <h3 className="text-base md:text-lg font-bold mb-3 md:mb-4 text-emerald-400 font-mono">
                DEVOPS
              </h3>
              <ul className="space-y-2 text-stone-400 text-xs md:text-sm font-mono">
                {['Docker & Kubernetes', 'AWS & GCP', 'CI/CD Pipelines', 'Infrastructure as Code', 'Monitoring', 'Linux Admin'].map(skill => (
                  <li key={skill} className="hover:text-emerald-400 transition-colors flex items-center gap-2">
                    <Star size={10} className="text-stone-700 md:w-3 md:h-3" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-stone-900/50 backdrop-blur-sm border border-stone-800 rounded-lg p-4 md:p-6">
              <h3 className="text-base md:text-lg font-bold mb-3 md:mb-4 text-emerald-400 font-mono">
                PRACTICES
              </h3>
              <ul className="space-y-2 text-stone-400 text-xs md:text-sm font-mono">
                {['Git & GitHub', 'Agile/Scrum', 'TDD', 'Code Review', 'System Design', 'Performance Opt'].map(skill => (
                  <li key={skill} className="hover:text-emerald-400 transition-colors flex items-center gap-2">
                    <Star size={10} className="text-stone-700 md:w-3 md:h-3" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="min-h-screen px-6 py-20 relative">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-4 font-mono text-sm">
            <Unlock size={20} className="text-emerald-400" />
            <h2 className="text-3xl md:text-4xl font-bold text-stone-100">
              &gt; experience.log
            </h2>
          </div>
          <p className="text-stone-400 mb-12 font-mono text-sm">
            // Professional journey timeline
          </p>

          <div className="space-y-6">
            <div className="bg-stone-900/50 backdrop-blur-sm border-l-4 border-emerald-400 rounded-r-lg p-6 hover:bg-stone-900/70 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                <div>
                  <h3 className="text-xl font-bold text-stone-100 font-mono">
                    Senior Full-Stack Developer
                  </h3>
                  <p className="text-stone-400 text-sm font-mono">Tech Innovations Inc.</p>
                </div>
                <span className="text-stone-500 text-sm font-mono mt-2 md:mt-0">2022 - Present</span>
              </div>
              <ul className="space-y-2 text-stone-400 text-sm">
                <li className="flex items-start gap-2">
                  <Zap size={14} className="text-emerald-400 mt-1 flex-shrink-0" />
                  Led development of AI-powered analytics platform serving 100K+ users
                </li>
                <li className="flex items-start gap-2">
                  <Zap size={14} className="text-emerald-400 mt-1 flex-shrink-0" />
                  Architected microservices infrastructure reducing deployment time by 60%
                </li>
                <li className="flex items-start gap-2">
                  <Zap size={14} className="text-emerald-400 mt-1 flex-shrink-0" />
                  Mentored team of 5 junior developers in best practices
                </li>
              </ul>
            </div>

            <div className="bg-stone-900/50 backdrop-blur-sm border-l-4 border-stone-700 rounded-r-lg p-6 hover:bg-stone-900/70 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                <div>
                  <h3 className="text-xl font-bold text-stone-100 font-mono">
                    Full-Stack Developer
                  </h3>
                  <p className="text-stone-400 text-sm font-mono">Digital Solutions Co.</p>
                </div>
                <span className="text-stone-500 text-sm font-mono mt-2 md:mt-0">2020 - 2022</span>
              </div>
              <ul className="space-y-2 text-stone-400 text-sm">
                <li className="flex items-start gap-2">
                  <Zap size={14} className="text-stone-600 mt-1 flex-shrink-0" />
                  Built RESTful APIs handling 1M+ requests daily with 99.9% uptime
                </li>
                <li className="flex items-start gap-2">
                  <Zap size={14} className="text-stone-600 mt-1 flex-shrink-0" />
                  Optimized database queries reducing response time by 75%
                </li>
              </ul>
            </div>

            <div className="bg-stone-900/50 backdrop-blur-sm border-l-4 border-stone-700 rounded-r-lg p-6 hover:bg-stone-900/70 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                <div>
                  <h3 className="text-xl font-bold text-stone-100 font-mono">
                    Junior Developer
                  </h3>
                  <p className="text-stone-400 text-sm font-mono">StartUp Ventures</p>
                </div>
                <span className="text-stone-500 text-sm font-mono mt-2 md:mt-0">2019 - 2020</span>
              </div>
              <ul className="space-y-2 text-stone-400 text-sm">
                <li className="flex items-start gap-2">
                  <Zap size={14} className="text-stone-600 mt-1 flex-shrink-0" />
                  Contributed to full-stack development of e-commerce platform
                </li>
                <li className="flex items-start gap-2">
                  <Zap size={14} className="text-stone-600 mt-1 flex-shrink-0" />
                  Implemented automated testing increasing coverage to 85%
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 bg-stone-900/50 backdrop-blur-sm border border-stone-800 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-emerald-400 font-mono">
              &gt; continuous_learning
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div>
                <h4 className="font-mono text-stone-400 mb-3">CERTIFICATIONS:</h4>
                <ul className="space-y-2 text-stone-500 font-mono text-xs">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                    AWS Solutions Architect
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                    ML Specialization
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                    React & TypeScript
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-mono text-stone-400 mb-3">OPEN_SOURCE:</h4>
                <ul className="space-y-2 text-stone-500 font-mono text-xs">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                    React ecosystem contributor
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                    CLI tool maintainer (2K+ stars)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                    500+ GitHub contributions
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="hire" className="min-h-screen flex items-center justify-center px-6 py-20 relative">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center gap-2 md:gap-3 mb-6 md:mb-8 font-mono text-xs md:text-sm">
            <Unlock size={18} className="text-emerald-400 md:w-5 md:h-5" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-stone-100">
              &gt; hire_me.sh
            </h2>
          </div>

          <div className="bg-stone-900/50 backdrop-blur-sm border border-stone-800 rounded-lg p-6 md:p-8 lg:p-12 shadow-xl mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Briefcase size={32} className="text-emerald-400" />
              <h3 className="text-2xl md:text-3xl font-bold text-stone-100">
                Ready to Work Together?
              </h3>
            </div>

            <div className="space-y-4 md:space-y-6 text-stone-300 text-sm md:text-base leading-relaxed mb-8">
              <p>
                I'm currently <span className="text-emerald-400 font-semibold">available for hire</span> and open to exciting opportunities in full-stack development, AI/ML integration, and technical leadership roles.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-stone-800/30 border border-stone-700 rounded-lg p-4">
                  <h4 className="text-emerald-400 font-mono font-semibold mb-3 text-sm">WHAT I OFFER:</h4>
                  <ul className="space-y-2 text-stone-400 text-xs md:text-sm">
                    <li className="flex items-start gap-2">
                      <Star size={12} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                      Full-stack development expertise
                    </li>
                    <li className="flex items-start gap-2">
                      <Star size={12} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                      AI/ML integration & implementation
                    </li>
                    <li className="flex items-start gap-2">
                      <Star size={12} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                      System architecture & scalability
                    </li>
                    <li className="flex items-start gap-2">
                      <Star size={12} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                      Team leadership & mentorship
                    </li>
                  </ul>
                </div>

                <div className="bg-stone-800/30 border border-stone-700 rounded-lg p-4">
                  <h4 className="text-emerald-400 font-mono font-semibold mb-3 text-sm">WORK PREFERENCES:</h4>
                  <ul className="space-y-2 text-stone-400 text-xs md:text-sm">
                    <li className="flex items-start gap-2">
                      <Star size={12} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                      Remote or hybrid positions
                    </li>
                    <li className="flex items-start gap-2">
                      <Star size={12} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                      Full-time opportunities
                    </li>
                    <li className="flex items-start gap-2">
                      <Star size={12} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                      Contract/consulting projects
                    </li>
                    <li className="flex items-start gap-2">
                      <Star size={12} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                      Flexible start dates
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-t border-stone-800 pt-8">
              <h4 className="text-lg md:text-xl font-semibold mb-6 text-center text-stone-100 font-mono">
                &gt; download_resume
              </h4>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/resume.pdf"
                  download="Your_Name_Resume.pdf"
                  className="group flex items-center justify-center gap-3 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-400/50 hover:border-emerald-400 text-emerald-400 px-6 md:px-8 py-3 md:py-4 rounded font-mono text-sm md:text-base transition-all duration-300 hover:shadow-lg hover:shadow-emerald-400/20"
                >
                  <Download size={20} className="group-hover:animate-bounce" />
                  [DOWNLOAD_CV.pdf]
                </a>

                <a
                  href="mailto:your.email@example.com?subject=Job Opportunity"
                  className="flex items-center justify-center gap-3 bg-stone-800 hover:bg-stone-700 border border-stone-700 hover:border-stone-600 text-stone-300 hover:text-stone-100 px-6 md:px-8 py-3 md:py-4 rounded font-mono text-sm md:text-base transition-all duration-300"
                >
                  <Mail size={20} />
                  [DISCUSS_OPPORTUNITY]
                </a>
              </div>

              <p className="text-center text-stone-500 text-xs md:text-sm mt-6 font-mono">
                // Available for immediate start or flexible scheduling
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="min-h-screen flex items-center justify-center px-6 py-20 relative">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="flex items-center justify-center gap-3 mb-6 font-mono text-sm">
            <Unlock size={20} className="text-emerald-400" />
            <h2 className="text-3xl md:text-4xl font-bold text-stone-100">
              &gt; contact.init()
            </h2>
          </div>
          <p className="text-lg text-stone-400 mb-12 max-w-2xl mx-auto">
            I'm always interested in hearing about new projects, opportunities, and collaborations. Whether you have a question or just want to say hi, feel free to reach out.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <a href="mailto:your.email@example.com" className="bg-stone-900/50 backdrop-blur-sm border border-stone-800 hover:border-emerald-400/50 p-6 rounded-lg transition-all duration-300 group">
              <Mail size={28} className="mx-auto mb-3 text-stone-600 group-hover:text-emerald-400 transition-colors" />
              <h3 className="font-mono text-sm text-stone-400 mb-2">EMAIL</h3>
              <p className="text-stone-500 text-xs font-mono">your.email@example.com</p>
            </a>

            <a href="https://github.com/yourusername" className="bg-stone-900/50 backdrop-blur-sm border border-stone-800 hover:border-emerald-400/50 p-6 rounded-lg transition-all duration-300 group">
              <Github size={28} className="mx-auto mb-3 text-stone-600 group-hover:text-emerald-400 transition-colors" />
              <h3 className="font-mono text-sm text-stone-400 mb-2">GITHUB</h3>
              <p className="text-stone-500 text-xs font-mono">@yourusername</p>
            </a>

            <a href="https://linkedin.com/in/yourusername" className="bg-stone-900/50 backdrop-blur-sm border border-stone-800 hover:border-emerald-400/50 p-6 rounded-lg transition-all duration-300 group">
              <Linkedin size={28} className="mx-auto mb-3 text-stone-600 group-hover:text-emerald-400 transition-colors" />
              <h3 className="font-mono text-sm text-stone-400 mb-2">LINKEDIN</h3>
              <p className="text-stone-500 text-xs font-mono">/in/yourusername</p>
            </a>
          </div>

          <a
            href="mailto:your.email@example.com"
            className="inline-block bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-400/50 text-emerald-400 px-8 py-3 rounded font-mono text-sm transition-all duration-300 hover:shadow-lg hover:shadow-emerald-400/10"
          >
            [SEND_MESSAGE]
          </a>
        </div>
      </section>

      <footer className="border-t border-stone-800 py-8 px-6 relative">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-stone-500 text-sm font-mono mb-2">
            &gt; Designed & Built by Your Name
          </p>
          <p className="text-stone-600 text-xs font-mono">
            © 2025 All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
