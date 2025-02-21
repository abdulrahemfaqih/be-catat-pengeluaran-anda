const Transaction = require("../models/Transaction");

const getTransactions = async (req, res) => {
   try {
      const transactions = await Transaction.find({
         userId: req.user.userId,
      }).sort({ date: -1 });
      res.json(transactions);
   } catch (error) {
      res.status(500).json({ message: "Server error", error });
   }
};

const createTransaction = async (req, res) => {
   try {
      const { name, category, amount, date } = req.body;
      const newTransaction = new Transaction({
         userId: req.user.userId,
         name,
         category,
         amount,
         date,
      });
      await newTransaction.save();
      res.json({
         message: "Transaksi berhasil ditambahkan",
         transaction: newTransaction,
      });
   } catch (error) {
      res.status(500).json({ message: "Server error", error });
   }
};

const updateTransaction = async (req, res) => {
   try {
      const { id } = req.params;
      const { name, category, amount, date } = req.body;
      const updatedTransaction = await Transaction.findOneAndUpdate(
         { _id: id, userId: req.user.userId },
         { name, category, amount, date },
         { new: true }
      );
      if (!updatedTransaction)
         return res.status(404).json({ message: "Transaksi tidak ditemukan" });
      res.json({
         message: "Transaksi berhasil diupdate",
         transaction: updatedTransaction,
      });
   } catch (error) {
      res.status(500).json({ message: "Server error", error });
   }
};

const deleteTransaction = async (req, res) => {
   try {
      const { id } = req.params;
      const deleted = await Transaction.findOneAndDelete({
         _id: id,
         userId: req.user.userId,
      });
      if (!deleted)
         return res.status(404).json({ message: "Transaksi tidak ditemukan" });
      res.json({ message: "Transaksi berhasil dihapus" });
   } catch (error) {
      res.status(500).json({ message: "Server error", error });
   }
};

module.exports = {
   getTransactions,
   createTransaction,
   updateTransaction,
   deleteTransaction,
};
