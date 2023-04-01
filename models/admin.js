const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({

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
    }
}, {
    timestamps : true
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;