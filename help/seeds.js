
export function setSeeds() {
    const books = [
      { id: Math.random() + "" + Date.now(), title: "1984", author: "George Orwell", year: 1949, genre: "Dystopian", description: "A society under surveillance.", status: "En lecture" },
      { id: Math.random() + "" + Date.now(), title: "Clean Code", author: "Robert C. Martin", year: 2008, genre: "Programming", description: "Writing maintainable code.", status: "Lu" },
      { id: Math.random() + "" + Date.now(), title: "Dune", author: "Frank Herbert", year: 1965, genre: "Science Fiction", description: "A struggle for control of a desert planet.", status: "À lire" },
      { id: Math.random() + "" + Date.now(), title: "The Hobbit", author: "J.R.R. Tolkien", year: 1937, genre: "Fantasy", description: "An unexpected adventure.", status: "À lire" },
      { id: Math.random() + "" + Date.now(), title: "The Alchemist", author: "Paulo Coelho", year: 1988, genre: "Adventure", description: "A journey to find one's destiny.", status: "En lecture" },
      { id: Math.random() + "" + Date.now(), title: "The Little Prince", author: "Antoine de Saint-Exupéry", year: 1943, genre: "Fantasy", description: "A story about love and friendship.", status: "En lecture" },
      { id: Math.random() + "" + Date.now(), title: "Atomic Habits", author: "James Clear", year: 2018, genre: "Self-help", description: "Building better habits.", status: "Lu" },
      { id: Math.random() + "" + Date.now(), title: "The Pragmatic Programmer", author: "David Thomas", year: 1999, genre: "Programming", description: "Practical software development advice.", status: "À lire" }
    ];

    let existsBooks = JSON.parse(localStorage.getItem("books") || "[]");
    let newBooks = books.filter(seed => !existsBooks.some(book => book.title === seed.title));
    localStorage.setItem("books", JSON.stringify([...existsBooks, ...newBooks]));
    
}
