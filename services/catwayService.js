const Catway = require("../models/Catway");

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
  return await Catway.create(data);
};

const updateCatway = async (id, data) => {
  return await Catway.findOneAndUpdate(
    { catwayNumber: toNumber(id) },
    data,
    {
      new: true,
      runValidators: true,
    }
  );
};

const patchCatwayState = async (id, catwayState) => {
  return await Catway.findOneAndUpdate(
    { catwayNumber: toNumber(id) },
    { catwayState },
    {
      new: true,
      runValidators: true,
    }
  );
};

const deleteCatway = async (id) => {
  return await Catway.findOneAndDelete({
    catwayNumber: toNumber(id),
  });
};

module.exports = {
  getAllCatways,
  getCatwayById,
  createCatway,
  updateCatway,
  patchCatwayState,
  deleteCatway,
};