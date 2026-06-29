const API = "http://localhost:3000/barang";

const form = document.getElementById("formBarang");

const tbody = document.getElementById("tbody");

const hargaBeli = document.getElementById("harga_beli");
const jumlah = document.getElementById("jumlah");
const hargaPerPcs = document.getElementById("harga_per_pcs");


// ======================
// Hitung Harga/Pcs
// ======================

function hitungHarga(){

    let harga = Number(hargaBeli.value);
    let qty = Number(jumlah.value);

    if(harga && qty){

        hargaPerPcs.value = Math.round(harga / qty);

    }

}

hargaBeli.addEventListener("input", hitungHarga);
jumlah.addEventListener("input", hitungHarga);


// ======================
// Ambil Data
// ======================

async function ambilData(){

    const res = await fetch(API);

    const data = await res.json();

    tbody.innerHTML="";

    data.forEach((barang,index)=>{

        tbody.innerHTML +=`

        <tr>

            <td>${index+1}</td>

            <td>${barang.nama_barang}</td>

            <td>${barang.kategori}</td>

            <td>Rp ${Number(barang.harga_beli).toLocaleString("id-ID")}</td>

            <td>${barang.jumlah}</td>

            <td>Rp ${Number(barang.harga_per_pcs).toLocaleString("id-ID")}</td>

            <td>${barang.stok}</td>

        </tr>

        `;

    });

}

ambilData();


// ======================
// Simpan
// ======================

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

    form.reset();

    hargaPerPcs.value="";

    ambilData();

});