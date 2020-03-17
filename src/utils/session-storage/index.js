export const setItem = (key, value) => sessionStorage.setItem(key, JSON.stringify(value));

export const getItem = key => sessionStorage.getItem(key);

export const getJsonItem = (key) => {
  try {
    return JSON.parse(sessionStorage.getItem(key));
  } catch (e) {
    return null;
  }
};

export const clear = () => sessionStorage.clear();
