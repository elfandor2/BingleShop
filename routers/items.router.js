const router = require('express').Router();
const { ItemsController } = require('../controllers/items.controller');
const verifyToken = require('../helpers/decode.helper');
const loginAuth = require('../helpers/decode.helper');
const { authorization } = require('../middlewares/authorization');
const itemsController = new ItemsController
const { validationItem } = require('../validations/express.validation');


router.get('/items', itemsController.getItems)
router.post('/items', loginAuth, authorization("admin"), validationItem, itemsController.insertItem)
router.patch('/items/:id', loginAuth, validationItem, itemsController.updateItem)
router.delete('/items/:id', loginAuth, itemsController.deleteItem)

module.exports = router