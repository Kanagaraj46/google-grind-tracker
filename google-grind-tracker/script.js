// Import Firebase v9+ modular SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js";

// Your Firebase config (same as yours)
const firebaseConfig = {
  apiKey: "AIzaSyBGcb9E2JCp0PylRVbH74F6_IkJTv1fPRU",
  authDomain: "grind-tracker-9b04f.firebaseapp.com",
  projectId: "grind-tracker-9b04f",
  storageBucket: "grind-tracker-9b04f.appspot.com",
  messagingSenderId: "1050849029356",
  appId: "1:1050849029356:web:1f68d090f71801554c89c9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function saveEntry() {
  const work = document.getElementById('today-work').value;
  const leetcodeLink = document.getElementById('leetcode-link').value;
  
  try {
    await addDoc(collection(db, "entries"), {
      work: work,
      leetcodeLink: leetcodeLink,
      timestamp: serverTimestamp()
    });
    alert("Logged! Keep grinding, future Googler!");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// Load entries
const q = query(collection(db, "entries"), orderBy("timestamp", "desc"));
onSnapshot(q, (snapshot) => {
  const progressWall = document.getElementById('progress-wall');
  progressWall.innerHTML = '<h2>Your Grind Wall:</h2>';
  
  snapshot.forEach((doc) => {
    const data = doc.data();
    progressWall.innerHTML += `
      <div class="entry">
        <p><strong>${data.timestamp?.toDate().toLocaleDateString()}</strong></p>
        <p>${data.work}</p>
        <a href="${data.leetcodeLink}" target="_blank">Problem Link</a>
      </div>
    `;
  });
});

// Link button to function
document.querySelector('button').addEventListener('click', saveEntry);
