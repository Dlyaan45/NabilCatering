const express = require('express');
const app = express();
const PORT = 3000;

// Middleware untuk membaca JSON (opsional, jika butuh API)
app.use(express.json());

// 1. Route Halaman Utama (Homepage)
app.get('/', (req, res) => {
    res.send('Selamat datang di Halaman Utama!');
});

// 2. Route Halaman Profile
app.get('/profile', (req, res) => {
    res.send('Ini adalah halaman Profil Pengguna.');
});

// 3. Route Dinamis (Menggunakan Parameter/ID)
app.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`Menampilkan data untuk User ID: ${userId}`);
});

// 4. Handle Route yang Tidak Ditemukan (404 Not Found)
app.use((req, res) => {
    res.status(404).send('Maaf, halaman tidak ditemukan!');
});

// Jalankan Server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});