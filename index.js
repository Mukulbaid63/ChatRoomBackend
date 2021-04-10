
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port:process.env.PORT|| 8080 });
var connectCounter=0;
wss.on('connection', function connection(ws) {
  console.log("CONNECTED")
    connectCounter++;
    ws.on('close',()=>{
      connectCounter--;
      console.log(connectCounter)
    })
    if(connectCounter<=5){
  ws.on('message', function incoming(data) {
    wss.clients.forEach(function each(client) {
        
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
     
});
  })
}
  else{
    ws.send("The room is full, you are not allowed to chat but you can see the messages.")
};
});

