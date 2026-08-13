// ================= MENU ACTIVE =================
const menu = document.querySelectorAll(".menu a");

menu.forEach(item => {
    item.addEventListener("click", function () {
        menu.forEach(m => m.classList.remove("active"));
        this.classList.add("active");
    });
});

// ================= API =================
const API_BARANG = "http://localhost:3000/barang";
const API_PRODUK = "http://localhost:3000/produk";

// ================= ELEMENT =================
const modal = document.getElementById("modalProduk");
const btnTambah = document.getElementById("btnTambahProduk");
const btnBatal = document.querySelector(".batal");
const listBahan = document.getElementById("listBahan");
const form = document.getElementById("formProduk");
const btnTambahBahan = document.getElementById("tambahBahan");

// ================= TAB =================
const btnCustom = document.getElementById("btnCustom");
const btnPaket = document.getElementById("btnPaket");
const thead = document.getElementById("theadProduk");
const tbody = document.getElementById("tbodyProduk");

let jenisProduk = "custom";

// Menyimpan semua data bahan
let semuaBahan = [];

// ================= AMBIL DATA BAHAN =================
async function ambilBahan() {

    try {

        const res = await fetch(API_BARANG);

        semuaBahan = await res.json();

    } catch (err) {

        console.error("Gagal mengambil data bahan", err);

    }

}

ambilBahan();

// ================= TAB =================
btnCustom.addEventListener("click", () => {

    jenisProduk = "custom";

    btnCustom.classList.add("active");
    btnPaket.classList.remove("active");

    tampilCustom();

});

btnPaket.addEventListener("click", () => {

    jenisProduk = "paket";

    btnPaket.classList.add("active");
    btnCustom.classList.remove("active");

    tampilPaket();

});

// ================= BUKA MODAL =================
btnTambah.addEventListener("click", () => {

    form.reset();

    listBahan.innerHTML = "";

    tambahBarisBahan();

    modal.classList.add("show");

});

// ================= TUTUP MODAL =================
btnBatal.addEventListener("click", () => {

    form.reset();

    listBahan.innerHTML = "";

    modal.classList.remove("show");

});

// ================= TOMBOL TAMBAH BAHAN =================
btnTambahBahan.addEventListener("click", tambahBarisBahan);

// ================= TAMBAH BARIS BAHAN =================
function tambahBarisBahan() {

    let option = `<option value="">-- Pilih Bahan --</option>`;

    semuaBahan.forEach(bahan => {

        option += `
            <option value="${bahan.id}">
                ${bahan.nama_barang}
            </option>
        `;

    });

    const div = document.createElement("div");

    div.className = "bahan-item";

    div.innerHTML = `
        <label>Nama Bahan</label>

        <select class="barang" required>
            ${option}
        </select>

        <label>Jumlah Dipakai</label>

        <input
            type="number"
            class="jumlah"
            min="1"
            value="1"
            required>

        <button
            type="button"
            class="hapusBahan">
            Hapus
        </button>
    `;

    listBahan.appendChild(div);

    div.querySelector(".hapusBahan").addEventListener("click", () => {
        div.remove();
    });

}

// ================= CUSTOM =================
function tampilCustom() {

    thead.innerHTML = `
        <tr>
            <th>No</th>
            <th>Nama Produk</th>
            <th>Modal / Tangkai</th>
            <th>Jumlah Bahan</th>
            <th>Aksi</th>
        </tr>
    `;

    tbody.innerHTML = "";

}

// ================= PAKET =================
function tampilPaket() {

    thead.innerHTML = `
        <tr>
            <th>No</th>
            <th>Nama Paket</th>
            <th>Modal</th>
            <th>Harga Jual</th>
            <th>Laba</th>
            <th>Aksi</th>
        </tr>
    `;

    tbody.innerHTML = "";

}

// ================= AWAL =================
tampilCustom();