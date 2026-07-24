// // import { useState, useRef } from 'react';

// // // const WS_URL = 'wss://septum-cranium-eaten.ngrok-free.dev/ws/transcribe';
// // // ✅ USE THIS EXACT URL (wss:// not https://)
// // const WS_URL = 'wss://septum-cranium-eaten.ngrok-free.dev/ws/live';

// // export default function LiveMic({ lang = 'hi' }) {
// //   const [recording, setRecording] = useState(false);
// //   const [transcript, setTranscript] = useState('');
// //   const [error, setError] = useState('');
// //   const wsRef = useRef(null);
// //   const recorderRef = useRef(null);

// //   const start = async () => {
// //     setTranscript(''); setError('');
// //     try {
// //       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
// //       const ws = new WebSocket(`${WS_URL}?lang=${lang}`);
// //     ws.onopen = () => {
// //   // ngrok bypass header
// //         console.log('Connected!');
// //     };
// //     //   const ws = new WebSocket(`${WS_URL}?lang=${lang}`);
// //     //   wsRef.current = ws;

// //     //   ws.onmessage = (e) => {
// //     //     const data = JSON.parse(e.data);
// //     //     if (data.text) setTranscript(prev => prev + ' ' + data.text);
// //     //   };
// //       ws.onerror = () => setError('Connection error. Check if server is running.');

// //       const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
// //       recorderRef.current = recorder;
// //       recorder.ondataavailable = (e) => {
// //         if (ws.readyState === WebSocket.OPEN && e.data.size > 0) {
// //           e.data.arrayBuffer().then(buf => ws.send(buf));
// //         }
// //       };
// //       recorder.start(3000);
// //       setRecording(true);
// //     } catch (e) {
// //       setError('Mic access denied: ' + e.message);
// //     }
// //   };

// //   const stop = () => {
// //     recorderRef.current?.stop();
// //     wsRef.current?.close();
// //     setRecording(false);
// //   };

// //   return (
// //     <div style={{ minHeight: '100vh', padding: '100px 24px 60px', maxWidth: 800, margin: '0 auto' }}>
// //       <div style={{ marginBottom: 40 }}>
// //         <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', color: '#3B7BF8', marginBottom: 10 }}>LIVE</div>
// //         <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 32, fontWeight: 700, marginBottom: 8 }}>Live Transcription</h2>
// //         <p style={{ color: '#64748B', fontSize: 15 }}>Speak into your mic — transcript updates every 3 seconds.</p>
// //       </div>

// //       <button onClick={recording ? stop : start} style={{
// //         padding: '16px 40px', borderRadius: 12, border: 'none', cursor: 'pointer',
// //         background: recording ? 'linear-gradient(135deg, #EF4444, #DC2626)' : 'linear-gradient(135deg, #3B7BF8, #8B5CF6)',
// //         color: '#fff', fontSize: 16, fontWeight: 700, fontFamily: 'Space Grotesk',
// //         boxShadow: recording ? '0 8px 32px rgba(239,68,68,0.3)' : '0 8px 32px rgba(59,123,248,0.3)',
// //         marginBottom: 32, display: 'flex', alignItems: 'center', gap: 10,
// //       }}>
// //         {recording ? '⏹ Stop Recording' : '🎙️ Start Recording'}
// //         {recording && <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff', animation: 'pulse 1s infinite' }} />}
// //       </button>

// //       {error && (
// //         <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 10, padding: '12px 16px', fontSize: 13, color: '#EF4444', marginBottom: 16 }}>
// //           ⚠️ {error}
// //         </div>
// //       )}

// //       <div style={{
// //         background: 'rgba(20,27,45,0.6)', border: `1px solid ${recording ? '#3B7BF8' : '#1E2A45'}`,
// //         borderRadius: 14, padding: 24, minHeight: 200, transition: 'border-color 0.3s',
// //       }}>
// //         {recording && !transcript && (
// //           <div style={{ color: '#475569', fontSize: 14 }}>🎤 Listening... speak now</div>
// //         )}
// //         {transcript ? (
// //           <p style={{ fontSize: 16, lineHeight: 1.9, color: '#E2E8F0' }}>{transcript}</p>
// //         ) : !recording && (
// //           <div style={{ color: '#475569', fontSize: 14 }}>Transcript will appear here...</div>
// //         )}
// //       </div>

// //       {transcript && (
// //         <button onClick={() => navigator.clipboard.writeText(transcript)} style={{
// //           marginTop: 12, padding: '8px 20px', borderRadius: 8, border: '1px solid #1E2A45',
// //           background: 'transparent', color: '#94A3B8', fontSize: 13, cursor: 'pointer',
// //         }}>Copy Transcript</button>
// //       )}

// //       <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
// //     </div>
// //   );
// // }




// //DEEPSEEK 

// // import { useState, useRef, useEffect } from 'react';

// // // const WS_URL = 'wss://septum-cranium-eaten.ngrok-free.dev/ws/live';
// // const WS_URL = 'wss://septum-cranium-eaten.ngrok-free.dev/ws/live';
// // export default function LiveMic({ lang = 'hi' }) {
// //     const [isRecording, setIsRecording] = useState(false);
// //     const [transcript, setTranscript] = useState('');
// //     const [error, setError] = useState('');
// //     const [isConnected, setIsConnected] = useState(false);

// //     const wsRef = useRef(null);
// //     const audioContextRef = useRef(null);
// //     const streamRef = useRef(null);
// //     const intervalRef = useRef(null);

// //     const startRecording = async () => {
// //         setTranscript('');
// //         setError('');
// //         setIsConnected(false);

// //         try {
// //             // 1. Get microphone access
// //             const stream = await navigator.mediaDevices.getUserMedia({
// //                 audio: {
// //                     sampleRate: 16000,
// //                     channelCount: 1,
// //                     echoCancellation: true,
// //                     noiseSuppression: true,
// //                     autoGainControl: true
// //                 }
// //             });
// //             streamRef.current = stream;

// //             // 2. Setup WebSocket
// //             const ws = new WebSocket(`${WS_URL}?lang=${lang}`);
// //             wsRef.current = ws;

