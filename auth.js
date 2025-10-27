import { auth } from "./app.js";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// SIGN UP
window.signUp = function () {
  const username = document.getElementById("signupUsername").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      return updateProfile(userCredential.user, {
        displayName: username,
        photoURL: "https://via.placeholder.com/120?text=Profile"
      });
    })
    .then(() => {
      alert("Signup successful!");
      window.location.href = "bookstore.html";
    })
    .catch(error => {
      alert("Signup failed: " + error.message);
    });
};

// LOG IN
window.logIn = function () {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const username = userCredential.user.displayName;
      alert(`Welcome back, ${username || "Reader"}!`);
      window.location.href = "bookstore.html";
    })
    .catch(error => {
      alert("Login failed: " + error.message);
    });
};