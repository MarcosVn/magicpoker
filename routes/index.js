var router = require('express').Router();
//var Account = require('../models/account');


/*router.get('/', function (req, res) {
    res.render('index', { user : req.user });
});

router.get('/register', function(req, res) {
    res.render('register', { });
});

router.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            return res.render('register', { account : account });
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});*/

/* GET home page. */
router.get('/', function(req, res) {
	res.sendfile('index.html');
});

router.get('/magicpoker', function(req, res) {
	res.sendfile('templates/menu.html');
});

router.get('/client', function(req, res) {
  res.sendfile('templates/client.html');
});


router.get('/sala', function(req, res) {
	res.sendfile('templates/sala.html');
});

router.get('/cassino', function(req, res) {
	res.sendfile('templates/sala.html');
});

router.get('/perfil', function(req, res) {
	res.sendfile('templates/perfil.html');
});

router.get('/table', function(req, res) {
	res.sendfile('templates/table.html');
});


module.exports = router;
