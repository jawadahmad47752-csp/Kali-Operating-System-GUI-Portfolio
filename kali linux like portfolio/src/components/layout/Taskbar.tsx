import React, { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { Wifi, Battery, Volume2, Monitor, Power, Settings, Search } from 'lucide-react';
import { useOS } from '../../context/OSContext';
import { DESKTOP_ICONS } from '../../data';
import clsx from 'clsx';

const Taskbar = () => {
    const { windows, activeWindowId, focusWindow, minimizeWindow, launchWindow } = useOS();
    const [time, setTime] = useState(new Date());
    const [isStartOpen, setIsStartOpen] = useState(false);
    const startMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (startMenuRef.current && !startMenuRef.current.contains(event.target as Node)) {
                setIsStartOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <>
            {/* Top Bar */}
            <div className="h-8 bg-kali-header border-b border-kali-accent flex items-center justify-between px-2 fixed top-0 w-full z-50 select-none shadow-md">
                {/* Start / Left Section */}
                <div className="flex items-center space-x-2">
                    <div
                        className={clsx(
                            "flex items-center space-x-2 px-3 py-1 rounded cursor-pointer transition-colors",
                            isStartOpen ? "bg-kali-accent text-white" : "hover:bg-kali-accent text-gray-300"
                        )}
                        onClick={() => setIsStartOpen(!isStartOpen)}
                    >
                        {/* Kali Logo Placeholder */}
                        <div className="w-5 h-5 bg-kali-blue rounded-full flex items-center justify-center">
                            <span className="text-black font-bold text-xs">K</span>
                        </div>
                        <span className="font-bold text-sm hidden sm:block">Applications</span>
                    </div>

                    {/* Workspaces */}
                    <div className="hidden md:flex space-x-1 ml-4 border-l border-kali-accent pl-4">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className={clsx("w-6 h-6 flex items-center justify-center text-xs rounded cursor-pointer transition-colors", i === 1 ? "bg-kali-blue text-white" : "bg-kali-accent/50 text-gray-400 hover:bg-kali-accent")}>
                                {i}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Middle - Active Windows (Simplified for Top Bar) */}
                {/* Usually top bar in Kali (XFCE) doesn't show window list in the middle like Windows, 
            but we can show the active window title or nothing. Let's show active window title. */}
                <div className="flex-1 flex justify-center">
                    <span className="text-xs font-bold text-gray-400">
                        {windows.find(w => w.id === activeWindowId)?.title || ""}
                    </span>
                </div>

                {/* Right - System Tray */}
                <div className="flex items-center space-x-3 text-xs text-gray-300">
                    <div className="flex items-center space-x-3 px-2 border-r border-kali-accent pr-4">
                        <div className="flex flex-col items-end leading-none">
                            <span className="text-[10px] text-kali-blue font-bold">CPU</span>
                            <span className="text-[10px]">12%</span>
                        </div>
                        <div className="flex flex-col items-end leading-none">
                            <span className="text-[10px] text-kali-blue font-bold">MEM</span>
                            <span className="text-[10px]">4.2G</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Volume2 size={14} className="hover:text-white cursor-pointer" />
                        <Wifi size={14} className="hover:text-white cursor-pointer" />
                        <Battery size={14} className="hover:text-white cursor-pointer" />
                    </div>
                    <div className="px-2 py-1 hover:bg-kali-accent rounded cursor-pointer font-mono">
                        {format(time, 'HH:mm')}
                    </div>
                    <div className="w-8 h-8 flex items-center justify-center hover:bg-red-600/20 rounded cursor-pointer text-red-500">
                        <Power size={16} />
                    </div>
                </div>
            </div>

            {/* Start Menu Dropdown */}
            {isStartOpen && (
                <div
                    ref={startMenuRef}
                    className="fixed top-9 left-2 w-64 bg-kali-header border border-kali-accent shadow-2xl rounded-b-lg z-50 flex flex-col text-gray-300"
                >
                    <div className="p-2 border-b border-kali-accent">
                        <div className="bg-kali-bg flex items-center px-2 py-1 rounded border border-kali-accent">
                            <Search size={14} className="text-gray-500 mr-2" />
                            <input type="text" placeholder="Search application" className="bg-transparent border-none outline-none text-sm w-full text-white" />
                        </div>
                    </div>
                    <div className="py-2">
                        <div className="px-4 py-1 text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Favorites</div>
                        {DESKTOP_ICONS.map((item) => (
                            <div
                                key={item.id}
                                className="px-4 py-2 hover:bg-kali-blue hover:text-white cursor-pointer flex items-center space-x-3 transition-colors"
                                onClick={() => {
                                    launchWindow(item.id, item.label, item.component);
                                    setIsStartOpen(false);
                                }}
                            >
                                <item.icon size={16} />
                                <span className="text-sm">{item.label}</span>
                            </div>
                        ))}
                        <div className="border-t border-kali-accent my-2"></div>
                        <div className="px-4 py-2 hover:bg-kali-blue hover:text-white cursor-pointer flex items-center space-x-3 transition-colors">
                            <Settings size={16} />
                            <span className="text-sm">Settings</span>
                        </div>
                        <div className="px-4 py-2 hover:bg-kali-blue hover:text-white cursor-pointer flex items-center space-x-3 transition-colors">
                            <Power size={16} />
                            <span className="text-sm">Log Out</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Taskbar;
