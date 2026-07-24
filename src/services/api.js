// // const API = 'https://septum-cranium-eaten.ngrok-free.dev';

// // export const transcribeAudio = async (file, lang = 'hi', translateTo = 'en') => {
// //   const fd = new FormData();
// //   fd.append('file', file);
// //   const res = await fetch(`${API}/transcribe?lang=${lang}`, {
// //     method: 'POST',
// //     body: fd,
// //     headers: {
// //       'ngrok-skip-browser-warning': 'true'
// //     }
// //   });
// //   if (!res.ok) throw new Error('Transcription failed');
// //   return res.json();
// // };

// // export const getTranscripts = async () => {
// //   const res = await fetch(`${API}/transcripts`, {
// //     headers: { 'ngrok-skip-browser-warning': 'true' }
// //   });
// //   return res.json();
// // };

// // export const checkHealth = async () => {
// //   try {
// //     const res = await fetch(`${API}/health`, {
// //       signal: AbortSignal.timeout(3000),
// //       headers: { 'ngrok-skip-browser-warning': 'true' }
// //     });
// //     return res.ok;
// //   } catch {
// //     return false;
// //   }
// // };

// // export const exportTranscript = (id, fmt) => {
// //   window.open(`${API}/transcripts/${id}/export?fmt=${fmt}`, '_blank');
// // };


// // ✅ USE THIS EXACT URL
// const API = 'https://septum-cranium-eaten.ngrok-free.dev';

// export const transcribeAudio = async (file, lang = 'hi', translateTo = 'en') => {
//     const fd = new FormData();
//     fd.append('file', file);
//     const res = await fetch(`${API}/api/v1/transcribe?lang=${lang}&translate_to=${translateTo}`, {
//         method: 'POST',
//         body: fd,
//     });
//     if (!res.ok) throw new Error('Transcription failed');
//     return res.json();
// };

// export const getTranscripts = async () => {
//     const res = await fetch(`${API}/api/v1/transcripts`);
//     return res.json();
// };

// export const checkHealth = async () => {
//     try {
//         const res = await fetch(`${API}/health`, {
//             signal: AbortSignal.timeout(3000)
//         });
//         return res.ok;
//     } catch {
//         return false;
//     }
// };

// export const exportTranscript = (id, fmt) => {
//     window.open(`${API}/api/v1/transcripts/${id}/export?fmt=${fmt}`, '_blank');
// };

//DEEPSEEK 2nd
// // ✅ USE YOUR KAGGLE URL
// const API = 'https://septum-cranium-eaten.ngrok-free.dev';

// export const transcribeAudio = async (file, lang = 'hi', translateTo = 'en') => {
//     const fd = new FormData();
//     fd.append('file', file);
//     const res = await fetch(`${API}/api/v1/transcribe?lang=${lang}&translate_to=${translateTo}`, {
//         method: 'POST',
//         body: fd,
//     });
//     if (!res.ok) throw new Error('Transcription failed');
//     return res.json();
// };

// export const getTranscripts = async () => {
//     const res = await fetch(`${API}/api/v1/transcripts`);
//     return res.json();
// };

// export const checkHealth = async () => {
//     try {
//         const res = await fetch(`${API}/health`, {
//             signal: AbortSignal.timeout(3000)
//         });
//         return res.ok;
//     } catch {
//         return false;
//     }
// };

// export const exportTranscript = (id, fmt) => {
//     window.open(`${API}/api/v1/transcripts/${id}/export?fmt=${fmt}`, '_blank');
// };

// ============================================
// AUTO-DETECT BACKEND URL
// ============================================

// Get backend URL from environment or use default
const getBackendURL = () => {
    // Check if running in production (deployed)
    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
        // Production: Use same domain
        return window.location.origin;
    }
    
    // Development: Check localStorage for saved URL
    const savedURL = localStorage.getItem('backendURL');
    if (savedURL) {
        return savedURL;
    }
    
    // Default: Local development (change this when Kaggle gives new URL)
    return 'https://septum-cranium-eaten.ngrok-free.dev';
};

// Get WebSocket URL
const getWebSocketURL = () => {
    const backendURL = getBackendURL();
    // Convert https:// to wss:// for WebSocket
    return backendURL.replace('https://', 'wss://').replace('http://', 'ws://');
};

// Export API base URL
export const API = getBackendURL();
export const WS_BASE = getWebSocketURL();

// ============================================
// HELPER: Update Backend URL (when Kaggle changes)
// ============================================
export const updateBackendURL = (newURL) => {
    // Remove trailing slash if exists
    const cleanURL = newURL.replace(/\/$/, '');
    localStorage.setItem('backendURL', cleanURL);
    // Reload page to apply changes
    window.location.reload();
    return cleanURL;
};

// ============================================
// API FUNCTIONS
// ============================================

// File Upload Transcription
export const transcribeAudio = async (file, lang = 'hi', translateTo = 'en') => {
    const fd = new FormData();
    fd.append('file', file);
    
    let url = `${API}/api/v1/transcribe?lang=${lang}`;
    if (translateTo && translateTo !== '') {
        url += `&translate_to=${translateTo}`;
    }
    
    const res = await fetch(url, {
        method: 'POST',
        body: fd,
    });
    
    if (!res.ok) throw new Error('Transcription failed');
    return res.json();
};

// Get Transcripts History
export const getTranscripts = async () => {
    const res = await fetch(`${API}/api/v1/transcripts`);
    if (!res.ok) throw new Error('Failed to fetch transcripts');
    return res.json();
};

// Check Backend Health
export const checkHealth = async () => {
    try {
        const res = await fetch(`${API}/health`, {
            signal: AbortSignal.timeout(5000),
        });
        return res.ok;
    } catch {
        return false;
    }
};

// Export Transcript
export const exportTranscript = (id, fmt) => {
    window.open(`${API}/api/v1/transcripts/${id}/export?fmt=${fmt}`, '_blank');
};

// Get WebSocket URL for Live Mic
export const getWebSocketUrl = (lang = 'hi', translateTo = 'en') => {
    let url = `${WS_BASE}/ws/live?lang=${lang}`;
    if (translateTo && translateTo !== '') {
        url += `&translate_to=${translateTo}`;
    }
    return url;
};

// ============================================
// DEV TOOL: Show current backend URL in console
// ============================================
console.log('🔗 Backend URL:', API);
console.log('🔗 WebSocket URL:', WS_BASE);

// To update URL, open browser console and run:
// updateBackendURL('https://new-kaggle-url.ngrok-free.dev')