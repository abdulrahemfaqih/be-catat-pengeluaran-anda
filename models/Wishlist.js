const mongoose = require('mongoose');

const WishlistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    purchaseLink: { type: String },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Wishlist", WishlistSchema);