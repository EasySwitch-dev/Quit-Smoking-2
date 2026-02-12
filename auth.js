import { auth, db } from "./firebase-config.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// SIGNUP
const signupForm = document.getElementById("signup-form");
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const startDate = new Date();

      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        createdAt: new Date(),
        startDate,
        daysWithoutSmoking: 0,
        level: "Principiante"
      });

      window.location.href = "index.html";
    } catch (error) {
      alert(error.message);
    }
  });
}

// LOGIN
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = "index.html";
    } catch (error) {
      alert(error.message);
    }
  });
}

// AUTO LOGIN
onAuthStateChanged(auth, (user) => {
  if (user && window.location.pathname.includes("login.html")) {
    window.location.href = "index.html";
  }
});

