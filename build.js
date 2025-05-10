const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Increase memory allocation for Node.js process
process.env.NODE_OPTIONS = '--max-old-space-size=4096';

console.log('Building the project with increased memory allocation...');

try {
  // Create output directory if it doesn't exist
  const outDir = path.join(__dirname, 'out');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // Run the Next.js build command (with export configured in next.config.js)
  execSync('npx next build', { stdio: 'inherit' });
  
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
} 