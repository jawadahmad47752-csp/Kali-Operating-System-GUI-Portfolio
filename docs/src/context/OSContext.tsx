import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface WindowState {
    id: string;
    title: string;
    component: string; // Key to map to actual component
    isOpen: boolean;
    isMinimized: boolean;
    isMaximized: boolean;
    zIndex: number;
}

interface OSContextType {
    windows: WindowState[];
    activeWindowId: string | null;
    launchWindow: (id: string, title: string, component: string) => void;
    closeWindow: (id: string) => void;
    minimizeWindow: (id: string) => void;
    maximizeWindow: (id: string) => void;
    focusWindow: (id: string) => void;
}

const OSContext = createContext<OSContextType | undefined>(undefined);

export const OSProvider = ({ children }: { children: ReactNode }) => {
    const [windows, setWindows] = useState<WindowState[]>([]);
    const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
    const [zIndexCounter, setZIndexCounter] = useState(10);

    const launchWindow = (id: string, title: string, component: string) => {
        setWindows((prev) => {
            const existing = prev.find((w) => w.id === id);
            if (existing) {
                // If minimized, restore it. Always bring to front.
                return prev.map((w) =>
                    w.id === id
                        ? { ...w, isOpen: true, isMinimized: false, zIndex: zIndexCounter + 1 }
                        : w
                );
            }
            return [
                ...prev,
                {
                    id,
                    title,
                    component,
                    isOpen: true,
                    isMinimized: false,
                    isMaximized: false,
                    zIndex: zIndexCounter + 1,
                },
            ];
        });
        setZIndexCounter((prev) => prev + 1);
        setActiveWindowId(id);
    };

    const closeWindow = (id: string) => {
        setWindows((prev) => prev.filter((w) => w.id !== id));
        if (activeWindowId === id) {
            setActiveWindowId(null);
        }
    };

    const minimizeWindow = (id: string) => {
        setWindows((prev) =>
            prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
        );
        if (activeWindowId === id) {
            setActiveWindowId(null);
        }
    };

    const maximizeWindow = (id: string) => {
        setWindows((prev) =>
            prev.map((w) => (w.id === id ? { ...w, isMaximized: !w.isMaximized } : w))
        );
        focusWindow(id);
    };

    const focusWindow = (id: string) => {
        setWindows((prev) =>
            prev.map((w) => (w.id === id ? { ...w, zIndex: zIndexCounter + 1 } : w))
        );
        setZIndexCounter((prev) => prev + 1);
        setActiveWindowId(id);
    };

    return (
        <OSContext.Provider
            value={{
                windows,
                activeWindowId,
                launchWindow,
                closeWindow,
                minimizeWindow,
                maximizeWindow,
                focusWindow,
            }}
        >
            {children}
        </OSContext.Provider>
    );
};

export const useOS = () => {
    const context = useContext(OSContext);
    if (!context) {
        throw new Error("useOS must be used within an OSProvider");
    }
    return context;
};
