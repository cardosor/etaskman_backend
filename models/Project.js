const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    title: {type:String, trim:true, unique:true, lowercase:true, required:true},
    description: {type:String, required:true},
    owners:[
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    start_date: {type: Date},
    end_date: {type: Date},
    active: Boolean,
    board : Object,
    tasks:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Task'
        }
    ]
});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;