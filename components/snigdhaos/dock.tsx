"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DivideIcon, 
  Folder, FolderOpen, File, ChevronRight, 
  Calendar, Clock, BellRing, 
  Plus, Send, Users, Video, Phone,
  Edit, Bold, Italic, Underline, Image, ListChecks
} from 'lucide-react';
import { 
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
} from "@/components/ui/context-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { DESKTOP_APPS } from '@/lib/constants';
import { useWindowManager } from './window-context';

// macOS Dock App Icons as SVG components
const FinderIcon = () => (
  <svg viewBox="0 0 1024 1024" className="w-12 h-12">
    <defs>
      <linearGradient id="finder-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2AC3FF" />
        <stop offset="100%" stopColor="#0164F5" />
      </linearGradient>
      <linearGradient id="finder-shine" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </linearGradient>
    </defs>
    <g>
      <rect width="1024" height="1024" rx="225" fill="url(#finder-gradient)" />
      <rect width="1024" height="400" rx="225" fill="url(#finder-shine)" opacity="0.4" />
      <path d="M512 252C379 252 312 365 312 365C312 365 310 369 315 371C378 398 450 412 512 412C574 412 646 398 709 371C714 369 712 365 712 365C712 365 645 252 512 252Z" fill="white" />
      <path d="M325 653C325 791 405 772 512 772C619 772 699 791 699 653C699 653 695 651 693 651.5C635 681 570 697 512 697C454 697 389 681 331 651.5C329 651 325 653 325 653Z" fill="white" />
    </g>
  </svg>
);

const SafariIcon = () => (
  <svg viewBox="0 0 24 24" className="w-12 h-12" xmlns="http://www.w3.org/2000/svg">
    <g>
      <linearGradient gradientUnits="userSpaceOnUse" id="SVGID_1_" x1="12" x2="12" y1="0.5" y2="23.5">
        <stop offset="0" style={{stopColor:"#15BEF0"}}/>
        <stop offset="0.155213" style={{stopColor:"#18B2E8"}}/>
        <stop offset="0.4323524" style={{stopColor:"#2094D2"}}/>
        <stop offset="0.7966607" style={{stopColor:"#2E62AF"}}/>
        <stop offset="1" style={{stopColor:"#374499"}}/>
      </linearGradient>
      <circle cx="12" cy="12" fill="url(#SVGID_1_)" r="11.5"/>
      <linearGradient gradientUnits="userSpaceOnUse" id="SVGID_2_" x1="12" x2="20.1317215" y1="12" y2="20.1317215">
        <stop offset="0" style={{stopColor:"#000000", stopOpacity:"0.1"}}/>
        <stop offset="1" style={{stopColor:"#000000", stopOpacity:"0"}}/>
      </linearGradient>
      <path d="M23.5,12c0-0.9956055-0.1397705-1.9563599-0.3776245-2.8776245L19,5l-5.5,8.5L5,19l4.1223755,4.1223755C10.0437012,23.3602295,11.0043945,23.5,12,23.5C18.3512573,23.5,23.5,18.3512573,23.5,12z" fill="url(#SVGID_2_)"/>
      <path d="M12,24C5.3828125,24,0,18.6166992,0,12S5.3828125,0,12,0s12,5.3833008,12,12S18.6171875,24,12,24z M12,1C5.9345703,1,1,5.9345703,1,12s4.9345703,11,11,11s11-4.9345703,11-11S18.0654297,1,12,1z" fill="#F2F2F2"/>
      <polygon fill="#EF373E" points="19,5 10.5,10.5 13.5,13.5"/>
      <polygon opacity="0.1" points="19,5 12,12 13.5,13.5"/>
      <polygon fill="#FFFFFF" points="4.9999986,18.9999981 13.499999,13.499999 10.499999,10.499999"/>
      <polygon opacity="0.1" points="4.9999986,18.9999981 11.999999,11.999999 13.5,13.5"/>
      <path d="M12,23.75c-5.4144835,0-10.0010967-3.5623417-11.5193195-8.4773369c-0.11311-0.3661747-0.209189-0.7398577-0.2873104-1.1201344c0.0572594,0.3174276,0.1269963,0.6304893,0.2086847,0.9386606C1.762589,20.2238407,6.4384174,24,12,24c5.4323578,0,10.0144463-3.5743637,11.4917545-8.5204544c0.1259518-0.4216919,0.2293358-0.8533554,0.308754-1.2936239c-0.0704193,0.342782-0.155405,0.6800756-0.254282,1.0112286C22.063055,20.1644802,17.4542561,23.75,12,23.75z" opacity="0.1"/>
      <path d="M12,0.25c5.4057007,0,9.9801025,3.5333252,11.5174561,8.4031372C22.0674438,3.6561279,17.4645996,0,12,0S1.9325562,3.6561279,0.4825439,8.6531372C2.0198975,3.7833252,6.5942993,0.25,12,0.25z" fill="#FFFFFF" opacity="0.2"/>
      <linearGradient gradientUnits="userSpaceOnUse" id="SVGID_3_" x1="1.1217111" x2="22.8782883" y1="6.9273705" y2="17.0726299">
        <stop offset="0" style={{stopColor:"#FFFFFF", stopOpacity:"0.2"}}/>
        <stop offset="1" style={{stopColor:"#FFFFFF", stopOpacity:"0"}}/>
      </linearGradient>
      <circle cx="12" cy="12" fill="url(#SVGID_3_)" r="12"/>
    </g>
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 1024 1024" className="w-12 h-12">
    <defs>
      <linearGradient id="mail-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#57ABFF" />
        <stop offset="100%" stopColor="#0061FF" />
      </linearGradient>
      <linearGradient id="mail-shine" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </linearGradient>
    </defs>
    <g>
      <rect width="1024" height="1024" rx="225" fill="url(#mail-gradient)" />
      <rect width="1024" height="400" rx="225" fill="url(#mail-shine)" opacity="0.4" />
      <path d="M230 390V634C230 672 260 702 298 702H726C764 702 794 672 794 634V390C794 352 764 322 726 322H298C260 322 230 352 230 390ZM726 390L512 512L298 390H726ZM298 448.5V634L409 553.5L298 448.5ZM448.5 576L494 604C501 609 507 611 512 611C517 611 523 609 530 604L576 576L726 702H298L448.5 576ZM615 553.5L726 634V448.5L615 553.5Z" fill="white" />
    </g>
  </svg>
);

