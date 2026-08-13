// ================= MENU ACTIVE =================
const menu = document.querySelectorAll(".menu a");

menu.forEach(item => {
    item.addEventListener("click", function(){
        menu.forEach(m => m.classList.remove("active"));
        this.classList.add("active");
    });
});

const API = "http://localhost:3000/barang";
const form = document.getElementById("formBarang");
const tbody = document.getElementById("tbody");
const tableBox = document.querySelector(".table-box");
const modal = document.getElementById("modal");
const btnTambah = document.getElementById("btnTambah");
const btnBatal = document.querySelector(".batal");
const hargaBeli = document.getElementById("harga_beli");
const jumlah = document.getElementById("jumlah");
const hargaPerPcs = document.getElementById("harga_per_pcs");
let editId = null;

const modalTambahStok = document.getElementById("modalTambahStok");
const formTambahStok = document.getElementById("formTambahStok");
const namaStok = document.getElementById("namaStok");
const stokSaatIni = document.getElementById("stokSaatIni");
const jumlahBeli = document.getElementById("jumlahBeli");
const hargaPembelian = document.getElementById("hargaPembelian");
const btnBatalTambahStok = document.querySelector(".batalTambahStok");
let tambahStokId = null;

const modalPenyesuaian = document.getElementById("modalPenyesuaian");
const formPenyesuaian = document.getElementById("formPenyesuaian");
const namaPenyesuaian = document.getElementById("namaPenyesuaian");
const stokPenyesuaian = document.getElementById("stokPenyesuaian");
const alasanPenyesuaian = document.getElementById("alasanPenyesuaian");
const keteranganBox = document.getElementById("keteranganBox");
const keteranganPenyesuaian = document.getElementById("keteranganPenyesuaian");
const jumlahPenyesuaian = document.getElementById("jumlahPenyesuaian");
const btnBatalPenyesuaian = document.querySelector(".batalPenyesuaian");
let penyesuaianId = null;

// Hitung Harga/Pcs
function formatRupiah(angka){

    angka = angka.replace(/\D/g, "");

    if(angka === "") return "";

    return "Rp" + Number(angka).toLocaleString("id-ID");

}

function hitungHarga(){

    let harga = Number(
        hargaBeli.value.replace(/\D/g,"")
    );

    let qty = Number(jumlah.value);

    if(harga && qty){

        hargaPerPcs.value = formatRupiah(
            Math.round(harga / qty).toString()
        );

    }else{

        hargaPerPcs.value = "";

    }

}

hargaBeli.addEventListener("input", function(){

    const angka = this.value.replace(/\D/g, "");

    this.value = formatRupiah(angka);

    hitungHarga();

});

jumlah.addEventListener("input", hitungHarga);

// Ambil Data
async function ambilData(){
    try{
        const res = await fetch(API);
        const data = await res.json();
        tbody.innerHTML = "";

        if(data.length === 0){
            return;
        }

    data.forEach((barang,index)=>{
        let status = "🟢 Aman";

        if(barang.stok == 0){
            status = "⚫ Habis"
        }
        else if(barang.stok <= 10){
            status = "🔴 Hampir Habis";

        }else if(barang.stok <= 30){
            status = "🟡 Menipis";
        }

        tbody.innerHTML += `
            <tr>
                <td>${index+1}</td>
                <td>${barang.nama_barang}</td>
                <td>Rp ${Number(barang.harga_beli).toLocaleString("id-ID")}</td>
                <td>${barang.jumlah}</td>
                <td>Rp ${Number(barang.harga_per_pcs).toLocaleString("id-ID")}</td>
                <td>${barang.stok}</td>
                <td>${status}</td>
                <td>
                    <div class="aksi-menu">

                        <button class="btn-menu">
                            <i class="fa-solid fa-ellipsis-vertical"></i>
                        </button>

                        <div class="dropdown-menu">

                            <button class="menu-edit" data-id="${barang.id}">
                                ✏️ Edit
                            </button>

                            <button class="tambah-stok" data-id="${barang.id}">
                                📦 Tambah Stok
                            </button>

                            <button class="penyesuaian-stok" data-id="${barang.id}">
                                📉 Penyesuaian Stok
                            </button>

                            <button class="menu-hapus" data-id="${barang.id}">
                                🗑️ Hapus
                            </button>

                        </div>

                    </div>

                </td>
            </tr>
        `;
    });

    }catch(error){
        console.error("Gagal mengambil data:", error);
    }
}

ambilData();

// Aksi ⋮
document.addEventListener("click", (e)=>{
    document.querySelectorAll(".dropdown-menu").forEach(menu=>{
        menu.classList.remove("show");
    });

    const tombol = e.target.closest(".btn-menu");

    if(tombol){
        e.stopPropagation();
        tombol.nextElementSibling.classList.toggle("show");
    }

});

// Edit
tbody.addEventListener("click", async (e) => {

    if (!e.target.closest(".menu-edit")) return;

    const id = e.target.closest(".menu-edit").dataset.id;
    const res = await fetch(API);
    const data = await res.json();
    const barang = data.find(item => item.id == id);

    if (!barang) return;

    document.getElementById("nama_barang").value = barang.nama_barang;
    document.getElementById("harga_beli").value = formatRupiah(barang.harga_beli.toString());
    document.getElementById("jumlah").value = barang.jumlah;
    document.getElementById("harga_per_pcs").value = formatRupiah(barang.harga_per_pcs.toString());
    document.getElementById("stok").value = barang.stok;

    modal.classList.add("show");
    editId = barang.id;
});

