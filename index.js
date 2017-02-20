const {Server} = require('ws')

module.exports = Server
module.exports.createServerFrom = createServerFrom
module.exports.createServer = createServer

function createServerFrom (server) {
  return new Server({server})
}

function createServer (connectionListener = Function.prototype) {
  const {STATUS_CODES, createServer} = require('http')
  const server = createServer(requestListener)
  // const listen = server.listen.bind(server) // ready to hook
  createServerFrom(server)
    .on('connection', connectionListener)
    // how to attach subsequent connection listeners at this point?
  return server // assign(server, {allowHalfOpen: false, listen})
  function requestListener (req, res) {
    res.writeHead(426, {
      'content-length': STATUS_CODES[426].length,
      'content-type': 'text/plain'
    })
    res.end(STATUS_CODES[426])
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