// //             ws.onopen = () => {
// //                 console.log('✅ WebSocket connected!');
// //                 setIsConnected(true);
// //                 setIsRecording(true);
// //                 startAudioProcessing(stream);
// //             };

// //             ws.onmessage = (event) => {
// //                 try {
// //                     const data = JSON.parse(event.data);
// //                     if (data.text && data.text.trim()) {
// //                         setTranscript(prev => {
// //                             const newText = prev ? `${prev} ${data.text}` : data.text;
// //                             return newText;
// //                         });
// //                     }
// //                 } catch (e) {
// //                     console.error('❌ Parse error:', e);
// //                 }
// //             };

// //             ws.onerror = (error) => {
// //                 console.error('❌ WebSocket error:', error);
// //                 setError('WebSocket connection error');
// //             };

// //             ws.onclose = () => {
// //                 console.log('🔴 WebSocket disconnected');
// //                 setIsConnected(false);
// //                 setIsRecording(false);
// //             };

// //         } catch (err) {
// //             console.error('❌ Failed to start recording:', err);
// //             setError(`Error: ${err.message}`);
// //             setIsRecording(false);
// //         }
// //     };

// //     const startAudioProcessing = (stream) => {
// //         // ✅ Use AudioContext for raw PCM
// //         const audioContext = new (window.AudioContext || window.webkitAudioContext)({
// //             sampleRate: 16000
// //         });
// //         audioContextRef.current = audioContext;

// //         const source = audioContext.createMediaStreamSource(stream);
// //         const processor = audioContext.createScriptProcessor(4096, 1, 1);

// //         source.connect(processor);
// //         processor.connect(audioContext.destination);

// //         let audioBuffer = [];

// //         processor.onaudioprocess = (event) => {
// //             const inputData = event.inputBuffer.getChannelData(0);
            
// //             // Convert Float32 to Int16 PCM
// //             const pcmData = new Int16Array(inputData.length);
// //             for (let i = 0; i < inputData.length; i++) {
// //                 const s = Math.max(-1, Math.min(1, inputData[i]));
// //                 pcmData[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
// //             }
            
// //             audioBuffer.push(pcmData);
// //         };

// //         // Send chunks every 3 seconds
// //         intervalRef.current = setInterval(() => {
// //             if (audioBuffer.length > 0 && wsRef.current?.readyState === WebSocket.OPEN) {
// //                 // Concatenate all PCM chunks
// //                 const totalLength = audioBuffer.reduce((acc, arr) => acc + arr.length, 0);
// //                 const combined = new Int16Array(totalLength);
// //                 let offset = 0;
                
// //                 for (const arr of audioBuffer) {
// //                     combined.set(arr, offset);
// //                     offset += arr.length;
// //                 }
                
// //                 // Send raw PCM
// //                 wsRef.current.send(combined.buffer);
// //                 audioBuffer = [];
// //                 console.log(`📤 Sent PCM chunk: ${totalLength} samples`);
// //             }
// //         }, 3000);
// //     };

// //     const stopRecording = () => {
// //         console.log('⏹️ Stopping recording...');
        
// //         // Clear interval
// //         if (intervalRef.current) {
// //             clearInterval(intervalRef.current);
// //             intervalRef.current = null;
// //         }
        
// //         // Close WebSocket
// //         if (wsRef.current) {
// //             wsRef.current.close();
// //         }
        
// //         // Stop microphone
// //         if (streamRef.current) {
// //             streamRef.current.getTracks().forEach(track => track.stop());
// //         }
        
// //         // Close AudioContext
// //         if (audioContextRef.current) {
// //             audioContextRef.current.close();
// //         }
        
// //         setIsRecording(false);
// //         setIsConnected(false);
// //         console.log('✅ Recording stopped');
// //     };

// //     // Cleanup on unmount
// //     useEffect(() => {
// //         return () => {
// //             stopRecording();
// //         };
// //     }, []);

// //     return (
// //         <div style={{ maxWidth: 700, margin: '0 auto', padding: '20px' }}>
// //             <div style={{ marginBottom: 24 }}>
// //                 <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 28, fontWeight: 700, color: '#F1F5F9' }}>
// //                     🎤 Live Transcription
// //                 </h2>
// //                 <p style={{ color: '#94A3B8', fontSize: 14 }}>
// //                     {isRecording ? '🔴 Recording... speak now' : 'Click start to begin live transcription'}
// //                 </p>
// //                 {isConnected && (
// //                     <p style={{ color: '#10B981', fontSize: 13, marginTop: 8 }}>
// //                         ✅ Connected to server
// //                     </p>
// //                 )}
// //             </div>

// //             <button
// //                 onClick={isRecording ? stopRecording : startRecording}
// //                 style={{
// //                     padding: '16px 48px',
// //                     borderRadius: 12,
// //                     border: 'none',
// //                     cursor: 'pointer',
// //                     background: isRecording ? 'linear-gradient(135deg, #EF4444, #DC2626)' : 'linear-gradient(135deg, #3B7BF8, #8B5CF6)',
// //                     color: '#fff',
// //                     fontSize: 18,
// //                     fontWeight: 700,
// //                     fontFamily: 'Space Grotesk, sans-serif',
// //                     boxShadow: isRecording ? '0 8px 32px rgba(239,68,68,0.3)' : '0 8px 32px rgba(59,123,248,0.3)',
// //                     marginBottom: 24,
// //                     display: 'inline-flex',
// //                     alignItems: 'center',
// //                     gap: 12,
// //                     transition: 'all 0.3s ease'
// //                 }}
// //             >
// //                 {isRecording ? '⏹️ Stop Recording' : '🎙️ Start Recording'}
// //                 {isRecording && (
// //                     <span style={{
// //                         width: 12,
// //                         height: 12,
// //                         borderRadius: '50%',
// //                         background: '#fff',
// //                         animation: 'pulse 1s infinite'
// //                     }} />
// //                 )}
// //             </button>

