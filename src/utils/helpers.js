const helpers = {};

helpers.getKeyByValue = (object, value) => {
  const valueStr = Object.keys(object).find((key) => object[key] == value);
  return valueStr[0].toUpperCase() + valueStr.slice(1).toLowerCase();
};

module.exports = helpers;
