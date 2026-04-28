const catwayService = require("../services/catwayService");

const getAllCatways = async (req, res) => {
  try {
    const catways = await catwayService.getAllCatways();
    res.json(catways);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCatwayById = async (req, res) => {
  try {
    const catway = await catwayService.getCatwayById(req.params.id);

    if (!catway) {
      return res.status(404).json({ message: "Catway not found" });
    }

    res.json(catway);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCatway = async (req, res) => {
  try {
    const newCatway = await catwayService.createCatway(req.body);
    res.status(201).json(newCatway);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateCatway = async (req, res) => {
  try {
    const updated = await catwayService.updateCatway(
      req.params.id,
      req.body
    );

    if (!updated) {
      return res.status(404).json({ message: "Catway not found" });
    }

    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const patchCatwayState = async (req, res) => {
  try {
    const updated = await catwayService.patchCatwayState(
      req.params.id,
      req.body.catwayState
    );

    if (!updated) {
      return res.status(404).json({ message: "Catway not found" });
    }

    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteCatway = async (req, res) => {
  try {
    const deleted = await catwayService.deleteCatway(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Catway not found" });
    }

    res.json({ message: "Catway deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllCatways,
  getCatwayById,
  createCatway,
  updateCatway,
  patchCatwayState,
  deleteCatway
};