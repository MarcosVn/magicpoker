var router = require('express').Router();
var dbOperations = require("../models/dbOperations.js");
var passport = require('passport'),
    TwitterStrategy = require('passport-twitter').Strategy,
    ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;


/* GET home page. */
router.get('/', function(req, res) {
	res.sendfile('index.html');
});

router.get('/db/addUser', function(req,res){
    dbOperations.addUser(req,res);
    //res.sendfile('index.html');
});

router.get('/db/readUsers', function(req,res){
    dbOperations.getUsers(req,res);
});

router.get('/db/getUser', function(req, res) {
	dbOperations.getLoggedUser(req, res)
});

router.get('/magicpoker', function(req, res) {
	res.sendfile('templates/menu.html');
});

router.get('/client', function(req, res) {
  res.sendfile('templates/client.html');
});


router.get('/sala', ensureLoggedIn('/'), function(req, res) {
	res.sendfile('templates/sala.html');
});

router.get('/cassino', ensureLoggedIn('/'), function(req, res) {
	res.sendfile('templates/sala.html');
});

router.get('/perfil', function(req, res) {
	res.sendfile('templates/perfil.html');
});

router.get('/table', function(req, res) {
	res.sendfile('templates/table.html');
});


module.exports = router;
