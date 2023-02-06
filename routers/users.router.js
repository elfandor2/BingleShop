const router = require('express').Router();
const { UsersController } = require('../controllers/users.controller');
const { validationUser, validationLogin } = require('../validations/express.validation');
const usersController = new UsersController

router.post('/register', validationUser, usersController.register)
router.post('/login', validationLogin, usersController.login)

module.exports = router