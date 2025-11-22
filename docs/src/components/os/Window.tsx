import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Minus, Square, Maximize2 } from 'lucide-react';
import { useOS } from '../../context/OSContext';
import clsx from 'clsx';

interface WindowProps {
    id: string;
    title: string;
    children: React.ReactNode;
    isActive: boolean;
    isMinimized: boolean;
    isMaximized: boolean;
    zIndex: number;
}

const Window: React.FC<WindowProps> = ({
    id,
    title,
    children,
    isActive,
    isMinimized,
    isMaximized,
    zIndex,
}) => {
    const { closeWindow, minimizeWindow, maximizeWindow, focusWindow } = useOS();
    const constraintsRef = useRef(null);

    if (isMinimized) return null;

    return (
        <motion.div
            drag={!isMaximized}
            dragConstraints={constraintsRef}
            dragMomentum={false}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
                scale: 1,
                opacity: 1,
                width: isMaximized ? '100vw' : '800px',
                height: isMaximized ? 'calc(100vh - 40px)' : '500px',
                x: isMaximized ? 0 : undefined,
                y: isMaximized ? 0 : undefined,
                top: isMaximized ? '32px' : '10%', // Adjusted for top taskbar
                left: isMaximized ? 0 : '15%',
            }}
            style={{ zIndex, position: 'absolute' }}
            className={clsx(
                "flex flex-col bg-kali-bg border border-kali-accent shadow-2xl rounded-t-lg overflow-hidden",
                isActive ? "border-kali-blue" : "border-kali-accent"
            )}
            onMouseDown={() => focusWindow(id)}
        >
            {/* Title Bar */}
            <div
                className="h-8 bg-kali-header border-b border-kali-accent flex items-center justify-between px-3 select-none"
                onDoubleClick={() => maximizeWindow(id)}
            >
                <div className="flex items-center space-x-2">
                    {/* Window Icon (Generic for now) */}
                    <div className="w-3 h-3 rounded-full bg-kali-blue/50"></div>
                    <span className="text-xs font-bold text-gray-300 tracking-wide">{title}</span>
                </div>

                <div className="flex items-center space-x-3">
                    <button
                        onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }}
                        className="group p-1 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <Minus size={12} className="text-gray-400 group-hover:text-white" />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); maximizeWindow(id); }}
                        className="group p-1 hover:bg-white/10 rounded-full transition-colors"
                    >
                        {isMaximized ?
                            <Square size={10} className="text-gray-400 group-hover:text-white" /> :
                            <Maximize2 size={10} className="text-gray-400 group-hover:text-white" />
                        }
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); closeWindow(id); }}
                        className="group p-1 hover:bg-red-500 rounded-full transition-colors"
                    >
                        <X size={12} className="text-gray-400 group-hover:text-white" />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto bg-black/90 text-gray-200 p-1 relative">
                {children}
            </div>
        </motion.div>
    );
};

export default Window;
