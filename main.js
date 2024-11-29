const express = require("express");
const ws = require("ws");

const app = express();
const port = 9090;


const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


const webSocket = new ws.Server({ server });

let users = []; 

webSocket.on("connection", (socket) => {
    console.log("New WebSocket connection");

    
    socket.send(JSON.stringify(users));

    
    socket.on("message", (message) => {
        const user = JSON.parse(message);
        users.push(user); 
        

        webSocket.clients.forEach((client) => {
            if (client.readyState === ws.OPEN) {
                client.send(JSON.stringify(user));
            }
        });

        console.log("New user added:", user);
    });

    socket.on("close", () => {
        console.log("Client disconnected");
    });
});


app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});
