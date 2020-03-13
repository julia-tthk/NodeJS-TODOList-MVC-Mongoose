const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');


const items = [];

app.get('/', (req, res)=>{
    let today = new Date();
    //to get the date and the day of the week
    let options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    }
    
    let day = today.toLocaleDateString("en-US", options);
    console.log(day);

    res.render('index', {
        listTitle: day,
        newListItems: items
    })
});

app.post('/', (req, res)=>{
    let item = req.body.newItem;
    items.push(item);
    console.log(items);
    res.redirect('/');
});

app.get('/study', (req, res) => {
    res.render('index', {
        listTitle: "Study TODO",
        newListItems: ""
    })
});

app.listen(3000, ()=>{
    console.log("Server is running on port 3000");    
})