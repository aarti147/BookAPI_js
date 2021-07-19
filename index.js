require("dotenv").config();

//framework
const express = require("express");
const mongoose = require("mongoose");   //mongoose



//microservices Router
const Books = require("./API/Book");
const Authors = require("./API/Author");
const Publications = require ("./API/Publication");


//initializing express
const booky = express(); 

//configuration
 booky.use(express.json());

 // establish a connection   ........ mongoose
 mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
 }
 ) .then(() => console.log("connection established!!!!"));

 //initialization microservices

 Booky.use("/book",Books);
 Booky.use("/publication",Publications);
 Booky.use("/author",Authors);

     

 Router.listen(3000,() => console.log("hey this is running"));
   //talk with mongodb in which mongod can understand *****
   //talk to us in which we can understand === javascript

   //mongoose