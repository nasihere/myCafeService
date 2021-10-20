// Node.js socket server script
import net from 'net';
// Create a server object
export  class Socket {
  socketGlobal  = null;
  constructor() {
    
    const server = net.createServer((socket) => {
      this.socketGlobal = socket;
      socket.on('error', err=>{
        console.error('connected socket: ' + err);
       });
      socket.on('data', (data) => {
        if (!data) return;       
        try {
          console.log(data.toString());
        }
        catch(e) {}
        
      });
      

      // socket.end('SERVER: Closing connection now.<br>');
    }).on('error', (err) => {
      console.error(err);
    });
    // Open server on port 9898
    server.listen(9898, () => {
      //@ts-ignore
      console.log('opened server on', server.address().port);
    });

  }
  send(obj) {
    this.socketGlobal.write(JSON.stringify(obj));
  }
}