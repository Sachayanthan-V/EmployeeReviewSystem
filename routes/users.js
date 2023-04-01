const express = require('express');
const router = express.Router();
const userController = require('./../controllers/userController');

router.post('/register', userController.userRedirect);
router.post('/admin', userController.admin);
router.post('/employee', userController.employee);
// router.get('/admin', userController.admin);
// router.get('/employee', userController.employee);
router.post('/login', userController.Login);

module.exports = router; 