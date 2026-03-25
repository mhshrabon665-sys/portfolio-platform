'use client';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const phrases = [
      'no code needed',
      'free forever',
      'live in minutes',
      'your own url',
      '8 themes',
      'pdf export',
    ];
    const el = document.getElementById('hero-typewriter');
    if (!el) return;
    let idx = 0, n = 0, deleting = false;
    let timer;
    function tick() {
      const cur = phrases[idx];
      if (!deleting) {
        n++;
        el.textContent = cur.substring(0, n);
        if (n >= cur.length) { deleting = true; timer = setTimeout(tick, 2200); return; }
      } else {
        n--;
        el.textContent = cur.substring(0, n);
        if (n <= 0) { deleting = false; idx = (idx + 1) % phrases.length; }
      }
      timer = setTimeout(tick, deleting ? 36 : 72);
    }
    timer = setTimeout(tick, 1200);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800&family=IBM+Plex+Mono:wght@300;400;500&display=swap');

        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

        :root {
          --bg: #060910;
          --surf: #0d1117;
          --surf2: #161b22;
          --border: #21262d;
          --text: #e6edf3;
          --muted: #7d8590;
          --accent: #0ea5e9;
          --accent2: #38bdf8;
          --glow: rgba(14,165,233,0.18);
        }

        html { scroll-behavior: smooth; }

        body {
          background: var(--bg);
          color: var(--text);
          font-family: 'Nunito', sans-serif;
          min-height: 100vh;
          overflow-x: hidden;
        }

        /* grid bg */
        body::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(14,165,233,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(14,165,233,0.04) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
          z-index: 0;
        }

        /* radial glow top */
        body::after {
          content: '';
          position: fixed;
          top: -200px;
          left: 50%;
          transform: translateX(-50%);
          width: 900px;
          height: 600px;
          background: radial-gradient(ellipse at center, rgba(14,165,233,0.12) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        /* ── NAV ── */
        nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 40px;
          height: 62px;
          background: rgba(6,9,16,0.72);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border);
        }

        .nav-brand {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--accent);
          text-decoration: none;
          letter-spacing: -0.01em;
        }

        .nav-cta {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 18px;
          border-radius: 8px;
          background: var(--accent);
          color: #000;
          font-size: 0.78rem;
          font-weight: 700;
          text-decoration: none;
          letter-spacing: 0.01em;
          transition: opacity 0.2s;
        }
        .nav-cta:hover { opacity: 0.88; }

        /* ── HERO ── */
        .hero {
          position: relative;
          z-index: 1;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 120px 24px 80px;
        }

        .hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 5px 14px;
          border-radius: 100px;
          border: 1px solid rgba(14,165,233,0.3);
          background: rgba(14,165,233,0.06);
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.72rem;
          color: var(--accent);
          letter-spacing: 0.04em;
          margin-bottom: 32px;
          animation: fadeUp 0.6s ease both;
        }

        .hero-tag::before {
          content: '';
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 6px var(--accent);
        }

        h1 {
          font-size: clamp(2.8rem, 7vw, 5.5rem);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.03em;
          max-width: 820px;
          animation: fadeUp 0.6s 0.1s ease both;
        }

        h1 .accent { color: var(--accent); }

        h1 .mono {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.85em;
          font-weight: 400;
          color: var(--muted);
        }

        .hero-sub {
          margin-top: 24px;
          font-size: 1.05rem;
          color: var(--muted);
          max-width: 520px;
          line-height: 1.7;
          font-weight: 400;
          animation: fadeUp 0.6s 0.2s ease both;
        }

        .hero-actions {
          margin-top: 44px;
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
          justify-content: center;
          animation: fadeUp 0.6s 0.3s ease both;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 32px;
          border-radius: 10px;
          background: var(--accent);
          color: #000;
          font-family: 'Nunito', sans-serif;
          font-size: 0.92rem;
          font-weight: 700;
          text-decoration: none;
          letter-spacing: 0.01em;
          transition: all 0.2s;
          box-shadow: 0 0 32px rgba(14,165,233,0.25);
        }
        .btn-primary:hover {
          opacity: 0.9;
          box-shadow: 0 0 48px rgba(14,165,233,0.4);
          transform: translateY(-1px);
        }

        .btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          border-radius: 10px;
          background: transparent;
          border: 1px solid var(--border);
          color: var(--muted);
          font-family: 'Nunito', sans-serif;
          font-size: 0.92rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s;
        }
        .btn-ghost:hover { border-color: var(--accent); color: var(--accent); }

        /* ── STATS ROW ── */
        .stats {
          position: relative; z-index: 1;
          display: flex;
          justify-content: center;
          gap: 0;
          max-width: 700px;
          margin: 0 auto 80px;
          border: 1px solid var(--border);
          border-radius: 14px;
          background: var(--surf);
          overflow: hidden;
          animation: fadeUp 0.6s 0.4s ease both;
        }

        .stat {
          flex: 1;
          padding: 28px 24px;
          text-align: center;
          border-right: 1px solid var(--border);
        }
        .stat:last-child { border-right: none; }

        .stat-num {
          font-size: 2rem;
          font-weight: 800;
          color: var(--accent);
          letter-spacing: -0.04em;
          font-family: 'IBM Plex Mono', monospace;
        }

        .stat-label {
          font-size: 0.72rem;
          color: var(--muted);
          margin-top: 4px;
          font-weight: 400;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        /* ── FEATURES ── */
        .section {
          position: relative; z-index: 1;
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 24px 100px;
        }

        .section-label {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.72rem;
          color: var(--accent);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-align: center;
          margin-bottom: 16px;
        }

        .section-title {
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          text-align: center;
          margin-bottom: 56px;
          line-height: 1.1;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .feat-card {
          background: var(--surf);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 28px 24px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .feat-card:hover {
          border-color: rgba(14,165,233,0.4);
          box-shadow: 0 0 24px rgba(14,165,233,0.07);
        }

        .feat-icon {
          font-size: 1.6rem;
          margin-bottom: 16px;
          display: block;
        }

        .feat-title {
          font-size: 0.98rem;
          font-weight: 700;
          margin-bottom: 8px;
          letter-spacing: -0.01em;
        }

        .feat-desc {
          font-size: 0.8rem;
          color: var(--muted);
          line-height: 1.65;
          font-weight: 400;
        }

        /* ── HOW IT WORKS ── */
        .steps {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          border: 1px solid var(--border);
          border-radius: 14px;
          overflow: hidden;
          background: var(--surf);
        }

        .step {
          padding: 36px 28px;
          border-right: 1px solid var(--border);
          position: relative;
        }
        .step:last-child { border-right: none; }

        .step-num {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 2.4rem;
          font-weight: 300;
          color: var(--border);
          margin-bottom: 16px;
          display: block;
          line-height: 1;
        }

        .step-title {
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 8px;
          letter-spacing: -0.01em;
        }

        .step-desc {
          font-size: 0.78rem;
          color: var(--muted);
          line-height: 1.65;
          font-weight: 400;
        }

        /* ── THEMES STRIP ── */
        .themes-strip {
          display: flex;
          gap: 10px;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 0;
        }

        .theme-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 100px;
          border: 1px solid var(--border);
          background: var(--surf);
          font-size: 0.76rem;
          color: var(--muted);
          font-family: 'IBM Plex Mono', monospace;
        }

        .theme-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        /* ── CTA BANNER ── */
        .cta-banner {
          position: relative; z-index: 1;
          max-width: 860px;
          margin: 0 auto 100px;
          padding: 0 24px;
        }

        .cta-inner {
          background: var(--surf);
          border: 1px solid rgba(14,165,233,0.25);
          border-radius: 20px;
          padding: 64px 40px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .cta-inner::before {
          content: '';
          position: absolute;
          top: -60px; left: 50%;
          transform: translateX(-50%);
          width: 400px; height: 200px;
          background: radial-gradient(ellipse, rgba(14,165,233,0.12), transparent 70%);
          pointer-events: none;
        }

        .cta-title {
          font-size: clamp(1.6rem, 4vw, 2.4rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          margin-bottom: 12px;
        }

        .cta-sub {
          font-size: 0.9rem;
          color: var(--muted);
          margin-bottom: 32px;
          font-weight: 400;
        }

        /* ── FOOTER ── */
        footer {
          position: relative; z-index: 1;
          border-top: 1px solid var(--border);
          padding: 28px 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
        }

        .footer-copy {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.72rem;
          color: var(--muted);
        }

        .footer-link {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.72rem;
          color: var(--muted);
          text-decoration: none;
          transition: color 0.15s;
        }
        .footer-link:hover { color: var(--accent); }

        /* ── ANIMATIONS ── */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 700px) {
          nav { padding: 0 20px; }
          .features-grid, .steps { grid-template-columns: 1fr; }
          .step { border-right: none; border-bottom: 1px solid var(--border); }
          .step:last-child { border-bottom: none; }
          .stats { flex-direction: column; }
          .stat { border-right: none; border-bottom: 1px solid var(--border); }
          .stat:last-child { border-bottom: none; }
          .cta-inner { padding: 40px 24px; }
          footer { flex-direction: column; text-align: center; }
        }
      `}</style>

      {/* NAV */}
      <nav>
        <span className="nav-brand">&lt;boundforthetop /&gt;</span>
        <Link href="/portfolio" className="nav-cta">Build Your Portfolio →</Link>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-tag">Free · No code · Live in minutes</div>
        <h1>
          Your portfolio,<br />
          <span className="accent">live</span> in minutes<br />
          <span className="mono">// <span id="hero-typewriter">no code needed</span></span>
        </h1>
        <p className="hero-sub">
          Fill in your details, pick a theme, hit publish. Get a real URL you can share with anyone — instantly.
        </p>
        <div className="hero-actions">
          <Link href="/portfolio" className="btn-primary">Build Your Portfolio →</Link>
          <a href="#how" className="btn-ghost">See how it works</a>
        </div>
        <p style={{marginTop:20,fontSize:'0.72rem',color:'var(--muted)',fontFamily:"'IBM Plex Mono',monospace",display:'flex',alignItems:'center',gap:6}}>
          <span>🖥️</span> Best experienced on a desktop or laptop
        </p>
      </section>

      {/* STATS */}
      <div className="stats" style={{position:'relative',zIndex:1,maxWidth:660,margin:'0 auto 80px',animation:'fadeUp 0.6s 0.4s ease both'}}>
        <div className="stat">
          <div className="stat-num">8</div>
          <div className="stat-label">Themes</div>
        </div>
        <div className="stat">
          <div className="stat-num">∞</div>
          <div className="stat-label">Free Forever</div>
        </div>
        <div className="stat">
          <div className="stat-num">&lt;2m</div>
          <div className="stat-label">To Publish</div>
        </div>
        <div className="stat">
          <div className="stat-num">PDF</div>
          <div className="stat-label">CV Export</div>
        </div>
      </div>

      {/* FEATURES */}
      <section className="section">
        <div className="section-label">Features</div>
        <h2 className="section-title">Everything you need,<br />nothing you don't</h2>
        <div className="features-grid">
          {[
            { icon: '⚡', title: 'Instant Live Preview', desc: 'See your portfolio update in real time as you type. No refresh needed.' },
            { icon: '🎨', title: '8 Beautiful Themes', desc: 'Dark, light, and mixed themes. Ocean, Violet, Matrix, Twilight and more.' },
            { icon: '📄', title: 'PDF CV Export', desc: 'Download a print-ready CV directly from the builder with one click.' },
            { icon: '🔒', title: 'Password Protected', desc: 'Your portfolio is yours. Password-protected editing, no account required.' },
            { icon: '📱', title: 'Fully Responsive', desc: 'Looks great on every device — mobile, tablet, and desktop.' },
            { icon: '🔗', title: 'Your Own URL', desc: 'Get a permanent link at yourdomain.com/username to share anywhere.' },
          ].map((f, i) => (
            <div className="feat-card" key={i}>
              <span className="feat-icon">{f.icon}</span>
              <div className="feat-title">{f.title}</div>
              <div className="feat-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section" id="how">
        <div className="section-label">How it works</div>
        <h2 className="section-title">Three steps to live</h2>
        <div className="steps">
          {[
            { n: '01', title: 'Fill in your details', desc: 'Add your name, bio, experience, projects, skills and social links using the simple editor.' },
            { n: '02', title: 'Pick your theme', desc: 'Choose from 8 handcrafted themes. Preview updates live so you see exactly what visitors will see.' },
            { n: '03', title: 'Hit publish', desc: 'Choose a username, set a password, and your portfolio is live at your own URL instantly.' },
          ].map((s, i) => (
            <div className="step" key={i}>
              <span className="step-num">{s.n}</span>
              <div className="step-title">{s.title}</div>
              <div className="step-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* THEMES */}
      <section className="section">
        <div className="section-label">Themes</div>
        <h2 className="section-title">Pick your aesthetic</h2>
        <div className="themes-strip">
          {[
            { name: 'Ocean Dark',   color: '#0ea5e9' },
            { name: 'Violet Night', color: '#a855f7' },
            { name: 'Matrix Green', color: '#22c55e' },
            { name: 'Twilight',     color: '#e879f9' },
            { name: 'Dusk Amber',   color: '#fbbf24' },
            { name: 'Clean Light',  color: '#0ea5e9' },
            { name: 'Warm Paper',   color: '#b45309' },
            { name: 'Mint Fresh',   color: '#16a34a' },
          ].map((t, i) => (
            <div className="theme-pill" key={i}>
              <span className="theme-dot" style={{background: t.color}} />
              {t.name}
            </div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <div className="cta-banner">
        <div className="cta-inner">
          <div className="cta-title">Ready to go live?</div>
          <p className="cta-sub">Free forever. No account needed. Just fill in and publish.</p>
          <Link href="/portfolio" className="btn-primary" style={{display:'inline-flex'}}>
            Build Your Portfolio →
          </Link>
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <span className="footer-copy">© {new Date().getFullYear()} boundforthe.top</span>
        <div style={{display:'flex', gap:24}}>
          <Link href="/portfolio" className="footer-link">Builder</Link>
        </div>
      </footer>


    </>
  );
}
