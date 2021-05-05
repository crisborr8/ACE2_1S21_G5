const { Router } = require('express');
const router = Router();
const cors = require('cors');
var bodyParser = require('body-parser');
var corsOptions = { origin: true, optionsSuccessStatus: 200 };
router.use(cors(corsOptions));
router.use(bodyParser.json({ limit: '100mb', extended: true }));
router.use(bodyParser.urlencoded({ limit: '100mb', extended: true }))

/**
 * Modulo para Mysql
 */

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: '3.12.129.123',
    user: 'root',
    password: 'secret',
    database: 'ace2backend',
    port: 33061

   /* host: '127.0.0.1',
    user: 'root',
    password: 'password',
    database: 'dbinter',
    port: 3306*/

});

//-------------------

router.get('/hola', 
    (req,res) => res.json
    (
        {msg: 'bye :D'}
    )
);

module.exports = router;