require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const DataBaseMyslq = require('./database')
const app = express();
const db = new DataBaseMyslq();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
// parse application/json
app.use(bodyParser.json());

app.get('/clients', (req, res) => {
    const select = (req.query.select) ? req.query.select.replace(/_/g, ',') : '*';
    const where = (req.query.where) ? req.query.where.replace(/-/g, '=') : '';
    console.log(where);
    const query = (where) ? `SELECT ${select} FROM client WHERE ${where}` : `SELECT ${select} FROM client`;
    db.getConnection().query(query, (err, result, fields) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }
        res.json(result);
    });
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando en el puerto', process.env.PORT);
});