const Catway = require("../models/Catway");
const Reservation = require("../models/Reservation");

// helper
const toNumber = (id) => {
  const num = Number(id);
  if (isNaN(num)) {
    throw new Error("Invalid catway number");
  }
  return num;
};

const getAllCatways = async () => {
  return await Catway.find();
};

const getCatwayById = async (id) => {
  return await Catway.findOne({ catwayNumber: toNumber(id) });
};

const createCatway = async (data) => {
  const { catwayNumber, type, catwayState } = data;

  if (!catwayNumber || !type || !catwayState) {
    throw new Error("Tous les champs sont obligatoires.");
  }

  const catwayNum = toNumber(catwayNumber);

  const existing = await Catway.findOne({ catwayNumber: catwayNum });

  if (existing) {
    throw new Error("Un catway avec ce numéro existe déjà.");
  }

  return await Catway.create({
    ...data,
    catwayNumber: catwayNum,
  });
};

const updateCatway = async (id, data) => {
  const catwayNum = toNumber(id);

  const catway = await Catway.findOne({ catwayNumber: catwayNum });

  if (!catway) {
    throw new Error("Catway introuvable");
  }

  if (data.catwayNumber && data.catwayNumber !== catwayNum) {
    const newNum = toNumber(data.catwayNumber);

    const existing = await Catway.findOne({ catwayNumber: newNum });

    if (existing) {
      throw new Error("Un catway avec ce numéro existe déjà.");
    }

    data.catwayNumber = newNum;
  }

  return await Catway.findOneAndUpdate(
    { catwayNumber: catwayNum },
    data,
    { new: true, runValidators: true }
  );
};

const patchCatwayState = async (id, catwayState) => {
  const catwayNum = toNumber(id);

  const catway = await Catway.findOne({ catwayNumber: catwayNum });

  if (!catway) {
    throw new Error("Catway introuvable");
  }

  const allowedStates = ["available", "occupied", "maintenance"];

  if (!allowedStates.includes(catwayState)) {
    throw new Error("État de catway invalide");
  }

  return await Catway.findOneAndUpdate(
    { catwayNumber: catwayNum },
    { catwayState },
    {
      new: true,
      runValidators: true,
    }
  );
};

const deleteCatway = async (id) => {
  const catwayNum = toNumber(id);

  const catway = await Catway.findOne({ catwayNumber: catwayNum });

  if (!catway) {
    throw new Error("Catway introuvable");
  }

  const reservations = await Reservation.find({ catwayNumber: catwayNum });

  if (reservations.length > 0) {
    throw new Error("Impossible de supprimer un catway ayant des réservations.");
  }

  return await Catway.findOneAndDelete({ catwayNumber: catwayNum });
};

module.exports = {
  getAllCatways,
  getCatwayById,
  createCatway,
  updateCatway,
  patchCatwayState,
  deleteCatway,
};