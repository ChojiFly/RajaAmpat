import { db } from "./firebase.js";
import {
  collection, onSnapshot,
  deleteDoc, doc, updateDoc, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const list = document.getElementById("list");
const counter = document.getElementById("counter");
const empty = document.getElementById("empty");

onSnapshot(collection(db, "biodata"), snap => {
  list.innerHTML = "";
  counter.innerText = `Total data: ${snap.size}`;

  if (snap.empty) {
    empty.style.display = "block";
    return;
  }

  empty.style.display = "none";

  snap.forEach(d => {
    const data = d.data();

    const div = document.createElement("div");
    div.className = "list-item";
    div.innerHTML = `
      <div>
        <strong>${data.nama}</strong><br>
        <small>NIS: ${data.nis || "-"}</small>
      </div>

      <div class="admin-actions">
        <button class="secondary"
          onclick="approveEdit('${d.id}')">
          Izinkan Edit
        </button>
        <button class="danger"
          onclick="hapus('${d.id}')">
          Hapus
        </button>
      </div>
    `;
    list.appendChild(div);
  });
});

window.approveEdit = async id => {
  await updateDoc(doc(db, "biodata", id), {
    allowEdit: true,
    locked: false,
    updatedAt: serverTimestamp(),
    editLogs: [{
      by: "admin",
      time: serverTimestamp()
    }]
  });
  alert("Edit diizinkan, QR lama tidak berlaku");
};

window.hapus = async id => {
  if (!confirm("Hapus data ini?")) return;
  await deleteDoc(doc(db, "biodata", id));
};