// //             {error && (
// //                 <div style={{
// //                     background: 'rgba(239,68,68,0.1)',
// //                     border: '1px solid rgba(239,68,68,0.3)',
// //                     borderRadius: 10,
// //                     padding: 16,
// //                     color: '#FCA5A5',
// //                     marginBottom: 16
// //                 }}>
// //                     ❌ {error}
// //                 </div>
// //             )}

// //             <div style={{
// //                 background: 'rgba(20,27,45,0.6)',
// //                 border: `1px solid ${isRecording ? '#3B7BF8' : '#1E2A45'}`,
// //                 borderRadius: 14,
// //                 padding: 24,
// //                 minHeight: 200,
// //                 transition: 'border-color 0.3s ease'
// //             }}>
// //                 {transcript ? (
// //                     <p style={{
// //                         fontSize: 16,
// //                         lineHeight: 1.9,
// //                         color: '#E2E8F0',
// //                         whiteSpace: 'pre-wrap',
// //                         wordBreak: 'break-word'
// //                     }}>
// //                         {transcript}
// //                     </p>
// //                 ) : isRecording ? (
// //                     <div style={{ color: '#475569', fontSize: 14 }}>
// //                         🎯 Listening... speak into your microphone
// //                     </div>
// //                 ) : (
// //                     <div style={{ color: '#475569', fontSize: 14 }}>
// //                         📝 Transcript will appear here
// //                     </div>
// //                 )}
// //             </div>

// //             {transcript && (
// //                 <div style={{ marginTop: 16, display: 'flex', gap: 12 }}>
// //                     <button
// //                         onClick={() => navigator.clipboard.writeText(transcript)}
// //                         style={{
// //                             padding: '8px 20px',
// //                             borderRadius: 8,
// //                             border: '1px solid #1E2A45',
// //                             background: 'transparent',
// //                             color: '#94A3B8',
// //                             fontSize: 13,
// //                             cursor: 'pointer'
// //                         }}
// //                     >
// //                         📋 Copy
// //                     </button>
// //                     <button
// //                         onClick={() => setTranscript('')}
// //                         style={{
// //                             padding: '8px 20px',
// //                             borderRadius: 8,
// //                             border: '1px solid #1E2A45',
// //                             background: 'transparent',
// //                             color: '#94A3B8',
// //                             fontSize: 13,
// //                             cursor: 'pointer'
// //                         }}
// //                     >
// //                         🗑️ Clear
// //                     </button>
// //                 </div>
// //             )}

// //             <style>{`
// //                 @keyframes pulse {
// //                     0%, 100% { opacity: 1; }
// //                     50% { opacity: 0.4; }
// //                 }
// //             `}</style>
// //         </div>
// //     );
// // }



// // import { useState, useRef, useEffect } from 'react';

// // // ✅ UPDATE WITH YOUR KAGGLE URL
// // const WS_URL = 'wss://septum-cranium-eaten.ngrok-free.dev/ws/live';

// // export default function LiveMic() {
// //     const [isRecording, setIsRecording] = useState(false);
// //     const [transcript, setTranscript] = useState('');
// //     const [translatedText, setTranslatedText] = useState('');
// //     const [error, setError] = useState('');
// //     const [isConnected, setIsConnected] = useState(false);
// //     const [lang, setLang] = useState('hi');
// //     const [translateTo, setTranslateTo] = useState('en');
// //     const [showTranslation, setShowTranslation] = useState(true);

// //     const wsRef = useRef(null);
// //     const audioContextRef = useRef(null);
// //     const streamRef = useRef(null);
// //     const intervalRef = useRef(null);

// //     useEffect(() => {
// //         return () => stopRecording();
// //     }, []);

// //     const startRecording = async () => {
// //         setTranscript('');
// //         setTranslatedText('');
// //         setError('');
// //         setIsConnected(false);

// //         try {
// //             const stream = await navigator.mediaDevices.getUserMedia({
// //                 audio: {
// //                     sampleRate: 16000,
// //                     channelCount: 1,
// //                     echoCancellation: true,
// //                     noiseSuppression: true,
// //                     autoGainControl: true
// //                 }
// //             });
// //             streamRef.current = stream;

// //             // ✅ Pass language and translation params to WebSocket
// //             const ws = new WebSocket(`${WS_URL}?lang=${lang}&translate_to=${translateTo}`);
// //             wsRef.current = ws;

// //             ws.onopen = () => {
// //                 console.log('✅ WebSocket connected!');
// //                 setIsConnected(true);
// //                 setIsRecording(true);
// //                 startAudioProcessing(stream);
// //             };

// //             ws.onmessage = (event) => {
// //                 try {
// //                     const data = JSON.parse(event.data);
// //                     console.log('📩 Received:', data);
                    
// //                     if (data.text && data.text.trim()) {
// //                         setTranscript(prev => {
// //                             const newText = prev ? `${prev} ${data.text}` : data.text;
// //                             return newText;
// //                         });
// //                     }
                    
// //                     // ✅ Handle translated text
// //                     if (data.translated_text && data.translated_text.trim()) {
// //                         setTranslatedText(prev => {
// //                             const newText = prev ? `${prev} ${data.translated_text}` : data.translated_text;
// //                             return newText;
// //                         });
// //                     }
// //                 } catch (e) {
// //                     console.error('❌ Parse error:', e);
// //                 }
// //             };

// //             ws.onerror = () => setError('WebSocket connection error');
// //             ws.onclose = () => {
// //                 setIsConnected(false);
// //                 setIsRecording(false);
// //             };

// //         } catch (err) {
// //             setError(`Error: ${err.message}`);
// //             setIsRecording(false);
// //         }
// //     };

// //     const startAudioProcessing = (stream) => {
// //         const audioContext = new (window.AudioContext || window.webkitAudioContext)({
// //             sampleRate: 16000
// //         });
// //         audioContextRef.current = audioContext;

// //         const source = audioContext.createMediaStreamSource(stream);
// //         const processor = audioContext.createScriptProcessor(4096, 1, 1);

// //         source.connect(processor);
// //         processor.connect(audioContext.destination);

