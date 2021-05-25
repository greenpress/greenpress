const { getItem, setItem } = require('../dao/secrets');
const { hashSecretKey, encrypt, decrypt } = require('./encryptions')

function setEncrypted(tenant, key, value, userToken) {
  const hashedKey = hashSecretKey(tenant + key);
  const encryptedValue = encrypt({ key, value, userToken }, key + userToken + tenant);
  return setItem(tenant, hashedKey, encryptedValue);
}

function getDecrypted(tenant, key, userToken) {
  return getItem(tenant, hashSecretKey(tenant + key))
    .then(secret => decrypt(secret.value, key + userToken + tenant))
    .then(decoded => {
      if (!(decoded.key === key && decoded.userToken === userToken)) {
        throw new Error('data may be invalid or you are not allowed');
      }
      return {
        key,
        value: decoded.value
      };
    });
}

module.exports = {
  setEncrypted,
  getDecrypted
}
