import { Github, Heart } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center">
          <p className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-4">
            Made with <Heart className="w-4 h-4 text-aurora-1" /> by
            <a
              href="https://github.com/eshanized"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-primary-600 dark:text-primary-400 hover:underline"
            >
              <Github className="w-4 h-4" />
              eshanized
            </a>
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            © {new Date().getFullYear()} All rights reserved. Feel Free to use & customize without the footer!
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;