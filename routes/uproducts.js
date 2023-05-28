var express = require('express');
var router = express.Router();

router.get('/', async function(req, res, next) {
    
    res.render('uproducts/list', { title: 'Товары'});

});
  
router.post('/create', async function(req, res, next) {
    let product = req.body;
    await req.db.none('INSERT INTO products(label, price, amount) VALUES(${label}, ${price}, ${amount})', product);
    res.send({msg: ''});
});

module.exports = router;