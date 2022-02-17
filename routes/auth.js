var express = require('express');
var router = express.Router();
var passport = require('passport');

function checkLoggedIn(req, res, next){
    const isLoggedIn = true;
    if (!isLoggedIn){
        return res.send(401).json(({
            error: 'You must log in ',
        }));
    }
    next();
}
// The first route redirects the user to the Google,
// where they will authenticate:
router.get('/google', passport.authenticate('google', {
    scope: ['email', 'profile']
}));
//The second route processes the authentication response and logs
// the user in, after Google redirects the user back to the app:
router.get('/google/callback', 
    passport.authenticate('google',{
        failureRedirect: '/auth/failure',
        successRedirect: '/me',
        session: true,
    }), 
    (req, res)=>{
        console.log('google call us back');
});

router.get('/failure', (req, res)=>{
    console.log('google login fail');
    res.status(404);
    res.send("login failed");
})

router.get('/logout', (req,res)=>{
    req.logout(); //Removes req.user and clear any logged in session
    return res.redirect('/');
} );

router.get('/secret', checkLoggedIn, (req, res)=>{
    return res.send("you are successfully logging in ");
});

module.exports = router;