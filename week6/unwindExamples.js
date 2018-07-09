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
                amount: "$funding_rounds.raised_amount",
                year: "$funding_rounds.funded_year"
            }
        }
    ]);

    // unwind
    timeOperation(db, [
        {$match: {"funding_rounds.investments.financial_org.permalink": "greylock"}},
        {$unwind: "$funding_rounds"},
        {
            $project: {
                _id: 0,
                name: 1,
                amount: "$funding_rounds.raised_amount",
                year: "$funding_rounds.funded_year"
            }
        }
    ]);

    // Add funder to output documents.
    timeOperation(db, [
        {$match: {"funding_rounds.investments.financial_org.permalink": "greylock"}},
        {$unwind: "$funding_rounds"},
        {
            $project: {
                _id: 0,
                name: 1,
                funder: "$funding_rounds.investments.financial_org.permalink",
                amount: "$funding_rounds.raised_amount",
                year: "$funding_rounds.funded_year"
            }
        }
    ]);

    // Add second unwind stage.
    timeOperation(db, [
        {$match: {"funding_rounds.investments.financial_org.permalink": "greylock"}},
        {$unwind: "$funding_rounds"},
        {$unwind: "$funding_rounds.investments"},
        {
            $project: {
                _id: 0,
                name: 1,
                funder: "$funding_rounds.investments.financial_org.permalink",
                amount: "$funding_rounds.raised_amount",
                year: "$funding_rounds.funded_year"
            }
        },
    ]);

    // Distinguish individual funders from fundingOrganization.
    timeOperation(db, [
        {$match: {"funding_rounds.investments.financial_org.permalink": "greylock"}},
        {$unwind: "$funding_rounds"},
        {$unwind: "$funding_rounds.investments"},
        {
            $project: {
                _id: 0,
                name: 1,
                individualFunder: "$funding_rounds.investments.person.permalink",
                fundingOrganization: "$funding_rounds.investments.financial_org.permalink",
                amount: "$funding_rounds.raised_amount",
                year: "$funding_rounds.funded_year"
            }
        },
    ]);

    // Move match stage after unwind stages -- inefficient.
    timeOperation(db, [
        {$unwind: "$funding_rounds"},
        {$unwind: "$funding_rounds.investments"},
        {$match: {"funding_rounds.investments.financial_org.permalink": "greylock"}},
        {
            $project: {
                _id: 0,
                name: 1,
                individualFunder: "$funding_rounds.investments.person.permalink",
                fundingOrganization: "$funding_rounds.investments.financial_org.permalink",
                amount: "$funding_rounds.raised_amount",
                year: "$funding_rounds.funded_year"
            }
        },
    ]);

    // Instead, use a second match stage.
    timeOperation(db, [
        {$match: {"funding_rounds.investments.financial_org.permalink": "greylock"}},
        {$unwind: "$funding_rounds"},
        {$unwind: "$funding_rounds.investments"},
        {$match: {"funding_rounds.investments.financial_org.permalink": "greylock"}},
        {
            $project: {
                _id: 0,
                name: 1,
                individualFunder: "$funding_rounds.investments.person.permalink",
                fundingOrganization: "$funding_rounds.investments.financial_org.permalink",
                amount: "$funding_rounds.raised_amount",
                year: "$funding_rounds.funded_year"
            }
        },
    ]);

    // Second unwind stage not strictly necessary
    timeOperation(db, [
        {$match: {"funding_rounds.investments.financial_org.permalink": "greylock"}},
        {$unwind: "$funding_rounds"},
        {$match: {"funding_rounds.investments.financial_org.permalink": "greylock"}},
        {
            $project: {
                _id: 0,
                name: 1,
                individualFunder: "$funding_rounds.investments.person.permalink",
                fundingOrganization: "$funding_rounds.investments.financial_org.permalink",
                amount: "$funding_rounds.raised_amount",
                year: "$funding_rounds.funded_year"
            }
        }
    ]);

    // If we don't care about the funder we can simplify.
    // Let's sort as well.
    timeOperation(db, [
        {$match: {"funding_rounds.investments.financial_org.permalink": "greylock"}},
        {$unwind: "$funding_rounds"},
        {$match: {"funding_rounds.investments.financial_org.permalink": "greylock"}},
        {
            $project: {
                _id: 0,
                name: 1,
                amount: "$funding_rounds.raised_amount",
                year: "$funding_rounds.funded_year"
            }
        },
        {$sort: {year: 1}}
    ], null, client.close.bind(client));
});
