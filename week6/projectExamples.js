const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const timeOperation = require('./util/timeOperation');

const DB_URL = 'mongodb://localhost:27017';
const DB = 'crunchbase';

MongoClient.connect(DB_URL, (err, client) => {
    const db = client.db(DB);

    timeOperation(db, [
        {$match: {"funding_rounds.investments.financial_org.permalink": "greylock"}},
        {
            $project: {
                _id: 0,
                name: 1,
                ipo: "$ipo.pub_year",
                valuation: "$ipo.valuation_amount",
                funders: "$funding_rounds.investments.financial_org.permalink"
            }
        }
    ]);
    timeOperation(db, [
        {$match: {"funding_rounds.investments.financial_org.permalink": "greylock"}},
        {
            $project: {
                _id: 0,
                name: 1,
                founded: {
                    year: "$founded_year",
                    month: "$founded_month",
                    day: "$founded_day"
                }
            }
        }]);

    timeOperation(db, [
        {$match: {"funding_rounds.investments.financial_org.permalink": "greylock"}},
        {
            $project: {
                _id: 0,
                name: 1,
                people: "$relationships.person.last_name"
            }
        }
    ]);

    timeOperation(db, [
        {
            $match: {
                name: 'Facebook'
            }
        },
        {
            $project: {
                _id: 0,
                name: 1,
                people: "$relationships.person.last_name"
            }
        }
    ], true, client.close.bind(client));

});