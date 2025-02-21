// models/HistoryPengeluaran.js
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
      Darurat: { type: Number, default: 0 },
      Tabungan: { type: Number, default: 0 },
   },
   createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("HistoryPengeluaran", HistoryPengeluaranSchema);
