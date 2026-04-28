const express = require("express");
const router = express.Router();

const catwayController = require("../controllers/catwayController");
const reservationController = require("../controllers/reservationController");

// Catways
router.get("/", catwayController.getAllCatways);
router.get("/:id", catwayController.getCatwayById);
router.post("/", catwayController.createCatway);
router.put("/:id", catwayController.updateCatway);
router.patch("/:id", catwayController.patchCatwayState);
router.delete("/:id", catwayController.deleteCatway);

// Reservations as catway sub-resource
router.get("/:id/reservations", reservationController.getReservationsByCatway);
router.get("/:id/reservations/:idReservation", reservationController.getReservationById);
router.post("/:id/reservations", reservationController.createReservation);
router.delete("/:id/reservations/:idReservation", reservationController.deleteReservation);

module.exports = router;