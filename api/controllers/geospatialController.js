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
                        $maxDistance: 2300, // 5km
                    },
                },
            });

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
    }
};
