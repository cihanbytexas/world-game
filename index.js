const express = require("express");
const app = express();
app.use(express.json());

// Türkçe kelime listesi (5 harfli)
const kelimeler = ["alarm", "masa", "kalem", "araba", "evler", "kargo", "kitap", "tahta", "çorap", "bardak"];

// Günlük kelimeyi seç (günün tarihi ile index belirler)
function gunlukKelime() {
    const tarih = new Date();
    const index = tarih.getFullYear() * 365 + tarih.getMonth() * 30 + tarih.getDate();
    return kelimeler[index % kelimeler.length];
}

app.get("/", (req, res) => {
    res.json({ mesaj: "Kelime Oyunu API çalışıyor!", kelimeUzunlugu: 5 });
});

app.post("/tahmin", (req, res) => {
    const { tahmin } = req.body;
    const kelime = gunlukKelime();

    if (!tahmin || tahmin.length !== kelime.length) {
        return res.status(400).json({ hata: `Tahmin ${kelime.length} harfli olmalı.` });
    }

    let sonuc = [];
    for (let i = 0; i < kelime.length; i++) {
        if (tahmin[i] === kelime[i]) {
            sonuc.push("✅");
        } else if (kelime.includes(tahmin[i])) {
            sonuc.push("⚠️");
        } else {
            sonuc.push("❌");
        }
    }

    res.json({ tahmin, sonuc });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API ${PORT} portunda çalışıyor`));
