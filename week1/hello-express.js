const express = require('express');

const PORT = 8099;
const app = express();

app.get('/', (req, res) => {
   res.send('Hello express');
});

app.use((req, res) => {
    res.sendStatus(404);
});

const server = app.listen(PORT, () => {
    console.log(`App listening on ${server.address().port}`);
});