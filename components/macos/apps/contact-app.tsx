"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { MailIcon, Send, User, MessageSquare, Loader2, Heart, Calendar, Gift, Coffee, Star, MapPin, Phone, Globe, ArrowRight, Sparkles, CheckCircle2, X, Github, Linkedin, Twitter } from 'lucide-react';
import { PERSONAL_INFO, SOCIAL_LINKS } from '@/lib/constants';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

// Form schema with validation
const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  subject: z.string().min(5, { message: 'Subject must be at least 5 characters.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

type FormValues = z.infer<typeof formSchema>;

interface ContactAppProps {
  specialUser?: string;
}

// Regular ContactApp export and function
export default function ContactApp({ specialUser }: ContactAppProps = {}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [activeSection, setActiveSection] = useState('form'); // 'form' or 'info'
  const formRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const isSnigdha = specialUser === 'snigdha';
  
  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Message sent!",
      description: "Thanks for reaching out. I'll get back to you soon.",
    });
    
    setFormSuccess(true);
    setTimeout(() => setFormSuccess(false), 5000);
    
    form.reset();
    setIsSubmitting(false);
  };

  if (isSnigdha) {
    return (
      <div className="h-full bg-black overflow-auto relative">
        {/* Fixed background gradients that won't cause overflow */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-pink-500/5 via-purple-500/5 to-black"></div>
          <motion.div 
            className="absolute top-0 right-0 w-[40%] h-[40%] rounded-full opacity-30 blur-3xl bg-pink-500/30"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          <motion.div 
            className="absolute bottom-0 left-0 w-[50%] h-[50%] rounded-full opacity-20 blur-3xl bg-purple-500/30"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </div>

        {/* Animated particles - fixed position so they won't cause scrolling issues */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-pink-500/60"
              initial={{
                x: Math.random() * 100 + "%",
                y: Math.random() * 100 + "%",
                scale: Math.random() * 0.5 + 0.5,
                opacity: Math.random() * 0.5 + 0.3
              }}
              animate={{
                x: [
                  Math.random() * 100 + "%", 
                  Math.random() * 100 + "%", 
                  Math.random() * 100 + "%"
                ],
                y: [
                  Math.random() * 100 + "%", 
                  Math.random() * 100 + "%", 
                  Math.random() * 100 + "%"
                ],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{
                duration: Math.random() * 20 + 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>

        {/* Content - with proper padding and scrolling */}
        <div className="relative z-10 backdrop-blur-sm min-h-full">
          {/* Header with heart */}
          <div className="w-full bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-pink-500/20 py-16 px-4 relative">
            <motion.div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              animate={{ 
                scale: [1, 1.1, 1, 1.1, 1],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "loop"
              }}
            >
              <Heart className="h-24 w-24 text-pink-500 fill-pink-500 drop-shadow-lg" />
            </motion.div>
            
            {/* Floating hearts decoration */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{ 
                  x: Math.random() * 600 - 300,
                  y: Math.random() * 100,
                  scale: Math.random() * 0.3 + 0.1,
                  opacity: 0
                }}
                animate={{ 
                  y: [null, -50 - Math.random() * 50],
                  opacity: [0, 0.7, 0]
                }}
                transition={{ 
                  duration: Math.random() * 10 + 5,
                  repeat: Infinity,
                  delay: Math.random() * 5
                }}
              >
                <Heart className="text-pink-400/80 fill-pink-400/80" />
              </motion.div>
            ))}
          </div>

          {/* Main content with proper spacing */}
          <div className="px-4 sm:px-6 py-12 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text mb-3">
                For Snigdha
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full mx-auto mb-4"></div>
              <p className="text-rose-400 text-lg max-w-md mx-auto">
                A special space created with love, just for you ❤️
              </p>
            </motion.div>

            {/* Cards grid with better responsiveness */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
              {[
                { 
                  icon: Coffee, 
                  title: "Coffee Date", 
                  content: "Let's plan our next coffee date soon! Choose your favorite cafe.",
                  color: "from-pink-400/80 to-pink-600/80",
                  iconBg: "bg-pink-400/30"
                },
                { 
                  icon: Calendar, 
                  title: "Next Date", 
                  content: "I'm already counting down to our next date together!",
                  color: "from-purple-400/80 to-purple-600/80",
                  iconBg: "bg-purple-400/30"
                },
                { 
                  icon: Gift, 
                  title: "Gift Ideas", 
                  content: "I've been collecting ideas for your next gift. It's going to be special!",
                  color: "from-blue-400/80 to-indigo-600/80",
                  iconBg: "bg-blue-400/30"
                },
                { 
                  icon: Star, 
                  title: "Favorite Memories", 
                  content: "I've been keeping track of all our special moments together.",
                  color: "from-amber-400/80 to-orange-600/80",
                  iconBg: "bg-amber-400/30"
                }
              ].map((card, index) => (
                <motion.div
                  key={index}
                  className="bg-white/5 backdrop-blur-md rounded-xl shadow-xl overflow-hidden group"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + (index * 0.1), duration: 0.6 }}
                  whileHover={{ 
                    y: -5,
                    transition: { type: "spring", stiffness: 300, damping: 20 }
                  }}
                >
                  <div className={`h-1 w-full bg-gradient-to-r ${card.color}`}></div>
                  <div className="p-5">
                    <div className="flex items-start gap-4">
                      <div className={`${card.iconBg} p-3 rounded-full group-hover:scale-110 transition-transform duration-300`}>
                        <card.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-xl text-white mb-2 group-hover:translate-x-1 transition-transform duration-300">
                          {card.title}
                        </h3>
                        <p className="text-gray-300">
                          {card.content}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Message box with enhanced design */}
            <motion.div 
              className="max-w-lg mx-auto relative bg-white/5 backdrop-blur-md rounded-xl overflow-hidden shadow-2xl border border-white/10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              whileHover={{ 
                boxShadow: "0 25px 50px -12px rgba(219, 39, 119, 0.25)",
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
            >
              {/* Glowing edge */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.div 
                  className="absolute inset-[-1px] bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    repeatType: "mirror"
                  }}
                />
              </div>
              
              {/* Content */}
              <div className="p-6 relative z-10 bg-black/80 m-[1px] rounded-[10px]">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <Heart className="w-6 h-6 mr-2 text-pink-500 fill-pink-500" />
                  Send Me a Love Note
                </h3>
                <Textarea 
                  placeholder="Write a sweet message here..." 
                  className="bg-white/5 border-white/10 mb-4 focus:border-pink-500 focus:ring-pink-500 min-h-[120px] resize-none rounded-lg text-white placeholder:text-gray-500"
                />
                <motion.button
                  className="w-full relative overflow-hidden rounded-lg py-3 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Button background with gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 animate-gradient"></div>
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100">
                    <motion.div 
                      className="absolute inset-0 w-1/3 h-full bg-white/20 blur-sm -skew-x-12" 
                      animate={{ 
                        left: ['-30%', '130%']
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 2,
                        ease: "easeInOut",
                        repeatDelay: 1
                      }}
                    />
                  </div>
                  
                  {/* Button content */}
                  <div className="relative z-10 text-white font-semibold flex items-center justify-center">
                    <Heart className="w-5 h-5 mr-2 fill-white" />
                    <span>Send Love</span>
                  </div>
                </motion.button>
              </div>
            </motion.div>

            {/* Footer signature */}
            <motion.div 
              className="mt-16 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <div className="max-w-xs mx-auto border-t border-pink-500/20 pt-4">
                <motion.p
                  className="text-pink-400 text-sm"
                  animate={{ 
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  💕 Created with love, just for you 💕
                </motion.p>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Add gradient animation */}
        <style jsx global>{`
          @keyframes gradient-shift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          .animate-gradient {
            background-size: 200% 200%;
            animation: gradient-shift 8s ease infinite;
          }
        `}</style>
      </div>
    );
  }

  // Futuristic animated particles component
  const Particles = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/60"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              scale: Math.random() * 0.5 + 0.5,
              opacity: Math.random() * 0.5 + 0.3
            }}
            animate={{
              x: [
                Math.random() * 100 + "%", 
                Math.random() * 100 + "%", 
                Math.random() * 100 + "%"
              ],
              y: [
                Math.random() * 100 + "%", 
                Math.random() * 100 + "%", 
                Math.random() * 100 + "%"
              ],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>
    );
  };

  // Animated background component
  const AnimatedBackground = () => {
    return (
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/50"></div>
        <motion.div 
          className="absolute -top-[30%] -left-[10%] w-[70%] h-[60%] rounded-full opacity-20 blur-3xl bg-primary/30"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 10, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute -bottom-[30%] -right-[10%] w-[70%] h-[60%] rounded-full opacity-20 blur-3xl bg-blue-500/30"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -15, 0],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>
    );
  };

  return (
    <div className="h-full w-full relative overflow-hidden bg-black">
      {/* Animated background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black to-zinc-900"></div>
        
        {/* Animated neon grid */}
        <div className="absolute inset-0" style={{ perspective: '1000px' }}>
          <motion.div
            className="absolute inset-0 grid grid-cols-12 grid-rows-12 gap-8"
            initial={{ rotateX: 45, y: 100, opacity: 0 }}
            animate={{ rotateX: 65, y: 0, opacity: 0.15 }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            {Array.from({ length: 144 }).map((_, i) => (
              <motion.div
                key={i}
                className="h-full w-full bg-primary/10 rounded-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ 
                  duration: Math.random() * 5 + 2, 
                  repeat: Infinity, 
                  delay: Math.random() * 2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
        </div>
        
        {/* Animated glowing orb */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-blue-500 via-primary to-purple-500"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
            filter: ["blur(80px)", "blur(100px)", "blur(80px)"]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        <motion.div
          className="absolute bottom-1/3 left-1/3 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-500"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.25, 0.15],
            filter: ["blur(60px)", "blur(80px)", "blur(60px)"]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 2
          }}
        />
      </div>
      
      {/* Main content */}
      <div className="relative z-10 h-full w-full flex flex-col">
        {/* Header with animated title */}
        <motion.div 
          className="flex justify-center pt-12 pb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="text-center">
            <motion.h1
              className="text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-400 via-primary to-purple-400 text-transparent bg-clip-text"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Get in Touch
            </motion.h1>
            <motion.div
              className="mt-3 text-zinc-400 max-w-md text-center mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Ready to connect and create something amazing together?
            </motion.div>
          </div>
        </motion.div>
        
        {/* Content area */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full mx-auto max-w-7xl px-4 flex flex-col md:flex-row items-stretch gap-8">
            {/* Contact form side */}
            <motion.div 
              className="w-full md:w-3/5 h-full"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="h-full overflow-auto py-4 pr-2">
                <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-500/10 opacity-80"></div>
                  
                  {/* Top light bar */}
                  <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-primary to-purple-500"></div>
                  
                  <div className="p-8 relative">
                    <AnimatePresence mode="wait">
                      {formSuccess ? (
                        <motion.div
                          key="success"
                          className="flex flex-col items-center justify-center py-12 text-center"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.4 }}
                        >
                          <motion.div
                            className="w-20 h-20 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center mb-6"
                            initial={{ scale: 0 }}
                            animate={{ scale: [0, 1.2, 1] }}
                            transition={{ duration: 0.5 }}
                          >
                            <CheckCircle2 className="w-10 h-10 text-white" />
                          </motion.div>
                          <h3 className="text-3xl font-bold text-white mb-3">Message Sent!</h3>
                          <p className="text-zinc-400 mb-8">Thank you for reaching out. I&apos;ll respond as soon as possible.</p>
                          
                          <motion.button
                            className="px-6 py-3 bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-full text-zinc-200 font-medium transition-colors border border-white/10"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setFormSuccess(false)}
                          >
                            Send Another Message
                          </motion.button>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="form"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <h2 className="text-xl font-medium text-white mb-6 flex items-center">
                            <Send className="w-5 h-5 mr-2 text-primary" />
                            Send a Message
                          </h2>
                          
                          <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                  control={form.control}
                                  name="name"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="text-zinc-400">Name</FormLabel>
                                      <FormControl>
                                        <motion.div
                                          whileHover={{ y: -2 }}
                                          transition={{ type: "spring", stiffness: 500, damping: 15 }}
                                          className="relative"
                                        >
                                          <Input 
                                            placeholder="Your name" 
                                            className="h-12 bg-white/5 border-white/10 focus:border-primary rounded-lg text-white placeholder:text-zinc-500" 
                                            {...field} 
                                          />
                                          <User className="absolute right-3 top-3 h-5 w-5 text-zinc-500" />
                                        </motion.div>
                                      </FormControl>
                                      <FormMessage className="text-red-400" />
                                    </FormItem>
                                  )}
                                />
                                
                                <FormField
                                  control={form.control}
                                  name="email"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="text-zinc-400">Email</FormLabel>
                                      <FormControl>
                                        <motion.div
                                          whileHover={{ y: -2 }}
                                          transition={{ type: "spring", stiffness: 500, damping: 15 }}
                                          className="relative"
                                        >
                                          <Input 
                                            placeholder="your.email@example.com" 
                                            className="h-12 bg-white/5 border-white/10 focus:border-primary rounded-lg text-white placeholder:text-zinc-500" 
                                            {...field} 
                                          />
                                          <MailIcon className="absolute right-3 top-3 h-5 w-5 text-zinc-500" />
                                        </motion.div>
                                      </FormControl>
                                      <FormMessage className="text-red-400" />
                                    </FormItem>
                                  )}
                                />
                              </div>
                              
                              <FormField
                                control={form.control}
                                name="subject"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-zinc-400">Subject</FormLabel>
                                    <FormControl>
                                      <motion.div
                                        whileHover={{ y: -2 }}
                                        transition={{ type: "spring", stiffness: 500, damping: 15 }}
                                      >
                                        <Input 
                                          placeholder="What's this about?" 
                                          className="h-12 bg-white/5 border-white/10 focus:border-primary rounded-lg text-white placeholder:text-zinc-500" 
                                          {...field} 
                                        />
                                      </motion.div>
                                    </FormControl>
                                    <FormMessage className="text-red-400" />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-zinc-400">Message</FormLabel>
                                    <FormControl>
                                      <motion.div
                                        whileHover={{ y: -2 }}
                                        transition={{ type: "spring", stiffness: 500, damping: 15 }}
                                        className="relative"
                                      >
                                        <Textarea 
                                          placeholder="Your message here..." 
                                          className="min-h-[180px] bg-white/5 border-white/10 focus:border-primary rounded-lg text-white placeholder:text-zinc-500" 
                                          {...field} 
                                        />
                                        <MessageSquare className="absolute right-3 top-3 h-5 w-5 text-zinc-500" />
                                      </motion.div>
                                    </FormControl>
                                    <FormMessage className="text-red-400" />
                                  </FormItem>
                                )}
                              />
                              
                              <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <Button 
                                  type="submit" 
                                  disabled={isSubmitting} 
                                  className="w-full h-14 bg-gradient-to-r from-blue-600 via-primary to-purple-600 hover:from-blue-500 hover:via-primary hover:to-purple-500 text-white font-medium rounded-lg overflow-hidden relative group"
                                >
                                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></span>
                                  
                                  {isSubmitting ? (
                                    <div className="flex items-center justify-center">
                                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                      <span>Sending Message...</span>
                                    </div>
                                  ) : (
                                    <div className="flex items-center justify-center">
                                      <Send className="mr-2 h-5 w-5" />
                                      <span>Send Message</span>
                                    </div>
                                  )}
                                </Button>
                              </motion.div>
                            </form>
                          </Form>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Contact info side */}
            <motion.div 
              className="w-full md:w-2/5"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="h-full overflow-auto py-4 pl-2">
                <div className="space-y-6 h-full flex flex-col">
                  {/* Profile card */}
                  <motion.div 
                    className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-xl"
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 500, damping: 20 }}
                  >
                    <div className="h-28 bg-gradient-to-r from-blue-600/20 via-primary/20 to-purple-600/20 relative overflow-hidden">
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-primary/30 to-purple-600/30"
                        animate={{ 
                          x: ['-100%', '100%']
                        }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 8,
                          ease: "linear"
                        }}
                      />
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                            <motion.div
                              animate={{ 
                                scale: [1, 1.1, 1]
                              }}
                              transition={{ 
                                duration: 4,
                                repeat: Infinity
                              }}
                            >
                              <User className="h-8 w-8 text-white" />
                            </motion.div>
                          </div>
                          <motion.div 
                            className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-30 blur-sm"
                            animate={{ 
                              scale: [1, 1.2, 1],
                              opacity: [0.3, 0.4, 0.3]
                            }}
                            transition={{ 
                              duration: 4,
                              repeat: Infinity
                            }}
                          />
                        </div>
                        
                        <div>
                          <motion.h3 
                            className="text-xl font-bold text-white"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 1 }}
                          >
                            {PERSONAL_INFO.name}
                          </motion.h3>
                          <motion.p 
                            className="text-zinc-400"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 1.1 }}
                          >
                            Web Developer
                          </motion.p>
                          
                          <motion.div 
                            className="flex space-x-2 mt-3"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 1.2 }}
                          >
                            {SOCIAL_LINKS.slice(0, 3).map((link, i) => {
                              const Icon = link.icon;
                              return (
                                <motion.a
                                  key={i}
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="h-8 w-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-primary hover:border-primary/50 transition-colors"
                                  whileHover={{ 
                                    y: -3, 
                                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                                    transition: { type: "spring", stiffness: 500, damping: 10 }
                                  }}
                                >
                                  <Icon size={16} />
                                </motion.a>
                              );
                            })}
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Contact info cards */}
                  <div className="space-y-4">
                    <motion.div
                      className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-5 shadow-xl overflow-hidden relative group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 1.3 }}
                      whileHover={{ 
                        y: -5,
                        transition: { type: "spring", stiffness: 500, damping: 20 }
                      }}
                    >
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ opacity: 1 }}
                      />
                      
                      <div className="flex items-center relative z-10">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500/20 to-blue-500/10 flex items-center justify-center mr-4 backdrop-blur-sm">
                          <MailIcon className="h-5 w-5 text-blue-400" />
                        </div>
                        <div>
                          <p className="text-sm text-zinc-500 mb-1">Email</p>
                          <a href={`mailto:${PERSONAL_INFO.email}`} className="text-white hover:text-primary transition-colors">
                            {PERSONAL_INFO.email}
                          </a>
                        </div>
                      </div>
                      
                      <motion.div 
                        className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-30 group-hover:opacity-50 transition-opacity"
                        animate={{ 
                          scale: [1, 1.2, 1],
                        }}
                        transition={{ 
                          duration: 4,
                          repeat: Infinity
                        }}
                      />
                    </motion.div>
                    
                    <motion.div
                      className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-5 shadow-xl overflow-hidden relative group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 1.4 }}
                      whileHover={{ 
                        y: -5,
                        transition: { type: "spring", stiffness: 500, damping: 20 }
                      }}
                    >
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ opacity: 1 }}
                      />
                      
                      <div className="flex items-center relative z-10">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500/20 to-purple-500/10 flex items-center justify-center mr-4 backdrop-blur-sm">
                          <MapPin className="h-5 w-5 text-purple-400" />
                        </div>
                        <div>
                          <p className="text-sm text-zinc-500 mb-1">Location</p>
                          <p className="text-white">San Francisco Bay Area, USA</p>
                        </div>
                      </div>
                      
                      <motion.div 
                        className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-30 group-hover:opacity-50 transition-opacity"
                        animate={{ 
                          scale: [1, 1.2, 1],
                        }}
                        transition={{ 
                          duration: 5,
                          repeat: Infinity
                        }}
                      />
                    </motion.div>
                  </div>
                  
                  {/* Status card */}
                  <motion.div
                    className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl flex-1 overflow-hidden relative mt-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.5 }}
                    whileHover={{ y: -5 }}
                  >
                    <motion.div
                      className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-primary to-purple-500 opacity-20 blur-3xl"
                      animate={{
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                    
                    <div className="relative z-10">
                      <div className="flex items-center mb-4">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 flex items-center justify-center mr-3">
                          <span className="text-white text-xs">●</span>
                        </div>
                        <h3 className="text-lg font-semibold text-white">Available for Work</h3>
                      </div>
                      
                      <p className="text-zinc-400 mb-6">
                        Currently accepting new projects and collaborations. Let&apos;s build something amazing together!
                      </p>
                      
                      <div className="flex justify-center">
                        <motion.a
                          href="#"
                          className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10 flex items-center space-x-2 group"
                          whileHover={{ 
                            scale: 1.05,
                            transition: { type: "spring", stiffness: 400, damping: 10 }
                          }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span>View Resume</span>
                          <motion.span
                            animate={{ x: [0, 3, 0] }}
                            transition={{ 
                              duration: 1.5, 
                              repeat: Infinity,
                              repeatType: "loop", 
                              ease: "easeInOut",
                              repeatDelay: 0.5,
                            }}
                          >
                            <ArrowRight className="h-4 w-4 text-primary" />
                          </motion.span>
                        </motion.a>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Global style for shimmer animation */}
      <style jsx global>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}