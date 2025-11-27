"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DebugPage() {
  const searchParams = useSearchParams();
  const [metaTags, setMetaTags] = useState<string>('');

  useEffect(() => {
    // Récupérer les meta tags depuis le head
    const ogTags = Array.from(document.querySelectorAll('meta[property^="og:"], meta[name^="twitter:"]'))
      .map((tag) => {
        const property = tag.getAttribute('property') || tag.getAttribute('name');
        const content = tag.getAttribute('content');
        return `${property}: ${content}`;
      })
      .join('\n');

    setMetaTags(ogTags);
  }, []);

  const data = searchParams.get('data');
  let decodedData = null;

  if (data) {
    try {
      decodedData = JSON.parse(atob(data));
    } catch (e) {
      console.error('Erreur décodage:', e);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Debug - Meta Tags Open Graph</h1>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Données décodées :</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            {JSON.stringify(decodedData, null, 2)}
          </pre>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Meta Tags détectés :</h2>
          <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap">
            {metaTags || 'Chargement...'}
          </pre>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">URL de partage :</h2>
          <code className="bg-gray-100 p-4 rounded block break-all">
            {typeof window !== 'undefined' ? window.location.href : ''}
          </code>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Test Facebook :</h2>
          <p className="mb-2">
            Utilisez l&apos;outil de débogage Facebook pour forcer le rafraîchissement :
          </p>
          <a
            href={`https://developers.facebook.com/tools/debug/?q=${encodeURIComponent(
              typeof window !== 'undefined' ? window.location.href : ''
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Ouvrir l&apos;outil de débogage Facebook
          </a>
        </div>
      </div>
    </div>
  );
}

