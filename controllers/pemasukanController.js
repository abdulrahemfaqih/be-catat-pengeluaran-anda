const Pemasukan = require("../models/Pemasukan");

const upsertMonthlyIncome = async (req, res) => {
   const { month, year, amount } = req.body;
   const userId = req.user.userId;
   try {
      let pemasukan = await Pemasukan.findOne({ userId, month, year });
      if (pemasukan) {
         pemasukan.amount = amount;
         pemasukan.updatedAt = Date.now();
         await pemasukan.save();
      } else {
         pemasukan = new Pemasukan({ userId, month, year, amount });
         await pemasukan.save();
      }
      res.json({ message: "Pemasukan bulanan berhasil disimpan", pemasukan });
   } catch (error) {
      res.status(500).json({ message: "Server error", error });
   }
};

const getMonthlyIncome = async (req, res) => {
   const userId = req.user.userId;
   try {
      const incomes = await Pemasukan.find({ userId }).sort({
         year: -1,
         month: -1,
      });
      res.json(incomes);
   } catch (error) {
      res.status(500).json({ message: "Server error", error });
   }
};

module.exports = { upsertMonthlyIncome, getMonthlyIncome };
