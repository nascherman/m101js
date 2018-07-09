const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const timeOperation = require('./util/timeOperation');

const DB_URL = 'mongodb://localhost:27017';
const DB = 'crunchbase';

MongoClient.connect(DB_URL, (err, client) => {
    const db = client.db(DB);

    timeOperation(db, [
        {
            $group: {
                _id: {founded_year: "$founded_year"},
                average_number_of_employees: {$avg: "$number_of_employees"}
            }
        },
        {$sort: {average_number_of_employees: -1}}

    ]);

    timeOperation(db, [
        {$match: {founded_year: 2001}},
        {$project: {_id: 0, name: 1, number_of_employees: 1}},
        {$sort: {number_of_employees: -1}}
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

