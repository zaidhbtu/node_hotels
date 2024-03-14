const express = require('express');
const app = express();
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body


app.get('/', function (req, res) {
  res.send('Welcome to my Hotel...How i can help you  ?')
})


// Import the Router Files
const personRoutes = require('./Routes/personRoutes');
const menuRoutes = require('./Routes/menuRoutes');

// Use the routers
app.use('/person', personRoutes);
app.use('/menu', menuRoutes);

app.listen(3000,()=>{
    console.log("Listening on port 3000")
})


