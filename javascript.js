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

//loop and display everything that was given
function displayBooks(){
for (const book of myLibrary){
    console.table(book);
}
}

//refresh user inputs 
function clearInput(){
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
}

// store user inputs and add them to the library
const addBookBtn = document.querySelector('.add-book');
addBookBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const givenTitle = document.querySelector('#title').value;
    const givenAuthor = document.querySelector('#author').value;
    addBookToLibrary(givenTitle,givenAuthor);
    clearInput();
})

// clean inputs button
const clearBtn = document.querySelector('.clear-inputs');
clearBtn.addEventListener('click', (e) => { 
    e.preventDefault();
    clearInput();
});

// display all the books
const showLibrary = document.querySelector('.show-library');
showLibrary.addEventListener ('click', (e) => { 
    e.preventDefault();
    displayBooks();
});