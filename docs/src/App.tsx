import React, { useState, useEffect } from 'react';
import { OSProvider } from './context/OSContext';
import Desktop from './components/layout/Desktop';
import { Terminal, AlertTriangle } from 'lucide-react';

function App() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    if (isMobile) {
        return (
            <div className="min-h-screen bg-kali-bg text-white p-6 font-mono flex flex-col items-center justify-center text-center">
                <AlertTriangle size={48} className="text-yellow-500 mb-4" />
                <h1 className="text-2xl font-bold mb-2">Booting Mobile Version...</h1>
                <p className="text-gray-400 mb-8">
                    The full Kali Linux Desktop experience is optimized for larger screens.
                    Please visit on a desktop for the full simulation.
                </p>

                <div className="w-full max-w-md bg-kali-header p-4 rounded border border-kali-accent text-left">
                    <div className="flex items-center space-x-2 mb-4 border-b border-kali-accent pb-2">
                        <Terminal size={20} className="text-kali-blue" />
                        <span className="font-bold">System Info</span>
                    </div>
                    <div className="space-y-2 text-sm">
                        <p><span className="text-kali-blue">User:</span> Imran</p>
                        <p><span className="text-kali-blue">Role:</span> Cyber Security Professional</p>
                        <p><span className="text-kali-blue">Status:</span> Mobile Access Detected</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <OSProvider>
            <Desktop />
        </OSProvider>
    );
}

export default App;
