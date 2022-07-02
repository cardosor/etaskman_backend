const express = require('express');
const router = express.Router();
const projectsController = require('../../controllers/api/Projects');
const checkUserLogged = require('../../config/checkUserLogged');

//INDUCES

//The below routes should not be accessible to unauthorized users

//POST create /api/v1/projects
router.post('/', projectsController.create);

//GET show /api/v1/projects/:id
router.get('/:id', projectsController.show);

//PUT update /api/v1/projects/:id
router.put('/:id', projectsController.update);

//Delete  /api/v1/projects/:id
router.delete('/:id', projectsController.remove);

//Addowner  /api/v1/projects/:pid/:uid/:role
router.put('/:pid/u/:uid/r/:role', projectsController.addOwner);

//Addowner  /api/v1/projects/:pid/:uid/:role
router.delete('/:pid/u/:uid', projectsController.removeOwner);


module.exports = router;