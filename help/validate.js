export function IsvalidTitle(input) {
  return (
    input !== "" && /^[a-zA-ZÀ-ÿ\s\-'’]+$/.test(input) && input.length < 40
  );
}
export function IsvalidAuthor(input) {
  return (
    input !== "" && /^[a-zA-ZÀ-ÿ\s\-'’]+$/.test(input) && input.length < 40
  );
}

export function IsvalidGenre(input) {
  return (
    input !== "" && /^[a-zA-ZÀ-ÿ\s\-'’]+$/.test(input) && input.length < 40
  );
}

export function IsvalidYear(year) {
  if (year === "") return true;
  let num = Number(year);
  return Number.isInteger(num) && num >= 0 && num <= new Date().getFullYear();
}

export function IsvalidStatus(status) {
  return ["to-read", "reading", "read"].includes(status);
}

export function IsValidDescription(input) {
  return input.length < 155 && input.length > 0;
}

// check if the input tap by the user is correct and show an error message in case of invalide input
export function isInputsValid({ title = "", author = "", year = "", genre = "", description = "", status = ""} = {}, errorMessageFn) {
  if (!IsvalidTitle(title)) {
    errorMessageFn("le titre n'est pas valide");
    return false;
  }
  if (!IsvalidAuthor(author)) {
    errorMessageFn("l'auteur n'est pas valide");
    return false;
  }
  if (!IsvalidYear(year)) {
    errorMessageFn("l'année n'est pas valide");
    return false;
  }
  if (!IsvalidGenre(genre)) {
    errorMessageFn("le genre n'est pas valide");
    return false;
  }
  if (!IsValidDescription(description)) {
    errorMessageFn("la description n'est pas valide");
    return false;
  }
  if (!IsvalidStatus(status)) {
    errorMessageFn("le statut n'est pas valide");
    return false;
  }

  return true;
}
