const form = document.querySelector("form");

const namaBarang = document.querySelectorAll("input")[0];
const kategori = document.querySelectorAll("input")[1];
const hargaBeli = document.querySelectorAll("input")[2];
const jumlah = document.querySelectorAll("input")[3];
const hargaPcs = document.querySelectorAll("input")[4];
const satuan = document.querySelector("select");

const tbody = document.querySelector("tbody");

let dataBarang = [];


// =======================
// Hitung Harga / Pcs
// =======================

function hitungHargaPcs(){

    let harga = parseFloat(hargaBeli.value);
    let qty = parseFloat(jumlah.value);

    if(!isNaN(harga) && !isNaN(qty) && qty > 0){

        let hasil = Math.round(harga / qty);

        hargaPcs.value = "Rp " + hasil.toLocaleString("id-ID");

    }else{

        hargaPcs.value = "";

    }

}

hargaBeli.addEventListener("input", hitungHargaPcs);
jumlah.addEventListener("input", hitungHargaPcs);


// =======================
// Render Tabel
// =======================

function tampilData(){

    tbody.innerHTML = "";

    dataBarang.forEach((barang,index)=>{

        tbody.innerHTML += `

        <tr>

            <td>${index+1}</td>

            <td>${barang.nama}</td>

            <td>${barang.kategori}</td>

            <td>Rp ${barang.harga.toLocaleString("id-ID")}</td>

            <td>${barang.jumlah}</td>

            <td>Rp ${barang.hargaPcs.toLocaleString("id-ID")}</td>

            <td>${barang.jumlah}</td>

            <td>

                <button onclick="hapusBarang(${index})">

                    Hapus

                </button>

            </td>

        </tr>

        `;

    });

}


// =======================
// Tambah Barang
// =======================

form.addEventListener("submit",(e)=>{

    e.preventDefault();

    let barang = {

        nama : namaBarang.value,

        kategori : kategori.value,

        harga : Number(hargaBeli.value),

        jumlah : Number(jumlah.value),

        satuan : satuan.value,

        hargaPcs : Math.round(hargaBeli.value / jumlah.value)

    }

    dataBarang.push(barang);

    tampilData();

    form.reset();

    hargaPcs.value="";

});


// =======================
// Hapus
// =======================

function hapusBarang(index){

    dataBarang.splice(index,1);

    tampilData();

}