const MusicIcon = () => (
  <svg viewBox="0 0 361 361" className="w-12 h-12" xmlns="http://www.w3.org/2000/svg">
    <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="180" y1="358.6047" x2="180" y2="7.7586">
      <stop offset="0" style={{stopColor:"#FA233B"}}/>
      <stop offset="1" style={{stopColor:"#FB5C74"}}/>
    </linearGradient>
    <path className="st0" d="M360,112.61c0-4.3,0-8.6-0.02-12.9c-0.02-3.62-0.06-7.24-0.16-10.86c-0.21-7.89-0.68-15.84-2.08-23.64
      c-1.42-7.92-3.75-15.29-7.41-22.49c-3.6-7.07-8.3-13.53-13.91-19.14c-5.61-5.61-12.08-10.31-19.15-13.91
      c-7.19-3.66-14.56-5.98-22.47-7.41c-7.8-1.4-15.76-1.87-23.65-2.08c-3.62-0.1-7.24-0.14-10.86-0.16C255.99,0,251.69,0,247.39,0
      H112.61c-4.3,0-8.6,0-12.9,0.02c-3.62,0.02-7.24,0.06-10.86,0.16C80.96,0.4,73,0.86,65.2,2.27c-7.92,1.42-15.28,3.75-22.47,7.41
      c-7.07,3.6-13.54,8.3-19.15,13.91c-5.61,5.61-10.31,12.07-13.91,19.14c-3.66,7.2-5.99,14.57-7.41,22.49
      c-1.4,7.8-1.87,15.76-2.08,23.64c-0.1,3.62-0.14,7.24-0.16,10.86C0,104.01,0,108.31,0,112.61v134.77c0,4.3,0,8.6,0.02,12.9
      c0.02,3.62,0.06,7.24,0.16,10.86c0.21,7.89,0.68,15.84,2.08,23.64c1.42,7.92,3.75,15.29,7.41,22.49c3.6,7.07,8.3,13.53,13.91,19.14
      c5.61,5.61,12.08,10.31,19.15,13.91c7.19,3.66,14.56,5.98,22.47,7.41c7.8,1.4,15.76,1.87,23.65,2.08c3.62,0.1,7.24,0.14,10.86,0.16
      c4.3,0.03,8.6,0.02,12.9,0.02h134.77c4.3,0,8.6,0,12.9-0.02c3.62-0.02,7.24-0.06,10.86-0.16c7.89-0.21,15.85-0.68,23.65-2.08
      c7.92-1.42,15.28-3.75,22.47-7.41c7.07-3.6,13.54-8.3,19.15-13.91c5.61-5.61,10.31-12.07,13.91-19.14
      c3.66-7.2,5.99-14.57,7.41-22.49c1.4-7.8,1.87-15.76,2.08-23.64c0.1-3.62,0.14-7.24,0.16-10.86c0.03-4.3,0.02-8.6,0.02-12.9V112.61
      z" fill="url(#SVGID_1_)"/>
    <path className="st1" d="M254.5,55c-0.87,0.08-8.6,1.45-9.53,1.64l-107,21.59l-0.04,0.01c-2.79,0.59-4.98,1.58-6.67,3
      c-2.04,1.71-3.17,4.13-3.6,6.95c-0.09,0.6-0.24,1.82-0.24,3.62c0,0,0,109.32,0,133.92c0,3.13-0.25,6.17-2.37,8.76
      c-2.12,2.59-4.74,3.37-7.81,3.99c-2.33,0.47-4.66,0.94-6.99,1.41c-8.84,1.78-14.59,2.99-19.8,5.01
      c-4.98,1.93-8.71,4.39-11.68,7.51c-5.89,6.17-8.28,14.54-7.46,22.38c0.7,6.69,3.71,13.09,8.88,17.82
      c3.49,3.2,7.85,5.63,12.99,6.66c5.33,1.07,11.01,0.7,19.31-0.98c4.42-0.89,8.56-2.28,12.5-4.61c3.9-2.3,7.24-5.37,9.85-9.11
      c2.62-3.75,4.31-7.92,5.24-12.35c0.96-4.57,1.19-8.7,1.19-13.26l0-116.15c0-6.22,1.76-7.86,6.78-9.08c0,0,88.94-17.94,93.09-18.75
      c5.79-1.11,8.52,0.54,8.52,6.61l0,79.29c0,3.14-0.03,6.32-2.17,8.92c-2.12,2.59-4.74,3.37-7.81,3.99
      c-2.33,0.47-4.66,0.94-6.99,1.41c-8.84,1.78-14.59,2.99-19.8,5.01c-4.98,1.93-8.71,4.39-11.68,7.51
      c-5.89,6.17-8.49,14.54-7.67,22.38c0.7,6.69,3.92,13.09,9.09,17.82c3.49,3.2,7.85,5.56,12.99,6.6c5.33,1.07,11.01,0.69,19.31-0.98
      c4.42-0.89,8.56-2.22,12.5-4.55c3.9-2.3,7.24-5.37,9.85-9.11c2.62-3.75,4.31-7.92,5.24-12.35c0.96-4.57,1-8.7,1-13.26V64.46
      C263.54,58.3,260.29,54.5,254.5,55z" fill="#FFFFFF"/>
  </svg>
);

const PhotosIcon = () => (
  <svg viewBox="0 0 100 100" className="w-12 h-12" xmlns="http://www.w3.org/2000/svg">
    <path d="M63.6 5c9 0 13.6 0 18.4 1.5 5.3 1.9 9.5 6.1 11.4 11.4C95 22.8 95 27.3 95 36.4v27.2c0 9 0 13.6-1.5 18.4-1.9 5.3-6.1 9.5-11.4 11.4C77.2 95 72.7 95 63.6 95H36.4c-9 0-13.6 0-18.4-1.5-5.3-2-9.5-6.2-11.5-11.5C5 77.2 5 72.7 5 63.6V36.4c0-9 0-13.6 1.5-18.4 2-5.3 6.2-9.5 11.5-11.5C22.8 5 27.3 5 36.4 5h27.2z" fill="#FFF" />
    <path d="M35.8 38c.9 0 1.7.1 2.5.3-.2-.8-.3-1.7-.3-2.5V23c0-.6.1-1.1.1-1.6-4.7-3.5-11.4-3.1-15.6 1.1s-4.6 10.9-1.1 15.6c.5-.1 1.1-.1 1.6-.1h12.8z" fill="#FF7E7B" />
    <path d="M49.2 47.7c-.6 0-1.1-.1-1.7-.2.1.5.2 1.1.2 1.7.3-.2.5-.4.8-.7.2-.3.4-.5.7-.8z" fill="#FF6F3F" />
    <path d="M48.5 31.5c.6.6 1.2 1.3 1.6 2 .5-.7 1-1.4 1.6-2l9-9c.4-.4.7-.7 1.1-1C61.2 15.6 56.1 11 50 11c-6.1 0-11.1 4.5-11.9 10.4.5.3.9.7 1.3 1.1l9.1 9z" fill="#FFAC00" />
    <path d="M51 47.7c-.3-.4-.7-.8-.9-1.3-.3.4-.6.9-.9 1.3h.8c.3.1.7 0 1 0z" fill="#FFC300" />
    <path d="M38 35.8c0 .9.1 1.7.3 2.5 4.6 1 8.2 4.6 9.2 9.2.5.1 1.1.2 1.7.2.3-.4.7-.8.9-1.3-2.5-3.9-2.5-9 0-12.9-.5-.7-1-1.4-1.6-2l-9-9c-.4-.4-.9-.8-1.3-1.1-.1.5-.2 1-.2 1.6v12.8z" fill="#FF3400" />
    <path d="M62 35.8c0 .9-.1 1.7-.3 2.5.8-.2 1.7-.3 2.5-.3H77c.6 0 1.2.1 1.8.2 3.5-4.7 3.2-11.4-1.1-15.7-4.3-4.3-11.1-4.6-15.8-1 .1.5.1 1 .1 1.5v12.8z" fill="#F0EA0D" />
    <path d="M52.3 49c0-.5.1-1 .2-1.5-.5.1-1 .2-1.5.2.2.3.5.5.7.8.2.2.4.3.6.5z" fill="#DAE411" />
    <path d="M51.7 31.5c-.6.6-1.2 1.3-1.6 2 2.5 3.9 2.5 9 0 12.9.3.4.6.9.9 1.3.5 0 1-.1 1.5-.2 1-4.6 4.6-8.2 9.2-9.2.2-.8.3-1.7.3-2.5V23c0-.5 0-1-.1-1.5-.4.3-.8.6-1.1 1l-9.1 9z" fill="#EAA200" />
    <path d="M50.1 33.5c2.5-3.9 2.5-9 0-12.9-2.5 3.9-2.5 8.9 0 12.9z" fill="#E63300" />
    <path d="M47.7 49.2c-.4.3-.8.7-1.3.9.4.3.9.6 1.3.9 0-.3.1-.7.1-1 0-.3-.1-.6-.1-.8z" fill="#F1648A" />
    <path d="M31.5 51.7c.6-.6 1.3-1.2 2-1.6-.7-.5-1.4-1-2-1.6l-9-9c-.4-.4-.8-.9-1.1-1.3C15.5 38.9 11 43.9 11 50c0 6.1 4.6 11.2 10.5 11.9.3-.4.6-.8 1-1.1l9-9.1z" fill="#E275A8" />
    <path d="M31.5 48.5c.6.6 1.3 1.2 2 1.6 3.9-2.5 9-2.5 12.9 0 .4-.3.9-.6 1.3-.9 0-.6-.1-1.1-.2-1.7-4.6-1-8.2-4.6-9.2-9.2-.8-.2-1.7-.3-2.5-.3H23c-.6 0-1.1.1-1.6.1.3.5.7.9 1.1 1.3l9 9.1z" fill="#E40017" />
    <path d="M38.3 38.3c1 4.6 4.6 8.2 9.2 9.2-1-4.6-4.6-8.2-9.2-9.2z" fill="#E60000" />
    <path d="M35.8 62c.9 0 1.7-.1 2.5-.3 1-4.6 4.6-8.2 9.2-9.2.1-.5.2-1 .2-1.5-.4-.3-.8-.7-1.3-.9-3.9 2.5-9 2.5-12.9 0-.7.5-1.4 1-2 1.6l-9 9c-.4.4-.7.7-1 1.1.5.2 1 .2 1.5.2h12.8z" fill="#9F3174" />
    <path d="M33.5 50.1c3.9 2.5 9 2.5 12.9 0-3.9-2.5-8.9-2.5-12.9 0z" fill="#9F0017" />
    <path d="M38.3 61.7c4.6-1 8.2-4.6 9.2-9.2-4.6 1-8.2 4.6-9.2 9.2z" fill="#561E5D" />
  </svg>
);

const MessagesIcon = () => (
  <svg viewBox="0 0 100 100" className="w-12 h-12" xmlns="http://www.w3.org/2000/svg">
    <linearGradient gradientTransform="matrix(60 0 0 -60 25311 44901)" gradientUnits="userSpaceOnUse" id="Background_13_" x1="-421.0169" x2="-421.0169" y1="748.2662" y2="746.7667">
      <stop offset="0" style={{stopColor:"#67FF81"}}/>
      <stop offset="1" style={{stopColor:"#01B41F"}}/>
    </linearGradient>
    <path className="st0" d="M63.6,5c9,0,13.5,0,18.4,1.5c5.3,1.9,9.5,6.1,11.4,11.4C95,22.8,95,27.4,95,36.4v27.2c0,9,0,13.5-1.5,18.4c-1.9,5.3-6.1,9.5-11.4,11.4C77.1,95,72.6,95,63.6,95H36.4c-9,0-13.5,0-18.4-1.5C12.6,91.5,8.5,87.4,6.5,82C5,77.2,5,72.7,5,63.6V36.4c0-9,0-13.5,1.5-18.4C8.5,12.7,12.6,8.5,18,6.6C22.8,5,27.3,5,36.4,5H63.6z" fill="url(#Background_13_)"/>
    <path d="M43.5,75.7c2.1,0.3,4.2,0.5,6.4,0.5c18.2,0,33-12.3,33-27.4S68.2,21.5,50,21.5c-18.2,0-33,12.3-33,27.4c0,9.9,6.3,18.5,15.7,23.3c0,0.3,0,0.6,0,1c0,2.9-4.8,6.7-4.5,6.7c4.8,0,8.2-3,10.5-3.7C40.6,75.7,41.7,75.6,43.5,75.7z" fill="#FFFFFF"/>
  </svg>
);

const MapsIcon = () => (
  <svg viewBox="0 0 1024 1024" className="w-12 h-12">
    <defs>
      <linearGradient id="maps-green" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#66D06B" />
        <stop offset="100%" stopColor="#92F28A" />
      </linearGradient>
      <linearGradient id="maps-blue" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#9CDBFF" />
        <stop offset="100%" stopColor="#E0F4FF" />
      </linearGradient>
      <linearGradient id="maps-shine" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </linearGradient>
    </defs>
    <g>
      <rect width="1024" height="1024" rx="225" fill="white" />
      <rect x="0" y="0" width="507" height="1024" fill="url(#maps-green)" />
      <rect x="507" y="0" width="517" height="1024" fill="url(#maps-blue)" />
      <path d="M440 575L790 225V775H590L440 575Z" fill="#F8D156" />
      <path d="M440 575L240 675H440L590 775H790V675L440 575Z" fill="#F5F5F5" />
      <path d="M240 675V825C240 845 256 860 276 860H396L440 675L240 675Z" fill="#DC4439" />
      <rect width="1024" height="400" rx="225" fill="url(#maps-shine)" opacity="0.2" />
      <circle cx="776" cy="299" r="85" fill="#DC4439" opacity="0.8" />
      <circle cx="776" cy="299" r="45" fill="#B92E25" />
    </g>
  </svg>
);

const TerminalIcon = () => (
  <svg viewBox="0 0 1024 1024" className="w-12 h-12">
    <defs>
      <linearGradient id="terminal-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#333333" />
        <stop offset="100%" stopColor="#111111" />
      </linearGradient>
      <linearGradient id="terminal-shine" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </linearGradient>
    </defs>
    <g>
      <rect width="1024" height="1024" rx="225" fill="url(#terminal-gradient)" />
      <rect width="1024" height="400" rx="225" fill="url(#terminal-shine)" opacity="0.1" />
      <path d="M320 384L448 512L320 640L384 704L576 512L384 320L320 384Z" fill="white" />
      <path d="M640 704H448V768H640V704Z" fill="white" />
    </g>
  </svg>
);

const SettingsIcon = () => (
  <svg viewBox="0 0 100 100" className="w-12 h-12" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient gradientTransform="matrix(60 0 0 -60 11151 37581)" gradientUnits="userSpaceOnUse" id="Background_Settings" x1="-185.0169" x2="-185.0169" y1="626.2662" y2="624.7667">
        <stop offset="0" style={{stopColor:"#D3D7DD"}}/>
        <stop offset="1" style={{stopColor:"#888C90"}}/>
      </linearGradient>
      <linearGradient gradientTransform="matrix(48.1623 0 0 -48.1543 8919.5928 30230.7695)" gradientUnits="userSpaceOnUse" id="Gear_Settings" x1="-184.1609" x2="-184.1609" y1="627.5" y2="626.0005">
        <stop offset="0" style={{stopColor:"#D9DADB"}}/>
        <stop offset="1" style={{stopColor:"#7D8082"}}/>
      </linearGradient>
    </defs>
    <path d="M63.6,5c9,0,13.5,0,18.4,1.5c5.3,1.9,9.5,6.1,11.4,11.4C95,22.8,95,27.4,95,36.4v27.2c0,9,0,13.5-1.5,18.4c-1.9,5.3-6.1,9.5-11.4,11.4C77.1,95,72.6,95,63.6,95H36.4c-9,0-13.5,0-18.4-1.5C12.6,91.5,8.5,87.4,6.5,82C5,77.2,5,72.7,5,63.6V36.4c0-9,0-13.5,1.5-18.4C8.5,12.7,12.6,8.5,18,6.6C22.8,5,27.3,5,36.4,5H63.6z" fill="url(#Background_Settings)"/>
    <circle cx="50" cy="50" r="39" fill="#353535"/>
    <path d="M85.1,51.8c1.3-0.2,1.3-0.5,0-0.8l-3.7-0.7c0-0.1,0-0.2,0-0.3c0-0.5,0-1,0-1.5l3.6-0.9c1.3-0.3,1.2-0.7-0.1-0.8l-3.7-0.3c-0.1-0.6-0.1-1.1-0.2-1.7l3.5-1.3c1.2-0.5,1.2-0.8-0.1-0.8l-3.7,0.1c-0.1-0.6-0.3-1.1-0.4-1.7l3.3-1.7c1.2-0.6,1-0.9-0.2-0.7l-3.7,0.6c-0.2-0.5-0.4-1.1-0.6-1.6l3.1-2.1c1.1-0.8,0.9-1.1-0.3-0.7l-3.6,1c-0.3-0.5-0.5-1-0.8-1.5l2.8-2.5c1-0.9,0.8-1.2-0.4-0.7l-3.4,1.4c-0.3-0.5-0.7-1-1-1.4l2.5-2.8c0.9-1,0.7-1.2-0.5-0.6L74,29.6c-0.4-0.4-0.7-0.9-1.1-1.3l2.2-3.1c0.8-1.1,0.5-1.3-0.6-0.6l-3,2.2c-0.4-0.4-0.8-0.8-1.3-1.1l1.8-3.3c0.6-1.2,0.3-1.4-0.6-0.5l-2.7,2.5c-0.5-0.3-0.9-0.7-1.4-1l1.4-3.5c0.5-1.2,0.2-1.4-0.7-0.4l-2.4,2.8c-0.5-0.3-1-0.5-1.5-0.8l0.9-3.6c0.3-1.3,0-1.4-0.7-0.3l-2,3.1c-0.5-0.2-1.1-0.4-1.6-0.6l0.5-3.7c0.2-1.3-0.1-1.4-0.7-0.2l-1.7,3.3c-0.5-0.2-1.1-0.3-1.7-0.4l0.1-3.7c0-1.3-0.3-1.4-0.8-0.1l-1.3,3.5c-0.6-0.1-1.1-0.2-1.7-0.2L52.8,15c-0.1-1.3-0.5-1.3-0.8-0.1l-0.9,3.6c-0.4,0-0.8,0-1.2,0c-0.2,0-0.4,0-0.5,0l-0.8-3.7c-0.3-1.3-0.6-1.3-0.8,0l-0.4,3.7c-0.6,0-1.1,0.1-1.7,0.2l-1.3-3.5c-0.4-1.2-0.8-1.2-0.8,0.1l0.1,3.7c-0.6,0.1-1.1,0.2-1.7,0.4l-1.6-3.4c-0.6-1.2-0.9-1.1-0.8,0.2l0.4,3.7c-0.5,0.2-1.1,0.4-1.6,0.6l-2-3.1c-0.7-1.1-1-1-0.7,0.3l0.9,3.6c-0.5,0.2-1,0.5-1.5,0.8l-2.4-2.9c-0.8-1-1.1-0.8-0.7,0.4l1.3,3.5c-0.5,0.3-1,0.6-1.4,0.9l-2.7-2.6c-1-0.9-1.2-0.7-0.6,0.5l1.7,3.3c-0.4,0.4-0.9,0.7-1.3,1.1l-3-2.2c-1.1-0.8-1.3-0.5-0.6,0.5l2.1,3.1c-0.4,0.4-0.8,0.8-1.2,1.3l-3.2-1.9c-1.1-0.7-1.4-0.4-0.5,0.6l2.4,2.8v0c-0.3,0.4-0.7,0.9-1,1.4l-3.4-1.5c-1.2-0.5-1.4-0.2-0.4,0.7l2.8,2.5c-0.3,0.5-0.6,1-0.8,1.5l-3.6-1c-1.3-0.4-1.4,0-0.3,0.7l3,2.1c-0.2,0.5-0.5,1-0.7,1.6l-3.7-0.6c-1.3-0.2-1.4,0.1-0.3,0.7l3.3,1.8c-0.2,0.5-0.3,1.1-0.5,1.6l-3.7-0.1c-1.3,0-1.4,0.3-0.2,0.8l3.5,1.3c-0.1,0.6-0.2,1.1-0.3,1.7L15,46.2c-1.3,0.1-1.3,0.4-0.1,0.8l3.6,1c0,0.6-0.1,1.1-0.1,1.7l-3.7,0.7c-1.3,0.2-1.3,0.6,0,0.8l3.7,0.5c0,0.6,0.1,1.1,0.1,1.7l-3.6,1.1c-1.3,0.4-1.2,0.7,0.1,0.8l3.7,0.1c0.1,0.6,0.2,1.1,0.3,1.7l-3.4,1.6c-1.2,0.6-1.1,0.9,0.2,0.8l3.7-0.4c0.2,0.6,0.3,1.1,0.5,1.7l-3.2,1.9c-1.1,0.7-1,1,0.3,0.7l3.7-0.8c0.2,0.5,0.5,1,0.7,1.6l-2.9,2.3c-1,0.8-0.9,1.1,0.4,0.7l3.5-1.2c0.3,0.5,0.6,1,0.9,1.5L21,69.9c-0.9,0.9-0.7,1.2,0.4,0.6l3.4-1.6c0.3,0.5,0.7,0.9,1.1,1.3l-2.3,2.9c-0.8,1-0.6,1.3,0.5,0.6l3.1-2c0.4,0.4,0.8,0.8,1.2,1.2l-1.9,3.2c-0.7,1.1-0.4,1.3,0.6,0.5l2.9-2.4c0.4,0.4,0.9,0.7,1.4,1.1l-1.6,3.4c-0.6,1.2-0.3,1.4,0.6,0.4l2.6-2.7c0.5,0.3,1,0.6,1.5,0.9l-1.2,3.5c-0.4,1.2-0.1,1.4,0.7,0.4l2.3-3c0.5,0.2,1,0.5,1.6,0.7l-0.7,3.7c-0.3,1.3,0.1,1.4,0.7,0.3l1.9-3.2c0.5,0.2,1.1,0.4,1.6,0.5L41,84c-0.1,1.3,0.2,1.4,0.8,0.2l1.5-3.4c0.6,0.1,1.1,0.2,1.7,0.3l0.2,3.7c0.1,1.3,0.4,1.3,0.8,0.1l1-3.6c0.6,0.1,1.2,0.1,1.7,0.1l0.6,3.7c0.2,1.3,0.5,1.3,0.8,0l0.7-3.7c0.6,0,1.1,0,1.7-0.1l1,3.6c0.4,1.3,0.7,1.2,0.8-0.1l0.2-3.7c0.6-0.1,1.1-0.2,1.7-0.3l1.4,3.4c0.5,1.2,0.8,1.1,0.8-0.2L58,80.5c0.6-0.1,1.1-0.3,1.6-0.5l1.9,3.2c0.7,1.1,1,1,0.7-0.3l-0.7-3.7c0.5-0.2,1.1-0.4,1.6-0.7l2.2,3c0.8,1.1,1.1,0.9,0.7-0.4L65,77.7c0.5-0.3,1-0.6,1.5-0.9l2.5,2.7c0.9,1,1.2,0.8,0.7-0.4l-1.5-3.4c0.5-0.3,0.9-0.7,1.4-1l2.9,2.4c1,0.8,1.3,0.6,0.6-0.5l-1.9-3.2c0.4-0.4,0.8-0.8,1.2-1.2l3.1,2c1.1,0.7,1.3,0.5,0.5-0.6l-2.3-2.9c0.4-0.4,0.7-0.9,1.1-1.3l3.4,1.7c1.2,0.6,1.4,0.3,0.5-0.6L76,67.8c0.3-0.5,0.6-0.9,0.9-1.4l3.5,1.2c1.2,0.4,1.4,0.1,0.4-0.7l-2.9-2.3c0.3-0.5,0.5-1,0.8-1.6l3.6,0.8c1.3,0.3,1.4,0,0.3-0.7l-3.2-2c0.2-0.5,0.4-1.1,0.6-1.6l3.7,0.4c1.3,0.1,1.4-0.2,0.2-0.8l-3.4-1.6c0.1-0.6,0.3-1.1,0.4-1.7l3.7-0.1c1.3,0,1.4-0.4,0.1-0.8L81.2,54c0.1-0.6,0.1-1.1,0.2-1.7L85.1,51.8z M36.9,69.4c-1,1.8-3.6,2-5.2,1.1c-1.1-0.6-3.7-3.1-6.1-7c-2.2-4-3.4-8.5-3.4-13.4c0-8.2,3.5-15.5,9.2-20.6c1.8-1,4.3-0.8,5.3,0.9l9.9,17c0.8,1.4,0.8,4.1-0.1,5.5L36.9,69.4z M71.4,67.6c-3.2,3.8-7.3,6.8-12.1,8.5C53.1,77.9,45,78,41.9,76.3c-2.1-1-2.9-3.2-1.9-5l9.8-17c0.8-1.4,2.9-2.6,4.5-2.6h19.1c2.1,0,3.5,1.8,3.5,3.6C76.9,56.9,75.6,62.4,71.4,67.6z M48.5,50c0-0.8,0.7-1.5,1.5-1.5c0.8,0,1.5,0.7,1.5,1.5c0,0.8-0.7,1.5-1.5,1.5C49.2,51.5,48.5,50.8,48.5,50z M73.8,48.2l-20,0c-1.7-0.1-3.7-1.5-4.5-3l-9.5-16.5c-1-1.8,0.1-3.8,1.7-4.7c1.1-0.6,4.6-1.7,9.2-1.7c13.1,0.3,23.9,9.8,26.4,22.2C77.4,46.6,75.6,48.2,73.8,48.2z" fill="url(#Gear_Settings)"/>
  </svg>
);

const AppStoreIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" className="w-12 h-12" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="appstore_gradient" x1="16" y1="2" x2="16" y2="30" gradientUnits="userSpaceOnUse">
        <stop stopColor="#2AC9FA"/>
        <stop offset="1" stopColor="#1F65EB"/>
      </linearGradient>
    </defs>
    <circle cx="16" cy="16" r="14" fill="url(#appstore_gradient)"/>
    <path d="M18.4468 8.65403C18.7494 8.12586 18.5685 7.45126 18.0428 7.14727C17.5171 6.84328 16.8456 7.02502 16.543 7.55318L16.0153 8.47442L15.4875 7.55318C15.1849 7.02502 14.5134 6.84328 13.9877 7.14727C13.462 7.45126 13.2811 8.12586 13.5837 8.65403L14.748 10.6864L11.0652 17.1149H8.09831C7.49173 17.1149 7 17.6089 7 18.2183C7 18.8277 7.49173 19.3217 8.09831 19.3217H18.4324C18.523 19.0825 18.6184 18.6721 18.5169 18.2949C18.3644 17.7279 17.8 17.1149 16.8542 17.1149H13.5997L18.4468 8.65403Z" fill="white"/>
    <path d="M11.6364 20.5419C11.449 20.3328 11.0292 19.9987 10.661 19.8888C10.0997 19.7211 9.67413 19.8263 9.45942 19.9179L8.64132 21.346C8.33874 21.8741 8.51963 22.5487 9.04535 22.8527C9.57107 23.1567 10.2425 22.975 10.5451 22.4468L11.6364 20.5419Z" fill="white"/>
    <path d="M22.2295 19.3217H23.9017C24.5083 19.3217 25 18.8277 25 18.2183C25 17.6089 24.5083 17.1149 23.9017 17.1149H20.9653L17.6575 11.3411C17.4118 11.5757 16.9407 12.175 16.8695 12.8545C16.778 13.728 16.9152 14.4636 17.3271 15.1839C18.7118 17.6056 20.0987 20.0262 21.4854 22.4468C21.788 22.975 22.4594 23.1567 22.9852 22.8527C23.5109 22.5487 23.6918 21.8741 23.3892 21.346L22.2295 19.3217Z" fill="white"/>
  </svg>
);

