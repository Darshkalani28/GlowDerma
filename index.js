import express from "express";
import fs from 'fs';
import { rateLimit } from 'express-rate-limit';

const app = express();
let PORT = 5000;

// External/3rd party Middleware  
//create a rate limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message : "You have exceeded the 5 requests in 15 minutes limit!"});

app.use(limiter);

// Middleware to use Virtual path
app.use("/tools",express.static('assets'))


// Middleware in logging in other server.log
app.use((req, res, next) =>{
    const logData = `${new Date()} | ${req.method} | ${req.url} | ${req.ip} \n`;
    console.log(logData);
    fs.appendFile('server.log', logData, (err)=>{
        if (err) throw err;
    })
    next();  
})

//  Middleware to parse incoming JSON payload 
app.use(express.json());

app.get("/", (req, res) => {
    res.send("<h1>Welcome to GlowDerma - Your Skincare Journey Begins Here.</h1>");
});

app.get("/about", (req, res) => {
    res.send("<h3>We are a premium skincare brand committed to bringing you dermatologist-approved, clean beauty products</h3>");
});

app.get("/contact", (req, res) => {
    res.json({
        "email": "care@glowderma.com",
        "instagram": "http://instagram.com/glowderma",
        "consultation": "http://glowderma.com/book-appointment"
    });
});

// Orders Route with Route Parameter
app.get("/orders/:orderID", (req, res) => {
    const orderID = parseInt(req.params.orderID);
    const orders = [
        { id: 1, name: 'Anti-Aging Serum', quantity: 2 },
        { id: 2, name: 'Vitamin C Moisturizer', quantity: 1 },
        { id: 3, name: 'Hyaluronic Acid', quantity: 3 }
    ];
    const order = orders.find(o => o.id === orderID);

    if (order) {
        res.status(200).json(order);
    } else {
        res.status(404).send("Order Not Found");
    }
});

// Products Route with Query Parameters
app.get("/products", (req, res) => {
    const { name, maxPrice } = req.query;
    let products = [
        { id: 11, name: "Retinol Serum", price: 1200, availableQty: 50 },
        { id: 12, name: "Niacinamide Solution", price: 800, availableQty: 30 },
        { id: 14, name: "Peptide Moisturizer", price: 1500, availableQty: 100 },
        { id: 15, name: "Glycolic Acid Toner", price: 900, availableQty: 20 }
    ];

    if (name) {
        products = products.filter(p => p.name.toLowerCase().includes(name.toLowerCase()));
    }

    if (maxPrice) {
        products = products.filter(p => p.price <= parseInt(maxPrice));
    }

    res.status(200).json(products);
});

// Shopping Cart Array
let shoppingCart = [];

// Get Cart Contents
app.get("/cart", (req, res) => {
    res.json(shoppingCart);
});

// Add to Cart with Body Parameter
app.post("/cart", (req, res) => {
    console.log(req.body);
    const { id, name, price, availableQty, quantity } = req.body;

    // Check for missing fields
    if (!id || !name || !price || !availableQty || !quantity) {
        return res.status(400).json({
            "error": "All the required fields (id, name, price, description, qty) are not provided"
        });
    }

    // Form cart object
    const cartItem = { id, name, price, availableQty, quantity};

    // Update cart with new object
    shoppingCart.push(cartItem);
    res.json({
        "message": "Product added to cart",
        "data": cartItem
    });
});

// Error Handling Middleware
app.use((req, res)=> {
  res.status(404).send("Route not found")
})

// Handle Undefined Routes
app.get("*", (req, res) => {
    res.status(404).json({
        "error": "Route not found"
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`server is running on port http://localhost:${PORT}`);
});