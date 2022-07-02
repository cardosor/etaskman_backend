const Task = require('../../models/Task');
const User = require('../../models/User');

//Show a Task
const show = async (req, res) => {
    try{
        const foundTask = await Task.findById(req.params.id);
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

//Add owner
const addOwner = async (req, res) => {
    try {
        const foundUser = await User.findById(req.params.uid).select('_id fname lname');
        if (!foundUser) throw new Error();
        const foundTask = await Task.findById(req.params.tid);
        if (!foundTask) throw new Error();
        const index = foundTask.owners.findIndex(u => u._id.equals(foundUser._id));
        if (index !== -1) {
            foundTask.owners.splice(index, 1, foundUser);
        } else {
            foundTask.owners.push(foundUser);
        }
        foundTask.save()
        res.status(200).json(foundTask)
    } catch (e) {
        res.status(400).json({ msg: e.message })
    }
}

//Remove owner
const removeOwner = async (req, res) => {
    try {
        const foundUser = await User.findById(req.params.uid).select('_id fname lname');
        if (!foundUser) throw new Error();
        const foundTask = await Task.findById(req.params.tid);
        if (!foundTask) throw new Error();
        const index = foundTask.owners.findIndex(u => u._id.equals(foundUser._id));
        if (index !== -1) {
            foundTask.owners.splice(index, 1);
            foundTask.save()
        }
        res.status(200).json(foundTask)
    } catch (e) {
        res.status(400).json({ msg: e.message })
    }
}

module.exports = {
    show,
    create,
    update,
    remove,
    addOwner,
    removeOwner
}