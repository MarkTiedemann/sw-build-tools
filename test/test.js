'use strict'

const test = require('ava')
const fs = require('fs-extra')
const tools = require('../')

test('generates config', assert => {
  // 1. generate
  tools.generateConfig({
    outputDirectory: 'test'
  })

  // 2. read
  const path = 'test/service-worker-config.js'
  const config = fs.readFileSync(path)

  // 3. test
  assert.is(config.toString(),
`/* eslint-disable */
navigator.serviceWorkerConfig = {
  prefetch: [
    '/'
  ]
}`)

  // 4. cleanup
  fs.unlinkSync(path)
})

test('syncs version', assert => {
  const fixture = 'service-worker-fixture.js'

  // 1. generate
  tools.syncVersion({
    serviceWorkerDirectory: 'test',
    serviceWorkerFile: fixture
  })

  // 2. read
  const path = 'test/' + fixture
  const worker = fs.readFileSync(path)

  // 3. test
  assert.is(worker.toString(),
`/* eslint-disable */

const VERSION = '0.1.0'
`)

  // 4. cleanup
  fs.writeFileSync(path,
`/* eslint-disable */

const VERSION = '0.0.0'
`)
})
