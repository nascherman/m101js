/**
 * How many documents in our video.movieDetails collection
 * list just the following two genres: "Comedy" and "Crime"
 * with "Comedy" listed first.
 */

db.movieDetails.find({
   genres:  ['Comedy', 'Crime']
}).count();