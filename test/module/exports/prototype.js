/* global test */

test('module.exports.prototype', function () {
  const {equal} = require('assert')
  const Server = require(process.cwd())

  test('.listening', function () {
    test('is boolean', function () {
      equal(typeof Server.prototype.listening, 'boolean')
    })
  })

  test('.listen()', function () {
    test('is callable', function () {
      equal(typeof Server.prototype.listen, 'function')
    })
    // match against?
    // require('http').Server.prototype.listen
    // require('https').Server.prototype.listen
  })

  test('.close([callback])', function () {
    test('is callable', function () {
      equal(typeof Server.prototype.close, 'function')
    })
    // match against?
    // require('http').Server.prototype.close
    // require('https').Server.prototype.close
  })
})
