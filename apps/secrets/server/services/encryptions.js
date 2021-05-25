const crypto = require('crypto');
const { secretKey } = require('../../config');
const lv = Buffer.from('0102030405060708', 'binary');

function hashSecretKey(text) {
  return crypto.createHash('sha256').update(text + secretKey).digest('hex');
}

function encrypt(data, secret) {
  const cipher = crypto.createCipheriv('aes256', getValidSecret(secretKey + secret), lv)
  return cipher.update(JSON.stringify(data), 'utf8', 'hex') + cipher.final('hex')
}

function decrypt(encrypted, secret) {
  const decipher = crypto.createDecipheriv('aes256', getValidSecret(secretKey + secret), lv)
  return JSON.parse(decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8'))
}

function getValidSecret(secret) {
  if (secret.length === 32) {
    return secret
  }
  return crypto.createHash('sha256').update(secret).digest('base64').substr(0, 32)
}

module.exports = {
  hashSecretKey,
  encrypt,
  decrypt
}
