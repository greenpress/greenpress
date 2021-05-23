const checkForHexRegExp = new RegExp('^[0-9a-fA-F]{24}$')

function isObjectId (id) {
  return checkForHexRegExp.test(id)
}

module.exports = {
  isObjectId
}
