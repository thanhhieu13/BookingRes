const User = require("../models/user");
const Restaurant = require("../models/restaurant");

Restaurant.collection.createIndex({ location: '2dsphere' });
module.exports = {
    getNearbyRestaurants: async (req, res) => {
        try {
            const userId = req.params.userId;
            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const userLocation = user.location.coordinates;

            // Tìm những nhà hàng gần user, sắp xếp theo khoảng cách tăng dần
            const nearbyRestaurants = await Restaurant.find({
                location: {
                    $near: {
                        $geometry: {
                            type: 'Point',
                            coordinates: userLocation,
                        },
                        $maxDistance: 10000, // Đơn vị tính là mét, bạn có thể điều chỉnh theo nhu cầu
                    },
                },
            }).exec();

            res.json(nearbyRestaurants);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};