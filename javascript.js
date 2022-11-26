let myLibrary = [];
let tableData = ["title", "author", "pages", "status"];

//constructor
function Book(title, author, pages, status){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

// function to add book 
function addBookToLibrary(givenTitle,givenAuthor, givenPages, givenStatus) {
   const givenBook = new Book(givenTitle,givenAuthor, givenPages, givenStatus);
   myLibrary.push(givenBook);
  }

//loop and display everything that was given
let librarySpace = document.getElementById("library-space");

function displayLibrary(){
// Get rid of the prior table (if it exists)
if(document.getElementById("libraryTable")){
    document.getElementById("libraryTable").remove();
  }

  let libraryTable = document.createElement("table");
  libraryTable.id = "libraryTable";

  for (i = 0; i < myLibrary.length; i++) {
    let dataRow = document.createElement("tr");
    //looping the headers' elements to create all the cells
    tableData.forEach(function(header, index){
        let dataCell = document.createElement("td");
        dataCell.textContent = myLibrary[i][header];
        dataCell.classList.add("data" + (index + 1));
        dataRow.appendChild(dataCell); 
    });
      
    let deleteBtn = document.createElement("td");
        deleteBtn.textContent = "x";
        deleteBtn.classList.add("delete");
    
        deleteBtn.addEventListener("click", function(){
        myLibrary.splice(i, 1);  
        this.closest("tr").remove(); 
    });
        dataRow.appendChild(deleteBtn); 
        libraryTable.appendChild(dataRow);     
        librarySpace.appendChild(libraryTable);     
    }
}

// store user inputs and add them to the library
const addBookBtn = document.querySelector('.add-book');
addBookBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const givenTitle = document.querySelector('#title').value;
    const givenAuthor = document.querySelector('#author').value;
    const givenPages = document.querySelector('#pages').value;
    const givenStatus = document.querySelector('#status').value;
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
}