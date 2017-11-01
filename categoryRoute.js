const express = require('express');

const router = express.Router();
const conn = require('../config/database')


router.get('/categories', (req, res, next) => {
    conn.query('SELECT * FROM categories', (err, data) => {
        if (err) throw err;
        res.json(data);
    })

});

router.post('/categories', (req, res, next) => {
    conn.query('insert into categories (cat_name) values (?)',
        [req.body.cat_name],
        (err, data) => {
            if (err) throw err;
            res.json(data)
        })
});

router.put('/categories', (req, res, next) => {
    conn.query('update categories set cat_name = ? where id_cat= ?',

        [req.body.cat_name, req.body.id_cat],
        (err, data) => {
            if (err) {
                throw err;
            }
            else {
                res.json(data);
            }
        })
})

router.delete('/categories/:id', (req, res, next) => {
    conn.query('delete from categories where id_cat = ?', [req.params.id],
        (err, data) => {
            if (err) throw err;
            res.json(data);
        }
    )
})


module.exports = router;