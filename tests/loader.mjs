import path from 'node:path';
import { pathToFileURL } from 'node:url';

const rootUrl = pathToFileURL(process.cwd()).href + '/';

export async function resolve(specifier, context, nextResolve) {
  let target = specifier;

  // Resolve @/ path alias to project root
  if (target.startsWith('@/')) {
    target = rootUrl + target.slice(2);
  }

  try {
    return await nextResolve(target, context);
  } catch (err) {
    if (
      err.code === 'ERR_MODULE_NOT_FOUND' ||
      err.code === 'ERR_UNSUPPORTED_DIR_IMPORT'
    ) {
      const candidates = [
        `${target}.ts`,
        `${target}.tsx`,
        `${target}.js`,
        `${target}/index.ts`,
        `${target}/index.tsx`,
      ];
      for (const candidate of candidates) {
        try {
          return await nextResolve(candidate, context);
        } catch {}
      }
    }
    throw err;
  }
}
