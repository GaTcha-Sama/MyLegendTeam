/**
 * Traite un chemin d'image complet pour le rendre compatible avec Next.js
 * @param fullPath Le chemin complet de l'image
 * @param defaultPath Le chemin par défaut si le chemin est invalide
 * @param errorType Le type d'erreur pour le logging
 * @returns Le chemin traité
 */
export const getProcessedImagePath = (fullPath: string, defaultPath: string, errorType: string = "image"): string => {
  try {
    if (!fullPath) return defaultPath;
    
    const normalizedPath = fullPath.replace(/\\/g, '/');
    const cleanPath = normalizedPath.replace(/^public\//, '');
    
    // Corriger les chemins avec "nan" dans le dossier flag2 (ex: Players/GRE/nan/...)
    // Enlever le segment "nan/" du chemin
    const nanPathFix = cleanPath.replace(/\/nan\//g, '/').replace(/\/nan\/$/, '/');
    
    const webpPath = nanPathFix.replace(/\.(png|jpg|jpeg)$/i, '.webp');
    return webpPath.startsWith('/') ? webpPath.substring(1) : webpPath;
  } catch (error) {
    console.error(`Erreur lors du traitement du chemin ${errorType}:`, error);
    return defaultPath;
  }
};

/**
 * Récupère les chemins possibles pour le portrait d'un joueur (avec et sans flag2)
 * @param fullPath Le chemin complet de l'image
 * @returns Array des chemins possibles à essayer
 */
export const getPortraitPaths = (fullPath: string): string[] => {
  if (!fullPath) return ['images/portrait-default.webp'];
  
  try {
    const normalizedPath = fullPath.replace(/\\/g, '/');
    const cleanPath = normalizedPath.replace(/^public\//, '');
    
    // Corriger les chemins avec "nan" dans le dossier flag2
    let path = cleanPath.replace(/\/nan\//g, '/').replace(/\/nan\/$/, '/');
    
    // Convertir en webp
    path = path.replace(/\.(png|jpg|jpeg)$/i, '.webp');
    path = path.startsWith('/') ? path.substring(1) : path;
    
    const paths: string[] = [path];
    
    // Si le chemin contient un sous-dossier flag2 (pas "nan"), essayer aussi sans flag2
    // Pattern: images/{sport}/Players/{flag1}/{flag2}/{filename}.webp
    const pathMatch = path.match(/^images\/([^\/]+)\/Players\/([^\/]+)\/([^\/]+)\/([^\/]+\.webp)$/);
    if (pathMatch && pathMatch[3].toLowerCase() !== 'nan') {
      // Essayer sans le sous-dossier flag2
      const pathWithoutFlag2 = `images/${pathMatch[1]}/Players/${pathMatch[2]}/${pathMatch[4]}`;
      paths.push(pathWithoutFlag2);
    }
    
    return paths;
  } catch (error) {
    console.error('Erreur lors du traitement du chemin du portrait:', error);
    return ['images/portrait-default.webp'];
  }
};

/**
 * Récupère le chemin du portrait d'un joueur (pour compatibilité)
 * @param fullPath Le chemin complet de l'image
 * @returns Le chemin traité du portrait
 */
export const getPortraitPath = (fullPath: string): string => {
  const paths = getPortraitPaths(fullPath);
  return paths[0]; // Retourne le premier chemin pour compatibilité
};

/**
 * Récupère le chemin du drapeau d'une nationalité
 * @param fullPath Le chemin complet de l'image
 * @returns Le chemin traité du drapeau
 */
export const getFlagPath = (fullPath: string): string => 
  getProcessedImagePath(fullPath, 'images/default-flag.webp', "of the flag");

/**
 * Récupère le chemin du logo d'une équipe
 * @param fullPath Le chemin complet de l'image
 * @returns Le chemin traité du logo
 */
export const getTeamLogoPath = (fullPath: string): string => 
  getProcessedImagePath(fullPath, 'images/team-default.webp', "of the team logo");

