const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const saltRounds = 12;

const userSchema = new Schema({
    email: {type:String, trim:true,unique:true, lowercase:true, required:true},
    fname: {type:String, required:true},
    lname: {type:String, required:true},
    password: {type:String, trim:true, required:true, minlength:3, maxlength:255},
    last_login: {type: Date},
    active: Boolean,
    projects:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Project'
        }
    ]
}, {
    timestamps:true,
    toJSON: {
        transform: function(doc, ret){
            delete ret.password
            return ret
        }
    }
});

userSchema.pre('save', async function(next){
    //This will only hash the password for our newly created user
    //User updated password, code runs below
    this.password = await bcrypt.hash(this.password, saltRounds);
    return next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;