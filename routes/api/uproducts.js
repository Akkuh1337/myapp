const express = require('express');
const router = express.Router();

router.get('/', async function(req, res, next) {

    let products = await req.db.any(`
        SELECT
            products.id AS id,
            products.label AS label,
            products.price AS price,
            products.amount AS amount
        FROM
            products
    `);
    console.log(products);
    res.json({products: products});

});

module.exports = router;