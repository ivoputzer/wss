/* global test */
const WebSocket = require('ws')
const {ok, equal} = require('assert')

test('module.exports', function () {
  const Server = require('../..')

  test('is callable', function () {
    equal(typeof Server, 'function')
  })

  test(`inherits from ${WebSocket.Server.name}`, function () { // legacy is ok
    equal(Server.name, WebSocket.Server.name)
  })

  test('.createServerFrom(net.Server)', function () {
    const {createServerFrom} = require('../..')

    test('is callable', function () {
      equal(typeof createServerFrom, 'function')
    })

    test('forks net.Server', function (done) {
      const {createServer} = require('net')
      const server = createServer().listen(0, close(done))
      ok(createServerFrom(server) instanceof WebSocket.Server)
    })

    test('forks http.Server', function (done) {
      const {createServer} = require('http')
      const server = createServer().listen(0, close(done))
      ok(createServerFrom(server) instanceof WebSocket.Server)
    })

    test('forks https.Server', function (done) {
      const {createCertificate} = require('pem')
      const {createServer} = require('https')
      createCertificate({days: 1, selfSigned: true}, (err, {serviceKey: key, certificate: cert}) => {
        if (err) done(err)
        const server = createServer({key, cert}).listen(0, close(done))
        ok(createServerFrom(server) instanceof WebSocket.Server)
      })
    })

    function close (done) {
      return function () {
        this.close(done)
      }
    }
  })
})
