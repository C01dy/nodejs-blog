"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformInsertionDataForQueryString = exports.fromCamelCaseStringToDatabaseFormat = void 0;
const fromCamelCaseStringToDatabaseFormat = (str) => {
    const re = /[A-Z]*[a-z]+/g; // helloNewWorld => hello, New, World
    const matchedStringsArray = str.match(re);
    if (matchedStringsArray.length === 1) {
        return str;
    }
    return matchedStringsArray.map((str) => str.toLowerCase()).join("_");
};
exports.fromCamelCaseStringToDatabaseFormat = fromCamelCaseStringToDatabaseFormat;
const transformInsertionDataForQueryString = (dataObject) => {
    const keyCollectionString = Object.keys(dataObject)
        .map((str) => (0, exports.fromCamelCaseStringToDatabaseFormat)(str))
        .join(", ");
    return [keyCollectionString, Object.values(dataObject)];
};
exports.transformInsertionDataForQueryString = transformInsertionDataForQueryString;
//# sourceMappingURL=index.js.map