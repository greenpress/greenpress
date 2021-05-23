const { extname } = require('path')
const imageExtensions = new Set(require('../../helpers/image-extensions.json'))

function joinUrl (baseUrl, relativePath) {
  const base = baseUrl.endsWith('/') ? baseUrl : (baseUrl + '/')

  return `${base}${(relativePath.startsWith('/') ? relativePath.substr(1) : relativePath)}`
}

function isImage (filePath) {
  return imageExtensions.has(extname(filePath).slice(1).toLowerCase())
}

module.exports = { joinUrl, isImage }
