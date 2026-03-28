import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = '100% Free Portfolio Maker | boundforthe.top';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#060910',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'monospace',
          position: 'relative',
        }}
      >
        {/* Grid background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(rgba(14,165,233,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.06) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }} />

        {/* Glow */}
        <div style={{
          position: 'absolute',
          top: -100,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 800,
          height: 500,
          background: 'radial-gradient(ellipse at center, rgba(14,165,233,0.15) 0%, transparent 70%)',
        }} />

        {/* Logo badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 72,
          height: 72,
          borderRadius: 16,
          background: '#0ea5e9',
          marginBottom: 32,
          fontSize: 32,
          fontWeight: 700,
          color: '#000',
        }}>
          {'</>'}
        </div>

        {/* Tag line */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          background: 'rgba(14,165,233,0.1)',
          border: '1px solid rgba(14,165,233,0.3)',
          borderRadius: 100,
          padding: '6px 20px',
          fontSize: 18,
          color: '#0ea5e9',
          marginBottom: 24,
          letterSpacing: '0.06em',
        }}>
          {'● FREE · NO CODE · LIVE IN MINUTES'}
        </div>

        {/* Main heading */}
        <div style={{
          fontSize: 72,
          fontWeight: 800,
          color: '#e6edf3',
          textAlign: 'center',
          lineHeight: 1.05,
          marginBottom: 20,
          letterSpacing: '-0.03em',
        }}>
          Build Your{' '}
          <span style={{ color: '#0ea5e9' }}>Portfolio</span>
        </div>

        {/* Sub */}
        <div style={{
          fontSize: 28,
          color: '#7d8590',
          textAlign: 'center',
          marginBottom: 48,
        }}>
          Fill in details · Pick a theme · Hit publish
        </div>

        {/* URL bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          background: '#161b22',
          border: '1px solid #30363d',
          borderRadius: 12,
          padding: '14px 28px',
          fontSize: 22,
          color: '#0ea5e9',
        }}>
          {'webbuildershrabon.xyz/your-name'}
        </div>

        {/* Footer brand */}
        <div style={{
          position: 'absolute',
          bottom: 32,
          fontSize: 16,
          color: '#30363d',
          letterSpacing: '0.04em',
        }}>
          boundforthe.top
        </div>
      </div>
    ),
    { ...size }
  );
}
