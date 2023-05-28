var express = require('express');
var router = express.Router();

router.get('/', async function(req, res, next) {

    let delivery_items = await req.db.any(`
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
    `);
    console.log(delivery_items);
    res.json({delivery_items: delivery_items })

});

module.exports = router;