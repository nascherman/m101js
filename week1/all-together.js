const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const engines = require('consolidate');
const assert = require('assert');

const DB_URL = 'mongodb://localhost:27017';
const DB = 'video';
const PORT = 8099;
const app = express();

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/templates');

MongoClient.connect(DB_URL, (err, client) => {
    assert.equal(null, err);

    const db = client.db(DB);

    app.get('/', (req, res) => {
        db.collection('movies').find({}).toArray((err, movies) => {
            res.render('movies', {movies});
        });
    });

    app.use((req, res) => {
        res.sendStatus(404);
    });

    const server = app.listen(PORT, () => {
        console.log(`App listening on ${server.address().port}`);
    });
});