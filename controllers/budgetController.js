const Budget = require("../models/Budget");

const getBudgets = async (req, res) => {
   try {
      const budgets = await Budget.find({ userId: req.user.userId });
      res.json(budgets);
   } catch (error) {
      res.status(500).json({ message: "Server error", error });
   }
};

const updateBudget = async (req, res) => {
   try {
      const { id } = req.params;
      const { budget } = req.body;
      const updatedBudget = await Budget.findOneAndUpdate(
         { _id: id, userId: req.user.userId },
         { budget },
         { new: true }
      );
      if (!updatedBudget)
         return res.status(404).json({ message: "Budget tidak ditemukan" });
      res.json({ message: "Budget berhasil diupdate", budget: updatedBudget });
   } catch (error) {
      res.status(500).json({ message: "Server error", error });
   }
};

const createBudget = async (req, res) => {
   try {
      const { category, budget } = req.body;
      const newBudget = new Budget({
         userId: req.user.userId,
         category,
         budget,
      });
      await newBudget.save();
      res.json({ message: "Budget berhasil ditambahkan", budget: newBudget });
   } catch (error) {
      res.status(500).json({ message: "Server error", error });
   }
};

module.exports = { getBudgets, updateBudget, createBudget };
