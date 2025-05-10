# Eshan's Portfolio Website

This is a personal portfolio website built with Next.js and deployed on GitHub Pages.

## Deployment to GitHub Pages

This repository is set up to automatically deploy to GitHub Pages using GitHub Actions.

### How it works:

1. The GitHub Action workflow in `.github/workflows/deploy.yml` handles the build and deployment process.
2. When changes are pushed to the `main` branch, the site is automatically rebuilt and deployed.
3. The site is accessible at [https://eshanized.github.io/](https://eshanized.github.io/)

### Manual Setup Steps (if needed):

1. In your GitHub repository, go to Settings > Pages
2. For "Source", select "GitHub Actions"
3. Make sure your repository has proper permissions set for GitHub Actions

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