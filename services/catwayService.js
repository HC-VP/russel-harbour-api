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


/**
 * Crée un nouveau catway
 *
 * @param {Object} data - Données du catway
 * @param {number|string} data.catwayNumber - Numéro du catway
 * @param {string} data.type - Type du catway ("long" ou "short")
 * @param {string} data.catwayState - État du catway
 *
 * @returns {Promise<Object>} Catway créé
 *
 * @throws {Error} Si un champ est manquant
 * @throws {Error} Si le catway existe déjà
 */







const createCatway = async (data) => {
  const { catwayNumber, type, catwayState } = data;

  if (!catwayNumber || !type || !catwayState || catwayState.trim() === "") {
    throw new Error("Tous les champs sont obligatoires.");
  }

  const catwayNum = toNumber(catwayNumber);

  const existing = await Catway.findOne({ catwayNumber: catwayNum });

  if (existing) {
    throw new Error("Un catway avec ce numéro existe déjà.");
  }

  return await Catway.create({
    catwayNumber: catwayNum,
    type,
    catwayState,
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

/**
 * Met à jour l'état d'un catway
 *
 * @param {number|string} id - Numéro du catway
 * @param {string} state - Nouvel état
 *
 * @returns {Promise<Object>} Catway mis à jour
 *
 * @throws {Error} Si le catway n'existe pas
 */

const patchCatwayState = async (id, catwayState) => {
  const catwayNum = toNumber(id);

  const catway = await Catway.findOne({ catwayNumber: catwayNum });

  if (!catway) {
    throw new Error("Catway introuvable");
  }

  if (!catwayState || catwayState.trim() === "") {
    throw new Error("L'état du catway est obligatoire.");
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