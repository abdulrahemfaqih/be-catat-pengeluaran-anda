const express = require("express");
const {
   upsertMonthlyIncome,
   getMonthlyIncome,
} = require("../controllers/pemasukanController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, upsertMonthlyIncome);
router.get("/", authMiddleware, getMonthlyIncome);

module.exports = router;
