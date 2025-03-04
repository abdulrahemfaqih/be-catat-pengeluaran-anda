const User = require("../models/User");
const Budget = require("../models/Budget");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
   try {
      const { name, email, password } = req.body;
      let user = await User.findOne({ email });
      if (user)
         return res.status(400).json({ message: "User sudah terdaftar" });

      user = new User({
         name,
         email,
         password,
         provider: "local",
      });
      await user.save();

      // Buat budget default
      const categories = [
         "Makanan",
         "Transportasi",
         "Hiburan",
         "Kesehatan",
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

const googleAuthCallback = (req, res) => {
   try {
      const user = req.user;
      if (!user) {
         return res.redirect(
            `${process.env.CLIENT_URL}/login?error=auth_failed`
         );
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
         expiresIn: "7d",
      });

      // Tambahkan timestamp untuk menghindari cache issues
      const timestamp = new Date().getTime();

      // Redirect ke frontend dengan token dan user data
      res.redirect(
         `${
            process.env.CLIENT_URL
         }/auth/google/success?token=${token}&user=${encodeURIComponent(
            JSON.stringify({ id: user._id, name: user.name, email: user.email })
         )}&t=${timestamp}`
      );
   } catch (error) {
      console.error("Google auth callback error:", error);
      res.redirect(
         `${
            process.env.CLIENT_URL
         }/login?error=auth_failed&msg=${encodeURIComponent(error.message)}`
      );
   }
};

module.exports = { register, login, googleAuthCallback };
