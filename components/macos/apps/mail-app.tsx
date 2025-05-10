"use client";

import { useState } from 'react';
import Image from 'next/image';
import { 
  Search, 
  Plus, 
  Trash, 
  Star, 
  Reply, 
  MoreHorizontal,
  Folder,
  ArrowDown,
  Flag,
  Clock,
  Archive,
  User,
  Mail,
  ChevronRight,
  Forward,
  Paperclip,
  X,
  Heart
} from 'lucide-react';
import { PERSONAL_INFO } from '@/lib/constants';
import { motion } from 'framer-motion';

// Email type
type Email = {
  id: string;
  from: {
    name: string;
    email: string;
    avatar?: string;
  };
  to: {
    name: string;
    email: string;
  };
  subject: string;
  content: string;
  date: Date;
  read: boolean;
  starred: boolean;
  flagged: boolean;
  folder: string;
  attachments?: {
    name: string;
    size: string;
    type: string;
  }[];
};

// Special love emails
const loveEmails: Email[] = [
  {
    id: 'l1',
    from: {
      name: 'Your Secret Admirer',
      email: 'admirer@heart.com',
      avatar: '❤️'
    },
    to: {
      name: PERSONAL_INFO.name,
      email: PERSONAL_INFO.email
    },
    subject: 'Thinking of you today',
    content: `<p>My dearest,</p>
<p>Just wanted to send a quick note to let you know you're on my mind today. Your smile brightens even my darkest days.</p>
<p>Can't wait to see you again soon!</p>
<p>With all my love,<br>Your Secret Admirer</p>
<p>P.S. I've been planning a little surprise for you...</p>`,
    date: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
    read: false,
    starred: true,
    flagged: true,
    folder: 'inbox'
  },
  {
    id: 'l2',
    from: {
      name: 'Date Night Planner',
      email: 'dates@romance.com',
      avatar: '🌹'
    },
    to: {
      name: PERSONAL_INFO.name,
      email: PERSONAL_INFO.email
    },
    subject: 'Your Romantic Evening is Confirmed!',
    content: `<p>Dear ${PERSONAL_INFO.name},</p>
<p>Your reservation for two has been confirmed for this Saturday at 8:00 PM at La Belle Lune restaurant.</p>
<p>We've arranged for the special corner table with a view that you requested, and the chef has been notified of your special dietary preferences.</p>
<p>A bouquet of roses will be waiting at your table, and the pianist has been informed of your song request.</p>
<p>We look forward to helping you create a magical evening!</p>
<p>Warm regards,<br>The Date Night Team</p>`,
    date: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    read: true,
    starred: true,
    flagged: false,
    folder: 'inbox',
    attachments: [
      {
        name: 'Reservation_Details.pdf',
        size: '850 KB',
        type: 'application/pdf'
      }
    ]
  },
  {
    id: 'l3',
    from: {
      name: 'Love Quotes Daily',
      email: 'quotes@lovequotes.com',
      avatar: '💌'
    },
    to: {
      name: PERSONAL_INFO.name,
      email: PERSONAL_INFO.email
    },
    subject: 'Your Daily Dose of Love',
    content: `<p>Hello romantic soul,</p>
<p>Here's your daily love quote to brighten your day:</p>
<p style="font-style: italic; font-size: 18px; color: #d63384; text-align: center; padding: 15px 0;">"In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine." — Maya Angelou</p>
<p>May this quote remind you of the special love you share with someone special.</p>
<p>With love,<br>Love Quotes Daily</p>`,
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    read: true,
    starred: false,
    flagged: false,
    folder: 'inbox'
  },
  {
    id: 'l4',
    from: {
      name: 'Anniversary Reminder',
      email: 'reminders@lovekeeper.com',
      avatar: '🎁'
    },
    to: {
      name: PERSONAL_INFO.name,
      email: PERSONAL_INFO.email
    },
    subject: 'Special Day Coming Up!',
    content: `<p>Hi there,</p>
<p>This is a friendly reminder that your special anniversary is coming up in just two weeks!</p>
<p>Don't forget to plan something special for your significant other. Need ideas? Here are a few suggestions:</p>
<ul>
  <li>A romantic dinner at your favorite restaurant</li>
  <li>A weekend getaway to somewhere you've both wanted to visit</li>
  <li>A thoughtful gift that recalls a special memory you share</li>
  <li>A handwritten letter expressing your feelings</li>
</ul>
<p>Whatever you choose, remember that it's the thought and love behind it that matters most.</p>
<p>Best wishes,<br>Your Anniversary Reminder Service</p>`,
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    read: false,
    starred: true,
    flagged: true,
    folder: 'inbox'
  }
];

