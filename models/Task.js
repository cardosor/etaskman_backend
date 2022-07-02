const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: {type:String, trim:true, unique:true, lowercase:true, required:true},
    description: {type:String, required:true},
    owners: {type: Array},
    start_date: {type: Date},
    end_date: {type: Date},
    active: Boolean,
    status: Number,
    properties : Object,
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;