// components/SafeHtml.tsx
'use client'; // If using app directory in Next.js 13+

import { JSX, useEffect, useState } from 'react';
import createDOMPurify from 'dompurify';

type SafeHtmlProps = {
  html: string;
};

export default function SafeHtml({ html }: SafeHtmlProps) : JSX.Element {
  const [sanitizedHtml, setSanitizedHtml] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const DOMPurify = createDOMPurify(window);
      const clean = DOMPurify.sanitize(html);
      setSanitizedHtml(clean);
    }
  }, [html]);

  return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
}
