const express = require('express');
const engines = require('consolidate');
const bodyParser = require('body-parser');

const PORT = 8099;
const app = express();

const errorHandler = (err, req, res, next) => {
    console.error(err.message);
    console.error(err.stack);
    res.status(500);
    res.render('error-template', { error: err});
};
const fruits = ['Cherry', 'Banana', 'Watermelon', 'Orange', 'Cranberry', 'Blueberry']

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/templates');
app.use(bodyParser.urlencoded({extended: false}));

app.use(errorHandler);

app.get('/', (req, res, next) => {
    res.render('fruit-picker', {fruits});
});

app.post('/favorite_fruit', (req, res, next) => {
   const favorite = req.body.fruit;

   if (typeof favorite === 'undefined') {
        next(Error('Please choose a fruit!'));
   } else {
        res.send(`Your favorite fruit is ${favorite}`);
   }
});

app.use((req, res) => {
    res.sendStatus(404);
});

const server = app.listen(PORT, () => {
    console.log(`App listening on ${server.address().port}`);
});
