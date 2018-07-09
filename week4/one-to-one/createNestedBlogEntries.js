const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const createNestedBlogEntries = require('./nestedBlogsModel');

const DB_URL = 'mongodb://localhost:27017';
const DB = 'blog-db';

MongoClient.connect(DB_URL, (err, client) => {
   assert.equal(null, err);

   const db = client.db(DB);
   const entries = createRandomBlogEntries(1000);

   db.collection('blogs-nested').insertMany(entries, (err, result) => {
       assert.equal(null, err);

       console.log('Completed insert');

       client.close();
   })
});