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
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  updateDoc,
  doc,
  serverTimestamp,
  deleteDoc,
} from "firebase/firestore";

//1. Authentification
// 1.1 Sign in the user - returns a promise
async function signIn() {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(getAuth(), provider);
}

// 1.2 Sign out the user
function signOutUser() {
  signOut(getAuth());
}

// 1.3 Initialize firebase auth
function initFirebaseAuth() {
  // Listen to auth state changes.
  onAuthStateChanged(getAuth(), authStateObserver);
}

// 1.4 Returns the signed-in user's profile Pic URL.
function getProfilePicUrl() {
  return getAuth().currentUser.photoURL || "/images/profile_placeholder.png";
}
// 1.5 Returns the signed-in user's display name.
function getUserName() {
  return getAuth().currentUser.displayName;
}

// 1.6 Returns true if a user is signed-in.
function isUserSignedIn() {
  return !!getAuth().currentUser;
}

// 1.7 What happens on auth state changes
function authStateObserver(user) {
  if (user) {
    // User is signed in
    const profilePicUrl = getProfilePicUrl();
    const userName = getUserName();

    // Set the user's profile pic and name.
    userPicElement.style.backgroundImage =
      "url(" + addSizeToGoogleProfilePic(profilePicUrl) + ")";
    userNameElement.textContent = userName;

    // Show the DOM elements
    userNameElement.removeAttribute("hidden");
    userPicElement.removeAttribute("hidden");
    signOutButtonElement.removeAttribute("hidden");
    openModalElement.removeAttribute("hidden");
    // Show user content
    userContentContainer.style.display = "flex";
    // Hide sign-in button and auth info pannel.
    signInButtonElement.setAttribute("hidden", "true");
    authInfoPanel.setAttribute("hidden", "true");
  } else {
    // Hide user's profile and sign-out button.
    userNameElement.setAttribute("hidden", "true");
    userPicElement.setAttribute("hidden", "true");
    signOutButtonElement.setAttribute("hidden", "true");
    openModalElement.setAttribute("hidden", "true");
    // Hide user content
    userContentContainer.style.display = "none";
    // Show sign-in button and auth info panel.
    signInButtonElement.removeAttribute("hidden");
    authInfoPanel.removeAttribute("hidden");
  }
}

// 1. 8 Adds a size to Google Profile pics URLs.
function addSizeToGoogleProfilePic(url) {
  if (url.indexOf("googleusercontent.com") !== -1 && url.indexOf("?") === -1) {
    return url + "?sz=150";
  }
  return url;
}
// 1.9  Returns true if user is signed-in. Otherwise false and displays a message.
function checkSignedInWithMessage() {
  // Return true if the user is signed in Firebase
  if (isUserSignedIn()) {
    return true;
  }
}

// 2 Handle the book submitting and retrieving

// 2.1 Book form submit = save book to database
const onBookFormSubmit = (e) => {
  e.preventDefault();
  if (
    authorInputElement.value &&
    titleInputElement.value &&
    pagesInputElement.value &&
    checkSignedInWithMessage()
  ) {
    saveBook(
      authorInputElement.value,
      titleInputElement.value,
      pagesInputElement.value,
      checkboxInputElement.checked
    ).then(() => {
      bookFormElement.reset();
      modalFormElement.style.display = "none";
    });
  }
};

const onEditBookSubmit = (id) => {
  if (
    authorEditElement.value &&
    titleEditElement.value &&
    pagesEditElement.value &&
    checkSignedInWithMessage()
  ) {
    updateBook(
      id,
      authorEditElement.value,
      titleEditElement.value,
      pagesEditElement.value,
      checkboxEditElement.checked
    );
  }
};
// 2.2 Sends book to the collection from the frontend
async function saveBook(author, title, pages, isRead) {
  // Add a new book entry to the Firebase database.
  try {
    await addDoc(collection(getFirestore(), "books"), {
      author: author,
      title: title,
      pages: pages,
      timestamp: serverTimestamp(),
      isRead: isRead,
    });
  } catch (error) {
    console.error("Error writing new book to Firebase Database", error);
  }
}

