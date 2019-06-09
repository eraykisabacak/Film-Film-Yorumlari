const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({


    movieName:{
        type:String,
        require:true,
        minLength:10,
        maxLength:30
    },
    movieComment:{
        type:String,
        require:true,
        minLength:10,
        maxLength:100
    },
});

const Comment = mongoose.model("Comment",CommentSchema);

module.exports = Comment;