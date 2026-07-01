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
const emptyState = document.getElementById("emptyState");
const modal = document.getElementById("modal");
const btnTambah = document.getElementById("btnTambah");
const btnTambah2 = document.getElementById("btnTambah2");
const btnBatal = document.querySelector(".batal");
const hargaBeli = document.getElementById("harga_beli");
const jumlah = document.getElementById("jumlah");
const hargaPerPcs = document.getElementById("harga_per_pcs");

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
            tableBox.style.display = "none";
            emptyState.style.display = "flex";
            return;
        }

        tableBox.style.display = "block";
        emptyState.style.display = "none";

        data.forEach((barang,index)=>{
            tbody.innerHTML += `
            <tr>
                <td>${index+1}</td>
                <td>${barang.nama_barang}</td>
                <td>${barang.kategori}</td>
                <td>Rp ${Number(barang.harga_beli).toLocaleString("id-ID")}</td>
                <td>${barang.jumlah}</td>
                <td>${barang.satuan}</td>
                <td>Rp ${Number(barang.harga_per_pcs).toLocaleString("id-ID")}</td>
                <td>${barang.stok}</td>
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

// Simpan
form.addEventListener("submit",async(e)=>{
    e.preventDefault();
    const barang={
        nama_barang:document.getElementById("nama_barang").value,
        kategori:document.getElementById("kategori").value,
        harga_beli:Number(document.getElementById("harga_beli").value),
        jumlah:Number(document.getElementById("jumlah").value),
        satuan:document.getElementById("satuan").value,
        harga_per_pcs:Number(document.getElementById("harga_per_pcs").value)
    };

    await fetch(API,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(barang)
    });

    alert("Data berhasil ditambahkan.");
    form.reset();
    hargaPerPcs.value="";
    ambilData();
});

// Modal
btnTambah.addEventListener("click", () => {
    modal.classList.add("show");
});

btnTambah2.addEventListener("click", () => {
    modal.classList.add("show");
});

btnBatal.addEventListener("click", () => {
    modal.classList.remove("show");
});