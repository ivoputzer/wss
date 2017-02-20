/* global test */

const {ok, equal, deepEqual} = require('assert')

const WebSocket = require('ws')
const Server = require('../..')

test('module/exports', function () {
  test('is callable', isFunction(Server))
  test(`inherits from ${Server.name}`, function () {
    const {Server: {name}} = require('ws')
    equal(Server.name, name)
  })
  test('.createServerFrom(net.Server)', function () {
    test('is callable', isFunction(Server.createServerFrom))
    test('attaches to net.Server', function () {
      const {Server: {name}} = require('ws')
      const {createServer} = require('http')
      const server = Server.createServerFrom(createServer())
      equal(server.constructor.name, name)
    })
    test('returns instance of ws.Server', function () {
      const {createServer} = require('http')
      const server = Server.createServerFrom(createServer())
      ok(server instanceof require('ws').Server)
    })
    // test('attaches to connectionListener', function(done) {
    // })
    test('wraps http.Server', function (done) {
      const {createServer} = require('http')
      const http = createServer().listen(0, onceListening)
      Server.createServerFrom(http).on('connection', (ws) => ws.close())
      function onceListening () {
        const {address: host, port} = this.address()
        new WebSocket(`ws://${host}:${port}`)
          .on('close', () => this.close(() => done()))
      }
    })
  })
  test('.createServer([Function: connectionListener])', function () {
    test('is callable', isFunction(Server.createServer))
    test('creates http.Server', function () {
      ok(Server.createServer() instanceof require('http').Server)
    })
  //   const {createServer} = WebSocketServer
  //   test('is callable', isFunction(createServer))
  //   test('connectionListener is bound to 'connection' event', function (done) {
  //     WebSocketServer
  //       .createServer(Function.prototype)
  //       .listen(0, function onceListening () {
  //         console.log(this)
  //         this.close()
  //         done()
  //       })
  //   })
  //   // test.skip('createServer()')
  //   // test.skip('createServer(connectionListener)')
  //   // test.skip('createServer(options, connectionListener)')
  })
  // test('.createCluster([options[, connectionListener]])', function () {
  //   test('is callable', isFunction(WebSocketServer.createCluster))
  //   // test.skip('createCluster()')
  //   // test.skip('createCluster(connectionListener)')
  //   // test.skip('createCluster(options, connectionListener)')
  // })
})

function isFunction (type) {
  return function (done) {
    equal(typeof type, 'function', `expected ${type} to be callable`)
    done(null)
  }
}
