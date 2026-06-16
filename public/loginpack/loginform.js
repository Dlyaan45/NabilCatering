function showForm(id, btn){
    document.querySelectorAll('.form').forEach(el=>el.classList.remove('active'));
    document.querySelectorAll('.tabs button').forEach(el=>el.classList.remove('active'));

    document.getElementById(id).classList.add('active');
    btn.classList.add('active');

    // Sembunyikan alert setiap kali pindah tab
    document.getElementById('alertMessage').style.display = 'none';
}

// Fungsi pembantu untuk memunculkan pesan (hilang otomatis dalam 3 detik)
function showAlert(message, type) {
    const alertBox = document.getElementById('alertMessage');
    alertBox.textContent = message;
    alertBox.className = `alert alert-${type}`;
    alertBox.style.display = 'block';

    setTimeout(() => {
        alertBox.style.display = 'none';
    }, 3000);
}

// LOGIKA PROSES LOGIN ADMIN
function handleLogin(event) {
    event.preventDefault(); // Mencegah halaman reload otomatis

    const usernameInput = document.getElementById('loginUsername').value.trim();
    const passwordInput = document.getElementById('loginPassword').value;

    // Kredensial khusus Admin (Bisa kamu ganti sesuai keinginan)
    const adminUsername = "admin"; 
    const adminPassword = "admin123";

    if (usernameInput === adminUsername && passwordInput === adminPassword) {
        showAlert("Login Admin Sukses!", "success");
        
        // Simpan status session admin
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('role', 'admin');

        // Pindah ke admin.html yang berada di LUAR folder loginpack (mundur 1 folder dengan ../)
        setTimeout(() => {
            window.location.href = '../admin.html';
        }, 1000);

    } else {
        // Logika untuk User Biasa jika username/password bukan admin
        // Di sini langsung disimulasikan berhasil login ke index.html utama
        showAlert("Login Berhasil! Selamat datang.", "success");
        
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('role', 'user');

        setTimeout(() => {
            // Jika index.html juga di luar folder, gunakan '../index.html'
            window.location.href = '../index.html'; 
        }, 1500);
    }
}


// LOGIKA PROSES REGISTER (Hanya untuk User Biasa)
function handleRegister(event) {
    event.preventDefault();
    
    showAlert("Registrasi Berhasil! Silakan login.", "success");
    document.getElementById('register').reset();

    // Otomatis pindah ke tab login setelah 2 detik
    setTimeout(() => {
        showForm('login', document.querySelectorAll('.tabs button')[0]);
    }, 2000);
}