const mongoose = require("mongoose");
//creating a book schema

const BookSchema = mongoose.Schema({
ISBN: String,
title: String ,
pubDate: String,
language: String,
numPage: Number,     
publication: Number,
authors: [Number],
category: [String],
});          


//creat a book model

const BookModel = mongoose.model( "books", BookSchema);

module.exports = BookModel;