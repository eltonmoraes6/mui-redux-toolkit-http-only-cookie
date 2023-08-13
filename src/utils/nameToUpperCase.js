export const nameToUpperCase = (name = '') => {
  let fullName = '';
  const firstLetterUppercase = name
    .replace(/\s+/, ' ')
    .split(' ')
    .slice(0, 2)
    .map((v) => v && v[0].toUpperCase())
    .join('');

  fullName = firstLetterUppercase + name.slice(1);
  return fullName;
};
