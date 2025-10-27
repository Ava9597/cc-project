import { auth, db } from "./app.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { signOut as firebaseSignOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update Cart UI
function updateCartUI() {
  const cartBody = document.getElementById("cartBody");
  const totalPriceCell = document.getElementById("totalPrice");
  cartBody.innerHTML = "";

  let total = 0;
  cart.forEach((book, index) => {
    total += parseFloat(book.price);
    cartBody.innerHTML += `
      <tr>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>₹${book.price}</td>
        <td><button onclick="removeFromCart(${index})">Remove</button></td>
      </tr>
    `;
  });
  totalPriceCell.textContent = `₹${total.toFixed(2)}`;
}

// Remove Book
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartUI();
}

// Checkout
async function checkout() {
  const user = auth.currentUser;
  if (!user) {
    alert("Please log in to complete checkout.");
    window.location.href = "login.html";
    return;
  }

  const purchasesRef = collection(db, "purchases", user.uid, "books");
  try {
    for (let book of cart) {
      await addDoc(purchasesRef, book);
    }

    // Save cart temporarily for receipt page
    localStorage.setItem("receiptCart", JSON.stringify(cart));
    localStorage.removeItem("cart");

    alert("Checkout complete!");
    window.location.href = "receipt.html";
  } catch (error) {
    alert("Checkout failed: " + error.message);
  }
}

// Navbar sign out
window.signOut = () => {
  firebaseSignOut(auth)
    .then(() => {
      alert("Signed out successfully");
      window.location.href = "login.html";
    })
    .catch(err => alert(err.message));
};

window.removeFromCart = removeFromCart;
window.checkout = checkout;

updateCartUI();
document.getElementById("checkoutBtn")?.addEventListener("click", checkout);
