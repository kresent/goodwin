import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';

export const loadFromLocalStorage = (key, json) => {
  if (canUseDOM)
    try {
      const serialized = localStorage.getItem(key);

      if (serialized === null) {
        return undefined;
      }

      if (json) {
        return JSON.parse(serialized);
      }
      return serialized;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Ошибка localStorage API:', e.message || '');
      return undefined;
    }
};

export const saveToLocalStorage = (key, value, json) => {
  if (canUseDOM)
    try {
      if (json) {
        value = JSON.stringify(value);
      }

      localStorage.setItem(key, value);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Ошибка localStorage API:', e.message || '');
    }
};
