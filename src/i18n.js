// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Example translations (extend as needed)
const resources = {
  en: {
    translation: {
      createChallenge: "Create Challenge",
      playChallenges: "Play Challenges",
      leaderboard: "Leaderboard",
      howToPlay: "How to Play",
      loginWithGoogle: "Login with Google",
      logout: "Logout",
    },
  },
  // Add more languages here
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // Default language
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
