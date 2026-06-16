const socket = io(); 
let editId = null;

async function getMenusFromServer() {
  try {
    const response = await fetch('/api/menu');
    return await response.json();
  } catch (error) {
    return [];
  }
}

async function renderTable() {
  const tbody = document.querySelector('table tbody');
  if (!tbody) return;

  const data = await getMenusFromServer();
  if (data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;">Belum ada menu catering.</td></tr>`;
    return;
  }

  tbody.innerHTML = data.map(item => `
    <tr>
      <td>
        ${item.gambar 
          ? `<img src="${item.gambar}" style="width:60px;height:60px;object-fit:cover;border-radius:6px;">` 
          : `<div style="background:#e0e0e0;width:60px;height:60px;line-height:60px;text-align:center;border-radius:6px;font-size:10px;">No Img</div>`}
      </td>
      <td><strong>${item.nama}</strong></td>
      <td>${item.kategori}</td>
      <td>Rp ${parseInt(item.harga).toLocaleString('id-ID')}</td>
      <td>${item.deskripsi}</td>
      <td>
        <button class="btn btn-edit" data-id="${item.id}">Edit</button>
        <button class="btn btn-delete" data-id="${item.id}">Hapus</button>
      </td>
    </tr>
  `).join('');
}

function openModal(mode, id = null) {
  const modal = document.getElementById('crudModal');
  const title = document.getElementById('modalTitle');
  const form = document.getElementById('menuForm');
  form.reset();
  editId = null;

  if (mode === 'edit') {
    getMenusFromServer().then(menus => {
      const menu = menus.find(m => m.id === id);
      if (!menu) return;
      editId = id;
      title.textContent = 'Edit Menu';
      document.getElementById('foodName').value = menu.nama;
      document.getElementById('foodCategory').value = menu.kategori;
      document.getElementById('foodPrice').value = menu.harga;
      document.getElementById('foodDesc').value = menu.deskripsi;
    });
  } else {
    title.textContent = 'Tambah Menu Baru';
  }
  modal.classList.add('active');
}

function closeModal() {
  document.getElementById('crudModal').classList.remove('active');
  editId = null;
}

function saveData(e) {
  e.preventDefault();
  const nama = document.getElementById('foodName').value.trim();
  const kategori = document.getElementById('foodCategory').value.trim();
  const harga = document.getElementById('foodPrice').value;
  const deskripsi = document.getElementById('foodDesc').value.trim();
  const fileInput = document.getElementById('foodImg');

  const sendPayload = async (gambarBase64) => {
    const payload = { nama, kategori, harga, deskripsi, gambar: gambarBase64 || '' };
    const url = editId ? `/api/menu/${editId}` : '/api/menu';
    const method = editId ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (response.ok) closeModal();
  };

  if (fileInput.files && fileInput.files[0]) {
    const reader = new FileReader();
    reader.onload = (ev) => sendPayload(ev.target.result);
    reader.readAsDataURL(fileInput.files[0]);
  } else {
    sendPayload(null);
  }
}

async function deleteMenu(id) {
  if (confirm('Hapus menu ini?')) {
    await fetch(`/api/menu/${id}`, { method: 'DELETE' });
  }
}

// Menangkap event realtime perubahan data untuk mengupdate tabel admin otomatis
socket.on('menuUpdated', renderTable);

document.addEventListener('DOMContentLoaded', () => {
  renderTable();
  document.getElementById('menuForm').addEventListener('submit', saveData);
  document.getElementById('addMenuBtn').addEventListener('click', () => openModal('add'));
  document.getElementById('closeModalBtn').addEventListener('click', closeModal);
  document.querySelector('table').addEventListener('click', (e) => {
    if (!e.target.dataset.id) return;
    const id = Number(e.target.dataset.id);
    if (e.target.classList.contains('btn-edit')) openModal('edit', id);
    if (e.target.classList.contains('btn-delete')) deleteMenu(id);
  });
});


const logoutBtn = document.querySelector('#btn-logout');

logoutBtn.addEventListener('click', function (e) {
  e.preventDefault(); // mencegah link "#" pindah ke atas halaman

  // Hapus status login yang disimpan saat login tadi
  sessionStorage.removeItem('isLoggedIn');
  sessionStorage.removeItem('role');

  // Arahkan kembali ke halaman utama
  window.location.href = 'index.html';
});