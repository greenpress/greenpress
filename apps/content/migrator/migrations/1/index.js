/**
 * initial migration - example file - nothing to migrate
 */

/**
 * check potential changes to migrate
 */
function check () {
  return Promise.resolve(false)
}

/**
 * migrate relevant db rows to fit the new upgrade
 */
function migrate () {
  return Promise.resolve()
}

/**
 * check if all migration changes done as expected
 */
function verify () {
  return Promise.resolve()
}

module.exports = {
  check, migrate, verify
}
