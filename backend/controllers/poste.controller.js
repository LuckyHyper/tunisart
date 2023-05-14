const Poste = require('../models/poste.models');
const Users = require('../models/users.models');
const Domaine = require('../models/domaine.models');
const fileFormat = require('../validation/fileFormat');

const AddPoste = async (req, res) => {
  try {
    const poste = await Poste.create({
      company_name: req.body.company_name,
      company_logo: req.file ? (fileFormat(req.file) ? req.file.path : '') : '',
      company_email: req.body.company_email,
      title: req.body.title,
      description: req.body.description,
      domaineId: req.body.domaineId,
      country: req.body.country,
      address: req.body.address,
      language_requirement: req.body.language_requirement,
      experience: req.body.experience,
      work_schedule: req.body.work_schedule,
      contract_type: req.body.contract_type,
      level_of_study: req.body.level_of_study,
      genre: req.body.genre,
      job_vacancy: req.body.job_vacancy,
    });
    res.status(201).json({ poste });
  } catch (error) {
    res.status(400).json(error.errors);
  }
};

const AllPost = async (req, res) => {
  try {
    const data = await Poste.find();
    res.status(201).json({ data });
  } catch (err) {
    console.log(err.message);
  }
};

const PosteByDomain = async (req, res) => {
  try {
    const PAGE_SIZE = 5;
    const page = parseInt(req.query.page || '0');
    const domaine_id = await Domaine.find({
      domaine_name: req.query.domain,
    }).select('_id');
    const total_poste = await Poste.countDocuments({ domaineId: domaine_id });
    const total_pages = Math.ceil(total_poste / PAGE_SIZE);
    if (!req.query.domain) {
      const result = await Poste.find()
        .limit(PAGE_SIZE)
        .skip(PAGE_SIZE * page);
      res.status(201).json({ result, total_poste, total_pages });
    } else {
      const result = await Poste.find({ domaineId: domaine_id })
        .limit(PAGE_SIZE)
        .skip(PAGE_SIZE * page);
      res.status(201).json({ result, total_poste, total_pages });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const PosteBySearch = async (req, res) => {
  try {
    const PAGE_SIZE = 5;
    const page = parseInt(req.query.page || '0');
    let total_poste;
    let total_pages;
    if (!req.query.search) {
      total_poste = await Poste.countDocuments({});
      total_pages = Math.ceil(total_poste / PAGE_SIZE);
      const result = await Poste.find()
        .limit(PAGE_SIZE)
        .skip(PAGE_SIZE * page);
      res.status(201).json({ result, total_poste, total_pages });
    } else {
      total_poste = await Poste.countDocuments({
        $or: [
          { title: { $regex: req.query.search, $options: 'i' } },
          { company_email: { $regex: req.query.search, $options: 'i' } },
          { company_name: { $regex: req.query.search, $options: 'i' } },
        ],
      });
      total_pages = Math.ceil(total_poste / PAGE_SIZE);
      const result = await Poste.find({
        $or: [
          { title: { $regex: req.query.search, $options: 'i' } },
          { company_email: { $regex: req.query.search, $options: 'i' } },
          { company_name: { $regex: req.query.search, $options: 'i' } },
        ],
      })
        .limit(PAGE_SIZE)
        .skip(PAGE_SIZE * page);
      res.status(201).json({ result, total_poste, total_pages });
    }
  } catch (err) {
    console.log(err.message);
  }
};

const PosteById = async (req, res) => {
  try {
    const data = await Poste.findOne({ _id: req.params.id });
    if (!data) res.status(404).json({ message: 'poste dont exist' });
    else res.status(201).send(data);
  } catch (error) {
    console.log(error.message);
  }
};

const LatestPostes = async (req, res) => {
  try {
    const result = await Poste.find().sort({ createdAt: -1 }).limit(3);
    res.status(201).json({ result });
  } catch (error) {
    console.log(error.message);
  }
};

const DeletePoste = async (req, res) => {
  try {
    await Poste.deleteOne({ _id: req.params.id });
    res.status(200).send('Delete Successfully \n');
  } catch (error) {
    res.send({
      error: error,
    });
  }
};

const UpdatePoste = async (req, res) => {
  try {
    const data = await Poste.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.status(201).json(data);
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
};

const ClientSearch = async (req, res) => {
  try {
    const PAGE_SIZE = 5;
    const page = parseInt(req.query.page || '0');
    if (req.query.search === '' && req.query.country === 'Country') {
      const result = await Poste.find()
        .limit(PAGE_SIZE)
        .skip(PAGE_SIZE * page);
      const total_poste = await Poste.countDocuments({});
      const total_pages = Math.ceil(total_poste / PAGE_SIZE);
      res.status(201).json({ result, total_poste, total_pages });
    } else if (req.query.country === 'Country') {
      const result = await Poste.find({
        title: { $regex: req.query.search, $options: 'i' },
      })
        .limit(PAGE_SIZE)
        .skip(PAGE_SIZE * page);
      const total_poste = await Poste.countDocuments({
        title: { $regex: req.query.search, $options: 'i' },
      });
      const total_pages = Math.ceil(total_poste / PAGE_SIZE);
      res.status(201).json({ result, total_poste, total_pages });
    } else if (req.query.search === '') {
      const result = await Poste.find({
        country: { $regex: req.query.country, $options: 'i' },
      })
        .limit(PAGE_SIZE)
        .skip(PAGE_SIZE * page);
      const total_poste = await Poste.countDocuments({
        country: { $regex: req.query.country, $options: 'i' },
      });
      const total_pages = Math.ceil(total_poste / PAGE_SIZE);
      res.status(201).json({ result, total_poste, total_pages });
    } else {
      const result = await Poste.find({
        country: { $regex: req.query.country, $options: 'i' },
        title: { $regex: req.query.search, $options: 'i' },
      })
        .limit(PAGE_SIZE)
        .skip(PAGE_SIZE * page);
      const total_poste = await Poste.countDocuments({
        country: { $regex: req.query.country, $options: 'i' },
        title: { $regex: req.query.search, $options: 'i' },
      });
      const total_pages = Math.ceil(total_poste / PAGE_SIZE);
      res.status(201).json({ result, total_poste, total_pages });
    }
  } catch (err) {
    console.log(err.message);
  }
};

const AddCondidate = async (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
  const user_id = await Users.findOne({ email: req.user });
  const user = await Poste.findOne({
    _id: req.query.id,
    candidates: user_id,
  });
  if (user) return res.status(206).json({ message: 'User already exists!!' });
  const data = await Poste.findOneAndUpdate(
    { _id: req.query.id },
    { $push: { candidates: user_id } },
    {
      new: true,
    }
  );

  res.status(200).json(data);
};

const AppliedCondidates = async (req, res) => {
  const data = await Poste.find({ _id: req.params.id }).populate('candidates');
  res.status(200).send(data);
};

module.exports = {
  AddPoste,
  DeletePoste,
  PosteByDomain,
  PosteBySearch,
  UpdatePoste,
  PosteById,
  AddCondidate,
  AllPost,
  ClientSearch,
  LatestPostes,
  AppliedCondidates,
};