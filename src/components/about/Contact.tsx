import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Github, Linkedin, Twitter, Users } from 'lucide-react';
import { settings } from '../../settings';
import { useGitHubUser } from '../../hooks/useGitHubUser';

function Contact() {
  const { email, location, social } = settings.personalInfo;
  const { data: githubUser } = useGitHubUser();
  const linkedinFollowers = 500; // This would come from LinkedIn API in a real app

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-16"
    >
      <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary-600 to-primary-500 dark:from-nord-frost-1 dark:to-nord-frost-2 bg-clip-text text-transparent">Get in Touch</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-nord-polar-1 rounded-xl p-6 shadow-lg dark:shadow-nord-polar-2/10 border border-gray-100 dark:border-nord-polar-2"
        >
          <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-nord-snow-1">Contact Information</h3>
          <div className="space-y-4">
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-3 text-gray-600 dark:text-nord-snow-2 hover:text-primary-500 dark:hover:text-nord-frost-2 transition-colors group"
            >
              <div className="p-2 rounded-lg bg-primary-100 dark:bg-nord-polar-2 group-hover:bg-primary-200 dark:group-hover:bg-nord-polar-3 transition-colors">
                <Mail className="w-5 h-5 text-primary-500 dark:text-nord-frost-2" />
              </div>
              <span>{email}</span>
            </a>
            <div className="flex items-center gap-3 text-gray-600 dark:text-nord-snow-2">
              <div className="p-2 rounded-lg bg-primary-100 dark:bg-nord-polar-2">
                <MapPin className="w-5 h-5 text-primary-500 dark:text-nord-frost-2" />
              </div>
              <span>{location}</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-nord-polar-1 rounded-xl p-6 shadow-lg dark:shadow-nord-polar-2/10 border border-gray-100 dark:border-nord-polar-2"
        >
          <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-nord-snow-1">Social Links</h3>
          <div className="grid grid-cols-3 gap-4">
            <a
              href={social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 p-4 rounded-lg bg-primary-50 dark:bg-nord-polar-2 hover:bg-primary-100 dark:hover:bg-nord-polar-3 transition-colors group relative"
            >
              <Github className="w-6 h-6 text-primary-500 dark:text-nord-frost-2" />
              <span className="text-sm text-gray-600 dark:text-nord-snow-2">GitHub</span>
              {githubUser?.followers !== undefined && (
                <div className="absolute -top-2 -right-2 flex items-center gap-1 bg-primary-100 dark:bg-nord-polar-3 px-2 py-1 rounded-full text-xs">
                  <Users className="w-3 h-3" />
                  {githubUser.followers}
                </div>
              )}
            </a>
            <a
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 p-4 rounded-lg bg-primary-50 dark:bg-nord-polar-2 hover:bg-primary-100 dark:hover:bg-nord-polar-3 transition-colors group relative"
            >
              <Linkedin className="w-6 h-6 text-primary-500 dark:text-nord-frost-2" />
              <span className="text-sm text-gray-600 dark:text-nord-snow-2">LinkedIn</span>
              <div className="absolute -top-2 -right-2 flex items-center gap-1 bg-primary-100 dark:bg-nord-polar-3 px-2 py-1 rounded-full text-xs">
                <Users className="w-3 h-3" />
                {linkedinFollowers}
              </div>
            </a>
            <a
              href={social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 p-4 rounded-lg bg-primary-50 dark:bg-nord-polar-2 hover:bg-primary-100 dark:hover:bg-nord-polar-3 transition-colors group"
            >
              <Twitter className="w-6 h-6 text-primary-500 dark:text-nord-frost-2" />
              <span className="text-sm text-gray-600 dark:text-nord-snow-2">Twitter</span>
            </a>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default Contact;