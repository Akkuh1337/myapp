const express = require('express');
const router = express.Router();

router.get('/', async function(req, res, next) {
  
  res.render('orders/list', { title: 'Информация о доставке'});

});

router.get('/edit/:id', async function(req, res, next) {
  let id = req.params.id;
  let order = await req.db.any(`
    SELECT
        orders.id AS id,
        orders.label AS order_label,
        clients.label AS client_label,
        orders.date AS date,
        orders.status AS status,
        orders.amount AS amount
    FROM
        orders
    INNER JOIN
        clients ON clients.id = orders.client_id
  `, [id]);
  console.log(order);
  let clients = await req.db.any(`
        SELECT
            *
        FROM
            clients
    `)
    res.render('orders/edit', {
      title: 'Редактирование заказа',
      order_label: order[0].order_label,
      client_label: order[0].client_label,
      status: order[0].status,
      amount: order[0].amount
    });
});

router.post('/update/:id', async function(req, res, next) {
  let id = req.params.id;
  let updatedOrder = req.body;
  await req.db.none(`UPDATE orders SET label = $1, client_id = $2, status = $3, amount = $4 WHERE id = $5`, [updatedOrder.label, updatedOrder.name, updatedOrder.statuses, updatedOrder.amount, id]);
  res.send({ msg: '' });
});

router.post('/create', async function(req, res, next) {
  let order = req.body;
  await req.db.none('INSERT INTO orders(label, client_id, amount) VALUES(${label}, ${name}, ${amount})', order);
  res.send({msg: ''});
});

router.post('/delete/:id', async function(req, res, next) {
  let id = req.params.id;
  await req.db.none('DELETE FROM orders WHERE id = $1', [id]);
  res.send({ msg: '' });
});

router.get('/:id', async function(req, res, next) {
  let id = req.params.id;
  let order = await req.db.any(`
    SELECT
        orders.id AS id,
        orders.label AS order_label,
        clients.label AS client_label,
        orders.date AS date,
        orders.status AS status,
        orders.amount AS amount
    FROM
        orders
    INNER JOIN
        clients ON clients.id = orders.client_id
    WHERE
      orders.id = $/id/
  `, { id: id });
  res.render('orders/list', { title: 'Заказы ' + order.order_label, order: order });
});

module.exports = router;