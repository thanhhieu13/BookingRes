const User = require("../models/user");
const Restaurant = require("../models/restaurant");

module.exports = {
    getNearbyRestaurants: async (req, res) => {
        const userId = req.params.userId; // Giả sử bạn truyền userId qua params

        try {
            // Lấy thông tin của người dùng, bao gồm độ dài và độ rộng
            const user = await User.findById(userId);
            const userCoordinates = user.geometry.coordinates;

            // Sử dụng tính năng địa lý của MongoDB để tìm những nhà hàng gần người dùng
            const nearbyRestaurants = await Restaurant.find({
                geometry: {
                    $near: {
                        $geometry: {
                            type: 'Point',
                            coordinates: userCoordinates,
                        },
                        $maxDistance: 5000, // Khoảng cách tối đa là 5km (có thể điều chỉnh theo nhu cầu)
                    },
                },
            });

            res.status(200).json({
                success: true,
                data: nearbyRestaurants,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                error: 'Internal Server Error',
            });
        }
    }
};