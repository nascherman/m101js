const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const timeOperation = require('./util/timeOperation');

const DB_URL = 'mongodb://localhost:27017';
const DB = 'crunchbase';

MongoClient.connect(DB_URL, (err, client) => {
    const db = client.db(DB);
    
    timeAggregation(db, [
        {$match: {"funding_rounds.investments.financial_org.permalink": "greylock"}},
        {
            $project: {
                _id: 0,
                name: 1,
                founded_year: 1,
                rounds: {
                    $filter: {
                        input: "$funding_rounds",
                        as: "round",
                        cond: {$gte: ["$$round.raised_amount", 100000000]}
                    }
                }
            }
        },
        {$match: {"rounds.investments.financial_org.permalink": "greylock"}},
    ]);


    timeAggregation(db, [
        {$match: {"founded_year": 2010}},
        {
            $project: {
                _id: 0,
                name: 1,
                founded_year: 1,
                first_round: {$arrayElemAt: ["$funding_rounds", 0]},
                last_round: {$arrayElemAt: ["$funding_rounds", -1]}
            }
        }
    ]);


    timeAggregation(db, [
        {$match: {"founded_year": 2010}},
        {
            $project: {
                _id: 0,
                name: 1,
                founded_year: 1,
                first_round: {$slice: ["$funding_rounds", 1]},
                last_round: {$slice: ["$funding_rounds", -1]}
            }
        }
    ]);


    timeAggregation(db, [
        {$match: {"founded_year": 2010}},
        {
            $project: {
                _id: 0,
                name: 1,
                founded_year: 1,
                early_rounds: {$slice: ["$funding_rounds", 1, 3]}
            }
        }
    ]);


    timeAggregation(db, [
        {$match: {"founded_year": 2004}},
        {
            $project: {
                _id: 0,
                name: 1,
                founded_year: 1,
                total_rounds: {$size: "$funding_rounds"}
            }
        }
    ], null, client.close.bind(client));
});

