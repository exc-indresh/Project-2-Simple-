console.log("This is project 2")


// constructor for booklist 
function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}
// display constructor 
function Display() {

}
Display.prototype.add = function (book) {
    console.log("Adding to UI");
    let tableBody = document.getElementById('tableBody');
    let uiString = `<tr>
                    <td>${book.name}</td>
                    <td>${book.author}</td>
                    <td>${book.type}</td>
                </tr>`
    tableBody.innerHTML += uiString;
}
// adding clear function in display prototype
Display.prototype.clear = function () {
    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset();
}
// adding validate function in display prototype
Display.prototype.validate = function (book) {
    if (book.name.length < 2 || book.author.length < 2) {
        return false;
    }
    else {
        return true;
    }
}
Display.prototype.show = function (type, displayMessage) {
    let message = document.getElementById('message');
    message.innerHTML = ` <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                            <strong>Message!</strong> ${displayMessage}.
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`
    setTimeout(() => {
        message.innerHTML = "";
    }, 3000);
}


// add submit event listener 
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    e.preventDefault();
    console.log("You have submmited the library form ");

    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type;

    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');
    if (fiction.checked) {
        type = fiction.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else if (cooking.checked) {
        type = cooking.value;
    }

    // book object 
    let book = new Book(name, author, type);


    // display object that display the name author type in dom 
    let display = new Display(book);
    if (display.validate(book)) {

        display.add(book);
        display.clear();
        display.show("success", "Your books has been added successfully");
    }
    else {
        display.show("danger", "Sorry some Error Occured !");
    }
    let notes = localStorage.getItem("book");
    if (notes == null) {
        noteObj = [];
    }
    else {
        noteObj = JSON.parse(notes);
    }
    noteObj.push(book);
    localStorage.setItem("book", JSON.stringify(noteObj));


}


