let myLibrary = [];

//constructor
function Book(title, author){
    this.title = title;
    this.author = author;
}

// function to add book 
function addBookToLibrary(givenTitle,givenAuthor) {
   const givenBook = new Book(givenTitle,givenAuthor);
   myLibrary.push(givenBook);
  }

//testing books 
addBookToLibrary('a','b')
addBookToLibrary('c','d')
addBookToLibrary('e','f')

for (const book of myLibrary){
    console.table(book);
}