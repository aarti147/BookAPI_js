const express = require("express");


const database = require("./database");

const booky = express();
/*route         /
descrption      get all books
access          public
paramter        none
methods         get
*/ 

booky.get("/", (req, res) => {
   return res.json({ books: database.books});

});

/*route         /
descrption      get specific books based on isbn
access          public
paramter        isbn
methods         get
*/ 

booky.get("/is/:isbn", (req, res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.ISBN === req.params.isbn );

        if(getSpecificBook.length === 0) {
            return res.json({
                error: `no book found for the ISBN of ${req.params.isbn}`,
            });
        }
        return res.json({
            book: getSpecificBook
        });
    });
/*
route           /c
descrption      get all books
access          public
paramter        category
methods         get
*/ 
booky.get("/c/:category", (req, res) => {
const getSpecificBook = database.books.filter((book) => book.category.includes(req.params.category)
);

if(getSpecificBook.length === 0) {
    return res.json({
        error: `no book found for the category of ${req.params.category}`,
    });
}
return res.json({
    book: getSpecificBook
});

});
/*route         /la
descrption      get specific books based on isbn
access          public
paramter        language
methods         get
*/ 
booky.get("/la/:language", (req, res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.language === req.params.language );

    if(getSpecificBook.length === 0) {
        return res.json({
            error: `no book found for the language of ${req.params.language}`,
        });
    }
    return res.json({
        book: getSpecificBook
    });
    
    });
     
    /*
route           /author
descrption      get all author 
access          public
paramter        none
methods         get
*/ 
booky.get("/author", (req, res) => {
    return res.json({ authors:database.author});
    
});
/*route         /i
descrption      get specific auhtor based on id
access          public
paramter        id
methods         get
*/ 
booky.get("/i/:id", (req, res) => {
    const getSpecificAuthor = database.author.filter(
        (author) => author.id === req.params.id );

        if(getSpecificAuthor.length === 0) {
            return res.json({
                error: `no author found for the id of ${req.params.id}`,
            });
        }
        return res.json({
            authors: getSpecificAuthor
        });
    });
 
    /*
route           /author/book
descrption      get specific auhtor based on books
access          public
paramter        isbn
methods         get
*/ 
booky.get("/author/book/:isbn", (req, res) => {
    const getSpecificAuthor = database.author.filter(
        (author) => author.books.includes(req.params.isbn)
    );
    
    if(getSpecificAuthor.length === 0) {
        return res.json({
            error: `no author found for the books of ${req.params.isbn}`,
        });
    }
    return res.json({
        authors: getSpecificAuthor
    });
});
/*
route           /publication
descrption      get all publcation
access          public
paramter        none
methods         getE
*/ 
booky.get("/publication", (req, res) => {
    return res.json({ publications:database.publication});
});

   booky.listen(3000,() => console.log("hey this is running"));