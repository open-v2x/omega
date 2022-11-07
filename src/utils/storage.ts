const V2X = process.env.V2X;

const LOCALE = `${V2X}_locale`;

export const clearStorage = () => {
  const locale = localStorage.getItem(LOCALE);
  localStorage.clear();
  sessionStorage.clear();
  if (locale) {
    localStorage.setItem(LOCALE, locale);
  }
};

const token = `${V2X}token`;
export const getToken = () => localStorage.getItem(token);
export const setToken = (data: string) => localStorage.setItem(token, data);
