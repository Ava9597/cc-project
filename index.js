import { auth, db } from "./app.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let allBooks = [];

// Load books on page load (no redirect to bookstore here)
document.addEventListener('DOMContentLoaded', async () => {
  await loadBooks();
  displayRecommendedBooks();
});

// Fetch all books from Firestore
async function loadBooks() {
  try {
    const snapshot = await getDocs(collection(db, "books"));
    allBooks = snapshot.docs.map(doc => doc.data());
  } catch (err) {
    console.error("Error fetching books:", err);
  }
}

// Display 4 random recommended books
function displayRecommendedBooks() {
  const recommendationList = document.getElementById("recommendationList");
  recommendationList.innerHTML = "";

  const shuffled = [...allBooks].sort(() => 0.5 - Math.random()).slice(0, 4); // pick 4 random books
  shuffled.forEach(book => recommendationList.appendChild(createBookCard(book)));
}

// Create a book card element
function createBookCard(book) {
  const card = document.createElement("div");
  card.className = "book-card";
  card.innerHTML = `
    <img src="${book.imageUrl}" alt="${book.title}" />
    <h4>${book.title}</h4>
    <p><strong>Author:</strong> ${book.author}</p>
    <p><strong>Category:</strong> ${book.category}</p>
    <p><strong>Price:</strong> ₹${book.price}</p>
    <button class="add-to-cart-btn">Add to Cart</button>
  `;

  // Add to cart button
  card.querySelector(".add-to-cart-btn").addEventListener("click", () => addToCart(book));
  return card;
}

// Add book to cart
function addToCart(book) {
  cart.push(book);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${book.title} added to cart!`);
}
window.addToCart = addToCart;