// Tambah Stok
tbody.addEventListener("click", async (e) => {

    if (!e.target.closest(".tambah-stok")) return;

    const id = e.target.closest(".tambah-stok").dataset.id;
    const res = await fetch(API);
    const data = await res.json();
    const barang = data.find(item => item.id == id);

    if (!barang) return;

    tambahStokId = barang.id;
    namaStok.value = barang.nama_barang;
    stokSaatIni.value = barang.stok;
    jumlahBeli.value = "";
    hargaPembelian.value = "";
    modalTambahStok.classList.add("show");
});

// Simpan Tambah Stok
formTambahStok.addEventListener("submit", async (e) => {
    e.preventDefault();

    const jumlah = Number(jumlahBeli.value);
    const hargaTotal = Number(hargaPembelian.value.replace(/\D/g, ""));

    if (jumlah <= 0 || hargaTotal <= 0) {
        alert("Jumlah dan harga pembelian harus diisi.");
        return;
    }

    // Ambil data bahan terbaru
    const res = await fetch(API);
    const data = await res.json();
    const barang = data.find(item => item.id == tambahStokId);

    if (!barang) {
        alert("Data bahan tidak ditemukan.");
        return;
    }

    // Hitung harga / pcs dari pembelian baru
    const hargaPerPcsBaru = hargaTotal / jumlah;

    // Stok baru
    const stokBaru = Number(barang.stok) + jumlah;

    // Harga / pcs yang sekarang
    let hargaPerPcs = Number(barang.harga_per_pcs);

    // Jika harga baru lebih mahal
    if (hargaPerPcsBaru > hargaPerPcs) {

        const ubahHarga = confirm(
            `Harga / pcs baru adalah Rp ${hargaPerPcsBaru.toLocaleString("id-ID")}.\n\n` +
            `Harga / pcs saat ini adalah Rp ${hargaPerPcs.toLocaleString("id-ID")}.\n\n` +
            `Harga baru lebih mahal. Ubah harga / pcs bahan menjadi harga baru?`
        );

        if (ubahHarga) {
            hargaPerPcs = hargaPerPcsBaru;
        }
    }

    // Update data bahan
    const barangUpdate = {
        ...barang,
        stok: stokBaru,
        harga_per_pcs: hargaPerPcs
    };

    await fetch(`${API}/${tambahStokId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(barangUpdate)
    });

    alert("Stok berhasil ditambahkan.");

    formTambahStok.reset();
    modalTambahStok.classList.remove("show");
    tambahStokId = null;

    ambilData();
});

btnBatalTambahStok.addEventListener("click", () => {
    formTambahStok.reset();
    modalTambahStok.classList.remove("show");
    tambahStokId = null;
});

// Penyesuaian Stok
tbody.addEventListener("click", async (e) => {

    if (!e.target.closest(".penyesuaian-stok")) return;

    const id =
        e.target.closest(".penyesuaian-stok").dataset.id;

    const res = await fetch(API);
    const data = await res.json();
    const barang = data.find(item => item.id == id);

    if (!barang) return;

    penyesuaianId = barang.id;
    namaPenyesuaian.value = barang.nama_barang;
    stokPenyesuaian.value = barang.stok;
    alasanPenyesuaian.value = "";
    keteranganPenyesuaian.value = "";
    jumlahPenyesuaian.value = "";
    keteranganBox.style.display = "none";
    modalPenyesuaian.classList.add("show");
});

alasanPenyesuaian.addEventListener("change", () => {
    if (alasanPenyesuaian.value === "Lainnya") {
        keteranganBox.style.display = "block";
        keteranganPenyesuaian.required = true;

    } else {
        keteranganBox.style.display = "none";
        keteranganPenyesuaian.required = false;
        keteranganPenyesuaian.value = "";
    }
});

btnBatalPenyesuaian.addEventListener("click", () => {
    formPenyesuaian.reset();
    keteranganBox.style.display = "none";
    keteranganPenyesuaian.required = false;
    modalPenyesuaian.classList.remove("show");
    penyesuaianId = null;
});

// Hapus Barang
tbody.addEventListener("click", async (e) => {

    if (!e.target.closest(".menu-hapus")) return;

    const id = e.target.closest(".menu-hapus").dataset.id;
    const yakin = confirm("Yakin ingin menghapus bahan ini?");

    if (!yakin) return;

    await fetch(`${API}/${id}`, {
        method: "DELETE"
    });

    alert("Data berhasil dihapus.");
    ambilData();
});

// Simpan
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const barang = {
        nama_barang: document.getElementById("nama_barang").value,
        harga_beli: Number(document.getElementById("harga_beli").value.replace(/\D/g,"")),
        jumlah: Number(document.getElementById("jumlah").value),
        harga_per_pcs: Number(document.getElementById("harga_per_pcs").value.replace(/\D/g, "")),
        stok: Number(document.getElementById("stok").value)
    };

    if (editId == null) {

        // Tambah data
        await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(barang)
        });

        alert("Data berhasil ditambahkan.");

    } else {

        // Edit data
        await fetch(`${API}/${editId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(barang)
        });

        alert("Data berhasil diperbarui.");

        editId = null;
    }

    form.reset();
    hargaPerPcs.value = "";
    modal.classList.remove("show");

    ambilData();
});

// Modal
btnTambah.addEventListener("click", () => {
    modal.classList.add("show");
});

// Batal
btnBatal.addEventListener("click", () => {
    form.reset();
    hargaPerPcs.value = "";
    modal.classList.remove("show");
});