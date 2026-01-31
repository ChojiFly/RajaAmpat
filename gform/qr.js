const id = new URLSearchParams(location.search).get("id");
const box = document.getElementById("qrcode");

const qr = new QRCode(box, {
  text: `${location.origin}/view.html?id=${id}`,
  width: 220,
  height: 220
});

document.getElementById("downloadQR").onclick = () => {
  const canvas = box.querySelector("canvas");
  if (!canvas) {
    alert("QR belum siap");
    return;
  }

  const a = document.createElement("a");
  a.href = canvas.toDataURL("image/png");
  a.download = "QR-Biodata.png";
  a.click();
};
