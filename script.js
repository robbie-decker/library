let myLibrary = [];
const shelf = document.getElementById("books");

function Book(title, author, pages){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = false;
}

Book.prototype.changeReadStatus = function(){
    this.readStatus = !this.readStatus;
    console.log(this.readStatus);
}

function addBookToLibrary(title, author, pages){
    newBook = new Book(title, author, pages);
    myLibrary.push(newBook);
    displayBooks();
}

function createCard(book, i){
    // Make the elements that make up the book
    const bookCard = document.createElement('div'); 
    const authorInfo = document.createElement('p');
    const titleInfo = document.createElement('p');
    const pagesInfo = document.createElement('p');
    const removeBook = document.createElement('button');
    const readStatus = document.createElement('input');
    readStatus.setAttribute('type', 'checkbox');
    // bookCard.dataset.index = i;

    // Remove book from the array and rerender
    removeBook.addEventListener('click', () => {
        myLibrary.splice(i, 1);
        displayBooks();
    });

    readStatus.addEventListener('change', () =>{
        book.changeReadStatus();
    });


    titleInfo.textContent = book.title;
    authorInfo.textContent = book.author;
    pagesInfo.textContent = book.pages;
    removeBook.textContent = "REMOVE";
    bookCard.classList.add("card");

    bookCard.append(titleInfo, authorInfo, pagesInfo, removeBook, readStatus);
    shelf.appendChild(bookCard);
}

function displayBooks(){
    shelf.replaceChildren();
    for(const [i, book] of myLibrary.entries()){
        createCard(book, i);
    }
}

const bookForm = document.getElementById("bookForm");
// Get inputs
let title = document.getElementById("title")
let author = document.getElementById("author")
let pages = document.getElementById("pages")
bookForm.addEventListener('submit', (e) =>{
    // Prevents page refresh on submit
    e.preventDefault();

    let inputsValidationError = [];
    inputsValidationError.push(handleValidation('title', 'title-error', 'I require a title!'));
    inputsValidationError.push(handleValidation('author', 'author-error', 'I require an author!'));
    inputsValidationError.push(handleValidation('pages', 'pages-error', 'I require a valid # of pages!'));

    // No errors so add book
    console.log(inputsValidationError);
    if(!inputsValidationError.includes(true)){
        addBookToLibrary(title.value, author.value, pages.value);
    }
});

// Add event handlers for inputs
title.addEventListener("input", () => {
    handleValidation('title', 'title-error', 'I require a title!');
});
author.addEventListener("input", () => {
    handleValidation('author', 'author-error', 'I require an author!');
});
pages.addEventListener("input", () => {
    handleValidation('pages', 'pages-error', 'I require a valid # of pages!');
});


// Returns true if found error
// Returns false if no error
function handleValidation(inputId, errorContainerId, errorMessage) {
    const input = document.getElementById(inputId);
    console.log(input);
    console.log(input.validity.typeMismatch)
    const errorContainer = document.getElementById(errorContainerId);
    // Need to check for .badInput because Firefox is weird
    if (input.validity.valueMissing || input.validity.typeMismatch || input.validity.badInput) {
        errorContainer.textContent = errorMessage;
        input.classList.add('invalid-input');
        return true
    } else {
        errorContainer.textContent = '';
        input.classList.remove('invalid-input');
        return false
    }
}

addBookToLibrary("Romeo and Juliet", "William Shakespear", 225);
addBookToLibrary("Player Piano", "Kurt Vonnegut", 336);
