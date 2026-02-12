import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const messages = document.getElementById("messages");
const input = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

const responses = {
  ricaduto: [
    "Non è una sconfitta. È solo un passo del percorso.",
    "Cadere non significa fallire. Significa rialzarsi più forte."
  ],
  nonfumato: [
    "Incredibile. Ogni giorno conta.",
    "Stai diventando più forte della dipendenza."
  ],
  triste: [
    "Le emozioni passano. Tu resti forte.",
    "Respira. Questo momento non ti definisce."
  ],
  felice: [
    "Goditi questa sensazione. Te la sei meritata.",
    "La libertà è bellissima, vero?"
  ]
};

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const docSnap = await getDoc(doc(db, "users", user.uid));
  const name = docSnap.data().name;

  sendBtn.addEventListener("click", () => {
    const text = input.value.toLowerCase();
    let reply = "Sono qui per te.";

    if (text.includes("ricad")) reply = random(responses.ricaduto);
    else if (text.includes("non ho fum")) reply = random(responses.nonfumato);
    else if (text.includes("trist")) reply = random(responses.triste);
    else if (text.includes("felic")) reply = random(responses.felice);

    messages.innerHTML += `<div class="user-msg">${input.value}</div>`;
    messages.innerHTML += `<div class="ai-msg">${name}, ${reply}</div>`;

    input.value = "";
  });
});
