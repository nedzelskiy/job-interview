'use strict';

import { isArray } from 'util';

const translations: {
  [propName: string]: {},
} = {
  en: {},
  ru: {},
};
const translationsEN = {
  Code: 'Code',
  'Server error!': 'Server error!',
  'Bad Expression!': 'Bad Expression!',
  'Array of results is still empty!': 'Array of results is still empty!',
  'Connection failure': 'Connection failure',
  'Socket does not exist yet': 'Socket does not exist yet',
  'Connection attempts exceeded': 'Connection attempts exceeded',
  'The connection is closed cleanly': 'The connection is closed cleanly',
  'Bad Expression or too long numbers': 'Bad Expression or too long numbers',
  'The number of opening and closing brackets are not equal!':
    'The number of opening and closing brackets are not equal!',
};

const translationsRU = {
  Code: 'Код',
  'Server error!': 'Ошибка сервера!',
  'Connection failure': 'Обрыв соединения',
  'Bad Expression!': 'Вычисляемое выражение не верно!',
  'Array of results is still empty!': 'Массив результатов все еще пуст!',
  'The connection is closed cleanly': 'Соединение закрыто чисто',
  'Socket does not exist yet': 'Нет сущетсвующего сокет подключения',
  'Connection attempts exceeded': 'Превышено количество попыток соединения',
  'Bad Expression or too long numbers': 'Вычисляемое выражение не верно или слишком большие числа!',
  'The number of opening and closing brackets are not equal!':
    'Количество открывающих и закрывающих скобок не совпадает!',
};

translations.en = translationsEN;
translations.ru = translationsRU;

export default translations;

export const getCurrentTranslations = (): {
  [propName: string]: string;
} => {
  const lang: string = getLanguage();
  if (lang === '' || 'undefined' === typeof translations[lang]) {
    return translations.en;
  }
  return translations[lang];
};

const acceptableLanguages: string[] = [
  'ru',
  'en',
];
let currentLanguage = 'en';

export const getLanguage = (headerValue?: string | undefined | string[]): string => {
  if (
    typeof document !== 'undefined' &&
    typeof window !== 'undefined' &&
    typeof document.documentElement !== 'undefined' &&
    typeof document.documentElement.getAttribute !== 'undefined' &&
    !headerValue
  ) {
    currentLanguage = getLanguageForBrowser();
  } else {
    currentLanguage = getLanguageForNodeServer(headerValue);
  }
  return currentLanguage;
};


const getLanguageForBrowser = (): string => {
  const lang: string | null = document.documentElement.getAttribute('lang');
  return lang ? lang.toLocaleLowerCase() : 'en';
};

const getLanguageForNodeServer = (headerValue?: string | undefined | string[]): string => {
  if (!headerValue) {
    return currentLanguage;
  }
  const value = isArray(headerValue) ? headerValue.join(',') : headerValue;

  const languages: { [propName: string]: string } =
    acceptableLanguages.reduce(
      (obj: any, current: string) => {
        obj[current] = current;
        return obj;
      },
      {},
    );
  if ('undefined' !== typeof languages[value.toLowerCase()]) {
    return value.toLowerCase();
  }
  const pairs: string[] = value.split(',');
  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i].split(';');
    for (let j = 0; j < pair.length; j++) {
      if ('undefined' !== typeof languages[pair[j].toLowerCase()]) {
        return pair[j].toLowerCase();
      }
    }
  }
  return 'en';
};
