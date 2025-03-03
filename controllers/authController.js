const User = require("../models/User");
const Budget = require("../models/Budget");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
   try {
      const { name, email, password } = req.body;
      let user = await User.findOne({ email });
      if (user)
         return res.status(400).json({ message: "User sudah terdaftar" });

      user = new User({ name, email, password });
      await user.save();

      // Buat 4 budget default
      const categories = [
         "Makanan",
         "Transportasi",
         "Hiburan",
         "Kehsehatan",
         "Pendidikan",
         "Kebutuhan Pribadi",
      ];
      const budgetDocs = categories.map((cat) => ({
         userId: user._id,
         category: cat,
         budget: 0,
      }));
      await Budget.insertMany(budgetDocs);

      res.json({ message: "Register berhasil" });
   } catch (error) {
      res.status(500).json({ message: "Server error", error });
   }
};

const login = async (req, res) => {
   try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user || !(await user.comparePassword(password))) {
         return res.status(400).json({ message: "Email atau password salah" });
      }
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
         expiresIn: "7d",
      });
      res.json({
         token,
         user: { id: user._id, name: user.name, email: user.email },
      });
   } catch (error) {
      res.status(500).json({ message: "Server error", error });
   }
};

module.exports = { register, login };
