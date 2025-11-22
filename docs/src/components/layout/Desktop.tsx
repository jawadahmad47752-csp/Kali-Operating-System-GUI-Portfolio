import React from 'react';
import { DESKTOP_ICONS } from '../../data';
import { useOS } from '../../context/OSContext';
import Window from '../os/Window';
import Taskbar from './Taskbar';
import Terminal from '../apps/Terminal';
import FileExplorer from '../apps/FileExplorer';

// Component Mapping
const COMPONENT_MAP: Record<string, React.FC<any>> = {
    Terminal: Terminal,
    FileExplorer: FileExplorer,
    ExperienceViewer: () => <div className="p-4">Experience Viewer (Coming Soon)</div>,
    Contact: () => <div className="p-4">Contact Form (Coming Soon)</div>,
    PDFViewer: () => <div className="p-4">PDF Viewer (Coming Soon)</div>,
};

const Desktop = () => {
    const { launchWindow, windows } = useOS();

    return (
        <div
            className="h-screen w-screen overflow-hidden bg-cover bg-center relative"
            style={{
                backgroundImage: "url('kali-ferrofluid.jpg')", // Fallback or external URL
                backgroundColor: '#0a0a0a'
            }}
        >
            {/* Desktop Icons */}
            <div className="absolute top-4 left-4 flex flex-col space-y-6 z-0">
                {DESKTOP_ICONS.map((icon) => (
                    <div
                        key={icon.id}
                        className="flex flex-col items-center space-y-1 cursor-pointer group w-24"
                        onDoubleClick={() => launchWindow(icon.id, icon.label, icon.component)}
                    >
                        <div className="w-12 h-12 rounded hover:bg-white/10 flex items-center justify-center transition-colors">
                            <icon.icon size={32} className="text-kali-blue drop-shadow-lg" />
                        </div>
                        <span className="text-xs text-white font-medium drop-shadow-md bg-black/50 px-2 rounded group-hover:bg-kali-blue group-hover:text-black transition-colors">
                            {icon.label}
                        </span>
                    </div>
                ))}
            </div>

            {/* Windows Area */}
            <div className="absolute inset-0 pointer-events-none">
                {windows.map((win) => {
                    const Component = COMPONENT_MAP[win.component] || (() => <div>Not Found</div>);
                    return (
                        <div key={win.id} className="pointer-events-auto">
                            <Window {...win}>
                                <Component />
                            </Window>
                        </div>
                    );
                })}
            </div>

            <Taskbar />
        </div>
    );
};

export default Desktop;
