const reservationService = require("../services/reservationService");

const getAllReservations = async (req, res) => {
  try {
    const reservations = await reservationService.getAllReservations();
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getReservationsByCatway = async (req, res) => {
  try {
    const reservations =
      await reservationService.getReservationsByCatway(Number(req.params.id));

    res.status(200).json(reservations);    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getReservationById = async (req, res) => {
  try {
    const reservation =
      await reservationService.getReservationById(req.params.idReservation);

    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    res.json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createReservation = async (req, res) => {
  try {
    const reservationData = {
      ...req.body,
      catwayNumber: Number(req.params.id)
    };

    const newReservation = await reservationService.createReservation(reservationData);

    res.status(201).json(newReservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteReservation = async (req, res) => {
  try {
    const deleted = await reservationService.deleteReservation(
      req.params.idReservation
    );

    if (!deleted) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    res.json({ message: "Reservation deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllReservations,
  getReservationsByCatway,
  getReservationById,
  createReservation,
  deleteReservation
};