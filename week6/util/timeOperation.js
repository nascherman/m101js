const {performance} = require('perf_hooks');

module.exports = function timeOperation(db, aggregate, logResult, cb) {
    console.log(`Timing aggregation for ${JSON.stringify(aggregate)}`);

    const start = performance.now();

    db.collection('companies').aggregate(aggregate).toArray((err, result) => {

        if (logResult) {
            console.log('RESULT', result);
        }

        const end = performance.now();

        console.log(`Operation took ${end - start} milliseconds`);

        cb && cb();
    });
};