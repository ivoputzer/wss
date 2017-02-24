# wss
wrapper made upon the well known [ws module](https://www.npmjs.org/package/ws) that provides server api only.


#### usage without http server

```javascript
const {createServer} = require('wss')

createServer(function connectionListener(websocket) {
  websocket.send('welcome!')
  websocket.on('message', (data) => {
    websocket.send(data.toString()) // echo-server
  })
}).listen(8080, function () {
  const {address, family, port} = this.address()
  console.log('listening on http://%s:%d (%s)', /::/.test(address) ? '0.0.0.0' : address, port, family)
})
```
- [] how do i pass options to ws.Server

      maxPayload: 100 * 1024 * 1024,
      perMessageDeflate: true,
      handleProtocols: null,
      clientTracking: true,
      verifyClient: null,
      noServer: false,
      backlog: null, // use default (511 as implemented in net.js)
      ?? server: null,
      // host: null,
      ?? path: null,
      // port: null


this._server = http.createServer((req, res) => {
        const body = http.STATUS_CODES[426];

        res.writeHead(426, {
          'Content-Length': body.length,
          'Content-Type': 'text/plain'
        });
        res.end(body);
      });
      this._server.allowHalfOpen = false;
      this._server.listen(options.port, options.host, options.backlog, callback);


- [] how do i start createServer over SSL

## examples
    const wss = require('wss')

    const http = require('http')
    const https = require('https')

    [http, https].createServer([options [, requestListener])
      .listen()

    [http, https].createServer([options])
      .on('request', requestListener)
      .listen()

    wss.createServer(connectionListener)
      => http.Server
        .listen()

    wss.createServer(connectionListener)
      => http.Server
        .listen()

    wss.createCluster()
      => http.Server
        .listen()

    /////////////////// legacy api /////////////////

    wss.createServerFrom(server)
      => ws.Server (WebSocketServer)
        .on('connection', connectionListener)

    .createServerFrom(net.Server, connectionListener)
      => ws.Server (WebSocketServer)

    .createServerFrom(net.Server)
      => ws.Server // .name WebSocketServer
        .on('connection', connectionListener)



    function requestListener (req, res) {
      res.sendStatus(200, {})
      res.end('ciao')
    }

    function connectionListener (ws) {
      ws.send()
      ws.broadcast() // wss-connect middleware?
      ws.on('open', Function.prototype)
      ws.on('close', Function.prototype)
      ws.on('message', Function.prototype)
    }
// simple usage
// const wss = require('wss')
// wss.createServer(function connectionListener (ws) {
//   ws.send(String.prototype)
//   ws.broadcast(String.prototype)
//   ws.on('message', (data) => {
//     ws.send(data.toString())
//   })
// })
// .listen(8080, function () {
//   console.log(this.address())
// })

// wrap another http/s webserver
// const http = require('http').createServer(function (req, res) {
//   let status = 'running'
//   res.writeHead(200, {'content-type': 'text/plain'})
//   res.end(JSON.stringify({status}))
// }).listen(8080)

// require('wss').createServerFrom(http, )

// const http = require('http').createServer(requestListener)
// require('wss')
//   .createServerFrom(http)
//   .on('connection', connectionListener)
