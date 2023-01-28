// Data Structures
class Book {
    constructor(
        title = 'Unknown',
        author = 'Unknown',
        pages = '0',
        status = false
      ) {
        this.title = title
        this.author = author
        this.pages = pages
        this.status = status
      }
} 

class Library {
    constructor(){
        this.books = []
    }

    addBook(newBook){
        if(!this.isInLibrary(newBook)){ //if false, add book to library constructor
            this.books.push(newBook);
        }
    }
    
    removeBook(title){
        this.books = this.books.filter((book)=> book.title !== title)
    } // makes a new array of all books except the one removed.

    isInLibrary(newBook){
    return this.books.some((book) => book.title === newBook.title); //returns true if new book is in library
    }
}
    const library = new Library();
    const book1 = new Book('Under the Pyramids','H.P. Lovecraft',263, true);
    const book2 = new Book('Crabwalk','Günter Grass',223, false);
    library.addBook(book1);
    library.addBook(book2);

    //ui elements 
    const librarySpace = document.querySelector(".library-space");
    const addBookBtn = document.querySelector('.add-book');
    const clearBtn = document.querySelector('.clear-inputs');
    const bookCards = document.querySelectorAll('.book');

    //clear form button and reset current inputs to default
    clearBtn.addEventListener('click', (e) => { 
        e.preventDefault();
         clearInput();
      });
    const clearInput = () => {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#pages').value = '';
        document.querySelector('#status').checked = false;
    }

    const updateLibrary = () => {
        clearInput();
        resetLibrarySpace();
        for (let book of library.books) {
            createBookCard(book);
        }
    }

    const resetLibrarySpace = () => {
        librarySpace.innerHTML = '';
    }

    // make one new book card, function will be used everytime we update the library space
    const createBookCard = (newBook) => {

    const librarySpace = document.querySelector(".library-space");

    const bookCard = document.createElement('div');
    const title = document.createElement('div');
    const author = document.createElement('div');
    const pages = document.createElement('div');
    const statusBtn = document.createElement('button');
    const removeBtn = document.createElement('button');

    bookCard.classList.add('book');   
    title.classList.add('book-title');
    author.classList.add('book-author');
    pages.classList.add('book-pages');
    statusBtn.classList.add('status');
    removeBtn.classList.add('remove-book');

    title.textContent = newBook.title;
    author.textContent = `Written by ${newBook.author}`;
    pages.textContent = `${newBook.pages} pages`;
    removeBtn.textContent = 'Remove';
   
    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    bookCard.appendChild(statusBtn);
    bookCard.appendChild(removeBtn);
    librarySpace.appendChild(bookCard);

    //check status
    if (newBook.status) {
        statusBtn.textContent = 'Read';
        statusBtn.style.backgroundColor = 'green';
        bookCard.style.borderLeft = "solid 8px green";
    }
    else {
        statusBtn.textContent = 'Not Read Yet';
        statusBtn.style.backgroundColor = 'red';
        bookCard.style.borderLeft = "solid 8px red";
    }
    statusBtn.addEventListener('click', () => {
        newBook.status = !newBook.status;
        updateLibrary();
    })
    removeBtn.addEventListener('click',()=> {
        library.removeBook(newBook);
        updateLibrary();
    })
   
}
    //store and return new book from user inputs 
    const getBookFromInput = () => {
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const pages = document.getElementById('pages').value;
        const status = document.getElementById('status').checked;
        return new Book(title,author,pages,status);
    }

    const addBook = (e) => {
        e.preventDefault();
        const newBook = getBookFromInput();

        if (library.isInLibrary(newBook)){
            errorMsg.textContent = 'This book already exists in your library';
            errorMsg.classList.add('active');
            return;
        }
        updateLibrary();
    }

    
    //click add, get book, check if it exists
    addBookBtn.onclick = addBook;

    updateLibrary();