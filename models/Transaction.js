const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
   },
   name: { type: String, required: true },
   category: {
      type: String,
      enum: ["Makanan", "Transportasi", "Darurat", "Tabungan"],
      required: true,
   },
   amount: { type: Number, required: true },
   date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Transaction", TransactionSchema);
