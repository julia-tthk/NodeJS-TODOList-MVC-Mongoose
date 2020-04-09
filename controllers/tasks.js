const mongoose = require('mongoose');
const Task = mongoose.model('Task');

exports.getAllTasks = (req, res) => {
    let today = new Date();
    //to get the date and the day of the week
    let options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    }
    let day = today.toLocaleDateString("en-US", options);
    
    Task.find((error, tasks) => {
        if(!error){
            res.render('index', 
                {
                    listTitle: day,
                    newListItems: tasks
                });
        } else {
            console.log("Failed to retrieve the data");
        }
    });    
}

exports.postAllTasks = (req, res) => {
    let userInput = req.body.newItem;
    let newTask = new Task();
    newTask.name = userInput;
    newTask.save((error, response) => {
        if(!error){
            res.redirect('/');
        } else {
            console.log(error);            
        }
    });
}

exports.deleteATask = (req, res) => {
    console.log(req.body.checkbox);
    const checkedItemId = req.body.checkbox;
    Task.findByIdAndRemove(checkedItemId, function(error) {
        if(!error){
            console.log("Successfully deleted the checked item!");
            res.redirect('/');
        }
    });
}