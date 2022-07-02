const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/api/users');
const checkUserLogged = require('../../config/checkUserLogged');

//INDUCES

//POST create /api/v1/users
router.post('/', usersController.create);

//POST login /api/v1/users/login
router.post('/login', usersController.login);

//The below routes should not be accessible to unauthorized users
//GET show /api/v1/users/:id
router.get('/:id', usersController.show);

//GET get projects /api/v1/users/:id/projects
router.get('/:id/projects', usersController.getProjects);

//PUT update /api/v1/users/:id
router.put('/:id', usersController.update);

//Delete remove /api/v1/users/:id
router.delete('/:id', usersController.remove);

module.exports = router;