const express = require('express');
const router = express.Router();

router.get('/', async function(req, res, next) {

  res.render('delivery_items/list', { title: 'Информация о доставке'});

});

router.get('/edit/:id', async function(req, res, next) {
  let id = req.params.id;
  let delivery_item = await req.db.one(`
    SELECT
      delivery_items.id AS id,
      delivery_items.address AS address,
      delivery_items.delivery_id AS delivery_id,
      products.label AS products_label,
      delivery_items.amount AS amount,
      delivery_items.summa AS summa
    FROM
      delivery_items
    INNER JOIN
      products ON products.id = delivery_items.product_id
    WHERE
      delivery_items.id = $1
  `, [id]);
  console.log(delivery_item);
  res.render('delivery_items/edit', { title: 'Редактирование доставки', delivery: delivery_item });
});

router.post('/update/:id', async function(req, res, next) {
  let id = req.params.id;
  let updatedDelivery = req.body;
  await req.db.none(`UPDATE delivery_items SET address = $1, delivery_id = $2, product_id = $3, amount = $4, summa = $5 WHERE id = $6`, [updatedDelivery.address, updatedDelivery.delivery_id, updatedDelivery.label, updatedDelivery.amount, updatedDelivery.summa, id]);
  res.send({ msg: '' });
});

router.post('/create', async function(req, res, next) {
  let order = req.body;
  await req.db.none('INSERT INTO delivery_items(address, delivery_id, product_id, amount, summa) VALUES(${address}, ${delivery_id}, ${label}, ${amount}, ${summa})', order);
  res.send({msg: ''});
});

router.post('/delete/:id', async function(req, res, next) {
  let id = req.params.id;
  await req.db.none('DELETE FROM delivery_items WHERE id = $1', [id]);
  res.send({ msg: '' });
});

router.get('/:id', async function(req, res, next) {
  let id = req.params.id;
  let delivery = await req.db.any(`
    SELECT
      delivery_items.id AS id,
      delivery_items.address AS address,
      delivery_items.delivery_id AS delivery_id,
      products.label AS products_label,
      delivery_items.amount AS amount,
      delivery_items.summa AS summa
    FROM
      delivery_items
    INNER JOIN
      products ON products.id = delivery_items.product_id
    WHERE
      delivery_items.id = $/id/
  `, { id: id });
  res.render('delivery_items/list', { title: 'Доставка ' + delivery.label, delivery: delivery });
});

module.exports = router;