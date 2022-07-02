const express = require('express');
const router = express.Router();
const projectsController = require('../../controllers/api/Projects');
const checkUserLogged = require('../../config/checkUserLogged');

//INDUCES

//The below routes should not be accessible to unauthorized users

//POST create /api/v1/project
router.post('/', projectsController.create);

//GET show /api/v1/project/:id
router.get('/:id', projectsController.show);

//PUT update /api/v1/project/:id
router.put('/:id', projectsController.update);

//Delete  /api/v1/project/:id
router.delete('/:id', projectsController.remove);


module.exports = router;