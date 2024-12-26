import React from 'react';
import { settings } from '../settings';

interface SEOProps {
  title: string;
  description?: string;
}

function SEO({ title, description }: SEOProps) {
  const siteTitle = `${title} | ${settings.personalInfo.name}`;
  const siteDescription = description || settings.personalInfo.bio;

  React.useEffect(() => {
    document.title = siteTitle;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', siteDescription);
  }, [siteTitle, siteDescription]);

  return null;
}

export default SEO;