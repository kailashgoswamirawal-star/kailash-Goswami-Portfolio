import React, { useEffect } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface SeoHeadProps {
  title?: string;
  description?: string;
}

export const SeoHead: React.FC<SeoHeadProps> = ({
  title = `${PERSONAL_INFO.name} — ${PERSONAL_INFO.title}`,
  description = PERSONAL_INFO.bioShort,
}) => {
  useEffect(() => {
    document.title = title;

    // Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Schema.org Structured Data (JSON-LD)
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": PERSONAL_INFO.name,
      "jobTitle": PERSONAL_INFO.title,
      "description": PERSONAL_INFO.bioLong,
      "email": PERSONAL_INFO.email,
      "telephone": PERSONAL_INFO.phone,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "San Francisco",
        "addressRegion": "CA",
        "addressCountry": "USA"
      },
      "sameAs": [
        PERSONAL_INFO.socials.linkedin,
        PERSONAL_INFO.socials.github,
        PERSONAL_INFO.socials.twitter
      ],
      "knowsAbout": [
        "Artificial Intelligence",
        "Sales Automation",
        "Machine Learning",
        "Python",
        "FastAPI",
        "React",
        "Power BI",
        "Gemini AI API"
      ]
    };

    let scriptTag = document.getElementById('json-ld-schema');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'json-ld-schema';
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(jsonLd);
  }, [title, description]);

  return null;
};
