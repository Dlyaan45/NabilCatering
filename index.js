///##################################
// BTN SCROLLING

const btnOrder = document.querySelector("#btn-booking");
const btnMenu = document.querySelector("#btn-menu");
btnOrder.addEventListener("click", function () {
    const target = document.getElementById("booking");
    if (target) {
        target.scrollIntoView({ 
            behavior: 'smooth', // Membuat efek scroll menjadi halus
            block: 'start'
        });
    }
});

btnMenu.addEventListener("click", function () {
    const target = document.getElementById("menu");
    if (target) {
        target.scrollIntoView({ 
            behavior: 'smooth', // Membuat efek scroll menjadi halus
            block: 'start'
        });
    }
});

// #######################################
// BOOKING FORM HANDLER


document.addEventListener("DOMContentLoaded", () => {
  const bookingForm = document.getElementById("bookingForm");

  if (bookingForm) {
    bookingForm.addEventListener("submit", async function (event) {
      event.preventDefault();

      const btnSubmit = document.querySelector(".btn-submit");
      const originalBtnText = btnSubmit.innerText;
      btnSubmit.innerText = "Mengirim...";
      btnSubmit.disabled = true;

      // 1. Ambil data
      const data = {
        nama: document.getElementById("nama").value,
        telepon: document.getElementById("telepon").value,
        email: document.getElementById("email").value,
        tanggal: document.getElementById("tanggal").value,
        porsi: document.getElementById("porsi").value,
        paket: document.getElementById("paket").value,
        catatan: document.getElementById("catatan").value,
      };

      // 2. Format pesan
      let pesan =
        `🔔 *PESANAN CATERING BARU* 🔔\n\n` +
        `*Nama:* ${data.nama}\n` +
        `*Telepon:* ${data.telepon}\n` +
        (data.email ? `*Email:* ${data.email}\n` : "") +
        `*Tanggal Acara:* ${data.tanggal}\n` +
        `*Paket:* ${data.paket}\n` +
        `*Jumlah:* ${data.porsi} Porsi\n` +
        (data.catatan ? `*Catatan:* ${data.catatan}\n` : "");

      // 3. Konfigurasi
      const TOKEN_FONNTE = "VaNvZaYU7ABkQwYGMcDf";

      // NOMOR INI ADALAH NOMOR ADMIN YANG AKAN MENERIMA NOTIFIKASI
      const NOMOR_TUJUAN = "62882003263436";

      try {
        const formData = new FormData();
        formData.append("target", NOMOR_TUJUAN);
        formData.append("message", pesan);

        const response = await fetch("https://api.fonnte.com/send", {
          method: "POST",
          headers: {
            Authorization: TOKEN_FONNTE,
          },
          body: formData,
        });

        const result = await response.json();

        if (result.status) {
          alert("Berhasil! Pesanan telah terkirim ke WhatsApp Admin.");
          bookingForm.reset();
        } else {
          alert("Gagal: " + result.reason);
        }
      } catch (error) {
        alert("Terjadi kesalahan koneksi.");
      } finally {
        btnSubmit.innerText = originalBtnText;
        btnSubmit.disabled = false;
      }
    });
  }

  //


  
});

//#######################################
//FORM LOGIN
document.getElementById("btnLogin").addEventListener("click", function() {
    window.location.href = "loginform.html";
});




// ########################################
// DOM menu
// client.js - Menampilkan menu catering realtime untuk pelanggan

const channel = new BroadcastChannel('menu_sync');
const STORAGE_KEY = 'menu_catering';

function getMenus() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function renderMenus(data) {
  const wrapper = document.querySelector('#menuContainer .menu-scroll-wrapper');
  if (!wrapper) return;

  if (data.length === 0) {
    wrapper.innerHTML = `<p>Belum ada menu tersedia.</p>`;
    return;
  }

  wrapper.innerHTML = data.map(item => `
    <div class="menu-card">
      ${item.gambar
        ? `<img src="${item.gambar}" alt="${item.nama}">`
        : `<div class="img-placeholder">[${item.kategori}]</div>`}
      <h3>${item.nama}</h3>
      <span class="category">${item.kategori}</span>
      <p class="price">Rp${item.harga}/-</p>
      <p class="desc">${item.deskripsi}</p>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderMenus(getMenus());
});

channel.onmessage = (event) => {
  if (event.data.type === 'update') {
    renderMenus(event.data.data);
  }
};