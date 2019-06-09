const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovieSchema = new Schema({

    movieName:{
        type:String,
        require:true,
        minLength:10,
        maxLength:30
    },
    movieCategory:{
        type:String,
        require:true,
        minLength:10,
        maxLength:30
    },
    movieDirector:{
        type:String,
        require:true,
        minLength:10,
        maxLength:30
    }
    

});

module.exports = mongoose.model('movie', MovieSchema);