const Reservation = require("../models/Reservation");
const Catway = require("../models/Catway");

// helper Number
const toNumber = (value) => {
  const num = Number(value);
  if (isNaN(num)) {
    throw new Error("Invalid catway number");
  }
  return num;
};

const getAllReservations = async () => {
  return await Reservation.find();
};

const getReservationsByCatway = async (catwayNumber) => {
  const catwayNum = toNumber(catwayNumber);
  return await Reservation.find({ catwayNumber: catwayNum });
};

const getReservationById = async (idReservation) => {
  return await Reservation.findById(idReservation);
};

const createReservation = async (data) => {
  const {
    catwayNumber,
    clientName,
    boatName,
    checkIn,
    checkOut,
  } = data;

  if (!catwayNumber || !clientName || !boatName || !checkIn || !checkOut) {
    throw new Error("Tous les champs obligatoires doivent être renseignés.");
  }

  const catwayNum = toNumber(catwayNumber);

  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const now = new Date();

  if (start < now) {
    throw new Error("Impossible de réserver dans le passé.");
  }

  if (start >= end) {
    throw new Error("La date de début doit être antérieure à la date de fin.");
  }

  const catway = await Catway.findOne({ catwayNumber: catwayNum });

  if (!catway) {
    throw new Error("Le catway spécifié n'existe pas.");
  }

  const existingReservations = await Reservation.findOne({
    catwayNumber: catwayNum,
    checkIn: { $lt: end },
    checkOut: { $gt: start },
  });

  if (existingReservations) {
    throw new Error("Le catway est déjà réservé pour les dates sélectionnées.");
  }

  return await Reservation.create({
    catwayNumber: catwayNum,
    clientName,
    boatName,
    checkIn: start,
    checkOut: end,
  });
};

const deleteReservation = async (idReservation) => {
  const reservation = await Reservation.findById(idReservation);

  if (!reservation) {
    throw new Error("Réservation introuvable");
  }

  return await Reservation.findByIdAndDelete(idReservation);
};

module.exports = {
  getAllReservations,
  getReservationsByCatway,
  getReservationById,
  createReservation,
  deleteReservation
};