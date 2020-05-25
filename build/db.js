'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var sqlite3 = require('sqlite3').verbose(),
    name = 'articles',
    db = new sqlite3.Database(name);
db.serialize(function () {
    var sql = 'CREATE TABLE IF NOT EXISTS articles\n        (id integer primary key, title, content TEXT)';
    db.run(sql);
});

var Article = function () {
    function Article() {
        _classCallCheck(this, Article);
    }

    _createClass(Article, null, [{
        key: 'all',
        value: function all(callback) {
            db.all('SELECT * FROM articles', callback);
        }
    }, {
        key: 'find',
        value: function find(id, callback) {
            db.get('SELECT * FROM articles WHERE id = ?', id, callback);
        }
    }, {
        key: 'create',
        value: function create(data, callback) {
            var sql = 'INSERT INTO articles(title, content) VALUES (?, ?)';
            db.run(sql, data.title, data.content, callback);
        }
    }, {
        key: 'delete',
        value: function _delete(id, callback) {
            if (!id) return callback(new Error('We need an id'));
            db.run('DELETE FROM articles WHERE id = ?', id, callback);
        }
    }]);

    return Article;
}();

module.exports = db;
module.exports.Article = Article;