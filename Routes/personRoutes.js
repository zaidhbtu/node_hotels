const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');
const {jwtAuthMiddleware ,generateToken} = require('./../jwt');
// Post route Method for Person Schema
router.post('/signup', async(req,res)=>{

    try{
        const data = req.body //Assuming the request body contain the person data

        //Create a new Person document using the Mongoose Model
        const newPerson = new Person(data);

        // save the new person to the databse
        const response = await newPerson.save();
        console.log('Data Saved');
        
        const payload = {
            id: response.id,
            username: response.username
        }
        console.log(JSON.stringify(payload));
        const token = generateToken(payload);
        console.log("Token is :" , token);

        res.status(200).json({response: response, token: token});
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

// Profile Routes
router.get('/profile' ,jwtAuthMiddleware , async(req,res) =>{
    try {
        const userData = req.user;
        console.log("User Data: ",userData);

        const userId = userData.id;
        const user = await Person.findById(userId);

        res.status(200).json({user});
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
} )
//Login Route
router.post('/login' , async(req,res) => {
    try {
        // Extract the username and password from the request body
        const {username, password} = req.body;

        // Find the user by username
        const user = await Person.findOne({username: username});

        //if user does not exit or password does not match , return error
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error: 'Invalid username or Password'});
        }

        // Generate Token
        const payload = {
            id : user.id,
            username: user.username
        }

        const token = generateToken(payload);

        // return token as a response
        res.json({token});
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})



//GET route to get the person
router.get('/',jwtAuthMiddleware ,async(req,res)=>{
    try {
        const data = await Person.find();
        console.log('data Fetched');
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

// Parametrized API
router.get('/:workType' , async(req,res)=>{

    try {
        const workType = req.params.workType; // Extract the work type from the URL parameter
        if(workType == 'chef' || workType == 'waiter' || workType == 'manager'){

            const response = await Person.find({work:workType});
            console.log("Response Fetched");
            res.status(200).json(response);
        }else{
            res.status(404).json({error: 'Invalid work Type'})
        }
    }catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.put('/:id', async(req,res) =>{
    try {
        const personId = req.params.id;  // Extract the id from the URL parameter
        const updatedPersonData = req.body;

        const response = await Person.findByIdAndUpdate(personId , updatedPersonData , {
            new:true, // Return the Updated Document
            runValidators: true, // Run Mongoose Validation
        });
        if(!response){
            return res.status(404).json({error: 'Person not found'})
        }

        console.log("data Updated");
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.delete('/:id' , async(req,res) =>{
    try {
        const personId = req.params.id;

        //Assuming you have a person model
        const response = await Person.findByIdAndDelete(personId);
        if(!response){
            return res.status(404).json({error: 'Person not found'})
        }
        console.log("data Deleted");
        res.status(200).json({message: 'Person Deleted Successfully'});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

// commant added to new Repository
module.exports = router;