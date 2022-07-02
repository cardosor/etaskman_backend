const Task = require('../../models/Task');

//Show a Task
const show = async (req, res) => {
    try{
        const foundTask = await Task.findById(req.params.id).populate('users');
        console.log(foundTask);
        res.status(200).json(foundTask)

    }catch(e){
        res.status(400).json({msg:e.message});
    }
}

//Create a Task
const create = async (req, res) => {
    try{
        console.log(req.body);
        const createdTask = await  Task.create(req.body);
        console.log(createdTask._id);
        res.status(200).json(createdTask)

    }catch(e){
        res.status(400).json({msg:e.message});
    }
}

//Update a Task
const update = async (req, res) => {
    try{
        console.log(req.body);
        const updatedTask = await  Task.findByIdAndUpdate(req.params.id, req.body, {new:true});
        res.status(200).json(updatedTask);

    }catch(e){
        res.status(400).json({msg:e.message});
    }
}

//Remove a Task
const remove = async (req, res) => {
    try{
        // const deletedTask = await  Task.findByIdAndDelete(req.params.id);
        const deletedTask = await Task.findByIdAndUpdate(req.params.id, {active: false}, {new: true})
        res.status(200).json(deletedTask);

    }catch(e){
        res.status(400).json({msg:e.message});
    }
}

//Get owners
const getOwners = async (req, res) => {
    try {
        const foundOwners = await Task.findById(req.params.id).populate('users').select('users')
        res.status(200).json(foundOwners)
    } catch(e) {
        res.status(400).json({msg: e.message})
    }
}

module.exports = {
    show,
    create,
    update,
    remove,
    getOwners
}