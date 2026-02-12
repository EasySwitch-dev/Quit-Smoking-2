import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  doc,
  getDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const greeting = document.getElementById("greeting");
const counter = document.getElementById("counter");
const rank = document.getElementById("rank");
const smokeBtn = document.getElementById("smoke-btn");

function calculateLevel(days) {
  if (days <= 3) return "Principiante";
  if (days <= 10) return "Resistente";
  if (days <= 30) return "Determinato";
  return "Leggenda";
}

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const docRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();

  const startDate = new Date(data.startDate.seconds * 1000);
  const today = new Date();
  const diffTime = today - startDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  const level = calculateLevel(diffDays);

  greeting.textContent = `Bentornato ${data.name}`;
  counter.textContent = diffDays;
  rank.textContent = level;

  await updateDoc(docRef, {
    daysWithoutSmoking: diffDays,
    level: level
  });

  smokeBtn.addEventListener("click", async () => {
    const newDays = diffDays + 1;
    const newLevel = calculateLevel(newDays);

    counter.textContent = newDays;
    rank.textContent = newLevel;

    await updateDoc(docRef, {
      daysWithoutSmoking: newDays,
      level: newLevel
    });
  });
});
