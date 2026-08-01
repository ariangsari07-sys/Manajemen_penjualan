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
// Hitung Harga/Pcs
function hitungHarga(){
    let harga = Number(hargaBeli.value);
    let qty = Number(jumlah.value);
    if(harga && qty){
        hargaPerPcs.value = Math.round(harga / qty);
    }
}

hargaBeli.addEventListener("input", hitungHarga);
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
                    <button class="edit" data-id="${barang.id}">
                        <i class="fa-solid fa-pen"></i>
                    </button>

                    <button class="hapus" data-id="${barang.id}">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });

    }catch(error){
        console.error("Gagal mengambil data:", error);
    }
}

ambilData();

// Edit
tbody.addEventListener("click", async (e) => {

    if (!e.target.closest(".edit")) return;

    const id = e.target.closest(".edit").dataset.id;

    const res = await fetch(API);
    const data = await res.json();

    const barang = data.find(item => item.id == id);

    if (!barang) return;

    document.getElementById("nama_barang").value = barang.nama_barang;
    document.getElementById("harga_beli").value = barang.harga_beli;
    document.getElementById("jumlah").value = barang.jumlah;
    document.getElementById("harga_per_pcs").value = barang.harga_per_pcs;
    document.getElementById("stok").value = barang.stok;

    modal.classList.add("show");
    editId = barang.id;
});

// ======================
// Hapus Barang
// ======================

tbody.addEventListener("click", async (e) => {

    if (!e.target.closest(".hapus")) return;

    const id = e.target.closest(".hapus").dataset.id;

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
        harga_beli: Number(document.getElementById("harga_beli").value),
        jumlah: Number(document.getElementById("jumlah").value),
        harga_per_pcs: Number(document.getElementById("harga_per_pcs").value),
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