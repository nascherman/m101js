/**
 * What query would we use in the Mongo shell to return all
 * movies in the video.movieDetails collection that either
 * won or were nominated for a best picture Oscar? You may
 * assume that an award will appear in the oscars array only
 * if the movie won or was nominated. You will probably want
 * to create a little sample data for yourself in order to
 * work this problem.
 * HINT: For this question we are looking for the simplest
 * query that will work. This problem has a very
 * straightforward solution, but you will need to
 * extrapolate a little from some of the information
 * presented in the "Reading Documents" lesson.
 */

db.movieDetails.find({
    "awards.oscars.award": "bestPicture"
}).count();