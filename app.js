const express = require("express");
const exphbs  = require('express-handlebars');
const userRouter = require("./routes/users");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const User = require("./models/User");
const Comment = require("./models/Comment");
const flash = require("connect-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");

const app = express();
const PORT = 5000 || process.env.PORT;

// Flash Middlewares
app.use(cookieParser("passporttutorial"));
app.use(
    session({ 
        cookie: { maxAge: 60000 },
        resave:true,
        secret:"passporttutorial",
        saveUninitialized:true
    }));
app.use(flash());

// Passport Initialize
app.use(passport.initialize());
app.use(passport.session());

// Global - Res.Locals - Middleware
app.use((req,res,next) =>{
    // Our own flash
    res.locals.flashSuccess = req.flash("flashSuccess");
    res.locals.flashError = req.flash("flashError");

    // Passport Flash
    res.locals.passportFailure = req.flash("error");
    res.locals.passportSuccess = req.flash("success");

    // Our Logged In User

    res.locals.user = req.user;
    
    next();
}); 

// MongoDB Connection
mongoose.connect("mongodb://localhost/passportdb",{
    useNewUrlParser : true
});
const db = mongoose.connection;
db.on("error",console.error.bind(console,"Connection Error"));
db.once("open", () => {
    console.log("Connected to Database");
});

// Template Engine MiddleWare

app.engine('handlebars', exphbs({defaultLayout: 'mainLayout'}));
app.set('view engine', 'handlebars');

// Body Parser

app.use(bodyParser.urlencoded({extended:false}));

// Router Middleware

app.use(userRouter);

app.listen(PORT,() => {
    console.log("App Started");
});

app.get("/",(req,res,next) => {
    User.find({})
    .then(users => {
        res.render("pages/index",{users})
    })
    .catch(err => console.log(err));

});

app.get("/comments",(req,res,next) => {
    Comment.find({})
    .then(comments => {
        res.render("pages/comments",{comments})
    })
    .catch(err => console.log(err));
});

app.get("/newComment",(req,res,next) => {
    Comment.find({})
    .then(comments => {
        res.render("pages/newComment",{comments})
    })
    .catch(err => console.log(err));
});

app.use((req,res,next) => {
    res.render("static/404");
})

