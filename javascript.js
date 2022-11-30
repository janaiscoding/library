let myLibrary = [
   {
    "title": 'Under the Pyramids',
    "author": 'H.P. Lovecraft',
    "pages": 263,
    "status": true
   },
   {
    "title": 'Crabwalk',
    "author": ' Günter Grass',
    "pages": 223,
    "status": false
   }
];

displayLibrary();

//object constructor
function Book(title, author, pages, status){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

// function to add book 
function addBookToLibrary(givenTitle,givenAuthor, givenPages, givenStatus) {
   myLibrary.push(new Book(givenTitle,givenAuthor, givenPages, givenStatus));
  }

function displayLibrary(){
    const librarySpace = document.querySelector(".library-space");
    const bookCards = document.querySelectorAll('.book');
    //replace the books divs with the library elements, everytime the function is called
    bookCards.forEach(book => librarySpace.removeChild(book));
    //iterating the array and creating each existing book
    for (let i = 0; i<= myLibrary.length-1; i++) {
        createBook(myLibrary[i]);
    }
}

//create book everytime the display function is called - using DOM
function createBook(item){
    const librarySpace = document.querySelector(".library-space");

    const publishedBook = document.createElement('div');
    const publishedTitle = document.createElement('div');
    const publishedAuthor = document.createElement('div');
    const publishedPages = document.createElement('div');
    const publishedStatus = document.createElement('button');
    const publishedRemoveBtn = document.createElement('button');

    publishedBook.classList.add('book');   
    publishedBook.setAttribute('id', myLibrary.indexOf(item));
    librarySpace.appendChild(publishedBook);

    publishedTitle.textContent = item.title;
    publishedTitle.classList.add('book-title');
    publishedBook.appendChild(publishedTitle);

    publishedAuthor.textContent = `Written by ${item.author}`;
    publishedAuthor.classList.add('book-author');
    publishedBook.appendChild(publishedAuthor);

    publishedPages.textContent = `${item.pages} pages`;
    publishedPages.classList.add('book-pages');
    publishedBook.appendChild(publishedPages);

    publishedStatus.classList.add('status');
    if (item.status === false ) {
        publishedStatus.textContent = 'Not Read Yet';
        publishedStatus.style.backgroundColor = 'red';
        publishedBook.style.borderLeft = "solid 8px red";
    }
    else {
        publishedStatus.textContent = 'Read';
        publishedStatus.style.backgroundColor = 'green';
        publishedBook.style.borderLeft = "solid 8px green";
    }
    publishedBook.appendChild(publishedStatus);

    //remove book 
    publishedRemoveBtn.textContent = 'Remove';
    publishedRemoveBtn.classList.add('remove-book');
    publishedRemoveBtn.addEventListener('click', () => {
        myLibrary.splice(myLibrary.indexOf(item),1);
        displayLibrary();
    });
    publishedBook.appendChild(publishedRemoveBtn);

    //toggle read/not-read button
    publishedStatus.addEventListener('click', () => {
        item.status = !item.status;
        displayLibrary();
    })
    
}

// store user inputs and add them to the library
const libraryForm = document.querySelector('.library-form');

libraryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const givenTitle = document.getElementById('title').value;
    const givenAuthor = document.getElementById('author').value;
    const givenPages = document.getElementById('pages').value;
    const givenStatus = document.getElementById('status').checked;
    addBookToLibrary(givenTitle,givenAuthor,givenPages,givenStatus);
    clearInput();
    displayLibrary();
})

// clean inputs button
const clearBtn = document.querySelector('.clear-inputs');
clearBtn.addEventListener('click', (e) => { 
   e.preventDefault();
    clearInput();
 });

//refresh user inputs 
function clearInput(){
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#pages').value = '';
    document.querySelector('#status').checked = false;
}