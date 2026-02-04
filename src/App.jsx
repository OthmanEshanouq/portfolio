import { useState, useEffect } from 'react';
import Balatro from './components/Balatro';

const GITHUB_USER = 'OthmanEshanouq';
  const PROJECT_ORDER = ['restaurant-system', 'halawah_restaurant', 'Premium_N-Tech_Fabric', 'Event_Funnel'];
  const REPOS_TO_HIDE = ['portfolio', 'JavaScript-Lecture', 'challenge', 'CSS-Tricks', '-HTML-CSS-Part-1', 'HTML-CSS-Part-1', 'Web-Page-Structure-Layout', 'valleys_adventure_event_funnel', 'debugging-and-customization', 'debugging_and_customization', 'magic-toggle', 'magic_toggle'];
  const DISPLAY_NAME_MAP = { Event_Funnel: 'cycling everywhere' };
const LIVE_URL_MAP = {
  'restaurant-system': 'https://othmaneshanouq.github.io/restaurant-system/',
  'halawah_restaurant': 'https://othmaneshanouq.github.io/halawah_restaurant/',
  'Premium_N-Tech_Fabric': 'https://othmaneshanouq.github.io/Premium_N-Tech_Fabric/#top',
  'Event_Funnel': 'https://othmaneshanouq.github.io/Event_Funnel/index.html',
};
const THUMBNAIL_OVERRIDE = {
  'restaurant-system': '/assets/logo%20burger%20station.png',
  'halawah_restaurant': "/assets/halawah's%20logo.png",
  'Event_Funnel': '/assets/logo(cycling%20everywhere).png',
  'Premium_N-Tech_Fabric': '/assets/logo%20N-Tech.png',
};

function getDisplayName(name) {
  return DISPLAY_NAME_MAP[name] || name.replace(/-/g, ' ').replace(/_/g, ' ');
}

