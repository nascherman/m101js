const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const timeOperation = require('./util/timeOperation');

const DB_URL = 'mongodb://localhost:27017';
const DB = 'crunchbase';

MongoClient.connect(DB_URL, (err, client) => {
    const db = client.db(DB);

    timeOperation(db, [
        {$match: {founded_year: {$gte: 2010}}},
        {
            $group: {
                _id: {founded_year: "$founded_year"},
                companies: {$push: "$name"}
            }
        },
        {$sort: {"_id.founded_year": 1}}
    ]);

    timeOperation(db, [
        {$match: {founded_year: {$gte: 2010}}},
        {
            $group: {
                _id: "$founded_year",
                companies: {$push: "$name"}
            }
        },
        {$sort: {"_id": 1}}
    ]);

    timeOperation(db, [
        {$match: {founded_year: {$gte: 2010}}},
        {
            $group: {
                _id: {founded_year: "$founded_year", category_code: "$category_code"},
                companies: {$push: "$name"}
            }
        },
        {$sort: {"_id.founded_year": 1}}
    ]);

    timeOperation(db, [
        {
            $group: {
                _id: {ipo_year: "$ipo.pub_year"},
                companies: {$push: "$name"}
            }
        },
        {$sort: {"_id.ipo_year": 1}}
    ]);

    timeOperation(db, [
        {$match: {"relationships.person": {$ne: null}}},
        {$project: {relationships: 1, _id: 0}},
        {$unwind: "$relationships"},
        {
            $group: {
                _id: "$relationships.person",
                count: {$sum: 1}
            }
        },
        {$sort: {count: -1}}
    ]);
});

