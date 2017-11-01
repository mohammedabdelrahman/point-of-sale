const express = require('express');

const router = express.Router();
const conn = require('../config/database')

// const Customer=require('../Models/customers');
//get customers list
router.get('/customers', (req, res, next) => {
    conn.query('SELECT * FROM customers', (err, data) => {
        if (err) throw err;
        res.json(data);
    })

});

//add customer
router.post('/customers', (req, res, next) => {
    conn.query('insert into customers(cust_name,cust_phone,cust_email,cust_address) values (?,?,?,?)',
        [req.body.cust_name, req.body.cust_phone, req.body.cust_email, req.body.cust_address],
        function (err, data) {
            res.json(data);
        })
})

//delete customer
router.delete('/customers/:id', (req, res, next) => {
    conn.query('delete from customers where id = ?', [req.params.id], function (err, data) {
        res.json(data);
    });
});

//update customer
router.put("/customers", function (req, res) {
    conn.query('update customers set cust_name = ?,cust_phone = ?,cust_email = ?,cust_address = ? where id = ?',
        [req.body.cust_name, req.body.cust_phone, req.body.cust_email, req.body.cust_address, req.body.id],
        (err, data) => {
            res.json(data);
        })

});



module.exports = router;