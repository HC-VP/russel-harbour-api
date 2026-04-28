const express = require("express");
const app = express();

//Routes
const catwayRoutes = require("./routes/catwayRoutes");
const userRoutes = require("./routes/userRoutes");
const reservationRoutes = require("./routes/reservationRoutes");

// middlewares globaux
app.use(express.json());


//routes test
app.get('/', (req, res) => {
    res.send('Hello World from Express !')
});

app.get('/about', (req, res) => {
    res.type('text/plain')
    res.send('Je suis une application express basique')
});

// routes API
app.use("/catways", catwayRoutes);
app.use("/users", userRoutes);
app.use("/reservations", reservationRoutes);




// 404
app.use((req, res) => {
    res.status(404).send('404 page not found');
});

module.exports = app;
