const express = require("express");
const router = express.Router();

const Catway = require("../models/Catway");
const Reservation = require("../models/Reservation");
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  res.render("home");
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.redirect("/");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.redirect("/");
    }

    console.log(req.body);

    return res.redirect("/dashboard");
  } catch (error) {
    return res.redirect("/");
  }
});

router.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

router.get("/dashboard/catways", async (req, res) => {
  const catways = await Catway.find().sort({ catwayNumber: 1 });
  res.render("catways", { catways });
});

router.get("/dashboard/reservations", async (req, res) => {
  const reservations = await Reservation.find().sort({ checkIn: 1 });
  res.render("reservations", { reservations });
});

module.exports = router;