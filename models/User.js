const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
   name: { type: String, required: true },
   email: { type: String, required: true, unique: true },
   password: { type: String }, // Password tidak wajib untuk login Google
   googleId: { type: String },
   avatar: { type: String },
   provider: { type: String, enum: ["local", "google"], default: "local" },
});

// Sebelum simpan, hash password jika password ada dan diubah
UserSchema.pre("save", async function (next) {
   if (!this.isModified("password") || !this.password) return next();
   this.password = await bcrypt.hash(this.password, 10);
   next();
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
   if (!this.password) return false;
   return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
