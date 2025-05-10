const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Increase memory allocation for Node.js process
process.env.NODE_OPTIONS = '--max-old-space-size=4096';

console.log('Cleaning previous build...');
try {
  // Remove previous build artifacts
  if (fs.existsSync('.next')) {
    fs.rmSync('.next', { recursive: true, force: true });
  }
  if (fs.existsSync('out')) {
    fs.rmSync('out', { recursive: true, force: true });
  }
} catch (error) {
  console.error('Clean failed:', error.message);
  process.exit(1);
}

console.log('Building the project with increased memory allocation...');

try {
  // Create output directory if it doesn't exist
  const outDir = path.join(__dirname, 'out');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // Run the Next.js build command with additional error handling
  execSync('npx next build', { 
    stdio: 'inherit',
    env: {
      ...process.env,
      NEXT_TELEMETRY_DISABLED: '1' // Disable telemetry to reduce build complexity
    }
  });
  
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}