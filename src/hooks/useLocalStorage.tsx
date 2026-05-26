import { useState } from "react";

function readStorage<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // silently fail (e.g. private browsing storage limit)
  }
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() =>
    readStorage(key, initialValue),
  );

  const setValue = (value: SetValue<T>) =>
    setStoredValue((prev) => {
      const next = value instanceof Function ? value(prev) : value;

      writeStorage(key, next);
      return next;
    });

  return [storedValue, setValue];
}
