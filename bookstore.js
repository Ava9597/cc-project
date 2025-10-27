import { auth, db } from "./app.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { signOut as firebaseSignOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let allBooks = [];
const bookList = document.getElementById("bookList");

// Check user login and load books
auth.onAuthStateChanged(user => {
  if (!user) {
    window.location.href = "login.html";
  } else {
    loadBooks();
  }
});

// Load books from Firestore
async function loadBooks() {
  const snapshot = await getDocs(collection(db, "books"));
  allBooks = [];
  bookList.innerHTML = "";

  snapshot.forEach(doc => {
    const book = doc.data();
    allBooks.push(book);
  });

  displayBooks(allBooks);
}

// Display books in grid
function displayBooks(list) {
  bookList.innerHTML = "";

  list.forEach(book => {
    const card = document.createElement("div");
    card.className = "book-card";
    card.innerHTML = `
      <img src="${book.imageUrl}" alt="${book.title}" />
      <h4>${book.title}</h4>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Category:</strong> ${book.category}</p>
      <p><strong>Price:</strong> ₹${book.price}</p>
      <p><strong>Description:</strong> ${book.description}</p>
      <button class="add-btn">Add to Cart</button>
    `;
    bookList.appendChild(card);

    card.querySelector(".add-btn").addEventListener("click", () => {
      cart.push(book);
      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`"${book.title}" added to cart!`);
    });
  });
}

// Sign out function accessible from HTML
window.signOut = () => {
  firebaseSignOut(auth)
    .then(() => {
      alert("Signed out successfully");
      window.location.href = "login.html";
    })
    .catch(err => alert(err.message));
};
