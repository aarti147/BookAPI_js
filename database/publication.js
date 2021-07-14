const mongoose = require("mongoose");
const PublicationSchema = mongoose.Schema({

    id: Number,
    name:String,
    books:[String],

});
    
    
    //creat a book model
    
    const PublicationModel = mongoose.model(PublicationSchema);
    
    module.exports = PublicationMOdel;