import { db } from "./firebase.js";
import { doc, getDoc } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const id = new URLSearchParams(location.search).get("id");
if (!id) location.href = "index.html";

const snap = await getDoc(doc(db, "biodata", id));
if (!snap.exists()) location.href = "index.html";

const d = snap.data();
avatar.innerText = d.nama[0];
nama.innerText = d.nama;
kelas.innerText = d.kelas;

data.innerHTML = `
  <div>NIS: ${d.nis}</div>
  <div>JK: ${d.jk}</div>
  <div>TTL: ${d.tempat}, ${d.tgl}</div>
  <div>Alamat: ${d.alamat}</div>
  <div>HP: ${d.hp}</div>
  <div>Email: ${d.email}</div>
  <div>Catatan: ${d.catatan}</div>
`;
if (d.editLogs) {
  data.innerHTML += "<hr><b>Riwayat Edit:</b>";
  d.editLogs.forEach(l => {
    data.innerHTML += `
      <div>
        ${l.by} — ${new Date(l.time.seconds * 1000).toLocaleString()}
      </div>
    `;
  });
}
