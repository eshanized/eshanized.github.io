import { 
  Terminal, 
  User, 
  Code, 
  Laptop, 
  BookOpen, 
  GraduationCap, 
  Mail,
  Github,
  Linkedin,
  Twitter,
  FileText,
  Settings,
  AppWindow,
  FolderOpen,
  Calendar,
  MessagesSquare,
  StickyNote,
  Globe,
  Music,
  Map,
  Image
} from 'lucide-react';

// Personal information
export const PERSONAL_INFO = {
  name: "Eshan Roy",
  title: "Full Stack Developer",
  email: "m.eshanized@gmail.com",
  github: "https://github.com/eshanized",
  linkedin: "https://linkedin.com/in/eshanized",
  twitter: "https://twitter.com/eshanized",
  resume: "/resume.pdf",
  website: "https://eshanized.is-a.dev",
  avatar: "/avatar.jpg",
  about: `Hi, I'm Eshan Roy, a passionate Full Stack Developer with expertise in building modern web applications using React, Next.js, Node.js, and various other technologies. I enjoy creating elegant solutions to complex problems and am constantly exploring new technologies to enhance my skill set.

When I'm not coding, you might find me reading tech blogs, contributing to open-source projects, or exploring the outdoors. I believe in writing clean, maintainable code and creating intuitive user experiences.`,
};

// Social links with icons
export const SOCIAL_LINKS = [
  {
    name: "GitHub",
    url: PERSONAL_INFO.github,
    icon: Github,
  },
  {
    name: "LinkedIn",
    url: PERSONAL_INFO.linkedin,
    icon: Linkedin,
  },
  {
    name: "Twitter",
    url: PERSONAL_INFO.twitter,
    icon: Twitter,
  },
  {
    name: "Email",
    url: `mailto:${PERSONAL_INFO.email}`,
    icon: Mail,
  },
  {
    name: "Resume",
    url: PERSONAL_INFO.resume,
    icon: FileText,
  },
];

// Skills categorized
export const SKILLS = {
  "Frontend": [
    { name: "React", proficiency: 90 },
    { name: "Next.js", proficiency: 85 },
    { name: "TypeScript", proficiency: 80 },
    { name: "TailwindCSS", proficiency: 90 },
    { name: "HTML/CSS", proficiency: 95 },
  ],
  "Backend": [
    { name: "Node.js", proficiency: 85 },
    { name: "Express.js", proficiency: 80 },
    { name: "MongoDB", proficiency: 75 },
    { name: "PostgreSQL", proficiency: 70 },
    { name: "GraphQL", proficiency: 65 },
  ],
  "Tools & Others": [
    { name: "Git", proficiency: 85 },
    { name: "Docker", proficiency: 70 },
    { name: "AWS", proficiency: 65 },
    { name: "Jest", proficiency: 75 },
    { name: "CI/CD", proficiency: 70 },
  ],
};

// Projects
export const PROJECTS = [
  {
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce platform with product management, cart functionality, and payment integration using Stripe.",
    tags: ["React", "Node.js", "MongoDB", "Stripe", "Redux"],
    image: "https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    link: "https://github.com/eshanroy/ecommerce-platform",
    demoLink: "https://ecommerce-platform-demo.vercel.app",
  },
  {
    title: "Task Management App",
    description: "A Kanban-style task management application with drag-and-drop functionality, user authentication, and real-time updates.",
    tags: ["Next.js", "TypeScript", "Firebase", "TailwindCSS"],
    image: "https://images.pexels.com/photos/5717456/pexels-photo-5717456.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    link: "https://github.com/eshanroy/task-manager",
    demoLink: "https://task-manager-demo.vercel.app",
  },
  {
    title: "Weather Dashboard",
    description: "A weather dashboard that provides current weather conditions and forecasts for locations worldwide using the OpenWeather API.",
    tags: ["React", "CSS Modules", "OpenWeather API", "Chart.js"],
    image: "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    link: "https://github.com/eshanroy/weather-dashboard",
    demoLink: "https://weather-dashboard-demo.vercel.app",
  },
  {
    title: "Portfolio Website",
    description: "This very portfolio website you're viewing right now, inspired by macOS desktop interface and built with Next.js and Radix UI.",
    tags: ["Next.js", "TypeScript", "Radix UI", "TailwindCSS", "Framer Motion"],
    image: "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    link: "https://github.com/eshanroy/portfolio",
    demoLink: "#",
  },
];

