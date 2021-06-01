const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/DanceClass', {useNewUrlParser: true, useUnifiedTopology: true});
const port = 27017;


const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    gender: String,
    address: String,
    desc: String,
});

const Contact = mongoose.model('Contact', contactSchema); 

app.use('/static', express.static('static'))
app.use(express.urlencoded());

app.set('view engine', 'pug')   // Set the template engine as pug
app.set('views', path.join(__dirname, 'views'))  //Set the views directory

app.get ('/',(req, res) =>{    //For home Page 
    const params = {}
res.status(200).render("home.pug",)
})

app.get ('/aboutus',(req, res) =>{    //For aboutus 
    const params = {}
res.status(200).render("aboutus.pug",)
})


app.get ('/contact',(req, res) =>{    //to get data from the user 
    const params = {}
res.status(200).render("contact.pug",)
})

app.post ('/contact', (req, res) =>{     //to post data on database from user
    var myData = new Contact(req.body);
    myData.save().then(() =>{
        res.send("YOUR DATA HAS BEEN SAVED TO DATABASE! You will Recieve a call Anytime!!")


    }).catch(() =>{
        res.status(404).send("item has not been saved")   //Error if not saved
    })
})
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`) //Server where it will run
})