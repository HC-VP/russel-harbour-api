const Reservation = require("../models/Reservation");

const getAllReservations = async () => {
  return await Reservation.find();
};

const getReservationsByCatway = async (catwayNumber) => {
  return await Reservation.find({ catwayNumber });
};

const getReservationById = async (idReservation) => {
  return await Reservation.findById(idReservation);
};

const createReservation = async (data) => {
  return await Reservation.create(data);
};

const deleteReservation = async (idReservation) => {
  return await Reservation.findByIdAndDelete(idReservation);
};

module.exports = {
  getAllReservations,
  getReservationsByCatway,
  getReservationById,
  createReservation,
  deleteReservation
};