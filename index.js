import { bookCard, newBookAddedMessage, inputerrorMessage } from "./help/sections.js";
import { userInputs, saveBookInLocalStorage, displayBookCard, displayBooksFromLocalStorage, removBookFromDOM, removeBookFromLocalStorage, showPopUpToUpdateBook, showPopUpToAddBook, deleteCardIfIncludeID, filterDOMcards, sortBy } from "./help/functions.js";
import { isInputsValid } from "./help/validate.js";
import { resetInput } from "./help/reset.js";

// immediatly display the books object exists on the localstorage ------
displayBooksFromLocalStorage(bookCard);

// in case of clicking .addBook should display the popUp ---------------
document.querySelector(".addBook")?.addEventListener("click", (e) => {
  e.preventDefault();
  showPopUpToAddBook();
});


// in case of clicking to add new book ---------------------------------
let addBookBtn = document.querySelector(".addbook");

addBookBtn?.addEventListener("click", (e) => {
  e.preventDefault();

  if (addBookBtn.disabled) return;
  
  try {
    addBookBtn.disabled = true;
    
    let inputs = userInputs(Math.random() + "");
    if (isInputsValid(inputs, inputerrorMessage)) {
      deleteCardIfIncludeID(addBookBtn);
      resetInput();
      saveBookInLocalStorage(inputs);
      displayBookCard(inputs, bookCard);
      newBookAddedMessage();
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
  let removeBtn = e.target.closest(".bookdelete");
  let modifybtn = e.target.closest(".bookmodify");

  if (removeBtn && !removeBtn.disabled) {
    try {
      removeBtn.disabled = true;
      removBookFromDOM(removeBtn.dataset.id);
      removeBookFromLocalStorage(removeBtn.dataset.id);
    } finally {
      removeBtn.disabled = false;
    }
  }
  else if (modifybtn && !modifybtn.disabled) {
    try {
      modifybtn.disabled = true
      showPopUpToUpdateBook(modifybtn)
    }finally {
      modifybtn.disabled = false
    }
  }  
});


// in case of search try to filter the data from the localstorage object -----
// applying debounce to avois spamming
let search = document.querySelector(".searchBook")
let timer
search.addEventListener("input", (e)=> {
  clearTimeout(timer)
  let value = e.target.value
  timer = setTimeout(()=> {
    filterDOMcards(value)
  }, 300)
})


// on change will be sort the books objects based on the type
let sort = document.getElementById("sort")
let t
sort.addEventListener("change", (e)=> {
  clearTimeout(t)
  let value = e.target.value
  t = setTimeout(()=> {
    sortBy(value)
  }, 300)
})