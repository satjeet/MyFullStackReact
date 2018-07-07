const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

// definismos User, para usar el modelo
const User = mongoose.model('users');

//el user es el que guardamos en la base de datos, definido en la arrowfuntion mas abajo
passport.serializeUser((user, done) => {
  return done(null, user.id);
});

//entre una id ,recibo un usuario
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    return done(null, user);
  });
});
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log('access token', accessToken);
      console.log('refresh token', refreshToken);
      console.log('quiero ver el profile', profile);
      // usaremos promises para pasar el lo que encontremos
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        //si encontro el usuario, entonces no hacemos nada
        return done(null, existingUser);
      } else {
        //no encontro el usuario, asi que crearemos el user
        const user = await new User({ googleId: profile.id }).save();
        done(null, user); //puedo usar retunr o no usarlo, no da problema, porque de todas maneras la funcion tomara lo que haya dentro de done()

        //muy necesario el save() o no lo guardaria en la base de datos
      }
    }
  )
);
