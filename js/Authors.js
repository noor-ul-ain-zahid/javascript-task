//Reading Data from LocalStorage
function readData()
{
    let booksCollection;
    const booksInStorage = localStorage.getItem("Books");
    if (booksInStorage) 
        booksCollection = JSON.parse(booksInStorage);
    return booksCollection;
}

//Deleting Author
function deleteAuthor(index)
{
    const books=readData();
    const author=books[index].Author;
    const newBooks=books.filter((book) =>  book.Author!=author );
    alert("Author Successfully Deleted!");
    localStorage.setItem("Books",  JSON.stringify(newBooks));
    window.location.reload();
}

//Counting Books by Authors
const count_author=((author,books)=>books.filter((book) =>book.Author==author).length);

//Retrieving all Authors 
function fetchAuthors()
{
    const authorsLookUp = [];
    const booksFromStorage=readData();
    const authorsData=document.getElementById('data-authors');
    const authorsCount=document.getElementById('authorsTotal');
    let count=0;
    
    // For Distinct authors
    booksFromStorage.map(function(books,index) {
        const author=books["Author"];
        if(authorsLookUp.indexOf(author)==-1)
        {
            authorsLookUp.push(author);
            count++;
            authorsData.innerHTML+=`
            <div class="authors data width">
            <div class="display columns details">
                <div>
                    <h2 class="gray">${books["Author"]}</h2>
                    <h3 onclick="deleteAuthor(${index})"class="glyphicon glyphicon-trash lightgray"> </h3>
                </div>
                <br>
                <p class="glyphicon glyphicon-book lightgray"> 
                    <span>${count_author(books["Author"],booksFromStorage)}</span>
                </p>
            </div>
        </div>`;
        }
            
    });
    authorsCount.innerHTML=`${count} - Authors`;
}