/* global test */

const {ok, equal} = require('assert')

test('module.exports', function () {
  const Server = require('../..')
  const WebSocket = require('ws')

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

    test('forks http.Server', function () {
      const {createServer} = require('http')

      test('is instance of ws.Server', function (done) {
        createServer()
          .listen(0, function () {
            ok(createServerFrom(this) instanceof WebSocket.Server)
            this.close(done)
          })
      })

      test.timeout('binds connectionListener', function (done) {
        createServer()
          .listen(0, function () {
            const {address, port} = this.address()
            createServerFrom(this)
              .on('connection', (ws) => {
                ws.close()
                this.close(done)
              })
            return new WebSocket(`ws://${address}:${port}`)
          })
      }, 5000)
    })

    test('forks https.Server', function () {
      const {createCertificate} = require('pem')
      const {createServer} = require('https')

      test('is instance of ws.Server', function (done) {
        createCertificate({days: 1, selfSigned: true}, (err, {serviceKey: key, certificate: cert}) => {
          if (err) done(err)
          createServer({key, cert})
            .listen(0, function () {
              ok(createServerFrom(this) instanceof WebSocket.Server)
              this.close(done)
            })
        })
      })

      test.timeout('binds connectionListener', function (done) {
        createCertificate({days: 1, selfSigned: true}, (err, {serviceKey: key, certificate: cert}) => {
          if (err) done(err)
          createServer({key, cert})
            .listen(0, function () {
              const {address, port} = this.address()
              createServerFrom(this)
                .on('connection', (ws) => {
                  ws.close()
                  this.close(done)
                })
              return new WebSocket(`wss://${address}:${port}`, {rejectUnauthorized: false})
            })
        })
      }, 5000)
    })
  })
})
