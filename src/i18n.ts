import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// Importing translation files

import de from "./language/de/common";
import en from "./language/en/common";
import jp from "./language/jp/common";
// Creating object with the variables of imported translation files

// literal type

type langType = "en" | "de" | "jp";

type resourceType = Record<langType, { translation: object }>;

const resources: resourceType = {
  en: {
    translation: en,
  },
  de: {
    translation: de,
  },
  jp: {
    translation: jp,
  },
};

// I18N Initialization
i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("lang") || "en",
  // Lng:"de",
  fallbackLng: "en", // Default language
  // KeySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
