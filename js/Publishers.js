//Reading Data From Local Storage
function readData()
{
    let booksCollection;
    const booksInStorage = localStorage.getItem("Books");
    if (booksInStorage) 
        booksCollection = JSON.parse(booksInStorage);
    return booksCollection;
}

//Deleting a Publisher
function deletePublisher(index)
{
    const books=readData();
    const publisher=books[index].Publisher;
    const newBooks=books.filter((book) =>  book.Publisher!=publisher );
    alert("Publisher Successfully Deleted!");
    localStorage.setItem("Books",  JSON.stringify(newBooks));
    window.location.reload();
} 
//Counting Publisher's Books
const count_publisher=((publisher,books)=>books.filter((book) => book.Publisher==publisher).length);

// Retreiving all Publishers
function fetchPublishers()
{
    const publishersLookUp = [];
    const booksFromStorage=readData();
    const publishersData=document.getElementById('data-publishers');
    const publishersCount=document.getElementById('publishersTotal');
    let count=0;

    booksFromStorage.map(function(books,index) {
        const publisher=books["Publisher"];
        if(publishersLookUp.indexOf(publisher)==-1)
        {   
            count++;
            publishersLookUp.push(publisher);
            publishersData.innerHTML+=`
            <div class="publishers data width">
            <div class="display columns details">
                <div>
                    <h2 class="gray">${books["Publisher"]}</h2>
                    <h3 onclick="deletePublisher(${index})"class="glyphicon glyphicon-trash lightgray"> </h3>
                </div>
                <br>
                <p class="glyphicon glyphicon-book lightgray"> 
                    <span>${count_publisher(books["Publisher"],booksFromStorage)}</span>
                </p>
            </div>
        </div>`;
    }
            
    });
    publishersCount.innerHTML=`${count} - Publishers`;
}