#!/bin/bash

# Safe deployment script for GitHub Pages that preserves existing files

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Starting deployment process...${NC}"

# 1. Build the Next.js project
echo -e "${GREEN}Building the Next.js project...${NC}"
npm run build

# Check if build was successful
if [ $? -ne 0 ]; then
  echo -e "${RED}Build failed. Aborting deployment.${NC}"
  exit 1
fi

# 2. Verify the output directory exists
if [ ! -d "out" ]; then
  echo -e "${RED}Build output directory 'out' not found. Aborting deployment.${NC}"
  exit 1
fi

# 3. Save current branch name
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo -e "${GREEN}Current branch: ${CURRENT_BRANCH}${NC}"

# 4. Create a temporary directory for build output
echo -e "${GREEN}Creating temporary directory for build files...${NC}"
mkdir -p temp_deploy

# 5. Move build output to the temporary directory
echo -e "${GREEN}Moving build output...${NC}"
cp -r out/* temp_deploy/

# 6. Copy .nojekyll and CNAME files
echo -e "${GREEN}Copying special files...${NC}"
touch temp_deploy/.nojekyll
if [ -f "out/CNAME" ]; then
  cp out/CNAME temp_deploy/
fi

# 7. Switch to gh-pages branch
echo -e "${GREEN}Switching to gh-pages branch...${NC}"
if git checkout gh-pages; then
  echo -e "${GREEN}Checked out existing gh-pages branch${NC}"
else
  echo -e "${YELLOW}gh-pages branch not found. Creating new branch...${NC}"
  git checkout --orphan gh-pages
  # Clean working directory on new branch creation
  git rm -rf . || true
fi

# 8. Clean the working directory (if not already clean from new branch creation)
echo -e "${GREEN}Cleaning working directory...${NC}"
find . -maxdepth 1 -not -path "./.git" -not -path "." | xargs rm -rf 2>/dev/null || true

# 9. Copy the built files
echo -e "${GREEN}Copying built files to gh-pages branch...${NC}"
cp -r temp_deploy/* .
cp -r temp_deploy/.* . 2>/dev/null || true

# 10. Stage all changes
echo -e "${GREEN}Staging deployment changes...${NC}"
git add -A

# 11. Commit changes
echo -e "${GREEN}Committing deployment...${NC}"
git commit -m "Deploy website - $(date)" || echo "No changes to commit"

# 12. Push to GitHub
echo -e "${GREEN}Pushing to GitHub...${NC}"
git push -u origin gh-pages

# 13. Clean up
echo -e "${GREEN}Cleaning up...${NC}"
rm -rf temp_deploy

# 14. Switch back to the original branch
echo -e "${GREEN}Switching back to ${CURRENT_BRANCH} branch...${NC}"
git checkout ${CURRENT_BRANCH}

echo -e "${GREEN}Deployment completed successfully!${NC}" 