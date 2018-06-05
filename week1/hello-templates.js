const express = require('express');
const engines = require('consolidate');

const PORT = 8099;
const app = express();

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/templates');

app.get('/', (req, res) => {
   res.render('hello-name', {
       name: 'Nick'
   });
});

app.use((req, res) => {
    res.sendStatus(404);
});

const server = app.listen(PORT, () => {
    console.log(`App listening on ${server.address().port}`);
});