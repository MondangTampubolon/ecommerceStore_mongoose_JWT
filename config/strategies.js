const passport = require('passport');
require('dotenv').config()
const User = require('../models/users');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;


module.exports = {
  strategies : () => {
      passport.use('jwt', new JwtStrategy(
        {
          jwtFromRequest: ExtractJwt.fromExtractors([
            ExtractJwt.fromUrlQueryParameter('secret_token'),
            ExtractJwt.fromHeader('secret_token'),
            ExtractJwt.fromAuthHeaderAsBearerToken(),
          ]),
          secretOrKey:process.env.SECRET_KEY_TOKEN
        },
        async (jwt_payload, done) => {
          try {
            const user = await User.findOne({email: jwt_payload.email});
            if(!user){
              return done(err, false, {message : 'User not found'})
            } else {
              return done(null, user)
            }
          }
          catch(error){
            console.log(error)
            res.status(500).json({
                message: 'internal server error',
            })
          }
        }
      )
      
      )

      passport.use('facebook', new FacebookStrategy(
        {
          clientID:process.env.CLIENT_ID_FB,
          clientSecret:process.env.CLIENT_SECRET_FB,
          callbackURL:process.env.CALLBACK_URL_FB,
          profileFields: ['id', 'displayName', 'photos', 'email']
        },
        (accessToken, refreshToken, profile, callback) => {
            User.findOrCreate({
              providerId: profile.id,
              provider: profile.provider,
              fullname: profile.displayName,
              email: profile._json.email
            }, (err, user) =>{
              return callback(err, user)
            })
        }
      )),
      passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID_GOOGLE,
        clientSecret: process.env.CLIENT_SECRET_GOOGLE,
        callbackURL:process.env.CALLBACK_URL_GOOGLE
      },
      function(accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ 
          providerId: profile.id,
          provider: profile.provider,
          fullname: profile.displayName,
          email: profile._json.email
        }, function (err, user) {
          return cb(err, user);
        });
      }
    ));
      passport.serializeUser(function(user, done) {
        done(null, user.id);
      });

      passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });
  }
}