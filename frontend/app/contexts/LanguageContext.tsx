"use client";
import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Fichiers de traduction
const translations = {
  en: {
    // Navbar
    'navbar.home': 'Home',
    'navbar.welcome': 'Welcome',
    'navbar.logout': 'Logout',
    'navbar.login': 'Login',
    'navbar.register': 'Register',
    'navbar.title': 'My Legend Team',
    
    // Main page
    'main.availablePlayers': 'Available Players',
    'main.resetFilters': 'Reset Filters',
    'main.previous': 'Previous',
    'main.next': 'Next',
    'main.loadingPlayers': 'Loading players...',
    'main.noPlayersFound': 'No players found with these filters',
    'main.tryDifferentFilters': 'Please try again with different filters',
    'main.myLegendTeam': 'My Legend Team for',
    'main.saveTeam': 'Save Team',
    'main.loadTeam': 'Load Team',
    'main.resetTeam': 'Reset Team',
    'main.teamName': 'Name your team :',
    'main.teamSaved': 'Team saved !',
    'main.teamDeleted': 'Team deleted !',
    'main.mustBeLoggedIn': 'You must be logged in to',
    'main.teamEmpty': 'Your team is empty !',
    'main.cantPlaceMoreLegendary': "You can't place more than 5 legendary players !",
    
    // Login/Register
    'auth.login': 'Login',
    'auth.register': 'Register',
    'auth.username': 'Username',
    'auth.password': 'Password',
    'auth.confirmPassword': 'Confirm Password',
    'auth.submit': 'Submit',
    'auth.alreadyHaveAccount': 'Already have an account?',
    'auth.dontHaveAccount': "Don't have an account?",
    'auth.loginHere': 'Login here',
    'auth.registerHere': 'Register here',
    
    // Sports
    'sport.basketball': 'Basketball',
    'sport.rugby': 'Rugby',
    'sport.football': 'Football',
    'sport.hockey': 'Hockey',
    'sport.handball': 'Handball',
    
    // Positions
    'position.pointGuard': 'Point Guard',
    'position.shootingGuard': 'Shooting Guard',
    'position.smallForward': 'Small Forward',
    'position.powerForward': 'Power Forward',
    'position.center': 'Center',
    'position.allPositions': 'All {sport} positions',
    
    // Status
    'status.active': 'Active',
    'status.retired': 'Retired',
    'status.legendary': 'Legendary',
    'status.onlyGreatest': 'Only the greatest',
    'status.allPlayers': 'All players',
    
    // Selectors
    'selector.chooseSport': 'Select a sport',
    'selector.choosePosition': 'Choose a position',
    'selector.chooseNationality': 'Choose nationalities',
    'selector.chooseTeam': 'Choose teams',
    'selector.chooseStatus': 'Choose an active or retired player',
    'selector.allNationalities': 'All nationalities',
    'selector.nationalitiesSelected': 'nationalities selected',
    'selector.allTeams': 'All teams',
    'selector.teamsSelected': 'teams selected',
    
    // Search
    'search.placeholder': 'Search by name or firstname...',
    'search.clear': 'Clear search',
    'search.notFound': 'Sorry this player is not found',
    
    // Formation slot
    'slot.alreadyOccupied': 'Already occupied',
    'slot.invalidPosition': 'Invalid position',
    'slot.legendaryPlayer': 'Legendary player',
    
    // Legendary modal
    'legendary.title': 'Legendary Players Limit',
    'legendary.message': 'You have reached the limit of 5 legendary players. Do you want to enforce this limit?',
    'legendary.enforce': 'Enforce Limit',
    'legendary.noLimit': 'No Limit',
  },
  fr: {
    // Navbar
    'navbar.home': 'Accueil',
    'navbar.welcome': 'Bienvenue',
    'navbar.logout': 'Déconnexion',
    'navbar.login': 'Connexion',
    'navbar.register': 'Inscription',
    'navbar.title': 'Mon Équipe Légendaire',
    
    // Main page
    'main.availablePlayers': 'Joueurs Disponibles',
    'main.resetFilters': 'Réinitialiser les Filtres',
    'main.previous': 'Précédent',
    'main.next': 'Suivant',
    'main.loadingPlayers': 'Chargement des joueurs...',
    'main.noPlayersFound': 'Aucun joueur trouvé avec ces filtres',
    'main.tryDifferentFilters': 'Veuillez essayer avec des filtres différents',
    'main.myLegendTeam': 'Mon Équipe Légendaire pour',
    'main.saveTeam': 'Sauvegarder l\'Équipe',
    'main.loadTeam': 'Charger une Équipe',
    'main.resetTeam': 'Réinitialiser l\'Équipe',
    'main.teamName': 'Nommez votre équipe :',
    'main.teamSaved': 'Équipe sauvegardée !',
    'main.teamDeleted': 'Équipe supprimée !',
    'main.mustBeLoggedIn': 'Vous devez être connecté pour',
    'main.teamEmpty': 'Votre équipe est vide !',
    'main.cantPlaceMoreLegendary': 'Vous ne pouvez pas placer plus de 5 joueurs légendaires !',
    
    // Login/Register
    'auth.login': 'Connexion',
    'auth.register': 'Inscription',
    'auth.username': 'Nom d\'utilisateur',
    'auth.password': 'Mot de passe',
    'auth.confirmPassword': 'Confirmer le mot de passe',
    'auth.submit': 'Valider',
    'auth.alreadyHaveAccount': 'Vous avez déjà un compte ?',
    'auth.dontHaveAccount': 'Vous n\'avez pas de compte ?',
    'auth.loginHere': 'Connectez-vous ici',
    'auth.registerHere': 'Inscrivez-vous ici',
    
    // Sports
    'sport.basketball': 'Basketball',
    'sport.rugby': 'Rugby',
    'sport.football': 'Football',
    'sport.hockey': 'Hockey',
    'sport.handball': 'Handball',
    
    // Positions
    'position.pointGuard': 'Meneur',
    'position.shootingGuard': 'Arrière',
    'position.smallForward': 'Ailier',
    'position.powerForward': 'Ailier Fort',
    'position.center': 'Pivot',
    'position.allPositions': 'Toutes les positions {sport}',
    
    // Status
    'status.active': 'Actif',
    'status.retired': 'Retraité',
    'status.legendary': 'Légendaire',
    'status.onlyGreatest': 'Seulement les plus grands',
    'status.allPlayers': 'Tous les joueurs',
    
    // Selectors
    'selector.chooseSport': 'Sélectionner un sport',
    'selector.choosePosition': 'Choisir une position',
    'selector.chooseNationality': 'Choisir les nationalités',
    'selector.chooseTeam': 'Choisir les équipes',
    'selector.chooseStatus': 'Choisir un joueur actif ou retraité',
    'selector.allNationalities': 'Toutes les nationalités',
    'selector.nationalitiesSelected': 'nationalités sélectionnées',
    'selector.allTeams': 'Toutes les équipes',
    'selector.teamsSelected': 'équipes sélectionnées',
    
    // Search
    'search.placeholder': 'Rechercher par nom ou prénom...',
    'search.clear': 'Effacer la recherche',
    'search.notFound': 'Désolé, ce joueur n\'est pas trouvé',
    
    // Formation slot
    'slot.alreadyOccupied': 'Déjà occupé',
    'slot.invalidPosition': 'Position invalide',
    'slot.legendaryPlayer': 'Joueur légendaire',
    
    // Legendary modal
    'legendary.title': 'Limite des Joueurs Légendaires',
    'legendary.message': 'Vous avez atteint la limite de 5 joueurs légendaires. Voulez-vous appliquer cette limite ?',
    'legendary.enforce': 'Appliquer la Limite',
    'legendary.noLimit': 'Aucune Limite',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useLocalStorage<Language>('language', 'en');

  const t = (key: string, params?: { [key: string]: string | number }): string => {
    let translation = translations[language][key as keyof typeof translations[typeof language]] || key;
    
    if (params) {
      Object.keys(params).forEach(param => {
        translation = translation.replace(`{${param}}`, String(params[param]));
      });
    }
    
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
