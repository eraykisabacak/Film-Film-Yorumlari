module.exports.registerValidation = (username,password) => {
    const errors = [];

    if(username === ""){
        errors.push({message:"Please fill the username area"});
    }
    if(password === ""){
        errors.push({message:"Please fill the password area"});
    }
    if(password.length < 6){
        errors.push({message:"Password Minimum Length Must be 6"});
    }
    return errors;

}

module.exports.commentValidation = (movie,movieComment) => {
    const errors = [];

    if(movie === ""){
        errors.push({message:"Please fill the username area"});
    }
    if(movieComment === ""){
        errors.push({message:"Please fill the password area"});
    }
    /* Movie Veri tabanında var mı */
    return errors;

}