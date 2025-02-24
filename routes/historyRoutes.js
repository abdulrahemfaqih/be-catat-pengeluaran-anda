const express = require("express");
const {
   saveMonthlyHistory,
   getMonthlyHistory,
   deleteMonthlyHistory,
} = require("../controllers/historyController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, saveMonthlyHistory);
router.get("/", authMiddleware, getMonthlyHistory);

// route hapus history bulanan
router.delete("/:id", authMiddleware, deleteMonthlyHistory);

module.exports = router;
