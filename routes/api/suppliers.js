var express = require('express');
var router = express.Router();

router.get('/', async function(req, res, next) {

    let suppliers = await req.db.any(`
        SELECT
            *
        FROM
            suppliers
    `)
    console.log(suppliers)
    res.json({suppliers: suppliers })

});

module.exports = router;