const http = require('http');
const SERVER_PORT = 8000;

const server = http.createServer((req, resp) => {
    resp.writeHead(200, {
       'Content-Type': 'text/plain'
   });

    resp.end('Hello World\n');
});

server.listen(SERVER_PORT, () => {
    console.log(`Hello World. Server listening on ${SERVER_PORT}`);
});