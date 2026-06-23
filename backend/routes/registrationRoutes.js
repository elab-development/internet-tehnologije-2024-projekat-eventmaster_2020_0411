const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/registrationController');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, registrationController.createRegistration);
router.delete('/:id', authMiddleware, registrationController.cancelRegistration);
router.get('/user/:userId', authMiddleware, registrationController.getUserRegistrations);

module.exports = router;
