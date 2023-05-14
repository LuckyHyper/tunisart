const express = require('express');
const {
  AddPoste,
  UpdatePoste,
  DeletePoste,
  PosteByDomain,
  PosteBySearch,
  PosteById,
  AddCondidate,
  AllPost,
  ClientSearch,
  LatestPostes,
  AppliedCondidates,
} = require('../controllers/poste.controller');
const multer = require('multer');
const verifyJWT = require('../middleware/verifyJWT');
const verifyAdmin = require('../middleware/verifyAdmin');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/company_logo');
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()}_${file.originalname.replace(/\s+/g, '-')}`;
    cb(null, filename);
  },
});
const upload = multer({ storage }).single('company_logo');

/* find all postes */
router.get('/', AllPost);

router.get('/domain', PosteByDomain);

router.get('/search', PosteBySearch);

router.get('/offre', LatestPostes);

router.get('/:id', PosteById);

router.get('/search/client', ClientSearch);

//router.use(verifyJWT);
router.use(verifyJWT);

router.post('/condidate', AddCondidate);

// Admin Functionality

router.use(verifyAdmin);

/* add poste */
router.post('/', upload, AddPoste);

/* delete poste */
router.delete('/:id', DeletePoste);

/* update poste */
router.put('/:id', upload, UpdatePoste);

router.get('/condidates/:id', AppliedCondidates);
module.exports = router;
