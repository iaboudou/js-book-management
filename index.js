import { bookCard, newBookAddedMessage, inputerrorMessage } from "./help/sections.js";
import { userInputs, saveBookInLocalStorage, displayBookCard, displayBooksFromLocalStorage, removBookFromDOM, removeBookFromLocalStorage, showPopUpToUpdateBook, 
  showPopUpToAddBook, deleteCardIfIncludeID, filterDOMcards, sortBy } from "./help/functions.js";
import { isInputsValid } from "./help/validate.js";
import { resetInput, resetMsgs } from "./help/reset.js";
import { setSeeds } from "./help/seeds.js";
import { DEBOUNCE_DELAY, timer } from "./help/config.js";

// immediatly add some seeds to the localstorage and display it  ------
setSeeds();
displayBooksFromLocalStorage(bookCard);

// in case of clicking .addBook should display the popUp ---------------
document.querySelector(".addBook")?.addEventListener("click", (e) => {
  e.preventDefault();
  showPopUpToAddBook(resetInput);
});

// in case of clicking to add new book ---------------------------------
let addBookBtn = document.querySelector(".addbook");

addBookBtn?.addEventListener("click", (e) => {
  e.preventDefault();
  resetMsgs();

  if (addBookBtn.disabled) return;

  try {
    addBookBtn.disabled = true;

    let inputs = userInputs(Math.random() + "" + Date.now());
    if (isInputsValid(inputs, (err) => inputerrorMessage(err))) {
      deleteCardIfIncludeID(addBookBtn);
      resetInput();
      saveBookInLocalStorage(inputs);
      displayBookCard(inputs, bookCard);
      newBookAddedMessage(timer);
      document.getElementById("editModal")?.close();
    }
  } finally {
    addBookBtn.disabled = false;
  }
});

// in case of cliking delete or update  --------------------------------
let cards = document.querySelector(".bookscard");
cards.addEventListener("click", (e) => {
  e.preventDefault();
  resetMsgs();
  let removeBtn = e.target.closest(".bookdelete");
  let modifybtn = e.target.closest(".bookmodify");

  // remove 
  if (removeBtn && !removeBtn.disabled) {
    try {
      removeBtn.disabled = true;
      removBookFromDOM(removeBtn.dataset.id);
      removeBookFromLocalStorage(removeBtn.dataset.id);
    } finally {
      removeBtn.disabled = false;
    }
    // update
  } else if (modifybtn && !modifybtn.disabled) {
    try {
      modifybtn.disabled = true;
      showPopUpToUpdateBook(modifybtn);
    } finally {
      modifybtn.disabled = false;
    }
  }
});

// in case of search try to filter the data from the localstorage object -----
// applying debounce to avois spamming
let search = document.querySelector(".searchBook");
let t1;
search.addEventListener("input", (e) => {
  clearTimeout(t1);
  let value = e.target.value.trim();
  t1 = setTimeout(() => {
    filterDOMcards(value);
  }, DEBOUNCE_DELAY);
});

// on change will be sort the books objects based on the type
let sort = document.getElementById("sort");
let t;
sort.addEventListener("change", (e) => {
  clearTimeout(t);
  let value = e.target.value;
  t = setTimeout(() => {
    sortBy(value);
  }, DEBOUNCE_DELAY);
});