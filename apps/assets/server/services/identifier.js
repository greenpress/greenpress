const uniqid = require('uniqid');

function generateIdentifier(name, extension) {
  return `${name}-${uniqid()}.${extension}`;
}


module.exports = {
  generateIdentifier
};
