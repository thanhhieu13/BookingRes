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
const Restaurant = require("./models/restaurant");
app.post('/restaurants', async (req, res) => {
  const {
    name,
    description,
    image,
    lat,
    lng,
    address,
    rating,
    type, // Loại nhà hàng, giả sử là một ObjectId của Category
    menu,
    openingHours,
  } = req.body;

  try {
    // Kiểm tra xem loại nhà hàng có tồn tại không
    // const category = await Category.findById(type);
    // if (!category) {
    //   return res.status(400).json({ message: 'Loại nhà hàng không hợp lệ' });
    // }

    const newRestaurant = new Restaurant({
      name,
      description,
      image,
      lat,
      lng,
      address,
      rating,
      type,
      menu,
      openingHours,
    });

    const savedRestaurant = await newRestaurant.save();
    res.status(201).json(savedRestaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
  
  app.get('/restaurants', async (req, res) => {
    try {
      const restaurants = await Restaurant.find().populate('type'); // Sử dụng populate để lấy thông tin từ bảng Category
      res.json(restaurants);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.put("/address/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const { name, avatar, mobileNo, street, city,occupation,gender,dateOfBirth } = req.body; // Assuming the request body contains the new street and city

        // Find the user by userId
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update the user's address fields
        user.name = name;
        user.avatar = avatar;
        user.street = street;
        user.city = city;
        user.mobileNo = mobileNo;
        user.occupation = occupation;
        user.gender = gender;
        user.dateOfBirth = dateOfBirth;

        // Save the updated user in the backend
        await user.save();

        res.status(200).json({ name, avatar, mobileNo, street, city,occupation,gender,dateOfBirth });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating address" });
    }
});
  //endpoint to get all the addresses of a particular user
  app.get("/address/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;

        // Find the user by userId
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Retrieve user details
        const userDetails = {
            name: user.name,
            avatar: user.avatar,
            street: user.street,
            city: user.city,
            mobileNo: user.mobileNo,
            occupation: user.occupation,
            gender: user.gender,
            dateOfBirth: user.dateOfBirth,
        };

        res.status(200).json({ userDetails });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving user details" });
    }
});

const Featured = require("./models/featured");
app.get('/api/featured', async (req, res) => {
  try {
    const featuredData = await Featured.find().populate('restaurants'); // Sử dụng populate để lấy thông tin từ bảng liên quan (restaurants)
    res.json(featuredData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/featured', async (req, res) => {
  const { name, description, restaurants } = req.body;

  try {
    const newFeatured = await Featured.create({
      name,
      description,
      restaurants,
    });

    res.status(201).json(newFeatured);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


app.post('/categories', async (req, res) => {
  try {
      // Assuming that the request body contains 'name' and 'image'
      const { name, image } = req.body;

      // Create a new category instance
      const newCategory = new Category({
          name,
          image,
      });

      // Save the new category to the database
      const savedCategory = await newCategory.save();

      // Respond with the saved category
      res.status(201).json(savedCategory);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/categories', async (req, res) => {
  try {
    // Fetch all categories from the database
    const categories = await Category.find();

    // Respond with the list of categories
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.get('/restaurants/search/:keyword', async (req, res) => {
  const { keyword } = req.params;

  try {
    const restaurants = await Restaurant.find({
      name: { $regex: new RegExp(keyword, 'i') }
    }).populate('type');

    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


const Order = require('./models/order');
app.post('/orders', async (req, res) => {
  try {
    const {
      user,
      restaurant,
      numberOfAdults,
      numberOfChildren,
      reservationDate,
      reservationTime,
      note
    } = req.body;

    const newOrder = new Order({
      user,
      restaurant,
      numberOfAdults,
      numberOfChildren,
      reservationDate,
      reservationTime,
      note
    });

    const savedOrder = await newOrder.save();
    res.json(savedOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});