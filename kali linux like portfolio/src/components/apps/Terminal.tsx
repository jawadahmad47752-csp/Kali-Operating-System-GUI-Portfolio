import React, { useState, useEffect, useRef } from 'react';
import { USER_DATA, PROJECTS } from '../../data';

interface TerminalLine {
    type: 'input' | 'output';
    content: React.ReactNode;
}

const Terminal = () => {
    const [history, setHistory] = useState<TerminalLine[]>([]);
    const [input, setInput] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Initial welcome message
        setHistory([
            { type: 'output', content: <span className="text-kali-blue font-bold">Kali GNU/Linux Rolling</span> },
            { type: 'output', content: <span>Initializing root access... <span className="text-green-500">Access Granted.</span></span> },
            { type: 'output', content: <span>Type <span className="text-yellow-400">'help'</span> for a list of commands.</span> },
            { type: 'output', content: <br /> },
        ]);
    }, []);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    const handleCommand = (cmd: string) => {
        const args = cmd.trim().split(' ');
        const command = args[0].toLowerCase();
        const newHistory = [...history, { type: 'input', content: cmd } as TerminalLine];

        switch (command) {
            case 'help':
                newHistory.push({
                    type: 'output',
                    content: (
                        <div className="grid grid-cols-[100px_1fr] gap-2">
                            <span className="text-yellow-400">whoami</span><span>Display user information</span>
                            <span className="text-yellow-400">ls</span><span>List projects</span>
                            <span className="text-yellow-400">cat</span><span>View project details (usage: cat [project_name])</span>
                            <span className="text-yellow-400">clear</span><span>Clear terminal</span>
                            <span className="text-yellow-400">help</span><span>Show this help message</span>
                        </div>
                    )
                });
                break;
            case 'whoami':
                newHistory.push({
                    type: 'output',
                    content: (
                        <div>
                            <div className="text-kali-blue font-bold text-lg">{USER_DATA.name}</div>
                            <div className="text-gray-400">{USER_DATA.role}</div>
                            <div className="mt-2">{USER_DATA.bio}</div>
                            <div className="mt-2 text-gray-500">
                                Github: <a href={USER_DATA.github} target="_blank" className="underline hover:text-white">{USER_DATA.github}</a>
                            </div>
                        </div>
                    )
                });
                break;
            case 'ls':
                newHistory.push({
                    type: 'output',
                    content: (
                        <div className="flex flex-wrap gap-4">
                            {PROJECTS.map(p => (
                                <span key={p.id} className="text-kali-blue font-bold">{p.title.replace(/\s+/g, '_')}</span>
                            ))}
                        </div>
                    )
                });
                break;
            case 'cat':
                if (args.length < 2) {
                    newHistory.push({ type: 'output', content: <span className="text-red-500">Usage: cat [project_name]</span> });
                } else {
                    const projName = args[1];
                    const project = PROJECTS.find(p => p.title.replace(/\s+/g, '_') === projName);
                    if (project) {
                        newHistory.push({
                            type: 'output',
                            content: (
                                <div className="border-l-2 border-kali-blue pl-4 my-2">
                                    <div className="font-bold text-xl">{project.title}</div>
                                    <div className="text-gray-400 text-sm mb-2">{project.techStack.join(' • ')}</div>
                                    <div>{project.description}</div>
                                    <a href={project.link} target="_blank" className="text-blue-400 underline mt-2 block">View Source</a>
                                </div>
                            )
                        });
                    } else {
                        newHistory.push({ type: 'output', content: <span className="text-red-500">File not found: {projName}</span> });
                    }
                }
                break;
            case 'clear':
                setHistory([]);
                setInput('');
                return;
            case '':
                break;
            default:
                newHistory.push({ type: 'output', content: <span className="text-red-500">Command not found: {command}</span> });
        }

        setHistory(newHistory);
        setInput('');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleCommand(input);
        }
    };

    return (
        <div
            className="h-full w-full bg-black/90 p-4 font-mono text-sm overflow-y-auto"
            onClick={() => inputRef.current?.focus()}
        >
            {history.map((line, i) => (
                <div key={i} className="mb-1">
                    {line.type === 'input' ? (
                        <div className="flex">
                            <span className="text-kali-blue mr-2">root@kali:~#</span>
                            <span className="text-white">{line.content}</span>
                        </div>
                    ) : (
                        <div className="text-gray-300">{line.content}</div>
                    )}
                </div>
            ))}

            <div className="flex items-center">
                <span className="text-kali-blue mr-2">root@kali:~#</span>
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="bg-transparent border-none outline-none text-white flex-1"
                    autoFocus
                    autoComplete="off"
                />
            </div>
            <div ref={bottomRef} />
        </div>
    );
};

export default Terminal;
