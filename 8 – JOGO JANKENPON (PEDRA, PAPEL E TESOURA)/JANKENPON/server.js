const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });
const clients = [];

server.on('connection', (ws) => {
    clients.push(ws);

    ws.on('message', (message) => {
        const data = JSON.parse(message);

        // Envia a mensagem para todos os clientes conectados
        clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(data));
            }
        });
    });

    ws.on('close', () => {
        const index = clients.indexOf(ws);
        if (index > -1) {
            clients.splice(index, 1);
        }
    });
});

console.log("Servidor WebSocket rodando na porta 8080.");
