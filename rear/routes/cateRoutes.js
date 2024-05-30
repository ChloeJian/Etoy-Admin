const express = require('express');
const CateController = require('../controllers/CateController');

const router = express.Router();

router.get('/list', CateController.getCates);
router.post('/add', CateController.addCate);
router.delete('/delete/:id', CateController.deleteCate);
router.put('/update/:id', CateController.updateCate);

module.exports = router;