const Router = require("express").Router();




/*
route           
descrption      get all publcation
access          public
paramter        none
methods         get
*/ 
Router.get("/", (req, res) => {
    return res.json({ publications:database.publication});
});


/*
route           /update/book
descrption      update the publication
access          public
paramter        isbn
methods         put
*/

Router.put("/update/book/:isbn", (req, res) => {
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
route           /delet/book
descrption      delet a book from publication
access          public
paramter        isbn , publication id
methods         delet
*/

Router.delete("/delet/book/:isbn/:pubId", (req, res) => {
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
          message: "hey this is running",
          publication: database.publications,
          books: database.books,
       });
});



module.exports = Router;