// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function saveEntry() {
  const work = document.getElementById('today-work').value;
  const leetcodeLink = document.getElementById('leetcode-link').value;
  
  db.collection("entries").add({
    work: work,
    leetcodeLink: leetcodeLink,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  }).then(() => {
    alert("Logged! Keep grinding, future Googler!");
    loadEntries();
  });
}

function loadEntries() {
  db.collection("entries").orderBy("timestamp", "desc").onSnapshot((snapshot) => {
    let html = "";
    snapshot.forEach(doc => {
      const data = doc.data();
      html += `
        <div class="entry">
          <p><strong>${data.timestamp?.toDate().toLocaleDateString()}</strong></p>
          <p>${data.work}</p>
          <a href="${data.leetcodeLink}" target="_blank">Problem Link</a>
        </div>
      `;
    });
    document.getElementById("progress-wall").innerHTML += html;
  });
}

// Load entries on page load
window.onload = loadEntries;