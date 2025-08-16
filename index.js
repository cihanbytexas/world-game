const express = require("express");
const kelimeler = require("./kelimeler");
const app = express();
app.use(express.json());

// Ana test endpoint
app.get("/", (req, res) => {
  res.json({ mesaj: "Kelime API çalışıyor ✅", toplamKelimeler: kelimeler.length });
});

// Kelime kontrol endpoint
app.post("/kontrol", (req, res) => {
  const { kelime } = req.body;

  // Kelime gönderilmiş mi?
  if (!kelime) {
    return res.status(400).json({ hata: "Kelime göndermelisin." });
  }

  // Tek kelime mi?
  if (kelime.trim().split(" ").length > 1) {
    return res.status(400).json({ hata: "Sadece tek kelime yazmalısın." });
  }

  // Sadece harflerden oluşuyor mu?
  if (!/^[a-zçğıöşü]+$/i.test(kelime)) {
    return res.status(400).json({ hata: "Kelime yalnızca harflerden oluşmalı." });
  }

  // Listede var mı?
  if (!kelimeler.includes(kelime.toLowerCase())) {
    return res.status(404).json({ hata: "Böyle bir kelime yok." });
  }

  // Başarılı cevap
  res.json({ kelime, mesaj: "Kelime bulundu ✅" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API ${PORT} portunda çalışıyor`));
