const Project = require('../../models/Project');
const User = require('../../models/User');

//Index

//Show a project
const show = async (req, res) => {
    try {
        const foundProject = await Project.findById(req.params.id).populate('tasks');
        console.log(foundProject);
        res.status(200).json(foundProject)

    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
}

//Create a project
const create = async (req, res) => {
    try {
        req.body.start_date = Date.now();
        console.log(req.body);
        const createdProject = await Project.create(req.body);
        console.log(createdProject.owners[0]);

        const owner = await User.findById(createdProject.owners[0]._id).select("projects");
        if (!owner) throw new Error();
        owner.projects.push(createdProject._id);
        await owner.save()

        res.status(200).json(createdProject)

    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
}

//Update a project
const update = async (req, res) => {
    try {
        console.log(req.body);
        const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedProject);

    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
}

//Remove a Project
const remove = async (req, res) => {
    try {
        // const deletedProject = await  Project.findByIdAndDelete(req.params.id);
        const removedProject = await Project.findByIdAndUpdate(req.params.id, { active: false }, { new: true })
        res.status(200).json(removedProject)

    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
}

//Get tasks
const getTasks = async (req, res) => {
    try {
        const foundTasks = await Project.findById(req.params.id).populate('tasks').select('tasks')
        res.status(200).json(foundTasks)
    } catch (e) {
        res.status(400).json({ msg: e.message })
    }
}

//Add owner
const addOwner = async (req, res) => {
    try {
        console.log(req.params)
        const foundUser = await User.findById(req.params.uid).lean().select('_id fname lname');
        if (!foundUser) throw new Error();
        foundUser.role = req.params.role;
        const foundProject = await Project.findById(req.params.pid);
        if (!foundProject) throw new Error();
        const index = foundProject.owners.findIndex(u => u._id.equals(foundUser._id));
        if (index !== -1) {
            foundProject.owners.splice(index, 1, foundUser);
        } else {
            foundProject.owners.push(foundUser);
        }
        foundProject.save()
        res.status(200).json(foundProject)
    } catch (e) {
        res.status(400).json({ msg: e.message })
    }
}


//Remore owner
const removeOwner = async (req, res) => {
    try {
        const foundUser = await User.findById(req.params.uid);
        if (!foundUser) throw new Error();
        const foundProject = await Project.findById(req.params.pid);
        if (!foundProject) throw new Error();
        const index = foundProject.owners.findIndex(u => u._id.equals(foundUser._id));
        if (index !== -1 && parseInt(foundProject.owners[index].role) !== 7) {
            foundProject.owners.splice(index, 1);
            foundProject.save()
        }
        res.status(200).json(foundProject)
    } catch (e) {
        res.status(400).json({ msg: e.message })
    }
}



module.exports = {
    show,
    create,
    update,
    remove,
    getTasks,
    addOwner,
    removeOwner
}