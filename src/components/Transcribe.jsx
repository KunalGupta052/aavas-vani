// import { useState, useRef } from 'react';
// import { transcribeAudio, exportTranscript } from '../services/api';

// const LANGUAGES = [
//   { code: 'hi', label: 'Hindi', flag: '🇮🇳' },
//   { code: 'en', label: 'English', flag: '🇬🇧' },
//   { code: 'hinglish', label: 'Hinglish', flag: '🔀' },
//   { code: 'ta', label: 'Tamil', flag: '🇮🇳' },
//   { code: 'mr', label: 'Marathi', flag: '🇮🇳' },
//   { code: 'auto', label: 'Auto', flag: '🤖' },
// ];

// const TRANSLATE_OPTIONS = [
//   { code: 'en', label: 'English' },
//   { code: 'hi', label: 'Hindi' },
//   { code: 'none', label: 'No Translation' },
// ];

// export default function Transcribe() {
//   const [file, setFile] = useState(null);
//   const [lang, setLang] = useState('hi');
//   const [translateTo, setTranslateTo] = useState('en');
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState('');
//   const [drag, setDrag] = useState(false);
//   const [copied, setCopied] = useState(false);
//   const inputRef = useRef();

//   const handleFile = (f) => {
//     if (f) { setFile(f); setResult(null); setError(''); }
//   };

//   const handleDrop = (e) => {
//     e.preventDefault(); setDrag(false);
//     const f = e.dataTransfer.files[0];
//     if (f) handleFile(f);
//   };

//   const handleSubmit = async () => {
//     if (!file) return setError('Please select an audio file first.');
//     setLoading(true); setError(''); setResult(null);
//     try {
//       const tTo = translateTo === 'none' ? lang : translateTo;
//       const data = await transcribeAudio(file, lang, tTo);
//       setResult(data);
//       // Save to history
//       const history = JSON.parse(localStorage.getItem('vani_history') || '[]');
//       history.unshift({ ...data, timestamp: new Date().toISOString() });
//       localStorage.setItem('vani_history', JSON.stringify(history.slice(0, 50)));
//     } catch (e) {
//       setError('Transcription failed. Make sure the backend is running.');
//     }
//     setLoading(false);
//   };

//   const copyText = (text) => {
//     navigator.clipboard.writeText(text);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   const downloadTxt = (text, filename) => {
//     const blob = new Blob([text], { type: 'text/plain' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a'); a.href = url; a.download = filename; a.click();
//   };

//   return (
//     <div style={{ minHeight: '100vh', padding: '100px 24px 60px', maxWidth: 1100, margin: '0 auto' }}>

//       <div style={{ marginBottom: 40 }}>
//         <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', color: '#3B7BF8', marginBottom: 10 }}>TRANSCRIPTION</div>
//         <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 32, fontWeight: 700, marginBottom: 8 }}>Upload Audio</h2>
//         <p style={{ color: '#64748B', fontSize: 15 }}>Upload any audio or video file — we handle the conversion automatically.</p>
//       </div>

//       <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>

//         {/* Left Panel */}
//         <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

//           {/* Drop Zone */}
//           <div
//             onDragOver={e => { e.preventDefault(); setDrag(true); }}
//             onDragLeave={() => setDrag(false)}
//             onDrop={handleDrop}
//             onClick={() => inputRef.current.click()}
//             style={{
//               border: `2px dashed ${drag ? '#3B7BF8' : file ? '#10B981' : '#1E2A45'}`,
//               borderRadius: 14, padding: '48px 24px', textAlign: 'center', cursor: 'pointer',
//               background: drag ? 'rgba(59,123,248,0.05)' : file ? 'rgba(16,185,129,0.04)' : 'rgba(20,27,45,0.4)',
//               transition: 'all 0.2s',
//             }}
//           >
//             <input ref={inputRef} type="file" accept=".mp3,.wav,.m4a,.ogg,.mp4,.webm" style={{ display: 'none' }} onChange={e => handleFile(e.target.files[0])} />
//             <div style={{ fontSize: 40, marginBottom: 16 }}>{file ? '✅' : '🎵'}</div>
//             {file ? (
//               <>
//                 <div style={{ fontWeight: 700, color: '#10B981', marginBottom: 4 }}>{file.name}</div>
//                 <div style={{ fontSize: 13, color: '#64748B' }}>{(file.size / 1024 / 1024).toFixed(2)} MB · Click to change</div>
//               </>
//             ) : (
//               <>
//                 <div style={{ fontWeight: 600, marginBottom: 6 }}>Drag & drop your audio file</div>
//                 <div style={{ fontSize: 13, color: '#64748B' }}>MP3, WAV, M4A, OGG, MP4 supported</div>
//               </>
//             )}
//           </div>

