var express = require('express');
var router = express.Router();

router.get('/', async function(req, res, next) {

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
  `);
  console.log(order);
  let clients = await req.db.any(`
        SELECT
            *
        FROM
            clients
    `)
   console.log(clients)
    res.json({orders: order, clients: clients })

});

module.exports = router;