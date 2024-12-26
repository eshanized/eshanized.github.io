import { LucideIcon, Globe, Code2, Database, Palette, Terminal, Cloud, Lock, Cpu } from 'lucide-react';

interface Skill {
  category: string;
  icon: LucideIcon;
  items: {
    name: string;
    icon: LucideIcon;
  }[];
}

export const skills: Skill[] = [
  {
    category: 'Frontend',
    icon: Globe,
    items: [
      { name: 'React', icon: Code2 },
      { name: 'TypeScript', icon: Terminal },
      { name: 'Tailwind CSS', icon: Palette },
      { name: 'Next.js', icon: Globe }
    ]
  },
  {
    category: 'Backend',
    icon: Terminal,
    items: [
      { name: 'Node.js', icon: Code2 },
      { name: 'Express', icon: Terminal },
      { name: 'Python', icon: Code2 },
      { name: 'PostgreSQL', icon: Database }
    ]
  },
  {
    category: 'DevOps',
    icon: Cloud,
    items: [
      { name: 'Docker', icon: Cloud },
      { name: 'AWS', icon: Cloud },
      { name: 'CI/CD', icon: Cpu },
      { name: 'Kubernetes', icon: Cloud }
    ]
  },
  {
    category: 'Security',
    icon: Lock,
    items: [
      { name: 'OAuth', icon: Lock },
      { name: 'JWT', icon: Lock },
      { name: 'HTTPS', icon: Lock },
      { name: 'Security Best Practices', icon: Lock }
    ]
  }
];