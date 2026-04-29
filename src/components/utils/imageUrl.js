export const constructImageUrl = (imagePath) => {
  if (!imagePath) return '';
  return `https://cdn.jsdelivr.net/gh/lifeintelect/storeimage@main/${imagePath}`;
};