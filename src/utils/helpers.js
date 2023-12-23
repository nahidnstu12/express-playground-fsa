const helpers = {};

helpers.getKeyByValue = (object, value) => {
  const valueStr = Object.keys(object).find((key) => object[key] == value);
  return valueStr[0].toUpperCase() + valueStr.slice(1).toLowerCase();
};

helpers.paginateObject = ({ page, limit, itemCount }) => {
  return {
    currentPage: +page,
    limit: +limit,
    totalItems: itemCount,
    totalPage: Math.ceil(itemCount / limit),
  };
};
helpers.extractItemFromList = (source, item)=> {
  return source?.map(obj => obj[item] ?? undefined)
}

module.exports = helpers;