// 2.3 Loads books and listens for upcoming ones on the UI.
function loadBooks() {
  // Create the query to load the last 6 books and listen for new ones.
  const recentBooksQuery = query(
    collection(getFirestore(), "books"),
    orderBy("timestamp", "desc"),
    limit(6)
  );

  // Start listening to the query.
  onSnapshot(recentBooksQuery, function (snapshot) {
    snapshot.docChanges().forEach(function (change) {
      if (change.type === "removed") {
        deleteBook(change.doc.id);
      } else {
        const book = change.doc.data();
        displayBook(
          change.doc.id,
          book.author,
          book.title,
          book.pages,
          book.isRead,
          book.timestamp
        );
      }
    });
  });
}

// 2.4 Displays the book elements and the event listeners
const displayBook = (id, author, title, pages, isRead, timestamp) => {
  //Editing an existing book based on book id || Creating a new book
  const bookDiv =
    document.getElementById(id) || createAndInsertBook(id, timestamp);

  const bookAuthor = bookDiv.querySelector(".book-author");
  const bookTitle = bookDiv.querySelector(".book-title");
  const bookPages = bookDiv.querySelector(".book-pages");
  const removeButton = bookDiv.querySelector(".remove-book");
  const statusButton = bookDiv.querySelector(".status");
  const editButton = bookDiv.querySelector(".edit-book");

  bookAuthor.textContent = `Written by ${author}`;
  bookTitle.textContent = title;
  bookPages.textContent = `${pages} pages`;

  // Status based styling
  if (isRead) {
    statusButton.textContent = "Read";
    bookDiv.classList.remove("status-unread");
    bookDiv.classList.add("status-read");
  } else {
    statusButton.textContent = "Not Read";
    bookDiv.classList.remove("status-read");
    bookDiv.classList.add("status-unread");
  }

  // Event Listeners on singular books
  removeButton.addEventListener("click", () => {
    deleteBook(id);
  });
  statusButton.addEventListener("click", () => {
    isRead = !isRead;
    updateReadStatus(id, isRead);
  });
  // edit button?
  editButton.addEventListener("click", () => {
    // open the form with the book's data
    editModalElement.style.display = "block";
    receiveBookForm(id, author, title, pages, isRead);
    //
  });
};
// 2.5 Receives the current book's data in order to be edited
const receiveBookForm = (id, author, title, pages, isRead) => {
  bookIdHandlerElement.innerText = id;
  authorEditElement.value = author;
  titleEditElement.value = title;
  pagesEditElement.value = pages;
  checkboxEditElement.checked = isRead;
};
// 2.6 Receives the new data and updates the selected book
const updateBook = (id, author, title, pages, isRead) => {
  const db = getFirestore();
  const docRef = doc(db, "books", id);

  updateDoc(docRef, {
    author: author,
    title: title,
    pages: pages,
    isRead: isRead,
    timestamp: serverTimestamp(),
  }).then(() => {
    editBookFormElement.reset();
    editModalElement.style.display = "none";
  });
};
// 2.7 Function for deleting a certain book
const deleteBook = (id) => {
  const bookDiv = document.getElementById(id);
  const db = getFirestore();
  const docRef = doc(db, "books", id);
  deleteDoc(docRef);
  if (bookDiv) {
    bookDiv.parentNode.removeChild(bookDiv);
  }
};
// 2.8 Change a book's read status
const updateReadStatus = (id, isRead) => {
  const db = getFirestore();
  const docRef = doc(db, "books", id);
  updateDoc(docRef, {
    isRead: isRead,
  });
};
// 2.9 Template for book's html.
const BOOK_TEMPLATE =
  '<div class="book">' +
  '<div class="book-title"></div>' +
  '<div class="book-author"></div>' +
  '<div class="book-pages"></div>' +
  '<div class="book-buttons-wrapper">' +
  '<button class="status"></button>' +
  '<button class="edit-book">Edit</button>' +
  '<button class="remove-book">Remove</button>' +
  "</div>" +
  "</div>";