const NotesIcon = () => (
  <svg viewBox="0 0 1024 1024" className="w-12 h-12">
    <defs>
      <linearGradient id="notes-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFE744" />
        <stop offset="100%" stopColor="#FFB844" />
      </linearGradient>
      <linearGradient id="notes-shine" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </linearGradient>
    </defs>
    <g>
      <rect width="1024" height="1024" rx="225" fill="url(#notes-gradient)" />
      <rect width="1024" height="400" rx="225" fill="url(#notes-shine)" opacity="0.4" />
      <path d="M702 810H244C233 810 224 801 224 790V234C224 223 233 214 244 214H780C791 214 800 223 800 234V712L702 810ZM702 737V732H780L702 810V737ZM294 284V320H730V284H294ZM294 394V430H730V394H294ZM294 504V540H730V504H294ZM294 614V650H520V614H294Z" fill="white" />
    </g>
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 1024 1024" className="w-12 h-12">
    <defs>
      <linearGradient id="calendar-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF3A30" />
        <stop offset="100%" stopColor="#E42F19" />
      </linearGradient>
      <linearGradient id="calendar-shine" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </linearGradient>
    </defs>
    <g>
      <rect width="1024" height="1024" rx="225" fill="white" />
      <rect width="1024" height="380" rx="180" fill="url(#calendar-gradient)" />
      <rect width="1024" height="150" rx="150" fill="url(#calendar-shine)" opacity="0.2" />
      <rect x="180" y="320" width="664" height="544" rx="20" fill="#E42F19" />
      <path d="M332 128C332 114.7 342.7 104 356 104C369.3 104 380 114.7 380 128V240C380 253.3 369.3 264 356 264C342.7 264 332 253.3 332 240V128Z" fill="white" />
      <path d="M644 128C644 114.7 654.7 104 668 104C681.3 104 692 114.7 692 128V240C692 253.3 681.3 264 668 264C654.7 264 644 253.3 644 240V128Z" fill="white" />
      <rect x="256" y="420" width="120" height="120" rx="10" fill="white" />
      <rect x="452" y="420" width="120" height="120" rx="10" fill="white" fillOpacity="0.8" />
      <rect x="648" y="420" width="120" height="120" rx="10" fill="white" fillOpacity="0.6" />
      <rect x="256" y="620" width="120" height="120" rx="10" fill="white" fillOpacity="0.8" />
      <rect x="452" y="620" width="120" height="120" rx="10" fill="white" fillOpacity="0.6" />
    </g>
  </svg>
);

