const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 5 read and execute
// 6 read and write
// 7 read, write, delete (full access)

const taskSchema = new Schema({
    title: {type:String, trim:true, lowercase:true, required:true},
    description: {type:String, required:true},
    owners: {type: Array},
    start_date: {type: Date},
    end_date: {type: Date},
    project:
        {
            type: Schema.Types.ObjectId,
            ref: 'Project'
        },
    active: Boolean,
    status: Number,
    properties : Object,
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;