import express from "express";
import fs from 'fs';
import hbs from 'hbs'

const app = express();
let PORT = 3020;
app.use(express.json());

// set the view engine to handlebars
app.set("view engine","hbs");

app.set("views","views"); // Set Handlebars as the template engine


// Handlebars Helpers
hbs.registerHelper("formatDate", function (date) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString(undefined, options);
});

hbs.registerHelper("renderStars", function (rating) {
  return "★".repeat(rating) + "☆".repeat(5 - rating);
});

hbs.registerHelper("isUnavailable", function (available) {
  return available ? "" : "unavailable";
});

// Routes

// Doctors Page
app.get("/doctors", (req, res) => {
  res.render("doctor", { title: "Our Expert Doctors" });
});

// Services Page
app.get("/services", (req, res) => {
  const category = req.query.category || "General";
  res.render("services", { title: `${category} Services`, category });
});

// Appointments Page
app.post("/appointment", (req, res) => {
  const { name, email, service, preferredDate, preferredTime } = req.body;
  res.render("appointment", {
    title: "Appointment Confirmation",
    appointment: {
      name,
      email,
      service,
      preferredDate,
      preferredTime,
    },
  });
});

app.get("/appointment", (req,res)=>{
    res.render("appointment", {
        
            "name": "Patient Name",
            "email": "email@example.com",
            "service": "Service Name",
            "preferredDate": "2024-01-24",
            "preferredTime": "10:00 AM"
        
    })
});

// Offerings Page
app.get("/offerings", (req, res) => {
  const offerings = [
    {
      name: "Anti-Aging Treatment",
      price: 5000,
      duration: "60 mins",
      description: "Advanced treatment to reduce fine lines and wrinkles",
      available: true,
    },
    {
      name: "Acne Treatment",
      price: 3000,
      duration: "45 mins",
      description: "Specialized treatment for acne-prone skin",
      available: true,
    },
    {
      name: "Chemical Peel",
      price: 4000,
      duration: "30 mins",
      description: "Skin resurfacing treatment for even tone",
      available: false,
    },
  ];

  res.render("offerings", { title: "Our Offerings", offerings });
});

// Testimonials Page
app.get("/testimonials", (req, res) => {
  const testimonials = [
    {
      name: "vishang lad",
      rating: 5,
      comment: "Excellent service!",
      date: "2024-01-20",
    },
    {
      name: "Hardeep Ijardar",
      rating: 5,
      comment: "Very professional staff",
      date: "2024-01-18",
    },
  ];

  res.render("testimonials", { title: "Testimonials", testimonials });
});


// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});

