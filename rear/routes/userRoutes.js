const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();

router.get('/list', UserController.getUsers);
router.post('/add', UserController.addUser);
router.delete('/delete/:id', UserController.deleteUser);
router.put('/update/:id', UserController.updateUser);

module.exports = router;