// return an object the inputs entred by the user
export function userInputs(id) {
  let getValue = (n) =>
    document.querySelector(`.${n}`)?.value ?? "";
  return {
    id,
    title: getValue("titleinput").trim(),
    author: getValue("authorinput").trim(),
    year: getValue("yearinput").trim(),
    genre: getValue("genreinput").trim(),
    description: getValue("descriptioninput").trim(),
    status: getValue("statusinput").trim(),
  };
}


// this function help to show Modal for entring a new book
// the id's will be reset to avoid having a not valid id, because the modal ".editModal" will be used to add and to update new book at the same time
// an event will be added to close the Modal in case of no update
export function showPopUpToAddBook() {
  let modal = document.getElementById("editModal");
  if (!modal) return;
  delete modal.dataset.id;

  let title = modal.querySelector("h2");
  if (title) title.textContent = "Ajouter un nouveau livre";

  let submitBtn = modal.querySelector(".addbook");
  if (submitBtn) {
    submitBtn.textContent = "Ajouter";
    delete submitBtn.dataset.id;
  }

  document.querySelector(".inputform")?.reset();
  modal.showModal();

  document.querySelector(".cancelEditBtn")?.addEventListener("click", (e) => {
    e.preventDefault();
    modal.close();
  });
}


// using the same modal for adding new Book
// this function help to show pop up to the viewport 
// it get the Modal element, then bring the content from the object in the LocalStorage to inputs feilds 
export function showPopUpToUpdateBook(modifyBtn) {
  let modal = document.getElementById("editModal");

  let title = modal.querySelector("h2");
  if (title) title.textContent = "Modifier le livre";

  let submitBtn = modal.querySelector(".addbook");
  if (submitBtn) submitBtn.textContent = "Enregistrer";

  putTheCardContentToPopUp(modal, modifyBtn)
  modal.showModal();

  document.querySelector(".cancelEditBtn")?.addEventListener("click", (e) => {
    e.preventDefault();
    modal.close();
  });
}


// parse the object from the LocalStorage & replace or add a book id
export function saveBookInLocalStorage({ id, title, author, year, genre, description, status } = {}) {
  let books = JSON.parse(localStorage.getItem("books") || "[]");
  books = books.filter((book) => book.id != id)
  books.push({ id, title, author, year, genre, description, status });
  localStorage.setItem("books", JSON.stringify(books));
}

// pass the values via bookCard() to add them to the DOM
export function displayBookCard( { id, title, author, year, genre, description, status } = {}, bookCard ) {
  let card = bookCard({ id, title, author, year, genre, description, status });

  let bookcards = document.querySelector(".bookscard");
  bookcards?.append(card);
}

// parse just the object from localstorage
export function displayBooksFromLocalStorage(bookCard, id) {
  let books = JSON.parse(localStorage.getItem("books") || "[]");
  books.forEach((book) => displayBookCard(book, bookCard));
}

// extract the htmlcollection, if the element found then remove it
export function removBookFromDOM(id) {
  const container = document.querySelector(".bookscard");
  const book = Array.from(container?.children ?? []).find(
    (el) => el.dataset.id === id,
  );
  book?.remove();
}

// remove an object from the localstorage
export function removeBookFromLocalStorage(id) {
  let books = JSON.parse(localStorage.getItem("books") || "[]");
  books = books.filter((book) => book.id !== id);
  localStorage.setItem("books", JSON.stringify(books));
}

// this function help to add the content of a specific book in the localstorage based on the id to the modal
export function putTheCardContentToPopUp(modal, modifyBtn) {
  let id = modifyBtn.dataset.id;
  let books = JSON.parse(localStorage.getItem("books") || "[]");
  let book = books.find((book) => book.id === id);
  if (!book) return;

  modal.dataset.id = book.id;
  modal.querySelector(".addbook").dataset.id = book.id;

  Object.entries(book).forEach(([key, value]) => {
    const input = modal.querySelector(`.${key}input`);
    if (input) {
      input.value = value;
    }
  });
}
