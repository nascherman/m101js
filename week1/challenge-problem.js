const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const engines = require('consolidate');
const bodyParser = require('body-parser');
const assert = require('assert');

const DB_URL = 'mongodb://localhost:27017';
const DB = 'video';
const PORT = 8099;
const app = express();

const errorHandler = (err, req, res, next) => {
    console.error(err.message);
    console.error(err.stack);
    res.status(500);
    res.render('error-template', { error: err});
};

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/templates');

app.use(bodyParser.urlencoded({extended: false}));
app.use(errorHandler);

MongoClient.connect(DB_URL, (err, client) => {
    assert.equal(null, err);
    const db = client.db(DB);

    app.get('/', (req, res, next) => {
        db.collection('movies').find({}).toArray((err, movies) => {
            assert.equal(null, err);

            res.render('challenge-problem', {movies});
        });

    });

    app.post('/add_movie', (req, res, next) => {
        const {title, year, imdb} = req.body;
        const movie = {title, year, imdb};

        db.collection('movies').insert(movie, (err, doc) => {
            assert.equal(null, err);

            console.log('Inserted a new doc', doc);
            db.collection('movies').find({}).toArray((err, movies) => {
                assert.equal(null, err);

                res.render('challenge-problem', {movies});
            });
        });
    });

    app.use((req, res) => {
        res.sendStatus(404);
    });
});



const server = app.listen(PORT, () => {
    console.log(`App listening on ${server.address().port}`);
});
