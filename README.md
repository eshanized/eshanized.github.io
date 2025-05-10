# Eshanized Web Portfolio 🚀

[![Next.js](https://img.shields.io/badge/Next.js-14.1.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.4-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-10.12.4-ff69b4?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)
[![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-Deployed-success?style=for-the-badge&logo=github)](https://eshanized.github.io/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

> An elegant and interactive portfolio website featuring iOS-style design, built with modern web technologies.

## 🌟 Features

- 📱 iOS-inspired design and interactions
- 🌓 Dark/Light mode with system preference sync
- 📊 Interactive app-like components
- 🎨 Beautiful animations and transitions
- 📱 Fully responsive design
- ⚡ Optimized performance
- 🔒 TypeScript for type safety
- 🎯 SEO optimized

## 🛠️ Tech Stack

### Core Technologies
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **UI Components**: Shadcn UI
- **State Management**: React Context
- **Icons**: Lucide Icons
- **Deployment**: GitHub Pages

### Key Features Implementation
- **Theme Management**: next-themes
- **Code Formatting**: Prettier
- **Linting**: ESLint
- **Git Hooks**: Husky
- **Package Management**: npm

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v8.0.0 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/eshanized/eshanized_web.git
cd eshanized_web
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
eshanized_web/
├── app/                   # Next.js app directory
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/           # React components
│   ├── ios/             # iOS-style components
│   ├── macos/           # macOS-style components
│   ├── ui/              # Shared UI components
│   └── providers/       # Context providers
├── lib/                 # Utility functions
├── public/              # Static assets
├── styles/             # Global styles
└── types/              # TypeScript types
```

## 🎨 Design System

### iOS Design Implementation
- Custom iOS-style components
- System-native animations
- Authentic iOS interactions
- Dark mode support
- Blur effects
- iOS typography

### Component Categories
1. **Navigation Components**
   - iOS-style headers
   - Tab bars
   - Navigation bars

2. **Interactive Elements**
   - Buttons
   - Switches
   - Form inputs
   - Cards

3. **Layout Components**
   - Grid systems
   - Lists
   - Containers

## 📱 Apps Implementation

### Built-in Applications
1. **Settings App**
   - Theme management
   - System preferences
   - User profile

2. **Social Apps**
   - Twitter integration
   - Facebook features
   - Instagram components
   - Dev.to articles

3. **Utility Apps**
   - Clock with multiple features
   - Calculator
   - Weather information

## 🔄 State Management

- Context API for global state
- Theme context for appearance
- Navigation state management
- App-specific state handling

## 🚀 Deployment

### GitHub Pages Deployment

1. **Automatic Deployment**
   ```bash
   npm run deploy
   ```
   This will:
   - Build the project
   - Push to gh-pages branch
   - Update the live site

2. **Manual Deployment**
   ```bash
   ./deploy.sh
   ```

### Custom Domain Setup
- Primary domain: [eshanized.github.io](https://eshanized.github.io)
- Custom domain: [eshanized.is-a.dev](https://eshanized.is-a.dev)

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file:
```env
NEXT_PUBLIC_GITHUB_USERNAME=your_username
NEXT_PUBLIC_SITE_URL=your_site_url
```

### Next.js Configuration
```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['github.com'],
  },
  // ... other config
}
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. Push to the branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js Team](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)

## 📞 Contact

Eshan Roy - [@eshanized](https://twitter.com/eshanized)

Project Link: [https://github.com/eshanized/eshanized_web](https://github.com/eshanized/eshanized_web)

---

<p align="center">Made with ❤️ by Eshan Roy</p> 