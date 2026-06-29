const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "manajemen_penjualan"
});

db.connect((err) => {

    if(err){
        console.log("Koneksi Gagal");
        console.log(err);
        return;
    }

    console.log("MySQL Connected");
});

module.exports = db;