function ProjectsSection() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=30&sort=updated`)
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) {
          setError(true);
          return;
        }
        const filtered = data.filter((r) => !REPOS_TO_HIDE.includes(r.name));
        const byName = {};
        filtered.forEach((r) => { byName[r.name] = r; });
        const ordered = [];
        PROJECT_ORDER.forEach((name) => { if (byName[name]) ordered.push(byName[name]); });
        filtered.forEach((r) => { if (!PROJECT_ORDER.includes(r.name)) ordered.push(r); });
        setRepos(ordered);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="col-span-full text-center py-12 text-gray-400">
        Loading projects from GitHub...
      </div>
    );
  }
  if (error || repos.length === 0) {
    return (
      <p className="col-span-full text-center text-gray-400">
        No public repositories found. Add repos at github.com/{GITHUB_USER}
      </p>
    );
  }

  return repos.map((repo) => {
    const name = repo.name || 'Project';
    const displayName = getDisplayName(name);
    const desc = repo.description || 'No description.';
    const repoUrl = repo.html_url || '#';
    const homeUrl = LIVE_URL_MAP[name] || repo.homepage || null;
    const linkUrl = homeUrl || repoUrl;
    const thumbSrc = THUMBNAIL_OVERRIDE[name] || `/assets/projects/${name}.png`;
    const lang = repo.language;
    const topics = (repo.topics || []).slice(0, 3);
    const badges = [lang, ...topics].filter(Boolean).map((t) => (
      <span key={t} className="px-2 py-1 text-xs font-medium rounded bg-gray-600 text-gray-300">
        {t === 'JavaScript' ? 'JS' : t === 'TypeScript' ? 'TS' : t}
      </span>
    ));
    if (badges.length === 0) badges.push(<span key="code" className="px-2 py-1 text-xs font-medium rounded bg-gray-600 text-gray-300">Code</span>);

    const cardClass = name === 'halawah_restaurant' ? 'project-card project-card-motion project-card--halawah bg-gray-800 rounded-xl overflow-hidden border border-gray-600' : 'project-card project-card-motion bg-gray-800 rounded-xl overflow-hidden border border-gray-600';

    return (
      <div key={repo.id} className={cardClass}>
        <div className="project-thumb-wrap">
          <a href={linkUrl} target="_blank" rel="noopener noreferrer" className="block h-full flex items-center justify-center p-4 bg-gray-700">
            <img src={thumbSrc} alt={displayName} className="project-thumb-img max-h-full max-w-full w-auto h-auto object-contain" onError={(e) => { e.target.style.display = 'none'; e.target.nextElementSibling?.classList.remove('hidden'); }} />
            <div className="project-thumb-fallback hidden flex items-center justify-center text-gray-400 font-medium text-sm text-center p-4 rounded-full">{displayName}</div>
          </a>
        </div>
        <div className="p-5">
          <h3 className="text-lg font-semibold text-white mb-2">{displayName}</h3>
          <p className="text-gray-300 text-sm mb-4 line-clamp-3">{desc}</p>
          <div className="flex flex-wrap gap-2 mb-4">{badges}</div>
          <div className="flex gap-3">
            {homeUrl && (
              <a href={homeUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-indigo-400 hover:text-indigo-300 hover:underline">Live</a>
            )}
          </div>
        </div>
      </div>
    );
  });
}

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="font-sans antialiased text-gray-100 bg-gray-900 min-h-screen">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur border-b border-gray-800 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <a href="#hero" className="flex items-center gap-2">
            <img src="/assets/profile%20photo.png" alt="Othman Eshanouq" className="h-10 w-10 rounded-full object-cover border-2 border-gray-600" />
          </a>
          <button type="button" className="md:hidden p-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white" aria-label="Toggle menu" onClick={() => setMobileMenuOpen((o) => !o)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <div className="hidden md:flex items-center gap-8">
            <a href="#hero" className="text-gray-300 hover:text-indigo-400 font-medium transition">Home</a>
            <a href="#about" className="text-gray-300 hover:text-indigo-400 font-medium transition">About</a>
            <a href="#skills" className="text-gray-300 hover:text-indigo-400 font-medium transition">Skills</a>
            <a href="#projects" className="text-gray-300 hover:text-indigo-400 font-medium transition">Projects</a>
            <a href="#contact" className="text-gray-300 hover:text-indigo-400 font-medium transition">Contact</a>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-800 bg-gray-800 px-4 py-3 space-y-1">
            <a href="#hero" className="block py-3 px-2 text-gray-300 hover:text-indigo-400 hover:bg-gray-700 rounded-lg" onClick={() => setMobileMenuOpen(false)}>Home</a>
            <a href="#about" className="block py-3 px-2 text-gray-300 hover:text-indigo-400 hover:bg-gray-700 rounded-lg" onClick={() => setMobileMenuOpen(false)}>About</a>
            <a href="#skills" className="block py-3 px-2 text-gray-300 hover:text-indigo-400 hover:bg-gray-700 rounded-lg" onClick={() => setMobileMenuOpen(false)}>Skills</a>
            <a href="#projects" className="block py-3 px-2 text-gray-300 hover:text-indigo-400 hover:bg-gray-700 rounded-lg" onClick={() => setMobileMenuOpen(false)}>Projects</a>
            <a href="#contact" className="block py-3 px-2 text-gray-300 hover:text-indigo-400 hover:bg-gray-700 rounded-lg" onClick={() => setMobileMenuOpen(false)}>Contact</a>
          </div>
        )}
      </nav>

      <main>
        <section id="hero" className="relative min-h-screen min-h-[100dvh] flex items-center justify-center text-white pt-16 pb-12 px-4 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Balatro
              isRotate={false}
              mouseInteraction
              pixelFilter={745}
              color1="#DE443B"
              color2="#006BB4"
              color3="#162325"
            />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto w-full text-center">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-3 sm:mb-4">Othman Eshanouq</h1>
            <p className="text-lg sm:text-2xl text-indigo-100 mb-4 sm:mb-6">vibe coder</p>
            <p className="text-base sm:text-lg text-indigo-200/90 max-w-2xl mx-auto mb-6 sm:mb-8 px-1">
              Building web applications and turning ideas into code.
            </p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              <a href="#projects" className="inline-block px-5 py-3 sm:px-6 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-400 transition shadow-lg min-h-[44px] flex items-center justify-center">View Projects</a>
              <a href="#contact" className="inline-block px-5 py-3 sm:px-6 border-2 border-white/80 text-white font-semibold rounded-lg hover:bg-white/10 transition min-h-[44px] flex items-center justify-center">Get in Touch</a>
            </div>
          </div>
        </section>

        <section id="about" className="py-12 sm:py-20 bg-gray-900 scroll-mt-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 text-center">About Me</h2>
            <div className="flex flex-col md:flex-row gap-8 sm:gap-12 items-center">
              <div className="md:w-1/3 flex justify-center flex-shrink-0">
                <img src="/assets/profile%20photo.png" alt="Othman Eshanouq" className="w-40 h-40 sm:w-48 sm:h-48 rounded-full object-cover object-center shadow-xl ring-2 ring-gray-700" />
              </div>
              <div className="md:w-2/3 space-y-4 text-gray-300 leading-relaxed text-sm sm:text-base min-w-0">
                <p>Hi, I'm Othman. I enjoy building things for the web and learning new technologies. This portfolio showcases my projects from GitHub and my experience.</p>
                <p>I focus on clean code, responsive design, and user-friendly applications.</p>
                <div className="pt-4">
                  <a href="https://github.com/OthmanEshanouq" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 font-medium">GitHub →</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="py-12 sm:py-20 bg-gray-800 scroll-mt-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 text-center">Skills</h2>
            <p className="text-center text-gray-400 mb-8 sm:mb-12 max-w-2xl mx-auto px-2 text-sm sm:text-base">Technologies and tools I work with.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6" role="list">
              {['HTML', 'CSS', 'JavaScript'].map((skill) => (
                <div key={skill} className="bg-gray-700/50 border border-gray-600 p-4 rounded-xl shadow-sm text-center min-w-0">
                  <span className="text-xl sm:text-2xl font-semibold text-indigo-400">{skill}</span>
                  <div className="mt-2 h-2 bg-gray-600 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: '80%' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="py-12 sm:py-20 bg-gray-900 scroll-mt-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 text-center">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <ProjectsSection />
            </div>
          </div>
        </section>

        <section id="contact" className="py-12 sm:py-20 bg-gray-800 scroll-mt-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">Contact</h2>
            <p className="text-gray-400 mb-8 sm:mb-12 max-w-2xl mx-auto text-sm sm:text-base px-2">Get in touch for opportunities or collaboration.</p>
            <div className="flex flex-wrap justify-center gap-5 sm:gap-8">
              <a href="https://wa.me/962787426310" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center p-3 rounded-full bg-gray-700 text-indigo-400 hover:bg-gray-600 hover:text-indigo-300 transition min-w-[44px] min-h-[44px]" title="WhatsApp" aria-label="WhatsApp">
                <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
              <a href="tel:+962787426310" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center p-3 rounded-full bg-gray-700 text-indigo-400 hover:bg-gray-600 hover:text-indigo-300 transition min-w-[44px] min-h-[44px]" title="Phone" aria-label="Phone">
                <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              </a>
              <a href="mailto:othmaneshanouq@gmail.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center p-3 rounded-full bg-gray-700 text-indigo-400 hover:bg-gray-600 hover:text-indigo-300 transition min-w-[44px] min-h-[44px]" title="Email" aria-label="Email">
                <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              </a>
              <a href="https://www.linkedin.com/in/othman-eshanouq-513674172/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center p-3 rounded-full bg-gray-700 text-indigo-400 hover:bg-gray-600 hover:text-indigo-300 transition min-w-[44px] min-h-[44px]" title="LinkedIn" aria-label="LinkedIn">
                <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://github.com/OthmanEshanouq" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center p-3 rounded-full bg-gray-700 text-indigo-400 hover:bg-gray-600 hover:text-indigo-300 transition min-w-[44px] min-h-[44px]" title="GitHub" aria-label="GitHub">
                <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-gray-400 py-6 sm:py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm sm:text-base break-words">© {new Date().getFullYear()} Othman Eshanouq. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
