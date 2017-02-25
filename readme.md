# wss
[![travis][travis-image]][travis-url] [![npm-dependencies][npm-dependencies-image]][npm-dependencies-url] [![standard-js][standard-js-image]][standard-js-url] [![npm-package-quality][npm-package-quality-image]][npm-package-quality-url] [![npm-node-version][npm-node-version-image]][npm-node-version-url] [![npm-version][npm-version-image]][npm-version-url] [![npm-license][npm-license-image]][npm-license-url]

wrapper built upon [ws](https://www.npmjs.org/package/ws) module that provides standard server api only.

#### usage with server creation

```javascript
const {createServer} = require('wss')

createServer(function connectionListener (ws) {
  ws.send('welcome!')
  ws.on('message', (data) => {
    ws.send(data.toString()) // echo-server
  })
})
.listen(8080, function () {
  const {address, port} = this.address() // this is the http[s].Server
  console.log('listening on http://%s:%d (%s)', /::/.test(address) ? '0.0.0.0' : address, port)
})
```

#### usage with existent server
```javascript
const {createServer} = require('http')
const {createServerFrom} = require('wss')

const http = createServer()
createServerFrom(http, function connectionListener (ws) {
  ws.send('welcome!')
  ws.on('message', (data) => {
    ws.send(data.toString()) // echo-server
  })
})
http.listen(8080)
```

### wss
the `ws.Server` object is inherited from [ws](http://npmjs.org/ws)

### wss.prototype.close([callback])
stops the server from accepting new connections.

### wss.prototype.listen(handle[, callback])
the `handle` object can be set to either a server or socket (anything with an underlying _handle member), or a `{fd}` object. This function is asynchronous. callback will be added as a listener for the `listening` event.

### wss.prototype.listen(path[, callback])
start a unix socket server listening for connections on the given path. this function is asynchronous. callback will be added as a listener for the `listening` event.

### wss.prototype.listen([port[, hostname[, backlog[, callback]]]])
begin accepting connections on the specified port and hostname. if the hostname is omitted, the server will accept connections on any ipv6 address (::) when ipv6 is available, or any ipv4 address (0.0.0.0) otherwise. omit the port argument, or use a port value of 0, to have the operating system assign a random port, which can be retrieved by using server.address().port after the `listening` event has been emitted.

to listen to a unix socket, supply a filename instead of port and hostname.

backlog is the maximum length of the queue of pending connections. The actual length will be determined by your OS through sysctl settings such as `tcp_max_syn_backlog` and somaxconn on linux. The default value of this parameter is `511`. This function is asynchronous. `callback` will be added as a listener for the `listening` event.

Note: The server.listen() method may be called multiple times. Each subsequent call will re-open the server using the provided options.

### wss.createServerFrom(server=http.Server|https.Server)
returns a new `ws.Server` based on given web server object.
throws if no server is given.

### wss.createServer([options[, connectionListener]])
returns a new `ws.Server` based on given options and connectionListener. underlaying `https` server is created when `tls` options have been provided as of`tls.createServer()`, otherwise it will fallback to a `http` implementation. the connectionListener is a function which is automatically added to the `connection` event.

[travis-image]: https://img.shields.io/travis/ivoputzer/wss.svg?style=flat-square
[travis-url]: https://travis-ci.org/ivoputzer/wss
[npm-dependencies-image]: https://img.shields.io/badge/dependencies-up%20to%20date-blue.svg?style=flat-square&colorB=44CC11
[npm-dependencies-url]: package.json
[standard-js-image]: https://img.shields.io/badge/coding%20style-standard-brightgreen.svg?style=flat-square
[standard-js-url]: http://standardjs.com/
[npm-package-quality-image]: http://npm.packagequality.com/shield/wss.svg?style=flat-square&colorB=44CC11
[npm-package-quality-url]: http://packagequality.com/#?package=wss
[npm-node-version-image]: https://img.shields.io/badge/node-6%2B-blue.svg?style=flat-square
[npm-node-version-url]: https://nodejs.org/docs/v6.0.0/api
[npm-version-image]: https://img.shields.io/npm/v/wss.svg?style=flat-square&colorB=007EC6
[npm-version-url]: https://www.npmjs.com/package/wss
[npm-license-image]: https://img.shields.io/npm/l/wss.svg?style=flat-square&colorB=007EC6
[npm-license-url]: https://spdx.org/licenses/MIT
