// admin.js - CRUD Menu Catering dengan realtime sync ke client.js

const channel = new BroadcastChannel('menu_sync');
const STORAGE_KEY = 'menu_catering';

let editId = null;

// ===== Storage Helper =====
function getMenus() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveMenus(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  channel.postMessage({ type: 'update', data });
}

// ===== Modal Handling =====
function openModal(mode, id = null) {
  const modal = document.getElementById('crudModal');
  const title = document.getElementById('modalTitle');
  const form = document.getElementById('menuForm');

  form.reset();
  editId = null;

  if (mode === 'edit') {
    const menu = getMenus().find(m => m.id === id);
    if (!menu) return;

    editId = id;
    title.textContent = 'Edit Menu';
    document.getElementById('foodName').value = menu.nama;
    document.getElementById('foodCategory').value = menu.kategori;
    document.getElementById('foodPrice').value = menu.harga;
    document.getElementById('foodDesc').value = menu.deskripsi;
  } else {
    title.textContent = 'Tambah Menu Baru';
  }

  modal.classList.add('active');
}

function closeModal() {
  document.getElementById('crudModal').classList.remove('active');
  editId = null;
}

// ===== Save (Add/Edit) =====
function saveData(e) {
  e.preventDefault();

  const nama = document.getElementById('foodName').value;
  const kategori = document.getElementById('foodCategory').value;
  const harga = document.getElementById('foodPrice').value;
  const deskripsi = document.getElementById('foodDesc').value;
  const fileInput = document.getElementById('foodImg');

  const finalize = (gambar) => {
    let data = getMenus();

    if (editId) {
      const index = data.findIndex(m => m.id === editId);
      if (index !== -1) {
        data[index] = {
          ...data[index],
          nama, kategori, harga, deskripsi,
          gambar: gambar || data[index].gambar
        };
      }
    } else {
      data.push({
        id: Date.now(),
        nama, kategori, harga, deskripsi,
        gambar: gambar || ''
      });
    }

    saveMenus(data);
    renderTable();
    closeModal();
  };

  if (fileInput.files && fileInput.files[0]) {
    const reader = new FileReader();
    reader.onload = (ev) => finalize(ev.target.result);
    reader.readAsDataURL(fileInput.files[0]);
  } else {
    finalize(null);
  }
}

// ===== Delete =====
function deleteMenu(id) {
  if (!confirm('Hapus menu ini?')) return;
  let data = getMenus();
  data = data.filter(m => m.id !== id);
  saveMenus(data);
  renderTable();
}

// ===== Render Table =====
function renderTable() {
  const tbody = document.querySelector('table tbody');
  if (!tbody) return;

  const data = getMenus();

  if (data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;">Belum ada menu</td></tr>`;
    return;
  }

  tbody.innerHTML = data.map(item => `
    <tr>
      <td>
        ${item.gambar
          ? `<img src="${item.gambar}" alt="${item.nama}" style="width:60px;height:60px;object-fit:cover;border-radius:8px;">`
          : `<div class="img-placeholder">[${item.kategori}]</div>`}
      </td>
      <td><strong>${item.nama}</strong></td>
      <td>${item.kategori}</td>
      <td>Rp${item.harga}/-</td>
      <td>${item.deskripsi}</td>
      <td>
        <button class="btn btn-edit" onclick="openModal('edit', ${item.id})">Edit</button>
        <button class="btn btn-delete" onclick="deleteMenu(${item.id})">Hapus</button>
      </td>
    </tr>
  `).join('');
}

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
  renderTable();
});