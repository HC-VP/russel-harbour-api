const express = require("express");
const router = express.Router();

const Catway = require("../models/Catway");
const Reservation = require("../models/Reservation");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const userService = require("../services/userService");
const catwayService = require("../services/catwayService");
const reservationService = require("../services/reservationService");

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

//Users

router.post("/dashboard/users/create", async (req, res) => {
  try {
    await userService.createUser(req.body);
    res.redirect("/dashboard");
  } catch (error) {
    res.send(error.message);
  }
});

router.post("/dashboard/users/update", async (req, res) => {
  try {
    await userService.updateUser(req.body.id, req.body);
    res.redirect("/dashboard");
  } catch (error) {
    res.send(error.message);
  }
});

router.post("/dashboard/users/delete", async (req, res) => {
  try {
    await userService.deleteUser(req.body.id);
    res.redirect("/dashboard");
  } catch (error) {
    res.send(error.message);
  }
});

//Catways

router.post("/dashboard/catways/create", async (req, res) => {
  console.log("CREATE A CATWAY BODY:", req.body);

  try {
    const result = await catwayService.createCatway(req.body);
    console.log("CREATED", result);
    res.redirect("/dashboard");
  } catch (error) {
    console.log("ERROR:", error.message);
    res.send(error.message);
  }
});

router.post("/dashboard/catways/update-state", async (req, res) => {
  try {
    await catwayService.updateCatwayState(req.body.id, req.body.catwayState);
    res.redirect("/dashboard");
  } catch (error) {
    res.send(error.message);
  }
});

router.post("/dashboard/catways/delete", async (req, res) => {
  try {
    await catwayService.deleteCatway(req.body.id);
    res.redirect("/dashboard");
  } catch (error) {
    res.send(error.message);
  }
});

//Reservations

router.post("/dashboard/reservations/create", async (req, res) => {
  try {
    await reservationService.createReservation(req.body);
    res.redirect("/dashboard");
  } catch (error) {
    res.send(error.message);
  }
});

router.post("/dashboard/reservations/delete", async (req, res) => {
  try {
    await reservationService.deleteReservation(
      req.body.idReservation
    );
    res.redirect("/dashboard");
  } catch (error) {
    res.send(error.message);
  }
});

// Listes
router.get("/catways", async (req, res) => {
  const catways = await Catway.find().sort({ catwayNumber: 1 });
  res.render("catways", { catways });
});

router.get("/reservations", async (req, res) => {
  const reservations = await Reservation.find().sort({ checkIn: 1 });
  res.render("reservations", { reservations });
});

// Détail catway via formulaire dashboard : /catway?id=12
router.get("/catway", async (req, res) => {
  try {
    const catway = await Catway.findOne({
      catwayNumber: Number(req.query.id),
    });

    if (!catway) {
      return res.send("Catway introuvable");
    }

    res.render("catway", { catway });
  } catch (error) {
    res.send(error.message);
  }
});

// Détail réservation via formulaire dashboard : /reservation?id=xxxx
router.get("/reservation", async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.query.id);

    if (!reservation) {
      return res.send("Réservation introuvable");
    }

    res.render("reservation", { reservation });
  } catch (error) {
    res.send(error.message);
  }
});

// Documentation
router.get("/documentation", (req, res) => {
  res.render("documentation");
});

module.exports = router;