const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const timeOperation = require('./util/timeOperation');

const DB_URL = 'mongodb://localhost:27017';
const DB = 'crunchbase';

MongoClient.connect(DB_URL, (err, client) => {
    const db = client.db(DB);

    timeOperation(db, [
        { $match: { founded_year: 2004 } },
    ]);
    timeOperation(db, [
        { $match: { founded_year: 2004 } },
        { $project: {
                _id: 0,
                name: 1,
                founded_year: 1
            } }
    ]);
    timeOperation(db, [
        { $match: { founded_year: 2004 } },
        { $limit: 5 },
        { $project: {
                _id: 0,
                name: 1 } }
    ]);
    timeOperation(db, [
        { $match: { founded_year: 2004 } },
        { $sort: { name: 1} },
        { $limit: 5 },
        { $project: {
                _id: 0,
                name: 1 } }
    ]);
    timeOperation(db, [
        { $match: { founded_year: 2004 } },
        { $limit: 5 },
        { $sort: { name: 1} },
        { $project: {
                _id: 0,
                name: 1 } }
    ]);
    timeOperation(db, [
        { $match: { founded_year: 2004 } },
        { $sort: { name: 1} },
        { $skip: 10 },
        { $limit: 5 },
        { $project: {
                _id: 0,
                name: 1 } },
    ], null, client.close.bind(client));

    console.log('Closing client connection');
});