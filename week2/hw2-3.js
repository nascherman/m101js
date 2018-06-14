/**
 * Using the video.movieDetails collection, how many movies list "Sweden"
 * second in the the list of countries.
 */

db.movieDetails.find({
    "countries.1": "Sweden"
}, {title: true}).count();