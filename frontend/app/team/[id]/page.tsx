import { Metadata } from 'next';
import SharedTeamPageClient from './SharedTeamPageClient';

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ data?: string }>;
};

export async function generateMetadata(
  { params, searchParams }: Props
): Promise<Metadata> {
  let teamName = 'Équipe';
  let sport = 'rugby';
  let playerCount = 0;
  let description = 'Découvrez cette équipe sur My Legend Team !';

  const resolvedParams = await params;
  let resolvedSearchParams: { data?: string } | undefined;
  
  try {
    resolvedSearchParams = await searchParams;
  } catch (e) {
    console.error('Erreur lors de la résolution des searchParams:', e);
  }

  // Essayer de décoder les données minimales depuis l'URL (seulement nom, sport, playerCount)
  if (resolvedSearchParams?.data) {
    try {
      const decoded = JSON.parse(Buffer.from(resolvedSearchParams.data, 'base64').toString());
      teamName = decoded.name || 'Équipe';
      sport = decoded.sport || 'rugby';
      playerCount = decoded.playerCount || 0;
      description = `Découvrez mon équipe "${teamName}" avec ${playerCount} joueurs en ${sport} sur My Legend Team !`;
    } catch (e) {
      console.error('Erreur décodage:', e);
    }
  }

  // Déterminer l'URL de base
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 
    'https://my-legend-team.vercel.app');
  const shareUrl = `${baseUrl}/team/${resolvedParams.id}${resolvedSearchParams?.data ? `?data=${resolvedSearchParams.data}` : ''}`;

  // Mapping des noms de sport aux noms de fichiers d'images
  const sportImageMap: Record<string, string> = {
    rugby: 'rugby-field.webp',
    basketball: 'basket-field.webp',
    football: 'foot-field.webp',
    hockey: 'hockey-field.webp',
  };

  // Utiliser l'image de terrain du sport comme image OG
  const fieldImage = sportImageMap[sport.toLowerCase()] || 'rugby-field.webp';
  const ogImageUrl = `${baseUrl}/images/${fieldImage}`;

  return {
    title: `${teamName} - My Legend Team`,
    description,
    openGraph: {
      type: 'website',
      url: shareUrl,
      title: `${teamName} - My Legend Team`,
      description,
      siteName: 'My Legend Team',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${teamName} - ${sport}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${teamName} - My Legend Team`,
      description,
      images: [ogImageUrl],
    },
  };
}

export default async function SharedTeamPage() {
  return <SharedTeamPageClient />;
}
