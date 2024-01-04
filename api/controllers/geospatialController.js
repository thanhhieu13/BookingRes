const User = require("../models/user");
const Restaurant = require("../models/restaurant");

Restaurant.collection.createIndex({ location: '2dsphere' });
module.exports = {
    getNearbyRestaurants: async (req, res) => {
        try {
            const { latitude, longitude } = req.query;
            if (!latitude || !longitude) {
              return res.status(400).json({ error: 'Latitude and longitude are required for the search.' });
            }
            const userCoordinates = [parseFloat(longitude), parseFloat(latitude)];
        
            // Use MongoDB's $nearSphere to find restaurants near the user's location
            const nearbyRestaurants = await Restaurant.find({
              location: {
                $nearSphere: {
                  $geometry: {
                    type: 'Point',
                    coordinates: userCoordinates,
                  },
                  $maxDistance: 5000, // 5km
                },
              },
            });
        
            res.json({ nearbyRestaurants });
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
          }
    }
};