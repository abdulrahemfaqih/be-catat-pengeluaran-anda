const express = require("express");
const {
   saveMonthlyHistory,
   getMonthlyHistory,
} = require("../controllers/historyController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, saveMonthlyHistory);
router.get("/", authMiddleware, getMonthlyHistory);

module.exports = router;
