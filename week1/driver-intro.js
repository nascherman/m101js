const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const DB_URL = 'mongodb://localhost:27017';
const DB = 'video';

MongoClient.connect(DB_URL, (err, client) => {
    assert.equal(null, err);
    console.log('Server connection success');

    const db = client.db(DB);

    db.collection('movies').find({}).toArray((err, docs) => {
       docs.forEach(doc => console.log(doc.title));

       client.close();
    });
});