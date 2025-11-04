type languages_type = {
  JAPANESE: string;
  ENGLISH: string;
};

export const LANGUAGES: languages_type = {
  JAPANESE: 'jp',
  ENGLISH: 'en',
};

export const SELECTED_LANGUAGE = localStorage.getItem("lang");