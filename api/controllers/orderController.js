// controllers/orderController.js
const Order = require("../models/order");
const Restaurant = require("../models/restaurant");
const User = require("../models/user");

module.exports = {
    placeOrder: async (req, res) => {
        try {
            const { restaurantId, userId, adults, children, date, selectedHour, note } = req.body;

            const restaurant = await Restaurant.findById(restaurantId);
            const user = await User.findById(userId);

            if (!restaurant || !user) {
                return res.status(404).json({ message: 'Restaurant or user not found' });
            }

            const order = new Order({
                restaurant: restaurantId,
                user: userId,
                adults,
                children,
                date,
                selectedHour,
                note,
            });

            await order.save();

            res.status(201).json({ message: 'Order placed successfully', order });
        } catch (error) {
            console.error('Error placing order:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
};
