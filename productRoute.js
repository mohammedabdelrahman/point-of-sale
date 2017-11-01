const express=require('express');
const router=express.Router();
const conn=require('../config/database');

const getProducts='select products.productID,categories.cat_name,products.barcode,products.productName,products.productDescription,products.productExpire,products.productQTY,products.productPrice from products INNER JOIN categories ON products.categoryID=categories.id_cat';
const postProduct='';
router.get('/products',(req,res,next)=>{
    conn.query(getProducts,(err,data)=>{
        if(err){
            throw err;
        }else{
            res.json(data);
        }
    })
});

router.post('/products',(req,res,next)=>{
    conn.query('insert into products (categoryID,barcode,productName,productDescription,productExpire,productQTY,productPrice) values (?,?,?,?,?,?,?)',[req.body.categoryID,req.body.barcode,req.body.productName,req.body.productDescription,req.body.productExpire,req.body.productQTY,req.body.productPrice],
    (err,data)=>{
        if(err){
            throw err;
        }else{
            res.json(data);
        }
    }
    )
})

router.delete('/products/:id',(req,res,next)=>{
    conn.query('delete from products where productID = ?',[req.params.id],
    (err,data)=>{
        if (err) {
            throw err;
        }else{
            res.json(data);
        }
    }
 )
})
module.exports=router;