const router = require('express').Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    // En caso de éxito, redirige a la página principal o a la dashboard
    res.redirect('/home');
});

module.exports = router;
