import { useState } from 'react';

function readStorage<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : fallback;
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

type SetValue<T> = (value: T | ((prev: T) => T)) => void;

export function useLocalStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
  const [storedValue, setStoredValue] = useState<T>(() => readStorage(key, initialValue));

  const setValue: SetValue<T> = (value) => {
    const next = typeof value === 'function'
      ? (value as (prev: T) => T)(storedValue)
      : value;
    setStoredValue(next);
    writeStorage(key, next);
  };

  return [storedValue, setValue];
}
