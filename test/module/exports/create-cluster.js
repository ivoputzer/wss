/* global test */
const {equal} = require('assert')

test('module.exports.createClusterFrom([options[, connectionListener]])', function () {
  const {createCluster} = require(process.cwd())

  test.skip('is callable', function () {
    equal(typeof createCluster, 'function')
  })
})

test('module.exports.createClusterFrom([options[, connectionListener]])', function () {
  const {createClusterFrom} = require(process.cwd())

  test.skip('is callable', function () {
    equal(typeof createClusterFrom, 'function')
  })
})
