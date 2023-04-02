const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;
const Employee = require('./../models/employee');
const Admin = require('./../models/admin');

passport.use( new LocalStrategy (
    { usernameField : 'email'},
    function(usertype, email, password, done) {

        if(usertype=='Admin'){

            Admin.findOne({email: email})
            .then((user)=>{
                if(!user || user.password != password){
                    console.log('Invalid userName/password');
                    return done(null, false);
                }
                return done(null, user);
            })
            .catch((err)=>{
                console.log(`Error in finding AdminUser => passport`);
                return done(err);
            });

        }
        else {

            Employee.findOne({email: email})
            .then((user)=>{
                if(!user || user.password != password){
                    console.log('Invalid userName/password');
                    return done(null, false);
                }
                return done(null, user);
            })
            .catch((err)=>{
                console.log(`Error in finding AdminUser => passport`);
                return done(err);
            });

        }

    }

));

passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(usertype, id, done){

    if ( usertype == 'Admin' ) {
        Admin.findOne({email : email})
        .then((user)=>{
            return done(null, user);
        })
        .catch((err)=>{
            console.log(`Error in finding user DS => passport`);
            return done(err);
        });
    }
    else{
        Employee.findOne({email : email})
        .then((user)=>{
            return done(null, user);
        })
        .catch((err)=>{
            console.log(`Error in finding user DS => passport`);
            return done(err);
        });
    }

})

passport.checkAuthentication = function(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next) {
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;