const sqlite3 = require('sqlite3').verbose(),
    name = 'articles',
    db = new sqlite3.Database(name);
db.serialize(() => {
    const sql = `CREATE TABLE IF NOT EXISTS articles
        (id integer primary key, title, content TEXT)`;
    db.run(sql);
});

class Article {
    static all(callback) {
        db.all('SELECT * FROM articles', callback);
    }
    static find(id, callback) {
        db.get('SELECT * FROM articles WHERE id = ?', id, callback);
    }
    static create(data, callback) {
        const sql = 'INSERT INTO articles(title, content) VALUES (?, ?)';
        db.run(sql, data.title, data.content, callback);
    }
    static delete(id, callback) {
        if (!id) return callback(new Error('We need an id'));
        db.run('DELETE FROM articles WHERE id = ?', id, callback)
    }
}
module.exports = db;
module.exports.Article = Article;