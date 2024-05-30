const express = require('express');
const ToyController = require('../controllers/ToyController');

const router = express.Router();

router.get('/list', ToyController.getToys);
router.post('/add', ToyController.addToy);
router.delete('/delete/:id', ToyController.deleteToy);
router.put('/update/:id', ToyController.updateToy);

module.exports = router;