type DockProps = {
  openWindows: string[];
  activeWindow: string | null;
  minimizedWindows: string[];
  onAppClick: (appId: string) => void;
};

export function Dock({ openWindows, activeWindow, minimizedWindows, onAppClick }: DockProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const dockRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState(0);
  const windowManager = useWindowManager();

  // Use DESKTOP_APPS to get app data but display them in the order we want
  const appIcons = {
    'finder': FinderIcon,
    'safari': SafariIcon,
    'mail': MailIcon,
    'messages': MessagesIcon,
    'notes': NotesIcon,
    'calendar': CalendarIcon,
    'music': MusicIcon,
    'photos': PhotosIcon,
    'maps': MapsIcon,
    'app-store': AppStoreIcon,
    'settings': SettingsIcon,
    'terminal': TerminalIcon,
  };

  // Generate apps dynamically from DESKTOP_APPS
  const apps = DESKTOP_APPS.map(app => ({
    id: app.id,
    title: app.title,
    icon: appIcons[app.id as keyof typeof appIcons] || TerminalIcon // Fallback to TerminalIcon if not found
  })).filter(app => appIcons[app.id as keyof typeof appIcons]); // Only include apps that have an icon defined

  // Split apps into system apps and other apps
  const systemApps = apps.filter(app => app.id === 'finder'); // Finder
  const otherApps = apps.filter(app => app.id !== 'finder'); // Everything else

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (dockRef.current) {
        const rect = dockRef.current.getBoundingClientRect();
        setMousePosition(e.clientX - rect.left);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const getScale = (index: number) => {
    if (!dockRef.current) return 1;
    
    const rect = dockRef.current.getBoundingClientRect();
    const itemWidth = 60; // Icon width + padding
    const iconCenter = (index * itemWidth) + (itemWidth / 2);
    const distance = Math.abs(mousePosition - iconCenter);
    const maxDistance = 120;
    
    if (distance > maxDistance) return 1;
    
    return 1 + (1 - distance / maxDistance) * 0.5;
  };

  const isOpen = (id: string) => openWindows.includes(id);
  const isActive = (id: string) => activeWindow === id;
  const isMinimized = (id: string) => minimizedWindows.includes(id);

  // Get app-specific context menu items
  const getAppContextMenu = (appId: string) => {
    switch (appId) {
      case 'finder':
        return (
          <>
            <ContextMenuItem onClick={() => windowManager.openWindow('finder')}>
              New Finder Window
              <ContextMenuShortcut>⌘N</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>
              New Folder
              <ContextMenuShortcut>⇧⌘N</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              Go to Home
              <ContextMenuShortcut>⇧⌘H</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              Go to Documents
              <ContextMenuShortcut>⇧⌘O</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              Go to Downloads
              <ContextMenuShortcut>⌥⌘L</ContextMenuShortcut>
            </ContextMenuItem>
          </>
        );
        
      case 'notes':
        return (
          <>
            <ContextMenuItem onClick={() => windowManager.openWindow('notes')}>
              New Note
              <ContextMenuShortcut>⌘N</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>
              New Folder
              <ContextMenuShortcut>⇧⌘N</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              Show All Notes
            </ContextMenuItem>
            <ContextMenuItem>
              Export as PDF...
            </ContextMenuItem>
          </>
        );
        
      case 'calendar':
        return (
          <>
            <ContextMenuItem onClick={() => windowManager.openWindow('calendar')}>
              New Event
              <ContextMenuShortcut>⌘N</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>
              Go to Today
              <ContextMenuShortcut>⌘T</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              Day View
              <ContextMenuShortcut>⌘1</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              Week View
              <ContextMenuShortcut>⌘2</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              Month View
              <ContextMenuShortcut>⌘3</ContextMenuShortcut>
            </ContextMenuItem>
          </>
        );
        
      case 'messages':
        return (
          <>
            <ContextMenuItem onClick={() => windowManager.openWindow('messages')}>
              New Message
              <ContextMenuShortcut>⌘N</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>
              New Conversation
              <ContextMenuShortcut>⇧⌘N</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              Find...
              <ContextMenuShortcut>⌘F</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              Hide Alerts
            </ContextMenuItem>
          </>
        );
        
      case 'settings':
        return (
          <>
            <ContextMenuItem onClick={() => windowManager.openWindow('settings')}>
              Open System Settings
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>
              About This Mac
            </ContextMenuItem>
            <ContextMenuItem>
              System Information
            </ContextMenuItem>
            <ContextMenuItem>
              Software Update...
            </ContextMenuItem>
          </>
        );
        
      case 'app-store':
        return (
          <>
            <ContextMenuItem onClick={() => windowManager.openWindow('app-store')}>
              Open App Store
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>
              Updates
            </ContextMenuItem>
            <ContextMenuItem>
              Purchased Apps
            </ContextMenuItem>
            <ContextMenuItem>
              Redeem Gift Card...
            </ContextMenuItem>
          </>
        );
        
      default:
        return (
          <ContextMenuItem onClick={() => onAppClick(appId)}>
            Open {DESKTOP_APPS.find(app => app.id === appId)?.title || appId}
            <ContextMenuShortcut>⌘O</ContextMenuShortcut>
          </ContextMenuItem>
        );
    }
  };

  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="fixed bottom-4 inset-x-0 flex justify-center z-50 mx-auto"
      ref={dockRef}
    >
      <div className="dock-container glass-effect rounded-2xl p-1.5 shadow-2xl border border-white/10 backdrop-blur-xl bg-black/20 dark:bg-white/10">
        <div className="flex items-end h-16 px-1 gap-1 justify-center">
          <AnimatePresence>
            {/* System apps (Finder) */}
            {systemApps.map((app, index) => {
              const AppIcon = app.icon;
              return (
                <TooltipProvider key={app.id}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <ContextMenu>
                        <ContextMenuTrigger asChild>
                          <motion.div
                            className="relative group"
                            animate={{ scale: getScale(index) }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            onHoverStart={() => setHovered(app.id)}
                            onHoverEnd={() => setHovered(null)}
                            layout
                          >
                            <motion.div
                              className={`relative p-1.5 rounded-xl cursor-pointer transition-all duration-200
                                ${isActive(app.id) ? 'bg-accent/60' : 'hover:bg-accent/30'} 
                                group-hover:translate-y-[-10px]`}
                              onClick={() => onAppClick(app.id)}
                              whileTap={{ scale: 0.95 }}
                            >
                              <div className="w-12 h-12 relative">
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <AppIcon />
                                </div>
                                
                                {/* Icon reflection */}
                                <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-200" />
                              </div>
                              
                              {/* Running indicator */}
                              {isOpen(app.id) && (
                                <motion.div 
                                  className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 flex gap-1"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                >
                                  <div className={`w-1.5 h-1.5 rounded-full ${
                                    isActive(app.id) && !isMinimized(app.id)
                                      ? 'bg-primary shadow-glow'
                                      : 'bg-white/70'
                                  }`} />
                                </motion.div>
                              )}
                              
                              {/* App bounce animation */}
                              {isActive(app.id) && (
                                <motion.div
                                  className="absolute -bottom-2 left-0 right-0 h-1 bg-primary/20 rounded-full shadow-glow"
                                  layoutId={`bounce-${app.id}`}
                                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                />
                              )}
                            </motion.div>
                          </motion.div>
                        </ContextMenuTrigger>
                        <ContextMenuContent className="w-64">
                          {getAppContextMenu(app.id)}
                          
                          {isOpen(app.id) && (
                            <>
                              <ContextMenuSeparator />
                              <ContextMenuItem onClick={() => onAppClick(app.id)}>
                                {isMinimized(app.id) ? "Show" : "Hide"}
                                <ContextMenuShortcut>⌘H</ContextMenuShortcut>
                              </ContextMenuItem>
                              <ContextMenuSeparator />
                              <ContextMenuSub>
                                <ContextMenuSubTrigger>Options</ContextMenuSubTrigger>
                                <ContextMenuSubContent className="w-48">
                                  <ContextMenuItem>
                                    Keep in Dock
                                  </ContextMenuItem>
                                  <ContextMenuItem>
                                    Show in Finder
                                  </ContextMenuItem>
                                </ContextMenuSubContent>
                              </ContextMenuSub>
                              <ContextMenuItem className="text-destructive" onClick={() => windowManager.closeWindow(app.id)}>
                                Quit
                                <ContextMenuShortcut>⌘Q</ContextMenuShortcut>
                              </ContextMenuItem>
                            </>
                          )}
                        </ContextMenuContent>
                      </ContextMenu>
                    </TooltipTrigger>
                    <TooltipContent 
                      side="top" 
                      className="mb-2 glass-effect"
                      sideOffset={5}
                    >
                      <p>{app.title}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })}
            
            {/* Separator */}
            <div className="mx-1 h-8 w-px self-end mb-4 bg-background/30" />
            
            {/* Other apps */}
            {otherApps.map((app, index) => {
              const AppIcon = app.icon;
              return (
                <TooltipProvider key={app.id}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <ContextMenu>
                        <ContextMenuTrigger asChild>
                          <motion.div
                            className="relative group"
                            animate={{ scale: getScale(index + systemApps.length + 1) }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            onHoverStart={() => setHovered(app.id)}
                            onHoverEnd={() => setHovered(null)}
                            layout
                          >
                            <motion.div
                              className={`relative p-1.5 rounded-xl cursor-pointer transition-all duration-200
                                ${isActive(app.id) ? 'bg-accent/60' : 'hover:bg-accent/30'} 
                                group-hover:translate-y-[-10px]`}
                              onClick={() => onAppClick(app.id)}
                              whileTap={{ scale: 0.95 }}
                            >
                              <div className="w-12 h-12 relative">
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <AppIcon />
                                </div>
                                
                                {/* Icon reflection */}
                                <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-200" />
                              </div>
                              
                              {/* Running indicator */}
                              {isOpen(app.id) && (
                                <motion.div 
                                  className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 flex gap-1"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                >
                                  <div className={`w-1.5 h-1.5 rounded-full ${
                                    isActive(app.id) && !isMinimized(app.id)
                                      ? 'bg-primary shadow-glow'
                                      : 'bg-white/70'
                                  }`} />
                                </motion.div>
                              )}
                              
                              {/* App bounce animation */}
                              {isActive(app.id) && (
                                <motion.div
                                  className="absolute -bottom-2 left-0 right-0 h-1 bg-primary/20 rounded-full shadow-glow"
                                  layoutId={`bounce-${app.id}`}
                                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                />
                              )}
                            </motion.div>
                          </motion.div>
                        </ContextMenuTrigger>
                        <ContextMenuContent className="w-64">
                          {getAppContextMenu(app.id)}
                          
                          {isOpen(app.id) && (
                            <>
                              <ContextMenuSeparator />
                              <ContextMenuItem onClick={() => onAppClick(app.id)}>
                                {isMinimized(app.id) ? "Show" : "Hide"}
                                <ContextMenuShortcut>⌘H</ContextMenuShortcut>
                              </ContextMenuItem>
                              <ContextMenuSeparator />
                              <ContextMenuSub>
                                <ContextMenuSubTrigger>Options</ContextMenuSubTrigger>
                                <ContextMenuSubContent className="w-48">
                                  <ContextMenuItem>
                                    Keep in Dock
                                  </ContextMenuItem>
                                  <ContextMenuItem>
                                    Show in Finder
                                  </ContextMenuItem>
                                </ContextMenuSubContent>
                              </ContextMenuSub>
                              <ContextMenuItem className="text-destructive" onClick={() => windowManager.closeWindow(app.id)}>
                                Quit
                                <ContextMenuShortcut>⌘Q</ContextMenuShortcut>
                              </ContextMenuItem>
                            </>
                          )}
                        </ContextMenuContent>
                      </ContextMenu>
                    </TooltipTrigger>
                    <TooltipContent 
                      side="top" 
                      className="mb-2 glass-effect"
                      sideOffset={5}
                    >
                      <p>{app.title}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}