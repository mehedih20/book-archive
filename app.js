const inputField = document.getElementById("input-field");
const inputBtn = document.getElementById("input-btn");
const container = document.getElementById("card-container");
const searchCounter = document.getElementById("search-count");
const spinner = document.getElementById("spinner");

// ============== Functions ===============

const showSearchCount = (value, total = 0, count = 0) => {
  if (value) {
    searchCounter.innerHTML = `
        <p class="lead text-success">Showing ${count} results out of ${total}!</p>
        `;
  } else {
    searchCounter.innerHTML = `
        <p class="lead text-danger">No results found!</p>
        `;
  }
};

const showBooks = (books) => {
  const bookList = books.docs;

  if (bookList.length === 0) {
    showSearchCount(false);
    spinner.style.display = "none";
  } else {
    showSearchCount(true, books.numFound, bookList.length);

    bookList.forEach((book) => {
      const { title, author_name, publisher, first_publish_year, cover_i } =
        book;

      const imgUrl = `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`;
      const authorName = author_name ? author_name.join(" , ") : "";
      const publisherName = publisher ? publisher.join(" , ") : "";
      const alternateImg =
        "https://cdn-a.william-reed.com/var/wrbm_gb_food_pharma/storage/images/9/2/8/5/235829-6-eng-GB/Feed-Test-SIC-Feed-20142_news_large.jpg";

      const singleBook = document.createElement("div");
      singleBook.classList.add("col");
      singleBook.innerHTML = `
      <div class="card h-100 shadow">
      <div class="card-img-top book-img">
        <img src="${
          cover_i ? imgUrl : alternateImg
        }" class="img-fluid" alt="${title}" />
      </div>
      <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text fw-light text-primary">${authorName}</p>
      </div>
      <div class="card-footer">
        <small class="text-muted" title="${publisherName}">
          Publisher: ${
            publisherName.length > 35
              ? publisherName.substring(0, 33) + "..."
              : publisherName
          }
        </small>
        <br>
        <small class="text-muted">First published: ${
          first_publish_year ? first_publish_year : ""
        }</small>
      </div>
  </div>
      `;
      spinner.style.display = "none";
      container.appendChild(singleBook);
    });
  }
};

const getBooks = (text) => {
  container.textContent = "";
  searchCounter.textContent = "";
  spinner.style.display = "block";
  //   ----------------------------
  const url = `https://openlibrary.org/search.json?q=${text}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showBooks(data));
};

const loadBooks = () => {
  let inputValue = inputField.value;
  if (inputValue) {
    getBooks(inputValue);
  }
  inputField.value = "";
};

// ======== init function ============

getBooks("reactjs");

// ======== Event Listener ===========

inputBtn.addEventListener("click", loadBooks);

// ------------- End ------------------
