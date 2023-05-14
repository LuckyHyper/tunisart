const Domaine = require('../models/domaine.models');
const fileFormat = require('../validation/fileFormat');

const FindDomaines = async (req, res) => {
  try {
    const data = await Domaine.find();
    res.status(200).json(data);
  } catch (error) {
    res.send({
      error: error,
    });
  }
};

const AddDomaine = async (req, res) => {
  try {
    const domaine = await Domaine.create({
      icon: req.file ? (fileFormat(req.file) ? req.file.path : '') : '',
      domaine_name: req.body.domaine_name,
    });
    res.status(201).json({ domaine });
  } catch (error) {
    res.status(400).send(error);
  }
};

const DeleteDomaine = async (req, res) => {
  try {
    const domaine = await Domaine.deleteOne({ _id: req.query.id });
    res.status(201).json({ domaine });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  FindDomaines,
  DeleteDomaine,
  AddDomaine,
};