import { useState, useEffect } from 'react';

export default function Navbar({ backendOnline, activeTab, setActiveTab }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      padding: '0 32px',
      height: '60px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: scrolled ? 'rgba(10,15,30,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(30,42,69,0.8)' : 'none',
      transition: 'all 0.3s ease',
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }} onClick={() => setActiveTab('home')}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: 'linear-gradient(135deg, #3B7BF8, #8B5CF6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, fontWeight: 800, color: '#fff',
        }}>V</div>
        <span style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 18, color: '#F1F5F9' }}>
          VANI <span style={{ color: '#3B7BF8', fontSize: 11, fontWeight: 500 }}>by Aavas</span>
        </span>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, background: 'rgba(20,27,45,0.8)', padding: '4px', borderRadius: 10, border: '1px solid #1E2A45' }}>
        {['home', 'transcribe','live', 'history'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            padding: '6px 16px', borderRadius: 7, border: 'none', cursor: 'pointer',
            fontFamily: 'Inter', fontSize: 13, fontWeight: 500,
            background: activeTab === tab ? '#3B7BF8' : 'transparent',
            color: activeTab === tab ? '#fff' : '#94A3B8',
            textTransform: 'capitalize', transition: 'all 0.2s',
          }}>{tab}</button>
        ))}
      </div>

      {/* Status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: backendOnline ? '#10B981' : '#EF4444' }}>
        <div style={{
          width: 7, height: 7, borderRadius: '50%',
          background: backendOnline === null ? '#F59E0B' : backendOnline ? '#10B981' : '#EF4444',
          boxShadow: backendOnline ? '0 0 6px #10B981' : 'none',
        }} />
        {backendOnline === null ? 'Checking...' : backendOnline ? 'Backend Online' : 'Backend Offline'}
      </div>
    </nav>
  );
}
