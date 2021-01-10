const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const User = require("./models/User");

const cookieExtractor = req => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies["access_token"];
    }
    return token;
}

// authorization for endpoints
passport.use(new JwtStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: "crackPotHippie"
}, (payload, done) => {
    User.findById({ _id: payload.sub }, (err, user) => {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    });
}));

// authenticated local strategy using username and password
passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
        // Something went wrong with database
        if (err) {
            return done(err);
        }
        // User does not exist
        if (!user) {
            return done(null, false);
        }
        // Uses User model's function to see if user entered correct password
        user.comparePassword(password, done);
    });
}));