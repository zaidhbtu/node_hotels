const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/MenuItem');

// Post Method for the MenuItem Schema
router.post('/',async(req,res)=>{
    try {
        const data = req.body //Assuming the request body contain the MenuItem data

        //Create a new Menu document using the Mongoose Model
        const newMenu = new MenuItem(data);

        // save the new person to the databse
        const response = await newMenu.save();
        console.log('Data Saved');
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

//GET method to get the MenuItem
router.get('/', async(req,res)=>{
    try {
        const data = await MenuItem.find();
        console.log('data Fetched');
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.get('/:tasteType' , async(req,res)=>{
    try {
        const tasteType = req.params.tasteType;
        if(tasteType == 'sweet' || tasteType == 'spicy' || tasteType == 'sour'){

            const data = await MenuItem.find({taste : tasteType});
            console.log("Response Fetched");
            res.status(200).json(data);
        }else{
            res.status(404).json({error: 'Invalid work Type'})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

module.exports = router;