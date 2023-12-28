// routes.js
const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const RestaurantController = require("../controllers/restaurantController");
const OrderController = require("../controllers/orderController");
const FeatureController = require("../controllers/featureController");
const CategoryController = require("../controllers/categoryController");
const GeospatialController = require("../controllers/geospatialController");

// routes.js admin
const AdminController = require("../controllers/adminController");

// User Routes
router.post("/register", UserController.register);
router.get("/verify/:token", UserController.verifyEmail);
router.post("/login", UserController.login);
router.put("/address/:userId", UserController.updateAddress);
router.get("/address/:userId", UserController.getUserAddress);

// Restaurant Routes
router.post("/restaurants", RestaurantController.createRestaurant);
router.get("/restaurants", RestaurantController.getAllRestaurants);
router.get("/restaurants/:categoryId", RestaurantController.getRestaurantsByCategory);
router.get("/restaurants/search/:keyword", RestaurantController.searchRestaurants);

// Order Routes
router.post("/api/orders", OrderController.placeOrder);
router.get("/api/orders/:userId", OrderController.getOrdersByUser);

// Feature Routes
router.get("/api/featured", FeatureController.getFeatured);
router.post("/api/featured", FeatureController.createFeatured);

// Category Routes
router.post("/categories", CategoryController.createCategory);
router.get("/categories", CategoryController.getAllCategories);

// Map 
router.get("/nearby-restaurants/:userId", GeospatialController.getNearbyRestaurants);


// admin routes
router.get("/admin", AdminController.getAllUsers);
router.delete("/admin/:userId", AdminController.deleteUser);
router.put("/users/:userId", AdminController.editUser);

router.delete("admin/restaurants/:restaurantId", AdminController.deleteRestaurant);

module.exports = router;
