document.getElementById('bookingForm').addEventListener('submit', function(e) {
    // Mencegah halaman reload saat tombol submit ditekan
    e.preventDefault(); 

    // 1. Ambil nilai dari form berdasarkan ID
    const nama = document.getElementById('nama').value;
    const telepon = document.getElementById('telepon').value;
    const email = document.getElementById('email').value;
    const tanggal = document.getElementById('tanggal').value;
    const porsi = document.getElementById('porsi').value;
    const paket = document.getElementById('paket').value;
    const catatan = document.getElementById('catatan').value;

    // 2. Tentukan Nomor WhatsApp Tujuan (Gunakan format 62 tanpa tanda +)
    const nomorWA = "6285743318451"; // GANTI DENGAN NOMOR WA ANDA

    // 3. Susun format pesan
    const pesan = `Halo Admin Catering, saya ingin melakukan pemesanan dengan detail berikut:%0A%0A` +
                  `*Nama Lengkap:* ${nama}%0A` +
                  `*No. Telepon:* ${telepon}%0A` +
                  `*Email:* ${email}%0A` +
                  `*Tanggal Acara:* ${tanggal}%0A` +
                  `*Jumlah Porsi:* ${porsi} porsi%0A` +
                  `*Paket Pilihan:* ${paket}%0A` +
                  `*Catatan:* ${catatan}%0A%0A` +
                  `Mohon informasi lebih lanjut. Terima kasih.`;

    // 4. Buat Link URL WhatsApp dan arahkan tab baru
    const urlWA = `https://wa.me/${nomorWA}?text=${pesan}`;
    window.open(urlWA, '_blank');
});