const useLocalStorageLang:any = () => {
  const selectedLanguage = localStorage.getItem('lang')?.toUpperCase();
  return selectedLanguage;
};
export default useLocalStorageLang;
