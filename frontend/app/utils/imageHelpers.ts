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
    const webpPath = cleanPath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
    return webpPath.startsWith('/') ? webpPath.substring(1) : webpPath;
  } catch (error) {
    console.error(`Erreur lors du traitement du chemin ${errorType}:`, error);
    return defaultPath;
  }
};

/**
 * Récupère le chemin du portrait d'un joueur
 * @param fullPath Le chemin complet de l'image
 * @returns Le chemin traité du portrait
 */
export const getPortraitPath = (fullPath: string): string => 
  getProcessedImagePath(fullPath, 'images/portrait-default.webp', "of the player");

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

