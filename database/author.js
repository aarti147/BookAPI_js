const mongoose = require("mongoose");
const AuthorSchema = mongoose.Schema({
    
        id: Number,
        name: String,
        books:[String],
});
    
    
    //creat a book model
    
    const AuthorModel = mongoose.model(AuthorSchema);
    
    module.exports = AuthorMOdel;