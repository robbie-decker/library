let myLibrary = [];

function Book(title, author, pages){
    this.title = title;
    this.author = author;
    this.pages = pages;
}

function addBookToLibary(title, author, pages){
    newBook = new Book(title, author, pages);
    myLibrary.push(newBook);
}

function createCard(book){
    const shelf = document.getElementById("books");
    const bookInfo = document.createElement('div');
    const authorInfo = document.createElement('p');
    const titleInfo = document.createElement('p');
    const pagesInfo = document.createElement('p');

    titleInfo.textContent = book.title;
    authorInfo.textContent = book.author;
    pagesInfo.textContent = book.pages;
    bookInfo.append(titleInfo, authorInfo, pagesInfo);
    shelf.appendChild(bookInfo);
}

function displayBooks(){
    for(book of myLibrary){
        console.log(book);
        createCard(book);
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
displayBooks();