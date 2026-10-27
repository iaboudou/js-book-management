import { bookCard, newBookAddedMessage, inputerrorMessage } from "./help/sections.js";
import { userInputs, saveBookInLocalStorage, displayBookCard, displayBooksFromLocalStorage, removBookFromDOM, removeBookFromLocalStorage } from "./help/functions.js";
import { isInputsValid } from "./help/validate.js";
import { resetInput } from "./help/reset.js";

displayBooksFromLocalStorage()

// in case of clicking to add new book ----------------------------
let addBookBtn = document.querySelector(".addbook");
addBookBtn?.addEventListener("click", (e) => {
  e.preventDefault();

  if (addBookBtn.disabled) return;

  try {
    addBookBtn.disabled = true;
    let inputs = userInputs();
    resetInput()
    if (isInputsValid(inputs, inputerrorMessage)) {
      saveBookInLocalStorage(inputs)
      displayBookCard(inputs)
      newBookAddedMessage();
    }
  } finally {
    addBookBtn.disabled = false;
  }
});



// in case of cliking delete a book remove it -------------------
let card = document.querySelector(".bookscard")
card?.addEventListener("click", (e)=> {
  e.preventDefault();

  let removeBtn = e.target.closest(".bookdelete")
  if (!removeBtn ||  removeBtn.disabled) return;

  try {
    removeBtn.disabled = true
    removBookFromDOM(removeBtn.dataset.id)
    removeBookFromLocalStorage(removeBtn.dataset.id)

  }finally {
    removeBtn.disabled = false;
  }
})