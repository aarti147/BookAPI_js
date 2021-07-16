require("dotenv").config();

//framework
const express = require("express");
const mongoose = require("mongoose");   //mongoose

//database
const database = require("./database/index");

//models
const BookModel = require("./database/Book");
const AuthorModel = require("./database/Author");
const PublicationModel = require("./database/Publication");
const { find } = require("./database/Book");

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
 )
   .then(() => console.log("connection established!!!!"));


/*route         /
descrption      get all books
access          public
paramter        none
methods         get
*/ 

booky.get("/", async (req, res) => {
    const getAllBooks = await BookModel.find();
   return res.json(getAllBooks);

});

/*route         /
descrption      get specific books based on isbn
access          public
paramter        isbn
methods         get
*/ 

booky.get("/is/:isbn", async (req, res) => {
    //code using of mongodb
    const getSpecificBook = await BookModel.findOne({ ISBN: req.params.isbn});


    //normal code without using of mongodb
   // const getSpecificBook = database.books.filter(
      //  (book) => book.ISBN === req.params.isbn );


      //! is required coz we cannot specify null (0) here bcoz it return null output
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
booky.get("/c/:category", async (req, res) => {
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
booky.get("/author", async (req, res) => {
const getAllAuthors = await AuthorModel.find();
    return res.json({ authors:getAllAuthors});
    
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
methods         get
*/ 
booky.get("/publication", (req, res) => {
    return res.json({ publications:database.publication});
});
/*
route           /book/add
descrption      add new book
access          public
paramter        none
methods         post
*/ 
booky.post("/book/add", async (req, res) => {
    const {newBook} = req.body;

    const addNewBook = BookModel.create(newBook);
    
    return res.json({books: addNewBook, message: "book is added"});
});
/*
route           /author/add
descrption      add new author
access          public
paramter        none
methods         post
*/ 
booky.post("/author/add",  (req, res) => {
    const { newAuthor } = req.body;

     AuthorModel.create(newAuthor);

    return res.json({ message: "author is added" });
});
/*
route           book/update/title
descrption      update book title
access          public
paramter        isbn
methods         put
*/ 
booky.put("/book/update/title/:isbn", async (req, res) => {
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
booky.put("/book/update/author/:isbn", async (req, res) => {
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
route           /publication/update/book
descrption      update the publication
access          public
paramter        isbn
methods         put
*/

booky.put("/publication/update/book/:isbn", (req, res) => {
     //update the publication database
     database.publications.forEach((publication) => {
         if (publication.id === req.body.pubId) {
        return publication.books.push(req.params.isbn);
      }
    });

    //update the book database

       database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) {
            book.publication = req.body.pubId;
            return;
        }
    });

    return res.json({ 
        books: database.books,
        publications: database.publications,
        message: "successfully update publications",
    });
});

/*
route           /book/delet
descrption      delet a book
access          public
paramter        isbn
methods         delet
*/
booky.delete("/book/delet/:isbn", async (req, res) => {
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
route           /book/delet/author
descrption      delet author from book
access          public
paramter        isbn , authorId
methods         delet
*/
 booky.delete("/book/delet/author/:isbn/:authorId",async (req, res) => {
    //with mongodb
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
     // update book database





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

 /*
route           /publication/delet/book
descrption      delet a book from publication
access          public
paramter        isbn , publication id
methods         delet
*/

booky.delete("/publication/delet/book/:isbn/:pubId", (req, res) => {
    //updated publication database
  database.publication.forEach((publication) => {
      if (publication.id === parseInt(req.params.pubId)) {
          const newBookList = publication.books.filter(
              (book) =>  book !== req.params.isbn );
        
              publication.books = newBookList;
              return;
      }
  });
         //update book database
       database.books.forEach((book) => { 
           if (book.ISBN === req.params.isbn) {
               book.publication = 0; //no publication  available  
               return;         
       }
});

       return res.json({
          message: "hey htis is running",
          publication: database.publications,
          books: database.books,
       });
});

   booky.listen(3000,() => console.log("hey this is running"));



   //talk with mongodb in which mongod can understand *****
   //talk to us in which we can understand === javascript

   //mongoose