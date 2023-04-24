// Data Structures. The Book Object will have 4 keys.
import "./styles.css";

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
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

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

    console.log(userName, "has signed in");
  } else {
    console.log("no user");
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
      pagesInputElement.value
    ).then(() => {
      bookFormElement.reset();
      modalElement.style.display = "none";
    });
  }
};

// 2.2 Sends book to the collection
async function saveBook(author, title, pages) {
  // Add a new book entry to the Firebase database.
  try {
    await addDoc(collection(getFirestore(), "books"), {
      author: author,
      title: title,
      pages: pages,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error writing new book to Firebase Database", error);
  }
}

// Loads books and listens for upcoming ones.
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
        // deleteBook(change.doc.id);
        console.log("this what happens when i delete book");
      } else {
        const book = change.doc.data();
        displayBook(
          change.doc.id,
          book.author,
          book.title,
          book.pages,
          book.timestamp
        );
      }
    });
  });
}
const displayBook = (id, author, title, pages, timestamp) => {
  //Editing an existing book based on book id || Creating a new book
  const bookDiv =
    document.getElementById(id) || createAndInsertBook(id, timestamp);

  const bookAuthor = bookDiv.querySelector(".book-author");
  const bookTitle = bookDiv.querySelector(".book-title");
  const bookPages = bookDiv.querySelector(".book-pages");
  const addedAt = bookDiv.querySelector(".book-timestamp");

  bookAuthor.textContent = `Written by ${author}`;
  bookTitle.textContent = title;
  bookPages.textContent = `${pages} pages`;
  addedAt.textContent = `Added at ${timestamp.toDate().toTimeString()}`;
  // to add : remove and edit button
};

// Template for messages.
const BOOK_TEMPLATE =
  '<div class="book">' +
  '<div class="book-title"></div>' +
  '<div class="book-author"></div>' +
  '<div class="book-pages"></div>' +
  '<div class="book-timestamp"></div>' +
  '<div class="book-buttons-wrapper">'+
  '<button class="status">Read/Not Read</button>' +
  '<button class="remove-book">Remove</button>' +
  '</div>' +
  "</div>";

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
    let messageListNode = existingBooks[0];

    while (messageListNode) {
      const messageListNodeTime = messageListNode.getAttribute("timestamp");

      if (!messageListNodeTime) {
        throw new Error(
          `Child ${messageListNode.id} has no 'timestamp' attribute`
        );
      }

      if (messageListNodeTime < timestamp) {
        break;
      }

      messageListNode = messageListNode.nextSibling;
    }

    librarySpaceElement.insertBefore(div, messageListNode);
  }

  return div;
};
// Shortcuts to DOM Elements.
const signInButtonElement = document.getElementById("sign-in");
const signOutButtonElement = document.getElementById("sign-out");
const userNameElement = document.getElementById("user-name");
const userPicElement = document.getElementById("user-pic");
const userContentContainer = document.querySelector(".content-container");
const authInfoPanel = document.querySelector(".auth-info-panel");
const authorInputElement = document.getElementById("author");
const titleInputElement = document.getElementById("title");
const pagesInputElement = document.getElementById("pages");
const bookFormElement = document.getElementById("book-form");
const openModalElement = document.getElementById("open-modal");
const closeModalElement = document.getElementById("close-modal");
const modalElement = document.getElementById("modal");
const librarySpaceElement = document.getElementById("library-space");

// Event Listeners
signOutButtonElement.addEventListener("click", signOutUser);
signInButtonElement.addEventListener("click", signIn);
bookFormElement.addEventListener("submit", onBookFormSubmit);
openModalElement.onclick = () => {
  modalElement.style.display = "block";
};
closeModalElement.onclick = () => {
  modalElement.style.display = "none";
};
// Initialize Firebase
// Retrieve my config.
const firebaseConfig = getFirebaseConfig();
initializeApp(firebaseConfig);
initFirebaseAuth();
loadBooks();
