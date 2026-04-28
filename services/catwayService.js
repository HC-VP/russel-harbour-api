const Catway = require("../models/Catway");

const getAllCatways = async () => {
  return await Catway.find();
};

const getCatwayById = async (id) => {
  return await Catway.findById(id);
};

const createCatway = async (data) => {
  return await Catway.create(data);
};

const updateCatway = async (id, data) => {
  return await Catway.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  });
};

const patchCatwayState = async (id, catwayState) => {
  return await Catway.findByIdAndUpdate(
    id,
    { catwayState },
    {
      new: true,
      runValidators: true
    }
  );
};

const deleteCatway = async (id) => {
  return await Catway.findByIdAndDelete(id);
};

module.exports = {
  getAllCatways,
  getCatwayById,
  createCatway,
  updateCatway,
  patchCatwayState,
  deleteCatway
};