const router = require('express').Router();
const { ItemsController } = require('../controllers/items.controller');
const verifyToken = require('../helpers/decode.helper');
const loginAuth = require('../helpers/decode.helper');
const itemsController = new ItemsController
// const verifyToken = require('../helpers/decode.helper');


router.get('/items', itemsController.getItems)
router.post('/items', loginAuth, itemsController.insertItem)
router.patch('/items/:id', loginAuth, itemsController.updateItem)
router.delete('/items/:id', loginAuth, itemsController.deleteItem)

module.exports = router