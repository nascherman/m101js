/**
 * Which of the choices below is the title of a movie from
 * the year 2013 that is rated PG-13 and won no awards?
 * Please query the video.movieDetails collection to find the
 * answer.
 */

db.movieDetails.find({
    year: 2013,
    rated: 'PG-13',
    "awards.wins": 0},
    {
        title: true
    }).pretty();