const {Server} = require('ws')

module.exports = Server
module.exports.createServerFrom = createServerFrom
module.exports.createServer = createServer

function createServerFrom (server) {
  if (typeof server === 'undefined') throw new Error('must provide server')
  return new Server({server})
}

function createServer (options = {}, connectionListener, {assign} = Object) {
  if (typeof options === 'function') {
    connectionListener = options
    options = {} // http server
  }

  const web = createServerFrom(options)
  const wss = createServerFrom(web)

  if (connectionListener) wss.on('connection', connectionListener)
  return assign(web, {allowHalfOpen: false}) // how to attach subsequent connection listeners at this point?

  function createServerFrom (options) {
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
