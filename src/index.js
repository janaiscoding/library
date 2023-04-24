// Data Structures. The Book Object will have 4 keys.
import "./styles.css";
//new book_name = new Book(a,b,c,d); = new instance of book
class Book {
  constructor(
    title = "Unknown",
    author = "Unknown",
    pages = "0",
    status = false
  ) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }
}

// library object will create an array of books,
//but i will call a method of the object "library" to push a new book into the array
class Library {
  constructor() {
    this.books = [];
  }

  addBook(newBook) {
    if (!this.isInLibrary(newBook)) {
      //if false, add book to library constructor
      this.books.push(newBook);
    }
  }

  removeBook(title) {
    this.books = this.books.filter((book) => book.title !== title);
  } // makes a new array of all books except the one removed.

  isInLibrary(newBook) {
    return this.books.some((book) => book.title === newBook.title); //returns true if new book is in library
  }
}

let myLibrary = new Library();

//test books
const book1 = new Book("Under the Pyramids", "H.P. Lovecraft", 263, true);
const book2 = new Book("Crabwalk", "Günter Grass", 223, false);
myLibrary.addBook(book1);
myLibrary.addBook(book2);
displayLibrary();

// DOM - MAKING CARDS
function makeCard(item) {
  const librarySpace = document.querySelector(".library-space"); //where the cards will fit

  const cardDiv = document.createElement("div");
  const bookTitle = document.createElement("div");
  const bookAuthor = document.createElement("div");
  const bookPages = document.createElement("div");
  const bookStatus = document.createElement("button");
  const bookRemoveBtn = document.createElement("button");

  //full card
  cardDiv.classList.add("book");
  cardDiv.setAttribute("id", myLibrary.books.indexOf(item));

  // card elements
  bookTitle.textContent = item.title;
  bookTitle.classList.add("book-title");

  bookAuthor.textContent = `Written by ${item.author}`;
  bookAuthor.classList.add("book-author");

  bookPages.textContent = `${item.pages} pages`;
  bookPages.classList.add("book-pages");

  bookStatus.classList.add("status");
  if (item.status) {
    bookStatus.textContent = "Read";
    bookStatus.style.backgroundColor = "green";
    bookStatus.style.borderLeft = "solid 8px green";
  } else {
    bookStatus.textContent = "Not Read Yet";
    bookStatus.style.backgroundColor = "red";
    bookStatus.style.borderLeft = "solid 8px red";
  }

  bookRemoveBtn.textContent = "Remove";
  bookRemoveBtn.classList.add("remove-book");

  //appending
  librarySpace.appendChild(cardDiv);
  // cardDiv.appendChild(bookTitle,bookAuthor,bookPages,bookStatus,bookRemoveBtn);
  cardDiv.append(bookTitle, bookAuthor, bookPages, bookStatus, bookRemoveBtn);

  //buttons functionality
  bookStatus.addEventListener("click", () => {
    item.status = !item.status;
    displayLibrary();
  });
  bookRemoveBtn.addEventListener("click", () => {
    myLibrary.removeBook(cardDiv.firstChild.innerText);
    displayLibrary();
  });
}

// DOM - DISPLAY THE CARDS
function displayLibrary() {
  const librarySpace = document.querySelector(".library-space");
  const allCards = document.querySelectorAll(".book");

  allCards.forEach((card) => librarySpace.removeChild(card));
  for (let i = 0; i <= myLibrary.books.length - 1; i++) {
    makeCard(myLibrary.books[i]);
  }
}

// INTERACT WITH THE FORM
const libraryForm = document.querySelector(".library-form");

libraryForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const status = document.getElementById("status").checked;
  const newBook = new Book(title, author, pages, status);

  if (!myLibrary.isInLibrary(newBook)) {
    myLibrary.addBook(newBook);
    clearInput();
    displayLibrary();
  } else {
    alert("This book already exists in your library");
    clearInput();
    return;
  }
});

//refresh user inputs
function clearInput() {
  document.querySelector("#title").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#pages").value = "";
  document.querySelector("#status").checked = false;
}
// clean inputs button
const clearBtn = document.querySelector(".clear-inputs");
clearBtn.addEventListener("click", (e) => {
  e.preventDefault();
  clearInput();
});

/// FIREBASE CONVERSION
import { getFirebaseConfig } from "./firebase-config";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

// my config
const firebaseConfig = getFirebaseConfig();

//AUTHENTIFICATION

// SIGN IN
async function signIn() {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(getAuth(), provider);
}

// SIGN OUT
function signOutUser() {
  signOut(getAuth());
}

// init firebase app
initializeApp(firebaseConfig);
