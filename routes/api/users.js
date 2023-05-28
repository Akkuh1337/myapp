var express = require('express');
var router = express.Router();

router.get('/', async function(req, res, next) {

    let users = await req.db.any(`
        SELECT
            users.id AS id,
            users.login AS login,
            users.first_name AS first_name,
            roles.label AS code
        FROM
            users
        INNER JOIN roles ON roles.id = users.code
    `)
    console.log(users)
    res.json({users: users })

});

module.exports = router;