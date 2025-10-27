import { auth, db } from "./app.js";
import {
  onAuthStateChanged,
  updateProfile,
  signOut as firebaseSignOut
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import {
  doc,
  setDoc,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Load profile & purchased books
onAuthStateChanged(auth, async user => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  document.getElementById("userEmail").textContent = `Email: ${user.email}`;
  document.getElementById("usernameInput").value = user.displayName || "";

  // Load purchased books
  const purchasesRef = collection(db, "purchases", user.uid, "books");
  const snapshot = await getDocs(purchasesRef);
  const table = document.getElementById("purchaseTable");
  table.innerHTML = "";
  snapshot.forEach(doc => {
    const book = doc.data();
    table.innerHTML += `
      <tr>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>₹${book.price}</td>
      </tr>
    `;
  });
});

// Update username
window.updateUsername = function () {
  const newUsername = document.getElementById("usernameInput").value.trim();
  if (!newUsername) return alert("Username cannot be empty.");

  updateProfile(auth.currentUser, { displayName: newUsername })
    .then(() => {
      return setDoc(doc(db, "users", auth.currentUser.uid), {
        displayName: newUsername,
        email: auth.currentUser.email
      });
    })
    .then(() => alert("Username updated!"))
    .catch(error => alert("Update failed: " + error.message));
};

// Sign out
window.signOut = function () {
  firebaseSignOut(auth)
    .then(() => {
      alert("Signed out successfully");
      window.location.href = "login.html";
    })
    .catch(error => alert("Error signing out: " + error.message));
};
