var express = require('express');
var router = express.Router();

router.get('/', async function(req, res, next) {
    
    res.render('products/list', { title: 'Товары'});

});

router.get('/edit/:id', async function(req, res, next) {
  let id = req.params.id;
  let product = await req.db.one(`
    SELECT
      products.id AS id,
      products.label AS label,
      products.price AS price,
      products.amount AS amount
    FROM
      products
    WHERE
      products.id = $1
  `, [id]);
  
  if (product) {
    res.render('products/edit', {
      title: 'Редактирование заказа',
      label: product.label,
      price: product.price,
      amount: product.amount
    });
  }
});

router.post('/update/:id', async function(req, res, next) {
    let id = req.params.id;
    let updatedProduct = req.body;
    await req.db.none(`UPDATE products SET label = $1, price = $2, amount = $3 WHERE id = $4`, [updatedProduct.label, updatedProduct.price,updatedProduct.amount, id]);
    res.send({ msg: '' });
  });
  
  router.post('/create', async function(req, res, next) {
    let product = req.body;
    await req.db.none('INSERT INTO products(label, price, amount) VALUES(${label}, ${price}, ${amount})', product);
    res.send({msg: ''});
  });
  
  router.post('/delete/:id', async function(req, res, next) {
    let id = req.params.id;
    await req.db.none('DELETE FROM products WHERE id = $1', [id]);
    res.send({ msg: '' });
  });
  
  router.get('/:id', async function(req, res, next) {
    let id = req.params.id;
    let product = await req.db.any(`
        SELECT
            products.id AS id,
            products.label AS label,
            products.price AS price,
            products.amount AS amount
        FROM
            products
        WHERE
            products.id = $/id/
    `, { id: id });
    res.render('products/list', { title: 'Товары' + product.label, product: product });
  });
  
module.exports = router;