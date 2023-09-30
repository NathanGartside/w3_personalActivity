const routes = require('express').Router();
const baseController = require('../controllers/index')

routes.get('/', baseController.getAll);

routes.get('/:id', baseController.getSingle);

routes.post('/', baseController.addContact);

routes.put('/:id', baseController.updateContact)

routes.delete('/:id', baseController.deleteContact)

module.exports = routes;