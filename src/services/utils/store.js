// @flow
const localStorageEnabled = (): boolean => {
  const test = "localStorageEnabled";
  try {
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
};

export const HAS_LOCAL_STORAGE =
  typeof window !== "undefined" && "localStorage" in window && localStorageEnabled();

export function setItem(key: string, value: string) {
  if (HAS_LOCAL_STORAGE) {
    localStorage.setItem(key, value);
  }
}

export function getItem(key: string): string {
  if (HAS_LOCAL_STORAGE) {
    return localStorage.getItem(key) || "";
  }
  return "";
}

export function removeItem(key: string) {
  if (HAS_LOCAL_STORAGE) {
    localStorage.removeItem(key);
  }
}
