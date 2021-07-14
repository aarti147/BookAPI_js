const mongoose = require("mongoose");
//creating a book schema

const BookSchema = mongoose.Schema({
ISBN: String,
title:String ,
pubDate: String,
language: String,
numPage: Number,     
publications: Number,
authors: [Number],
category: [Number],
});          


//creat a book model

const BookModel = mongoose.model(BookSchema);

module.exports = BookMOdel;