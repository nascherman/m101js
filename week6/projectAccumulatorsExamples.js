const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const timeOperation = require('./util/timeOperation');

const DB_URL = 'mongodb://localhost:27017';
const DB = 'crunchbase';

MongoClient.connect(DB_URL, (err, client) => {
    const db = client.db(DB);

    timeOperation(db, [
        { $match: { "funding_rounds": { $exists: true, $ne: [ ]} } },
        { $project: {
                _id: 0,
                name: 1,
                largest_round: { $max: "$funding_rounds.raised_amount" }
            } }
    ], true);


    timeOperation(db, [
        { $match: { "funding_rounds": { $exists: true, $ne: [ ]} } },
        { $project: {
                _id: 0,
                name: 1,
                total_funding: { $sum: "$funding_rounds.raised_amount" }
            } }
    ], true);


    timeOperation(db, [
        { $group: {
                _id: { founded_year: "$founded_year" },
                average_number_of_employees: { $avg: "$number_of_employees" }
            } },
        { $sort: { average_number_of_employees: -1 } }

    ], true);
});
