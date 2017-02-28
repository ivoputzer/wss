/* global test */

test('module.exports.prototype', function () {
  const {equal} = require('assert')
  const Server = require(process.cwd())

  test('.listening', function () {
    test('is boolean', function () {
      equal(typeof Server.prototype.listening, 'boolean')
    })

    test('is `true` when ws.Server is listening', function () {
      Server.createServer().listen(0, function (done) {
        equal(this.listening, true)
        this.close(done)
      })
    })

    test('is `false` when ws.Server is not listening', function (done) {
      Server.createServer().listen(0, function () {
        this.close(() => {
          equal(this.listening, false)
          done()
        })
      })
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
