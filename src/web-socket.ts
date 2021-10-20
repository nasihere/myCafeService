// Node.js socket server script
import net from 'net';
// Create a server object
export default class Socket {
  write  = null;
  constructor() {
    
    const server = net.createServer((socket) => {
      
      socket.on('data', (data) => {
        console.log(data.toString());
      });
      socket.write('SERVER: Hello! This is server speaking.<br>');
      this.write = socket.write;
      // socket.end('SERVER: Closing connection now.<br>');
    }).on('error', (err) => {
      console.error(err);
    });
    // Open server on port 9898
    server.listen(9898, () => {
      console.log('opened server on', server.address().port);
    });

  }
}