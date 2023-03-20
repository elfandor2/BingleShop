const router = require('express').Router();
const { UsersController } = require('../controllers/users.controller');
const { validationUser, validationLogin } = require('../validations/express.validation');
// const { verifyEmail } = require('../middlewares/verified.email');
const usersController = new UsersController

router.post('/register/user', validationUser, usersController.registerUser)
router.post('/register/admin', validationUser, usersController.registerAdmin)
router.get('/user/verify-email', usersController.verifyEmail)
router.post('/login', validationLogin, usersController.login)

module.exports = router