// Education
export const EDUCATION = [
  {
    institution: "University Of The People",
    degree: "Assoc. Bsc in Computer Science",
    period: "2022 - 2025",
    description: "Specialized in Artificial Intelligence and Web Technologies. Graduated with honors.",
  },
  {
    institution: "Lovely Professional University",
    degree: "Bachelor of Technology in Aerospace Engineering",
    period: "2019 - 2024",
    description: "Core courses included Thermal Engineering, Fluid Mechanics, Structural Analysis, and Aerospace Dynamics.",
  },
];

// Experience
export const EXPERIENCE = [
  {
    company: "Tonmoy Infrastructure & Vision",
    position: "Chief Executive Officer",
    period: "2025 - Present",
    description: "Lead the company in providing innovative solutions in the field of infrastructure and vision.",
  },
];

// Desktop applications
export const DESKTOP_APPS = [
  {
    id: "about",
    title: "About Me",
    icon: Terminal,
    defaultSize: { width: 700, height: 500 },
    defaultPosition: { x: 100, y: 100 },
  },
  {
    id: "projects",
    title: "Projects",
    icon: Code,
    defaultSize: { width: 800, height: 600 },
    defaultPosition: { x: 150, y: 120 },
  },
  {
    id: "skills",
    title: "Skills",
    icon: Laptop,
    defaultSize: { width: 650, height: 550 },
    defaultPosition: { x: 200, y: 140 },
  },
  {
    id: "experience",
    title: "Experience",
    icon: BookOpen,
    defaultSize: { width: 700, height: 500 },
    defaultPosition: { x: 250, y: 160 },
  },
  {
    id: "education",
    title: "Education",
    icon: GraduationCap,
    defaultSize: { width: 650, height: 400 },
    defaultPosition: { x: 300, y: 180 },
  },
  {
    id: "contact",
    title: "Contact",
    icon: Mail,
    defaultSize: { width: 600, height: 450 },
    defaultPosition: { x: 350, y: 200 },
  },
  {
    id: "settings",
    title: "System Settings",
    icon: Settings,
    defaultSize: { width: 800, height: 600 },
    defaultPosition: { x: 200, y: 150 },
  },
  {
    id: "app-store",
    title: "App Store",
    icon: AppWindow,
    defaultSize: { width: 900, height: 650 },
    defaultPosition: { x: 150, y: 100 },
  },
  {
    id: "finder",
    title: "Finder",
    icon: FolderOpen,
    defaultSize: { width: 800, height: 500 },
    defaultPosition: { x: 120, y: 110 },
  },
  {
    id: "calendar",
    title: "Calendar",
    icon: Calendar,
    defaultSize: { width: 900, height: 600 },
    defaultPosition: { x: 180, y: 130 },
  },
  {
    id: "messages",
    title: "Messages",
    icon: MessagesSquare,
    defaultSize: { width: 750, height: 550 },
    defaultPosition: { x: 220, y: 150 },
  },
  {
    id: "notes",
    title: "Notes",
    icon: StickyNote,
    defaultSize: { width: 700, height: 500 },
    defaultPosition: { x: 250, y: 170 },
  },
  {
    id: "safari",
    title: "Safari",
    icon: Globe,
    defaultSize: { width: 900, height: 600 },
    defaultPosition: { x: 130, y: 120 },
  },
  {
    id: "mail",
    title: "Mail",
    icon: Mail,
    defaultSize: { width: 850, height: 600 },
    defaultPosition: { x: 160, y: 140 },
  },
  {
    id: "music",
    title: "Music",
    icon: Music,
    defaultSize: { width: 900, height: 650 },
    defaultPosition: { x: 190, y: 160 },
  },
  {
    id: "maps",
    title: "Maps",
    icon: Map,
    defaultSize: { width: 900, height: 650 },
    defaultPosition: { x: 210, y: 130 },
  },
  {
    id: "photos",
    title: "Photos",
    icon: Image,
    defaultSize: { width: 850, height: 600 },
    defaultPosition: { x: 240, y: 150 },
  },
  {
    id: "terminal",
    title: "Terminal",
    icon: Terminal,
    defaultSize: { width: 700, height: 500 },
    defaultPosition: { x: 270, y: 180 },
  },
];

