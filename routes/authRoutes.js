const passport = require('passport');
// vamos a conectar cuando entren a /auth/google , y vamos a usar la estrategia google

//vamos a exportar las rutas , agregando app como argumento
module.exports = app => {
  //  passport.authenticate('google', { failureRedirect: '/login' }),
  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      // Successful authentication, redirect home.   res es response
      res.redirect('/surveys');
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
