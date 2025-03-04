const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
const Budget = require("../models/Budget");

passport.serializeUser((user, done) => {
   done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
   try {
      const user = await User.findById(id);
      done(null, user);
   } catch (error) {
      done(error, null);
   }
});

passport.use(
   new GoogleStrategy(
      {
         clientID: process.env.GOOGLE_CLIENT_ID,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
         callbackURL: "/api/auth/google/callback",
         proxy: true,
      },
      async (accessToken, refreshToken, profile, done) => {
         try {
            // Check if user exists
            const existingUser = await User.findOne({ googleId: profile.id });

            if (existingUser) {
               return done(null, existingUser);
            }

            // If not, create new user
            const user = new User({
               googleId: profile.id,
               name: profile.displayName,
               email: profile.emails[0].value,
               avatar: profile.photos[0].value,
               provider: "google",
            });

            await user.save();

            // Buat budget default seperti di register
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

            done(null, user);
         } catch (error) {
            done(error, null);
         }
      }
   )
);

module.exports = passport;
