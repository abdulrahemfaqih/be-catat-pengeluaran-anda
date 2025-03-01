const express = require("express");
const {
    getWishlist,
    createWishlist,
    updateWishlist,
    deleteWishlist,
} = require("../controllers/wishlistController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", authMiddleware, getWishlist);
router.post("/", authMiddleware, createWishlist);
router.put("/:id", authMiddleware, updateWishlist);
router.delete("/:id", authMiddleware, deleteWishlist);

module.exports = router;