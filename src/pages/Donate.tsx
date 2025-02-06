import { motion } from 'framer-motion';
import { Heart, CreditCard, Coffee, Gift, DollarSign, Calendar } from 'lucide-react';
import { AnimatedButton } from '../components/AnimatedButton';

export function Donate() {
  const donationOptions = [
    { amount: 5, label: 'Buy me a coffee', icon: Coffee },
    { amount: 10, label: 'Small Support', icon: Heart },
    { amount: 25, label: 'Medium Support', icon: Gift },
    { amount: 50, label: 'Large Support', icon: DollarSign },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 px-4 py-20">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            Support My Work
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Your support helps me continue creating open-source projects and educational content.
          </p>
        </motion.div>

        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* One-time donation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-2xl border border-purple-100 bg-white p-6 shadow-xl"
          >
            <div className="mb-6 flex items-center gap-3">
              <CreditCard className="text-purple-600" size={24} />
              <h2 className="text-xl font-semibold">One-time Donation</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {donationOptions.map(option => (
                <motion.button
                  key={option.amount}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center gap-2 rounded-xl border border-purple-100 p-4 transition-all duration-200 hover:border-purple-300 hover:bg-purple-50"
                >
                  <option.icon className="text-purple-600" size={20} />
                  <span className="font-semibold text-purple-600">${option.amount}</span>
                  <span className="text-sm text-gray-600">{option.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Monthly support */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-2xl border border-purple-100 bg-white p-6 shadow-xl"
          >
            <div className="mb-6 flex items-center gap-3">
              <Calendar className="text-purple-600" size={24} />
              <h2 className="text-xl font-semibold">Monthly Support</h2>
            </div>
            <div className="space-y-4">
              {[10, 25, 50].map(amount => (
                <motion.button
                  key={amount}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex w-full items-center justify-between rounded-xl border border-purple-100 p-4 transition-all duration-200 hover:border-purple-300 hover:bg-purple-50"
                >
                  <span className="font-semibold text-purple-600">${amount}/month</span>
                  <Heart className="text-purple-600" size={20} />
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-purple-100 bg-white p-8 text-center shadow-xl"
        >
          <h2 className="mb-4 text-2xl font-semibold">Other Ways to Support</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <a
              href="https://github.com/sponsors/eshanized"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 rounded-xl p-4 transition-all duration-200 hover:bg-purple-50"
            >
              <Heart className="text-purple-600" size={24} />
              <span className="font-medium">GitHub Sponsors</span>
            </a>
            <a
              href="https://www.patreon.com/eshanized"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 rounded-xl p-4 transition-all duration-200 hover:bg-purple-50"
            >
              <Gift className="text-purple-600" size={24} />
              <span className="font-medium">Patreon</span>
            </a>
            <a
              href="https://ko-fi.com/eshanized"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 rounded-xl p-4 transition-all duration-200 hover:bg-purple-50"
            >
              <Coffee className="text-purple-600" size={24} />
              <span className="font-medium">Ko-fi</span>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
