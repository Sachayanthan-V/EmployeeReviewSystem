const Admin = require('./../models/admin');
const Employee = require('../models/employee');

module.exports.userRedirect = function(req, res) {
    if (req.body.userCat=='employee'){
        return res.redirect(307, '/users/employee');
    }
    return res.redirect(307, '/users/admin');
}

module.exports.admin = async function(req, res) {
    console.log(req.body.username, req.body.useremail);

    await Admin.findOne({email : req.body.useremail})
    .then((user)=>{ 
        if(user){
            console.log(`User exists in Admin \n ${user}`);
            return res.redirect('/register');
        }
        else{
            console.log("Throwing from Admin");
            throw "Throwing from Admin"
        }
    }).catch((err)=>{

        Employee.findOne({email : req.body.useremail})
        .then((user)=>{ 
            if(user){
                console.log(`User exists in Employee`);
                return res.redirect('/register');
            }
            else{
                console.log("Throwing from Emp");
                throw "Throwing from Employee"
            }
        })
        .catch((err)=>{

            if (req.body.userpass !== req.body.userCpass){
                // window.alert(`passwords doesn't match, Try again!..`);
                return res.redirect('/register');
            }
        
            let newUser = {
                name : req.body.username,
                password : req.body.userpass,   
                email : req.body.useremail,    
                cat : "Admin"
            }
        
            Admin.create(newUser)
            .then((user)=>{
                console.log(`Employee new User Account is created successfully!...\n ${user} `);
                return res.redirect('/login');
            }).catch((err)=>{
                console.log(`Error while creating a user during signing up`); 
                return res.redirect('/register');
            });   

        });

    });

}

module.exports.employee = async function(req, res) {

    console.log(req.body.username, req.body.useremail);

    await Admin.findOne({email : req.body.useremail})
    .then((user)=>{ 
        if(user){
            console.log(`User exists in Admin`);
            return res.redirect('/register');
        }
        else{
            console.log("Throwing from Admin");
            throw "Throwing from Admin"
        }
    }).catch((err)=>{

        Employee.findOne({email : req.body.useremail})
        .then((user)=>{ 
            if(user){
                console.log(`User exists in Employee`);
                return res.redirect('/register');
            }
            else{
                console.log("Throwing from Emp");
                throw "Throwing from Employee"
            }
        })
        .catch((err)=>{
        
            let newUser = {
                name : req.body.username,
                password : req.body.userpass,
                email : req.body.useremail,
                cat : "Employee"
            }
        
            Employee.create(newUser)
                .then((user)=>{
                    console.log(`Employee new User Account is created successfully!...\n ${user} `);
                    return res.redirect('/login');
                }).catch((err)=>{
                    console.log(`Error while creating a user during signing up \n ${err}`); 
                    // window.alert("User already exists");
                    return res.redirect('/register');
                });  

        });

    });

      
}

module.exports.Login = function(req, res) {
    console.log(req.body.username, typeof(req.body.username))
    if ( req.body.userCat === 'employee') {
    
        console.log("checking under employee\n");
        Employee.findOne ({name : req.body.username})
            .then((user)=>{

                console.log("\n\nUSERDETAILS ::" , user, "\n\n");
                if (user.password===req.body.userpass){
                    
                    res.cookie("name", req.body.username);

                    return res.render('employee', {
                        title: "Employee page",
                        userDetails : user
                    });
                }
                else{
                    console.log(`password doesn't match`);
                    return res.redirect('back');
                }

            }).catch((err)=>{
                console.log(`User was not found..\n ${err}`);
                return res.redirect('back');
            })
    
    }
    else {

        Admin.findOne({ name : req.body.username})
        .then((user)=>{


            Employee.find({})
                .then((emp)=>{

                    if (user.password===req.body.userpass){

                        res.cookie("name", req.body.username);

                        return res.render('admin', {
                            title: "Admin page",
                            userDetails : user,
                            Employee : emp 
                        });
                    }else{
                        console.log(`password doesn't match`);
                    }
                }).catch((err)=>{
                    console.log("Error during employee scanning while login into admin account");
                })

        }).catch((err)=>{
            console.log(`Admin was not found.. \n ${err}`);
            return res.redirect('back');
        })

    }

}

module.exports.employeePage = async function(req, res) {
    
    console.log( res.cookie );

    // console.log(req.body.username, req.body.useremail);

    // await Admin.findOne({email : req.body.useremail})
    // .then((user)=>{ 
    //     if(user){
    //         console.log(`User exists in Admin \n ${user}`);
    //         return res.redirect('/register');
    //     }
    //     else{
    //         console.log("Throwing from Admin");
    //         throw "Throwing from Admin"
    //     }
    // }).catch((err)=>{

    //     Employee.findOne({email : req.body.useremail})
    //     .then((user)=>{ 
    //         if(user){
    //             console.log(`User exists in Employee`);
    //             return res.redirect('/register');
    //         }
    //         else{
    //             console.log("Throwing from Emp");
    //             throw "Throwing from Employee"
    //         }
    //     })
    //     .catch((err)=>{

    //         if (req.body.userpass !== req.body.userCpass){
                
    //             return res.redirect('/register');
    //         }
        
    //         let newUser = {
    //             name : req.body.username,
    //             password : req.body.userpass,   
    //             email : req.body.useremail,    
    //             cat : "Admin"
    //         }
        
    //         Admin.create(newUser)
    //         .then((user)=>{
    //             console.log(`Employee new User Account is created successfully!...\n ${user} `);
    //             return res.redirect('/login');
    //         }).catch((err)=>{
    //             console.log(`Error while creating a user during signing up`); 
    //             return res.redirect('/register');
    //         });   

    //     });

    // });
}

/*
module.exports.adminSignUp = function(req, res) {
    if(req.isAuthenticated()){
        return res.redirect('/Admin');
    }

    return res.render('register', {
        title : "Register page"
    });
}

module.exports.adminSignUp = function(req, res) {
    if(req.isAuthenticated()){
        return res.redirect('/Admin');
    }

    return res.render('login', {
        title : "login page"
    });
}

module.exports.employeeSignUp = function(req, res) {
    if(req.isAuthenticated()){
        return res.redirect('/Employee');
    }

    return res.render('register', {
        title : "Register page"
    });
}

module.exports.employeeSignUp = function(req, res) {
    if(req.isAuthenticated()){
        return res.redirect('/Employee');
    }

    return res.render('login', {
        title : "login page"
    });
}

module.exports.createSession = function(req, res) {
    // req.flash('success', 'Logged in successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res) {
    // req.flash('success', 'Logged out successfully');
    req.logout( function(err){ console.log('Logout Error : ', err) } );
    // req.session.destroy();
    return res.redirect('/');
}
*/