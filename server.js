const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/todolistDB', { useNewUrlParser: true, useUnifiedTopology: true });

//create item schema
const itemSchema = {
    name: String
};

//create mongoose model, models are always in capital
const Item = mongoose.model('Item', itemSchema);


app.get('/', (req, res)=>{
    let today = new Date();
    //to get the date and the day of the week
    let options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    }
    
    let day = today.toLocaleDateString("en-US", options);
    //console.log(day);

    //{} find all the items inside the collection
    Item.find({}, function(error, fetchedItems){
        console.log(fetchedItems);
        res.render('index', {
            listTitle: day,
            newListItems: fetchedItems
        });
    });

    
});


app.post('/', (req, res)=>{
    console.log(req.body.list);
    let userInput = req.body.newItem;

    const item = new Item({
        name: userInput
    });

    item.save();
    res.redirect('/');
   
});

app.post('/delete', (req, res) => {
    console.log(req.body.checkbox);
    const checkedItemId = req.body.checkbox;
    Item.findByIdAndRemove(checkedItemId, function(error) {
        if(!error){
            console.log("Successfully deleted checked item!");
            res.redirect('/');
        }
    });
});



app.listen(3000, ()=>{
    console.log("Server is running on port 3000");    
})
