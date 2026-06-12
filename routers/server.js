const express = require('express');
const app = express();
const PORT = 3000;

// Middleware untuk membaca JSON (opsional, jika butuh API)
app.use(express.json());

// 1. Route Halaman Utama (Homepage)
app.get('/', (req, res) => {
    res.send('Selamat datang di Halaman Utama!');
});

// 4. Handle Route yang Tidak Ditemukan (404 Not Found)
app.use((req, res) => {
    res.status(404).send('Maaf, halaman tidak ditemukan!');
});

// Jalankan Server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});