//           {/* Language Selection */}
//           <div style={{ background: 'rgba(20,27,45,0.6)', border: '1px solid #1E2A45', borderRadius: 12, padding: 20 }}>
//             <div style={{ fontSize: 12, fontWeight: 600, color: '#64748B', marginBottom: 12, letterSpacing: '0.05em' }}>AUDIO LANGUAGE</div>
//             <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
//               {LANGUAGES.map(l => (
//                 <button key={l.code} onClick={() => setLang(l.code)} style={{
//                   padding: '7px 14px', borderRadius: 8, border: `1px solid ${lang === l.code ? '#3B7BF8' : '#1E2A45'}`,
//                   background: lang === l.code ? 'rgba(59,123,248,0.15)' : 'transparent',
//                   color: lang === l.code ? '#3B7BF8' : '#94A3B8',
//                   fontSize: 13, fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s',
//                 }}>{l.flag} {l.label}</button>
//               ))}
//             </div>
//           </div>

//           {/* Translation */}
//           <div style={{ background: 'rgba(20,27,45,0.6)', border: '1px solid #1E2A45', borderRadius: 12, padding: 20 }}>
//             <div style={{ fontSize: 12, fontWeight: 600, color: '#64748B', marginBottom: 12, letterSpacing: '0.05em' }}>TRANSLATE TO</div>
//             <div style={{ display: 'flex', gap: 8 }}>
//               {TRANSLATE_OPTIONS.map(t => (
//                 <button key={t.code} onClick={() => setTranslateTo(t.code)} style={{
//                   padding: '7px 16px', borderRadius: 8, border: `1px solid ${translateTo === t.code ? '#8B5CF6' : '#1E2A45'}`,
//                   background: translateTo === t.code ? 'rgba(139,92,246,0.15)' : 'transparent',
//                   color: translateTo === t.code ? '#8B5CF6' : '#94A3B8',
//                   fontSize: 13, fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s',
//                 }}>{t.label}</button>
//               ))}
//             </div>
//           </div>

//           {/* Submit Button */}
//           <button onClick={handleSubmit} disabled={loading || !file} style={{
//             padding: '16px', borderRadius: 12, border: 'none', cursor: loading || !file ? 'not-allowed' : 'pointer',
//             background: loading || !file ? '#1E2A45' : 'linear-gradient(135deg, #3B7BF8, #8B5CF6)',
//             color: loading || !file ? '#475569' : '#fff',
//             fontSize: 15, fontWeight: 700, fontFamily: 'Space Grotesk',
//             transition: 'all 0.2s',
//           }}>
//             {loading ? '⏳ Processing...' : '🎙️ Generate Transcript'}
//           </button>

//           {error && (
//             <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 10, padding: '12px 16px', fontSize: 13, color: '#EF4444' }}>
//               ⚠️ {error}
//             </div>
//           )}
//         </div>

//         {/* Right Panel — Results */}
//         <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

//           {loading && (
//             <div style={{ background: 'rgba(20,27,45,0.6)', border: '1px solid #1E2A45', borderRadius: 14, padding: 48, textAlign: 'center' }}>
//               <div style={{ fontSize: 40, marginBottom: 16, animation: 'spin 1s linear infinite', display: 'inline-block' }}>⚙️</div>
//               <div style={{ fontWeight: 600, marginBottom: 8 }}>Processing your audio...</div>
//               <div style={{ fontSize: 13, color: '#64748B' }}>This may take a few seconds</div>
//               <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
//             </div>
//           )}

