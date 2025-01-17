import { motion } from 'framer-motion';
import { settings } from '../../settings';
import { Code2, Coffee, Heart } from 'lucide-react';

const highlightItems = [
  { Icon: Code2, text: 'I Code with passion' },
  { Icon: Coffee, text: "I'm Fueled by coffee" },
  { Icon: Heart, text: 'I Love what I do' },
];

function Biography() {
  const { bio } = settings.personalInfo;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="mb-16"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-primary-600/10 dark:from-nord-frost-1/10 dark:to-nord-frost-2/10 rounded-2xl" />
        <div className="relative p-8 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-nord-polar-2">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-primary-500 dark:from-nord-frost-1 dark:to-nord-frost-2 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg text-gray-600 dark:text-nord-snow-1 leading-relaxed mb-6">
              {bio}
            </p>
            <div className="flex flex-wrap gap-6 mt-8">
              {highlightItems.map(({ Icon, text }, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-gray-600 dark:text-nord-snow-2"
                >
                  <Icon className="w-5 h-5 text-primary-500 dark:text-nord-frost-2" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default Biography;
