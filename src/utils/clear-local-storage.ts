import { persistor } from "store/store";

const exceptions_default = ["lang", "languageCode", "timeZone"];

const alwaysRemoveKeys = ["persist:root"];

export const clearLocalStorage = async (
  exceptions: string[] = exceptions_default
): Promise<void> => {
  if (!window.localStorage) return;

  // Pause persistor (not store)
  await persistor.pause();
  await persistor.purge();

  const allKeys = Object.keys(localStorage);

  const keysToRemove = allKeys.filter(
    (key) => !exceptions.includes(key) || alwaysRemoveKeys.includes(key)
  );

  keysToRemove.forEach((key) => localStorage.removeItem(key));
};
