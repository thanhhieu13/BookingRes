const Restaurant = require("../models/restaurant");
const Category = require("../models/category");

module.exports = {
  createRestaurant: async (req, res) => {
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
  },

  getAllRestaurants: async (req, res) => {
    try {
        const restaurants = await Restaurant.find().populate("type"); // Sử dụng populate để lấy thông tin từ bảng Category
        res.json(restaurants);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
  },

  getRestaurantsByCategory: async (req, res) => {
    const categoryId = req.params.categoryId;

  try {
    // Lấy danh sách nhà hàng dựa trên ID của category
    const restaurants = await Restaurant.find({ type: categoryId });
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  },

  searchRestaurants: async (req, res) => {
    const { keyword } = req.params;

    try {
      const restaurants = await Restaurant.find({
        name: { $regex: new RegExp(keyword, "i") },
      }).populate("type");
  
      res.json(restaurants);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
