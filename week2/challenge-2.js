/**
 * Write an update command that will remove the
 * "tomato.consensus" field for all documents matching the
 * following criteria:
 *
 * The number of imdb votes is less than 10,000
 * The year for the movie is between 2010 and 2013 inclusive
 * The tomato.consensus field is null
 *
 * How many documents required an update to eliminate a "tomato.consensus" field?
 */

db.movieDetails.updateMany({
    "imdb.votes": {
        $lt: 10000
    },
    year: {
        $gte: 2010,
        $lte: 2013
    },
    $and: [{
        "tomato.consensus": null
    }, {
        "tomato.consensus": {
           $exists: true
       }
    }]
}, {
    $unset: {
        "tomato.consenus": ""
    }
});

// or

db.movieDetails.updateMany({
    "imdb.votes": {
        $lt: 10000
    },
    year: {
        $lte: 2013,
        $gte: 2010
    },
    "tomato.consensus": null
}, {
    $unset: {
        "tomato.consensus": ""
    }
});