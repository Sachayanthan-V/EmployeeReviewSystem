const express = require('express');
const router = express.Router();
const userController = require('./../controllers/userController');
const errorController = require('./../controllers/errorController');

router.post('/register', userController.userRedirect);
router.post('/admin'   , userController.admin);
router.post('/employee', userController.employee);
router.post('/login'   , userController.Login);
router.get('/*'        , errorController.error );

module.exports = router; 