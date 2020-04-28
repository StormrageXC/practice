const http = require('http'),
    fs = require('fs');
http.createServer((req, res) => {
    getTitle(res);
}).listen(8000, () => {
    console.log('server start')
});

function getTitle(res) {
    fs.readFile('./title.json', (err, data) => {
        if (err) return hadError(err, res);
        getTemplate(JSON.parse(data.toString()), res);
    })
}

function getTemplate(titles, res) {
    fs.readFile('./callback_tempalte.html', (err, data) => {
        if (err) return hadError(err, res);
        formatHtml(titles, data.toString(), res);
    })
}

function formatHtml(titles, template, res) {
    const html = template.replace('%', titles.join('</li><li>'));
    res.writeHead(200, { 'Contend-Type': 'text/html' });
    res.end(html);
}

function hadError(err, res) {
    console.error(err)
    res.end('Server Error');
}