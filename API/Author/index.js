const Router = require("express").Router();
//seting model

const AuthorModel = require("../../database/author");

 /*
route           /author
descrption      get all author 
access          public
paramter        none
methods         get
*/ 
Router.get("/", async (req, res) => {
    const getAllAuthors = await AuthorModel.find();
        return res.json({ authors:getAllAuthors});
        
    });
    /*route         /i
    descrption      get specific auhtor based on id
    access          public
    paramter        id
    methods         get
    */ 
    Router.get("/i/:id", (req, res) => {
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
    Router.get("/book/:isbn", (req, res) => {
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
route           /author/add
descrption      add new author
access          public
paramter        none
methods         post
*/ 
Router.post("/add",  (req, res) => {
    const { newAuthor } = req.body;

     AuthorModel.create(newAuthor);

    return res.json({ message: "author is added" });
});



module.exports = Router;

