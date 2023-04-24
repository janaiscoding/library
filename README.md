<h1> Jana's Library </h1>

## Project's Scope

- The scope of this project was to implement **backend** interaction through **Firebase**.
- In this app, you can Authenticate with your Google Account and Add/Remove/Edit your books in your Library.

## Live Demo

![](/dist/assets/firebase-library-preview.gif)

- Live preview on [GitHub Hosting](https://janaiscoding.github.io/library/) or on [Firebase's Hosting](https://jana-s-library.web.app/).

## Getting Started

### Installing and running

```
git clone https://github.com/janaiscoding/library.git
cd library
npm install
npm run build
```

## Project Description and Personal Notes

### Version 3 of the project: Refactor for Firebase BaaS interaction.

- Following Firebase's documentation, I have implemented **Firebase Authentication** and **Cloud Storage** to this project.
- You can now sign up with your Google account, and store your books to the **database**.
- On top of the previous book attributes, now you can also edit your book and update it in real time.
- Each book has a **serverTimestamp** field now, which helps in displaying the books based on the most recently added or edited book.

### Version 2 of the project: Refactor using classes:

- Initially I was stuck on this refactoring for a while, until I read and reread how classes work a bunch of times and finally understood how I can work with the arrays and objects within a class.
- After it clicked, all I had to do was rewrite the functions so that I call and return the correct parameters.

### Version 1 of the project:

- In this project, I understood how to create an object constructor, access and iterate objects inside an array and manipulate the objects inside the array after they have been declared. </br>
- I also gained a better understanding of event listeners & DOM Manipulation with Objects. </br>
- Form Validation Constraints and Preventing default on submit button. </br>

<h1> Built with </h1>

<h3> Technologies </h3>

- VanillaJS
- CSS3
- HTML5

<h3> Tools </h3>

- BaaS: Firebase
- webpack
- VS Code
- Linux Terminal
- Git and Github

### Future plans for this project

- Better styling and mobile responsiveness

<h3> Project Details</h3>

- This project is part of The Odin Project's [curriculum](https://www.theodinproject.com/lessons/node-path-javascript-library)
- I have reused one of my previous project's HTML & CSS stylings and format: [Admin Dashboard](https://github.com/janaiscoding/admin-dashboard)
- Step 3 of the project is part of The Odin Project's lesson [Using BaaS For Your Back End](https://www.theodinproject.com/lessons/javascript-using-baas-for-your-back-end).
