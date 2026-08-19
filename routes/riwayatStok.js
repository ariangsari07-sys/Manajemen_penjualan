const express = require("express");
const router = express.Router();
const db = require("../db");

// Ambil Semua Riwayat Stok
router.get("/", (req, res) => {
    db.query(
        `SELECT
            riwayat_stok.id,
            riwayat_stok.created_at,
            barang.nama_barang,
            produk.nama_produk,
            riwayat_stok.aktivitas,
            riwayat_stok.jumlah,
            riwayat_stok.keterangan

        FROM riwayat_stok

        LEFT JOIN barang
            ON riwayat_stok.barang_id = barang.id

        LEFT JOIN produk
            ON riwayat_stok.produk_id = produk.id

        ORDER BY riwayat_stok.id DESC`,

        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
            res.json(result);
        }
    );

});

// Tambah Riwayat Stok
router.post("/", (req, res) => {
    const {
        barang_id,
        produk_id,
        aktivitas,
        jumlah,
        keterangan
    } = req.body;

    db.query(
        `INSERT INTO riwayat_stok
        (barang_id, produk_id, aktivitas, jumlah, keterangan)
        VALUES (?, ?, ?, ?, ?)`,
        [
            barang_id,
            produk_id || null,
            aktivitas,
            jumlah,
            keterangan || null
        ],

        (err) => {
            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Riwayat stok berhasil ditambahkan"
            });
        }

    );

});

module.exports = router;