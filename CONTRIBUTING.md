# Contributing

Thanks for your interest in improving this portfolio. Changes should keep the site accurate, accessible, and compatible with its static GitHub Pages deployment.

## Development workflow

1. Use Node.js 18 or later.
2. Install the locked dependencies with `npm ci`.
3. Create a focused branch for your change.
4. Run the relevant checks before opening a pull request:

   ```bash
   npm run lint
   npm run typecheck
   npm run build
   ```

5. For visual changes, run `npm run dev` and check the page at desktop and mobile widths. Check keyboard navigation and reduced-motion behavior when changing interactive or animated components.

## Project conventions

- Keep project and narrative copy in `content/` rather than duplicating it in components.
- Keep canonical, profile, and project URLs in `lib/site-config.ts` or the relevant content data.
- Use the existing component and styling patterns; avoid adding dependencies for functionality the project already provides.
- Preserve static-export compatibility. The site is deployed to GitHub Pages and does not have a server runtime.
- Do not commit credentials, local environment files, generated output, or dependency directories.
- Keep changes focused and describe user-visible behavior accurately.

## Pull requests

Include a concise summary, the reason for the change, and the checks you ran. For visual changes, include before/after screenshots when practical. If a check cannot be run, state that clearly in the pull request.
