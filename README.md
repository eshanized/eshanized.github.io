# Eshan's Portfolio Website

This is a personal portfolio website built with Next.js and deployed on GitHub Pages.

## Deployment to GitHub Pages

This repository is set up to automatically deploy to GitHub Pages using GitHub Actions.

### How it works:

1. The GitHub Action workflow in `.github/workflows/deploy.yml` handles the build and deployment process.
2. When changes are pushed to the `main` branch, the site is automatically rebuilt and deployed.
3. The site is accessible at https://eshanized.github.io/
4. Custom domain: https://eshanized.is-a.dev/

### Manual Deployment:

If you prefer to deploy manually:

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Technologies Used

- Next.js
- TypeScript
- Tailwind CSS
- Framer Motion
- Shadcn UI

## Project Structure

- `app/`: Next.js app directory
- `components/`: Reusable React components
- `lib/`: Utility functions and constants
- `public/`: Static assets
- `hooks/`: Custom React hooks

## Important Configuration Files

- `next.config.js`: Next.js configuration
- `build.js`: Custom build script
- `.github/workflows/deploy.yml`: GitHub Actions workflow for deployment 