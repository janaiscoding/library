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

//First step: Authentification

// Sign in the user - returns a promise
async function signIn() {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(getAuth(), provider);
}

// Sign out the user
function signOutUser() {
  signOut(getAuth());
}

// Initialize firebase auth
function initFirebaseAuth() {
  // Listen to auth state changes.
  onAuthStateChanged(getAuth(), authStateObserver);
}

// Returns the signed-in user's profile Pic URL.
function getProfilePicUrl() {
  return getAuth().currentUser.photoURL || "/images/profile_placeholder.png";
}
// Returns the signed-in user's display name.
function getUserName() {
  return getAuth().currentUser.displayName;
}

// Returns true if a user is signed-in.
function isUserSignedIn() {
  return !!getAuth().currentUser;
}

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
    // Show user content
    userContentContainer.style.display = "grid";
    // Hide sign-in button and auth info pannel.
    signInButtonElement.setAttribute("hidden", "true");
    authInfoPanel.setAttribute("hidden", "true");

    console.log("this works");
  } else {
    console.log("no user");
    // Hide user's profile and sign-out button.
    userNameElement.setAttribute("hidden", "true");
    userPicElement.setAttribute("hidden", "true");
    signOutButtonElement.setAttribute("hidden", "true");
    // Hide user content
    userContentContainer.style.display = "none";
    // Show sign-in button and auth info panel.
    signInButtonElement.removeAttribute("hidden");
    authInfoPanel.removeAttribute("hidden");
  }
}

// Adds a size to Google Profile pics URLs.
function addSizeToGoogleProfilePic(url) {
  if (url.indexOf("googleusercontent.com") !== -1 && url.indexOf("?") === -1) {
    return url + "?sz=150";
  }
  return url;
}

// Shortcuts to DOM Elements.
const signInButtonElement = document.getElementById("sign-in");
const signOutButtonElement = document.getElementById("sign-out");
const userNameElement = document.getElementById("user-name");
const userPicElement = document.getElementById("user-pic");
const userContentContainer = document.querySelector(".content-container");
const authInfoPanel = document.querySelector(".auth-info-panel");
// Event Listeners
signOutButtonElement.addEventListener("click", signOutUser);
signInButtonElement.addEventListener("click", signIn);

// Initialize Firebase
// Retrieve my config.
const firebaseConfig = getFirebaseConfig();
initializeApp(firebaseConfig);
initFirebaseAuth();
// loadBooks()
