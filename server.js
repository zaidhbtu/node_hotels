const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();
const passport = require('./auth');

const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body
const PORT = process.env.PORT || 3000;

//Middleware Function
const logRequest = (req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
    next(); //Move on to the next Phase
}

// for all Routes Function
app.use(logRequest);



app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local',{session: false});

app.get('/',function (req, res) {
  res.send('Welcome to my Hotel...How i can help you  ?')
})


// Import the Router Files
const personRoutes = require('./Routes/personRoutes');
const menuRoutes = require('./Routes/menuRoutes');

// Use the routers
app.use('/person',personRoutes);
app.use('/menu',menuRoutes);

app.listen(PORT,()=>{
    console.log("Listening on port 3000")
})