// //         let audioBuffer = [];

// //         processor.onaudioprocess = (event) => {
// //             const inputData = event.inputBuffer.getChannelData(0);
// //             const pcmData = new Int16Array(inputData.length);
// //             for (let i = 0; i < inputData.length; i++) {
// //                 const s = Math.max(-1, Math.min(1, inputData[i]));
// //                 pcmData[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
// //             }
// //             audioBuffer.push(pcmData);
// //         };

// //         intervalRef.current = setInterval(() => {
// //             if (audioBuffer.length > 0 && wsRef.current?.readyState === WebSocket.OPEN) {
// //                 const totalLength = audioBuffer.reduce((acc, arr) => acc + arr.length, 0);
// //                 const combined = new Int16Array(totalLength);
// //                 let offset = 0;
// //                 for (const arr of audioBuffer) {
// //                     combined.set(arr, offset);
// //                     offset += arr.length;
// //                 }
// //                 wsRef.current.send(combined.buffer);
// //                 audioBuffer = [];
// //                 console.log(`📤 Sent PCM chunk: ${totalLength} samples`);
// //             }
// //         }, 3000);
// //     };

// //     const stopRecording = () => {
// //         if (intervalRef.current) clearInterval(intervalRef.current);
// //         if (wsRef.current?.readyState === WebSocket.OPEN) wsRef.current.close();
// //         if (streamRef.current) streamRef.current.getTracks().forEach(track => track.stop());
// //         if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
// //             audioContextRef.current.close();
// //         }
// //         setIsRecording(false);
// //         setIsConnected(false);
// //         console.log('✅ Recording stopped');
// //     };

// //     const copyText = (text) => {
// //         navigator.clipboard.writeText(text);
// //     };

// //     return (
// //         <div style={{ maxWidth: 800, margin: '0 auto', padding: '20px' }}>
// //             {/* Header */}
// //             <div style={{ marginBottom: 24 }}>
// //                 <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 28, fontWeight: 700, color: '#F1F5F9' }}>
// //                     🎤 Live Transcription
// //                 </h2>
// //                 <p style={{ color: '#94A3B8', fontSize: 14 }}>
// //                     {isRecording ? '🔴 Recording... speak now' : 'Click start to begin live transcription'}
// //                 </p>
// //                 {isConnected && (
// //                     <p style={{ color: '#10B981', fontSize: 13, marginTop: 8 }}>
// //                         ✅ Connected to server
// //                     </p>
// //                 )}
// //             </div>

// //             {/* Language Controls */}
// //             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
// //                 <div>
// //                     <label style={{ display: 'block', color: '#94A3B8', fontSize: 13, fontWeight: 500, marginBottom: 6 }}>
// //                         SPEAKING LANGUAGE
// //                     </label>
// //                     <select
// //                         value={lang}
// //                         onChange={(e) => setLang(e.target.value)}
// //                         style={{
// //                             width: '100%',
// //                             padding: '10px 14px',
// //                             borderRadius: 10,
// //                             border: '1px solid #1E2A45',
// //                             background: '#0F1628',
// //                             color: '#F1F5F9',
// //                             fontSize: 14,
// //                             outline: 'none',
// //                         }}
// //                     >
// //                         <option value="hi">🇮🇳 Hindi</option>
// //                         <option value="en">🇬🇧 English</option>
// //                         <option value="hinglish">🔀 Hinglish</option>
// //                         <option value="ta">🇮🇳 Tamil</option>
// //                         <option value="mr">🇮🇳 Marathi</option>
// //                     </select>
// //                 </div>

// //                 <div>
// //                     <label style={{ display: 'block', color: '#94A3B8', fontSize: 13, fontWeight: 500, marginBottom: 6 }}>
// //                         TRANSLATE TO
// //                     </label>
// //                     <select
// //                         value={translateTo}
// //                         onChange={(e) => setTranslateTo(e.target.value)}
// //                         style={{
// //                             width: '100%',
// //                             padding: '10px 14px',
// //                             borderRadius: 10,
// //                             border: '1px solid #1E2A45',
// //                             background: '#0F1628',
// //                             color: '#F1F5F9',
// //                             fontSize: 14,
// //                             outline: 'none',
// //                         }}
// //                     >
// //                         <option value="">🚫 No Translation</option>
// //                         <option value="en">🇬🇧 English</option>
// //                         <option value="hi">🇮🇳 Hindi</option>
// //                     </select>
// //                 </div>
// //             </div>

// //             {/* Recording Button */}
// //             <button
// //                 onClick={isRecording ? stopRecording : startRecording}
// //                 style={{
// //                     padding: '16px 48px',
// //                     borderRadius: 12,
// //                     border: 'none',
// //                     cursor: 'pointer',
// //                     background: isRecording ? 'linear-gradient(135deg, #EF4444, #DC2626)' : 'linear-gradient(135deg, #3B7BF8, #8B5CF6)',
// //                     color: '#fff',
// //                     fontSize: 18,
// //                     fontWeight: 700,
// //                     fontFamily: 'Space Grotesk, sans-serif',
// //                     boxShadow: isRecording ? '0 8px 32px rgba(239,68,68,0.3)' : '0 8px 32px rgba(59,123,248,0.3)',
// //                     marginBottom: 24,
// //                     display: 'inline-flex',
// //                     alignItems: 'center',
// //                     gap: 12,
// //                 }}
// //             >
// //                 {isRecording ? '⏹️ Stop Recording' : '🎙️ Start Recording'}
// //                 {isRecording && (
// //                     <span style={{
// //                         width: 12,
// //                         height: 12,
// //                         borderRadius: '50%',
// //                         background: '#fff',
// //                         animation: 'pulse 1s infinite'
// //                     }} />
// //                 )}
// //             </button>

// //             {error && (
// //                 <div style={{
// //                     background: 'rgba(239,68,68,0.1)',
// //                     border: '1px solid rgba(239,68,68,0.3)',
// //                     borderRadius: 10,
// //                     padding: 16,
// //                     color: '#FCA5A5',
// //                     marginBottom: 16
// //                 }}>
// //                     ❌ {error}
// //                 </div>
// //             )}

