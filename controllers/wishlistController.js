
const whistlist = require('../models/Wishlist');

const getWishlist = async (req, res) => {
    try {
        const whistlists = await whistlist.find({
            userId: req.user.userId,
        }).sort({ date: -1 });
        const totalPrice = whistlists.reduce((acc, item) => acc + item.price, 0);
        res.json({ items: whistlists, totalPrice, totalItem: whistlists.length });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}

const createWishlist = async (req, res) => {
    try {
        const { name, price, description, purchaseLink, imageUrls } = req.body;
        const newWhistlist = new whistlist({
            userId: req.user.userId,
            name,
            price,
            description,
            purchaseLink,
            imageUrls,
        });
        await newWhistlist.save();
        res.json({
            message: "Wishlist berhasil ditambahkan",
            whistlist: newWhistlist,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}


const updateWishlist = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, description, purchaseLink, imageUrls } = req.body;
        const updatedWhistlist = await whistlist.findOneAndUpdate(
            { _id: id, userId: req.user.userId },
            { name, price, description, purchaseLink, imageUrls },
            { new: true }
        );
        if (!updatedWhistlist)
            return res.status(404).json({ message: "Wishlist tidak ditemukan" });
        res.json({
            message: "Wishlist berhasil diupdate",
            whistlist: updatedWhistlist,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}

const deleteWishlist = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await whistlist.findOneAndDelete({
            _id: id,
            userId: req.user.userId,
        });
        if (!deleted)
            return res.status(404).json({ message: "Wishlist tidak ditemukan" });
        res.json({ message: "Wishlist berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}

module.exports = { getWishlist, createWishlist, updateWishlist, deleteWishlist };