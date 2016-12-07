'use strict'

const fs = require('fs-extra')
const path = require('path')
const glob = require('glob-all')

module.exports = ({
  inputDirectory = 'src',
  outputDirectory = 'dist',
  configName = 'service-worker-config.js',
  scope = '/',
  navigatorProperty = 'serviceWorkerConfig',
  prefetchRoot = true,
  prefetchResources = [],
  prefetchResourceGlobs = [],
  globOptions = {},
  dryRun = false,
  disableEslint = process.env.NODE_ENV !== 'production',
  verbose = process.env.NODE_ENV !== 'production'
} = {}) => {
  const foundResources = glob.sync(prefetchResourceGlobs,
    Object.assign(globOptions, {
      cwd: inputDirectory,
      nodir: true
    })
  )

  const allResources = prefetchResources.concat(foundResources)

  if (prefetchRoot) {
    allResources.unshift('')
  }

  const resources = allResources.map(res => `${scope}${res}`)

  if (verbose) {
    for (const res of resources) {
      console.log(`Added '${res}' to be prefetched`)
    }
  }

  const resourcesAsString = resources.map(res => `    '${res}'`).join(',\n')
  const eslint = disableEslint ? '/* eslint-disable */\n' : ''

  const template =
`${eslint}navigator.${navigatorProperty} = {
  prefetch: [
${resourcesAsString}
  ]
}`

  const filePath = path.join(outputDirectory, configName)

  if (verbose) {
    console.log(`Trying to save Service Worker config in '${filePath}' ...`)
  }

  if (!dryRun) {
    fs.ensureDirSync(outputDirectory)
    fs.writeFileSync(filePath, template)
  }

  if (verbose) {
    console.log('... done.')
  }
}