// //             {/* Transcript Boxes */}
// //             <div style={{ display: 'grid', gap: 16 }}>
// //                 {/* Original Transcript */}
// //                 <div style={{
// //                     background: 'rgba(20,27,45,0.6)',
// //                     border: `1px solid ${isRecording ? '#3B7BF8' : '#1E2A45'}`,
// //                     borderRadius: 14,
// //                     padding: 20,
// //                     minHeight: 120,
// //                 }}>
// //                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
// //                         <span style={{ color: '#64748B', fontSize: 12, fontWeight: 600, letterSpacing: '0.05em' }}>
// //                             📝 ORIGINAL · {lang.toUpperCase()}
// //                         </span>
// //                         {transcript && (
// //                             <button
// //                                 onClick={() => copyText(transcript)}
// //                                 style={{
// //                                     padding: '4px 12px',
// //                                     borderRadius: 6,
// //                                     border: '1px solid #1E2A45',
// //                                     background: 'transparent',
// //                                     color: '#94A3B8',
// //                                     fontSize: 11,
// //                                     cursor: 'pointer',
// //                                 }}
// //                             >
// //                                 Copy
// //                             </button>
// //                         )}
// //                     </div>
// //                     <p style={{
// //                         fontSize: 16,
// //                         lineHeight: 1.9,
// //                         color: '#E2E8F0',
// //                         whiteSpace: 'pre-wrap',
// //                         wordBreak: 'break-word',
// //                         margin: 0,
// //                     }}>
// //                         {transcript || (isRecording ? '🎯 Listening...' : '📝 Speak into the mic')}
// //                     </p>
// //                 </div>

// //                 {/* ✅ Translated Text */}
// //                 {translateTo && translateTo.trim() && translatedText && (
// //                     <div style={{
// //                         background: 'rgba(16, 185, 129, 0.05)',
// //                         border: '1px solid rgba(16, 185, 129, 0.2)',
// //                         borderRadius: 14,
// //                         padding: 20,
// //                         minHeight: 80,
// //                     }}>
// //                         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
// //                             <span style={{ color: '#10B981', fontSize: 12, fontWeight: 600, letterSpacing: '0.05em' }}>
// //                                 🌐 TRANSLATION · {translateTo.toUpperCase()}
// //                             </span>
// //                             <button
// //                                 onClick={() => copyText(translatedText)}
// //                                 style={{
// //                                     padding: '4px 12px',
// //                                     borderRadius: 6,
// //                                     border: '1px solid rgba(16, 185, 129, 0.2)',
// //                                     background: 'transparent',
// //                                     color: '#10B981',
// //                                     fontSize: 11,
// //                                     cursor: 'pointer',
// //                                 }}
// //                             >
// //                                 Copy
// //                             </button>
// //                         </div>
// //                         <p style={{
// //                             fontSize: 16,
// //                             lineHeight: 1.9,
// //                             color: '#E2E8F0',
// //                             whiteSpace: 'pre-wrap',
// //                             wordBreak: 'break-word',
// //                             margin: 0,
// //                         }}>
// //                             {translatedText}
// //                         </p>
// //                     </div>
// //                 )}
// //             </div>

// //             {/* Clear Button */}
// //             {(transcript || translatedText) && (
// //                 <button
// //                     onClick={() => { setTranscript(''); setTranslatedText(''); }}
// //                     style={{
// //                         marginTop: 16,
// //                         padding: '8px 20px',
// //                         borderRadius: 8,
// //                         border: '1px solid #1E2A45',
// //                         background: 'transparent',
// //                         color: '#94A3B8',
// //                         fontSize: 13,
// //                         cursor: 'pointer',
// //                     }}
// //                 >
// //                     🗑️ Clear All
// //                 </button>
// //             )}

// //             <style>{`
// //                 @keyframes pulse {
// //                     0%, 100% { opacity: 1; }
// //                     50% { opacity: 0.4; }
// //                 }
// //             `}</style>
// //         </div>
// //     );
// // }


// // Auto detection Backend URL
// import { useState, useRef, useEffect } from 'react';
// import { getWebSocketUrl } from '../services/api';

// export default function LiveMic() {
//     const [isRecording, setIsRecording] = useState(false);
//     const [transcript, setTranscript] = useState('');
//     const [translatedText, setTranslatedText] = useState('');
//     const [error, setError] = useState('');
//     const [isConnected, setIsConnected] = useState(false);
//     const [lang, setLang] = useState('hi');
//     const [translateTo, setTranslateTo] = useState('en');

//     const wsRef = useRef(null);
//     const audioContextRef = useRef(null);
//     const streamRef = useRef(null);
//     const intervalRef = useRef(null);

//     useEffect(() => {
//         return () => stopRecording();
//     }, []);

//     const startRecording = async () => {
//         setTranscript('');
//         setTranslatedText('');
//         setError('');
//         setIsConnected(false);

//         try {
//             const stream = await navigator.mediaDevices.getUserMedia({
//                 audio: {
//                     sampleRate: 16000,
//                     channelCount: 1,
//                     echoCancellation: true,
//                     noiseSuppression: true,
//                     autoGainControl: true
//                 }
//             });
//             streamRef.current = stream;

//             // ✅ Auto-detect WebSocket URL
//             const wsUrl = getWebSocketUrl(lang, translateTo);
//             console.log('🔗 Connecting to:', wsUrl);
            
//             const ws = new WebSocket(wsUrl);
//             wsRef.current = ws;

//             ws.onopen = () => {
//                 console.log('✅ WebSocket connected!');
//                 setIsConnected(true);
//                 setIsRecording(true);
//                 startAudioProcessing(stream);
//             };

//             ws.onmessage = (event) => {
//                 try {
//                     const data = JSON.parse(event.data);
//                     console.log('📩 Received:', data);
                    
//                     if (data.text && data.text.trim()) {
//                         setTranscript(prev => {
//                             const newText = prev ? `${prev} ${data.text}` : data.text;
//                             return newText;
//                         });
//                     }
                    
