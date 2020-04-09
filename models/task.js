const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    name: {
        type: String
    }
});

mongoose.model('Task', taskSchema);