const app = require('@greenpress/api-kit').app()
const { getStorageById, createStorage, getStorageList, removeStorage, updateStorage, getStorage } = require('../controllers/storage')

app
  .get('/api/storage', getStorageList)
  .post('/api/storage', createStorage)
  .get('/api/storage/:storageId', getStorageById, getStorage)
  .put('/api/storage/:storageId', getStorageById, updateStorage)
  .delete('/api/storage/:storageId', getStorageById, removeStorage)
