/* global test */

const {ok, equal, throws} = require('assert')
const WebSocket = require('ws')

test('module.exports.createServer([options, requestListener])', function () {
  const {createServer} = require(process.cwd())
  const {createCertificate} = require('pem')

  test('is callable', function () {
    equal(typeof createServer, 'function')
  })

  test('returns instance of ws.Server', function () {
    ok(createServer() instanceof WebSocket.Server)
  })

  test('forks http.Server by default', function (done) {
    const {Server} = require('http')
    createServer()
      .listen(0, function () {
        ok(this.close(done) instanceof Server)
      })
  })

  test('forks https.Server when `tls` options are provided', function (done) {
    const {Server} = require('https')
    createCertificate({days: 1, selfSigned: true}, (err, {serviceKey: key, certificate: cert}) => {
      if (err) done(err)
      createServer({key, cert})
        .listen(0, function () {
          ok(this.close(done) instanceof Server)
        })
    })
  })

  test.timeout('connectionListener added to `connection` event queue', function (done) {
    createServer(connectionListener)
      .listen(0, function () {
        const {address, port} = this.address()
        return new WebSocket(`ws://${address}:${port}`)
      })
    function connectionListener (ws) {
      this.close(done)
    }
  }, 5000)
})

test('module.exports.createServerFrom(server[, connectionListener])', function () {
  const {createServerFrom} = require(process.cwd())

  test('is callable', function () {
    equal(typeof createServerFrom, 'function')
  })

  test('throws on empty args', function () {
    throws(createServerFrom, /must provide server/)
  })

  test('when server is http.Server', function () {
    const {createServer} = require('http')

    test('returns instance of ws.Server', function (done) {
      createServer()
        .listen(0, function () {
          ok(createServerFrom(this) instanceof WebSocket.Server)
          this.close(done)
        })
    })

    test('binds optional `connectionListener` to `request` event', function (done) {
      createServer()
        .listen(0, function () {
          const {address, port} = this.address()
          createServerFrom(this, (ws) => {
            ws.close()
            this.close(done)
          })
          return new WebSocket(`ws://${address}:${port}`)
        })
    })

    test.timeout('emits `connection` event', function (done) {
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

    test.timeout('emits `message` event on websocket', function (done) {
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

  test('when server is https.Server', function () {
    const {createServer} = require('https')
    const {createCertificate} = require('pem')

    test('returns instance of ws.Server', function (done) {
      createCertificate({days: 1, selfSigned: true}, (err, {serviceKey: key, certificate: cert}) => {
        if (err) done(err)
        createServer({key, cert})
          .listen(0, function () {
            ok(createServerFrom(this) instanceof WebSocket.Server)
            this.close(done)
          })
      })
    })

    test.timeout('emits `connection` event', function (done) {
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

    test.timeout('emits `message` event', function (done) {
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

