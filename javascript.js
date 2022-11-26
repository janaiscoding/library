let myLibrary = [];
let headers = ["title", "author"];
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
let box = document.getElementById("box");
function displayLibrary(){
// Get rid of the prior table (if it exists)
if(document.getElementById("libraryTable")){
    document.getElementById("libraryTable").remove();
  }

  let tbl = document.createElement("table");
  tbl.id = "libraryTable";

  for (i = 0; i < myLibrary.length; i++) {
    let row = document.createElement("tr");
    //looping the headers' elements to create all the cells
    headers.forEach(function(header, index){
        let cell = document.createElement("td");
        cell.textContent = myLibrary[i][header];
        cell.classList.add("data" + (index + 1));
        row.appendChild(cell); 
    });
      
    let deleteBtn = document.createElement("td");
        deleteBtn.textContent = "x";
        deleteBtn.classList.add("delete");
    
        deleteBtn.addEventListener("click", function(){
        myLibrary.splice(i, 1);  
        this.closest("tr").remove(); 
    });
      row.appendChild(deleteBtn); 
      tbl.appendChild(row);     
      box.appendChild(tbl);     
    }
}

// store user inputs and add them to the library
const addBookBtn = document.querySelector('.add-book');
addBookBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const givenTitle = document.querySelector('#title').value;
    const givenAuthor = document.querySelector('#author').value;
    addBookToLibrary(givenTitle,givenAuthor);
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
}