/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("// Data Structures. The Book Object will have 4 keys. \n//new book_name = new Book(a,b,c,d); = new instance of book \nclass Book {\n    constructor(\n        title = 'Unknown',\n        author = 'Unknown',\n        pages = '0',\n        status = false\n      ) {\n        this.title = title\n        this.author = author\n        this.pages = pages\n        this.status = status\n      }\n} \n\n// library object will create an array of books, \n//but i will call a method of the object \"library\" to push a new book into the array\nclass Library {\n    constructor(){\n    this.books = []\n    }\n\n    addBook(newBook){\n        if(!this.isInLibrary(newBook)){ //if false, add book to library constructor\n            this.books.push(newBook);\n        }\n    }\n    \n    removeBook(title){\n        this.books = this.books.filter((book)=> book.title !== title)\n    } // makes a new array of all books except the one removed.\n\n    isInLibrary(newBook){\n    return this.books.some((book) => book.title === newBook.title); //returns true if new book is in library\n    }\n}\n\nlet myLibrary = new Library();\n\n//test books\nconst book1 = new Book('Under the Pyramids','H.P. Lovecraft',263, true);\nconst book2 = new Book('Crabwalk','Günter Grass',223, false);\nmyLibrary.addBook(book1);\nmyLibrary.addBook(book2);\ndisplayLibrary();\n\n// DOM - MAKING CARDS \nfunction makeCard(item){\n    const librarySpace = document.querySelector(\".library-space\"); //where the cards will fit\n\n    const cardDiv = document.createElement('div');\n    const bookTitle = document.createElement('div');\n    const bookAuthor = document.createElement('div');\n    const bookPages = document.createElement('div');\n    const bookStatus = document.createElement('button');\n    const bookRemoveBtn = document.createElement('button');\n\n    //full card\n    cardDiv.classList.add('book');   \n    cardDiv.setAttribute('id', myLibrary.books.indexOf(item));\n\n    // card elements\n    bookTitle.textContent = item.title;\n    bookTitle.classList.add('book-title');\n    \n    bookAuthor.textContent = `Written by ${item.author}`;\n    bookAuthor.classList.add('book-author');\n\n    bookPages.textContent = `${item.pages} pages`;\n    bookPages.classList.add('book-pages');\n\n    bookStatus.classList.add('status');\n    if (item.status) {\n        bookStatus.textContent = 'Read';\n        bookStatus.style.backgroundColor = 'green';\n        bookStatus.style.borderLeft = \"solid 8px green\";\n    }\n    else {\n        bookStatus.textContent = 'Not Read Yet';\n        bookStatus.style.backgroundColor = 'red';\n        bookStatus.style.borderLeft = \"solid 8px red\";\n    }\n\n    bookRemoveBtn.textContent = 'Remove';\n    bookRemoveBtn.classList.add('remove-book');\n\n    //appending \n    librarySpace.appendChild(cardDiv);\n    // cardDiv.appendChild(bookTitle,bookAuthor,bookPages,bookStatus,bookRemoveBtn);\n    cardDiv.append(bookTitle,bookAuthor,bookPages,bookStatus,bookRemoveBtn);\n\n\n    //buttons functionality\n    bookStatus.addEventListener('click',() =>{\n        item.status = !item.status;\n        displayLibrary();\n    })\n    bookRemoveBtn.addEventListener('click',()=>{\n        myLibrary.removeBook(cardDiv.firstChild.innerText);\n        displayLibrary();\n    })\n}\n\n// DOM - DISPLAY THE CARDS\nfunction displayLibrary(){\n    const librarySpace = document.querySelector(\".library-space\");\n    const allCards = document.querySelectorAll('.book');\n\n    allCards.forEach(card => librarySpace.removeChild(card))\n    for (let i = 0; i <= myLibrary.books.length-1;i++){\n        makeCard(myLibrary.books[i]);\n    }\n}\n\n// INTERACT WITH THE FORM\nconst libraryForm = document.querySelector('.library-form');\n\nlibraryForm.addEventListener('submit', (e)=> {\n    e.preventDefault();\n    \n    const title = document.getElementById('title').value;\n    const author = document.getElementById('author').value;\n    const pages = document.getElementById('pages').value;\n    const status = document.getElementById('status').checked;\n    const newBook = new Book(title,author,pages,status);\n\n    if (!myLibrary.isInLibrary(newBook)) {\n        myLibrary.addBook(newBook);\n        clearInput();\n        displayLibrary();\n      }\n    else { \n        alert('This book already exists in your library');\n        clearInput();\n        return;\n    }\n\n})\n\n //refresh user inputs \n function clearInput(){\n    document.querySelector('#title').value = '';\n    document.querySelector('#author').value = '';\n    document.querySelector('#pages').value = '';\n    document.querySelector('#status').checked = false;\n}\n// clean inputs button\nconst clearBtn = document.querySelector('.clear-inputs');\nclearBtn.addEventListener('click', (e) => { \n   e.preventDefault();\n    clearInput();\n });\n\n\n\n//# sourceURL=webpack://library/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;