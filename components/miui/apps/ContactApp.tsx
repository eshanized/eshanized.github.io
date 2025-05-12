"use client";

import React, { useState } from 'react';
import BaseMIUIApp from './BaseMIUIApp';
import { PERSONAL_INFO, SOCIAL_LINKS } from '@/lib/constants';
import { Send, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { useMIUITheme } from '../MIUIThemeContext';

export default function ContactApp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { colors } = useMIUITheme();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulating form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset form after success
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };
  
  return (
    <BaseMIUIApp title="Contact">
      <div className={`p-4 ${colors.primary} min-h-full`}>
        <h1 className={`text-xl font-medium mb-4 ${colors.textPrimary}`}>Get in Touch</h1>
        
        {/* Contact info cards */}
        <div className="grid grid-cols-1 gap-4 mb-6">
          <div className={`${colors.cardBg} p-4 border ${colors.divider}`}>
            <div className="flex items-center">
              <div className={`w-10 h-10 ${colors.tertiary} rounded-md flex items-center justify-center mr-3`}>
                <Mail className={`${colors.accent} w-5 h-5`} />
              </div>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className={`${colors.textPrimary}`}
              >
                {PERSONAL_INFO.email}
              </a>
            </div>
          </div>
        </div>
        
        {/* Social links */}
        <div className={`${colors.cardBg} p-4 border ${colors.divider} mb-6`}>
          <h2 className={`text-lg font-medium mb-3 ${colors.textPrimary}`}>Connect with Me</h2>
          
          {SOCIAL_LINKS.map((link, index) => (
            <a 
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center ${colors.textPrimary} py-3 border-b ${index === SOCIAL_LINKS.length - 1 ? '' : colors.divider}`}
            >
              <div className={`w-8 h-8 rounded-md ${colors.tertiary} flex items-center justify-center mr-4`}>
                <link.icon className={`w-4 h-4 ${colors.accent}`} />
              </div>
              <span>{link.name}</span>
              <ExternalLink className={`w-4 h-4 ml-auto ${colors.textSecondary}`} />
            </a>
          ))}
        </div>
        
        {/* Contact form */}
        <div className={`${colors.cardBg} p-4 border ${colors.divider}`}>
          <h2 className={`text-lg font-medium mb-3 ${colors.textPrimary}`}>Send a Message</h2>
          
          {submitSuccess ? (
            <div className={`p-4 ${colors.accent} bg-opacity-10 ${colors.textPrimary} border border-current`}>
              Thank you for your message! I&apos;ll get back to you soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className={`block text-sm ${colors.textSecondary} mb-1`}>
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`w-full px-3 py-2 ${colors.tertiary} border ${colors.divider} rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${colors.textPrimary}`}
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className={`block text-sm ${colors.textSecondary} mb-1`}>
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`w-full px-3 py-2 ${colors.tertiary} border ${colors.divider} rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${colors.textPrimary}`}
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className={`block text-sm ${colors.textSecondary} mb-1`}>
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className={`w-full px-3 py-2 ${colors.tertiary} border ${colors.divider} rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${colors.textPrimary}`}
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className={`block text-sm ${colors.textSecondary} mb-1`}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className={`w-full px-3 py-2 ${colors.tertiary} border ${colors.divider} rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${colors.textPrimary}`}
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 rounded-md flex items-center justify-center font-medium ${
                    isSubmitting
                      ? 'bg-gray-400 text-gray-200'
                      : `${colors.accent} text-white`
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/50 border-t-transparent rounded-full animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </button>
                
                {submitError && (
                  <div className="p-3 bg-red-500 bg-opacity-10 text-red-500 border border-current rounded-md mt-2">
                    {submitError}
                  </div>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </BaseMIUIApp>
  );
} 