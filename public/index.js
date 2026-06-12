///##################################
// BTN SCROLLING

const btnOrder = document.querySelector("#btn-booking");
const btnMenu = document.querySelector("#btn-menu");
btnOrder.addEventListener("click", function () {
    const target = document.getElementById("booking");
    if (target) {
        target.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
});

btnMenu.addEventListener("click", function () {
    const target = document.getElementById("menuContainer");
    if (target) {
        target.scrollIntoView({ 
            behavior: 'smooth',
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
      const NOMOR_TUJUAN = "6285743318451";

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
const btnLogin = document.getElementById("btnLogin");

if (btnLogin) {
    btnLogin.addEventListener("click", function() {
        window.location.href = "loginform.html";
    });
}



// ########################################
//DOM MENU
const socket = io(); // Nyalakan koneksi WebSocket

async function renderMenu() {
  const wrapper = document.querySelector('.menu-scroll-wrapper');
  if (!wrapper) return;

  try {
    // 1. Ambil data asli ter-update dari API backend
    const response = await fetch('/api/menu');
    const menuData = await response.json();

    if (menuData.length === 0) {
      wrapper.innerHTML = '<p class="empty-menu">Belum ada menu tersedia saat ini.</p>';
      return;
    }

    // Bersihkan isi pembungkus untuk membuang layout lama
    wrapper.innerHTML = '';

    // 2. Loop array data, susun HTML, lalu pasang ke halaman
    menuData.forEach(item => {
      const card = document.createElement('div');
      card.className = 'menu-card';
      
      card.innerHTML = `
        <img src="${item.gambar || 'https://via.placeholder.com/280x180?text=No+Image'}" alt="${item.nama}" class="menu-image">
        <div class="card-image-badge">
          <span class="badge-kategori">${item.kategori}</span>
        </div>
        <div class="menu-info">
          <h3 class="menu-name">${item.nama}</h3>
          <p class="menu-desc">${item.deskripsi || 'Tidak ada deskripsi.'}</p>
          <span class="menu-price">Rp ${parseInt(item.harga).toLocaleString('id-ID')}</span>
        </div>
      `;
      wrapper.appendChild(card);
    });

  } catch (error) {
    console.error("Gagal sinkronisasi data:", error);
    wrapper.innerHTML = '<p class="empty-menu" style="color: #ff4757;">Gagal memuat data menu.</p>';
  }
}

// ===== INTI REAL-TIME =====
// Ketika server mengabarkan data berubah, jalankan kembali renderMenu() tanpa reload halaman
socket.on('menuUpdated', () => {
    console.log('Sinyal diterima: Sinkronisasi menu baru...');
    renderMenu();
});

// Load data pertama kali saat browser selesai membuka web
document.addEventListener('DOMContentLoaded', renderMenu);

