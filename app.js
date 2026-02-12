import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const greeting = document.getElementById("greeting");
const counter = document.getElementById("counter");
const rank = document.getElementById("rank");
const smokeBtn = document.getElementById("smoke-btn");

// Calcolo livello
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

  const userRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(userRef);
  const data = docSnap.data();

  const startDate = new Date(data.startDate.seconds * 1000);
  const today = new Date();
  let diffDays = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));

  // Aggiorna Firestore se i giorni cambiano
  if (diffDays !== data.daysWithoutSmoking) {
    await updateDoc(userRef, { daysWithoutSmoking: diffDays });
  }

  // Mostra dati iniziali
  greeting.textContent = `Bentornato ${data.name}`;
  counter.textContent = diffDays;
  rank.textContent = calculateLevel(diffDays);

  smokeBtn.addEventListener("click", async () => {
    diffDays++;
    counter.textContent = diffDays;
    const newLevel = calculateLevel(diffDays);
    rank.textContent = newLevel;

    await updateDoc(userRef, {
      daysWithoutSmoking: diffDays,
      level: newLevel
    });
  });
});

