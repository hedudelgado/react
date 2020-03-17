export const isBase64 = (str) => {
  if (!str || str.trim() === '') {
    return false;
  }

  try {
    return !!atob(str);
  } catch (e) {
    return false;
  }
};
