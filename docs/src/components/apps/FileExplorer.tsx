import React, { useState } from 'react';
import { Folder, FileText, ArrowLeft, Github, ExternalLink } from 'lucide-react';
import { PROJECTS, EXPERIENCE } from '../../data';

const FileExplorer = () => {
    const [currentPath, setCurrentPath] = useState('/');
    const [selectedItem, setSelectedItem] = useState<any | null>(null);

    const handleBack = () => {
        setSelectedItem(null);
        setCurrentPath('/');
    };

    const handleItemClick = (item: any) => {
        setSelectedItem(item);
        setCurrentPath(`/projects/${item.title.toLowerCase().replace(/\s+/g, '-')}`);
    };

    return (
        <div className="h-full w-full bg-kali-bg flex flex-col text-gray-300">
            {/* Toolbar */}
            <div className="h-10 bg-kali-header border-b border-kali-accent flex items-center px-2 space-x-2">
                <button
                    onClick={handleBack}
                    disabled={!selectedItem}
                    className="p-1 hover:bg-kali-accent rounded disabled:opacity-50"
                >
                    <ArrowLeft size={18} />
                </button>
                <div className="flex-1 bg-kali-accent/50 px-2 py-1 rounded text-sm font-mono">
                    /home/kali{currentPath}
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-4">
                {selectedItem ? (
                    // Detail View
                    <div className="max-w-2xl mx-auto bg-kali-header p-6 rounded-lg border border-kali-accent shadow-lg animate-in fade-in zoom-in duration-200">
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="p-4 bg-kali-blue/20 rounded-full">
                                <Folder size={48} className="text-kali-blue" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">{selectedItem.title}</h2>
                                <div className="flex space-x-2 mt-2">
                                    {selectedItem.techStack.map((tech: string) => (
                                        <span key={tech} className="px-2 py-0.5 bg-kali-accent text-xs rounded text-kali-cyan border border-kali-cyan/30">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <p className="text-gray-300 leading-relaxed">
                                {selectedItem.description}
                            </p>

                            <div className="pt-4 border-t border-kali-accent flex space-x-4">
                                <a
                                    href={selectedItem.link}
                                    target="_blank"
                                    className="flex items-center space-x-2 px-4 py-2 bg-kali-blue text-black font-bold rounded hover:bg-blue-400 transition-colors"
                                >
                                    <Github size={18} />
                                    <span>View Source</span>
                                </a>
                            </div>
                        </div>
                    </div>
                ) : (
                    // Grid View
                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {PROJECTS.map((project) => (
                            <div
                                key={project.id}
                                onClick={() => handleItemClick(project)}
                                className="flex flex-col items-center p-2 hover:bg-kali-accent/50 rounded cursor-pointer group transition-colors"
                            >
                                <Folder size={48} className="text-kali-blue mb-2 group-hover:scale-110 transition-transform" />
                                <span className="text-sm text-center group-hover:text-white truncate w-full px-1">
                                    {project.title}
                                </span>
                            </div>
                        ))}
                        {/* Add some dummy files for aesthetic */}
                        <div className="flex flex-col items-center p-2 hover:bg-kali-accent/50 rounded cursor-pointer opacity-50">
                            <FileText size={48} className="text-gray-500 mb-2" />
                            <span className="text-sm text-center">notes.txt</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Status Bar */}
            <div className="h-6 bg-kali-header border-t border-kali-accent flex items-center px-2 text-xs text-gray-500">
                {selectedItem ? '1 item selected' : `${PROJECTS.length + 1} items`}
            </div>
        </div>
    );
};

export default FileExplorer;
