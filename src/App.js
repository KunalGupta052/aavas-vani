// import { useState, useEffect } from 'react';
// import { checkHealth } from './services/api';
// import Navbar from './components/Navbar';
// import Hero from './components/Hero';
// import Transcribe from './components/Transcribe';
// import History from './components/History';
// import LiveMic from './components/LiveMic';
// import './index.css';

// export default function App() {
//   const [backendOnline, setBackendOnline] = useState(null);
//   const [activeTab, setActiveTab] = useState('transcribe');

//   useEffect(() => {
//     checkHealth().then(setBackendOnline);
//   }, []);

//   return (
//     <div>
//       <Navbar backendOnline={backendOnline} activeTab={activeTab} setActiveTab={setActiveTab} />
//       {activeTab === 'home' && <Hero setActiveTab={setActiveTab} />}
//       {activeTab === 'transcribe' && <Transcribe />}
//       {activeTab === 'live' && <LiveMic />}
//       {activeTab === 'history' && <History />}
//     </div>
//   );
// }

import { useState, useEffect } from 'react';
import { checkHealth } from './services/api';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Transcribe from './components/Transcribe';
import History from './components/History';
import LiveMic from './components/LiveMic';  // ✅ MUST HAVE THIS
import './index.css';

export default function App() {
    const [backendOnline, setBackendOnline] = useState(null);
    const [activeTab, setActiveTab] = useState('transcribe');

    useEffect(() => {
        checkHealth().then(setBackendOnline);
    }, []);

    return (
        <div>
            <Navbar backendOnline={backendOnline} activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab === 'home' && <Hero setActiveTab={setActiveTab} />}
            {activeTab === 'transcribe' && <Transcribe />}
            {activeTab === 'live' && <LiveMic />}  {/* ✅ MUST HAVE THIS */}
            {activeTab === 'history' && <History />}
        </div>
    );
}