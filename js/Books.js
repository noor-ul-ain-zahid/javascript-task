//Getting All Data from storage i.e. If Books key exists it retrieves date else it sets one 
function readData() {
    let booksCollection = [];
    const booksInStorage = localStorage.getItem("Books");
    booksInStorage ? booksCollection = JSON.parse(booksInStorage) : setInLocalStorage(booksCollection);
    return booksCollection;
}

//Setting data to the storage if book is added, deleted or its details are updated
function setInLocalStorage(books) {
    localStorage.setItem("Books", JSON.stringify(books));
}

//To notify user that a book with this name already exists
function bookAlreadyExists(url) {
    alert("This Book Already Exists!");
    window.location.href = url;
}

/* 
For BOOKS ADDITION It checks if its first book to be added if not then check if book with the same name exists
if no match found save bookDetails else notify user
*/

//1. Books Addition
function addData() {
    const booksFromStorage = readData();
    let bookWithSameName = 0;

    //To check if a book with the same name exists
    if (booksFromStorage != null)
        bookWithSameName = booksFromStorage.filter((item) => item.Name == document.getElementById('BookName').value).length;

    (bookWithSameName == 0 || booksFromStorage == null) ? saveBookDetails(booksFromStorage)
        : bookAlreadyExists("../pages/add-book.html");
}

//2. Saving Book Details In Storage
function saveBookDetails(books) {
    books.push({
        "Name": document.getElementById('BookName').value,
        "Author": document.getElementById('Author').value,
        "Publisher": document.getElementById('Publisher').value,
        "Date": document.getElementById('Date').value
    });
    alert("Book Successfully Added!");
    setInLocalStorage(books);
    window.location.href = "../index.html";
}

//Deleting a book at an index
function deleteData(indexOfBook) {
    const books = readData();
    books.splice(indexOfBook, 1);
    setInLocalStorage(books);
    window.location.reload();
    alert("Book Successfully Deleted!");
}

/*
For Editing Book Details First I get the index of the book to be updated then retrieve data of that book
While making changes I do the same as I did while adding i.e. check if the book with new name already exists 
check if user updates anything but the name of the book.
*/
let update;

//To check two conditions that are mentioned above
const sameIndexData = ((bookName, books) => books.filter((book, index) => index === update &&
    book.Name == bookName).length);

const bookWithSameName = ((bookName, books) => books.filter((book) => book.Name == bookName).length);

//1. Setting Index to Update
function updateDataset(bookToBeUpdated) {
    localStorage.setItem("Update", JSON.stringify(bookToBeUpdated));
    window.location.href = "pages/update.html";
}
//2. Setting Fields data for editing
function updateSet() {

    //Index of Book 
    update = localStorage.getItem("Update");
    update = JSON.parse(update);

    //Reading Books Data from Storage
    const books = readData();

    // getting access to input fields in form
    book_name = document.getElementById('BookName');
    author = document.getElementById('Author');
    publisher = document.getElementById('Publisher');
    date = document.getElementById('Date');

    //Getting data against the book index
    const book = books.find((book, index) => index == update);

    //Setting current Values in Forms
    [book_name.value, author.value, publisher.value, date.value] = Object.values(book);

}
//3. Deciding if changes to be made or not
function updateData() {
    const books = readData();

    // Getting Data from Form
    const book = {
        "Name": document.getElementById('BookName').value,
        "Author": document.getElementById('Author').value,
        "Publisher": document.getElementById('Publisher').value,
        "Date": document.getElementById('Date').value
    };

    //If same Index Data is being updated
    const check = sameIndexData(book.Name, books);

    //To check if a book with the same name exists
    const count = bookWithSameName(book.Name, books);

    // If another book with the same name already exists
    (count == 0 || check == 1) ? updataDetailsInStorage(book, books) : bookAlreadyExists("../pages/update.html");

}

//4. Making Changes In Local Storage
function updataDetailsInStorage(newBook, books) {
    books.splice(update, 1, newBook);
    setInLocalStorage(books);
    window.location.href = "../index.html";
    updated();
}
function updated() {
    alert("Book Details Successfully Updated!");
}
//Fetching All Books Data and showing to the user
function fetchAll() {
    const booksFromStorage = readData();
    const booksData = document.getElementById('data');
    let count = 0;
    const authorsLookUp = [];
    const publishersLookUp = [];

    booksFromStorage.map(function (books, index) {
        booksData.innerHTML += `
            <div class="books data width">
                <div class="display columns details">
                    <div>
                        <h2 class="gray">${books["Name"]}</h2>
                        <h3 onclick="deleteData(${index})"class="glyphicon glyphicon-trash lightgray"> </h3>
                        <h3 onclick="updateDataset(${index})"class="glyphicon glyphicon-edit lightgray"> </h3>
                    </div>
                    <br>
                    <p class="glyphicon glyphicon-time lightgray"> 
                        <span>${books["Date"]}</span>
                    </p>
                    <p class="lightgray">Author:
                        <span class="icons">${books["Author"]}</span>
                    </p> 
                    <p class="lightgray">Publisher:
                        <span class="icons">${books["Publisher"]}</span>
                    </p>
                </div>
            </div>`;

        //Counting total books
        count++;

        //Counting authors
        const author = books["Author"];
        if (authorsLookUp.indexOf(author) == -1)
            authorsLookUp.push(author);

        //Counting Publishers
        const publisher = books["Publisher"];
        if (publishersLookUp.indexOf(publisher) == -1)
            publishersLookUp.push(publisher);
    });

    const booksCount = document.getElementById('booksTotal');
    const authorsCount = document.getElementById('authorsTotal');
    const publishersCount = document.getElementById('publishersTotal');
    booksCount.innerHTML = `${count} - Books`;
    authorsCount.innerHTML += authorsLookUp.length;
    publishersCount.innerHTML += publishersLookUp.length;
}