const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body
const PORT = process.env.PORT || 3000;

app.get('/', function (req, res) {
  res.send('Welcome to my Hotel...How i can help you  ?')
})


// Import the Router Files
const personRoutes = require('./Routes/personRoutes');
const menuRoutes = require('./Routes/menuRoutes');

// Use the routers
app.use('/person', personRoutes);
app.use('/menu', menuRoutes);

app.listen(PORT,()=>{
    console.log("Listening on port 3000")
})


