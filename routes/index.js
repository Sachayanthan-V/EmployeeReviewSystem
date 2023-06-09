const express = require('express');
const router = express.Router();
const homeController = require('./../controllers/homeController');


router.get   ('/'        , homeController.home);
router.get   ('/login'   , homeController.login);
router.get   ('/register', homeController.register);
router.use   ('/users'   , require('./users'));

module.exports = router;  