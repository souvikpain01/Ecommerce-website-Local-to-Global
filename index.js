import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import { greet } from './controller/user.js';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import morgan from 'morgan';
import Products from './router/Products.js';
import Users from './router/Users.js';
// var nodemailer = require('nodemailer');
import nodemailer from 'nodemailer'



morgan.token('req-body', (req, res) => JSON.stringify(req.body));

// Use the custom token in the log format


greet();
config();

const server = express();
const uri = 'mongodb://127.0.0.1:27017/EcommerceTest';
mongoose.set("strictQuery", false);
mongoose.connect(uri)
.then(() => { console.log("Database connected"); })
    .catch((err) => { console.log("Error..." + err); });

import Product1 from "./model/Product.js"
server.use(express.urlencoded({extended:true}))
server.use(express.json());
server.use(morgan(':method :url :status :response-time ms - :req-body'));

//connect views(frontend) to backend
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log(__dirname,'views')
server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, '/views'));
server.use(express.static(path.join(__dirname, 'public')));



server.use('/products', Products);
server.use('/users', Users);
server.use('/users',Users);


server.use('/login',(req,res)=>{
    res.render('login.ejs');
});
server.use('/signup',(req,res)=>{
    res.render('signup');
});
// server.use('/productDetails',(req,res)=>{
//     const id=req.query.id;
//     console.log(`id........${id}`);
//     res.render('productDetails',{id});
// });
server.get("/productDetails/:id",async (req, res)=>{
const id = req.params.id;
console.log(id);
const detail = await Product1.findById(id);
console.log(detail)
res.render('productDetails', {detail})
})

import Product from "./model/Product.js"
// server.get('/products', async (req, res) => {
//     try {
//         const products = await Product.find();
//         res.json(products);
//         } catch (err) {
//             res.status(500).send(err);
//             }
//             });
                server.get('/product',(req,res)=>{
                    const category=req.query.gender;
                    console.log(`Category ............... ${category}`);
                    res.render('product',{category});
                });
server.use('/cart',(req,res)=>{
    res.render('cart');
})
server.use('/buy/:id', (req, res) => {
    const id = req.params.id;
    res.render('buy', { id }); // Passing id using shorthand syntax
});


server.use('/upbuy/:id', async (req, res) => {
    const id = req.params.id; // Extracting id from request parameters
    try {
        const detail = await Product1.findById(id);
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'programtesting127@gmail.com',
                pass: 'zlun dttp tmmu olfz'
            }
        });

        const mailOptions = {
            from: 'programtesting127@gmail.com',
            to: 'painsouvik003@gmail.com',
            subject: 'Sending Email using Node.js',
            text: `An order is placed with the following details:  
                Customer Name: ${req.body.name}
                Customer Phone: ${req.body.phone}
                Customer Email: ${req.body.email}
                Customer Address: ${req.body.address}
                
                Product Details:
                Product Name: ${detail.name}
                Product Price: ${detail.price}
                Product ID: ${detail._id}
            `
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                res.sendStatus(500); // Send 500 status code for error
            } else {
                console.log('Email sent: ' + info.response);
                res.render('upbuy', { success: true, id: id }); // Passing id parameter to the view
            }
        });
    } catch (error) {
        console.error('Error:', error);
        res.sendStatus(500); // Send 500 status code for any unexpected errors
    }
});




server.use('/', (req,res)=>{
    res.render('index');
});


const PORT = process.env.PORT||3000 ;
server.listen(PORT, () => {
    console.log("Server running on port " + PORT);
    });
    
    
    
    

