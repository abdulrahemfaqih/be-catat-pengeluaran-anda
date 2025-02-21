const express = require("express");
const {
   getBudgets,
   updateBudget,
   createBudget,
} = require("../controllers/budgetController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", authMiddleware, getBudgets);
router.put("/:id", authMiddleware, updateBudget);
router.post("/", authMiddleware, createBudget);

module.exports = router;
