var express = require('express');
var router = express.Router();

router.get('/', async function(req, res, next) {

    res.render('clients/list', { title: 'Клиенты'})

});

module.exports = router;