//           {!loading && !result && (
//             <div style={{ background: 'rgba(20,27,45,0.4)', border: '1px dashed #1E2A45', borderRadius: 14, padding: 48, textAlign: 'center', color: '#475569' }}>
//               <div style={{ fontSize: 40, marginBottom: 16 }}>📝</div>
//               <div style={{ fontWeight: 600, marginBottom: 8, color: '#64748B' }}>Transcript will appear here</div>
//               <div style={{ fontSize: 13 }}>Upload a file and click Generate</div>
//             </div>
//           )}

//           {result && (
//             <>
//               {/* Original Transcript */}
//               <div style={{ background: 'rgba(20,27,45,0.6)', border: '1px solid #1E2A45', borderRadius: 14, padding: 20 }}>
//                 <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
//                   <div>
//                     <div style={{ fontSize: 12, fontWeight: 600, color: '#64748B', letterSpacing: '0.05em' }}>ORIGINAL · {result.language?.toUpperCase()}</div>
//                   </div>
//                   <div style={{ display: 'flex', gap: 8 }}>
//                     <button onClick={() => copyText(result.text)} style={{ padding: '5px 12px', borderRadius: 7, border: '1px solid #1E2A45', background: 'transparent', color: copied ? '#10B981' : '#94A3B8', fontSize: 12, cursor: 'pointer' }}>
//                       {copied ? '✓ Copied' : 'Copy'}
//                     </button>
//                     <button onClick={() => downloadTxt(result.text, `transcript_${result.id}.txt`)} style={{ padding: '5px 12px', borderRadius: 7, border: '1px solid #1E2A45', background: 'transparent', color: '#94A3B8', fontSize: 12, cursor: 'pointer' }}>
//                       ↓ TXT
//                     </button>
//                   </div>
//                 </div>
//                 <p style={{ fontSize: 15, lineHeight: 1.8, color: '#E2E8F0' }}>{result.text}</p>
//               </div>

//               {/* Translation */}
//               {result.translated_text && (
//                 <div style={{ background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: 14, padding: 20 }}>
//                   <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
//                     <div style={{ fontSize: 12, fontWeight: 600, color: '#8B5CF6', letterSpacing: '0.05em' }}>
//                       🔄 TRANSLATED · {translateTo.toUpperCase()}
//                     </div>
//                     <button onClick={() => copyText(result.translated_text)} style={{ padding: '5px 12px', borderRadius: 7, border: '1px solid rgba(139,92,246,0.3)', background: 'transparent', color: '#8B5CF6', fontSize: 12, cursor: 'pointer' }}>
//                       Copy
//                     </button>
//                   </div>
//                   <p style={{ fontSize: 15, lineHeight: 1.8, color: '#E2E8F0' }}>{result.translated_text}</p>
//                 </div>
//               )}

//               {/* Export */}
//               <div style={{ background: 'rgba(20,27,45,0.6)', border: '1px solid #1E2A45', borderRadius: 14, padding: 20 }}>
//                 <div style={{ fontSize: 12, fontWeight: 600, color: '#64748B', marginBottom: 12, letterSpacing: '0.05em' }}>EXPORT</div>
//                 <div style={{ display: 'flex', gap: 8 }}>
//                   {['pdf', 'srt', 'json'].map(fmt => (
//                     <button key={fmt} onClick={() => exportTranscript(result.id, fmt)} style={{
//                       flex: 1, padding: '10px', borderRadius: 9, border: '1px solid #1E2A45',
//                       background: 'rgba(30,42,69,0.5)', color: '#94A3B8',
//                       fontSize: 13, fontWeight: 600, cursor: 'pointer', textTransform: 'uppercase',
//                       transition: 'all 0.15s',
//                     }}
//                       onMouseEnter={e => { e.target.style.borderColor = '#3B7BF8'; e.target.style.color = '#3B7BF8'; }}
//                       onMouseLeave={e => { e.target.style.borderColor = '#1E2A45'; e.target.style.color = '#94A3B8'; }}
//                     >{fmt}</button>
//                   ))}
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }



import { useState, useRef } from 'react';
import { transcribeAudio, exportTranscript } from '../services/api';

