const express = require("express");
const ws = require('ws');

// Create an instance of express
const instance = express();
const port = 9090;
const server = instance.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// WebSocket server setup
const webSocket = new ws.Server({ server });

let data=null;

webSocket.on('connection', (socket) => {
    console.log('WebSocket connected on server side');

    if (data) {
        socket.send(JSON.stringify(data));
    }

    socket.on('message', (message) => {
         data = JSON.parse(message);

        webSocket.clients.forEach((client) => {
            if (client.readyState === ws.OPEN) {
                client.send(JSON.stringify({
                    name: data.name,
                    age: data.age,
                    gender: data.gender,
                    skills: data.skills
                }));
            } else {
                console.error("Error: client not open");
            }
        });

        console.log('Received message:', message.toString());
    });
});

// Serve static files (HTML, JS, etc.)
instance.use(express.static(__dirname + "/public"));

// Serve the HTML page at root
instance.get("/", (request, response) => {
    response.sendFile(__dirname + "/index.html");
});
