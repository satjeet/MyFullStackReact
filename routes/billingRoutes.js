const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');
module.exports = app => {
  //  passport.authenticate('google', { failureRedirect: '/login' }),
  app.post('/api/stripe', requireLogin, async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '5 creditos por 5 dolares',
      source: req.body.id
    });
    // ahora tenemos que actualizar el modelo con los 5 dolares cargados
    console.log(charge);
    req.user.credits += 5;
    const user = await req.user.save();
    res.send(user);
  });
};
