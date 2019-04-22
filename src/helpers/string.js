export const firstLetterUpper = string => {
  const array = string.split(' ');
  let stringResponse = '';
  array.forEach(str => {
    stringResponse += `${str.charAt(0).toUpperCase() + str.slice(1)} `;
  });
  return stringResponse;
};

export default firstLetterUpper;
