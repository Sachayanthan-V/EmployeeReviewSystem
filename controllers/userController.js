const Admin = require('./../models/admin');
const Employee = require('../models/employee');

module.exports.userRedirect = function(req, res) {
    if (req.body.userCat=='employee'){
        return res.redirect(307, '/users/employee');
    }
    return res.redirect(307, '/users/admin');
}

module.exports.admin = function(req, res) {
    console.log(req.body.username);

    if (req.body.userpass !== req.body.userCpass){
        return redirect('/register');
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
        console.log(`Error while creating a user during signing up`); return;
    });   

}

module.exports.employee = function(req, res) {

    if (req.body.userpass !== req.body.userCpass){
        return redirect('/register');
    }

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
            console.log(`Error while creating a user during signing up \n ${err}`); return;
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

            

            if (user.password===req.body.userpass){
                return res.render('admin', {
                    title: "Admin page",
                    userDetails : user
                });
            }else{
                console.log(`password doesn't match`);
            }

        }).catch((err)=>{
            console.log(`Admin was not found..`);
            return res.redirect('back');
        })

    }

}

/*
Features (No need for extra features, just make the listed features)
Admin view
Add/remove/update/view employees
Add/update/view performance reviews
Assign employees to participate in another employee's performance review
Employee view
List of performance review requiring feedback
Submit feedback
Make 1 login for admin and employee
An employee can register, only admin can make an employee an admin
*/