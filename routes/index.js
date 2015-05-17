var router = require('express').Router();
// var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	res.sendfile('index.html');
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
