const User = require('../../models/User');
const bcrypt = require('bcrypt');
const saltRounds = 12;
const jwt = require('jsonwebtoken');

//Create a user
const create = async (req, res) => {
    try{
        console.log(req.body)
        req.body.type = "basic";
        req.body.last_login = Date.now();
        const createdUser = await  User.create(req.body);
        res.status(200).json(createJWT(createdUser))

    }catch(e){
        res.status(400).json({msg:e.message});
    }
}

//Login a user
const login = async (req, res) => {
    try{
        //find user by email
        const user = await  User.findOne({ email: req.body.email}).populate({path:'projects', match:{active:true}});
        if(!user) throw new Error();
        //compare() takes user's input from req.body, hashes it, and compares it to our db hashed pw
        const match = await bcrypt.compare(req.body.password, user.password);
        //If the pws do not match throw error
        if(!match) throw new Error();
        //Update the last time the user logged in
        await User.findByIdAndUpdate(user._id, {"last_login":Date.now()});
        
        res.status(200).json(createJWT(user))

    }catch(e){
        res.status(400).json({msg:e.message, reason:'Bad Credentials'});
    }
}

// Update a user
const update = async (req, res) => {
    try {
        if(req.body.password) req.body.password = await bcrypt.hash(req.body.password, saltRounds);
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(200).json(updatedUser)
    } catch(e) {
        res.status(400).json({msg: e.message})
    }
}

// Delete a user
const remove = async (req, res) => {
    try {
        const removedUser = await User.findByIdAndUpdate(req.params.id, {active: false}, {new: true})
        res.status(200).json(removedUser)
    } catch(e) {
        res.status(400).json({msg: e.message})
    }
}

//Show a user
const show = async (req, res) => {
    try{
        const foundUser = await  User.findById(req.params.id).populate({path:'projects', match:{active:true}});
        console.log(foundUser);
        res.status(200).json(foundUser)

    }catch(e){
        res.status(400).json({msg:e.message});
    }
}

//helper function
const createJWT = user => {
    return jwt.sign({user}, process.env.SECRET,{expiresIn:'48h'});
}

module.exports = {
    create,
    update,
    show,
    login,
    remove
}