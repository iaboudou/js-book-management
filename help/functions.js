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
// an event will be added to close the Modal in case of cancel
export function showPopUpToAddBook(resetInput) {
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

  resetInput()
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

// remove an object from the localstorage
export function removeBookFromLocalStorage(id) {
  let books = JSON.parse(localStorage.getItem("books") || "[]");
  books = books.filter((book) => book.id !== id);
  localStorage.setItem("books", JSON.stringify(books));
}

// pass the values via bookCard() to build the card and add it to to the DOM
export function displayBookCard( { id, title, author, year, genre, description, status } = {}, bookCard ) {
  let card = bookCard({ id, title, author, year, genre, description, status });

  let bookcards = document.querySelector(".bookscard");
  bookcards?.append(card);
}

// parse just the object from localstorage
export function displayBooksFromLocalStorage(bookCard) {
  let books = JSON.parse(localStorage.getItem("books") || "[]");
  if (books.length == 0) {
    document.querySelector(".nobookexists").classList.remove("hidden")
    return
  }
  books.forEach((book) => displayBookCard(book, bookCard));
}

// extract the htmlcollection, if the element's id found then remove it
export function removBookFromDOM(id) {
  const container = document.querySelector(".bookscard");
  const book = Array.from(container?.children ?? []).find( (el) => el.dataset.id === id );
  book?.remove();
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


// this function just help to remove an element from the localstorage and from the DOM
// it reset the modal's dataset.id as well so it can be used in the next time
export function deleteCardIfIncludeID(btn) {
  let modal = document.getElementById("editModal");
  let id = btn.dataset.id;
  
  if (!id) return;
  
  removeBookFromLocalStorage(id);
  removBookFromDOM(id);

  delete modal.dataset.id;
  delete btn.dataset.id;
}


import { bookCard } from "./sections.js";
export function filterDOMcards(str) {
  let cardsCollection = document.querySelector(".bookscard")
  let booksArray = JSON.parse(localStorage.getItem("books"))
  cardsCollection.innerHTML = ""
  
  booksArray.filter(e => 
    e.title.toString().toLowerCase().includes(str.toLowerCase()) || 
    e.author.toString().toLowerCase().includes(str.toLowerCase())).forEach(obj => displayBookCard(obj, bookCard))
}

// sort based on the type selected by the user
// rerender the page based
export function sortBy(type) {
  const cardsCollection = document.querySelector(".bookscard");
  const booksArray = JSON.parse(localStorage.getItem("books") || "[]");

  booksArray.sort((a, b) => {
    if (type === "title") {
      return a.title.localeCompare(b.title);
    } else if (type === "author") {
      return a.author.localeCompare(b.author);
    } else if (type === "year") {
      return Number(a.year) - Number(b.year);
    }
    return 0;
  });

  cardsCollection.innerHTML = "";
  booksArray.forEach(obj => displayBookCard(obj, bookCard));
}