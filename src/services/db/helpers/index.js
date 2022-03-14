const fromCamelCaseStringToDatabaseFormat = (str) => {
  const re = /[A-Z]*[a-z]+/g; // helloNewWorld => hello, New, World
  const matchedStringsArray = str.match(re);

  if (matchedStringsArray.length === 1) {
    return str;
  }

  return matchedStringsArray.map((str) => str.toLowerCase()).join('_');
};

const transformInsertionDataForQueryString = (dataObject) => {
  const keyCollectionString = Object.keys(dataObject)
    .map((str) => fromCamelCaseStringToDatabaseFormat(str))
    .join(', ');

  return [keyCollectionString, Object.values(dataObject)];
};

module.exports = { transformInsertionDataForQueryString };
