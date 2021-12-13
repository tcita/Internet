const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });
console.log('Server running at http://127.0.0.1:8080/');

server.on('open', function open() {
  console.log('connected');
});

server.on('close', function close() {
  console.log('disconnected');
});

server.on('connection', function connection(ws, req) {
  

  const ip = req.connection.remoteAddress;
  const port = req.connection.remotePort;
  const clientName = ip + port;

  console.log('%s is connected', clientName)

  // 歡迎client
  ws.send("Welcome " + clientName);

  ws.on('message', function incoming(message) {
    console.log('received: %s from %s', message, clientName);
    
    // broadcast msg to all clients
    server.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send( clientName + "  says -> " + message);
      }
    });

  });

});