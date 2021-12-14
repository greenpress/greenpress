export function clearNulls(obj) {
  if (typeof obj !== 'object' || obj instanceof Array) {
    return {};
  }
  return Object.keys(obj).reduce((newObj, key) => {
    const val = obj[key]
    if (val !== null) {
      newObj[key] = val
    }
    return newObj
  }, {})
}


