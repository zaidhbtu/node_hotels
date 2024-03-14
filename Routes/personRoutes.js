const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');

// Post route Method for Person Schema
router.post('/', async(req,res)=>{

    try{
        const data = req.body //Assuming the request body contain the person data

        //Create a new Person document using the Mongoose Model
        const newPerson = new Person(data);

        // save the new person to the databse
        const response = await newPerson.save();
        console.log('Data Saved');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

//GET route to get the person
router.get('/', async(req,res)=>{
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

module.exports = router;