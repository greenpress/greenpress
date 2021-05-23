export function clearNulls(obj) {
  return Object.keys(obj).reduce((newObj, key) => {
    const val = obj[key]
    if (val !== null) {
      newObj[key] = val
    }
    return newObj
  }, {})
}
