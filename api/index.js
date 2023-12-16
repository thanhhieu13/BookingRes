const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const jwt = require("jsonwebtoken");

const User = require("./models/user");


app.listen(port, () => {
    console.log("Server is running on port 8000");
});

const sendVerificationEmail = async (email, verificationToken) => {
  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    // Configure the email service or SMTP details here
    service: "gmail",
    auth: {
      user: "nguyenhieu9474@gmail.com",
      pass: "nguyenthanhhieu1342002",
    },
  });

  // Compose the email message
  const mailOptions = {
    from: "BookingRestaurant.com",
    to: email,
    subject: "Email Verification",
    text: `Please click the following link to verify your email: http://localhost:8000/verify/${verificationToken}`,
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully");
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};

mongoose
  .connect("mongodb+srv://20521328:McvsnJeQrTNWMU7U@bookingres.dprdfjf.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDb", err);
  });



app.post("/register", async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // Check if the email is already registered
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        console.log("Email already registered:", email); // Debugging statement
        return res.status(400).json({ message: "Email already registered" });
      }
  
      // Create a new user
      const newUser = new User({ name, email, password });
  
      // Generate and store the verification token
      newUser.verificationToken = crypto.randomBytes(20).toString("hex");
  
      // Save the user to the database
      await newUser.save();
  
      // Debugging statement to verify data
      console.log("New User Registered:", newUser);
  
      // Send verification email to the user
      // Use your preferred email service or library to send the email
      sendVerificationEmail(newUser.email, newUser.verificationToken);
  
      res.status(201).json({
        message:
          "Registration successful. Please check your email for verification.",
      });
    } catch (error) {
      console.log("Error during registration:", error); // Debugging statement
      res.status(500).json({ message: "Registration failed" });
    }
  });


  //endpoint to verify the email
app.get("/verify/:token", async (req, res) => {
    try {
      const token = req.params.token;
  
      //Find the user witht the given verification token
      const user = await User.findOne({ verificationToken: token });
      if (!user) {
        return res.status(404).json({ message: "Invalid verification token" });
      }
  
      //Mark the user as verified
      user.verified = true;
      user.verificationToken = undefined;
  
      await user.save();
  
      res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
      res.status(500).json({ message: "Email Verificatioion Failed" });
    }
  });

  const generateSecretKey = () => {
    const secretKey = crypto.randomBytes(32).toString("hex");
  
    return secretKey;
  };
  
  const secretKey = generateSecretKey();
  
  //endpoint to login the user!
  app.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      //check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
      //check if the password is correct
      if (user.password !== password) {
        return res.status(401).json({ message: "Invalid password" });
      }
  
      //generate a token
      const token = jwt.sign({ userId: user._id }, secretKey);
  
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: "Login Failed" });
    }
  });
  
// Assuming you have the Restaurant model defined
const Category = require("./models/category");
const Dish = require("./models/dish");
const Restaurant = require("./models/restaurant");
const addRestaurant = async (req, res, next) => {
    try {
      const {
        name,
        image,
        description,
        lat,
        lng,
        address,
        rating,
        reviews,
        type,
        dishes
      } = req.body;
  
      const newRestaurant = new Restaurant({
        name,
        image,
        description,
        lat,
        lng,
        address,
        rating,
        reviews,
        type,
        dishes
      });
  
      const savedRestaurant = await newRestaurant.save();
  
      res.status(201).json(savedRestaurant);
    } catch (error) {
      next(error); // Pass the error to the global error handler middleware
    }
  };
  
  // Function to handle fetching restaurants
// Function to handle fetching restaurants with associated dishes
const getRestaurantsWithDishes = async (req, res, next) => {
    try {
      const restaurants = await Restaurant.find();
  
      const transformedRestaurants = await Promise.all(restaurants.map(async restaurant => {
        const dishes = await Dish.find({ _id: { $in: restaurant.dishes } });
        
        return {
          id: restaurant._id,
          name: restaurant.name,
          image: restaurant.image,
          description: restaurant.description,
          lat: restaurant.lat,
          lng: restaurant.lng,
          address: restaurant.address,
          stars: restaurant.rating,
          reviews: restaurant.reviews,
          category: restaurant.type,
          dishes: dishes.map(dish => ({
            id: dish._id,
            name: dish.name,
            description: dish.description,
            price: dish.price,
            image: dish.image
          }))
        };
      }));
  
      res.status(200).json(transformedRestaurants);
    } catch (error) {
      next(error); // Pass the error to the global error handler middleware
    }
  };
  
  // Routes
  app.get('/restaurants', getRestaurantsWithDishes);
  app.post('/add-restaurants', addRestaurant);
  