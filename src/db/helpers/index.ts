export const fromCamelCaseStringToDatabaseFormat = (str: string): string => {
  const re = /[A-Z]*[a-z]+/g // helloNewWorld => hello, New, World
  const matchedStringsArray: string[] = str.match(re)

  if (matchedStringsArray.length === 1) {
    return str
  }

  return matchedStringsArray.map((str) => str.toLowerCase()).join("_")
}

export const transformInsertionDataForQueryString = (dataObject: object): [string, Array<unknown>] => {
  const keyCollectionString: string = Object.keys(dataObject)
    .map((str) => fromCamelCaseStringToDatabaseFormat(str))
    .join(", ")

  return [keyCollectionString, Object.values(dataObject)]
}


