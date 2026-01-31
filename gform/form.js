import { db, auth } from "./firebase.js";
import {
  addDoc,
  collection,
  serverTimestamp
} from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const form = document.getElementById("biodataForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!auth.currentUser) {
    alert("Auth belum siap, tunggu 1–2 detik lalu coba lagi");
    return;
  }

  try {
    const docRef = await addDoc(collection(db, "biodata"), {
      uid: auth.currentUser.uid,
      nama: form.nama.value,
      nis: form.nis.value,
      kelas: form.kelas.value,
      email: form.email.value,
      alamat: form.alamat.value,
      locked: true,
      createdAt: serverTimestamp()
    });

    location.href = `qr.html?id=${docRef.id}`;

  } catch (err) {
    console.error(err);
    alert("Gagal menyimpan data");
  }
});
