import React from "react";

export const useLocalStorage = <T,>(keyName: string, defaultValue: T) => {
  const [storedValue, setStoredValue] = React.useState<T>(() => {
    try {
      const item = window.localStorage.getItem(keyName);
      return item ? (JSON.parse(item) as T) : defaultValue;
    } catch (error) {
      console.log(error);
      return defaultValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(keyName, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return { value: storedValue, setValue };
};
