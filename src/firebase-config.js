const config = {
  apiKey: "AIzaSyDRfBp2wqEx7imMzufht0Mb1C9FNUiRWKI",
  authDomain: "jana-s-library.firebaseapp.com",
  projectId: "jana-s-library",
  storageBucket: "jana-s-library.appspot.com",
  messagingSenderId: "924456884420",
  appId: "1:924456884420:web:b479449930a31e122f5191",
};

export function getFirebaseConfig() {
  if (!config || !config.apiKey) {
    throw new Error(
      "No Firebase configuration object provided." +
        "\n" +
        "Add your web app's configuration object to firebase-config.js"
    );
  } else {
    return config;
  }
}
