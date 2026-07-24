import { useState, useEffect } from 'react';
import { exportTranscript } from '../services/api';

export default function History() {
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const h = JSON.parse(localStorage.getItem('vani_history') || '[]');
    setHistory(h);
  }, []);

  const filtered = history.filter(h =>
    h.text?.toLowerCase().includes(search.toLowerCase()) ||
    h.filename?.toLowerCase().includes(search.toLowerCase())
  );

  const clearHistory = () => {
    localStorage.removeItem('vani_history');
    setHistory([]);
    setSelected(null);
  };

  const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div style={{ minHeight: '100vh', padding: '100px 24px 60px', maxWidth: 1100, margin: '0 auto' }}>

      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', color: '#3B7BF8', marginBottom: 10 }}>HISTORY</div>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 32, fontWeight: 700, marginBottom: 4 }}>Past Transcripts</h2>
          <p style={{ color: '#64748B', fontSize: 15 }}>{history.length} transcripts saved locally</p>
        </div>
        {history.length > 0 && (
          <button onClick={clearHistory} style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid rgba(239,68,68,0.3)', background: 'transparent', color: '#EF4444', fontSize: 13, cursor: 'pointer' }}>
            Clear All
          </button>
        )}
      </div>

      {history.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search transcripts..."
            style={{
              width: '100%', maxWidth: 400, padding: '10px 16px', borderRadius: 10,
              border: '1px solid #1E2A45', background: 'rgba(20,27,45,0.6)',
              color: '#F1F5F9', fontSize: 14, outline: 'none',
            }}
          />
        </div>
      )}

      {history.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 24px', color: '#475569' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📭</div>
          <div style={{ fontWeight: 600, marginBottom: 8, color: '#64748B', fontSize: 18 }}>No transcripts yet</div>
          <div style={{ fontSize: 14 }}>Upload an audio file to get started</div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 1.2fr' : '1fr', gap: 16 }}>

          {/* List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filtered.map((h, i) => (
              <div key={i} onClick={() => setSelected(selected?.id === h.id ? null : h)} style={{
                background: selected?.id === h.id ? 'rgba(59,123,248,0.08)' : 'rgba(20,27,45,0.6)',
                border: `1px solid ${selected?.id === h.id ? '#3B7BF8' : '#1E2A45'}`,
                borderRadius: 12, padding: '16px 20px', cursor: 'pointer', transition: 'all 0.15s',
              }}
                onMouseEnter={e => { if (selected?.id !== h.id) e.currentTarget.style.borderColor = '#334155'; }}
                onMouseLeave={e => { if (selected?.id !== h.id) e.currentTarget.style.borderColor = '#1E2A45'; }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, background: 'rgba(59,123,248,0.15)', color: '#3B7BF8', padding: '2px 8px', borderRadius: 4 }}>
                      {h.language?.toUpperCase() || 'AUTO'}
                    </span>
                    <span style={{ fontSize: 12, color: '#475569' }}>{h.filename}</span>
                  </div>
                  <span style={{ fontSize: 11, color: '#475569' }}>{h.timestamp ? formatDate(h.timestamp) : ''}</span>
                </div>
                <p style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.6, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                  {h.text}
                </p>
              </div>
            ))}
          </div>

          {/* Detail panel */}
          {selected && (
            <div style={{ background: 'rgba(20,27,45,0.6)', border: '1px solid #1E2A45', borderRadius: 14, padding: 24, position: 'sticky', top: 80, alignSelf: 'flex-start' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                <div>
                  <div style={{ fontSize: 12, color: '#64748B', marginBottom: 4 }}>{selected.filename}</div>
                  <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700 }}>Transcript</div>
                </div>
                <button onClick={() => setSelected(null)} style={{ background: 'transparent', border: 'none', color: '#475569', fontSize: 20, cursor: 'pointer' }}>×</button>
              </div>

              <p style={{ fontSize: 14, lineHeight: 1.8, color: '#E2E8F0', marginBottom: 20 }}>{selected.text}</p>

              {selected.translated_text && (
                <div style={{ background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: 10, padding: 16, marginBottom: 20 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: '#8B5CF6', marginBottom: 8 }}>🔄 TRANSLATION</div>
                  <p style={{ fontSize: 14, lineHeight: 1.8, color: '#E2E8F0' }}>{selected.translated_text}</p>
                </div>
              )}

              <div style={{ display: 'flex', gap: 8 }}>
                {['pdf', 'srt', 'json'].map(fmt => (
                  <button key={fmt} onClick={() => exportTranscript(selected.id, fmt)} style={{
                    flex: 1, padding: '9px', borderRadius: 8, border: '1px solid #1E2A45',
                    background: 'transparent', color: '#94A3B8', fontSize: 12, fontWeight: 600,
                    cursor: 'pointer', textTransform: 'uppercase', transition: 'all 0.15s',
                  }}
                    onMouseEnter={e => { e.target.style.borderColor = '#3B7BF8'; e.target.style.color = '#3B7BF8'; }}
                    onMouseLeave={e => { e.target.style.borderColor = '#1E2A45'; e.target.style.color = '#94A3B8'; }}
                  >{fmt}</button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
