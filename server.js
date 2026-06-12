const express = require('express');
const path = require('path');
const http = require('http'); 
const { Server } = require('socket.io'); 

const app = express();
const PORT = 3001;

// Membungkus Express ke Server HTTP agar mendukung WebSocket
const server = http.createServer(app);
const io = new Server(server); 

// Middleware Utama
app.use(express.json({ limit: '10mb' })); // Limit besar untuk menampung data gambar base64
app.use(express.static(path.join(__dirname, 'public'))); 

// SIMULASI DATABASE (Data Awal)
let databaseCatering = [
  {
    id: 1,
    nama: "Paket Sehat Premium",
    kategori: "Organic Food",
    harga: "50000",
    deskripsi: "Nasi merah, dada ayam panggang, salad segar, dan jus buah.",
    gambar: ""
  }
];

// Socket.IO Connection Listener
io.on('connection', (socket) => {
    console.log(`User terhubung dengan ID: ${socket.id}`);
});

// ==========================================
// API ROUTES (CRUD)
// ==========================================

// 1. READ ALL (Ambil Semua Data)
app.get('/api/menu', (req, res) => {
    res.json(databaseCatering); 
});

// 2. CREATE (Tambah Data Baru)
app.post('/api/menu', (req, res) => {
    const { nama, kategori, harga, deskripsi, gambar } = req.body;
    const menuBaru = { id: Date.now(), nama, kategori, harga, deskripsi, gambar: gambar || "" };
    databaseCatering.push(menuBaru);

    // KUNCI REAL-TIME: Siarkan sinyal perubahan data ke semua browser aktif
    io.emit('menuUpdated');

    res.status(201).json({ message: "Menu berhasil ditambahkan!", data: menuBaru });
});

// 3. UPDATE (Perbarui Data Berdasarkan ID)
app.put('/api/menu/:id', (req, res) => {
    const idMenu = parseInt(req.params.id);
    const { nama, kategori, harga, deskripsi, gambar } = req.body;
    let menu = databaseCatering.find(item => item.id === idMenu);
    
    if (menu) {
        menu.nama = nama;
        menu.kategori = kategori;
        menu.harga = harga;
        menu.deskripsi = deskripsi;
        if (gambar) menu.gambar = gambar; // Perbarui gambar jika admin mengunggah baru

        // KUNCI REAL-TIME: Siarkan sinyal perubahan data
        io.emit('menuUpdated');

        res.json({ message: "Menu berhasil diperbarui!", data: menu });
    } else {
        res.status(404).json({ message: "Menu tidak ditemukan" });
    }
});

// 4. DELETE (Hapus Data Berdasarkan ID)
app.delete('/api/menu/:id', (req, res) => {
    const idMenu = parseInt(req.params.id);
    databaseCatering = databaseCatering.filter(item => item.id !== idMenu);

    // KUNCI REAL-TIME: Siarkan sinyal perubahan data
    io.emit('menuUpdated');

    res.json({ message: "Menu berhasil dihapus!" });
});

// Jaring Pengaman 404
app.use((req, res) => {
    res.status(404).send('Maaf, halaman tidak ditemukan!');
});

// Jalankan Server via variabel http server
server.listen(PORT, () => {
    console.log(`Server Catering berjalan di http://localhost:${PORT}`);
});