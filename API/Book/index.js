//initializing Router express
const Router = require("express").Router();

//set the model
const BookModel = require("../../database/book");

/*route         /
descrption      get all books
access          public
paramter        none
methods         get
*/ 

Router.get("/", async (req, res) => {
    const getAllBooks = await BookModel.find();
   return res.json(getAllBooks);

});

/*route         /
descrption      get specific books based on isbn
access          public
paramter        isbn
methods         get
*/ 

Router.get("/is/:isbn", async (req, res) => {
    //code using of mongodb
    const getSpecificBook = await BookModel.findOne({ ISBN: req.params.isbn});


    //normal code without using of mongodb
   // const getSpecificBook = database.books.filter(
      //  (book) => book.ISBN === req.params.isbn );


      //! is required coz we cannot specify null (0) here bcoz it will return null output
        if(!getSpecificBook) {
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
descrption      get specific books based oN category
access          public
paramter        category
methods         get
*/ 
Router.get("/c/:category", async (req, res) => {
//with mongo
const getSpecificBooks = await BookModel.findOne({category: req.params.category,});


//const getSpecificBook = database.books.filter((book) => book.category.includes(req.params.category)
//);

if(!getSpecificBooks) {

    return res.json({
        error: `no book found for the category of ${req.params.category}`,
    });
}
return res.json({
    books: getSpecificBooks
});

});
/*route         /la
descrption      get specific books based on isbn
access          public
paramter        language
methods         get
*/ 
Router.get("/la/:language", (req, res) => {
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
route           /add
descrption      add new book
access          public
paramter        none
methods         post
*/ 
Router.post("/add", async (req, res) => {
    const {newBook} = req.body;

    const addNewBook = BookModel.create(newBook);
    
    return res.json({books: addNewBook, message: "book is added"});
});

/*
route           book/update/title
descrption      update book title
access          public
paramter        isbn
methods         put
*/ 
Router.put("/update/title/:isbn", async (req, res) => {
    //with mongodb
    const updatedBook = await BookModel.findOneAndUpdate(
        { ISBN: req.params.isbn, },
        {title: req.body.BookTitle, },
        {new: true, },
     );
     return res.json({ books: updatedBook });
 });
    
    
    /////without mongodb
     //database.books.forEach((book) => {
       // if (book.ISBN === req.params.isbn) {
        //    book.title = req.body.newBookTitle;
          //  return;
        //}
    //});
   // return res.json({ books: database.books });


 /*
 route           book/update/author
 descrption      update  author for a book
 access          public
 paramter        isbn
 methods         put
 */
 Router.put("/update/author/:isbn", async (req, res) => {
     //update book database
  const updatedBook = await BookModel.findOneAndUpdate(
      {
           ISBN: req.params.isbn,
      },
      {  $addToSet:{
     authors: req.body.newAuthor, },
      }, 
      {
         new: true, 
      },
      );
       //database.books.forEach((book) => {
    //if (book.ISBN === req.params.isbn) {
     //return book.authors.push(parseInt(req.params.authorId));
    //}
 //});
     //update author database
    const updatedAuthor = await AuthorModel.findOneAndUpdate(
        {
            id: req.body.newAuthor,
         },
         {
             $addToSet: {
                 books: req.params.isbn,
             }
         }, 
         {
             new: true,
         }
         );
    
    
    
    
     //database.author.forEach((author) => {
       //  if (author.id === parseInt(req.params.authorId)) 
         // return author.books.push(req.params.isbn);
         
 //});
     return res.json({books: updatedBook, authors: updatedAuthor,});
 });

 /*
route           /delet
descrption      delet a book
access          public
paramter        isbn
methods         delet
*/
Router.delete("/delet/:isbn", async (req, res) => {
    const updatedBookDatabase = await BookModel.findOneAndDelete(
        {
            ISBN: req.params.isbn,
        });
    
    
    
      //const updatedBookDatabase = database.books.filter(
        //  (book) => book.ISBN !== req.params.isbn 
         // );
  
          //database.books = updatedBookDatabase;
          return res.json({ books: updatedBookDatabase });
  
  });

  /*
route           /delet/author
descrption      delet author from book
access          public
paramter        isbn , authorId
methods         delet
*/
 Router.delete("/delet/author/:isbn/:authorId",async (req, res) => {
    //with mongodb
     // update book database
const updatedBook = await BookModel.findOneAndUpdate(
    { 
        ISBN: req.params.isbn,
    },
    {
      $pull: {
              authors: parseInt(req.params.authorId),
             },
    },
    {new: true,}
);
// without mongo
   // database.books.forEach((book) => {
    //    if(book.ISBN === req.params.isbn) {
      //      const newAuthorList = book.authors.filter(
        //        (author) => author !== parseInt(req.params.authorId));
          //      book.authors = newAuthorList;
            //    return;
        //}
    //});

       //update the author database
//with mongodb
const updatedAuthor = await AuthorModel.findOneAndUpdate(
    {
    id: parseInt(req.params.authorId),
    },
    {
        $pull:{
                books: req.params.isbn,
        }
    },
    {
       new: true,
    }
    
    );

       //database.author.forEach((author) => {
          // if(author.id === parseInt(req.params.authorId)) {
             //  const newBookList = author.books.filter((book) => book !== req.params.isbn
               // );

              //  author.books = newBookList;
                //return;
        //   }
      // });

       return res.json({
        message: "author was deleted!!",
        book: updatedBook,
        author: updatedAuthor,
        

      });
 });
  

  module.exports = Router;