// 2.10  Creates the div and pushes them to the DOM
const createAndInsertBook = (id, timestamp) => {
  const container = document.createElement("div");
  container.innerHTML = BOOK_TEMPLATE;
  const div = container.firstChild;
  div.setAttribute("id", id); //setting the id, then i get it with the other function and complete it

  // If timestamp is null, assume we've gotten a brand new book.
  // https://stackoverflow.com/a/47781432/4816918
  timestamp = timestamp ? timestamp.toMillis() : Date.now();
  div.setAttribute("timestamp", timestamp);

  // figure out where to insert new message
  const existingBooks = librarySpaceElement.children;
  if (existingBooks.length === 0) {
    librarySpaceElement.appendChild(div); //if there's none, just push it in
  } else {
    let bookListNode = existingBooks[0];

    while (bookListNode) {
      const bookListNodeTime = bookListNode.getAttribute("timestamp");

      if (!bookListNodeTime) {
        throw new Error(
          `Child ${bookListNode.id} has no 'timestamp' attribute`
        );
      }

      if (bookListNodeTime < timestamp) {
        break;
      }

      bookListNode = bookListNode.nextSibling;
    }

    librarySpaceElement.insertBefore(div, bookListNode);
  }

  return div;
};

// Shortcuts to DOM Elements.

// User and Login Info
const signInButtonElement = document.getElementById("sign-in");
const signOutButtonElement = document.getElementById("sign-out");
const userNameElement = document.getElementById("user-name");
const userPicElement = document.getElementById("user-pic");
const userContentContainer = document.querySelector(".content-container");
const authInfoPanel = document.querySelector(".auth-info-panel");

// Main add book form
const authorInputElement = document.getElementById("author");
const titleInputElement = document.getElementById("title");
const pagesInputElement = document.getElementById("pages");
const checkboxInputElement = document.getElementById("status");
const bookFormElement = document.getElementById("book-form");
// Modal for normal form
const openModalElement = document.getElementById("open-modal");
const closeModalElement = document.getElementById("close-modal");
const modalFormElement = document.querySelector(".modal");

// Library content
const librarySpaceElement = document.getElementById("library-space");

// Edit book form
const bookIdHandlerElement = document.getElementById("edit-handler-id");
const authorEditElement = document.getElementById("edit-author");
const titleEditElement = document.getElementById("edit-title");
const pagesEditElement = document.getElementById("edit-pages");
const checkboxEditElement = document.getElementById("edit-status");
const editBookFormElement = document.getElementById("book-edit-form");

// Modal for edit book
const editModalElement = document.querySelector(".edit-modal");
const closeEditModalElement = document.getElementById("close-edit-modal");

// Event Listeners
signOutButtonElement.addEventListener("click", signOutUser);
signInButtonElement.addEventListener("click", signIn);
bookFormElement.addEventListener("submit", onBookFormSubmit);
editBookFormElement.addEventListener("submit", (e) => {
  e.preventDefault();
  const id = bookIdHandlerElement.innerText;
  onEditBookSubmit(id);
});

// Add Book - Form Modal
openModalElement.onclick = () => {
  modalFormElement.style.display = "block";
};
closeModalElement.onclick = () => {
  modalFormElement.style.display = "none";
};
// Edit Book - Form Modal
closeEditModalElement.onclick = () => {
  editModalElement.style.display = "none";
};
// Initialize Firebase

// Retrieve my config.
const firebaseConfig = getFirebaseConfig();
initializeApp(firebaseConfig);
initFirebaseAuth();
loadBooks();
