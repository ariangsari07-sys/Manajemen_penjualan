const express = require("express");
const router = express.Router();
const db = require("../db");


// ======================
// Ambil Semua Barang
// ======================

router.get("/", (req, res) => {

    db.query(
        "SELECT * FROM barang ORDER BY id DESC",
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(result);

        }
    );

});


// ======================
// Tambah Barang
// ======================

router.post("/", (req, res) => {

    const {
        nama_barang,
        kategori,
        harga_beli,
        jumlah,
        satuan,
        harga_per_pcs
    } = req.body;

    db.query(

        `INSERT INTO barang
        (nama_barang,kategori,harga_beli,jumlah,satuan,harga_per_pcs,stok)
        VALUES(?,?,?,?,?,?,?)`,

        [
            nama_barang,
            kategori,
            harga_beli,
            jumlah,
            satuan,
            harga_per_pcs,
            jumlah
        ],

        (err) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Barang berhasil ditambahkan"
            });

        }

    );

});

module.exports = router;

// ======================
// Edit Barang
// ======================

router.put("/:id", (req, res) => {

    const { id } = req.params;

    const {
        nama_barang,
        kategori,
        harga_beli,
        jumlah,
        satuan,
        harga_per_pcs
    } = req.body;

    db.query(

        `UPDATE barang SET
        nama_barang=?,
        kategori=?,
        harga_beli=?,
        jumlah=?,
        satuan=?,
        harga_per_pcs=?,
        stok=?
        WHERE id=?`,

        [
            nama_barang,
            kategori,
            harga_beli,
            jumlah,
            satuan,
            harga_per_pcs,
            jumlah,
            id
        ],

        (err) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Barang berhasil diupdate"
            });

        }

    );

});

// ======================
// Hapus Barang
// ======================

router.delete("/:id", (req, res) => {

    const { id } = req.params;

    db.query(
        "DELETE FROM barang WHERE id=?",
        [id],
        (err) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Barang berhasil dihapus"
            });

        }
    );

});