const mongoose = require("mongoose");

const HistoryPengeluaranSchema = new mongoose.Schema({
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
   },
   month: { type: Number, required: true },
   year: { type: Number, required: true },
   totals: {
      Makanan: { type: Number, default: 0 },
      Transportasi: { type: Number, default: 0 },
      "Kebutuhan Pribadi": { type: Number, default: 0 },
      Hiburan: { type: Number, default: 0 },
      Kesehatan: { type: Number, default: 0 },
      Pendidikan: { type: Number, default: 0 },
      
   },
   createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("HistoryPengeluaran", HistoryPengeluaranSchema);
