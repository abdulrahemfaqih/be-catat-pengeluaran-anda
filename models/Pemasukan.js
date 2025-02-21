const mongoose = require("mongoose");

const PemasukanSchema = new mongoose.Schema({
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
   },
   month: { type: Number, required: true },
   year: { type: Number, required: true },
   amount: { type: Number, required: true },
   updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Pemasukan", PemasukanSchema);
