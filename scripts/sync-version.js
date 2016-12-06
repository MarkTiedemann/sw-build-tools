'use strict'

const fs = require('fs-extra')
const path = require('path')
const x = require('throw-if-missing')

const getPackageVersion = () => {
  try {
    return require(path.join(process.cwd(), 'package.json')).version
  } catch (e) {
    return false
  }
}

module.exports = ({
  version,
  versionVariableName = 'VERSION',
  versionVariableSingleQuotes = true,
  serviceWorkerDirectory = process.cwd(),
  serviceWorkerFile = 'service-worker.js',
  dryRun = false,
  verbose = process.env.NODE_ENV !== 'production'
} = {}) => {
  const swVersion = version || getPackageVersion() || x`version`

  const filePath = path.join(serviceWorkerDirectory, serviceWorkerFile)

  const oldFile = fs.readFileSync(filePath).toString()

  const regExp = new RegExp(`${versionVariableName}`
    + '(\\s?)=(\\s?)(\'|")(.{5})(\'|")', 'g')

  const quotes = versionVariableSingleQuotes ? '\'' : '"'

  const newFile = oldFile.replace(regExp,
    `${versionVariableName} = ${quotes}${swVersion}${quotes}`)

  if (verbose) {
    console.log('Trying to synchronize version '
      + `'${swVersion}' with '${filePath}' ...`)
  }

  if (!dryRun) {
    fs.writeFileSync(filePath, newFile)
  }

  if (verbose) {
    console.log('... done.')
  }
}
