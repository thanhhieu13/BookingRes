const User = require("../models/user");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

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
const generateSecretKey = () => {
    const secretKey = crypto.randomBytes(32).toString("hex");

    return secretKey;
};

const secretKey = generateSecretKey();

module.exports = {
    register: async (req, res) => {
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
            await newUser.save();
            console.log("New User Registered:", newUser);
            sendVerificationEmail(newUser.email, newUser.verificationToken);

            res.status(201).json({
                message:
                    "Registration successful. Please check your email for verification.",
            });
        } catch (error) {
            console.log("Error during registration:", error); // Debugging statement
            res.status(500).json({ message: "Registration failed" });
        }
    },

    verifyEmail: async (req, res) => {
        try {
            const token = req.params.token;
            const user = await User.findOne({ verificationToken: token });
            if (!user) {
                return res.status(404).json({ message: "Invalid verification token" });
            }
            user.verified = true;
            user.verificationToken = undefined;

            await user.save();

            res.status(200).json({ message: "Email verified successfully" });
        } catch (error) {
            res.status(500).json({ message: "Email Verificatioion Failed" });
        }
    },

    login: async (req, res) => {
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
    },

    updateAddress: async (req, res) => {
        try {
            const userId = req.params.userId;
            const {
                name,
                avatar,
                mobileNo,
                street,
                city,
                occupation,
                gender,
                dateOfBirth,
            } = req.body; 
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
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

            res
                .status(200)
                .json({
                    name,
                    avatar,
                    mobileNo,
                    street,
                    city,
                    occupation,
                    gender,
                    dateOfBirth,
                });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error updating address" });
        }
    },

    getUserAddress: async (req, res) => {
        try {
            const userId = req.params.userId;
        
            // Find the user by userId
            const user = await User.findById(userId);
            if (!user) {
              return res.status(404).json({ message: "User not found" });
            }
        
            res.status(200).json(user);
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error retrieving user details" });
          }
    },
};
