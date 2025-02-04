import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export function AnimatedButton({
  variant = 'primary',
  size = 'md',
  icon,
  fullWidth = false,
  children,
  className = '',
  ...props
}: AnimatedButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200';
  
  const variants = {
    primary: 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 shadow-md hover:shadow-lg',
    secondary: 'bg-purple-100 text-purple-600 hover:bg-purple-200',
    outline: 'border-2 border-purple-600 text-purple-600 hover:bg-purple-50',
    ghost: 'text-purple-600 hover:bg-purple-50'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.2,
        type: "spring",
        stiffness: 500,
        damping: 30
      }}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {icon && <span className="relative top-[1px]">{icon}</span>}
      {children}
    </motion.button>
  );
}

export function AnimatedLink({
  href,
  children,
  className = '',
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`inline-block ${className}`}
      {...props}
    >
      {children}
    </motion.a>
  );
}