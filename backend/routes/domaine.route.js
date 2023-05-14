const express = require('express');
const {
  FindDomaines,
  DeleteDomaine,
  AddDomaine,
} = require('../controllers/domaine.controller');
const multer = require('multer');
const verifyAdmin = require('../middleware/verifyAdmin');
const verifyJWT = require('../middleware/verifyJWT');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/domaine_icon');
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()}_${file.originalname.replace(/\s+/g, '-')}`;
    cb(null, filename);
  },
});
const upload = multer({ storage }).single('icon');


router.get('/', FindDomaines);

router.use(verifyJWT);
router.use(verifyAdmin);
/* find different domaine */
router.post('/', upload, AddDomaine);
router.delete('/', DeleteDomaine);


module.exports = router;
