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

function addBookToLibary(title, author, pages){
    newBook = new Book(title, author, pages);
    myLibrary.push(newBook);
    displayBooks();
}

function createCard(book, i){
    const bookCard = document.createElement('div'); 
    const authorInfo = document.createElement('p');
    const titleInfo = document.createElement('p');
    const pagesInfo = document.createElement('p');
    const removeBook = document.createElement('button');
    const readStatus = document.createElement('input');
    readStatus.setAttribute('type', 'checkbox');
    // bookCard.dataset.index = i;

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

const bookButton = document.getElementById("addBook");
bookButton.addEventListener('click', () =>{
    inputs = document.querySelectorAll('input[type="text"]');
    let title = inputs[0].value;
    let author = inputs[1].value; 
    let pages = inputs[2].value;
    addBookToLibary(title, author, pages);
});


addBookToLibary("Romeo and Juliet", "William Shakespear", 225);
addBookToLibary("Player Piano", "Kurt Vonnegut", 336);
