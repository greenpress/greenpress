const Client = require('ftp')
const { getSecret } = require('../../helpers/secrets-management')

class Ftp {
  constructor (storage) {
    this.name = storage.name
    this.ready = getSecret(storage.tenant, storage.authentication)
      .then(decrypted => {
        const auth = decrypted.value
        this._client = new Client()
        return new Promise((resolve, reject) => {
          this._client.connect({
            host: auth.host,
            user: auth.username,
            password: auth.password
          })
          this._client.on('ready', resolve)
          this._client.on('error', (err) => reject({ message: 'could not connect to FTP server: ' + auth.host, err }))
        })
      }, () => {
        throw new Error('could not read FTP credentials')
      })
  }

  list (path) {
    return new Promise((resolve, reject) => {
      this._client.list(path, (err, list) => {
        if (err) {
          return reject({ message: 'could not retrieve assets from storage: ' + this.name })
        }
        resolve(list || [])
      })
    })
  }

  upload (path, file) {
    return new Promise((resolve, reject) => {
      this._client.append(file, path, false, (err) => {
        if (err) {
          return reject({ message: 'could not upload asset to storage: ' + this.name })
        }
        resolve()
      })
    })
  }

  remove (path) {
    const pathArr = path.split('/')
    const currentItemToRemove = pathArr[pathArr.length - 1]

    return this.list(pathArr.slice(0, -1).join('/'))
      .then(list => {
        const item = list.find(item => item.name === currentItemToRemove)
        if (!item) {
          return Promise.reject({ message: 'asset with Identifier not found' })
        }

        return new Promise((resolve, reject) => {
          // remove for directories, delete for all the rest
          const actionToRun = item.type === 'd' ? 'remove' : 'delete'

          this._client[actionToRun](path, (err) => {
            if (err) {
              return reject({ message: 'could not remove asset from storage: ' + path })
            }
            resolve()
          })
        })
      })
  }

  destroy () {
    if (this._client) {
      this._client.destroy()
    }
  }
}

module.exports = Ftp
