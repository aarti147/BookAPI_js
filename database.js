const books = [{
    ISBN: "12345Book",
    title: "Getting started with MERN",
    pubDate: "2021-07-07",
    language: "en",
    numPage: 250,
    publications: [1],
    author: [1,2],
    category: ["tech","programming","education","thriller"],
},
];
const author = [{
    id: 1,
    name: "Aarti",
    books:["12345Book"],
},
{   id:2,
    name:"Elon Musk",
    books:["12345Book"],

},
];
const publication = [
{   id: 1,
    name:"writex",
    books:["12345Book"],
},
{
      id: 2,
      name:"vickey",
      books:[],
   
},
];

 module.exports = { books, author, publication };