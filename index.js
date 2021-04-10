
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port:process.env.PORT|| 8080 });
let arr=[]
var connectCounter=0;
wss.on('connection', function connection(ws) {
  console.log("CONNECTED")
    connectCounter++;
    if(connectCounter<=5){
  ws.on('message', function incoming(data) {
    wss.clients.forEach(function each(client) {
        
      if (client.readyState === WebSocket.OPEN) {
        console.log(data)
        client.send(data);
      }
      else if (client.readyState === WebSocket.CLOSED) {
        connectCounter--;
      }
    
});
  })}
  else{
    ws.send("The room is full, you are not allowed to chat but you can see the messages.")
};
});

