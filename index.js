const {Server} = require('ws')

Server.prototype.listening = false
Server.prototype.listen = function (...args) {
  return this._server
    .listen(...args)
    .once('listening', () => {
      this.listening = true
    })
}
Server.prototype.close = function (...args) {
  if (this.clients) {
    for (const client of this.clients) client.terminate()
  }
  this._ultron.destroy()
  this._ultron = null
  return this._server.close(...args)
}
module.exports = Server // v 1
module.exports.createServerFrom = createServerFrom
module.exports.createServer = createServer

function createServerFrom (server, connectionListener) {
  if (typeof server === 'undefined') throw new Error('must provide server')
  const wss = new Server({server})
  return connectionListener
    ? wss.on('connection', connectionListener)
    : wss
}

function createServer (options = {}, connectionListener) {
  if (typeof options === 'function') {
    connectionListener = options
    options = {}
  }
  const server = createServerFor(options)
  return createServerFrom(server, connectionListener) // v 2
  function createServerFor (options) {
    return options.key && options.cert || options.pfx
      ? require('https').createServer(options, requestListener)
      : require('http').createServer(requestListener)
  }

  function requestListener (req, res) {
    const {STATUS_CODES: {'426': status}} = require('http')
    res.writeHead(426, {
      'content-length': status.length,
      'content-type': 'text/plain'
    })
    res.end(status)
  }
}

// module.exports.createCluster = (...args) => {
//   return function createClusterFor (argument) {
//     // body...
//   }.call(this)
// //   const {options, connectionListener} = parse(args)
// //   function parse (args) {
// //     return {
// //       options,
// //       connectionListener () {
// //       }
// //     }
// //   }
// }