//                     if (data.translated_text && data.translated_text.trim()) {
//                         setTranslatedText(prev => {
//                             const newText = prev ? `${prev} ${data.translated_text}` : data.translated_text;
//                             return newText;
//                         });
//                     }
//                 } catch (e) {
//                     console.error('❌ Parse error:', e);
//                 }
//             };

//             ws.onerror = () => {
//                 setError('WebSocket connection error');
//                 setIsConnected(false);
//             };

//             ws.onclose = () => {
//                 setIsConnected(false);
//                 setIsRecording(false);
//             };

//         } catch (err) {
//             setError(`Error: ${err.message}`);
//             setIsRecording(false);
//         }
//     };

//     const startAudioProcessing = (stream) => {
//         const audioContext = new (window.AudioContext || window.webkitAudioContext)({
//             sampleRate: 16000
//         });
//         audioContextRef.current = audioContext;

//         const source = audioContext.createMediaStreamSource(stream);
//         const processor = audioContext.createScriptProcessor(4096, 1, 1);

//         source.connect(processor);
//         processor.connect(audioContext.destination);

//         let audioBuffer = [];

//         processor.onaudioprocess = (event) => {
//             const inputData = event.inputBuffer.getChannelData(0);
//             const pcmData = new Int16Array(inputData.length);
//             for (let i = 0; i < inputData.length; i++) {
//                 const s = Math.max(-1, Math.min(1, inputData[i]));
//                 pcmData[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
//             }
//             audioBuffer.push(pcmData);
//         };

//         intervalRef.current = setInterval(() => {
//             if (audioBuffer.length > 0 && wsRef.current?.readyState === WebSocket.OPEN) {
//                 const totalLength = audioBuffer.reduce((acc, arr) => acc + arr.length, 0);
//                 const combined = new Int16Array(totalLength);
//                 let offset = 0;
//                 for (const arr of audioBuffer) {
//                     combined.set(arr, offset);
//                     offset += arr.length;
//                 }
//                 wsRef.current.send(combined.buffer);
//                 audioBuffer = [];
//                 console.log(`📤 Sent PCM chunk: ${totalLength} samples`);
//             }
//         }, 3000);
//     };

//     const stopRecording = () => {
//         if (intervalRef.current) clearInterval(intervalRef.current);
//         if (wsRef.current?.readyState === WebSocket.OPEN) wsRef.current.close();
//         if (streamRef.current) streamRef.current.getTracks().forEach(track => track.stop());
//         if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
//             audioContextRef.current.close();
//         }
//         setIsRecording(false);
//         setIsConnected(false);
//         console.log('✅ Recording stopped');
//     };

//     return (
//         <div style={{ maxWidth: 800, margin: '0 auto', padding: '20px' }}>
//             <div style={{ marginBottom: 24 }}>
//                 <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 28, fontWeight: 700, color: '#F1F5F9' }}>
//                     🎤 Live Transcription
//                 </h2>
//                 <p style={{ color: '#94A3B8', fontSize: 14 }}>
//                     {isRecording ? '🔴 Recording... speak now' : 'Click start to begin live transcription'}
//                 </p>
//                 {isConnected && (
//                     <p style={{ color: '#10B981', fontSize: 13, marginTop: 8 }}>
//                         ✅ Connected to server
//                     </p>
//                 )}
//             </div>

//             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
//                 <div>
//                     <label style={{ display: 'block', color: '#94A3B8', fontSize: 13, fontWeight: 500, marginBottom: 6 }}>
//                         SPEAKING LANGUAGE
//                     </label>
//                     <select
//                         value={lang}
//                         onChange={(e) => setLang(e.target.value)}
//                         style={{
//                             width: '100%',
//                             padding: '10px 14px',
//                             borderRadius: 10,
//                             border: '1px solid #1E2A45',
//                             background: '#0F1628',
//                             color: '#F1F5F9',
//                             fontSize: 14,
//                             outline: 'none',
//                         }}
//                     >
//                         <option value="hi">🇮🇳 Hindi</option>
//                         <option value="en">🇬🇧 English</option>
//                         <option value="hinglish">🔀 Hinglish</option>
//                         <option value="ta">🇮🇳 Tamil</option>
//                         <option value="mr">🇮🇳 Marathi</option>
//                     </select>
//                 </div>

//                 <div>
//                     <label style={{ display: 'block', color: '#94A3B8', fontSize: 13, fontWeight: 500, marginBottom: 6 }}>
//                         TRANSLATE TO
//                     </label>
//                     <select
//                         value={translateTo}
//                         onChange={(e) => setTranslateTo(e.target.value)}
//                         style={{
//                             width: '100%',
//                             padding: '10px 14px',
//                             borderRadius: 10,
//                             border: '1px solid #1E2A45',
//                             background: '#0F1628',
//                             color: '#F1F5F9',
//                             fontSize: 14,
//                             outline: 'none',
//                         }}
//                     >
//                         <option value="">🚫 No Translation</option>
//                         <option value="en">🇬🇧 English</option>
//                         <option value="hi">🇮🇳 Hindi</option>
//                     </select>
//                 </div>
//             </div>

//             <button
//                 onClick={isRecording ? stopRecording : startRecording}
//                 style={{
//                     padding: '16px 48px',
//                     borderRadius: 12,
//                     border: 'none',
//                     cursor: 'pointer',
//                     background: isRecording ? 'linear-gradient(135deg, #EF4444, #DC2626)' : 'linear-gradient(135deg, #3B7BF8, #8B5CF6)',
//                     color: '#fff',
//                     fontSize: 18,
//                     fontWeight: 700,
//                     fontFamily: 'Space Grotesk, sans-serif',
//                     boxShadow: isRecording ? '0 8px 32px rgba(239,68,68,0.3)' : '0 8px 32px rgba(59,123,248,0.3)',
//                     marginBottom: 24,
//                     display: 'inline-flex',
//                     alignItems: 'center',
//                     gap: 12,
//                 }}
//             >
//                 {isRecording ? '⏹️ Stop Recording' : '🎙️ Start Recording'}
//                 {isRecording && (
//                     <span style={{
//                         width: 12,
//                         height: 12,
//                         borderRadius: '50%',
//                         background: '#fff',
//                         animation: 'pulse 1s infinite'
//                     }} />
//                 )}
//             </button>

