const express = require('express');
const OrganizationController = require('../controllers/OrganizationController');

const router = express.Router();

router.get('/list', OrganizationController.getOrganizations);
router.post('/add', OrganizationController.addOrganization);
router.delete('/delete/:id', OrganizationController.deleteOrganization);
router.put('/update/:id', OrganizationController.updateOrganization);

module.exports = router;