const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./db");
const barangRoutes = require("./routes/barang");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));
app.use("/barang", barangRoutes);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});