//             {error && (
//                 <div style={{
//                     background: 'rgba(239,68,68,0.1)',
//                     border: '1px solid rgba(239,68,68,0.3)',
//                     borderRadius: 10,
//                     padding: 16,
//                     color: '#FCA5A5',
//                     marginBottom: 16
//                 }}>
//                     ❌ {error}
//                 </div>
//             )}

//             <div style={{ display: 'grid', gap: 16 }}>
//                 <div style={{
//                     background: 'rgba(20,27,45,0.6)',
//                     border: `1px solid ${isRecording ? '#3B7BF8' : '#1E2A45'}`,
//                     borderRadius: 14,
//                     padding: 20,
//                     minHeight: 100,
//                 }}>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
//                         <span style={{ color: '#64748B', fontSize: 12, fontWeight: 600, letterSpacing: '0.05em' }}>
//                             📝 ORIGINAL · {lang.toUpperCase()}
//                         </span>
//                     </div>
//                     <p style={{
//                         fontSize: 16,
//                         lineHeight: 1.9,
//                         color: '#E2E8F0',
//                         whiteSpace: 'pre-wrap',
//                         wordBreak: 'break-word',
//                         margin: 0,
//                     }}>
//                         {transcript || (isRecording ? '🎯 Listening...' : '📝 Speak into the mic')}
//                     </p>
//                 </div>

//                 {translateTo && translateTo.trim() && translatedText && (
//                     <div style={{
//                         background: 'rgba(16, 185, 129, 0.05)',
//                         border: '1px solid rgba(16, 185, 129, 0.2)',
//                         borderRadius: 14,
//                         padding: 20,
//                         minHeight: 80,
//                     }}>
//                         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
//                             <span style={{ color: '#10B981', fontSize: 12, fontWeight: 600, letterSpacing: '0.05em' }}>
//                                 🌐 TRANSLATION · {translateTo.toUpperCase()}
//                             </span>
//                         </div>
//                         <p style={{
//                             fontSize: 16,
//                             lineHeight: 1.9,
//                             color: '#E2E8F0',
//                             whiteSpace: 'pre-wrap',
//                             wordBreak: 'break-word',
//                             margin: 0,
//                         }}>
//                             {translatedText}
//                         </p>
//                     </div>
//                 )}
//             </div>

//             {(transcript || translatedText) && (
//                 <button
//                     onClick={() => { setTranscript(''); setTranslatedText(''); }}
//                     style={{
//                         marginTop: 16,
//                         padding: '8px 20px',
//                         borderRadius: 8,
//                         border: '1px solid #1E2A45',
//                         background: 'transparent',
//                         color: '#94A3B8',
//                         fontSize: 13,
//                         cursor: 'pointer',
//                     }}
//                 >
//                     🗑️ Clear All
//                 </button>
//             )}

//             <style>{`
//                 @keyframes pulse {
//                     0%, 100% { opacity: 1; }
//                     50% { opacity: 0.4; }
//                 }
//             `}</style>
//         </div>
//     );
// }


//Updated Live Mic
import { useState, useRef, useEffect } from 'react';
import { getWebSocketUrl } from '../services/api';

