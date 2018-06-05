const express = require('express');
const engines = require('consolidate');

const PORT = 8099;
const app = express();

const errorHandler = (err, req, res, next) => {
    console.error(err.message);
    console.error(err.stack);
    res.status(500);
    res.render('error-template', { error: err});
};

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/templates');

app.use(errorHandler);

app.get('/:name', (req, res, next) => {
    const name = req.params.name;
    const { getvar1, getvar2 } = req.query;

    res.render('express-get', {name, getvar1, getvar2});
});

app.use((req, res) => {
    res.sendStatus(404);
});

const server = app.listen(PORT, () => {
    console.log(`App listening on ${server.address().port}`);
});
