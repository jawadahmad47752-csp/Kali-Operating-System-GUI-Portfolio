import { Terminal, Folder, FileText, Mail, Briefcase } from 'lucide-react';

export const USER_DATA = {
    name: "JAWAD AHMAD",
    role: "Cyber Security Professional",
    bio: "I am a passionate Cyber Security Professional with a knack for penetration testing and secure coding. Welcome to my digital workspace.",
    email: "jawad.ahmad.47752@gmail.com",
    github: "https://github.com/imran",
    linkedin: "https://linkedin.com/in/imran",
};

export const PROJECTS = [
    {
        id: "proj1",
        title: "Network Scanner",
        description: "A Python-based network scanner that identifies active hosts and open ports.",
        techStack: ["Python", "Scapy", "Socket"],
        link: "https://github.com/imran/network-scanner",
    },
    {
        id: "proj2",
        title: "Vulnerability Assessor",
        description: "Automated script to check for common CVEs in web applications.",
        techStack: ["Bash", "Python", "Nmap"],
        link: "https://github.com/imran/vuln-assessor",
    },
];

export const EXPERIENCE = [
    {
        id: "exp1",
        role: "Junior Penetration Tester",
        company: "CyberSec Corp",
        duration: "2023 - Present",
        description: "Conducting vulnerability assessments and penetration testing on client networks.",
    },
    {
        id: "exp2",
        role: "Security Intern",
        company: "TechSafe Solutions",
        duration: "2022 - 2023",
        description: "Assisted in monitoring SIEM logs and analyzing security incidents.",
    },
];

export const DESKTOP_ICONS = [
    { id: "terminal", label: "Terminal", icon: Terminal, component: "Terminal" },
    { id: "projects", label: "My Projects", icon: Folder, component: "FileExplorer" },
    { id: "experience", label: "Experience", icon: Briefcase, component: "ExperienceViewer" },
    { id: "contact", label: "Contact Me", icon: Mail, component: "Contact" },
    { id: "resume", label: "Resume.pdf", icon: FileText, component: "PDFViewer" },
];