export default function Transcribe() {
    const [file, setFile] = useState(null);
    const [lang, setLang] = useState('hi');
    const [translateTo, setTranslateTo] = useState('en');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setFile(e.target.files[0]);
            setResult(null);
            setError('');
        }
    };

    const handleTranscribe = async () => {
        if (!file) {
            setError('Please select an audio file first');
            return;
        }

        setLoading(true);
        setError('');
        setResult(null);

        try {
            // ✅ Pass translateTo parameter properly
            const data = await transcribeAudio(file, lang, translateTo);
            setResult(data);
        } catch (err) {
            setError(err.message || 'Transcription failed');
        } finally {
            setLoading(false);
        }
    };

    const handleExport = (fmt) => {
        if (result && result.id) {
            exportTranscript(result.id, fmt);
        }
    };

    const formatFileSize = (bytes) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1048576) return (bytes / 1024).toFixed(2) + ' KB';
        return (bytes / 1048576).toFixed(2) + ' MB';
    };

    return (
        <div style={{ maxWidth: 700, margin: '0 auto', padding: '20px' }}>
            <div style={{ marginBottom: 24 }}>
                <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 28, fontWeight: 700, color: '#F1F5F9' }}>
                    📄 Transcription
                </h2>
                <p style={{ color: '#94A3B8', fontSize: 14 }}>
                    Upload any audio or video file — we handle the conversion automatically.
                </p>
            </div>

            {/* File Upload Area */}
            <div
                onClick={() => fileInputRef.current?.click()}
                style={{
                    border: '2px dashed #1E2A45',
                    borderRadius: 14,
                    padding: '40px 20px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    background: file ? 'rgba(59, 123, 248, 0.05)' : 'transparent',
                    borderColor: file ? '#3B7BF8' : '#1E2A45',
                    marginBottom: 24,
                }}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".mp3,.wav,.m4a,.ogg,.mp4,.flac"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
                {file ? (
                    <div>
                        <div style={{ fontSize: 32, marginBottom: 8 }}>📁</div>
                        <div style={{ color: '#F1F5F9', fontSize: 16, fontWeight: 500 }}>
                            {file.name}
                        </div>
                        <div style={{ color: '#64748B', fontSize: 13 }}>
                            {formatFileSize(file.size)} · Click to change
                        </div>
                    </div>
                ) : (
                    <div>
                        <div style={{ fontSize: 48, marginBottom: 12 }}>📤</div>
                        <div style={{ color: '#94A3B8', fontSize: 16 }}>
                            Click to upload or drag & drop
                        </div>
                        <div style={{ color: '#475569', fontSize: 13, marginTop: 4 }}>
                            MP3, WAV, M4A, OGG, MP4 (max 50MB)
                        </div>
                    </div>
                )}
            </div>

            {/* Language Selection */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
                <div>
                    <label style={{ display: 'block', color: '#94A3B8', fontSize: 13, fontWeight: 500, marginBottom: 6 }}>
                        AUDIO LANGUAGE
                    </label>
                    <select
                        value={lang}
                        onChange={(e) => setLang(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px 14px',
                            borderRadius: 10,
                            border: '1px solid #1E2A45',
                            background: '#0F1628',
                            color: '#F1F5F9',
                            fontSize: 14,
                            outline: 'none',
                            cursor: 'pointer',
                        }}
                    >
                        <option value="hi">🇮🇳 Hindi</option>
                        <option value="en">🇬🇧 English</option>
                        <option value="hinglish">🔀 Hinglish</option>
                        <option value="ta">🇮🇳 Tamil</option>
                        <option value="mr">🇮🇳 Marathi</option>
                        <option value="auto">🔄 Auto Detect</option>
                    </select>
                </div>

                <div>
                    <label style={{ display: 'block', color: '#94A3B8', fontSize: 13, fontWeight: 500, marginBottom: 6 }}>
                        TRANSLATE TO
                    </label>
                    <select
                        value={translateTo}
                        onChange={(e) => setTranslateTo(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px 14px',
                            borderRadius: 10,
                            border: '1px solid #1E2A45',
                            background: '#0F1628',
                            color: '#F1F5F9',
                            fontSize: 14,
                            outline: 'none',
                            cursor: 'pointer',
                        }}
                    >
                        <option value="en">🇬🇧 English</option>
                        <option value="hi">🇮🇳 Hindi</option>
                        <option value="">🚫 No Translation</option>
                    </select>
                </div>
            </div>

            {/* Generate Button */}
            <button
                onClick={handleTranscribe}
                disabled={!file || loading}
                style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: 12,
                    border: 'none',
                    background: !file || loading ? '#1E2A45' : 'linear-gradient(135deg, #3B7BF8, #8B5CF6)',
                    color: '#fff',
                    fontSize: 16,
                    fontWeight: 600,
                    cursor: !file || loading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    marginBottom: 24,
                    fontFamily: 'Inter, sans-serif',
                }}
            >
                {loading ? '⏳ Processing...' : '🎯 Generate Transcript'}
            </button>

            {error && (
                <div style={{
                    background: 'rgba(239,68,68,0.1)',
                    border: '1px solid rgba(239,68,68,0.3)',
                    borderRadius: 10,
                    padding: 16,
                    color: '#FCA5A5',
                    marginBottom: 16,
                }}>
                    ❌ {error}
                </div>
            )}

            {/* Results */}
            {result && (
                <div style={{
                    background: 'rgba(20,27,45,0.6)',
                    border: '1px solid #1E2A45',
                    borderRadius: 14,
                    padding: 24,
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                        <h3 style={{ margin: 0, color: '#F1F5F9', fontSize: 18, fontWeight: 600 }}>
                            📝 Transcript Ready
                        </h3>
                        <span style={{
                            padding: '4px 12px',
                            borderRadius: 20,
                            background: 'rgba(59, 123, 248, 0.15)',
                            color: '#3B7BF8',
                            fontSize: 12,
                            fontWeight: 500,
                        }}>
                            {result.language || 'hi'}
                        </span>
                    </div>

                    {/* Original Transcript */}
                    <div style={{
                        background: 'rgba(15, 22, 40, 0.6)',
                        padding: 16,
                        borderRadius: 10,
                        marginBottom: 12,
                    }}>
                        <div style={{ color: '#64748B', fontSize: 12, fontWeight: 500, marginBottom: 4 }}>
                            ORIGINAL · {result.language || 'hi'}
                        </div>
                        <p style={{ margin: 0, color: '#E2E8F0', fontSize: 15, lineHeight: 1.8 }}>
                            {result.text || 'No text available'}
                        </p>
                    </div>

                    {/* ✅ Translation - FIXED! */}
                    {result.translated_text && translateTo && (
                        <div style={{
                            background: 'rgba(16, 185, 129, 0.05)',
                            border: '1px solid rgba(16, 185, 129, 0.15)',
                            padding: 16,
                            borderRadius: 10,
                            marginBottom: 16,
                        }}>
                            <div style={{ color: '#10B981', fontSize: 12, fontWeight: 500, marginBottom: 4 }}>
                                🌐 TRANSLATED · {translateTo}
                            </div>
                            <p style={{ margin: 0, color: '#E2E8F0', fontSize: 15, lineHeight: 1.8 }}>
                                {result.translated_text}
                            </p>
                        </div>
                    )}

                    {/* Export Buttons */}
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                        <button
                            onClick={() => handleExport('pdf')}
                            style={{
                                padding: '8px 20px',
                                borderRadius: 8,
                                border: '1px solid #1E2A45',
                                background: 'transparent',
                                color: '#94A3B8',
                                fontSize: 13,
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                            }}
                        >
                            📄 PDF
                        </button>
                        <button
                            onClick={() => handleExport('srt')}
                            style={{
                                padding: '8px 20px',
                                borderRadius: 8,
                                border: '1px solid #1E2A45',
                                background: 'transparent',
                                color: '#94A3B8',
                                fontSize: 13,
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                            }}
                        >
                            📝 SRT
                        </button>
                        <button
                            onClick={() => handleExport('json')}
                            style={{
                                padding: '8px 20px',
                                borderRadius: 8,
                                border: '1px solid #1E2A45',
                                background: 'transparent',
                                color: '#94A3B8',
                                fontSize: 13,
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                            }}
                        >
                            📋 JSON
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}