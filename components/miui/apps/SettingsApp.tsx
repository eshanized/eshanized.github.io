"use client";

import React, { useState, useEffect } from 'react';
import BaseMIUIApp from './BaseMIUIApp';
import { User, Wifi, Bell, Battery, Moon, Lock, Smartphone, Info, Globe, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { PERSONAL_INFO } from '@/lib/constants';
import { useMIUITheme } from '../MIUIThemeContext';

export default function SettingsApp() {
  const [skipLockscreen, setSkipLockscreen] = useState(false);
  const { colors, isDarkMode, toggleDarkMode } = useMIUITheme();

  // Load skipLockscreen preference from localStorage on mount
  useEffect(() => {
    const savedPreference = localStorage.getItem('skipLockscreen');
    if (savedPreference !== null) {
      setSkipLockscreen(savedPreference === 'true');
    }
  }, []);

  // Save skipLockscreen preference to localStorage when changed
  const handleSkipLockscreenToggle = () => {
    const newValue = !skipLockscreen;
    setSkipLockscreen(newValue);
    localStorage.setItem('skipLockscreen', String(newValue));
  };

  const settingsSections = [
    {
      title: "Personal",
      items: [
        {
          icon: User,
          title: PERSONAL_INFO.name,
          subtitle: "MIUI Account, Cloud Storage, App Store",
          color: "bg-gradient-to-r from-blue-500 to-blue-600"
        }
      ]
    },
    {
      title: "Network & Connectivity",
      items: [
        {
          icon: Wifi,
          title: "Wi-Fi",
          subtitle: "Connected to Home Network",
          color: "bg-blue-500"
        },
        {
          icon: Globe,
          title: "Mobile Network",
          subtitle: "5G, Data Usage",
          color: "bg-green-500"
        }
      ]
    },
    {
      title: "System",
      items: [
        {
          icon: Moon,
          title: "Display & Theme",
          subtitle: isDarkMode ? "Dark mode enabled" : "Light mode enabled",
          color: "bg-purple-500",
          action: (
            <div 
              className={`w-12 h-6 rounded-full transition-colors duration-200 ease-in-out flex items-center px-1 cursor-pointer ${
                isDarkMode ? colors.toggleActive : colors.toggleInactive
              }`}
              onClick={(e) => {
                e.stopPropagation();
                toggleDarkMode();
              }}
            >
              <div 
                className={`w-4 h-4 rounded-full bg-white transform transition-transform duration-200 ease-in-out ${
                  isDarkMode ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </div>
          )
        },
        {
          icon: Lock,
          title: "Lock Screen & Security",
          subtitle: skipLockscreen ? "Lockscreen disabled" : "Lockscreen enabled",
          color: "bg-red-500",
          action: (
            <div 
              className={`w-12 h-6 rounded-full transition-colors duration-200 ease-in-out flex items-center px-1 cursor-pointer ${
                skipLockscreen ? colors.toggleActive : colors.toggleInactive
              }`}
              onClick={(e) => {
                e.stopPropagation();
                handleSkipLockscreenToggle();
              }}
            >
              <div 
                className={`w-4 h-4 rounded-full bg-white transform transition-transform duration-200 ease-in-out ${
                  skipLockscreen ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </div>
          )
        },
        {
          icon: Bell,
          title: "Sound & Vibration",
          subtitle: "Volume, Ringtone, Notifications",
          color: "bg-orange-500"
        },
        {
          icon: Battery,
          title: "Battery",
          subtitle: "85% - Normal",
          color: "bg-green-500"
        },
        {
          icon: Smartphone,
          title: "About Phone",
          subtitle: "MIUI 14, Updates",
          color: "bg-gray-500"
        }
      ]
    }
  ];

  return (
    <BaseMIUIApp title="Settings">
      <div className={`min-h-full ${colors.primary}`}>
        {/* Profile Section */}
        <div className={`${colors.cardBg} p-4 mb-3`}>
          <div className="flex items-center">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-800 relative">
              <Image
                src={PERSONAL_INFO.avatar}
                alt="Profile"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="ml-4 flex-1">
              <h2 className={`text-lg font-medium ${colors.textPrimary}`}>{PERSONAL_INFO.name}</h2>
              <p className={`text-sm ${colors.textSecondary}`}>MIUI Account, Cloud Storage, App Store</p>
            </div>
            <ArrowRight className={`w-5 h-5 ${colors.textSecondary}`} />
          </div>
        </div>

        {/* Settings Sections */}
        {settingsSections.map((section, sectionIndex) => (
          <div key={section.title} className="mb-3">
            {sectionIndex > 0 && (
              <h3 className={`px-4 py-2 text-xs font-medium ${colors.textSecondary} uppercase tracking-wide`}>
                {section.title}
              </h3>
            )}
            <div className={colors.cardBg}>
              {section.items.map((item, index) => (
                <div
                  key={item.title}
                  className={`flex items-center px-4 py-3.5 border-b last:border-b-0 ${colors.divider}`}
                >
                  <div className={`w-10 h-10 rounded-full ${item.color} flex items-center justify-center`}>
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className={`text-base font-medium ${colors.textPrimary}`}>{item.title}</h3>
                    <p className={`text-sm ${colors.textSecondary}`}>{item.subtitle}</p>
                  </div>
                  {'action' in item ? (
                    item.action
                  ) : (
                    <ArrowRight className={`w-5 h-5 ${colors.textSecondary}`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Version Info */}
        <div className="px-4 py-6 text-center">
          <p className={`text-sm ${colors.textSecondary}`}>MIUI 14</p>
          <p className={`text-xs ${colors.textTertiary} mt-1`}>Version 14.0.5.0 (TMXMIXM)</p>
        </div>
      </div>
    </BaseMIUIApp>
  );
} 