export default function LiveMic() {
    const [isRecording, setIsRecording] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [error, setError] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const [lang, setLang] = useState('hi');
    const [translateTo, setTranslateTo] = useState('en');

    const wsRef = useRef(null);
    const audioContextRef = useRef(null);
    const streamRef = useRef(null);
    const intervalRef = useRef(null);

    useEffect(() => {
        return () => stopRecording();
    }, []);

    const startRecording = async () => {
        setTranscript('');
        setTranslatedText('');
        setError('');
        setIsConnected(false);

        try {
            // ✅ Browser built-in noise suppression
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    sampleRate: 16000,
                    channelCount: 1,
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true,
                }
            });
            streamRef.current = stream;

            const wsUrl = getWebSocketUrl(lang, translateTo);
            console.log('🔗 Connecting to:', wsUrl);
            const ws = new WebSocket(wsUrl);
            wsRef.current = ws;

            ws.onopen = () => {
                console.log('✅ WebSocket connected!');
                setIsConnected(true);
                setIsRecording(true);
                startAudioProcessing(stream);
            };

            ws.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    console.log('📩 Received:', data);
                    
                    if (data.text && data.text.trim()) {
                        setTranscript(prev => {
                            const newText = prev ? `${prev} ${data.text}` : data.text;
                            return newText;
                        });
                    }
                    
                    if (data.translated_text && data.translated_text.trim()) {
                        setTranslatedText(prev => {
                            const newText = prev ? `${prev} ${data.translated_text}` : data.translated_text;
                            return newText;
                        });
                    }
                } catch (e) {
                    console.error('❌ Parse error:', e);
                }
            };

            ws.onerror = () => {
                setError('WebSocket connection error');
                setIsConnected(false);
            };

            ws.onclose = () => {
                setIsConnected(false);
                setIsRecording(false);
            };

        } catch (err) {
            setError(`Error: ${err.message}`);
            setIsRecording(false);
        }
    };

    const startAudioProcessing = (stream) => {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)({
            sampleRate: 16000
        });
        audioContextRef.current = audioContext;

        const source = audioContext.createMediaStreamSource(stream);
        const processor = audioContext.createScriptProcessor(4096, 1, 1);

        source.connect(processor);
        processor.connect(audioContext.destination);

        let audioBuffer = [];

        processor.onaudioprocess = (event) => {
            const inputData = event.inputBuffer.getChannelData(0);
            const pcmData = new Int16Array(inputData.length);
            for (let i = 0; i < inputData.length; i++) {
                const s = Math.max(-1, Math.min(1, inputData[i]));
                pcmData[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
            }
            audioBuffer.push(pcmData);
        };

        intervalRef.current = setInterval(() => {
            if (audioBuffer.length > 0 && wsRef.current?.readyState === WebSocket.OPEN) {
                const totalLength = audioBuffer.reduce((acc, arr) => acc + arr.length, 0);
                const combined = new Int16Array(totalLength);
                let offset = 0;
                for (const arr of audioBuffer) {
                    combined.set(arr, offset);
                    offset += arr.length;
                }
                wsRef.current.send(combined.buffer);
                audioBuffer = [];
                console.log(`📤 Sent PCM chunk: ${totalLength} samples`);
            }
        }, 3000);
    };

    const stopRecording = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (wsRef.current?.readyState === WebSocket.OPEN) wsRef.current.close();
        if (streamRef.current) streamRef.current.getTracks().forEach(track => track.stop());
        if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
            audioContextRef.current.close();
        }
        setIsRecording(false);
        setIsConnected(false);
        console.log('✅ Recording stopped');
    };

    const copyTranscript = () => {
        const text = transcript + (translatedText ? `\n\n🌐 Translation:\n${translatedText}` : '');
        navigator.clipboard.writeText(text);
    };

    return (
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '20px' }}>
            <div style={{ marginBottom: 24 }}>
                <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 28, fontWeight: 700, color: '#F1F5F9' }}>
                    🎤 Live Transcription
                </h2>
                <p style={{ color: '#94A3B8', fontSize: 14 }}>
                    {isRecording ? '🔴 Recording... speak now' : 'Click start to begin live transcription'}
                </p>
                {isConnected && (
                    <p style={{ color: '#10B981', fontSize: 13, marginTop: 8 }}>
                        ✅ Connected to server
                    </p>
                )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                <div>
                    <label style={{ display: 'block', color: '#94A3B8', fontSize: 13, fontWeight: 500, marginBottom: 6 }}>
                        SPEAKING LANGUAGE
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
                            appearance: 'auto',
                        }}
                    >
                        <option value="hi">🇮🇳 Hindi</option>
                        <option value="en">🇬🇧 English</option>
                        <option value="hinglish">🔀 Hinglish</option>
                        <option value="ta">🇮🇳 Tamil</option>
                        <option value="mr">🇮🇳 Marathi</option>
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
                            appearance: 'auto',
                        }}
                    >
                        <option value="">🚫 No Translation</option>
                        <option value="en">🇬🇧 English</option>
                        <option value="hi">🇮🇳 Hindi</option>
                    </select>
                </div>
            </div>

            <button
                onClick={isRecording ? stopRecording : startRecording}
                style={{
                    padding: '16px 48px',
                    borderRadius: 12,
                    border: 'none',
                    cursor: 'pointer',
                    background: isRecording ? 'linear-gradient(135deg, #EF4444, #DC2626)' : 'linear-gradient(135deg, #3B7BF8, #8B5CF6)',
                    color: '#fff',
                    fontSize: 18,
                    fontWeight: 700,
                    fontFamily: 'Space Grotesk, sans-serif',
                    boxShadow: isRecording ? '0 8px 32px rgba(239,68,68,0.3)' : '0 8px 32px rgba(59,123,248,0.3)',
                    marginBottom: 24,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 12,
                    transition: 'all 0.3s ease',
                }}
            >
                {isRecording ? '⏹️ Stop Recording' : '🎙️ Start Recording'}
                {isRecording && (
                    <span style={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        background: '#fff',
                        animation: 'pulse 1s infinite'
                    }} />
                )}
            </button>

            {error && (
                <div style={{
                    background: 'rgba(239,68,68,0.1)',
                    border: '1px solid rgba(239,68,68,0.3)',
                    borderRadius: 10,
                    padding: 16,
                    color: '#FCA5A5',
                    marginBottom: 16
                }}>
                    ❌ {error}
                </div>
            )}

            <div style={{ display: 'grid', gap: 16 }}>
                <div style={{
                    background: 'rgba(20,27,45,0.6)',
                    border: `1px solid ${isRecording ? '#3B7BF8' : '#1E2A45'}`,
                    borderRadius: 14,
                    padding: 20,
                    minHeight: 100,
                    transition: 'border-color 0.3s ease',
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <span style={{ color: '#64748B', fontSize: 12, fontWeight: 600, letterSpacing: '0.05em' }}>
                            📝 ORIGINAL · {lang.toUpperCase()}
                        </span>
                        {transcript && (
                            <button
                                onClick={copyTranscript}
                                style={{
                                    padding: '4px 12px',
                                    borderRadius: 6,
                                    border: '1px solid #1E2A45',
                                    background: 'transparent',
                                    color: '#94A3B8',
                                    fontSize: 11,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                }}
                            >
                                📋 Copy All
                            </button>
                        )}
                    </div>
                    <p style={{
                        fontSize: 16,
                        lineHeight: 1.9,
                        color: '#E2E8F0',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                        margin: 0,
                    }}>
                        {transcript || (isRecording ? '🎯 Listening...' : '📝 Speak into the mic')}
                    </p>
                </div>

                {translateTo && translateTo.trim() !== '' && translatedText && (
                    <div style={{
                        background: 'rgba(16, 185, 129, 0.05)',
                        border: '1px solid rgba(16, 185, 129, 0.2)',
                        borderRadius: 14,
                        padding: 20,
                        minHeight: 80,
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                            <span style={{ color: '#10B981', fontSize: 12, fontWeight: 600, letterSpacing: '0.05em' }}>
                                🌐 TRANSLATION · {translateTo.toUpperCase()}
                            </span>
                        </div>
                        <p style={{
                            fontSize: 16,
                            lineHeight: 1.9,
                            color: '#E2E8F0',
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word',
                            margin: 0,
                        }}>
                            {translatedText}
                        </p>
                    </div>
                )}
            </div>

            {(transcript || translatedText) && (
                <button
                    onClick={() => { setTranscript(''); setTranslatedText(''); }}
                    style={{
                        marginTop: 16,
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
                    🗑️ Clear All
                </button>
            )}

            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.4; }
                }
            `}</style>
        </div>
    );
}