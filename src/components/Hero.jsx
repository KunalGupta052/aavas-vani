export default function Hero({ setActiveTab }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 24px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>

      {/* Background glow */}
      <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,123,248,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '30%', left: '25%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Badge */}
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(59,123,248,0.1)', border: '1px solid rgba(59,123,248,0.3)', borderRadius: 100, padding: '6px 16px', marginBottom: 32, fontSize: 12, color: '#3B7BF8', fontWeight: 600, letterSpacing: '0.05em' }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#3B7BF8', display: 'inline-block', animation: 'pulse 2s infinite' }} />
        AAVAS FINANCIERS · VOICE AI PLATFORM
      </div>

      {/* Headline */}
      <h1 style={{ fontFamily: 'Space Grotesk', fontSize: 'clamp(40px, 7vw, 80px)', fontWeight: 800, lineHeight: 1.1, marginBottom: 24, maxWidth: 800 }}>
        Voice to Text,{' '}
        <span style={{ background: 'linear-gradient(135deg, #3B7BF8, #8B5CF6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Instantly.
        </span>
        <br />In Any Language.
      </h1>

      {/* Subtitle */}
      <p style={{ fontSize: 18, color: '#94A3B8', maxWidth: 560, lineHeight: 1.7, marginBottom: 48 }}>
        Upload any audio file and get an accurate transcript in seconds. Supports Hindi, English, Hinglish, Tamil, Marathi — with automatic translation.
      </p>

      {/* CTA Buttons */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 80 }}>
        <button onClick={() => setActiveTab('transcribe')} style={{
          padding: '14px 32px', borderRadius: 10, border: 'none', cursor: 'pointer',
          background: 'linear-gradient(135deg, #3B7BF8, #8B5CF6)',
          color: '#fff', fontSize: 15, fontWeight: 700, fontFamily: 'Space Grotesk',
          boxShadow: '0 8px 32px rgba(59,123,248,0.3)',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
          onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 12px 40px rgba(59,123,248,0.4)'; }}
          onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 8px 32px rgba(59,123,248,0.3)'; }}
        >
          Start Transcribing →
        </button>
        <button onClick={() => setActiveTab('history')} style={{
          padding: '14px 32px', borderRadius: 10,
          border: '1px solid #1E2A45', cursor: 'pointer',
          background: 'rgba(20,27,45,0.8)',
          color: '#94A3B8', fontSize: 15, fontWeight: 600, fontFamily: 'Space Grotesk',
          transition: 'all 0.2s',
        }}
          onMouseEnter={e => { e.target.style.borderColor = '#3B7BF8'; e.target.style.color = '#F1F5F9'; }}
          onMouseLeave={e => { e.target.style.borderColor = '#1E2A45'; e.target.style.color = '#94A3B8'; }}
        >
          View History
        </button>
      </div>

      {/* Feature cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, maxWidth: 900, width: '100%' }}>
        {[
          { icon: '🎙️', title: 'Speech to Text', desc: 'Accurate transcription powered by Meta MMS' },
          { icon: '🌐', title: 'Multi-Language', desc: 'Hindi, English, Hinglish, Tamil, Marathi' },
          { icon: '🔄', title: 'Auto Translation', desc: 'Hindi ↔ English with finance-tuned model' },
          { icon: '📄', title: 'Export Anywhere', desc: 'Download as PDF, SRT, or JSON' },
        ].map((f, i) => (
          <div key={i} style={{
            background: 'rgba(20,27,45,0.6)', border: '1px solid #1E2A45',
            borderRadius: 12, padding: '20px 16px', textAlign: 'left',
            backdropFilter: 'blur(10px)', transition: 'border-color 0.2s, transform 0.2s',
            cursor: 'default',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#3B7BF8'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#1E2A45'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <div style={{ fontSize: 28, marginBottom: 12 }}>{f.icon}</div>
            <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700, marginBottom: 6, fontSize: 15 }}>{f.title}</div>
            <div style={{ fontSize: 13, color: '#64748B', lineHeight: 1.5 }}>{f.desc}</div>
          </div>
        ))}
      </div>

      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </div>
  );
}
