const express = require("express");
const router = express.Router();

const catwayController = require("../controllers/catwayController");
const reservationController = require("../controllers/reservationController");

const private = require("../middlewares/private");

// Catways
router.get("/", catwayController.getAllCatways);
router.get("/:id", catwayController.getCatwayById);
router.post("/", private, catwayController.createCatway);
router.put("/:id", catwayController.updateCatway);
router.patch("/:id", catwayController.patchCatwayState);
router.delete("/:id", private, catwayController.deleteCatway);

// Reservations as catway sub-resource
router.get("/:id/reservations", reservationController.getReservationsByCatway);
router.get("/:id/reservations/:idReservation", reservationController.getReservationById);
router.post("/:id/reservations", private, reservationController.createReservation);
router.delete("/:id/reservations/:idReservation", private, reservationController.deleteReservation);

module.exports = router;