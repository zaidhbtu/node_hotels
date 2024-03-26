const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//Define the Person schema 
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required : true
    },
    age: {
        type: Number
    },
    work: {
        type: String,
        enum:['chef' , 'waiter' , 'manager'],
        required: true
    },
    mobile: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required: true,
        unique : true
    },
    address: {
        type: String
    },
    salary: {
        type: Number,
        required: true
    },
    username: {
        required : true,
        type: String
    },
    password: {
        required : true,
        type: String
    }
});

personSchema.pre('save', async function(next){
    const person = this;

    // hash the password only if it has been modified 
    if(!person.isModified('password')) return next();

    try {
        // Hash Password Generation
        const salt = await bcrypt.genSalt(10);

        // Hash Password
        const hashedPassword = await bcrypt.hash(person.password,salt);

        //override the plain password with the hashed one
        person.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
})


personSchema.methods.comparePassword = async function(candidatePassword){
    try {
        // Use bcrypt tp compare the provided password with the hased password
        const isMatch = await bcrypt.compare(candidatePassword , this.password);
        return isMatch;
    } catch (err) {
        throw err;
    }
}

// prince --> bdbebuebjbe7y38
// login--> agrawal

//  bdbebuebjbe7y38 --> extract salt 
// salt + agrawal  --> hash -->heehwkefoww9fi7y4refuwojsflwv


// Create Person Model
module.exports = mongoose.model('Person', personSchema);