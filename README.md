# Eshan's Portfolio Website

This is a personal portfolio website built with Next.js and deployed on GitHub Pages.

## Deployment to GitHub Pages

This repository is set up to deploy to a GitHub Pages user site (username.github.io) using the `gh-pages` branch, while preserving source code in the `master` branch.

### Automatic Deployment

The GitHub Action workflow in `.github/workflows/deploy.yml` handles the build and deployment process when you push to the main branch. It automatically updates the `gh-pages` branch with the latest build.

### Manual Deployment Options

#### Option 1: Using gh-pages package (Recommended)

The simplest way to deploy:

```bash
# Build and deploy to gh-pages branch
npm run deploy
```

#### Option 2: Using custom deploy script

For more controlled deployment:

```bash
# Make the deployment script executable (first time only)
chmod +x deploy.sh

# Run the deployment script
./deploy.sh
```

This script:
1. Builds the Next.js project
2. Creates or updates the gh-pages branch
3. Preserves your Git history in the master branch
4. Pushes the changes to GitHub

### Deployment Configuration

- The site is accessible at https://eshanized.github.io/
- Custom domain: https://eshanized.is-a.dev/

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
- `deploy.sh`: Safe deployment script
- `.github/workflows/deploy.yml`: GitHub Actions workflow for deployment 