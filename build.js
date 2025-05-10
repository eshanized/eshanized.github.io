const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Set increased memory allocation for build
process.env.NODE_OPTIONS = '--max_old_space_size=4096';

console.log('Building the project with increased memory allocation...');

try {
  // Run the Next.js build command
  execSync('next build', { stdio: 'inherit' });
  
  // Ensure the out directory exists
  if (!fs.existsSync('out')) {
    fs.mkdirSync('out', { recursive: true });
  }
  
  // Create .nojekyll file in the out directory for GitHub Pages
  fs.writeFileSync(path.join('out', '.nojekyll'), '');
  
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}