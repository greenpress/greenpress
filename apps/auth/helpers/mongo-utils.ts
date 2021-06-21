const checkForHexRegExp = new RegExp('^[0-9a-fA-F]{24}$')

export function isObjectId (id:string) {
  return checkForHexRegExp.test(id)
}


