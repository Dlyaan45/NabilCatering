# NabilCatering

Web app untuk katalog menu dan pemesanan Nabil Catering, lengkap dengan dashboard manajemen internal untuk admin.

---

## Tim Pengembang (Kelompok 25 - Kelas F)

Project ini disusun dan dikembangkan oleh:

| No | Nama | NIM |
| :--- | :--- | :--- |
| 1 | Moh Nur Septian | 202451174 |
| 2 | M. Adlie Adi Ananva | 202451162 |
| 3 | Nabil Hamid Fanani | 202451157 |
| 4 | Shafi Wildan Sya'bana | 202451185 |

---

## Fitur Utama

* **Landing Page & Katalog Menu (`public/index.html`)** Halaman utama pelanggan untuk melihat daftar paket catering, detail harga, dan akses langsung ke form pemesanan. Desain sudah responsif (rapi di HP maupun laptop).
    
* **Autentikasi Admin (`public/loginpack/`)** Halaman login khusus untuk membatasi akses ke dashboard agar tidak bisa dimasuki oleh sembarang user.

* **Dashboard Kelola (`public/admin.html`)** Panel khusus admin yang berfungsi untuk memantau pesanan masuk serta memperbarui data katalog menu.

---

## Teknologi

Project ini dibuat dengan arsitektur yang ringan agar performa loading website cepat:

* **Frontend:** HTML5, CSS3, dan Vanilla JavaScript (JS murni tanpa framework).
* **Fitur JS:** Menggunakan DOM Manipulation untuk interaksi halaman (pop-up/validasi form) dan Fetch API untuk persiapan alur data.
* **Environment:** Node.js & NPM untuk manajemen dependensi via `package.json`.
* **Deployment:** Menggunakan Cloudflare Wrangler untuk kebutuhan deploy ke Cloudflare Pages/Workers.

---

## Struktur Folder

```text
├── .wrangler/              # Folder build cache lokal Cloudflare (otomatis diabaikan Git)
├── public/                 # Source code utama website
│   ├── loginpack/          # File login form & logic untuk admin
│   ├── sources/            # Aset gambar, logo, dan foto menu
│   ├── index.html          # Halaman utama user
│   ├── index.js            # Logic halaman utama
│   ├── admin.html          # Halaman utama admin
│   ├── admin.css           # Styling halaman admin
│   └── admin.js            # Logic halaman admin
├── package.json            # Konfigurasi dependensi & script project
├── package-lock.json       # Pengunci versi library/dependensi Node.js
└── .gitignore              # Daftar file/folder yang diabaikan Git (seperti node_modules, dist, .wrangler)

```

---

## Panduan Instalasi & Menjalankan di Lokal

Ikuti langkah berikut untuk menjalankan project ini di komputer Anda:

### Prerequisites

Pastikan komputer sudah terinstal **Node.js**. Jika belum, silakan download di [nodejs.org](https://nodejs.org/).

### 1. Clone Project

Buka terminal / command prompt, lalu jalankan perintah berikut:

```bash
git clone [https://github.com/Dlyaan45/NabilCatering.git](https://github.com/Dlyaan45/NabilCatering.git)
cd NabilCatering

```

### 2. Install Dependencies

Unduh semua library yang dibutuhkan dengan perintah:

```bash
npm install

```

### 3. Jalankan Website

Untuk menjalankan lokal server, gunakan perintah:

```bash
npm start

```

Setelah jalan, buka browser dan akses alamat lokal yang tertera di terminal (biasanya `http://localhost:3000` atau port Cloudflare Wrangler Anda).

> **Catatan:** Karena project ini menggunakan Vanilla JS, Anda juga bisa langsung membuka file `public/index.html` langsung di browser untuk preview tampilan secara instan tanpa perlu menjalankan server.

```

```