// Folder type
type Folder = {
  id: string;
  name: string;
  icon: React.ReactNode;
  count?: number;
  special?: boolean;
};

interface MailAppProps {
  specialUser?: string;
}

export default function MailApp({ specialUser }: MailAppProps = {}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('inbox');
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  const [showComposeEmail, setShowComposeEmail] = useState(false);
  const isSnigdha = specialUser === 'snigdha';
  
  // Sample folders
  const folders: Folder[] = [
    { 
      id: 'inbox', 
      name: 'Inbox', 
      icon: <Mail className="w-4 h-4" />, 
      count: isSnigdha ? 4 : 5,
      special: true
    },
    { 
      id: 'starred', 
      name: 'Starred', 
      icon: <Star className="w-4 h-4" />,
      special: true
    },
    { 
      id: 'flagged', 
      name: 'Flagged', 
      icon: <Flag className="w-4 h-4" />,
      special: true
    },
    { 
      id: 'sent', 
      name: 'Sent', 
      icon: <ArrowDown className="w-4 h-4 rotate-180" />,
      special: true
    },
    { 
      id: 'drafts', 
      name: 'Drafts', 
      icon: <Clock className="w-4 h-4" />,
      count: 2,
      special: true
    },
    { 
      id: 'archive', 
      name: 'Archive', 
      icon: <Archive className="w-4 h-4" />,
      special: true
    },
    { 
      id: 'trash', 
      name: 'Trash', 
      icon: <Trash className="w-4 h-4" />,
      special: true
    },
    { id: 'work', name: 'Work', icon: <Folder className="w-4 h-4" /> },
    { id: 'personal', name: 'Personal', icon: <Folder className="w-4 h-4" /> },
    { id: 'important', name: 'Important', icon: <Folder className="w-4 h-4" /> },
  ];
  
  // Sample emails
  const regularEmails: Email[] = [
    {
      id: 'e1',
      from: {
        name: 'GitHub',
        email: 'noreply@github.com',
        avatar: 'G'
      },
      to: {
        name: PERSONAL_INFO.name,
        email: PERSONAL_INFO.email
      },
      subject: 'Action required: Please verify your email address',
      content: `<p>Hello ${PERSONAL_INFO.name},</p>
<p>We noticed a recent sign-in to your GitHub account from a new location. To ensure account security, please verify your email address by clicking the button below.</p>
<p>If you did not attempt to sign in to your GitHub account, please change your password immediately and enable two-factor authentication.</p>
<p>Best regards,<br>The GitHub Team</p>`,
      date: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
      read: false,
      starred: true,
      flagged: false,
      folder: 'inbox'
    },
    {
      id: 'e2',
      from: {
        name: 'LinkedIn',
        email: 'messages-noreply@linkedin.com',
        avatar: 'L'
      },
      to: {
        name: PERSONAL_INFO.name,
        email: PERSONAL_INFO.email
      },
      subject: 'New connection request',
      content: `<p>Hi ${PERSONAL_INFO.name},</p>
<p>You have received a new connection request from Sarah Johnson, Senior Frontend Developer at Tech Solutions Inc.</p>
<p>Sarah Johnson says: "I was impressed by your portfolio and would love to connect!"</p>
<p>Accept or ignore this request by visiting your LinkedIn notifications.</p>
<p>Regards,<br>The LinkedIn Team</p>`,
      date: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      read: true,
      starred: false,
      flagged: true,
      folder: 'inbox'
    },
    {
      id: 'e3',
      from: {
        name: 'Alex Taylor',
        email: 'alex.taylor@company.com',
        avatar: 'A'
      },
      to: {
        name: PERSONAL_INFO.name,
        email: PERSONAL_INFO.email
      },
      subject: 'Project proposal feedback',
      content: `<p>Hey ${PERSONAL_INFO.name.split(' ')[0]},</p>
<p>I've reviewed the project proposal you sent over and I'm really impressed with your ideas. The technical approach seems solid and the timeline is reasonable.</p>
<p>I've attached some notes with a few minor suggestions, but overall, I think we should move forward with this. Could we schedule a call later this week to discuss the next steps?</p>
<p>Let me know what works for you.</p>
<p>Best,<br>Alex</p>`,
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      read: true,
      starred: true,
      flagged: false,
      folder: 'work',
      attachments: [
        {
          name: 'Project_Feedback.pdf',
          size: '1.2 MB',
          type: 'application/pdf'
        }
      ]
    },
    {
      id: 'e4',
      from: {
        name: 'Jessica Lee',
        email: 'jessica.lee@example.com',
        avatar: 'J'
      },
      to: {
        name: PERSONAL_INFO.name,
        email: PERSONAL_INFO.email
      },
      subject: 'Coffee next week?',
      content: `<p>Hi ${PERSONAL_INFO.name.split(' ')[0]},</p>
<p>It's been a while since we caught up! I'd love to grab coffee next week if you're free. I've been working on some interesting projects lately and would love to hear what you've been up to as well.</p>
<p>How does Tuesday or Thursday afternoon work for you?</p>
<p>Cheers,<br>Jessica</p>`,
      date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
      read: true,
      starred: false,
      flagged: false,
      folder: 'personal'
    },
    {
      id: 'e5',
      from: {
        name: 'Newsletter',
        email: 'newsletter@tech-weekly.com',
        avatar: 'N'
      },
      to: {
        name: PERSONAL_INFO.name,
        email: PERSONAL_INFO.email
      },
      subject: 'This Week in Tech: Latest Updates and Trends',
      content: `<p>Hello tech enthusiasts,</p>
<p>Here are this week's top stories in the world of technology:</p>
<ul>
  <li>New Framework Released: The popular JavaScript framework just got a major update</li>
  <li>AI Breakthrough: Researchers announce significant progress in natural language processing</li>
  <li>Industry Moves: Big tech companies announce strategic partnership</li>
  <li>Open Source Spotlight: Five projects to watch this month</li>
</ul>
<p>Read the full articles on our website.</p>
<p>Tech Weekly Team</p>`,
      date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
      read: false,
      starred: false,
      flagged: false,
      folder: 'inbox'
    }
  ];
  
  // Use the appropriate emails based on specialUser status
  const emails = isSnigdha ? loveEmails : regularEmails;
  
  // Filter emails based on search query and selected folder
  const getFilteredEmails = () => {
    let filtered = emails;
    
    // Filter by folder
    if (selectedFolder === 'inbox') {
      filtered = filtered.filter(email => email.folder === 'inbox');
    } else if (selectedFolder === 'starred') {
      filtered = filtered.filter(email => email.starred);
    } else if (selectedFolder === 'flagged') {
      filtered = filtered.filter(email => email.flagged);
    } else if (selectedFolder === 'sent') {
      filtered = filtered.filter(email => email.folder === 'sent');
    } else {
      filtered = filtered.filter(email => email.folder === selectedFolder);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(email => 
        email.subject.toLowerCase().includes(query) ||
        email.from.name.toLowerCase().includes(query) ||
        email.content.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  };
  
  const filteredEmails = getFilteredEmails();
  
  // Get currently selected email
  const activeEmail = emails.find(email => email.id === selectedEmail);
  
  // Format date for display
  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      // Today - show time
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays < 7) {
      // Within a week - show day name
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      // Older - show date
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };
  
  // Mark email as read when selected
  const handleSelectEmail = (id: string) => {
    setSelectedEmail(id);
    // In a real app, would update the read status in the database
  };
  
  // Toggle star/flag status
  const toggleStar = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    // In a real app, would update the star status in the database
  };
  
  const toggleFlag = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    // In a real app, would update the flag status in the database
  };
  
  return (
    <div className="h-full flex bg-background">
      {/* Sidebar */}
      <div className="w-48 border-r flex flex-col">
        {/* New Email button */}
        <div className="p-3">
          <button 
            className="w-full py-1.5 px-3 bg-primary text-primary-foreground rounded-md flex items-center justify-center text-sm"
            onClick={() => setShowComposeEmail(true)}
          >
            <Plus className="w-4 h-4 mr-1" />
            New Message
          </button>
        </div>
        
        {/* Folders */}
        <div className="flex-1 overflow-y-auto p-2">
          <div className="mb-4">
            {folders
              .filter(folder => folder.special)
              .map(folder => (
                <div 
                  key={folder.id}
                  className={`flex items-center justify-between py-1 px-2 rounded text-sm cursor-pointer ${
                    selectedFolder === folder.id ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/30'
                  }`}
                  onClick={() => setSelectedFolder(folder.id)}
                >
                  <div className="flex items-center">
                    <span className="w-5 h-5 flex items-center justify-center mr-2">
                      {folder.icon}
                    </span>
                    <span>{folder.name}</span>
                  </div>
                  {folder.count !== undefined && folder.count > 0 && (
                    <span className="text-xs bg-primary/20 text-primary rounded-full px-1.5">
                      {folder.count}
                    </span>
                  )}
                </div>
              ))
            }
          </div>
          
          <div className="mb-2 text-xs font-medium text-muted-foreground uppercase pl-2">
            Folders
          </div>
          
          {folders
            .filter(folder => !folder.special)
            .map(folder => (
              <div 
                key={folder.id}
                className={`flex items-center py-1 px-2 rounded text-sm cursor-pointer ${
                  selectedFolder === folder.id ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/30'
                }`}
                onClick={() => setSelectedFolder(folder.id)}
              >
                <span className="w-5 h-5 flex items-center justify-center mr-2">
                  {folder.icon}
                </span>
                <span>{folder.name}</span>
              </div>
            ))
          }
        </div>
      </div>
      
      {/* Email list */}
      <div className="w-64 border-r flex flex-col">
        <div className="p-2 border-b bg-muted/30 backdrop-blur-sm">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-muted rounded-md pl-8 pr-3 py-1.5 text-sm"
            />
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {filteredEmails.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <Mail className="w-10 h-10 mb-2 opacity-20" />
              <p className="text-sm">No emails found</p>
            </div>
          ) : (
            filteredEmails.map(email => (
              <div
                key={email.id}
                className={`p-3 border-b cursor-pointer ${
                  selectedEmail === email.id ? 'bg-accent/20' : email.read ? 'hover:bg-accent/10' : 'bg-primary/5 hover:bg-primary/10 font-medium'
                }`}
                onClick={() => handleSelectEmail(email.id)}
              >
                <div className="flex justify-between items-start mb-1">
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs mr-2">
                      {email.from.avatar}
                    </div>
                    <h3 className="text-sm truncate max-w-[140px]">{email.from.name}</h3>
                  </div>
                  <span className="text-xs text-muted-foreground flex-shrink-0">
                    {formatDate(email.date)}
                  </span>
                </div>
                <h4 className="text-sm mb-1 line-clamp-1">{email.subject}</h4>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {email.content.replace(/<[^>]*>/g, ' ')}
                  </p>
                  <div className="flex items-center">
                    {email.attachments && (
                      <Paperclip className="w-3 h-3 text-muted-foreground mr-1" />
                    )}
                    <button onClick={(e) => toggleStar(email.id, e)}>
                      <Star className={`w-3 h-3 ${email.starred ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground'}`} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      {/* Email content */}
      {activeEmail ? (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Email header */}
          <div className="p-4 border-b flex flex-col">
            <div className="flex justify-between items-start mb-3">
              <h2 className="text-lg font-medium">{activeEmail.subject}</h2>
              <div className="flex items-center space-x-1">
                <button className="p-1.5 rounded-full hover:bg-accent/30">
                  <Reply className="w-4 h-4" />
                </button>
                <button className="p-1.5 rounded-full hover:bg-accent/30">
                  <Forward className="w-4 h-4" />
                </button>
                <button className="p-1.5 rounded-full hover:bg-accent/30">
                  <Trash className="w-4 h-4" />
                </button>
                <button className="p-1.5 rounded-full hover:bg-accent/30">
                  <Flag className={`w-4 h-4 ${activeEmail.flagged ? 'text-red-500 fill-red-500' : ''}`} />
                </button>
                <button className="p-1.5 rounded-full hover:bg-accent/30">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-accent/50 flex items-center justify-center text-lg mr-3">
                {activeEmail.from.avatar}
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium">{activeEmail.from.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {activeEmail.from.email}
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {activeEmail.date.toLocaleString([], {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
                <div className="mt-1 text-sm">
                  <span className="text-muted-foreground">To:</span> {activeEmail.to.name} &lt;{activeEmail.to.email}&gt;
                </div>
              </div>
            </div>
          </div>
          
          {/* Email body */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: activeEmail.content }}></div>
            
            {/* Attachments */}
            {activeEmail.attachments && activeEmail.attachments.length > 0 && (
              <div className="mt-6 pt-6 border-t">
                <h4 className="text-sm font-medium mb-3">Attachments</h4>
                <div className="flex flex-wrap gap-2">
                  {activeEmail.attachments.map((attachment, index) => (
                    <div key={index} className="p-3 bg-muted rounded-lg flex items-start">
                      <div className="w-10 h-10 bg-accent/30 rounded flex items-center justify-center mr-3">
                        <Paperclip className="w-5 h-5 text-accent-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{attachment.name}</p>
                        <p className="text-xs text-muted-foreground">{attachment.size}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-muted-foreground">
          <div className="text-center">
            <Mail className="w-16 h-16 mx-auto mb-4 opacity-20" />
            <h2 className="text-xl font-medium mb-2">No Email Selected</h2>
            <p className="text-sm max-w-md">
              Select an email from the list to view its contents, or compose a new message.
            </p>
          </div>
        </div>
      )}
      
      {/* Compose email modal - would be implemented in a real app */}
      {showComposeEmail && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background w-3/4 max-w-2xl rounded-lg shadow-xl p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">New Message</h3>
              <button 
                className="p-1 rounded-full hover:bg-accent/30"
                onClick={() => setShowComposeEmail(false)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center border-b pb-2">
                <span className="w-20 text-sm text-muted-foreground">To:</span>
                <input 
                  type="text" 
                  className="flex-1 bg-transparent border-none outline-none"
                  placeholder="Recipients"
                />
              </div>
              
              <div className="flex items-center border-b pb-2">
                <span className="w-20 text-sm text-muted-foreground">Subject:</span>
                <input 
                  type="text" 
                  className="flex-1 bg-transparent border-none outline-none"
                  placeholder="Subject"
                />
              </div>
              
              <div className="min-h-[200px] max-h-[400px] overflow-y-auto">
                <textarea 
                  className="w-full h-full p-2 bg-transparent border-none outline-none resize-none"
                  placeholder="Compose your email..."
                ></textarea>
              </div>
              
              <div className="flex justify-between">
                <div>
                  <button className="p-2 hover:bg-accent/30 rounded">
                    <Paperclip className="w-5 h-5" />
                  </button>
                </div>
                <div>
                  <button 
                    className="px-4 py-2 bg-primary text-primary-foreground rounded"
                    onClick={() => setShowComposeEmail(false)}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 