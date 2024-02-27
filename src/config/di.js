const { default: DIContainer, factory } = require('rsdi')
const path = require('path')
const fs = require('fs')
const multer = require('multer')

function configureMainJSONDatabase() {
  return process.env.JSON_DB_PATH
}

function configureBackupJSONDatabase() {
  return process.env.JSON_DB_BACKUP_PATH
}

function configureMulter() {
  const storage = multer.diskStorage({
    destination: function (req, res, cb) {
      cb(null, 'public/uploads/')
    },
    filename: function (_, file, cb) {
      const ext = path.extname(file.originalname)
      cb(null, `${Date.now()}${ext}`)
    },
  })

  return multer({ storage })
}

/** @param {DIContainer} container */
function addCommonDefinitions(container) {
  container.add({
    fs: factory(() => fs),
    multer: factory(configureMulter),
    JSONDatabase: factory(configureMainJSONDatabase),
    JSONDatabaseBackup: factory(configureBackupJSONDatabase),
  })
}

module.exports = function configureDI() {
  const container = new DIContainer()
  addCommonDefinitions(container)
  return container
}
