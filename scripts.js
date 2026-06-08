// Simulasi Asynchronous Fetching Data (Bisa diganti API beneran pakai fetch())
const getCateringMenu = async () => {
  return new Promise((resolve, reject) => {
    // Simulasi delay jaringan selama 1.5 detik
    setTimeout(() => {
      const dataMenu = [
        {
          id: 1,
          nama: "Nasi Kotak Ayam Bakar",
          harga: 25000,
          deskripsi:
            "Ayam bakar bumbu rujak lengkap dengan tahu, tempe, dan sambal.",
        },
        {
          id: 2,
          nama: "Tumpeng Mini",
          harga: 35000,
          deskripsi:
            "Nasi kuning porsi personal dengan lauk pauk tradisional khas.",
        },
        {
          id: 3,
          nama: "Snack Box Premium",
          harga: 15000,
          deskripsi: "Isi 3 macam kue manis & gurih beserta air mineral.",
        },
        {
          id: 4,
          nama: "Prasmanan Paket A",
          harga: 55000,
          deskripsi:
            "Paket prasmanan lengkap untuk acara pernikahan/gathering.",
        },
      ];
      resolve(dataMenu);
      // Kalau mau test error handling, lu bisa ganti jadi: reject("Gagal koneksi ke database");
    }, 1500);
  });
};

// Fungsi untuk me-render menu ke DOM
const renderMenuToDOM = async () => {
  const menuContainer = document.getElementById("menu-container");
  const loadingText = document.getElementById("loading-text");

  try {
    // Asynchronous call nunggu data kelar diambil
    const menus = await getCateringMenu();

    // Manipulasi DOM: Hapus teks loading
    loadingText.style.display = "none";

    // Manipulasi DOM: Iterasi data dan buat elemen HTML baru
    menus.forEach((menu) => {
      // Create element baru
      const card = document.createElement("div");
      card.classList.add("menu-card");

      // Isi konten element tersebut
      card.innerHTML = `
                <h3>${menu.nama}</h3>
                <p>${menu.deskripsi}</p>
                <span class="price">Rp ${menu.harga.toLocaleString("id-ID")}</span>
                <button onclick="pilihMenu('${menu.nama}')">Pilih Menu</button>
            `;

      // Append element ke dalam container utama di HTML
      menuContainer.appendChild(card);
    });
  } catch (error) {
    // Manipulasi DOM kalau error
    loadingText.innerHTML = `<span style="color: red;">Error: ${error}</span>`;
  }
};

// Interaksi tombol sederhana
const pilihMenu = (namaMenu) => {
  alert(
    `${namaMenu} telah ditambahkan. Jangan lupa tulis di catatan pesanan ya!`,
  );
};

// Event Listener pas DOM (HTML) kelar di-load
document.addEventListener("DOMContentLoaded", () => {
  // Panggil fungsi render pas awal buka web
  renderMenuToDOM();

  // Manipulasi DOM: Form Handling
  const orderForm = document.getElementById("order-form");
  orderForm.addEventListener("submit", (e) => {
    // Mencegah halaman reload pas disubmit
    e.preventDefault();

    // Ambil value dari inputan user
    const namaUser = document.getElementById("nama").value;

    // Kasih feedback ke user
    alert(
      `Mantap! Pesanan atas nama ${namaUser} berhasil dikirim ke sistem. Tim kami akan segera menghubungi lu.`,
    );

    // Reset form input
    orderForm.reset();
  });
});
