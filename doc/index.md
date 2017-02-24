### ws.Server
the ws.Server object is inherited from [ws](http://npmjs.org/ws)

### wss.createServerFrom(http[s].Server)
returns a new `ws.Server` based on given web server object. throws if no server is given.

### wss.createServer([options[, connectionListener]])

returns a new `http` or `https` web server object based on given options.  options are similar to `tls.createServer()`. The connectionListener is a function which is automatically added to the 'connection' event.

returns a new instance of http[s].Server

The connectionListener is a function which is automatically added to the 'connection' event.
