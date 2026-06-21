// Pastikan kode berjalan setelah seluruh komponen HTML selesai dimuat
console.log("Script login.js berhasil dimuat");
document.addEventListener("DOMContentLoaded", function () {
    
    // 1. Ambil elemen form berdasarkan class-nya
    const loginForm = document.querySelector(".login-form");
    console.log("Form ditemukan:", loginForm);

    // Pastikan form-nya ditemukan di halaman sebelum memasang event
    if (loginForm) {
        
        // 2. Cegah form melakukan POST bawaan HTML, ganti dengan logika JS kita
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault(); // <--- INI KUNCI UTAMA MENGHENTIKAN ERROR 404 POST

            // 3. Ambil data input dari user
            const usernameInput = document.getElementById('username').value.trim();
            const passwordInput = document.getElementById('password').value;

            // Kredensial khusus Admin
            const adminUsername = "admin"; 
            const adminPassword = "admin123";

            // 4. Validasi Login
            if (usernameInput === adminUsername && passwordInput === adminPassword) {
                
                // Simpan status session admin
                sessionStorage.setItem('isLoggedIn', 'true');
                sessionStorage.setItem('role', 'admin');

                alert("Login Admin Sukses! Mengalihkan halaman...");

                // 5. Pengalihan rute berdasarkan struktur folder Anda
                // Karena login.html ada di /loginpack/ dan admin.html ada di folder public (induknya)
                window.location.href = '../admin.html';

            } else {
                alert("Username atau Password salah!");
            }
        });
        
    } else {
        console.error("Gagal mendeteksi formulir dengan class '.login-form'. Periksa kembali HTML Anda.");
    }
});