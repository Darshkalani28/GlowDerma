import express from "express";

const app = express();
let PORT = process.env.PORT ||5000;

app.get("/", (req, res) => {
    res.send("<h1>Welcome to GlowDerma - Your Skincare Journey Begins Here.</h1>")
})
app.get("/about", (req, res) => {
    res.send("<h3>We are a premium skincare brand committed to bringing you dermatologist-approved, clean beauty products</h3>")
})
app.get("/contact", (req, res) => {
    res.json({
            "email": "care@glowderma.com",
            "instagram": "http://instagram.com/glowderma",
            "consultation": "http://glowderma.com/book-appointment"
    })
})
app.get("/products",(req, res) => {
    res.json([
        {
          "name": "Hydrating Serum",
          "price": "$25",
          "description": "A lightweight serum that deeply hydrates and plumps the skin."
        },
        {
          "name": "Vitamin C Cream",
          "price": "$30",
          "description": "Brightens skin tone and reduces the appearance of dark spots."
        }
      ])
})
app.get("*", (req, res) => {
    res.json({
        "error": "Route not found"
      })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})