const express = require('express');
const router = express.Router();

router.get('/', async function(req, res, next) {
  
  res.render('uorders/list', { title: 'Информация о заказе'});

});

router.post('/create', async function(req, res, next) {
  let order = req.body;
  await req.db.none('INSERT INTO orders(label, client_id, amount) VALUES(${label}, ${name}, ${amount})', order);
  res.send({msg: ''});
});

module.exports = router;