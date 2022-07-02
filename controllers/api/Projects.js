const Project = require('../../models/Project');

//Show a project
const show = async (req, res) => {
    try{
        const foundProject = await Project.findById(req.params.id);
        console.log(foundProject);
        res.status(200).json(foundProject)

    }catch(e){
        res.status(400).json({msg:e.message});
    }
}

//Create a project
const create = async (req, res) => {
    try{
        console.log(req.body);
        const createdProject = await  Project.create(req.body);
        console.log(createdProject._id);
        res.status(200).json(createdProject)

    }catch(e){
        res.status(400).json({msg:e.message});
    }
}

//Update a project
const update = async (req, res) => {
    try{
        console.log(req.body);
        const updatedProject = await  Project.findByIdAndUpdate(req.params.id, req.body, {new:true});
        res.status(200).json(updatedProject);

    }catch(e){
        res.status(400).json({msg:e.message});
    }
}

//Remove a Project
const remove = async (req, res) => {
    try{
        // const deletedProject = await  Project.findByIdAndDelete(req.params.id);
        const removedProject = await Project.findByIdAndUpdate(req.params.id, {active: false}, {new: true})
        res.status(200).json(removedProject)

    }catch(e){
        res.status(400).json({msg:e.message});
    }
}

//Get tasks
const getTasks = async (req, res) => {
    try {
        const foundTasks = await Project.findById(req.params.id).populate('tasks').select('tasks')
        res.status(200).json(foundTasks)
    } catch(e) {
        res.status(400).json({msg: e.message})
    }
}

module.exports = {
    show,
    create,
    update,
    remove,
    getTasks
}