import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, User, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { AnimatedButton } from '../components/AnimatedButton';

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await emailjs.sendForm(
        'service_zkcyj1p', // Replace with your EmailJS service ID
        'template_ur8n0b1', // Replace with your EmailJS template ID
        formRef.current,
        'f76eK5AUYt9NQE6jY' // Replace with your EmailJS public key
      );
      setSubmitStatus('success');
      formRef.current.reset();
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl"
        >
          <div className="mb-12 text-center">
            <h1 className="mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-4xl font-bold text-transparent dark:from-purple-400 dark:to-indigo-400">
              Get in Touch
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Have a question or want to work together? Send me a message!
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-xl bg-white p-8 shadow-lg"
          >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="mb-2 flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <User size={18} />
                  <span>Your Name</span>
                </label>
                <input
                  type="text"
                  name="user_name"
                  required
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-purple-500 dark:border-gray-700 dark:bg-gray-700 dark:text-white dark:focus:ring-purple-400"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Mail size={18} />
                  <span>Your Email</span>
                </label>
                <input
                  type="email"
                  name="user_email"
                  required
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-purple-500 dark:border-gray-700 dark:bg-gray-700 dark:text-white dark:focus:ring-purple-400"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <MessageSquare size={18} />
                  <span>Message</span>
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-purple-500 dark:border-gray-700 dark:bg-gray-700 dark:text-white dark:focus:ring-purple-400"
                  placeholder="Your message here..."
                />
              </div>

              <AnimatedButton
                type="submit"
                disabled={isSubmitting}
                fullWidth
                icon={
                  isSubmitting ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    <Send size={18} />
                  )
                }
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </AnimatedButton>

              {submitStatus && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-center gap-2 rounded-lg p-4 ${
                    submitStatus === 'success'
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  }`}
                >
                  {submitStatus === 'success' ? (
                    <>
                      <CheckCircle size={20} />
                      <span>Message sent successfully!</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle size={20} />
                      <span>Failed to send message. Please try again.</span>
                    </>
                  )}
                </motion.div>
              )}
            </form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
