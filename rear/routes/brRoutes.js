const express = require('express');
const Borrow_ReturnController = require('../controllers/Borrow_ReturnController');

const router = express.Router();

router.get('/list1', Borrow_ReturnController.getBorrow_Returns1);
router.get('/list2', Borrow_ReturnController.getBorrow_Returns2);
router.put('/update/:id', Borrow_ReturnController.updateBorrow_Return);

module.exports = router;