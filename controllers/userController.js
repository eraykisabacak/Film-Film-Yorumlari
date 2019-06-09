const formValidation = require("../validation/formValidation");
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Movie = require('../models/Movie');
const Comment = require('../models/Comment');
const passport = require("passport");

require("../authentication/passport/local");

module.exports.getUserLogin = (req,res,next) => {
    res.render("pages/login");
};
module.exports.getUserLogout = (req,res,next) => {
    req.logout();
    req.flash("success","Successfully Logout");
    res.redirect("/login");
};
module.exports.getUserRegister = (req,res,next) => {
    res.render("pages/register");
};
module.exports.postUserLogin = (req,res,next) => {
    passport.authenticate("local",{
        successRedirect : "/",
        failureRedirect : "/login",
        failureFlash : true,
        successFlash : true
    })(req,res,next);
};

module.exports.getNewComment = (req,res,next) => {
    res.render("pages/newComment");
};

module.exports.postNewComment = (req,res,next) => {
    const movieName = req.body.movieName;
    const movieComment = req.body.movieComment;
    const validationErrors = formValidation.commentValidation(movieName,movieComment);

    if(validationErrors.length > 0){
        return res.render("pages/newComment",{
            movieName:movieName,
            movieComment:movieComment,
            errors:validationErrors
        });
    }
    const newComment = new Comment({
        movieName:movieName,
        movieComment: movieComment 
    });

    newComment
    .save()
    .then( () => {
        console.log("Successful");
        req.flash("flashSuccess","Successfully Registered");   
        res.redirect("newComment");             
    })
    

};

module.exports.getNewMovie = (req,res,next) => {
    res.render("pages/newMovie");
};

module.exports.postNewMovie = (req,res,next) => {
    const movie = req.body.movie;
    const movieCategory = req.body.movieCategory;
};

module.exports.postUserRegister = (req,res,next) => {
    const username = req.body.username;
    const password = req.body.password;
    const errors = [];
    const validationErrors = formValidation.registerValidation(
        username,
        password
    );
    // Server Side Validation
    if(validationErrors.length > 0){
        return res.render("pages/register",{
            username:username,
            password:password,
            errors:validationErrors
        });
    }
    User.findOne({
        username
    }).then(user => {
        if(user){
            // Email Validation
            errors.push({message: "Username Already In User"});
            return res.render("pages/register",{
                username,
                password,
                errors
            });
        }

        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                if(err) throw err;
                const newUser = new User({
                    username:username,
                    password: hash 
                });

            newUser
            .save()
            .then(() => {
                console.log("Successful");
                req.flash("flashSuccess","Successfully Registered");
                
                res.redirect("/");
            })
            .catch(err => console.log(err));
        });
    });
}).catch(err => console.log(err));


    
};
