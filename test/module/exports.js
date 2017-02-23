/* global test */

const {ok, equal, throws, doesNotThrow} = require('assert')
const {createCertificate} = require('pem')

test('module.exports', function () {
  const Server = require('../..')
  const WebSocket = require('ws')

  test('is callable', function () {
    equal(typeof Server, 'function')
  })

  test(`inherits from ${WebSocket.Server.name}`, function () {
    equal(Server.name, WebSocket.Server.name) // v 2.0.0
  })

  test('.createServerFrom(http[s].Server)', function () {
    const {createServerFrom} = require('../..')

    test('is callable', function () {
      equal(typeof createServerFrom, 'function')
    })

    test('throws on empty args', function () {
      throws(createServerFrom, /must provide server/)
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

      test.timeout('binds messageListeners', function (done) {
        createServer()
          .listen(0, function () {
            const {address, port} = this.address()
            createServerFrom(this)
              .on('connection', (ws) => {
                ws.on('message', (data) => {
                  equal(data.toString(), 'string')
                  ws.close()
                  this.close(done)
                })
              })
            return new WebSocket(`ws://${address}:${port}`)
              .on('open', function () {
                this.send('string')
              })
          })
      }, 5000)
    })

    test('forks https.Server', function () {
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

      test.timeout('binds messageListeners', function (done) {
        createCertificate({days: 1, selfSigned: true}, (err, {serviceKey: key, certificate: cert}) => {
          if (err) done(err)
          createServer({key, cert})
            .listen(0, function () {
              const {address, port} = this.address()
              createServerFrom(this)
                .on('connection', (ws) => {
                  ws.on('message', (data) => {
                    equal(data.toString(), 'string')
                    ws.close()
                    this.close(done)
                  })
                })
              return new WebSocket(`wss://${address}:${port}`, {rejectUnauthorized: false})
                .on('open', function () {
                  this.send('string')
                })
            })
        })
      }, 5000)
    })
  })
  test('.createServer([options, requestListener])', function () {
    const {createServer} = require('../..')

    test('is callable', function () {
      equal(typeof createServer, 'function')
    })

    test('args are conditional', function () {
      doesNotThrow(() => createServer(Function.prototype))
      doesNotThrow(() => createServer({}, Function.prototype))
    })

    test('returns http.Server on empty args', function () {
      ok(createServer() instanceof require('http').Server)
    })

    test('returns https.Server for tls options', function (done) {
      createCertificate({days: 1, selfSigned: true}, (err, {serviceKey: key, certificate: cert}) => {
        if (err) done(err)
        ok(createServer({key, cert}) instanceof require('https').Server)
        done()
      })
    })
  })
})
