// 01: Declare an array of book titles
const bookTitles = [
  "the_hobbit",
  "to_kill_a_mockingbird",
  "1984",
  "the_catcher_in_the_rye",
  "the_great_gatsby",
  "pride_and_prejudice",
  "the_lord_of_the_rings",
  "brave_new_world",
  "animal_farm",
  "catch_22"
];

// 02: Log the original array to the console (for debugging purposes)
console.log("Book Titles Array:", bookTitles);

// 03: Convert the array to lowercase and replace spaces with underscores
const formattedBookTitles = bookTitles.map(title =>
  title.toLowerCase().replace(/\s/g, "_")
);

// 04: Log the modified array to the console
console.log("Formatted array:", formattedBookTitles);

// 05: Function to generate a ul with li elements for each book title
function generateBookList(bookTitles) {
  const ulElement = document.createElement("ul");

  for (const title of bookTitles) {
    const liElement = document.createElement("li");
    liElement.textContent = title;
    ulElement.appendChild(liElement);
  }

  document.body.appendChild(ulElement);
}

// 06: Call the function to generate the book list
generateBookList(formattedBookTitles);

// 07: Create an object containing information for each book
const booksInfo = {
  the_hobbit: {
    title: "The Hobbit",
    language: "English",
    author: "J.R.R. Tolkien"
  },
  to_kill_a_mockingbird: {
    title: "To Kill a Mockingbird",
    language: "English",
    author: "Harper Lee"
  },
  "1984": {
    title: "1984",
    language: "English",
    author: "George Orwell"
  },
  the_catcher_in_the_rye: {
    title: "The Catcher in the Rye",
    language: "English",
    author: "J.D. Salinger"
  },
  the_great_gatsby: {
    title: "The Great Gatsby",
    language: "English",
    author: "F. Scott Fitzgerald"
  },
  pride_and_prejudice: {
    title: "Pride and Prejudice",
    language: "English",
    author: "Jane Austen"
  },
  the_lord_of_the_rings: {
    title: "The Lord of the Rings",
    language: "English",
    author: "J.R.R. Tolkien"
  },
  brave_new_world: {
    title: "Brave New World",
    language: "English",
    author: "Aldous Huxley"
  },
  animal_farm: {
    title: "Animal Farm",
    language: "English",
    author: "George Orwell"
  },
  catch_22: {
    title: "Catch-22",
    language: "English",
    author: "Joseph Heller"
  }
};

// 08: Function to generate a list with information about each book
function generateBookListWithInfo(booksInfo) {
  const ulElement = document.createElement("ul");

  for (const bookID in booksInfo) {
    if (booksInfo.hasOwnProperty(bookID)) {
      const liElement = document.createElement("li");
      const titleHeading = document.createElement("h2");
      const languageParagraph = document.createElement("p");
      const authorParagraph = document.createElement("p");

      titleHeading.textContent = booksInfo[bookID].title;
      languageParagraph.textContent = "Language: " + booksInfo[bookID].language;
      authorParagraph.textContent = "Author: " + booksInfo[bookID].author;

      liElement.appendChild(titleHeading);
      liElement.appendChild(languageParagraph);
      liElement.appendChild(authorParagraph);

      ulElement.appendChild(liElement);
    }
  }

  document.body.appendChild(ulElement);
}

// 09: Call the function to generate the book list with information
generateBookListWithInfo(booksInfo);
