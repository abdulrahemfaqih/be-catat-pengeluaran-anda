const HistoryPengeluaran = require("../models/HistoryPengeluaran");
const Transaction = require("../models/Transaction");

const saveMonthlyHistory = async (req, res) => {
   const { month, year } = req.body;
   const userId = req.user.userId;
   try {
      const transactions = await Transaction.find({
         userId,
         date: {
            $gte: new Date(year, month - 1, 1),
            $lt: new Date(year, month, 1),
         },
      });

      const totals = {
         Makanan: 0,
         Transportasi: 0,
         Kesehatan: 0,
         Pendidikan: 0,
         Lainnya: 0,
         Hiburan: 0,
         "Kebutuhan Pribadi": 0
      };
      transactions.forEach((tx) => {
         if (totals[tx.category] !== undefined) {
            totals[tx.category] += tx.amount;
         }
      });

      const history = new HistoryPengeluaran({ userId, month, year, totals });
      await history.save();
      res.json({ message: "History pengeluaran berhasil disimpan", history });
   } catch (error) {
      res.status(500).json({ message: "Server error", error });
   }
};

const getMonthlyHistory = async (req, res) => {
   const userId = req.user.userId;
   try {
      const histories = await HistoryPengeluaran.find({ userId }).sort({
         year: -1,
         month: -1,
      });
      res.json(histories);
   } catch (error) {
      res.status(500).json({ message: "Server error", error });
   }
};


const deleteMonthlyHistory = async (req, res) => {
   try {
      const { id } = req.params;
      const userId = req.user.userId;

      const history = await HistoryPengeluaran.findOneAndDelete({
         _id: id,
         userId,
      });

      if (!history) {
         return res.status(404).json({ message: "History tidak ditemukan" });
      }

      res.json({ message: "History pengeluaran berhasil dihapus", id });
   } catch (error) {
      res.status(500).json({ message: "Server error", error });
   }
};

module.exports = {
   saveMonthlyHistory,
   getMonthlyHistory,
   deleteMonthlyHistory, // export
};
