const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 4 read only
// 5 read and execute = (take ownership, once the tasks is owned you can move it around)
// 6 read and write/CRUD tasks
// 7 read, write, delete(project) (full access)

const projectSchema = new Schema({
    title: {type:String, trim:true, required:true},
    description: {type:String, required:true},
    owners:{type: Array},
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