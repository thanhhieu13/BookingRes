const fs = require('fs');
const path = require('path');
const User = require("../models/user");
const Restaurant = require("../models/restaurant");

Restaurant.collection.createIndex({ location: '2dsphere' });

const cityPolygonsPath = path.resolve(__dirname, 'cityPolygons.json');
const cityPolygons = JSON.parse(fs.readFileSync(cityPolygonsPath, 'utf8'));

module.exports = {
  
    getNearbyRestaurants: async (req, res) => {
        try {
            const { latitude, longitude } = req.query;
            if (!latitude || !longitude) {
                return res.status(400).json({ error: 'Latitude and longitude are required for the search.' });
            }
            const userCoordinates = [parseFloat(longitude), parseFloat(latitude)];
            console.time('getNearbyRestaurants'); 
            // Use MongoDB's $nearSphere to find restaurants near the user's location
            const nearbyRestaurants = await Restaurant.find({
                location: {
                    $nearSphere: {
                        $geometry: {
                            type: 'Point',
                            coordinates: userCoordinates,
                        },
                        $maxDistance: 2000, // 5km
                    },
                },
            });
            console.timeEnd('getNearbyRestaurants');
            res.json({ nearbyRestaurants });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    getIntersectbyRestaurants: async (req, res) => {
        try {
            const routeCoordinates = [
                [106.689680, 10.797710],
                [106.6866966, 10.7976848],
                [106.687995, 10.798382],
                [106.6847898, 10.7985185],
            ];
            // Truy vấn nhà hàng giao nhau với đoạn đường bằng $geoIntersects
            const nearbyRestaurants = await Restaurant.find({
                location: {
                    $geoIntersects: {
                        $geometry: {
                            type: 'LineString',
                            coordinates: routeCoordinates
                        }
                    }
                }
            });
    
            res.json({ nearbyRestaurants });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    getRestaurantsByPolygon: async (req, res) => {
      try {
        const { cityName } = req.query;
        if (!cityName) {
          return res.status(400).json({ error: 'City name is required for the search.' });
        }
    
        const cityPolygon = cityPolygons[cityName];
    
        if (!cityPolygon) {
          return res.status(400).json({ error: 'Invalid city name.' });
        }
    
        const restaurantsInCity = await Restaurant.find({
          location: {
            $geoWithin: {
              $geometry: cityPolygon,
            },
          },
        });
    
        const simplifiedRestaurants = restaurantsInCity.map(restaurant => ({
          location: restaurant.location,
          _id: restaurant._id,
          name: restaurant.name,
          description: restaurant.description,
          image: restaurant.image,
          address: restaurant.address,
          rating: restaurant.rating,
          type: restaurant.type,
          menu: restaurant.menu,
          openingHours: restaurant.openingHours,
          bookingHours: restaurant.bookingHours,
        }));
    
        res.json(simplifiedRestaurants);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    },
    
};
