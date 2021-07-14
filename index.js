require("dotenv").config();

//framework
const express = require("express");
const mongoose = require("mongoose");   //mongoose

//database
const database = require("./database");

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
booky.post("/book/add", (req, res) => {
    const {newBook} = req.body;
    database.books.push(newBook);
    return res.json({books: database.books});
});
/*
route           /author/add
descrption      add new author
access          public
paramter        none
methods         post
*/ 
booky.post("/author/add", (req, res) => {
    const { newAuthor } = req.body;
    database.author.push(newAuthor);
    return res.json({ authors: database.author });
});
/*
route           book/update/title
descrption      update book title
access          public
paramter        isbn
methods         put
*/ 
booky.put("/book/update/title/:isbn", (req, res) => {
   database.books.forEach((book) => {
       if (book.ISBN === req.params.isbn) {
           book.title = req.body.newBookTitle;
           return;
       }
   });
   return res.json({ books: database.books });
});
/*
route           book/update/author
descrption      update  author for a book
access          public
paramter        isbn
methods         put
*/
booky.put("/book/update/author/:isbn/:authorId", (req, res) => {
    //update book database
  database.books.forEach((book) => {
   if (book.ISBN === req.params.isbn) {
    return book.authors.push(parseInt(req.params.authorId));
   }
});
    //update author database
    database.author.forEach((author) => {
        if (author.id === parseInt(req.params.authorId)) 
         return author.books.push(req.params.isbn);
        
});
    return res.json({books: database.books, author: database.author});
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
booky.delete("/book/delet/:isbn", (req, res) => {
    const updatedBookDatabase = database.books.filter(
        (book) => book.ISBN !== req.params.isbn 
        );

        database.books = updatedBookDatabase;
        return res.json({ books: database.books });

});

/*
route           /book/delet/author
descrption      delet author from book
access          public
paramter        isbn , authorId
methods         delet
*/
 booky.delete("/book/delet/author/:isbn/:authorId", (req, res) => {
    
     // update book database
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn) {
            const newAuthorList = book.authors.filter(
                (author) => author !== parseInt(req.params.authorId));
                book.authors = newAuthorList;
                return;
        }
    });

       //update the author database
       database.author.forEach((author) => {
           if(author.id === parseInt(req.params.authorId)) {
               const newBookList = author.books.filter((book) => book !== req.params.isbn
                );

                author.books = newBookList;
                return;
           }
       });

       return res.json({
        message: "author was deleted!!",
        book: database.books,
        authors: database.authors,
        

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