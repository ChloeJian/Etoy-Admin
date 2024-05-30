const express = require('express');
const AdminController = require('../controllers/AdminController');

const router = express.Router();

router.get('/data/:admin_acc', AdminController.getAdmin);
router.post('/add', AdminController.addAdmin);
router.delete('/delete/:id', AdminController.deleteAdmin);
router.put('/update/:id', AdminController.updateAdmin);

module.exports = router;