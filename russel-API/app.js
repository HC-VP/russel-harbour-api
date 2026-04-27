const express = require("express");
const app = express();

// middlewares globaux
app.use(express.json());


//route test
app.get('/', (req, res) => {
    res.send('Hello World from Express !')
});

app.get('/about', (req, res) => {
    res.type('text/plain')
    res.send('Je suis une application express basique')
});




// 404
app.use((req, res) => {
    res.status(404).send('404 page not found');
});

module.exports = app;