const express = require('express');
const router = express.Router();
const tasksController = require('../../controllers/api/Tasks');
const checkUserLogged = require('../../config/checkUserLogged');

//INDUCES

//The below routes should not be accessible to unauthorized users

//POST create /api/v1/task
router.post('/', tasksController.create);

//GET show /api/v1/task/:id
router.get('/:id', tasksController.show);

//PUT update /api/v1/task/:id
router.put('/:id', tasksController.update);

//Delete  /api/v1/task/:id
router.delete('/:id', tasksController.remove);



module.exports = router;