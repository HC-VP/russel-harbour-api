const express = require("express");
const app = express();

const path = require("path");

const swaggerUi = require("swagger-ui-express");
const specs = require(".config/swagger");


// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// middlewares globaux
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

// EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Routes
const viewRoutes = require("./routes/viewRoutes");
app.use("/", viewRoutes);

const catwayRoutes = require("./routes/catwayRoutes");
const userRoutes = require("./routes/userRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const authRoutes = require("./routes/authRoutes");

app.use("/catways", catwayRoutes);
app.use("/users", userRoutes);
app.use("/reservations", reservationRoutes);
app.use("/auth", authRoutes);

// 404
app.use((req, res) => {
  res.status(404).send("404 page not found");
});

module.exports = app;