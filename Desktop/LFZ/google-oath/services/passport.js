const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const mongoose = require('mongoose');
const config = require('../config');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser((userID, done) => {
    User.findById(userID).then(existingUser => {
        done(null, existingUser)
    });
})

passport.use(new GoogleStrategy({
    clientID: config.googleClientID,
    clientSecret: config.googleClientSecret,
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
   

    User.findOne({googleId: profile.id}).then( existingUser => {
        if(existingUser){
            done(null, existingUser);
        }else {
            new User({googleID: profile.id}).save().then( newUser => {
                done(null, newUser); 
        })
    }
    })
}));