const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({

    name : {
        type: String, 
        required : true, 
        unique : true
    }, 
    email : {
        type: String, 
        required : true, 
        unique : true
    }, 
    password : {
        type: String, 
        required : true
    }, 
    cat : {
        type : String, 
        required : true
    }, 
    reviewList : {
        type : Array,
    }, 
    myRating : {
        type : Array, 
    },
    FinalRating : {
        type : String
    }
}, {
    timestamps : true
});

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;