const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    read = require('node-readability'),
    Article = require('./db').Article;
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/css/bootstrap.css', express.static('node_modules/bootstrap/dist/css/bootstrap.css'));
app.get('/', (req, res, next) => {
    res.send('It is ok');
});
app.get('/articles', (req, res, next) => {
    Article.all((err, articles) => {
        if (err) return next(err);
        res.format({
            html: () => {
                res.render('articles.ejs', { articles: articles });
            },
            json: () => {
                res.send(articles);
            }
        });
    });
});
app.get('/articles/:id', (req, res, next) => {
    const id = req.params.id;
    Article.find(id, (err, article) => {
        if (err) return next(err);
        res.send(article.content);
    });
});
// CMD curl -X DELETE http://localhost:8080/articles/1
app.delete('/articles/:id', (req, res, next) => {
    const id = req.params.id;
    Article.delete(id, (err) => {
        if (err) return next(err);
        res.send({ message: 'delete success' });
    });
});
// CMD curl -d "url=http://manning.com/cantelon2/" http://localhost:8080/articles
app.post('/articles', (req, res, next) => {
    const url = req.body.url;
    read(url, (err, req) => {
        if (err || !req) res.status(500).send('ERROR LOADING');
        Article.create({
            title: req.title,
            content: req.content
        }, (err, article) => {
            if (err) return next(err);
            res.send(`${article} CREATE SUCCESS`);
        })
    })

})
app.listen(app.get('port'), () => {
    console.log(`server start ${app.get('port')}`)
})

module.exports = app