//import node modules
const express=require('express');
const mysql=require("mysql");
const bodyParser=require('body-parser');
const conn =require('./config/database');
var cors=require('cors');

const router=express.Router();
const path=require('path');
const app=express();
const customer=require('./routes/customerRoute');
const category=require('./routes/categoryRoute');
const product=require('./routes/productRoute');
//connect to database
mysql.createConnection(conn.config,(err)=>{
    if(err)
    {
        console.log('could not connect to database : ' + err);
    }else{
        console.log('connected');
    }
});

//access control
app.all('/*', function(req, res, next) {
    // CORS headers
    res.header('Access-Control-Allow-Origin', '*'); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
    res.setHeader('Access-Control-Allow-Credentials', true);
    if (req.method == 'OPTIONS') {
    res.status(200).end();
    } else {
    next();
    }
    });
    app.use(cors());
   

// app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));

//static direction for frontend

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname , '/public/index.html'));
});

app.use('/api',customer);
app.use('/api',category);
app.use('/api',product);

 //port
 const port= process.env.PORT || 8080;
 

 app.listen(port,()=>{
  console.log("listening on port " +port)
});
