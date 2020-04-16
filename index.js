// const http = require('http'),
//     port = 8080,
//     server = http.createServer((req, res) => {
//         res.end('hi baby');
//     })
// server.listen(port, () => {
//     console.log(`http://localhost:`, port)
// });

// const express = require('express'),
// app = express();
// app.get('/', (req, res) => {
//     res.send('hello node')
// })
// app.listen(8000, () => {
//         console.log(`http://localhost:8000`)
// });

const test = require('./test.js');
console.log(new test.a());