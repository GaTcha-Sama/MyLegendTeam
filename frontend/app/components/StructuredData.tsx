export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "My Legend Team",
    "description": "Créez votre équipe de légende dans le rugby, basketball, football et plus !",
    "url": "https://mylegendteam.com",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR"
    },
    "creator": {
      "@type": "Organization",
      "name": "My Legend Team"
    },
    "featureList": [
      "Interface drag & drop intuitive",
      "Plus de 1000 joueurs professionnels",
      "Support multi-sports",
      "Sauvegarde d'équipes",
      "Filtres avancés"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
