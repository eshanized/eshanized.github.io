"use client";

import React from 'react';
import BaseMIUIApp from './BaseMIUIApp';
import { User, Wifi, Bell, Battery, Moon, Lock, Smartphone, Info, Globe, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { PERSONAL_INFO } from '@/lib/constants';

export default function SettingsApp() {
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
          title: "Display & Brightness",
          subtitle: "Dark mode, Font size",
          color: "bg-purple-500"
        },
        {
          icon: Lock,
          title: "Privacy & Security",
          subtitle: "App permissions, Lock screen",
          color: "bg-red-500"
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
    <BaseMIUIApp title="Settings" headerColor="bg-gray-50 dark:bg-gray-900">
      <div className="min-h-full bg-gray-100 dark:bg-black">
        {/* Profile Section */}
        <div className="bg-white dark:bg-gray-900 p-4 mb-3">
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
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">{PERSONAL_INFO.name}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">MIUI Account, Cloud Storage, App Store</p>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Settings Sections */}
        {settingsSections.map((section, sectionIndex) => (
          <div key={section.title} className="mb-3">
            {sectionIndex > 0 && (
              <h3 className="px-4 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                {section.title}
              </h3>
            )}
            <div className="bg-white dark:bg-gray-900">
              {section.items.map((item, index) => (
                <div
                  key={item.title}
                  className="flex items-center px-4 py-3.5 border-b last:border-b-0 border-gray-100 dark:border-gray-800"
                >
                  <div className={`w-10 h-10 rounded-full ${item.color} flex items-center justify-center`}>
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-base font-medium text-gray-900 dark:text-white">{item.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.subtitle}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Version Info */}
        <div className="px-4 py-6 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">MIUI 14</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Version 14.0.5.0 (TMXMIXM)</p>
        </div>
      </div>
    </BaseMIUIApp>
  );
} 