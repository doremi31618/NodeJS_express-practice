var express = require('express');
var router = express.Router();

// const config = {
//     CLIENT_ID  = '839231395170-12b1j2hs6t25j8tmqbnp80hqhehenqq3.apps.googleusercontent.com',
//     CLIENT_PWD = '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',
// };

function checkLoggedIn(req, res, next){
    const isLoggedIn = true;
    if (!isLoggedIn){
        return res.send(401).json(({
            error: 'You must log in ',
        }));
    }
    next();
}

router.get('/google', (req, res)=>{});

router.get('/google/callback', (req, res)=>{});

router.get('/logout', (req,res)=>{} );

router.get('/secret', checkLoggedIn, (req, res)=>{
    return res.send("you are successfully logging in ");
});

module.exports = router;