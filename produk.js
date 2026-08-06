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