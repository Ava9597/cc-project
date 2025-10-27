import { auth } from "./app.js";
import { onAuthStateChanged, signOut as firebaseSignOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

let currentUser = null;

// Track logged-in user
onAuthStateChanged(auth, user => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }
  currentUser = user;
  displayReceipt(); // Generate receipt on page load
});

// Display receipt
function displayReceipt() {
  const receiptDiv = document.getElementById("receipt");

  // Get cart saved from checkout
  const cart = JSON.parse(localStorage.getItem("receiptCart")) || [];
  if (cart.length === 0) {
    receiptDiv.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  let total = 0;
  let itemsHTML = "";
  cart.forEach(book => {
    total += parseFloat(book.price);
    itemsHTML += `<tr>
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>₹${book.price}</td>
    </tr>`;
  });

  receiptDiv.innerHTML = `
    <h3>Receipt</h3>
    <p><strong>Username:</strong> ${currentUser.displayName || "Not set"}</p>
    <p><strong>Email:</strong> ${currentUser.email}</p>
    <table border="1" cellpadding="8" cellspacing="0" style="margin: 0 auto;">
      <thead>
        <tr><th>Title</th><th>Author</th><th>Price</th></tr>
      </thead>
      <tbody>${itemsHTML}</tbody>
      <tfoot>
        <tr><td colspan="2"><strong>Total</strong></td><td>₹${total.toFixed(2)}</td></tr>
      </tfoot>
    </table>
    <button id="printBtn" style="margin-top: 20px;">🖨️ Print Receipt</button>
  `;

  // Print receipt
  document.getElementById("printBtn").addEventListener("click", () => {
    window.print();
  });

  // Clear temporary receipt cart after displaying
  localStorage.removeItem("receiptCart");
}

// Navbar sign out
window.signOut = function () {
  firebaseSignOut(auth)
    .then(() => {
      alert("Signed out successfully");
      window.location.href = "login.html";
    })
    .catch(error => alert("Error signing out: " + error.message));
};
