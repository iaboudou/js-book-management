// this is responsable for rendring a new book card to the DOM
export function bookCard({ id, title = "", author = "", year = "", genre = "", description = "", status = "" } = {}) {

    let book = document.createElement("div")
    book.className = "bookcard p-4 rounded-lg shadow-sm border flex flex-col justify-between space-y-3"
    book.dataset.id = id

    let c = document.createElement("div")
    c.className = "space-y-1"

    let header = document.createElement("div")
    header.className = "flex items-start justify-between"

    // title
    let t = document.createElement("h3")
    t.className = "title font-bold"
    t.textContent = title

    // status
    let s = document.createElement("span")
    s.className = `readstatus ${status == "À lire" ? "bg-yellow-100" : status == "En lecture" ? "bg-green-200" : "bg-red-200"} text-blue-800 text-xs px-2 py-0.5 rounded`
    s.textContent = status

    header.append(t, s)

    // author
    let a = document.createElement("p")
    a.className = "authorname text-sm text-gray-600"
    a.textContent = "Auteur: " + author

    // type
    let typee = document.createElement("p")
    typee.className = "booktype text-xs text-slate-500"
    typee.textContent = "Année: " + year + " | Genre: " + genre

    //description
    let desc = document.createElement("p")
    desc.className = "bookdesc text-xs text-gray-600 mt-2 break-words"
    desc.textContent = description

    c.append(header, a, typee, desc)

    let actions = document.createElement("div")
    actions.className = "flex items-center gap-2 pt-2 border-t"

    // modify button
    let modify = document.createElement("button")
    modify.className = "bookmodify bg-slate-200 text-slate-700 px-3 py-1 rounded text-xs"
    modify.dataset.id = id
    modify.textContent = "Modifier"

    // remove button
    let r = document.createElement("button")
    r.className = "bookdelete bg-red-100 text-red-600 px-3 py-1 rounded text-xs"
    r.dataset.id = id
    r.textContent = "Supprimer"

    actions.append(modify, r)
    book.append(c, actions)

    return book
}

// when a new book added disply a notification message
export function newBookAddedMessage(timer) {
    document.querySelector(".newbookaddedmsg").classList.remove("hidden")
    timer = setTimeout(() => {
        document.querySelector(".newbookaddedmsg").classList.add("hidden")
    }, 2500)
}

export function inputerrorMessage(errortype, timer) {
    let e = document.querySelector(".newbookaddederror")
    e.textContent = errortype
    e.classList.remove("hidden")

    timer = setTimeout(() => {
        document.querySelector(".newbookaddederror").classList.add("hidden")
        e.textContent = ""
    }, 10000)
}