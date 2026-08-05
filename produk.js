// ================= MENU ACTIVE =================
const menu = document.querySelectorAll(".menu a");

menu.forEach(item => {
    item.addEventListener("click", function () {
        menu.forEach(m => m.classList.remove("active"));
        this.classList.add("active");
    });
});

// API
const API_BARANG = "http://localhost:3000/barang";
const API_PRODUK = "http://localhost:3000/produk";

// Element
const modal = document.getElementById("modalProduk");
const btnTambah = document.getElementById("btnTambahProduk");
const btnBatal = document.querySelector(".batal");

const listBahan = document.getElementById("listBahan");

// Buka Modal
btnTambah.addEventListener("click", () => {
    modal.classList.add("show");
});

// Tutup Modal
btnBatal.addEventListener("click", () => {
    document.getElementById("formProduk").reset();
    listBahan.innerHTML = "";
    modal.classList.remove("show");
});