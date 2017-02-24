/* global test */

test('module.exports', function () {
  const {Server: WebSocketServer} = require('ws')
  const {equal} = require('assert')

  test('is callable', function () {
    const Server = require(process.cwd())
    equal(typeof Server, 'function')
  })

  test('inherits from ws.Server', function () {
    const Server = require(process.cwd())
    equal(Server.constructor, WebSocketServer.constructor) // v 2.0.0
  })
})
