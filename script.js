const myLibrary = [];

// Book constructor with read status
function Book(title, author, page, read) {
    this.title = title;
    this.author = author;
    this.page = page;
    this.read = read; // Capture initial read status
}

// Method to toggle read status
Book.prototype.toggleReadStatus = function() {
    this.read = this.read === 'yes' ? 'not yet' : 'yes'; // Toggle between 'yes' and 'not yet'
};

// Function to display books in the library
function addBookToLibrary() {
    bookContainer.innerHTML = ""; // Clear existing books
    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        bookCard.setAttribute("data-index", index); // Store the index in a data attribute
        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.page}</p>
            <p>Status: ${book.read === 'yes' ? "Read" : "Not Read"}</p>
         
            <button class="remove-book"  style="background-color:#000000; padding:7px 5px; border-radius:5px; color:#ffffff">Remove Book</button>
        `;
        bookContainer.appendChild(bookCard);
    });

    // Event delegation for the buttons
    bookContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-book')) {
            const index = event.target.closest('.book-card').getAttribute('data-index');
            removeBookFromLibrary(index);
        } else if (event.target.classList.contains('toggle-read')) {
            const index = event.target.closest('.book-card').getAttribute('data-index');
            toggleReadStatus(index);
        }
    });
}

// Function to remove a book from the library
function removeBookFromLibrary(index) {
    myLibrary.splice(index, 1); // Remove the book from the library
    addBookToLibrary(); // Refresh the display
}

// Function to toggle the read status of a book
function toggleReadStatus(index) {
    myLibrary[index].toggleReadStatus(); // Toggle the read status of the book
    addBookToLibrary(); // Refresh the display
}

const button = document.querySelector("#btn");
const form = document.querySelector("#form");
const bookContainer = document.querySelector("#book-container");

button.addEventListener('click', function () {
    if (form.style.display === "none" || form.style.display === "") {
        form.style.display = 'block';
    } else {
        form.style.display = 'none';
    }
});

form.addEventListener('submit', function (event) {
   event.preventDefault();

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const page = document.querySelector('#page-number').value;
    const read = document.querySelector('input[name="read-status"]:checked').value; // Capture the read status

    const newBook = new Book(title, author, page, read); // Add read status to the book
    myLibrary.push(newBook);
    form.reset();
    form.style.display = 'none';
    
    addBookToLibrary(); // Refresh the display
});

// Initial call to display any existing books
addBookToLibrary();
