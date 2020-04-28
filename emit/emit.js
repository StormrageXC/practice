const net = require('net'),
    events = require('events'),
    channel = new events.EventEmitter();
    channel.setMaxListeners(2);
channel.clients = {};
channel.subscriptions = {};

channel.on('join', function (id, client) {
    console.log(`welcome ${id}`);
    this.clients[id] = client;
    this.subscriptions[id] = (Id, data) => {
        if (id !== Id) {
            this.clients[id].write(data);
        }
    };
    this.on('broadcast', this.subscriptions[id]);
});

channel.on('leave', function (id) {
    console.log(`see you ${id}`);
    channel.removeListener('broadcast', this.subscriptions[id]);
    channel.emit('broadcast', id, `${id} has left the chatroom. `);
});

channel.on('shutdown', function (id) {
    console.log(`shutdow`);
    channel.emit('broadcast', '', `The server has shut down `);
    channel.removeAllListeners('broadcast');
});

const server = net.createServer(client => {
    const id = `${client.remoteAddress}:${client.remotePort}`;
    channel.emit('join', id, client);
    client.on('data', data => {
        data = data.toString();
        console.log(data);
        if (data === 'shutdown\r\n') {
            channel.emit('shutdown');
        }
        channel.emit('broadcast', id, data);
    });
    client.on('close', () => {
        console.log(`close`);
        channel.emit('leave', id);
    });
})
server.listen(8888, () => {
    console.log('http://localhost:8888')
});