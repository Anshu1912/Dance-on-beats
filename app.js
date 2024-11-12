const express = require("express");
const path = require("path");
const app = express();
const mongoose= require('mongoose');
mongoose.connect('mongodb://localhost/registerDance', {useNewUrlParser:true});
const port = 8000;

//SCHEMA
var registerSchema= new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,
});
var Register= mongoose.model('Register', registerSchema);
// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    const params = { }
    res.status(200).render('home.pug', params);
})

app.get('/register', (req, res)=>{
    const params = { }
    res.status(200).render('register.pug', params);
})

app.get('/about', (req, res)=>{
    const params = { }
    res.status(200).render('about.pug', params);
})
app.get('/info', (req, res)=>{
    const params = { }
    res.status(200).render('info.pug', params);
})
app.get('/services', (req, res)=>{
    const params = { }
    res.status(200).render('services.pug', params);
})
app.get('/contact', (req, res)=>{
    const params = { }
    res.status(200).render('contact.pug', params);
})
app.post('/register', (req, res)=>{
    var myData= new Register(req.body);
    myData.save().then(()=>{
        res.send("Your registration is succesfully done.")
    }).catch(()=>{
        res.status(400).send("Item not saved in the database.")
    });
})
// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});