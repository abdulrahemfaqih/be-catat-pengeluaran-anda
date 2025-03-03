const mongoose = require("mongoose");

const BudgetSchema = new mongoose.Schema({
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
   },
   category: {
      type: String,
      enum: ["Makanan", "Transportasi", "Hiburan", "Kehsehatan", "Pendidikan", "Kebutuhan Pribadi"],
      required: true,
   },
   budget: { type: Number, required: true },
});

module.exports = mongoose.model("Budget", BudgetSchema);