// Desktop notes about different app interfaces
export const DESKTOP_NOTES = [
  {
    id: "safari-note",
    title: "Safari Features",
    type: "note" as const,
    content: `Safari App Features:

• Fully functional tabbed browsing interface
• Address bar with site information
• Bookmarks bar with popular bookmarks
• Forward, backward, and reload navigation
• Tab management - add, close, and switch tabs
• Visual loading indicator during page transitions

This component demonstrates responsive UI design and state management for web browser simulation.`,
    position: { x: 20, y: 100 },
  },
  {
    id: "mail-note",
    title: "Mail App",
    type: "note" as const,
    content: `Mail App Features:

• Three-panel email interface (folders, inbox, email content)
• Email folders with unread counts
• Realistic email preview list with metadata
• Full email viewer with sender information
• Email actions (reply, forward, delete)
• Attachment display and management
• Compose new message modal

The Mail app demonstrates complex layout structure and data organization.`,
    position: { x: 20, y: 190 },
  },
  {
    id: "finder-note",
    title: "Finder App",
    type: "note" as const,
    content: `Finder App Features:

• Authentic macOS file browser experience
• Sidebar with favorites, devices, and tags
• Multiple view options (grid, list views)
• File and folder navigation
• File info display and actions
• Breadcrumb navigation and search
• Forward/back navigation

This component showcases file system UI patterns and navigation paradigms.`,
    position: { x: 20, y: 280 },
  },
  {
    id: "photos-note",
    title: "Photos App",
    type: "note" as const,
    content: `Photos App Features:

• Photo library with albums and collections
• Media organization by time and location
• Photo viewer with metadata display
• Support for viewing photo details
• Image navigation with prev/next controls
• Grid and list view options
• Filter and search functionality

The Photos app demonstrates media management and presentation techniques.`,
    position: { x: 20, y: 370 },
  },
  {
    id: "messages-note",
    title: "Messages App",
    type: "note" as const,
    content: `Messages App Features:

• Contact list with online status
• Conversation history and threading
• Message bubbles with timestamps
• Typing indicators and read receipts
• Message composition with emoji support
• Group conversation support
• Attachment and media sharing

This component demonstrates real-time communication interface patterns.`,
    position: { x: 120, y: 100 },
  },
  {
    id: "maps-note",
    title: "Maps App",
    type: "note" as const,
    content: `Maps App Features:

• Interactive map with location search
• Multiple map view types (standard, satellite, transit)
• Location details with metadata
• Turn-by-turn directions
• Route planning with transportation options
• Saved locations and favorites
• Distance and ETA calculations

The Maps app demonstrates geospatial interface design and navigation.`,
    position: { x: 120, y: 190 },
  },
  {
    id: "terminal-note",
    title: "Terminal App",
    type: "note" as const,
    content: `Terminal App Features:

• Authentic command line interface
• Working command history and navigation
• Common Unix commands (ls, cat, pwd, etc.)
• Custom commands and responses
• Copy/paste functionality
• Configurable theme, font, and size
• Keyboard shortcuts support

This component demonstrates command line UI patterns and text processing.`,
    position: { x: 120, y: 280 },
  },
  {
    id: "music-note",
    title: "Music App",
    type: "note" as const,
    content: `Music App Features:

• Music library with albums and playlists
• Media player with transport controls
• Now playing information display
• Playlist management and creation
• Search and filter capabilities
• Like/favorite functionality
• Volume and playback settings

The Music app demonstrates media playback interfaces and audio control patterns.`,
    position: { x: 120, y: 370 },
  }
];

// Terminal commands for About app
export const TERMINAL_COMMANDS = {
  help: "Available commands: about, skills, projects, contact, social, clear, help",
  about: PERSONAL_INFO.about,
  skills: "My technical skills include:\n\n" + 
    Object.entries(SKILLS)
      .map(([category, skills]) => 
        `${category}:\n${skills.map(skill => `- ${skill.name}: ${skill.proficiency}%`).join('\n')}`)
      .join('\n\n'),
  projects: "Some of my notable projects:\n\n" + 
    PROJECTS.map(project => `- ${project.title}: ${project.description}`).join('\n\n'),
  contact: `You can reach me at:\nEmail: ${PERSONAL_INFO.email}\nOr use the Contact app to send a message directly.`,
  social: "Find me on:\n" + 
    SOCIAL_LINKS.map(link => `- ${link.name}: ${link.url}`).join('\n'),
  clear: "Clearing terminal...",
  unknown: "Command not found. Type 'help' to see available commands.",
};